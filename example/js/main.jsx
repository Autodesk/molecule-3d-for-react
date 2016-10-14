import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Nbmolviz3dReact } from '../../src/main.js';
import Settings from './settings.jsx';
// import modelData from './3aid_model_data';
// import styles from './3aid_styles';
import modelData from './bipyridine_model_data';
import styles from './bipyridine_styles';
import orbital from './orbital';

const shapes = [{
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
}];

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeMolecule = this.onChangeMolecule.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.onChangeModelData = this.onChangeModelData.bind(this);
    this.onChangeStyles = this.onChangeStyles.bind(this);
    this.onChangeShapes = this.onChangeShapes.bind(this);
    this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
    this.onChangeBackgroundOpacity = this.onChangeBackgroundOpacity.bind(this);
    this.onChangeSelectionType = this.onChangeSelectionType.bind(this);
    this.onChangeAtomLabelsShown = this.onChangeAtomLabelsShown.bind(this);
    this.onChangeOrbital = this.onChangeOrbital.bind(this);

    this.state = {
      modelData,
      styles,
      shapes,
      orbital,
      selectedAtomIndices: [],
    };
  }

  onChangeMolecule(newModelData, newStyles) {
    this.setState({ modelData: newModelData, styles: newStyles });
  }

  onChangeSelection(newSelectedAtomIndices) {
    this.setState({ selectedAtomIndices: newSelectedAtomIndices });
  }

  onChangeModelData(newModelData) {
    this.setState({ modelData: newModelData });
  }

  onChangeStyles(newStyles) {
    this.setState({ styles: newStyles });
  }

  onChangeShapes(newShapes) {
    this.setState({ shapes: newShapes });
  }

  onChangeBackgroundColor(newBackgroundColor) {
    this.setState({ backgroundColor: newBackgroundColor });
  }

  onChangeBackgroundOpacity(newBackgroundOpacity) {
    this.setState({ backgroundOpacity: newBackgroundOpacity });
  }

  onChangeSelectionType(newSelectionType) {
    this.setState({ selectionType: newSelectionType });
  }

  onChangeAtomLabelsShown(newAtomLabelsShown) {
    this.setState({ atomLabelsShown: newAtomLabelsShown });
  }

  onChangeOrbital(newOrbital) {
    this.setState({ orbital: newOrbital });
  }


  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Nbmolviz3dReact
          atomLabelsShown={this.state.atomLabelsShown}
          backgroundColor={this.state.backgroundColor}
          backgroundOpacity={this.state.backgroundOpacity}
          modelData={this.state.modelData}
          selectedAtomIndices={this.state.selectedAtomIndices}
          selectionType={this.state.selectionType}
          shapes={this.state.shapes}
          styles={this.state.styles}
          orbital={this.state.orbital}
          onChangeSelection={this.onChangeSelection}
        />
        <Settings
          atomLabelsShown={this.state.atomLabelsShown}
          backgroundColor={this.state.backgroundColor}
          backgroundOpacity={this.state.backgroundOpacity}
          modelData={this.state.modelData}
          onChangeMolecule={this.onChangeMolecule}
          onChangeSelection={this.onChangeSelection}
          onChangeModelData={this.onChangeModelData}
          onChangeStyles={this.onChangeStyles}
          onChangeShapes={this.onChangeShapes}
          onChangeBackgroundColor={this.onChangeBackgroundColor}
          onChangeBackgroundOpacity={this.onChangeBackgroundOpacity}
          onChangeSelectionType={this.onChangeSelectionType}
          onChangeAtomLabelsShown={this.onChangeAtomLabelsShown}
          onChangeOrbital={this.onChangeOrbital}
          orbital={this.state.orbital}
          selectedAtomIndices={this.state.selectedAtomIndices}
          selectionType={this.state.selectionType}
          shapes={this.state.shapes}
          styles={this.state.styles}
        />
      </div>
    );
  }
}

render(
  <Example />,
  document.querySelector('.nbmolviz3d')
);
