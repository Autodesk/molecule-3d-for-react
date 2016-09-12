module.exports = {
  'Startup Test': (browser) => {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible('.nbmolviz3d canvas', 1000, 'nbmolviz3d canvas element appears')
      .end();
  },
};
