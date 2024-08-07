import {StringWidth} from '../lib/index.js';
import assert from 'node:assert/strict';

const LOCALE = 'en-US';
const sw = new StringWidth({locale: LOCALE});

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
