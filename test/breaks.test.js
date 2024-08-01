import {StringWidth} from '../lib/index.js';
import assert from 'assert/strict';

const LOCALE = 'en-US';
const sw = new StringWidth({locale: LOCALE});

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
