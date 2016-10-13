import React from 'react';
import MolWidget3DModel from '../models/mol_widget_3d_model';
import MolWidget3DView from '../views/mol_widget_3d_view';

class Nbmolviz3dReact extends React.Component {
  componentDidMount() {
    this.renderNbmolviz();
  }

  componentDidUpdate() {
    this.renderNbmolviz();
  }

  renderNbmolviz() {
    if (this.props.modelData.atoms.length && this.props.modelData.bonds.length) {
      const model = new MolWidget3DModel({
        model_data: this.props.modelData,
        background_color: this.props.backgroundColor,
      });
      const view = new MolWidget3DView({
        model,
        el: this.container,
      });

      view.render();
    }
  }

  render() {
    return (
      <div
        className="nbmolviz3d-container"
        ref={(c) => { this.container = c; }}
      />
    );
  }
}

Nbmolviz3dReact.propTypes = {
  backgroundColor: React.PropTypes.string,
  modelData: React.PropTypes.shape({
    atoms: React.PropTypes.array.isRequired,
    bonds: React.PropTypes.array.isRequired,
  }).isRequired,
};

export default Nbmolviz3dReact;
