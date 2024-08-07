import {StringWidth} from '../lib/index.js';
import assert from 'node:assert/strict';

const LOCALE = 'en-US';
const sw = new StringWidth({locale: LOCALE});

describe('it iteretes graphemes', () => {
  it('handles plain ascii', () => {
    assert.deepEqual([...sw.graphemes('')], []);
    assert.deepEqual([...sw.graphemes('abc')], ['a', 'b', 'c']);
  });

  it('handles ANSI escapes', () => {
    const swc = new StringWidth({locale: LOCALE, includeANSI: true});
    assert.deepEqual([...swc.graphemes('abc')], ['a', 'b', 'c']);

    assert.deepEqual(
      [...sw.graphemes('\x1B]8;;http://example.com\x07\x1B]8;;\x07')],
      ['\x1B]8;;http://example.com\x07\x1B]8;;\x07']
    );
    assert.deepEqual(
      [...sw.graphemes('\x1B]8;;http://example.com\x07L\x1B]8;;\x07')],
      ['\x1B]8;;http://example.com\x07L\x1B]8;;\x07']
    );
    assert.deepEqual(
      [...sw.graphemes('\x1B]8;;http://example.com\x07Link\x1B]8;;\x07')],
      ['\x1B]8;;http://example.com\x07L', 'i', 'n', 'k\x1B]8;;\x07']
    );
    assert.deepEqual(
      [...sw.graphemes('foo\x1B]8;;http://example.com\x07Link\x1B]8;;\x07bar')],
      [
        'f',
        'o',
        'o',
        '\x1B]8;;http://example.com\x07L',
        'i',
        'n',
        'k\x1B]8;;\x07',
        'b',
        'a',
        'r',
      ]
    );
  });
});
