# Changelog



## v3.0.1 (2022-04-12)

#### :bug: Bug Fix
* [#596](https://github.com/mainmatter/ember-promise-modals/pull/596) Ensure calls to @close run before the focus-out deactivation ([@pichfl](https://github.com/pichfl))

#### :house: Internal
* [#597](https://github.com/mainmatter/ember-promise-modals/pull/597) Remove deprecated `clickOutsideDeactivates` option ([@pichfl](https://github.com/pichfl))

#### Committers: 1
- Florian Pichler ([@pichfl](https://github.com/pichfl))

## v3.0.0 (2022-04-11)

#### :boom: Breaking Change
* [#588](https://github.com/mainmatter/ember-promise-modals/pull/588) Use ember-auto-import@2 ([@pichfl](https://github.com/pichfl))
* [#438](https://github.com/mainmatter/ember-promise-modals/pull/438) bump @ember/test-waiters to 3.0.0 ([@nickschot](https://github.com/nickschot))
* [#437](https://github.com/mainmatter/ember-promise-modals/pull/437) Drop Node 10 support ([@nickschot](https://github.com/nickschot))

#### :rocket: Enhancement
* [#549](https://github.com/mainmatter/ember-promise-modals/pull/549) Enhance focus trap configuration ([@zeppelin](https://github.com/zeppelin))
* [#533](https://github.com/mainmatter/ember-promise-modals/pull/533) Legacy: Downgrade native class to Ember.Object ([@pichfl](https://github.com/pichfl))
* [#436](https://github.com/mainmatter/ember-promise-modals/pull/436) Embroider optimized compatibility ([@nickschot](https://github.com/nickschot))
* [#517](https://github.com/mainmatter/ember-promise-modals/pull/517) Add option to disable focus trap ([@zeppelin](https://github.com/zeppelin))

#### :memo: Documentation
* [#502](https://github.com/mainmatter/ember-promise-modals/pull/502) Provide additional documentation for the Modal class and ModalOptions ([@pichfl](https://github.com/pichfl))

#### :house: Internal
* [#594](https://github.com/mainmatter/ember-promise-modals/pull/594) Configure release-it ([@pichfl](https://github.com/pichfl))
* [#570](https://github.com/mainmatter/ember-promise-modals/pull/570) Setup Renovatebot ([@nickschot](https://github.com/nickschot))
* [#477](https://github.com/mainmatter/ember-promise-modals/pull/477) Replace Yarn with pnpm ([@pichfl](https://github.com/pichfl))
* [#530](https://github.com/mainmatter/ember-promise-modals/pull/530) Internal: Extend and apply prettier configuration ([@pichfl](https://github.com/pichfl))
* [#500](https://github.com/mainmatter/ember-promise-modals/pull/500) Specify octane edition in package.json & add missing optional features ([@nickschot](https://github.com/nickschot))
* [#499](https://github.com/mainmatter/ember-promise-modals/pull/499) Update ember-release scenario to use auto-import v2 ([@nickschot](https://github.com/nickschot))

#### Committers: 3
- Florian Pichler ([@pichfl](https://github.com/pichfl))
- Gabor Babicz ([@zeppelin](https://github.com/zeppelin))
- Nick Schot ([@nickschot](https://github.com/nickschot))

## v2.0.0 (2021-09-01)

#### :boom: Breaking Change
* [#427](https://github.com/mainmatter/ember-promise-modals/pull/427) Generate one backdrop per modal ([@aoumiri](https://github.com/aoumiri))

#### :rocket: Enhancement
* [#427](https://github.com/mainmatter/ember-promise-modals/pull/427) Generate one backdrop per modal ([@aoumiri](https://github.com/aoumiri))

#### :memo: Documentation
* [#432](https://github.com/mainmatter/ember-promise-modals/pull/432) Fix responsiveness of dummy app ([@nickschot](https://github.com/nickschot))
* [#414](https://github.com/mainmatter/ember-promise-modals/pull/414) Improve README and dummy application ([@pichfl](https://github.com/pichfl))

#### :house: Internal
* [#431](https://github.com/mainmatter/ember-promise-modals/pull/431) Use env=production when building the dummy application ([@pichfl](https://github.com/pichfl))
* [#430](https://github.com/mainmatter/ember-promise-modals/pull/430) Update production build path for GitHub pages ([@pichfl](https://github.com/pichfl))
* [#415](https://github.com/mainmatter/ember-promise-modals/pull/415) Deploy dummy application to Github pages ([@pichfl](https://github.com/pichfl))

#### Committers: 4
- Anass OUMIRI ([@aoumiri](https://github.com/aoumiri))
- Florian Pichler ([@pichfl](https://github.com/pichfl))
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.1.1 (2021-07-27)

#### :bug: Bug Fix
* [#422](https://github.com/mainmatter/ember-promise-modals/pull/422) fix promsie-modals from breaking when used in another addon instead of an app ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v1.1.0 (2021-07-27)

#### :rocket: Enhancement
* [#421](https://github.com/mainmatter/ember-promise-modals/pull/421) add optional onAnimationModalOutEnd hook ([@nickschot](https://github.com/nickschot))

#### :bug: Bug Fix
* [#420](https://github.com/mainmatter/ember-promise-modals/pull/420) explicitly specify animation delay and duration as separate to make sure they're properly used by the browser ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v1.0.2 (2021-07-26)

#### :bug: Bug Fix
* [#419](https://github.com/mainmatter/ember-promise-modals/pull/419) fix setting a delay on the backdrop or modal makes animation break ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#417](https://github.com/mainmatter/ember-promise-modals/pull/417) Delete unused modal service file from dummy app ([@nickschot](https://github.com/nickschot))

#### Committers: 1
- Nick Schot ([@nickschot](https://github.com/nickschot))


## v1.0.1 (2021-07-16)

#### :bug: Bug Fix
* [#412](https://github.com/mainmatter/ember-promise-modals/pull/412) fix backdrop not animating immediately after the last modal is closed ([@nickschot](https://github.com/nickschot))

#### :house: Internal
* [#413](https://github.com/mainmatter/ember-promise-modals/pull/413) use babel-eslint as eslint parser ([@nickschot](https://github.com/nickschot))

#### Committers: 2
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v1.0.0 (2021-07-13)

#### :boom: Breaking Change
* [#148](https://github.com/mainmatter/ember-promise-modals/pull/148) Replace ember-animated with CSS animations ([@pichfl](https://github.com/pichfl))

#### :rocket: Enhancement
* [#148](https://github.com/mainmatter/ember-promise-modals/pull/148) Replace ember-animated with CSS animations ([@pichfl](https://github.com/pichfl))

#### :house: Internal
* [#407](https://github.com/mainmatter/ember-promise-modals/pull/407) upgrade to ember-qunit v5 ([@nickschot](https://github.com/nickschot))
* [#309](https://github.com/mainmatter/ember-promise-modals/pull/309) Update addon layout according to latest ember addon blueprint ([@pichfl](https://github.com/pichfl))

#### Committers: 3
- Florian Pichler ([@pichfl](https://github.com/pichfl))
- Nick Schot ([@nickschot](https://github.com/nickschot))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v0.2.1 (2020-06-30)

#### :rocket: Enhancement
* [#178](https://github.com/mainmatter/ember-promise-modals/pull/178) Expose `clickOutsideDeactivates` on the `modals` service ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#181](https://github.com/mainmatter/ember-promise-modals/pull/181) service/modals: Reset `.epm-scrolling-disabled` class in the destructor ([@Turbo87](https://github.com/Turbo87))
* [#180](https://github.com/mainmatter/ember-promise-modals/pull/180) components/modal: Fix broken destructor ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#179](https://github.com/mainmatter/ember-promise-modals/pull/179) Add `qunit-console-grouper` dev dependency ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.2.0 (2020-04-22)

#### :boom: Breaking Change
* [#142](https://github.com/mainmatter/ember-promise-modals/pull/142) Convert `ember-animated` to a peer dependency ([@Turbo87](https://github.com/Turbo87))
* [#139](https://github.com/mainmatter/ember-promise-modals/pull/139) Drop Support for Node.js 8 ([@Turbo87](https://github.com/Turbo87))

#### :rocket: Enhancement
* [#137](https://github.com/mainmatter/ember-promise-modals/pull/137) Add Support for `ember-animated` v0.9 and v0.10 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :memo: Documentation
* [#80](https://github.com/mainmatter/ember-promise-modals/pull/80) Update README ([@ansmonjol](https://github.com/ansmonjol))

#### :house: Internal
* [#143](https://github.com/mainmatter/ember-promise-modals/pull/143) CI: Add scenarios for Ember v3.12 and v3.16 ([@Turbo87](https://github.com/Turbo87))
* [#141](https://github.com/mainmatter/ember-promise-modals/pull/141) Use GitHub Actions for CI ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Alexandre Monjol ([@ansmonjol](https://github.com/ansmonjol))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.1.0 (2019-09-03)

Initial Release! 🎉
