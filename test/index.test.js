import {StringWidth} from '../lib/index.js';
import assert from 'node:assert/strict';

const LOCALE = 'en-US';
const sw = new StringWidth({locale: LOCALE});

describe('string widths', () => {
  it('handles plain ASCII quickly', () => {
    assert(sw);
    assert.equal(sw.width('#foo'), 4);
  });

  it('handles emoji sequences', () => {
    assert.equal(sw.width('a#\ufe0f\u20e3b'), 4); // Emoji in the middle is 2
    assert.equal(sw.width('a#\u{1F4A9}'), 4); // `#` is not part of the emoji
  });

  it('handles ambiguous characters', () => {
    assert.equal(sw.width('\xa1'), 1);
  });

  it('handles CJK ambiguous', () => {
    const ko = new StringWidth({locale: 'ko'});
    assert.equal(ko.width('\xa1'), 2);
  });

  it('allows overriding CJK', () => {
    const ko = new StringWidth({locale: 'ko', isCJK: false});
    assert.equal(ko.isCJK, false);
  });

  it('handles flags', () => {
    assert.equal(sw.width('\u{1F1F9}\u{1F1FC}b'), 3);
  });

  it('handles invalid locales', () => {
    const foo = new StringWidth({locale: 'foo'});
    assert.equal(foo.width('\xa1'), 1);
  });

  it('handles backspaces', () => {
    assert.equal(sw.width('foo\b'), 2);
    assert.equal(sw.width('foo\b\b\b\b'), 0);
  });

  it('supports overrides', () => {
    const swc = new StringWidth({
      locale: 'en-US',
      extraWidths: new Map([[0x101, 5]]),
    });
    assert.equal(swc.width('b\u0101r'), 7);
  });

  it('supports ANSI escape sequences', () => {
    assert.equal(
      sw.width('\x1b]8;;http://example.com\x07Liiink\x1b]8;;\x07'),
      6
    );
    const swc = new StringWidth({includeANSI: true});
    assert.equal(
      swc.width('\x1b]8;;http://example.com\x07Liiink\x1b]8;;\x07'),
      34
    );
  });
});
