import Backbone from 'backbone';
import { MolWidget3DModel, MolWidget3DView } from '../../src/main.js';
import ExampleSettingsView from './example_settings_view';
import bipyridineModelData from './bipyridine_model_data';

Backbone.sync = () => {};

// Set up nbmolviz3d
const model = new MolWidget3DModel({
  model_data: bipyridineModelData,
  styles: [
    { visualization_type: 'stick', color: '#fedcba' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#fedcba' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#abcdef' },
    { visualization_type: 'stick', color: '#bada55' },
    { visualization_type: 'stick', color: '#bada55' },
    { visualization_type: 'stick', color: '#bada55' },
    { visualization_type: 'stick', color: '#bada55' },
    { visualization_type: 'stick', color: '#bada55' },
    { visualization_type: 'stick', color: '#bada55' },
    { visualization_type: 'stick', color: '#bada55' },
    { visualization_type: 'stick', color: '#bada55' },
  ],
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
