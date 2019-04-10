import jQuery from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import libUtils from '../utils/lib_utils';
import moleculeUtils from '../utils/molecule_utils';
import selectionTypesConstants from '../constants/selection_types_constants';

window.$ = jQuery;
const $3Dmol = require('3dmol');

const DEFAULT_FONT_SIZE = 14;
const ORBITAL_COLOR_POSITIVE = 0xff0000;
const ORBITAL_COLOR_NEGATIVE = 0x0000ff;
const ORBITAL_DEFAULT_OPACITY = 0.8;

class Molecule3d extends React.Component {
  static defaultProps = {
    atomLabelsShown: false,
    backgroundOpacity: 1.0,
    backgroundColor: '#73757c',
    height: '500px',
    onRenderNewData: () => {},
    orbital: {},
    selectedAtomIds: [],
    selectionType: selectionTypesConstants.ATOM,
    shapes: [],
    labels: [],
    styles: {},
    width: '500px',
    outlineWidth: 0.0,
    outlineColor: '#000000',
    nearClip: null,
    farClip: null,
  }

  static propTypes = {
    atomLabelsShown: PropTypes.bool,
    backgroundColor: PropTypes.string,
    backgroundOpacity: PropTypes.number,
    height: PropTypes.string,
    modelData: PropTypes.shape({
      atoms: PropTypes.array,
      bonds: PropTypes.array,
    }).isRequired,
    onChangeSelection: PropTypes.func,
    onRenderNewData: PropTypes.func,
    orbital: PropTypes.shape({
      cube_file: PropTypes.string,
      iso_val: PropTypes.number,
      opacity: PropTypes.number,
      positiveVolumetricColor: PropTypes.string,
      negativeVolumetricColor: PropTypes.string,
    }),
    selectedAtomIds: PropTypes.arrayOf(PropTypes.number),
    selectionType: PropTypes.oneOf([
      selectionTypesConstants.ATOM,
      selectionTypesConstants.RESIDUE,
      selectionTypesConstants.CHAIN,
    ]),
    shapes: PropTypes.arrayOf(PropTypes.object),
    labels: PropTypes.arrayOf(PropTypes.object),
    styles: PropTypes.objectOf(PropTypes.object),
    width: PropTypes.string,
    nearClip: PropTypes.number,
    farClip: PropTypes.number,
    outlineWidth: PropTypes.number,
    outlineColor: PropTypes.string,
  }

  static isModelDataEmpty(modelData) {
    return modelData.atoms.length === 0 && modelData.bonds.length === 0;
  }

  static render3dMolModel(glviewer, modelData) {
    glviewer.clear();

    if (Molecule3d.isModelDataEmpty(modelData)) {
      return;
    }

    glviewer.addModel(moleculeUtils.modelDataToCDJSON(modelData), 'json', {
      keepH: true,
    });

    // Hack in chain and residue data, since it's not supported by chemdoodle json
    glviewer.getModel().selectedAtoms().forEach((atom) => {
      const modifiedAtom = atom;
      const resn = (modelData.atoms[atom.serial].residue_name || '').replace(
        /[0-9]+/, ''
      );
      modifiedAtom.atom = modelData.atoms[atom.serial].name;
      modifiedAtom.chain = modelData.atoms[atom.serial].chain;
      modifiedAtom.resi = modelData.atoms[atom.serial].residue_index;
      modifiedAtom.resn = resn;
    });
  }

  static render3dMolShapes(glviewer, shapes) {
    glviewer.removeAllShapes();
    shapes.forEach((shape) => {
      if (shape.type) {
        glviewer[`add${shape.type}`](libUtils.getShapeSpec(shape));
      }
    });
  }

  static render3dMolLabels(glviewer, labels) {
    glviewer.removeAllLabels();
    labels.forEach((label) => {
      glviewer.addLabel(label.text, label);
    });
  }

  static render3dMolOrbital(glviewer, orbital) {
    if (orbital.cube_file) {
      const volumeData = new $3Dmol.VolumeData(orbital.cube_file, 'cube');
      glviewer.addIsosurface(volumeData, {
        isoval: orbital.iso_val,
        color: orbital.positiveVolumetricColor || ORBITAL_COLOR_POSITIVE,
        opacity: orbital.opacity || ORBITAL_DEFAULT_OPACITY,
      });
      glviewer.addIsosurface(volumeData, {
        isoval: -orbital.iso_val,
        color: orbital.negativeVolumetricColor || ORBITAL_COLOR_NEGATIVE,
        opacity: orbital.opacity || ORBITAL_DEFAULT_OPACITY,
      });
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedAtomIds: props.selectedAtomIds,
    };

    this.lastOutline = { width: 0.0 };
  }

  componentDidMount() {
    this.render3dMol();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAtomIds: nextProps.selectedAtomIds,
    });
  }

  componentDidUpdate() {
    this.render3dMol();
  }

  onClickAtom = (glAtom) => {
    const atoms = this.props.modelData.atoms;
    const atom = atoms[glAtom.serial];
    const selectionType = this.props.selectionType;
    const newSelectedAtomIds = moleculeUtils.addSelection(
      atoms,
      this.state.selectedAtomIds,
      atom,
      selectionType
    );

    this.setState({
      selectedAtomIds: newSelectedAtomIds,
    });

    if (this.props.onChangeSelection) {
      this.props.onChangeSelection(newSelectedAtomIds);
    }
  }

  render3dMol() {
    if (!this.glviewer && Molecule3d.isModelDataEmpty(this.props.modelData)) {
      return;
    }

    const glviewer = this.glviewer || $3Dmol.createViewer(jQuery(this.container), {
      defaultcolors: $3Dmol.elementColors.rasmol,
    });

    const renderingSameModelData = moleculeUtils.modelDataEquivalent(
      this.oldModelData, this.props.modelData
    );
    if (!renderingSameModelData) {
      this.lastStylesByAtom = null;
      Molecule3d.render3dMolModel(glviewer, this.props.modelData);
    }

    if (this.props.outlineWidth !== this.lastOutline.width ||
        this.props.outlineColor !== this.lastOutline.color) {
      if (this.props.outlineWidth) {
        this.lastOutline = {
          style: 'outline',
          width: this.props.outlineWidth,
          color: this.props.outlineColor,
        };
      } else {
        this.lastOutline = {};
      }
      glviewer.setViewStyle(this.lastOutline);
    }

    const styleUpdates = Object.create(null); // style update strings to atom ids needed
    const stylesByAtom = Object.create(null); // all atom ids to style string
    this.props.modelData.atoms.forEach((atom, i) => {
      const selected = this.state.selectedAtomIds.indexOf(atom.serial) !== -1;
      const libStyle = libUtils.getLibStyle(
        atom, selected, this.props.atomLabelsShown, this.props.styles[i]
      );

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

      const libStyleString = JSON.stringify(libStyle);
      stylesByAtom[atom.serial] = libStyleString;

      // If the style string for this atom is the same as last time, then no
      // need to set it again
      if (this.lastStylesByAtom &&
        this.lastStylesByAtom[atom.serial] === libStyleString) {
        return;
      }

      // Initialize list of atom serials for this style string, if needed
      if (!styleUpdates[libStyleString]) {
        styleUpdates[libStyleString] = [];
      }

      styleUpdates[libStyleString].push(atom.serial);
    });

    this.lastStylesByAtom = stylesByAtom;

    // Set these style types using a minimum number of calls to 3DMol
    Object.entries(styleUpdates).forEach(([libStyleString, atomSerials]) => {
      glviewer.setStyle(
        { serial: atomSerials }, JSON.parse(libStyleString)
      );
    });

    Molecule3d.render3dMolShapes(glviewer, this.props.shapes);
    Molecule3d.render3dMolLabels(glviewer, this.props.labels);
    Molecule3d.render3dMolOrbital(glviewer, this.props.orbital);

    let customSlab = false;

    if (typeof (this.props.nearClip) === 'number' &&
        typeof (this.props.farClip) === 'number') {
      glviewer.setSlab(this.props.nearClip, this.props.farClip);
      customSlab = true;
    }

    glviewer.setBackgroundColor(
      libUtils.colorStringToNumber(this.props.backgroundColor),
      this.props.backgroundOpacity
    );

    glviewer.setClickable({}, true, this.onClickAtom);
    glviewer.render();

    if (!this.oldModelData) {
      glviewer.zoom();
      glviewer.zoomTo(0.8);
    }


    if (!renderingSameModelData) {
      if (!customSlab) glviewer.fitSlab();
      this.props.onRenderNewData(glviewer);
    }

    if (!this.glviewer) {
      // AMV: hack to correctly expand viewer when first rendered
      const self = this;

      const intId = setInterval(() => {
        // wait for canvas to be visible
        if (self.container.children.length > 0 && self.container.children[0].offsetParent) {
          glviewer.resize();
          clearInterval(intId);
        }
      }, 50); // polling time in ms
    }

    this.oldModelData = this.props.modelData;
    this.glviewer = glviewer;
  }

  render() {
    return (
      <div
        className="molecule-3d"
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

export default Molecule3d;
