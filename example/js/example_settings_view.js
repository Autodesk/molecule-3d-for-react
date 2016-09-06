import Backbone from 'backbone';
import aidModelData from './3aid_model_data';
import aidStyles from './3aid_styles';
import bipyridineModelData from './bipyridine_model_data';
import bipyridineStyles from './bipyridine_styles';
import selectionTypesConstants from '../../src/constants/selection_types_constants';

const ExampleSettingsView = Backbone.View.extend({
  initialize() {
    this.model.on('change', this.render.bind(this));
  },

  onClickSmallButton() {
    this.model.set('model_data', bipyridineModelData);
    this.model.set('styles', bipyridineStyles);
  },

  onClickLargeButton() {
    this.model.set('model_data', aidModelData);
    this.model.set('styles', aidStyles);
  },

  onBlurSelection(event) {
    this.model.set('selected_atom_indices', JSON.parse(event.target.value));
  },

  onBlurModelData(event) {
    this.model.set('model_data', JSON.parse(event.target.value));
  },

  onBlurStyles(event) {
    this.model.set('styles', JSON.parse(event.target.value));
  },

  onBlurShape(event) {
    this.model.set('shape', JSON.parse(event.target.value));
  },

  onBlurBGColor(event) {
    this.model.set('background_color', event.target.value);
  },

  onBlurBGOpacity(event) {
    this.model.set('background_opacity', event.target.value);
  },

  onChangeSelectionSelect(event) {
    this.model.set('selection_type', event.target.value);
  },

  onChangeLabelsInput(event) {
    this.model.set('atom_labels_shown', event.target.checked);
  },

  onBlurOrbitalInput(event) {
    this.model.set('orbital', JSON.parse(event.target.value));
  },

  render() {
    this.el.innerHTML = '';

    const smallButton = document.createElement('button');
    smallButton.innerHTML = 'Small Molecule';
    smallButton.addEventListener('click', this.onClickSmallButton.bind(this));
    this.el.appendChild(smallButton);

    const largeButton = document.createElement('button');
    largeButton.innerHTML = 'Large Molecule';
    largeButton.addEventListener('click', this.onClickLargeButton.bind(this));
    this.el.appendChild(largeButton);

    const selectionLabel = document.createElement('h4');
    selectionLabel.innerHTML = 'selected_atom_indices';
    this.el.appendChild(selectionLabel);
    const selectionInput = document.createElement('input');
    selectionInput.value = JSON.stringify(this.model.get('selected_atom_indices'));
    selectionInput.addEventListener('blur', this.onBlurSelection.bind(this));
    this.el.appendChild(selectionInput);

    const modelDataLabel = document.createElement('h4');
    modelDataLabel.innerHTML = 'model_data';
    this.el.appendChild(modelDataLabel);
    const modelDataTA = document.createElement('textarea');
    modelDataTA.cols = '150';
    modelDataTA.rows = '6';
    modelDataTA.value = JSON.stringify(this.model.get('model_data'));
    modelDataTA.addEventListener('blur', this.onBlurModelData.bind(this));
    this.el.appendChild(modelDataTA);

    const stylesLabel = document.createElement('h4');
    stylesLabel.innerHTML = 'styles';
    this.el.appendChild(stylesLabel);
    const stylesTA = document.createElement('textarea');
    stylesTA.cols = '60';
    stylesTA.rows = '3';
    stylesTA.value = JSON.stringify(this.model.get('styles'));
    stylesTA.addEventListener('blur', this.onBlurStyles.bind(this));
    this.el.appendChild(stylesTA);

    const shapesLabel = document.createElement('h4');
    shapesLabel.innerHTML = 'shape';
    this.el.appendChild(shapesLabel);
    const shapesTA = document.createElement('textarea');
    shapesTA.cols = '60';
    shapesTA.rows = '3';
    shapesTA.value = JSON.stringify(this.model.get('shape'));
    shapesTA.addEventListener('blur', this.onBlurShape.bind(this));
    this.el.appendChild(shapesTA);

    const bgLabel = document.createElement('h4');
    bgLabel.innerHTML = 'background_color and background_opacity';
    this.el.appendChild(bgLabel);
    const bgColorInput = document.createElement('input');
    bgColorInput.value = this.model.get('background_color');
    bgColorInput.addEventListener('blur', this.onBlurBGColor.bind(this));
    this.el.appendChild(bgColorInput);
    const bgOpacityInput = document.createElement('input');
    bgOpacityInput.value = this.model.get('background_opacity');
    bgOpacityInput.addEventListener('blur', this.onBlurBGOpacity.bind(this));
    this.el.appendChild(bgOpacityInput);

    const selectionTypeLabel = document.createElement('h4');
    selectionTypeLabel.innerHTML = 'selection_type';
    this.el.appendChild(selectionTypeLabel);
    const selectionSelect = document.createElement('select');
    selectionSelect.addEventListener('change', this.onChangeSelectionSelect.bind(this));
    const selectionOptions = Object.values(selectionTypesConstants).map((selectionType) => {
      const selectionOption = document.createElement('option');
      selectionOption.innerHTML = selectionType;
      return selectionOption;
    });
    selectionOptions.forEach(selectionSelect.appendChild.bind(selectionSelect));
    selectionSelect.value = this.model.get('selection_type');
    this.el.appendChild(selectionSelect);

    const labelsLabel = document.createElement('h4');
    labelsLabel.innerHTML = 'labels';
    this.el.appendChild(labelsLabel);
    const labelsInput = document.createElement('input');
    labelsInput.type = 'checkbox';
    labelsInput.checked = this.model.get('atom_labels_shown');
    labelsInput.addEventListener('change', this.onChangeLabelsInput.bind(this));
    this.el.appendChild(labelsInput);

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

export default ExampleSettingsView;
