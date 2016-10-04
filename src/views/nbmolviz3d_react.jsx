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
    const model = new MolWidget3DModel({
      model_data: this.props.modelData,
    });
    const view = new MolWidget3DView({
      model,
      el: this.container,
    });
    view.render();
  }

  render() {
    return (
      <div ref={(c) => { this.container = c; }} />
    );
  }
}

Nbmolviz3dReact.propTypes = {
  modelData: React.PropTypes.string.isRequired,
};

export default Nbmolviz3dReact;
