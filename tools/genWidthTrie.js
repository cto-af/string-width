import {AMBIGUOUS, POTENTIAL_EMOJI} from '../lib/constants.js';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {writeFile} from '@cto.af/unicode-trie/file';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await writeFile([
  {
    name: 'DerivedCoreProperties.txt',
    transform(x) {
      if (x === 'Default_Ignorable_Code_Point') {
        return 0;
      }
      return null;
    },
  },
  {
    name: 'Scripts.txt',
    transform(x) {
      return (x === 'Hangul') ? 2 : null;
    },
  },
  {
    name: 'EastAsianWidth.txt',
    transform(x) {
      switch (x) {
        case 'F':
          return 2;
        case 'W':
          return 2;
        case 'A':
          return AMBIGUOUS;
      }
      return null;
    },
  },
  {
    name: 'emoji/emoji-data.txt',
    transform(x) {
      return (x === 'Emoji') ? POTENTIAL_EMOJI : null;
    },
  },
  {
    transform(trie) {
      trie.setRange(0, 20, 0); // C0 Controls
      trie.set(0x8, -1); // Backspace
      trie.set(0x7f, 0); // ESC
      trie.set(0x2E3A, 3); // TWO-EM DASH, in some contexts and fonts
      trie.set(0x2E3B, 4); // THREE-EM DASH, in some contexts and fonts
    },
  },
], {
  cacheDir: __dirname,
  initialValue: 1,
  errorValue: NaN,
  className: 'Width',
  out: path.resolve(__dirname, '..', 'lib', 'widths.js'),
  quot: "'",
  semi: ';',
  verbose: true,
  frequency: 0,
});
