# Migration

## From v4.x.x to v5.x.x (PostCSS process)

Until version 4.x.x, ember-promise-modals ran through PostCSS by default, to create static fallbacks for all custom properties using their defaults. This functionality has been removed from 5.x.x because it doesn't fit well with Embroider ecosystem: [v2 addons are static](https://github.com/embroider-build/embroider/blob/HEAD/docs/spec.md). When installed in your app, they don't do anything at build-time. Also, most browsers have been supporting CSS variables for several years.

However, if you still need the static fallbacks `postcss-preset-env` used to generate, you can re-implement the functionality on the app side with a [Webpack config](https://webpack.js.org/loaders/postcss-loader/). For instance:

```js
let app = new EmberApp(defaults, {});

return maybeEmbroider(app, {
  packagerOptions: {
    webpackConfig: {
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [['postcss-preset-env', { stage: 3 }]],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  },
});
```

Additionally, until version 4.x.x, ember-promise-modal provided the option `excludeCSS` so you can import the uncompiled addon styles in your project's `app/styles/app.css` and run your own PostCSS using `postcss-import`. In any case, ember-promise-modal CSS is expected to be included in your app in one way or the other. For this reason, there's no equivalent to `excludeCSS` in the v2 addon: components import statically the CSS they require, which means no `@import` statement in your `app/styles/app.css` is necessary, and you are still able to process the style as explained above.

## From 0.x.x to 1.x.x (animations)

Version 1.0.0 replaced the ember-animated powered animations with CSS-based animations. In addition to that the default animation was also changed. This guide will show you how to get the animations of the old version.

### From top/bottom animations

The first step is to add some CSS which replicates the old animations to your app.

```css
/* app/styles/app.css */

/* === Variation 1: Custom animation which animates the modal in from the bottom and back */
@keyframes from-bottom-in {
  0% {
    opacity: 0;
    transform: translate(0, calc(50vh + 50%));
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes from-bottom-out {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(0, calc(50vh + 50%));
  }
}

/* === Variation 2: Custom animation which animates the modal in from the top and back */
@keyframes from-top-in {
  0% {
    opacity: 0;
    transform: translate(0, calc(-50vh - 50%));
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes from-top-out {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(0, calc(-50vh - 50%));
  }
}
```

Furthermore, some CSS variables will need to be overridden so that the new animation will be used (whichever of the two you prefer).

```css
/* app/styles/app.css */
:root {
  --epm-animation-backdrop-in-duration: 0.6s;
  --epm-animation-backdrop-out-duration: 0.6s;
  --epm-animation-modal-in-duration: 0.25s;
  --epm-animation-modal-out-duration: 0.25s;
  --epm-animation-modal-in: from-top-in var(--epm-animation-in-duration) ease-out;
  --epm-animation-modal-out: from-top-out var(--epm-animation-out-duration) ease-in;
}
```

### Using both animations

If you need to switch between both animations it's easiest to replicate the setup shown in the dummy app. See [the application.js controller](./packages/test-app/app/controllers/application.js)
for how the modals are opened in your JavaScript actions and look at
[app.css](./packages/test-app/app/styles/app.css) for the style definition of these
custom animations.
