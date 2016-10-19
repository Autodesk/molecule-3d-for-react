const setup = require('../fixtures/setup');

module.exports = {
  'Startup Test': (browser) => {
    setup(browser)
      .url(browser.launchUrl)
      .waitForElementVisible('.react-molecule-3d canvas', 1000, 'react-molecule-3d canvas element appears')
      .end();
  },
};
