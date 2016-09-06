/**
 * Copyright 2016 Autodesk Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Backbone from 'backbone';
import selectionTypesConstants from '../constants/selection_types_constants';

const MolWidget3DModel = Backbone.Model.extend({
  defaults: {
    _model_name: 'MolWidget3DModel',
    _view_name: 'MolWidget3DView',
    _model_module: 'nbmolviz-js',
    _view_module: 'nbmolviz-js',
    _width: '500px',
    _height: '500px',
    viewerId: '',
    _click_selection: -1,
    atom_labels_shown: false,
    background_color: '#73757C',
    background_opacity: 1.0,
    color: null,
    font_family: '',
    font_size: '',
    font_style: '',
    font_weight: '',
    layout: undefined,
    msg_throttle: 3,
    visible: true,
    model_data: '',
    styles: [],
    selected_atoms: [],
    selection_type: selectionTypesConstants.ATOM,
    shape: {
      type: '',
      x: null,
      y: null,
      z: null,
    },
    orbital: {
      cube_file: '',
      iso_val: null,
      opacity: null,
    },
  },
});

export default MolWidget3DModel;
