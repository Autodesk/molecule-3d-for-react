import Backbone from 'backbone';

const ExampleSettingsView = Backbone.View.extend({
  initialize() {
    this.model.on('change', this.render.bind(this));
  },

  onBlurSelection(event) {
    this.model.set('selected_atoms', JSON.parse(event.currentTarget.value));
  },

  onBlurModelData(event) {
    this.model.set('model_data', JSON.parse(event.currentTarget.value));
  },

  onBlurStyles(event) {
    this.model.set('styles', JSON.parse(event.currentTarget.value));
  },

  onBlurBGColor(event) {
    this.model.set('background_color', event.currentTarget.value);
  },

  onBlurBGOpacity(event) {
    this.model.set('background_opacity', event.currentTarget.value);
  },

  render() {
    this.el.innerHTML = '';

    const selectionLabel = document.createElement('h4');
    selectionLabel.innerHTML = 'selected_atoms';
    this.el.appendChild(selectionLabel);
    const selectionInput = document.createElement('input');
    selectionInput.value = JSON.stringify(this.model.get('selected_atoms'));
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

    return this;
  },
});

export default ExampleSettingsView;
