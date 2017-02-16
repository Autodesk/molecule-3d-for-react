/* global describe, it, before, after, beforeEach, afterEach */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Molecule3d from '../../src/components/molecule_3d';
import bipyridineModelData from '../../example/js/bipyridine_model_data';
import factories from '../fixtures/factories';

const $3Dmol = require('3dmol');

describe('Molecule3d', () => {
  let modelData;
  let renderer;

  beforeEach(() => {
    renderer = ReactTestUtils.createRenderer();
    modelData = bipyridineModelData;
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
      sinon.stub($3Dmol, 'createViewer').callsFake(() => glViewer);
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

    describe('when initially loading empty modelData', () => {
      beforeEach(() => {
        modelData = {
          atoms: [],
          bonds: [],
        };
      });

      it('doesn\'t render glviewer', () => {
        const wrapper = mount(<Molecule3d modelData={modelData} />);
        expect(wrapper.node.glviewer).to.equal(undefined);
      });
    });

    describe('when emptying modelData after set', () => {
      it('removes all viewer models', () => {
        const wrapper = mount(<Molecule3d modelData={modelData} />);
        expect(wrapper.node.glviewer.getModel()).to.not.equal(null);
        wrapper.setProps({ modelData: { atoms: [], bonds: [] } });
        expect(wrapper.node.glviewer.getModel()).to.equal(null);
      });
    });

    describe('when reloading modelData after emptying', () => {
      it('removes all viewer models and adds new ones in', () => {
        const wrapper = mount(<Molecule3d modelData={modelData} />);
        expect(wrapper.node.glviewer.getModel()).to.not.equal(null);
        wrapper.setProps({ modelData: { atoms: [], bonds: [] } });
        expect(wrapper.node.glviewer.getModel()).to.equal(null);
        wrapper.setProps({ modelData });
        expect(wrapper.node.glviewer.getModel()).to.not.equal(null);
      });
    });

    describe('when loading partially complete modelData', () => {
      beforeEach(() => {
        modelData = {
          atoms: modelData.atoms,
          bonds: [],
        };
        sinon.spy(glViewer, 'addModel');
      });

      it('tries to render', () => {
        const wrapper = mount(<Molecule3d modelData={modelData} />);
        expect(wrapper.node.glviewer).to.equal(glViewer);
      });
    });
  });
});
