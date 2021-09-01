# Changelog

## v2.0.0 (2021-09-01)

#### :boom: Breaking Change
* [#427](https://github.com/simplabs/ember-promise-modals/pull/427) Generate one backdrop per modal ([@aoumiri](https://github.com/aoumiri))

#### :rocket: Enhancement
* [#427](https://github.com/simplabs/ember-promise-modals/pull/427) Generate one backdrop per modal ([@aoumiri](https://github.com/aoumiri))

#### :memo: Documentation
* [#432](https://github.com/simplabs/ember-promise-modals/pull/432) Fix responsiveness of dummy app ([@nickschot](https://github.com/nickschot))
* [#414](https://github.com/simplabs/ember-promise-modals/pull/414) Improve README and dummy application ([@pichfl](https://github.com/pichfl))

#### :house: Internal
* [#431](https://github.com/simplabs/ember-promise-modals/pull/431) Use env=production when building the dummy application ([@pichfl](https://github.com/pichfl))
* [#430](https://github.com/simplabs/ember-promise-modals/pull/430) Update production build path for GitHub pages ([@pichfl](https://github.com/pichfl))
* [#415](https://github.com/simplabs/ember-promise-modals/pull/415) Deploy dummy application to Github pages ([@pichfl](https://github.com/pichfl))

#### Committers: 4
- Anass OUMIRI ([@aoumiri](https://github.com/aoumiri))
- Florian Pichler ([@pichfl](https://github.com/pichfl))
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.1.1 (2021-07-27)

#### :bug: Bug Fix
* [#422](https://github.com/simplabs/ember-promise-modals/pull/422) fix promsie-modals from breaking when used in another addon instead of an app ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v1.1.0 (2021-07-27)

#### :rocket: Enhancement
* [#421](https://github.com/simplabs/ember-promise-modals/pull/421) add optional onAnimationModalOutEnd hook ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* [#420](https://github.com/simplabs/ember-promise-modals/pull/420) explicitly specify animation delay and duration as separate to make sure they're properly used by the browser ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v1.0.2 (2021-07-26)

#### :bug: Bug Fix
* [#419](https://github.com/simplabs/ember-promise-modals/pull/419) fix setting a delay on the backdrop or modal makes animation break ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#417](https://github.com/simplabs/ember-promise-modals/pull/417) Delete unused modal service file from dummy app ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v1.0.1 (2021-07-16)

#### :bug: Bug Fix
* [#412](https://github.com/simplabs/ember-promise-modals/pull/412) fix backdrop not animating immediately after the last modal is closed ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#413](https://github.com/simplabs/ember-promise-modals/pull/413) use babel-eslint as eslint parser ([@nickschot](https://github.com/nickschot))

#### Committers: 2
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.0.0 (2021-07-13)

#### :boom: Breaking Change
* [#148](https://github.com/simplabs/ember-promise-modals/pull/148) Replace ember-animated with CSS animations ([@pichfl](https://github.com/pichfl))

#### :rocket: Enhancement
* [#148](https://github.com/simplabs/ember-promise-modals/pull/148) Replace ember-animated with CSS animations ([@pichfl](https://github.com/pichfl))

#### :house: Internal
* [#407](https://github.com/simplabs/ember-promise-modals/pull/407) upgrade to ember-qunit v5 ([@nickschot](https://github.com/nickschot))
* [#309](https://github.com/simplabs/ember-promise-modals/pull/309) Update addon layout according to latest ember addon blueprint ([@pichfl](https://github.com/pichfl))

#### Committers: 3
- Florian Pichler ([@pichfl](https://github.com/pichfl))
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v0.2.1 (2020-06-30)

#### :rocket: Enhancement
* [#178](https://github.com/simplabs/ember-promise-modals/pull/178) Expose `clickOutsideDeactivates` on the `modals` service ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#181](https://github.com/simplabs/ember-promise-modals/pull/181) service/modals: Reset `.epm-scrolling-disabled` class in the destructor ([@Turbo87](https://github.com/Turbo87))
* [#180](https://github.com/simplabs/ember-promise-modals/pull/180) components/modal: Fix broken destructor ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#179](https://github.com/simplabs/ember-promise-modals/pull/179) Add `qunit-console-grouper` dev dependency ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.2.0 (2020-04-22)

#### :boom: Breaking Change
* [#142](https://github.com/simplabs/ember-promise-modals/pull/142) Convert `ember-animated` to a peer dependency ([@Turbo87](https://github.com/Turbo87))
* [#139](https://github.com/simplabs/ember-promise-modals/pull/139) Drop Support for Node.js 8 ([@Turbo87](https://github.com/Turbo87))

#### :rocket: Enhancement
* [#137](https://github.com/simplabs/ember-promise-modals/pull/137) Add Support for `ember-animated` v0.9 and v0.10 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :memo: Documentation
* [#80](https://github.com/simplabs/ember-promise-modals/pull/80) Update README ([@ansmonjol](https://github.com/ansmonjol))

#### :house: Internal
* [#143](https://github.com/simplabs/ember-promise-modals/pull/143) CI: Add scenarios for Ember v3.12 and v3.16 ([@Turbo87](https://github.com/Turbo87))
* [#141](https://github.com/simplabs/ember-promise-modals/pull/141) Use GitHub Actions for CI ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Alexandre Monjol ([@ansmonjol](https://github.com/ansmonjol))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.1.0 (2019-09-03)

Initial Release! 🎉
