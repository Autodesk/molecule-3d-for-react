import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Nbmolviz3dReact } from '../../src/main.js';
import ExampleSettingsView from './example_settings_view';
// import modelData from './3aid_model_data';
// import styles from './3aid_styles';
import modelData from './bipyridine_model_data';
import styles from './bipyridine_styles';
import orbital from './orbital';

render(
  <Nbmolviz3dReact
    modelData={modelData}
    shapes={[{
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
    }]}
    orbital={orbital}
  />,
  document.querySelector('.nbmolviz3d')
);

// Set up example settings controls
/*
const settingsView = new ExampleSettingsView({
  model,
});
*/
// document.querySelector('.data').appendChild(settingsView.render().el);
