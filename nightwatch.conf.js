const BINPATH = './node_modules/nightwatch/bin/';

module.exports = {
  src_folders: [
    'test/e2e', // Where you are storing your Nightwatch e2e/UAT tests
  ],
  output_folder: './reports', // reports (test outcome) output by nightwatch
  selenium: { // downloaded by selenium-download module (see readme)
    start_process: true, // tells nightwatch to start/stop the selenium process
    server_path: `${BINPATH}selenium.jar`,
    log_path: '',
    host: '127.0.0.1',
    port: 4444, // standard selenium port
  },
  test_settings: {
    default: {
      screenshots: {
        enabled: false,
        path: './screenshots',
      },
      globals: {
        waitForConditionTimeout: 5000, // sometimes internet is slow so wait.
      },
      launch_url: 'http://localhost:4000',
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'phantomjs.binary.path': './node_modules/.bin/phantomjs',
        'phantomjs.cli.args': [],
      },
    },
  },
};
