import {StringWidth} from '../lib/index.js';
import assert from 'node:assert/strict';

const LOCALE = 'en-US';
const sw = new StringWidth({locale: LOCALE});

describe('string breaks', () => {
  it('handles ascii only', () => {
    assert.deepEqual(sw.break('foo', 10), [{string: 'foo', cells: 3, last: true}]);
    assert.deepEqual(sw.break('foobar', 3), [
      {string: 'foo', cells: 3},
      {string: 'bar', cells: 3, last: true},
    ]);
    assert.throws(() => sw.break('foo', 0));
  });

  it('handles non-ascii', () => {
    assert.deepEqual(sw.break('foo\u0308', 10), [
      {string: 'foo\u0308', cells: 3, last: true},
    ]);
    assert.deepEqual(sw.break('foo\u0308ba\u0308r', 3), [
      {string: 'foo\u0308', cells: 3},
      {string: 'ba\u0308r', cells: 3, last: true},
    ]);
    assert.deepEqual(sw.break('\u{1F1F9}\u{1F1FC}b', 1), [
      {string: '\u{1F1F9}\u{1F1FC}', cells: 2},
      {string: 'b', cells: 1, last: true},
    ]);
    assert.deepEqual(sw.break('a\u{1F1F9}\u{1F1FC}b', 1), [
      {string: 'a', cells: 1},
      {string: '\u{1F1F9}\u{1F1FC}', cells: 2},
      {string: 'b', cells: 1, last: true},
    ]);
  });

  it('handles ANSI escape sequences', () => {
    assert.deepEqual(sw.break('\x1B[32mfoo\x1B[39m', 3), [
      {string: '\x1B[32mfoo\x1B[39m', cells: 3, last: true},
    ]);
    assert.deepEqual(sw.break('bar\x1B[32mfoo\x1B[39mbaz', 3), [
      {string: 'bar', cells: 3},
      {string: '\x1B[32mfoo\x1B[39m', cells: 3},
      {string: 'baz', cells: 3, last: true},
    ]);

    assert.deepEqual(sw.break('ba\x1B[32mfoo\x1B[39mbaz', 3), [
      {string: 'ba\x1B[32mf', cells: 3},
      {string: 'oo\x1B[39mb', cells: 3},
      {string: 'az', cells: 2, last: true},
    ]);

    assert.deepEqual(sw.break('bar\x1B[32mfoo\x1B[39m\x1B[32mfoo\x1B[39mbaz', 3), [
      {string: 'bar', cells: 3},
      {string: '\x1B[32mfoo\x1B[39m', cells: 3},
      {string: '\x1B[32mfoo\x1B[39m', cells: 3},
      {string: 'baz', cells: 3, last: true},
    ]);

    assert.deepEqual(sw.break('bar\x1B[32mfoo', 3), [
      {string: 'bar', cells: 3},
      {string: '\x1B[32mfoo', cells: 3, last: true},
    ]);

    const swc = new StringWidth({includeANSI: true});
    assert.deepEqual(swc.break('\x1B[32mfoo\x1B[39m', 3), [
      {string: '\x1B[3', cells: 3},
      {string: '2mf', cells: 3},
      {string: 'oo\x1B', cells: 3},
      {string: '[39', cells: 3},
      {string: 'm', cells: 1, last: true},
    ]);
  });
});
