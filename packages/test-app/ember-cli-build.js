'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  /*
    This build file specifies the options for the test-app of ember-promise-modals
    This build file does *not* influence how the addon or the app using it
    behave.
  */

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack);
};
