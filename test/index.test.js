import {StringWidth} from '../lib/index.js'
import assert from 'assert/strict'

const LOCALE = 'en-US'
const sw = new StringWidth(LOCALE)

describe('string widths', () => {
  it('handles plain ASCII quickly', () => {
    assert(sw)
    assert.equal(sw.width('#foo'), 4)
  })
  it('handles emoji sequences', () => {
    assert.equal(sw.width('a#\ufe0f\u20e3b'), 4) // Emoji in the middle is 2
    assert.equal(sw.width('a#\u{1F4A9}'), 4) // `#` is not part of the emoji
  })
  it('handles ambiguous characters', () => {
    assert.equal(sw.width('\xa1'), 1)
  })
  it('handles CJK ambiguous', () => {
    const ko = new StringWidth('ko')
    assert.equal(ko.width('\xa1'), 2)
  })
  it('handles flags', () => {
    assert.equal(sw.width('\u{1F1F9}\u{1F1FC}b'), 3)
  })
  it('handles invalid locales', () => {
    const foo = new StringWidth('foo')
    assert.equal(foo.width('\xa1'), 1)
  })
  it('handles backspaces', () => {
    assert.equal(sw.width('foo\b'), 2)
    assert.equal(sw.width('foo\b\b\b\b'), 0)
  })
})
