'use strict';

module.exports = {
  arrowParens: 'avoid',
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '**/*.{hbs}',
      options: {
        singleQuote: false,
      },
    },
  ],
};
