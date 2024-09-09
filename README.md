# @cto.af/string-width

Get width of a Unicode string in fixed-width display cells, accounting for
combining characters, emoji, flags, Hangul, East Asian Width, default
ignorable characters, and a few more edge cases.

## Installation

```sh
npm install @cto.af/string-width
```

## API

Full [documentation](https://cto-af.github.io/string-width/) is available.

```js
import {StringWidth, AMBIGUOUS, POTENTIAL_EMOJI} from '../lib/index.js'

const sw = new StringWidth()
sw.width('foo') // 3
sw.width('\u{1F4A9}') // 2: Emoji take two cells
sw.width('#\ufe0f\u20e3') // 2: More complicated emoji
sw.break('foobar', 3) // [
  //   {string: 'foo', cells: 3},
  //   {string: 'bar', cells: 3, last: true}
  // ]

const custom = new StringWidth({
  locale: 'ko-KR',
  isCJK: true,
  extraWidths: new Map([
    // This example is not actually useful, but demonstrates how to customize

    // 'K' how has ambiguous East Asian Width
    [0x4b, AMBIGUOUS],
    // 'O' might now start an Emoji sequence
    [0x4f, POTENTIAL_EMOJI],
    // 'R' now has a width of 3 cells
    [0x52, 3]
  ])
})
```

## Approach

- All of the "interesting" characters are put into a Trie in `widths.js` at
  build time.  POTENTIAL_EMOJI(14) is a sentinel for "possible emoji".
  AMBIGUOUS(15) is a sentinel for "ambiguous East Asian Width", and all the
  rest of the values are the width for that code point.  The default result
  from the Trie is 1.
- If a string is all ASCII, just count characters.  This happens a lot, so
  it's worth a performance shortcut
- For each grapheme cluster:
  - Get the width of the first code point from extraWidths or the Trie.
  - If the width is AMBIGUOUS, return 2 if we're in a CJK context, otherwise 1.
  - If the width is POTENTIAL_EMOJI, check if the whole grapheme cluster is an
    emoji
- Since backspace has a negative width, ensure that the total width is never
  less than zero.
- ANSI escape sequences are ignored for width, unless the `includeANSI` option
  is enabled.

## Chinese, Japanese, or Korean (CJK) contexts

Some code points have ambiguous length, which depends upon whether we are
counting in a CJK context or not.  By default, StringWidth will look at the
locale that is given (or derived from the environment), and use the default
script of that locale to decide if this is a Chinese, Japanese, or Korean
context.  The script identifiers `'Hans'`, `'Hant'`, `'Jpan'`, and `'Kore'`
signal CJK context.  If desired, this detection can be overridden by passing
in the `isCJK` field in the constructor options.

## Width breaking

The `break(string, N)` method slices a string into chunks, each of which is at
most N cells.  This was so entangled with the width logic that it made sense
to be in this library.  It is useful for strings that are longer than N that
need to have a hyphen inserted between each of the segments, ensuring that the
hyphen doesn't go in the middle of a grapheme cluster.

## Known Limitations

- Font [ligatures](https://en.wikipedia.org/wiki/Ligature_(writing)) are not
  taken into account.
- Variable width fonts are not considered.  Calculated widths are in display
  cells, not pixels.

## Development

On a new Unicode version being released, delete the `tools/*.txt` files, then
do `npm run build` to re-generate the Trie.

---
[![Tests](https://github.com/cto-af/string-width/actions/workflows/node.js.yml/badge.svg)](https://github.com/cto-af/string-width/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/cto-af/string-width/branch/main/graph/badge.svg?token=OCGXfIyhzt)](https://codecov.io/gh/cto-af/string-width)
