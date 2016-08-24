import selectionTypesConstants from '../constants/selection_types_constants';

const moleculeUtils = {
  /**
   * Given molecule model data, return a JSON object in ChemDoodle format
   * @param modelData {Object}
   * @returns {String}
   */
  modelDataToCDJSON(modelData) {
    const atoms = modelData.atoms.map((atom) => ({
      l: atom.elem,
      x: atom.positions[0],
      y: atom.positions[1],
      z: atom.positions[2],
      mass: atom.mass_magnitude,
    }));

    const bonds = modelData.bonds.map((bond) => ({
      b: bond.atom1_index,
      e: bond.atom2_index,
      o: bond.bond_order,
    }));

    return {
      m: [{
        a: atoms,
        b: bonds,
      }],
    };
  },

  // TODO if selection_type is residue or chain, select all atoms in the clicked atom's
  // residue/chain
  addSelection(selectedAtoms, clickedAtom, selectionType) {
    const selectedAtomsOut = selectedAtoms.slice();
    const index = selectedAtoms.indexOf(clickedAtom.serial);

    if (selectionType === selectionTypesConstants.ATOM) {
      if (index !== -1) {
        selectedAtomsOut.splice(index, 1);
      } else {
        selectedAtomsOut.push(clickedAtom.serial);
      }
    }

    return selectedAtomsOut;
  },
};

export default moleculeUtils;
