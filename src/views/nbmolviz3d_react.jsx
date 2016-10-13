import jQuery from 'jquery';
import React from 'react';
import { Map as IMap } from 'immutable';
import libUtils from '../utils/lib_utils';
import moleculeUtils from '../utils/molecule_utils';
import selectionTypesConstants from '../constants/selection_types_constants';

window.$ = jQuery;
const $3Dmol = require('../vendor/3Dmol');

const DEFAULT_VISUALIZATION_TYPE = 'stick';
const DEFAULT_FONT_SIZE = 14;
const ORBITAL_COLOR_POSITIVE = 0xff0000;
const ORBITAL_COLOR_NEGATIVE = 0x0000ff;

class Nbmolviz3dReact extends React.Component {
  componentDidMount() {
    this.renderNbmolviz();
  }

  shouldComponentUpdate(nextProps) {
    const changingModelData = IMap.isMap(nextProps.modelData) &&
      (nextProps.modelData !== this.props.modelData);
    const changingBG = nextProps.backgroundColor !== this.props.backgroundColor;

    return changingModelData || changingBG;
  }

  componentDidUpdate() {
    this.renderNbmolviz();
  }

  onClick(glAtom) {
    const modelData = IMap.isMap(this.props.modelData) ?
      this.props.modelData.toJS() : this.props.modelData;
    const atoms = modelData.atoms;
    const atom = atoms[glAtom.serial];
    const selectionType = this.props.selectionType;
    const selectedAtomIndices = this.props.selectedAtomIndices;
    const newSelectedAtomIndices = moleculeUtils.addSelection(
      atoms,
      selectedAtomIndices,
      atom,
      selectionType
    );

    this.setState({
      selectedAtomIndices: newSelectedAtomIndices,
    });
  }

  renderNbmolviz() {
    const modelData = IMap.isMap(this.props.modelData) ?
      this.props.modelData.toJS() : this.props.modelData;

    if (!modelData.atoms.length || !modelData.bonds.length) {
      return;
    }

    const glviewer = this.glviewer || $3Dmol.createViewer(jQuery(this.container), {
      defaultcolors: $3Dmol.rasmolElementColors,
    });

    glviewer.clear();

    glviewer.addModel(moleculeUtils.modelDataToCDJSON(modelData), 'json', {
      keepH: true,
    });

    // Hack in chain and residue data, since it's not supported by chemdoodle json
    glviewer.getModel().selectedAtoms().forEach((atom) => {
      const modifiedAtom = atom;
      modifiedAtom.atom = modelData.atoms[atom.serial].name;
      modifiedAtom.chain = modelData.atoms[atom.serial].chain;
      modifiedAtom.resi = modelData.atoms[atom.serial].residue_index;
      modifiedAtom.resn = modelData.atoms[atom.serial].residue_name;
    });

    const styles = this.props.styles;
    modelData.atoms.forEach((atom, i) => {
      const style = styles[i] || {};
      const libStyle = {};
      const visualizationType = style.visualization_type || DEFAULT_VISUALIZATION_TYPE;

      libStyle[visualizationType] = {};
      Object.keys(style).forEach((styleKey) => {
        libStyle[visualizationType][styleKey] = style[styleKey];
      });

      if (this.props.selectedAtomIndices.indexOf(atom.serial) !== -1) {
        libStyle[visualizationType].color = 0x1FF3FE;
      }

      if (typeof libStyle[visualizationType].color === 'string') {
        libStyle[visualizationType].color = libUtils.colorStringToNumber(
          libStyle[visualizationType].color
        );
      }

      if (this.props.atomLabelsShown) {
        glviewer.addLabel(atom.name, {
          fontSize: DEFAULT_FONT_SIZE,
          position: {
            x: atom.positions[0],
            y: atom.positions[1],
            z: atom.positions[2],
          },
        });
      }

      glviewer.setStyle({ serial: atom.serial }, libStyle);
    });

    // Shapes
    this.props.shapes.forEach((shape) => {
      if (shape.type) {
        glviewer[`add${shape.type}`](libUtils.getShapeSpec(shape, this.setSelectionTrait));
      }
    });

    // Orbital
    const orbital = this.props.orbital;
    if (orbital.cube_file) {
      const volumeData = new $3Dmol.VolumeData(orbital.cube_file, 'cube');
      glviewer.addIsosurface(volumeData, {
        isoval: orbital.iso_val,
        color: ORBITAL_COLOR_POSITIVE,
        opacity: orbital.opacity,
      });
      glviewer.addIsosurface(volumeData, {
        isoval: -orbital.iso_val,
        color: ORBITAL_COLOR_NEGATIVE,
        opacity: orbital.opacity,
      });
    }

    glviewer.setBackgroundColor(
      libUtils.colorStringToNumber(this.props.backgroundColor),
      this.props.backgroundOpacity
    );

    glviewer.setClickable({}, true, this.onClick.bind(this));
    glviewer.render();

    // TODO don't zoom when changing molecules
    glviewer.zoomTo();
    glviewer.zoom(0.8, 2000);

    this.glviewer = glviewer;
  }

  render() {
    return (
      <div
        className="nbmolviz3d"
        style={{
          width: this.props.width,
          height: this.props.height,
          position: 'relative',
          margin: '0 auto',
        }}
        ref={(c) => { this.container = c; }}
      />
    );
  }
}

Nbmolviz3dReact.defaultProps = {
  atomLabelsShown: false,
  backgroundOpacity: 1.0,
  backgroundColor: '#73757c',
  height: '500px',
  orbital: {},
  selectedAtomIndices: [],
  selectionType: selectionTypesConstants.ATOM,
  shapes: [],
  styles: [],
  width: '500px',
};

Nbmolviz3dReact.propTypes = {
  atomLabelsShown: React.PropTypes.bool,
  backgroundColor: React.PropTypes.string,
  backgroundOpacity: React.PropTypes.number,
  height: React.PropTypes.string,
  modelData: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(IMap),
    React.PropTypes.object,
  ]).isRequired,
  orbital: React.PropTypes.shape({
    cube_file: React.PropTypes.string,
    iso_val: React.PropTypes.number,
    opacity: React.PropTypes.number,
  }),
  selectedAtomIndices: React.PropTypes.arrayOf(React.PropTypes.number),
  selectionType: React.PropTypes.oneOf([
    selectionTypesConstants.ATOM,
    selectionTypesConstants.RESIDUE,
    selectionTypesConstants.CHAIN,
  ]),
  shapes: React.PropTypes.arrayOf(React.PropTypes.object),
  styles: React.PropTypes.arrayOf(React.PropTypes.object),
  width: React.PropTypes.string,
};

export default Nbmolviz3dReact;
