'use strict';

const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const BroccoliPostCSS = require('broccoli-postcss');
const postcssPresetEnv = require('postcss-preset-env');

const pkg = require('./package.json');

module.exports = {
  name: require('./package').name,

  treeForAddon() {
    const tree = this._super(...arguments);
    const app = this._findHost();
    const options = typeof app.options === 'object' ? app.options : {};
    const addonConfig = options[pkg.name] || {};

    const addonWithoutStyles = funnel(tree, {
      exclude: ['**/*.css'],
    });

    if (addonConfig.excludeCSS === true) {
      return addonWithoutStyles;
    }

    const addonStyles = funnel(tree, {
      include: ['**/*.css'],
    });

    const processedStyles = new BroccoliPostCSS(addonStyles, {
      plugins: [
        {
          module: postcssPresetEnv,
          options: {
            stage: 3,
            overrideBrowserslist: app.project._targets.browsers,
          },
        },
      ],
    });

    return mergeTrees([addonWithoutStyles, processedStyles]);
  },
};
