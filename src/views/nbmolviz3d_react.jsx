import React from 'react';
import { Map as IMap } from 'immutable';
import MolWidget3DModel from '../models/mol_widget_3d_model';
import MolWidget3DView from '../views/mol_widget_3d_view';

class Nbmolviz3dReact extends React.Component {
  componentDidMount() {
    this.renderNbmolviz();
  }

  shouldComponentUpdate(nextProps) {
    const changingModelData = IMap.isMap(nextProps.modelData) &&
      (nextProps.modelData !== this.props.modelData);
    const changingBG = nextProps.backgroundColor !== this.props.backgroundColor;

    return changingModelData || changingBG;
  }

  componentDidUpdate() {
    this.renderNbmolviz();
  }

  renderNbmolviz() {
    const modelData = this.props.modelData.toJS();

    if (modelData.atoms.length && modelData.bonds.length) {
      const model = new MolWidget3DModel({
        model_data: modelData,
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
  modelData: React.PropTypes.oneOfType([
    React.PropTypes.instanceOf(IMap),
    React.PropTypes.object,
  ]).isRequired,
};

export default Nbmolviz3dReact;
