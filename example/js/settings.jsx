import React from 'react';
import { Map as IMap } from 'immutable';
import aidModelData from './3aid_model_data';
import aidStyles from './3aid_styles';
import bipyridineModelData from './bipyridine_model_data';
import bipyridineStyles from './bipyridine_styles';
import selectionTypesConstants from '../../src/constants/selection_types_constants';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.onClickSmallButton = this.onClickSmallButton.bind(this);
    this.onClickLargeButton = this.onClickLargeButton.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.onChangeModelData = this.onChangeModelData.bind(this);
    this.onChangeStyles = this.onChangeStyles.bind(this);
    this.onChangeShapes = this.onChangeShapes.bind(this);
    this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
    this.onChangeBackgroundOpacity = this.onChangeBackgroundOpacity.bind(this);
    this.onBlurSelection = this.onBlurSelection.bind(this);
    this.onBlurModelData = this.onBlurModelData.bind(this);
    this.onBlurStyles = this.onBlurStyles.bind(this);
    this.onBlurShapes = this.onBlurShapes.bind(this);
    this.onBlurBGColor = this.onBlurBGColor.bind(this);
    this.onBlurBGOpacity = this.onBlurBGOpacity.bind(this);
    this.onBlurOrbitalInput = this.onBlurOrbitalInput.bind(this);
    this.onChangeOrbital = this.onChangeOrbital.bind(this);
    this.onChangeSelectionType = this.onChangeSelectionType.bind(this);
    this.onChangeLabelsInput = this.onChangeLabelsInput.bind(this);

    this.state = {
      selectedAtomIndices: JSON.stringify(props.selectedAtomIndices),
      modelData: JSON.stringify(props.modelData),
      shapes: JSON.stringify(props.shapes),
      styles: JSON.stringify(props.styles),
      backgroundColor: props.backgroundColor,
      backgroundOpacity: props.backgroundOpacity,
      orbital: JSON.stringify(props.orbital),
      selectionType: props.selectionType,
      atomLabelsShown: props.atomLabelsShown,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAtomIndices: JSON.stringify(nextProps.selectedAtomIndices),
      styles: JSON.stringify(nextProps.styles),
      shapes: JSON.stringify(nextProps.shapes),
      modelData: JSON.stringify(nextProps.modelData),
      backgroundColor: nextProps.backgroundColor,
      backgroundOpacity: nextProps.backgroundOpacity,
      orbital: JSON.stringify(nextProps.orbital),
      selectionType: nextProps.selectionType,
      atomLabelsShown: nextProps.atomLabelsShown,
    });
  }

  onClickSmallButton() {
    this.props.onChangeMolecule(bipyridineModelData, bipyridineStyles);
  }

  onClickLargeButton() {
    this.props.onChangeMolecule(aidModelData, aidStyles);
  }

  onBlurSelection(event) {
    this.props.onChangeSelection(JSON.parse(event.target.value));
  }

  onChangeSelection(event) {
    this.setState({ selectedAtomIndices: event.target.value });
  }

  onChangeModelData(event) {
    this.setState({ modelData: event.target.value });
  }

  onBlurModelData(event) {
    this.props.onChangeModelData(JSON.parse(event.target.value));
  }

  onChangeStyles(event) {
    this.setState({ styles: event.target.value });
  }

  onBlurStyles(event) {
    this.props.onChangeStyles(JSON.parse(event.target.value));
  }

  onChangeShapes(event) {
    this.setState({ shapes: event.target.value });
  }

  onBlurShapes(event) {
    this.props.onChangeShapes(JSON.parse(event.target.value));
  }

  onChangeBackgroundColor(event) {
    this.setState({ backgroundColor: event.target.value });
  }

  onBlurBGColor(event) {
    this.props.onChangeBackgroundColor(event.target.value);
  }

  onChangeBackgroundOpacity(event) {
    this.setState({ backgroundOpacity: event.target.value });
  }

  onBlurBGOpacity(event) {
    this.props.onChangeBackgroundOpacity(parseFloat(event.target.value));
  }

  onChangeSelectionType(event) {
    this.props.onChangeSelectionType(event.target.value);
  }

  onChangeLabelsInput(event) {
    this.props.onChangeAtomLabelsShown(event.target.checked);
  }

  onChangeOrbital(event) {
    this.setState({ orbital: event.target.value });
  }

  onBlurOrbitalInput(event) {
    this.props.onChangeOrbital(JSON.parse(event.target.value));
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickSmallButton}>Small Molecule</button>
        <button onClick={this.onClickLargeButton}>Large Molecule</button>

        <h4>selectedAtomIndices</h4>
        <input
          value={this.state.selectedAtomIndices}
          onChange={this.onChangeSelection}
          onBlur={this.onBlurSelection}
        />

        <h4>modelData</h4>
        <textarea
          cols="100"
          rows="8"
          value={this.state.modelData}
          onChange={this.onChangeModelData}
          onBlur={this.onBlurModelData}
        />

        <h4>styles</h4>
        <textarea
          cols="100"
          value={this.state.styles}
          onChange={this.onChangeStyles}
          onBlur={this.onBlurStyles}
        />

        <h4>shapes</h4>
        <textarea
          cols="60"
          value={this.state.shapes}
          onChange={this.onChangeShapes}
          onBlur={this.onBlurShapes}
        />

        <h4>backgroundColor and backgroundOpacity</h4>
        <input
          value={this.state.backgroundColor}
          onChange={this.onChangeBackgroundColor}
          onBlur={this.onBlurBGColor}
        />
        <input
          value={this.state.backgroundOpacity}
          onChange={this.onChangeBackgroundOpacity}
          onBlur={this.onBlurBGOpacity}
        />

        <h4>selectionType</h4>
        <select
          value={this.state.selectionType}
          onChange={this.onChangeSelectionType}
        >
          {
            Object.values(selectionTypesConstants).map((selectionType, i) =>
              <option key={i}>
                {selectionType}
              </option>
            )
          }
        </select>

        <h4>atomLabelsShown</h4>
        <input
          type="checkbox"
          value={this.state.atomLabelsShown}
          onChange={this.onChangeLabelsInput}
        />

        <h4>orbital</h4>
        <textarea
          cols="60"
          rows="6"
          value={this.state.orbital}
          onChange={this.onChangeOrbital}
          onBlur={this.onBlurOrbitalInput}
        />
      </div>
    );
  }
}

Settings.defaultProps = {
  atomLabelsShown: false,
  backgroundOpacity: 1.0,
  backgroundColor: '',
  orbital: {},
  selectedAtomIndices: [],
  selectionType: selectionTypesConstants.ATOM,
  shapes: [],
  styles: [],
};

Settings.propTypes = {
  atomLabelsShown: React.PropTypes.bool,
  backgroundColor: React.PropTypes.string,
  backgroundOpacity: React.PropTypes.number,
  modelData: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(IMap),
    React.PropTypes.object,
  ]).isRequired,
  shapes: React.PropTypes.arrayOf(React.PropTypes.object),
  styles: React.PropTypes.objectOf(React.PropTypes.object),
  onChangeMolecule: React.PropTypes.func.isRequired,
  onChangeSelection: React.PropTypes.func.isRequired,
  onChangeModelData: React.PropTypes.func.isRequired,
  onChangeStyles: React.PropTypes.func.isRequired,
  onChangeShapes: React.PropTypes.func.isRequired,
  onChangeBackgroundColor: React.PropTypes.func.isRequired,
  onChangeBackgroundOpacity: React.PropTypes.func.isRequired,
  onChangeSelectionType: React.PropTypes.func.isRequired,
  onChangeAtomLabelsShown: React.PropTypes.func.isRequired,
  onChangeOrbital: React.PropTypes.func.isRequired,
  orbital: React.PropTypes.shape({
    iso_val: React.PropTypes.number,
    opacity: React.PropTypes.number,
    cube_file: React.PropTypes.string,
  }),
  selectedAtomIndices: React.PropTypes.arrayOf(React.PropTypes.number),
  selectionType: React.PropTypes.string,
};

/*
const ExampleSettingsView = Backbone.View.extend({
  render() {
    const orbitalLabel = document.createElement('h4');
    orbitalLabel.innerHTML = 'orbital';
    this.el.appendChild(orbitalLabel);
    const orbitalTA = document.createElement('textarea');
    orbitalTA.cols = '60';
    orbitalTA.rows = '6';
    orbitalTA.value = JSON.stringify(this.model.get('orbital'));
    orbitalTA.addEventListener('blur', this.onBlurOrbitalInput.bind(this));
    this.el.appendChild(orbitalTA);

    return this;
  },
});
*/

export default Settings;
