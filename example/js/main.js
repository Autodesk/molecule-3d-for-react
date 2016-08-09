import Backbone from 'backbone';
import { MolWidget3DModel, MolWidget3DView } from '../../src/main.js';
const bipyridine = require('raw!./bipyridine.sdf');

Backbone.sync = () => {};

const model = new MolWidget3DModel({
  model_data: bipyridine,
  model_data_format: 'sdf',
});
const view = new MolWidget3DView({
  model,
  el: document.querySelector('.app'),
});

view.render();
