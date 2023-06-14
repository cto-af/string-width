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
import {StringWidth} from '../lib/index.js'

const sw = new StringWidth()
sw.width('foo') // 3
sw.width('\u{1F4A9}') // 2: Emoji take two cells
sw.width('#\ufe0f\u20e3') // 2: More complicated emoji
```

## Approach

- All of the "interesting" characters are put into a Trie in `widths.js` at
  build time.  98 is a sentinal for "possible emoji".  99 is a sentinal for
  "ambiguous East Asian Width", and all the rest of the values are the width
  for that code point.  The default result from the Trie is 1.
- If a string is all ASCII, just count characters.  This happens a lot, so
  it's worth a performance shortcut
- For each grapheme cluster:
  - Get the width of the first code point from the Trie.
  - If the width is 99, check the script of the locale to see if we're in an East Asian context.
  - If the width is 98, check if the whole grapheme cluster is an emoji
- Since backspace has a negative width, ensure that the total width is never
  less than zero.

## Development

On a new Unicode version being released, delete the `tools/*.txt` files, then
do `npm run build` to re-generate the Trie.

---
