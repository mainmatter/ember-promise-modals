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
        plugins: ['prettier-plugin-ember-template-tag', '@ianvs/prettier-plugin-sort-imports'],
        singleQuote: true,
        templateSingleQuote: false,
        importOrderParserPlugins: ['decorators-legacy', JSON.stringify(['module:decorator-transforms', { runtime: { import: 'decorator-transforms/runtime' } }])],
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
