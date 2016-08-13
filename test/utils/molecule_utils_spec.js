/* global describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import moleculeUtils from '../../src/utils/molecule_utils';
import bipyridineModelData from '../../example/js/bipyridine_model_data';

describe('moleculeUtils', () => {
  describe('modelDataToCDJSON', () => {
    let modelData = {};

    describe('when given valid modelData', () => {
      before(() => {
        modelData = JSON.parse(bipyridineModelData);
      });

      it('returns ChemDoodle json', () => {
        const json = moleculeUtils.modelDataToCDJSON(modelData);
        const m = json.m[0];

        m.a.forEach((atom) => {
          expect(typeof atom.l).to.equal('string');
          expect(typeof atom.x).to.equal('number');
          expect(typeof atom.y).to.equal('number');
          expect(typeof atom.z).to.equal('number');
          expect(typeof atom.mass).to.equal('number');
        })
      });
    });
  });
});
