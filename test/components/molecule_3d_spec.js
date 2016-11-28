/* global describe, it, before, after, beforeEach, afterEach */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import Molecule3d from '../../src/components/molecule_3d';
import bipyridineModelData from '../../example/js/bipyridine_model_data';
import factories from '../fixtures/factories';

const $3Dmol = require('../../src/vendor/3Dmol');

describe('Molecule3d', () => {
  const modelData = bipyridineModelData;
  let renderer;

  beforeEach(() => {
    renderer = ReactTestUtils.createRenderer();
  });

  describe('render', () => {
    it('renders a div', () => {
      renderer.render(React.createElement(Molecule3d, { modelData }));
      const result = renderer.getRenderOutput();
      expect(result.type).to.equal('div');
    });
  });

  describe('render3dMol', () => {
    let glViewer;

    beforeEach(() => {
      glViewer = factories.getGlViewer();
      sinon.spy(glViewer, 'addLabel');
      sinon.stub($3Dmol, 'createViewer', () => glViewer);
    });

    afterEach(() => {
      $3Dmol.createViewer.restore();
    });

    describe('when atomLabelsShown is true', () => {
      beforeEach(() => {
        ReactTestUtils.renderIntoDocument(React.createElement(Molecule3d, {
          modelData,
          atomLabelsShown: true,
        }));
      });

      it('adds a label for each atom', () => {
        expect(glViewer.addLabel.callCount).to.equal(modelData.atoms.length);
      });
    });

    describe('when atomLabelsShown is false', () => {
      beforeEach(() => {
        sinon.spy(glViewer, 'removeAllLabels');

        ReactTestUtils.renderIntoDocument(React.createElement(Molecule3d, {
          modelData,
          atomLabelsShown: false,
        }));
      });

      it('removes all labels', () => {
        expect(glViewer.addLabel.called).to.equal(false);
        expect(glViewer.removeAllLabels.calledOnce).to.equal(true);
      });
    });
  });
});
