import 'babel-polyfill';
import Backbone from 'backbone';
import { MolWidget3DModel, MolWidget3DView } from '../../src/main.js';
import ExampleSettingsView from './example_settings_view';
// import modelData from './3aid_model_data';
// import styles from './3aid_styles';
import modelData from './bipyridine_model_data';
import styles from './bipyridine_styles';
import orbital from './orbital';
import selectionTypesConstants from '../../src/constants/selection_types_constants';

Backbone.sync = () => {};

// Set up nbmolviz3d
const model = new MolWidget3DModel({
  model_data: modelData,
  styles,
  shapes: [{
    type: 'Arrow',
    start: {
      x: 0,
      y: 0,
      z: -2.5,
    },
    end: {
      x: 0,
      y: 0,
      z: 3,
    },
  }],
  selection_type: selectionTypesConstants.ATOM,
  orbital,
});
const view = new MolWidget3DView({
  model,
  el: document.querySelector('.nbmolviz3d'),
});
view.render();

// Set up example settings controls
const settingsView = new ExampleSettingsView({
  model,
});
document.querySelector('.data').appendChild(settingsView.render().el);
