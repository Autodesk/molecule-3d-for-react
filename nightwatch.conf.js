const os = require('os');

module.exports = {
  src_folders: [
    'test/e2e', // Where you are storing your Nightwatch e2e/UAT tests
  ],
  output_folder: './reports', // reports (test outcome) output by nightwatch
  selenium: { // downloaded by selenium-download module (see readme)
    start_process: true, // tells nightwatch to start/stop the selenium process
    server_path: os.homedir() + '/.selenium-binaries/selenium/2.53.1/selenium-server-standalone-2.53.1.jar',
    host: '127.0.0.1',
    port: 4444, // standard selenium port
    cli_args: { // chromedriver is downloaded by selenium-download (see readme)
      'webdriver.chrome.driver': os.homedir() + '/.selenium-binaries/chromedriver/2.22/chromedriver',
    },
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: true, // if you want to keep screenshots
        path: './screenshots', // save screenshots here
      },
      globals: {
        waitForConditionTimeout: 5000, // sometimes internet is slow so wait.
      },
      desiredCapabilities: { // use Chrome as the default browser for tests
        browserName: 'chrome',
      },
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true, // set to false to test progressive enhancement
      },
    },
  },
};
