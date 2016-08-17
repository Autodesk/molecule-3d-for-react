/* global describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import libUtils from '../../src/utils/lib_utils';

describe('libUtils', () => {
  describe('colorStringToNumber', () => {
    describe('when given invalid input', () => {
      it('returns the original input', () => {
        expect(libUtils.colorStringToNumber('blue')).to.equal('blue');
        expect(libUtils.colorStringToNumber('abcdef')).to.equal('abcdef');
        expect(libUtils.colorStringToNumber('#!bcdef')).to.equal('#!bcdef');
      });
    });

    describe('when given a valid hash color', () => {
      it('returns the Number representation', () => {
        expect(libUtils.colorStringToNumber('#000000')).to.equal(0);
        expect(libUtils.colorStringToNumber('#ffffff')).to.equal(16777215);
        expect(libUtils.colorStringToNumber('#abcdef')).to.equal(0xabcdef);
        expect(libUtils.colorStringToNumber('#bada55')).to.equal(0xbada55);
      });
    });
  });
});
