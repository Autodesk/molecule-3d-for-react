module.exports = {
  'Selection Test': (browser) => {
    browser
      .url('http://localhost:4000')
      .waitForElementVisible('.nbmolviz3d canvas', 1000, 'nbmolviz3d canvas element appears')
      .end();
  },
};
