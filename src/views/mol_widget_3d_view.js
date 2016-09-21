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
import environmentConstants from '../constants/environment_constants';
import libUtils from '../utils/lib_utils';
import moleculeUtils from '../utils/molecule_utils';

const jQuery = require('jquery');

window.$ = jQuery;
const $3Dmol = require('../vendor/3Dmol');

const DEFAULT_VISUALIZATION_TYPE = 'stick';
const DEFAULT_FONT_SIZE = 14;
const ORBITAL_COLOR_POSITIVE = 0xff0000;
const ORBITAL_COLOR_NEGATIVE = 0x0000ff;

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

    this.mydiv = this.mydiv || window.document.createElement('div');
    this.mydiv.classList.add('nbmolviz3d');
    this.mydiv.style.width = this.model.get('width');
    this.mydiv.style.height = this.model.get('height');
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

      if (this.model.get('selected_atom_indices').indexOf(atom.serial) !== -1) {
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

    // Shapes
    this.model.get('shapes').forEach((shape) => {
      if (shape.type) {
        glviewer[`add${shape.type}`](libUtils.getShapeSpec(shape, this.setSelectionTrait));
      }
    });

    // Orbital
    const orbital = this.model.get('orbital');
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
    const selectedAtomIndices = this.model.get('selected_atom_indices');
    const newSelectedAtomIndices = moleculeUtils.addSelection(
      atoms,
      selectedAtomIndices,
      atom,
      selectionType
    );

    this.model.set('selected_atom_indices', newSelectedAtomIndices);
    this.model.save();
  },
});

export default MolWidget3DView;
