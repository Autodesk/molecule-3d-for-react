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

// Set up jquery for Backbone
import jquery from 'jquery';
import MolWidget3DModel from './models/mol_widget_3d_model';
import MolWidget3DView from './views/mol_widget_3d_view';

if (window) {
  window.jquery = jquery;
  window.$ = jquery;
}


export { MolWidget3DModel, MolWidget3DView };
