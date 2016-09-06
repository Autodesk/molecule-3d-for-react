/**
 * Copyright 2016 Autodesk Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Backbone from 'backbone';
const jQuery = require('jquery');
window.$ = jQuery;
const $3Dmol = require('../vendor/3Dmol');
import moleculeUtils from '../utils/molecule_utils';
import environmentConstants from '../constants/environment_constants';
import libUtils from '../utils/lib_utils';

const DEFAULT_VISUALIZATION_TYPE = 'stick';
const DEFAULT_FONT_SIZE = 14;
const ORBITAL_COLOR_POSITIVE = 0xff0000;
const ORBITAL_COLOR_NEGATIVE = 0x0000ff;

function processCubeFile(cubeData, uuid) {
  const volumeData = new $3Dmol.VolumeData(cubeData, 'cube');
  this.pyObjects[uuid] = volumeData;
}

function batchCommands(commands) {
  const results = [];
  const viewer = this;
  commands.forEach((cmd) => {
    const fn = viewer[cmd[0]];
    const args = cmd[1];
    fn.apply(viewer, args);
    // results.push( fn.apply(viewer, args));
  });
  return results; // results are disabled because they sometimes lead to recursive JSON.
}

function renderPyShape(shape, spec, uuid, clickable) {
  const newSpec = spec;
  if (clickable === true) {
    newSpec.clickable = true;
    newSpec.callback = this.widget.setSelectionTrait;
  }
  const newShape = this[`add${shape}`](newSpec);
  newShape.pyid = uuid;
  this.pyObjects[uuid] = newShape;
}

function removePyShape(shapeId) {
  const shape = this.pyObjects[shapeId];
  this.removeShape(shape);
}

/*
function drawBond(atom1, atom2, order, spec) {
  const newSpec = spec;
  newSpec.start = {
    x: atom1.x,
    y: atom1.y,
    z: atom1.z,
  };
  newSpec.end = {
    x: atom1.x,
    y: atom1.y,
    z: atom1.z,
  };
}
*/

function setColorArray(mapping) {
  const atoms = this.selectedAtoms();
  for (const color of Object.keys(mapping)) {
    if (!mapping.hasOwnProperty(color)) continue;

    mapping[color].index.forEach((ind) => { // this is probably fragile
      const atom = atoms[ind];
      if (atom.index !== ind) {
        throw new Error(`selectedAtoms()[${ind}].index != ${ind}`);
      }
      const style = atom.style;
      for (const s of Object.keys(style)) {
        if (style.hasOwnProperty(s)) {
          style[s].color = color;
        }
      }
    });
  }
  this.forceRedraw();
}

function renderPyLabel(text, spec, uuid) {
  const label = this.addLabel(text, spec);
  this.pyObjects[uuid] = label;
}

function removePyLabel(labelId) {
  const label = this.pyObjects[labelId];
  this.removeLabel(label);
}


function drawIsosurface(dataId, shapeId, spec) {
  const data = this.pyObjects[dataId];
  const shape = this.addIsosurface(data, spec);
  this.pyObjects[shapeId] = shape;
}

function addFrameFromList(positionList) {
  const oldatoms = this.selectedAtoms({});
  const newatoms = [];
  for (let i = 0; i < oldatoms.length; i++) {
    const atom = jQuery.extend({}, oldatoms[i]);
    atom.x = positionList[i][0];
    atom.y = positionList[i][1];
    atom.z = positionList[i][2];
    newatoms.push(atom);
  }
  const model = this.getModel(0);
  return model.addFrame(newatoms);
}

function setPositions(positionList) {
  const atoms = this.selectedAtoms();
  for (let i = 0; i < atoms.length; i++) {
    const atom = atoms[i];
    atom.x = positionList[i][0];
    atom.y = positionList[i][1];
    atom.z = positionList[i][2];
  }
  this.forceRedraw();
}

function forceRedraw() {
  // relies on adding the forceRedraw method
  this.getModel().forceRedraw();
}

function setBonds(bonds) {
  const atoms = this.selectedAtoms();
  bonds.forEach((bond) => {
    const a = atoms[bond.index];
    a.bonds = bond.nbr;
    a.bondOrder = bond.order;
  });
}

const MolWidget3DView = Backbone.View.extend({
  initialize() {
    if (process.env.NODE_ENV === environmentConstants.DEVELOPMENT) {
      if (!window.nbmolviz3d) {
        window.nbmolviz3d = [];
      }

      window.nbmolviz3d.push(this);
    }

    this.model.on('change', this.render.bind(this));
  },

  render(event) {
    const modelDataChanged = !event || Object.keys(event.changed).indexOf('model_data') !== -1;

    this.messages = [];

    this.mydiv = this.mydiv || document.createElement('div');
    this.mydiv.classList.add('nbmolviz3d');
    this.mydiv.style.width = this.model.get('_width');
    this.mydiv.style.height = this.model.get('_height');
    this.mydiv.style.position = 'relative';

    if (!this.el.querySelector('.nbmolviz3d')) {
      this.el.appendChild(this.mydiv);
    }

    this.glviewer = this.renderViewer(modelDataChanged);

    if (this.send) {
      this.send({ event: 'ready' });
    }
  },

  renderViewer(modelDataChanged) {
    const glviewer = this.glviewer || $3Dmol.createViewer(jQuery(this.mydiv), {
      defaultcolors: $3Dmol.rasmolElementColors,
    });

    glviewer.clear();

    // Maybe want to remove this monkeypatching some day ...
    glviewer.setColorArray = setColorArray;
    glviewer.processCubeFile = processCubeFile;
    glviewer.pyObjects = {};
    glviewer.addFrameFromList = addFrameFromList;
    glviewer.drawIsosurface = drawIsosurface;
    glviewer.renderPyShape = renderPyShape;
    glviewer.renderPyLabel = renderPyLabel;
    glviewer.removePyShape = removePyShape;
    glviewer.removePyLabel = removePyLabel;
    glviewer.setPositions = setPositions;
    glviewer.forceRedraw = forceRedraw;
    glviewer.batchCommands = batchCommands;
    glviewer.setBonds = setBonds;

    const modelData = this.model.get('model_data');

    if (modelData) {
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
    }

    const styles = this.model.get('styles');
    modelData.atoms.forEach((atom, i) => {
      const style = styles[i] || {};
      const libStyle = {};
      const visualizationType = style.visualization_type || DEFAULT_VISUALIZATION_TYPE;

      libStyle[visualizationType] = {};
      Object.keys(style).forEach((styleKey) => {
        libStyle[visualizationType][styleKey] = style[styleKey];
      });

      if (this.model.get('selected_atoms').indexOf(atom.serial) !== -1) {
        libStyle[visualizationType].color = 0x1FF3FE;
      }

      if (typeof libStyle[visualizationType].color === 'string') {
        libStyle[visualizationType].color = libUtils.colorStringToNumber(
          libStyle[visualizationType].color
        );
      }

      if (this.model.get('atom_labels_shown')) {
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

    // Shape
    const shape = this.model.get('shape');
    if (shape.type) {
      glviewer[`add${shape.type}`](libUtils.getShapeSpec(shape, this.setSelectionTrait));
    }

    // Orbital
    const orbital = this.model.get('orbital');
    if (orbital.cube_file) {
      const volumeData = new $3Dmol.VolumeData(orbital.cube_file, 'cube');
      glviewer.addIsosurface(volumeData, {
        isoVal: orbital.iso_val,
        color: ORBITAL_COLOR_POSITIVE,
        opacity: orbital.opacity,
      });
      glviewer.addIsosurface(volumeData, {
        isoVal: -orbital.iso_val,
        color: ORBITAL_COLOR_NEGATIVE,
        opacity: orbital.opacity,
      });
    }

    glviewer.setBackgroundColor(
      libUtils.colorStringToNumber(this.model.get('background_color')),
      this.model.get('background_opacity')
    );

    glviewer.setClickable({}, true, this.onClick.bind(this));
    glviewer.render();

    if (modelDataChanged) {
      glviewer.zoomTo();
      glviewer.zoom(0.8, 2000);
    }

    return glviewer;
  },

  onClick(glAtom) {
    const atoms = this.model.get('model_data').atoms;
    const atom = atoms[glAtom.serial];
    const selectionType = this.model.get('selection_type');
    const selectedAtoms = this.model.get('selected_atoms');
    const newSelectedAtoms = moleculeUtils.addSelection(
      atoms,
      selectedAtoms,
      atom,
      selectionType
    );

    this.model.set('selected_atoms', newSelectedAtoms);
    this.model.save();
  },
});

export default MolWidget3DView;
