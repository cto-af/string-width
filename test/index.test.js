import {StringWidth} from '../lib/index.js';
import assert from 'assert/strict';

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
});

describe('info', () => {
  it('has some debug info', () => {
    assert.equal(sw.locale, 'en-US');
    assert.equal(sw.isCJK, false);
    assert.equal(new StringWidth({locale: 'zh-TW'}).isCJK, true);
    assert.equal(new StringWidth({locale: 'zh-CN'}).isCJK, true);
    assert.equal(new StringWidth({locale: 'ja'}).isCJK, true);
    assert.equal(new StringWidth({locale: 'ko'}).isCJK, true);
  });
});

describe('string breaks', () => {
  it('handles ascii only', () => {
    assert.deepEqual(sw.break('foo', 10), [{string: 'foo', cells: 3, last: true}]);
    assert.deepEqual(sw.break('foobar', 3), [
      {string: 'foo', cells: 3, last: false},
      {string: 'bar', cells: 3, last: true},
    ]);
    assert.throws(() => sw.break('foo', 0));
  });
  it('handles non-ascii', () => {
    assert.deepEqual(sw.break('foo\u0308', 10), [
      {string: 'foo\u0308', cells: 3, last: true},
    ]);
    assert.deepEqual(sw.break('foo\u0308ba\u0308r', 3), [
      {string: 'foo\u0308', cells: 3, last: false},
      {string: 'ba\u0308r', cells: 3, last: true},
    ]);
    assert.deepEqual(sw.break('\u{1F1F9}\u{1F1FC}b', 1), [
      {string: '\u{1F1F9}\u{1F1FC}', cells: 2, last: false},
      {string: 'b', cells: 1, last: true},
    ]);
    assert.deepEqual(sw.break('a\u{1F1F9}\u{1F1FC}b', 1), [
      {string: 'a', cells: 1, last: false},
      {string: '\u{1F1F9}\u{1F1FC}', cells: 2, last: false},
      {string: 'b', cells: 1, last: true},
    ]);
  });
});
