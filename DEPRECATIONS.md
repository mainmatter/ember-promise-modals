# Deprecations

ember-promise-modals 5.0.0 will be a [v2 addon](https://github.com/embroider-build/embroider/blob/main/README.md#for-addon-authors) compatible with Embroider ecosystem. This document describes what functionalities will no longer exist in the coming major release.

## ember-promise-modals.modals-from-string

_Added in 4.1.0, functionality to be removed in 5.0.0_

The new Embroider build system prefers static imports when dynamically invoking components. To resolve this deprecation, you need to replace the path to the modal component with an imported component class:

```js
// before
export class ApplicationController extends Controller {
  @service modals;

  @action
  async show() {
    await this.modals.open('my-modal');
  }
}

// after
import MyModal from 'my-app/components/my-modal';

export class ApplicationController extends Controller {
  @service modals;

  @action
  async show() {
    await this.modals.open(MyModal);
  }
}
```

> Caution: old-style components that have their template in `app/templates/components` instead of co-located next to their Javascript in `app/components` can't work correctly when discovered via their component class, because there's no way to locate the template. They should either port to being co-located (which is a simple mechanical transformation and highly recommended) or should import their own template and set it as layout as was traditional in addons before co-location was available.

-- [Replacing Component Helper.md](https://github.com/embroider-build/embroider/blob/main/docs/replacing-component-helper.md#when-youre-invoking-a-component-youve-been-given)

## PostCSS process

Currently, the addon's CSS is run through PostCSS by default, which will create static
fallbacks for all custom properties using their defaults. It also provides the option `excludeCSS` so you can import the uncompiled addon styles in your project's `app/styles/app.css` and run your own PostCSS using `postcss-import`:

```js
// before
let app = new EmberApp(defaults, {
  'ember-promise-modals': {
    excludeCSS: true,
  },
});

return maybeEmbroider(app);
```

This functionality no longer stands in Embroider world because [v2 addons are static](https://github.com/embroider-build/embroider/blob/HEAD/docs/spec.md). When installed in your app, they don't do anything at build-time.

As most browsers have been supporting CSS variables for several years, the v2 addon will no longer process the CSS and the components will import the non-processed styles. However, if you still need the static fallbacks `postcss-preset-env` used to generate, you can re-implement the functionality on the app side with a [Webpack config](https://webpack.js.org/loaders/postcss-loader/). For instance:

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

## Ember < 3.28 & node < 16 support

The v2 addon will no longer support Ember versions lower than 3.28.

Additionally, it will have dependencies such as `ember-cli-babel@8.2.0` that require node 16, so node 12 will be removed from the supported engines.
