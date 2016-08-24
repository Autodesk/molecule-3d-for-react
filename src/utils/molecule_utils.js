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
  addSelection(atoms, selectedAtoms, clickedAtom, selectionType) {
    let selectedAtomsOut = selectedAtoms.slice();
    const clickedIndex = selectedAtoms.indexOf(clickedAtom.serial);
    const toggleOn = clickedIndex === -1;

    if (selectionType === selectionTypesConstants.ATOM) {
      if (toggleOn) {
        selectedAtomsOut.push(clickedAtom.serial);
      } else {
        selectedAtomsOut.splice(clickedIndex, 1);
      }

      return selectedAtomsOut;
    }

    if (toggleOn) {
      atoms.forEach((atom) => {
        if (moleculeUtils.isSameGroup(clickedAtom, atom, selectionType)) {
          selectedAtomsOut.push(atom.serial);
        }
      });
    } else {
      selectedAtomsOut = selectedAtomsOut.filter((atomSerial) => {
        const atom = atoms[atomSerial];
        return !moleculeUtils.isSameGroup(clickedAtom, atom, selectionType);
      });
    }

    return selectedAtomsOut;
  },

  isSameGroup(atomA, atomB, selectionType) {
    if (selectionType === selectionTypesConstants.RESIDUE) {
      return atomA.residue_index === atomB.residue_index;
    }
    if (selectionType === selectionTypesConstants.CHAIN) {
      return atomA.chain === atomB.chain;
    }

    throw new Error('selectionType must be either residue or chain');
  },
};

export default moleculeUtils;
