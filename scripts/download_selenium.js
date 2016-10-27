const fs = require('fs');
const seleniumDownload = require('selenium-download');

const BINPATH = './node_modules/nightwatch/bin/';

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */
fs.stat(`${BINPATH}selenium.jar`, (err, stat) => {
  if (err || !stat || stat.size < 1) {
    seleniumDownload.ensure(BINPATH, (error) => {
      if (error) throw new Error(error);
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});
