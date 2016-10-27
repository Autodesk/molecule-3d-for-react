# Molecule3d
[![Build Status](https://travis-ci.org/Autodesk/molecule-3d-for-react.svg?branch=master)](https://travis-ci.org/Autodesk/molecule-3d-for-react)
A data-bound React wrapper for [3dmol.js](http://3dmol.csb.pitt.edu) that visualizes any molecule in 3D.

<img src="https://raw.githubusercontent.com/Autodesk/molecule-3d-for-react/master/doc/close_screenshot.png" alt="screen shot" width="400" />

## Installation

    npm install molecule-3d-for-react

## Usage
    <Molecule3d
      modelData={{
        atoms: [...],
        bonds: [...],
      }}
    />

See below for the full spec of what data can be passed in, and check out [example/js/main.js](https://github.com/Autodesk/molecule-3d-for-react/blob/master/example/js/main.js) for a working example.

## Props
In order to set up your molecule visualization, just pass in the proper props data to the React component. Here are all of the parameters with explanations:

### modelData {Object} Required
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

An example of full working modelData for a real molecule can be found in [example/js/bipyridine_model_data.js](https://github.com/Autodesk/molecule-3d-for-react/blob/master/example/js/bipyridine_model_data.js).

### backgroundColor {String} ['#73757C']
The background color of the visualization.

### backgroundOpacity {Number 0-1} [1.0]
The opacity of the background.

### atomLabelsShown {Boolean} [false]
Indicates whether or not to show text labels on all atoms.

### styles {Array of Objects} [[]]
An array indicating how to style individual atoms.  Atoms are indicated by index, so the first style in this array corresponds to the first atom in `model_data.atoms`.  Of the form:

    [
      {
        visualization_type: 'stick'|'sphere'|'cartoon',
        color: '#abcdef',
      }, ...
    ]

An example of a styles array for the bipyridine molecule can be found in [example/js/bipyridine_styles.js](https://github.com/Autodesk/molecule-3d-for-react/blob/master/example/js/bipyridine_styles.js).

### selectedAtomIds {Array of Numbers} [[]]
An array of atom indices indicating which atoms should be visually selected.

### selectionType {String} ['Atom']
A string indicating whether clicks select atoms ('Atom'), residues ('Residue'), or chains ('Chain').

### shapes {Array of Objects} [[]]
Indicates any shapes to display in the visualization using 3Dmol.js's [addShape method](http://3dmol.csb.pitt.edu/doc/$3Dmol.GLViewer.html#addShape).  For example:

    [{
      type: 'Sphere',
	  x: 0,
	  y: 0,
	  z: 0,
    }]

### orbital {Object} [{}]
Indicates an orbital to display using 3Dmol.js's [addIsosurface method](http://3dmol.csb.pitt.edu/doc/$3Dmol.GLViewer.html#addIsosurface).  Of the type:

	{
      cube_file,
      iso_val,
      opacity,
    }

## Example

<img src="https://raw.githubusercontent.com/Autodesk/molecule-3d-for-react/master/doc/example_screenshot.png" alt="screen shot" width="400" />

An example is included which provides data-bound inputs that you can play with to see how they affect the visualization.  To run it, use the command:

    npm run example

## What about 2d?
Take a look at our sister project, [molecule-2d-for-react](https://github.com/Autodesk/molecule-2d-for-react), for a React component with a similar interface that renders a 2d visualization.


## Development
Running the example above will also set up a typical development flow, where any changes to the code will be immediately reflected in the browser.

### Development within another project
If you're using this in another project and want to make changes to this repository locally and see them reflected in your other project, first you'll need to do some setup.  You can point your other project to use the local copy of molecule-3d-for-react like this:

    cd ~/path/to/molecule-3d-for-react
    npm link
    cd ~/path/to/other-project
    npm link molecule-3d-for-react

See [this great blog post](http://justjs.com/posts/npm-link-developing-your-own-npm-modules-without-tears) for more info on `npm link`.

Once you've linked your other project, you'll need to build molecule-3d-for-react (and likely your other project, too) every time you want your changes to reflect in your other project.  You can do this manually with `npm run build`.  If you want to rebuild molecule-3d-for-react automatically every time a change is made, run `npm run watch`.

### Running Tests
Unit tests can be run with:

    npm test

End-to-end tests can be run with:

    npm run e2e

### Releasing a new version
A new version should be released via npm every time new code is merged to master.  Currently, this process is manual and obviously must be done by a collaborator of the npm package.

On master, upgrading the version looks like the following:

    npm version patch -m "Upgrade to %s for reasons"
    git push origin master
    git push origin --tags
    npm publish

## License

Copyright 2016 Autodesk Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Contributing
This project is developed and maintained by the [Molecular Design Toolkit](https://github.com/autodesk/molecular-design-toolkit) project. Please see that project's CONTRIBUTING document for details.
