# nbmolviz3d
A data-bound 3D molecule visualizer based on [3Dmol.js](http://3dmol.csb.pitt.edu).

<img src="https://raw.githubusercontent.com/autodesk/nbmolviz3d/master/doc/close_screenshot.png" alt="screen shot" width="400" />

## Installation

    npm install nbmolviz3d

## Usage
nbmolviz3d is a Backbone module, so you can use it like this:

    import Backbone from 'backbone';
    import { Nbmolviz3dModel, Nbmolviz3dView } from 'nbmolviz3d';

    const model = new MolWidget3DModel({
      model_data: myModelData,
    });
    const view = new MolWidget3DView({
      model,
      el: document.querySelector('.app'),
    });

    view.render();

See [example/js/main.js](https://github.com/Autodesk/nbmolviz3d/blob/master/example/js/main.js) for a working example.

## API
All interaction with nbmolviz3d is done via the data in the model `MolWidget3DModel`.  Changing any of these values will immediately reflect in the visualization in the DOM.

### model_data {Object}
JSON data representing the actual molecular input.  Of the form:

    {
      atoms: [{
        serial,
        name,
        elem,
        mass_magnitude,
        residue_index,
        esidue_name,
        chain,
        positions,
        momenta,
      }, ... ],
      bonds: [{
        atom1_index,
        atom2_index,
        bond_order,
      }, ... ],
    }

### background_color {String} ['#73757C']
The background color of the visualization.

### background_opacity {Number 0-1} [1.0]
The opacity of the background.

### atom_labels_shown {Boolean} [false]
Indicates whether or not to show text labels on all atoms.

### styles {Array of Objects} [[]]
An array indicating how to style individual atoms.  Atoms are indicated by index, so the first style in this array corresponds to the first atom in `model_data.atoms`.  Of the form:

    [
      {
        visualization_type: 'stick'|'sphere'|'cartoon',
        color: '#abcdef',
      }, ...
    ]

### selected_atom_indices {Array of Numbers} [[]]
An array of atom indices indicating which atoms should be visually selected.

### selection_type {String} ['Atom']
A string indicating whether clicks select atoms ('Atom'), residues ('Residue'), or chains ('Chain').

### shape {Object} [{}]
Indicates a shape to display in the visualization using 3Dmol.js's [addShape method](http://3dmol.csb.pitt.edu/doc/$3Dmol.GLViewer.html#addShape).  For example:

    {
      type: 'Sphere',
	  x: 0,
	  y: 0,
	  z: 0,
    }

### orbital {Object} [{}]
Indicates an orbital to display using 3Dmol.js's [addIsosurface method](http://3dmol.csb.pitt.edu/doc/$3Dmol.GLViewer.html#addIsosurface).  Of the type:

	{
      cube_file,
      iso_val,
      opacity,
    }

## Example

<img src="https://raw.githubusercontent.com/autodesk/nbmolviz3d/master/doc/example_screenshot.png" alt="screen shot" width="400" />

An example is included which provides data-bound inputs that you can play with to see how they affect the visualization.  To run it, use the command:

    npm run example

## Development
Running the example above will also set up a typical development flow, where any changes to the code will be immediately reflected in the browser.

### Development within another project
If you're using this in another project and want to make changes to this repository locally and see them reflected in your other project, first you'll need to do some setup.  You can point your other project to use the local copy of nbmolviz3d like this:

    cd ~/path/to/nbmolviz3d
    npm link
    cd ~/path/to/other-project
    npm link nbmolviz3d

See [this great blog post](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) for more info on `npm link`.

Once you've linked your other project, you'll need to build nbmolviz3d (and likely your other project, too) every time you want your changes to reflect in your other project.  You can do this manually with `npm run build`.  If you want to rebuild nbmolviz3d automatically every time a change is made, run `npm run watch`.

## License

Copyright 2016 Autodesk Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Contributing
This project is developed and maintained by the [Molecular Design Toolkit](https://github.com/autodesk/molecular-design-toolkit) project. Please see that project's CONTRIBUTING document for details.
