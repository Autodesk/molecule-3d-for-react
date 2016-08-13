import Backbone from 'backbone';
import { MolWidget3DModel, MolWidget3DView } from '../../src/main.js';
import bipyridineModelData from './bipyridine_model_data';

Backbone.sync = () => {};

const model = new MolWidget3DModel({
  model_data: bipyridineModelData,
  model_data_format: 'sdf',
});
const view = new MolWidget3DView({
  model,
  el: document.querySelector('.app'),
});

view.render();
