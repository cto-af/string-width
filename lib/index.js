import {Width} from './widths.js'
import emojiRegex from 'emoji-regex'

const DEFAULT_LOCALE = new Intl.Segmenter().resolvedOptions().locale
const EMOJI_REGEX = emojiRegex()

export class StringWidth {
  #graphemes
  #isCJK

  constructor(locale = DEFAULT_LOCALE) {
    this.#graphemes = new Intl.Segmenter(locale, {
      granularity: 'grapheme',
    })
    const loc = new Intl.Locale(
      this.#graphemes.resolvedOptions().locale
    ).maximize()
    // Script is never undefined after going through Segmenter
    this.#isCJK = ['Hans', 'Hant', 'Kore', 'Jpan']
      .includes(/** @type {string} */ (loc.script))
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
   * How many display cells does the given string take up?
   * Accounts for EastAsianWidth, Emoji, combining characters, regional
   * indicators (flags), backspaces
   *
   * @param {string} str String to count
   */
  width(str) {
    // Fast-path shortcut for all-ASCII
    if (/^[\x20-\x7e]*$/.test(str)) {
      return str.length
    }

    let ret = 0
    for (const segment of this.graphemes(str)) {
      // First codepoint in the grapheme.  Usually all the rest will be
      // combining characters, unless this is an RI or an emoji sequence.
      const cp = /** @type {number} */ (segment.codePointAt(0))
      const w = Width.get(cp)
      switch (w) {
        case 98: // Potential emoji sequence
          EMOJI_REGEX.lastIndex = 0 // Revisit this.
          ret += EMOJI_REGEX.test(segment) ? 2 : 1
          break
        case 99: // Ambiguous
          ret += this.#isCJK ? 2 : 1
          break
        default:
          ret += w
      }
    }
    return ret < 0 ? 0 : ret
  }
}
