import {AMBIGUOUS, POTENTIAL_EMOJI} from './constants.js';
import {Width} from './widths.js';
import ansi from 'ansi-regex';
import emojiRegex from 'emoji-regex';

const ASCII_REGEX = /^[\x20-\x7e]*$/;
const DEFAULT_LOCALE = new Intl.Segmenter().resolvedOptions().locale;
const EMOJI_REGEX = emojiRegex();
const ANSI = ansi();
const ANSI_CAP = new RegExp(`(${ANSI.source})`, 'g');
const STATE_PLAIN = 0;
const STATE_PRE = 1;
const STATE_MARKED = 2;
const STATE_POST = 3;
const STATE_MAX = 4;

export {
  AMBIGUOUS,
  POTENTIAL_EMOJI,
};

/**
 * @typedef {object} ExtraWidths
 * @prop {(codePoint: number) => number | undefined} get Returns the width of
 *   any overridden character.  Return undefined if not overridden.  Return
 *   POTENTIAL_EMOJI(14) if this code point might start an emoji sequence, and
 *   AMBIGUOUS(15) if this code point point has ambiguous East Asian Width.
 *   This is useful if your display context (terminal application + font)
 *   renders a particular grapheme cluster differently than mine does.
 */

/**
 * @type {ExtraWidths}
 * @private
 */
const NO_EXTRAS = {
  get(/** @type {number} */ _n) {
    return undefined;
  },
};

/**
 * @typedef {object} StringWidthOptions
 * @prop {string} [locale] The locale to use for grapheme segmentation and to
 *   determine if we are in a CJK context for code points that have ambiguous
 *   East Asian Width.  Defaults to systems's locale.
 * @prop {ExtraWidths} [extraWidths] A lookup map for code points whose width
 *   you would like to override.  Might be a Map<number, number>, UnicodeTrie,
 *   or anything else that has a `get(codePoint: number) => number` method.
 * @prop {boolean} [isCJK] If specified, override using the script of the
 *   locale to determine whether we are in a CJK context.
 * @prop {boolean} [includeANSI] If true, include ANSI escape sequences in the
 *   width of the string.  If false, strips ANSI before calculating width.
 *   defaults to false.
 */

export class StringWidth {
  #graphemes;
  #isCJK;
  #extraWidths;
  #includeANSI;

  /**
   * Create a StringWidth instance.
   *
   * @param {StringWidthOptions?} opts
   */
  constructor(opts = {}) {
    /**
     * @type {Required<StringWidthOptions>}
     */
    const options = {
      locale: DEFAULT_LOCALE,
      extraWidths: NO_EXTRAS,
      isCJK: false,
      includeANSI: false,
      ...opts,
    };
    this.#graphemes = new Intl.Segmenter(options.locale, {
      granularity: 'grapheme',
    });
    if (typeof opts?.isCJK === 'boolean') {
      this.#isCJK = options.isCJK;
    } else {
      const loc = new Intl.Locale(options.locale).maximize();
      // Script is never undefined after going through Segmenter
      this.#isCJK = ['Hans', 'Hant', 'Kore', 'Jpan']
        .includes(/** @type {string} */ (loc.script));
    }
    this.#extraWidths = options.extraWidths;
    this.#includeANSI = options.includeANSI;
  }

  /**
   * Is the context for ambiguous East Asian Width code points CJK?
   *
   * @returns {boolean}
   * @readonly
   */
  get isCJK() {
    return this.#isCJK;
  }

  /**
   * Resolved locale for grapheme segmentation.
   * @returns {string}
   * @readonly
   */
  get locale() {
    return this.#graphemes.resolvedOptions().locale;
  }

  /**
   *
   * @param {string} segment
   * @returns {number}
   */
  #segmentWidth(segment) {
    // First codepoint in the grapheme.  Usually all the rest will be
    // combining characters, unless this is an RI or an emoji sequence.
    const cp = /** @type {number} */ (segment.codePointAt(0));
    const w = this.#extraWidths.get(cp) ?? Width.get(cp);
    switch (w) {
      case POTENTIAL_EMOJI:
        EMOJI_REGEX.lastIndex = 0; // Revisit this.
        return EMOJI_REGEX.test(segment) ? 2 : 1;
      case AMBIGUOUS: // Ambiguous
        return this.#isCJK ? 2 : 1;
      default:
        return w;
    }
  }

  /**
   * @typedef {object} WidthBreak
   * @prop {string} string
   * @prop {number} cells
   * @prop {boolean} [last]
   */

  /**
   * Ignoring ANSI, get the breaks for the string
   *
   * @param {string} str
   * @returns {Generator<WidthBreak, undefined, undefined>}
   */
  *#textWidths(str) {
    // If this is an all-ASCII string with some ANSI escapes, we'll run
    // this regex once for each run.  It might be a win?  Benchmark.
    if (ASCII_REGEX.test(str)) {
      for (const string of str) { // One codepoint at a time, safe w/ ASCII
        yield {string, cells: 1};
      }
    } else {
      for (const {segment} of this.#graphemes.segment(str)) {
        yield {string: segment, cells: this.#segmentWidth(segment)};
      }
    }
  }

  /**
   *
   * @param {string} str
   * @returns {Generator<WidthBreak, undefined, undefined>}
   */
  *#graphemeWidths(str) {
    if (this.#includeANSI) {
      yield *this.#textWidths(str);
      return;
    }
    let state = STATE_PLAIN;
    let string = '';
    let cells = 0;
    for (const chunk of str.split(ANSI_CAP)) {
      switch (state) {
        case STATE_PLAIN:
          yield *this.#textWidths(chunk);
          break;
        case STATE_MARKED: {
          let first = true;
          for (const b of this.#textWidths(chunk)) {
            if (first) {
              string += b.string;
              ({cells} = b);
              first = false;
            } else {
              yield {string, cells};
              ({string, cells} = b);
            }
          }
          break;
        }
        case STATE_PRE:
          string = chunk;
          cells = 0;
          break;
        case STATE_POST:
          string += chunk;
          yield {string, cells};
          string = '';
          break;
      }
      state = (state + 1) % STATE_MAX;
    }
    if (string) {
      yield {string, cells};
    }
  }

  /**
   * Yield each segment of the input string as a separate substring.
   *
   * @param {string} str
   * @returns {Generator<string, undefined, undefined>}
   */
  *graphemes(str) {
    for (const {string} of this.#graphemeWidths(str)) {
      yield string;
    }
  }

  /**
   * How many display cells does the given string take up?
   * Accounts for EastAsianWidth, Emoji, combining characters, regional
   * indicators (flags), backspaces
   *
   * @param {string} str String to count
   */
  width(str) {
    // Fast-path shortcut for all-ASCII
    if (ASCII_REGEX.test(str)) {
      return str.length;
    }

    let ret = 0;
    for (const {cells} of this.#graphemeWidths(str)) {
      ret += cells;
    }
    return (ret < 0) ? 0 : ret;
  }

  /**
   * Break a string into multiple parts, such that each part has maximum
   * cell length of width, unless a particular grapheme cluster is longer
   * than width.  Therefore, width should probably be 4 or higher to get
   * the expected results.
   *
   * @param {string} str String to segment
   * @param {number} width Maximum number of display cells for chunks
   * @returns {WidthBreak[]}
   */
  break(str, width) {
    if (width < 1) {
      throw new RangeError(`Width must be >= 1.  Got ${width}.`);
    }

    /** @type {WidthBreak[]} */
    const ret = [];
    let string = '';
    let cells = 0;

    // Fast-path shortcut for all-ASCII
    if (ASCII_REGEX.test(str)) {
      for (cells = 0; cells < str.length; cells += width) {
        string = str.slice(cells, cells + width);
        ret.push({
          string,
          cells: string.length, // Might be less than width for last chunk
        });
      }
    } else {
      for (const {string: segment, cells: w} of this.#graphemeWidths(str)) {
        if (w > width) {
          // Skinny width, fat grapheme cluster
          if (cells > 0) {
            ret.push({string, cells});
            string = '';
            cells = 0;
          }
          ret.push({string: segment, cells: w});
        } else if (cells + w > width) {
          ret.push({string, cells});
          string = segment;
          cells = w;
        } else {
          string += segment;
          cells += w;
        }
      }
      if (cells > 0) {
        ret.push({string, cells});
      }
    }

    // Several paths lead here.
    if (ret.length > 0) {
      ret[ret.length - 1].last = true;
    }
    return ret;
  }
}
