# @cto.af/string-width

Get width of a Unicode string in fixed-width display cells, accounting for
combining characters, emoji, flags, Hangul, East Asian Width, default
ignorable characters, and a few more edge cases.

## Installation

```sh
npm install @cto.af/string-width
```

## API

```js
import {StringWidth, AMBIGUOUS, POTENTIAL_EMOJI} from '../lib/index.js'

const sw = new StringWidth()
sw.width('foo') // 3
sw.width('\u{1F4A9}') // 2: Emoji take two cells
sw.width('#\ufe0f\u20e3') // 2: More complicated emoji
sw.break('foobar', 3) // ['foo', 'bar']

const custom = new StringWidth({
  locale: 'ko-KR',
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
  - If the width is AMBIGUOUS, check the script of the locale to see if we're
    in an East Asian context.
  - If the width is POTENTIAL_EMOJI, check if the whole grapheme cluster is an
    emoji
- Since backspace has a negative width, ensure that the total width is never
  less than zero.

## Development

On a new Unicode version being released, delete the `tools/*.txt` files, then
do `npm run build` to re-generate the Trie.

---
[![Tests](https://github.com/cto-af/string-width/actions/workflows/node.js.yml/badge.svg)](https://github.com/cto-af/string-width/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/cto-af/string-width/branch/main/graph/badge.svg?token=OCGXfIyhzt)](https://codecov.io/gh/cto-af/string-width)
