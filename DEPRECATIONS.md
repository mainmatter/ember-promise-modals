# Deprecations

## ember-promise-modals.modals-from-string

_Added in 3.1.0, functionality to be removed in 4.0.0_

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

This will not work with components organized in the (unsupported) _pods_ structure. If you are using pods, you will need to migrate your component to either the classic structure or to component co-location.
