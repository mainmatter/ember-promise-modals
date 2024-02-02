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
