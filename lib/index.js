import {AMBIGUOUS, POTENTIAL_EMOJI} from './constants.js'
import {Width} from './widths.js'
import emojiRegex from 'emoji-regex'

const ASCII_REGEX = /^[\x20-\x7e]*$/
const DEFAULT_LOCALE = new Intl.Segmenter().resolvedOptions().locale
const EMOJI_REGEX = emojiRegex()

export {
  AMBIGUOUS,
  POTENTIAL_EMOJI,
}

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
    return undefined
  },
}

/**
 * @typedef {object} StringWidthOptions
 * @prop {string} [locale] The locale to use for grapheme segmentation and to
 *   determine if we are in a CJK context for code points that have ambiguous
 *   East Asian Width.  Defaults to systems's locale.
 * @prop {ExtraWidths} [extraWidths] A lookup map for code points whose width
 *   you would like to override.  Might be a Map<number, number>, UnicodeTrie,
 *   or anything else that has a `get(codePoint: number) => number` method.
 */

export class StringWidth {
  #graphemes
  #isCJK
  #extraWidths

  /**
   * Create a StringWidth instance.
   *
   * @param {StringWidthOptions} opts
   */
  constructor(opts) {
    /**
     * @type {Required<StringWidthOptions>}
     */
    const options = {
      locale: DEFAULT_LOCALE,
      extraWidths: NO_EXTRAS,
      ...opts,
    }
    this.#graphemes = new Intl.Segmenter(options.locale, {
      granularity: 'grapheme',
    })
    const loc = new Intl.Locale(this.locale).maximize()
    // Script is never undefined after going through Segmenter
    this.#isCJK = ['Hans', 'Hant', 'Kore', 'Jpan']
      .includes(/** @type {string} */ (loc.script))
    this.#extraWidths = options.extraWidths
  }

  /**
   * Is the context for ambiguous East Asian Width code points CJK?
   *
   * @returns {boolean}
   * @readonly
   */
  get isCJK() {
    return this.#isCJK
  }

  /**
   * Resolved locale for grapheme segmentation.
   * @returns {string}
   * @readonly
   */
  get locale() {
    return this.#graphemes.resolvedOptions().locale
  }

  /**
   * Yield each segment of the input string as a separate substring.
   *
   * @param {string} str
   */
  *graphemes(str) {
    for (const {segment} of this.#graphemes.segment(str)) {
      yield segment
    }
  }

  /**
   *
   * @param {string} segment
   * @returns {number}
   */
  #segmentWidth(segment) {
    // First codepoint in the grapheme.  Usually all the rest will be
    // combining characters, unless this is an RI or an emoji sequence.
    const cp = /** @type {number} */ (segment.codePointAt(0))
    const w = this.#extraWidths.get(cp) ?? Width.get(cp)
    switch (w) {
      case POTENTIAL_EMOJI:
        EMOJI_REGEX.lastIndex = 0 // Revisit this.
        return EMOJI_REGEX.test(segment) ? 2 : 1
      case AMBIGUOUS: // Ambiguous
        return this.#isCJK ? 2 : 1
      default:
        return w
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
      return str.length
    }

    let ret = 0
    for (const segment of this.graphemes(str)) {
      ret += this.#segmentWidth(segment)
    }
    return ret < 0 ? 0 : ret
  }

  /**
   * Break a string into two parts, such that the first part is always
   * shorter or equal to width in display cells.
   *
   * @param {string} str String to segment
   * @param {number} width Maximum number of display cells for first chunk
   * @returns {[string, string]}
   */
  break(str, width) {
    // Fast-path shortcut for all-ASCII
    if (ASCII_REGEX.test(str)) {
      return [str.slice(0, width), str.slice(width)]
    }

    let ret = ''
    let rest = ''
    let cur = 0 // Cells
    for (const {segment, index} of this.#graphemes.segment(str)) {
      cur += this.#segmentWidth(segment)
      if (cur > width) { // Cells
        rest = str.slice(index + segment.length - 1) // Chars
        break
      }
      ret += segment
    }
    return [ret, rest]
  }
}
