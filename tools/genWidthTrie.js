import {UnicodeTrieBuilder} from '@cto.af/unicode-trie/builder.js'
import {fileURLToPath} from 'url'
import fs from 'fs/promises'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function processFile(name, trie, transform) {
  const INPUT = path.join(__dirname, `${name.replaceAll('/', '_')}.txt`)

  // Cache data in local file.  Requires Node v18+.
  let txt = null
  try {
    txt = await fs.readFile(INPUT, 'utf8')
  } catch (_ignored) {
    const url = `https://www.unicode.org/Public/UCD/latest/ucd/${name}.txt`
    const res = await fetch(url)
    txt = await res.text()
    await fs.writeFile(INPUT, txt, 'utf8')
  }
  // # LineBreak-15.0.0.txt
  // # Date: 2022-07-28, 09:20:42 GMT [KW, LI]

  const version = txt.match(/^#\s*\S+-(?<version>\d+\.\d+\.\d+).txt/)?.groups?.version
  const date = txt.match(/^#\s*Date: (?<date>[\d,: GMT-]+)/m)?.groups?.date

  const matches = txt.matchAll(
    /^(?<start>\p{Hex}{4,6})(?:\.\.(?<end>\p{Hex}{4,6}))?\s*;\s*(?<val>\S+)/gmu
  )
  for (const match of matches) {
    const val = transform(match.groups.val)
    if (val == null) {
      continue
    }
    const start = parseInt(match.groups.start, 16)
    if (match.groups.end) {
      const end = parseInt(match.groups.end, 16)
      trie.setRange(start, end, val)
    } else {
      trie.set(start, val)
    }
  }
  return {version, date}
}

const trie = new UnicodeTrieBuilder(1, NaN)

const {version, date} = await processFile('DerivedCoreProperties', trie, x => {
  if (x === 'Default_Ignorable_Code_Point') {
    return 0
  }
  return null
})

await processFile('Scripts', trie, x => {
  if (x === 'Hangul') {
    return 2
  }
  return null
})

await processFile('EastAsianWidth', trie, x => {
  switch (x) {
    case 'F':
      return 2
    case 'W':
      return 2
    case 'A':
      return 99
  }
  return null
})

await processFile('emoji/emoji-data', trie, x => ((x === 'Emoji') ? 98 : null))

trie.setRange(0, 20, 0) // C0 Controls
trie.set(0x8, -1) // Backspace
trie.set(0x7f, 0) // ESC
trie.set(0x2E3A, 3) // TWO-EM DASH, in some contexts and fonts
trie.set(0x2E3B, 4) // THREE-EM DASH, in some contexts and fonts

const OUTPUT = path.resolve(__dirname, '..', 'lib', 'widths.js')
await fs.writeFile(OUTPUT, trie.toModule({
  version, date, name: 'Width', quot: "'", semi: '',
}))
