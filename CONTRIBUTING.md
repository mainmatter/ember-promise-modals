# How To Contribute

This project uses the [pnpm](https://pnpm.io) package manager to manage its dependencies.

## Installation

- `git clone <repository-url>`
- `cd ember-promise-modals`
- `pnpm install`

## Linting

- `pnpm lint:hbs`
- `pnpm lint:js`
- `pnpm lint:js --fix`

## Running tests

- `pnpm exec ember test` – Runs the test suite on the current Ember version
- `pnpm exec ember test --server` – Runs the test suite in "watch mode"
- `pnpm exec ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

- `pnpm --filter=test-app start`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

## Watcher for compiling the addon while developing

- `pnpm --filter=ember-promise-modals start`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
