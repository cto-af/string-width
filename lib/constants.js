// Split out so that genWidthTrie.js can use the same constants before
// widths.js exists

/**
 * This code point might start an emoji sequence.  By default, any code point
 * with the Emoji property.  See TR #51.
 */
export const POTENTIAL_EMOJI = 14;

/**
 * This code point is Ambiguous with respect to East Asian Width.  In CJK
 * contexts, it has a width of 2, rather than 1.
 */
export const AMBIGUOUS = 15;
