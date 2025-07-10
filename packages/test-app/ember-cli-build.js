'use strict';
const { maybeEmbroider } = require('@embroider/test-setup');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-promise-modals'],
    },
  });

  /*
    This build file specifies the options for the test-app of ember-promise-modals
    This build file does *not* influence how the addon or the app using it
    behave.
  */

  return maybeEmbroider(app);
};
