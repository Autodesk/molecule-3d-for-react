import React from 'react';
import MolWidget3DModel from '../models/mol_widget_3d_model';
import MolWidget3DView from '../views/mol_widget_3d_view';

class Nbmolviz3dReact extends React.Component {
  componentDidMount() {
    console.log('zomg!', this.props.modelData);
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
  modelData: React.PropTypes.object,
};

export default Nbmolviz3dReact;
