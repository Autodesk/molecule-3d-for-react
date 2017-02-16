/* global describe, it, before, after, beforeEach, afterEach */

import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Molecule3d from '../../src/components/molecule_3d';
import bipyridineModelData from '../../example/js/bipyridine_model_data';
import threeAidModelData from '../../example/js/3aid_model_data';
import factories from '../fixtures/factories';

const $3Dmol = require('3dmol');

describe('Molecule3d', () => {
  const modelData = bipyridineModelData;
  const modelData2 = threeAidModelData;
  const emptyModelData = { atoms: [], bonds: [] };
  let renderer;
  let glViewer;

  beforeEach(() => {
    renderer = ReactTestUtils.createRenderer();

    glViewer = factories.getGlViewer();
    sinon.stub($3Dmol, 'createViewer').callsFake(() => glViewer);
  });

  afterEach(() => {
    $3Dmol.createViewer.restore();
  });

  describe('render', () => {
    it('renders a div', () => {
      renderer.render(React.createElement(Molecule3d, { modelData }));
      const result = renderer.getRenderOutput();
      expect(result.type).to.equal('div');
    });
  });

  describe('onRenderNewData', () => {
    it('calls onRenderNewData for initial modelData', () => {
      const callback = sinon.spy();
      mount(<Molecule3d onRenderNewData={callback} modelData={modelData} />)
      expect(callback.callCount).to.equal(1);
      expect(callback.calledWith(glViewer)).to.equal(true);
    });

    it('calls onRenderNewData when modelData changed', () => {
      const callback = sinon.spy();
      const wrapper = mount(<Molecule3d onRenderNewData={callback} modelData={modelData} />);
      wrapper.setProps({ modelData: modelData2 });
      expect(callback.callCount).to.equal(2);
      expect(callback.calledWith(glViewer)).to.equal(true);
    });

    it('doesn\'t call onRenderNewData when modelData not changed', () => {
      const callback = sinon.spy();
      const wrapper = mount(<Molecule3d atomLabelsShown={false} onRenderNewData={callback} modelData={modelData} />);
      wrapper.setProps({ modelData, atomLabelsShown: true }); // Need a changed property to force re-render
      expect(callback.callCount).to.equal(1);
      expect(callback.calledWith(glViewer)).to.equal(true);
    });

    it('doesn\'t call onRenderNewData when empty modelData supplied', () => {
      const callback = sinon.spy();
      mount(<Molecule3d onRenderNewData={callback} modelData={emptyModelData} />);
      expect(callback.callCount).to.equal(0);
    });
  });

  describe('render3dMol', () => {
    beforeEach(() => {
      sinon.spy(glViewer, 'addLabel');
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

    describe('when emptying modelData after set', () => {
      it('removes all viewer models', () => {
        const wrapper = mount(<Molecule3d modelData={modelData} />);
        expect(wrapper.node.glviewer.getModel()).to.not.equal(null);
        wrapper.setProps({ modelData: emptyModelData });
        expect(wrapper.node.glviewer.getModel()).to.equal(null);
      });
    });
  });
});
