const factories = {
  // 3dMol's glViewer class
  getGlViewer() {
    let model = null;
    return {
      addLabel: () => {},
      addModel: () => {
        model = {
          selectedAtoms: () => [],
        };
      },
      clear: () => {
        model = null;
      },
      fitSlab: () => {},
      getModel: () => model,
      removeAllLabels: () => {},
      removeAllShapes: () => {},
      render: () => {},
      setBackgroundColor: () => {},
      setClickable: () => {},
      setStyle: () => {},
      setViewStyle: () => {},
      zoom: () => {},
      zoomTo: () => {},
    };
  },
};

export default factories;
