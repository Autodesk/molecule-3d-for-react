import Backbone from 'backbone';
import { MolWidget3DModel, MolWidget3DView } from '../../src/main.js';
import ExampleSettingsView from './example_settings_view';
import aidModelData from './3aid_model_data';
import aidStyles from './3aid_styles';

Backbone.sync = () => {};

// Set up nbmolviz3d
const model = new MolWidget3DModel({
  model_data: aidModelData,
  styles: aidStyles,
  shape: {
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
  },
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
