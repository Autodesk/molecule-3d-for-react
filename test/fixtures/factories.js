const factories = {
  // 3dMol's glViewer class
  getGlViewer() {
    return {
      addLabel: () => {},
      addModel: () => {},
      clear: () => {},
      getModel: () => ({
        selectedAtoms: () => [],
      }),
      removeAllLabels: () => {},
      removeAllShapes: () => {},
      render: () => {},
      setBackgroundColor: () => {},
      setClickable: () => {},
      setStyle: () => {},
      zoom: () => {},
      zoomTo: () => {},
    };
  },
};

export default factories;
