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
};

export default moleculeUtils;
