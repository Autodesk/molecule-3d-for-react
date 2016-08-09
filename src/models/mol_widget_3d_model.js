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

const MolWidget3DModel = Backbone.Model.extend({
  defaults: {
    _model_name: 'MolWidget3DModel',
    _view_name: 'MolWidget3DView',
    _model_module: 'nbmolviz-js',
    _view_module: 'nbmolviz-js',
    _width: '500px',
    _height: '500px',
    _where: 'inline',
    viewerId: '',
    click_selection: -1,
    background_color: null,
    color: null,
    font_family: '',
    font_size: '',
    font_style: '',
    font_weight: '',
    layout: undefined,
    msg_throttle: 3,
    visible: true,
    modelData: '',
    modelDataFormat: '',
  },
});

export default MolWidget3DModel;
