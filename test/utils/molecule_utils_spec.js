/* global describe, it, before, after, beforeEach, afterEach */

import { expect } from 'chai';
import moleculeUtils from '../../src/utils/molecule_utils';
import bipyridineModelData from '../../example/js/bipyridine_model_data';
import selectionTypesConstants from '../../src/constants/selection_types_constants';

describe('moleculeUtils', () => {
  describe('modelDataToCDJSON', () => {
    let modelData = {};

    describe('when given valid modelData', () => {
      before(() => {
        modelData = bipyridineModelData;
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
        });
      });
    });
  });

  describe('addSelections', () => {
    let atoms;
    let selectedAtoms;
    let selectionType;
    let clickedAtom;

    beforeEach(() => {
      atoms = [
        { serial: 0, residue_index: 0, chain: 'A' },
        { serial: 1, residue_index: 0, chain: 'A' },
        { serial: 2, residue_index: 0, chain: 'A' },
        { serial: 3, residue_index: 1, chain: 'B' },
        { serial: 4, residue_index: 1, chain: 'B' },
        { serial: 5, residue_index: 1, chain: 'C' },
      ];
      selectedAtoms = [];
    });

    describe('when selectionType is atom', () => {
      beforeEach(() => {
        selectionType = selectionTypesConstants.ATOM;
      });

      describe('when the clicked atom is not already selected', () => {
        beforeEach(() => {
          clickedAtom = atoms[0];
        });

        it('adds the clicked atom to the selection', () => {
          const result = moleculeUtils.addSelection(
            atoms, selectedAtoms, clickedAtom, selectionType
          );
          expect(result).to.deep.equal([clickedAtom.serial]);
        });
      });

      describe('when the clicked atom is already selected', () => {
        beforeEach(() => {
          clickedAtom = atoms[0];
          selectedAtoms.push(clickedAtom.serial);
        });

        it('removes the clicked atom from the selection', () => {
          const result = moleculeUtils.addSelection(
            atoms, selectedAtoms, clickedAtom, selectionType
          );
          expect(result).to.deep.equal([]);
        });
      });
    });

    describe('when selectionType is residue', () => {
      beforeEach(() => {
        selectionType = selectionTypesConstants.RESIDUE;
      });

      describe('when the clicked atom is not already selected', () => {
        beforeEach(() => {
          clickedAtom = atoms[3];
        });

        it('adds atoms belonging to the clicked atom\'s residue to the selection', () => {
          const result = moleculeUtils.addSelection(
            atoms, selectedAtoms, clickedAtom, selectionType
          );
          expect(result).to.deep.equal([3, 4, 5]);
        });
      });

      describe('when the clicked atom is already selected, along with its whole residue', () => {
        beforeEach(() => {
          clickedAtom = atoms[3];
          selectedAtoms.push(clickedAtom.serial);
          selectedAtoms.push(4);
          selectedAtoms.push(5);
        });

        it('removes all atoms with the clicked atom\'s residue from the selection', () => {
          const result = moleculeUtils.addSelection(
            atoms, selectedAtoms, clickedAtom, selectionType
          );
          expect(result).to.deep.equal([]);
        });
      });

      describe('when the clicked atom is already selected, along with some of its residue', () => {
        beforeEach(() => {
          clickedAtom = atoms[3];
          selectedAtoms.push(clickedAtom.serial);
          selectedAtoms.push(5);
        });

        it('removes same residue atoms and leaves unselected ones unselected', () => {
          const result = moleculeUtils.addSelection(
            atoms, selectedAtoms, clickedAtom, selectionType
          );
          expect(result).to.deep.equal([]);
        });
      });
    });

    describe('when selectionType is chain', () => {
      beforeEach(() => {
        selectionType = selectionTypesConstants.CHAIN;
      });

      describe('when the clicked atom is not already selected', () => {
        beforeEach(() => {
          clickedAtom = atoms[3];
        });

        it('adds the clicked atom and its chain to the selection', () => {
          const result = moleculeUtils.addSelection(
            atoms, selectedAtoms, clickedAtom, selectionType
          );
          expect(result).to.deep.equal([3, 4]);
        });
      });

      describe('when the clicked atom and its chain are already selected', () => {
        beforeEach(() => {
          clickedAtom = atoms[3];
          selectedAtoms.push(clickedAtom.serial);
          selectedAtoms.push(4);
        });

        it('removes the clicked atom and other chain atoms from the selection', () => {
          const result = moleculeUtils.addSelection(
            atoms, selectedAtoms, clickedAtom, selectionType
          );
          expect(result).to.deep.equal([]);
        });
      });
    });
  });
});
