'use strict';
const { maybeEmbroider } = require('@embroider/test-setup');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

// `EPM_SKIP_CSS_IMPORT=true ember test` runs the suite the way an app with a strict CSP would use the addon: the addon
// does not import its stylesheet from JS (which becomes an inline <style>), the app ships the file itself.
const skipCssImport = process.env.EPM_SKIP_CSS_IMPORT === 'true';

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-promise-modals'],
    },
    '@embroider/macros': {
      setConfig: {
        'ember-promise-modals': { skipCssImport },
      },
    },
  });

  if (skipCssImport) {
    app.import('node_modules/ember-promise-modals/dist/components/epm-modal-container.css');
  }

  /*
    This build file specifies the options for the test-app of ember-promise-modals
    This build file does *not* influence how the addon or the app using it
    behave.
  */

  return maybeEmbroider(app);
};
