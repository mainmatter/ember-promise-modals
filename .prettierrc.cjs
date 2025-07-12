'use strict';

module.exports = {
  arrowParens: 'avoid',
  printWidth: 120,
  trailingComma: 'all',
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.{js,gjs,ts,gts,mjs,mts,cjs,cts}',
      options: {
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
    {
      files: '*.md',
      options: {
        singleQuote: true,
      },
    },
  ],
};
