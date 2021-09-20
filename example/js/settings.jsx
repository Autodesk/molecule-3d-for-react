import React from 'react';
import PropTypes from 'prop-types';
import { Map as IMap } from 'immutable';
import aidModelData from './3aid_model_data';
import aidStyles from './3aid_styles';
import bipyridineModelData from './bipyridine_model_data';
import bipyridineStyles from './bipyridine_styles';
import selectionTypesConstants from '../../src/constants/selection_types_constants';

class Settings extends React.Component {

  static defaultProps = {
    atomLabelsShown: false,
    backgroundOpacity: 1.0,
    backgroundColor: '',
    labels: [],
    orbital: {},
    selectedAtomIds: [],
    selectionType: selectionTypesConstants.ATOM,
    shapes: [],
    styles: [],
  }

  static propTypes = {
    atomLabelsShown: PropTypes.bool,
    backgroundColor: PropTypes.string,
    backgroundOpacity: PropTypes.number,
    labels: PropTypes.arrayOf(PropTypes.shape({
      backgroundColor: PropTypes.string,
      backgroundOpacity: PropTypes.number,
      borderColor: PropTypes.string,
      fontColor: PropTypes.string,
      fontSize: PropTypes.number,
      position: {
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number,
      },
      text: PropTypes.string,
    })),
    modelData: PropTypes.oneOfType([
      PropTypes.instanceOf(IMap),
      PropTypes.object,
    ]).isRequired,
    shapes: PropTypes.arrayOf(PropTypes.object),
    styles: PropTypes.objectOf(PropTypes.object),
    onChangeMolecule: PropTypes.func.isRequired,
    onChangeSelection: PropTypes.func.isRequired,
    onChangeModelData: PropTypes.func.isRequired,
    onChangeStyles: PropTypes.func.isRequired,
    onChangeShapes: PropTypes.func.isRequired,
    onChangeBackgroundColor: PropTypes.func.isRequired,
    onChangeBackgroundOpacity: PropTypes.func.isRequired,
    onChangeSelectionType: PropTypes.func.isRequired,
    onChangeAtomLabelsShown: PropTypes.func.isRequired,
    onChangeOrbital: PropTypes.func.isRequired,
    onChangeLabels: PropTypes.func.isRequired,
    orbital: PropTypes.shape({
      iso_val: PropTypes.number,
      opacity: PropTypes.number,
      cube_file: PropTypes.string,
    }),
    selectedAtomIds: PropTypes.arrayOf(PropTypes.number),
    selectionType: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      labels: JSON.stringify(props.labels),
      selectedAtomIds: JSON.stringify(props.selectedAtomIds),
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
      selectedAtomIds: JSON.stringify(nextProps.selectedAtomIds),
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

  onClickSmallButton = () => {
    this.props.onChangeMolecule(bipyridineModelData, bipyridineStyles);
  }

  onClickLargeButton = () => {
    this.props.onChangeMolecule(aidModelData, aidStyles);
  }

  onBlurSelection = (event) => {
    this.props.onChangeSelection(JSON.parse(event.target.value));
  }

  onChangeSelection = (event) => {
    this.setState({ selectedAtomIds: event.target.value });
  }

  onChangeModelData = (event) => {
    this.setState({ modelData: event.target.value });
  }

  onBlurModelData = (event) => {
    this.props.onChangeModelData(JSON.parse(event.target.value));
  }

  onChangeStyles = (event) => {
    this.setState({ styles: event.target.value });
  }

  onBlurStyles = (event) => {
    this.props.onChangeStyles(JSON.parse(event.target.value));
  }

  onChangeShapes = (event) => {
    this.setState({ shapes: event.target.value });
  }

  onBlurShapes = (event) => {
    this.props.onChangeShapes(JSON.parse(event.target.value));
  }

  onChangeBackgroundColor = (event) => {
    this.setState({ backgroundColor: event.target.value });
  }

  onBlurBGColor = (event) => {
    this.props.onChangeBackgroundColor(event.target.value);
  }

  onChangeBackgroundOpacity = (event) => {
    this.setState({ backgroundOpacity: event.target.value });
  }

  onBlurBGOpacity = (event) => {
    this.props.onChangeBackgroundOpacity(parseFloat(event.target.value));
  }

  onChangeSelectionType = (event) => {
    this.props.onChangeSelectionType(event.target.value);
  }

  onChangeLabelsInput = (event) => {
    this.props.onChangeAtomLabelsShown(event.target.checked);
  }

  onChangeOrbital = (event) => {
    this.setState({ orbital: event.target.value });
  }

  onBlurOrbitalInput = (event) => {
    this.props.onChangeOrbital(JSON.parse(event.target.value));
  }

  onChangeLabels = (event) => {
    this.setState({ labels: event.target.value });
  }

  onBlurLabelsInput = (event) => {
    this.props.onChangeLabels(JSON.parse(event.target.value));
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickSmallButton}>Small Molecule</button>
        <button onClick={this.onClickLargeButton}>Large Molecule</button>

        <h4>selectedAtomIds</h4>
        <input
          value={this.state.selectedAtomIds}
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

        <h4>labels</h4>
        <input
          value={this.state.labels}
          onChange={this.onChangeLabels}
          onBlur={this.onBlurLabelsInput}
        />
      </div>
    );
  }
}

export default Settings;
