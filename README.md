ember-promise-modals
==============================================================================

ember-promise-modals provides a way to render and handle modals in Ember.js apps.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* ember-animated v0.8
* Node.js v10, v12, v14 or above

Installation
------------------------------------------------------------------------------

```
ember install ember-animated
ember install ember-promise-modals
```

Usage
------------------------------------------------------------------------------

To use EPM in your project, you first need to inject the `modals` service:

```javascript
@service modals;
```

Then, call the `open` method with a component name to render it as a modal:

```javascript
this.modals.open('component-to-render');
```

### Simple usage

Here is a simple code example:

```javascript
import { inject as service } from '@ember/service';

export default class extends Component {
  @service modals;

  @action
  handleOpenModal() {
    this.modals.open('confirmation-modal');
  }
}
```

Then in your template, you can:

```handlebars
<button {{on "click" this.handleOpenModal}}>
  Click Me!
</button>
```

### Attributes

You can pass custom data into your rendered template like so:
```javascript
this.modals.open('file-preview', {
  fileUrl: this.fileUrl
});
```

All passed attributes can be accessed from the passed-in `data` object:

```handlebars
<!-- app/components/file-preview.hbs -->

<img src={{@data.fileUrl}} />
```

```javascript
// app/components/file-preview.js

this.data.fileUrl; // or this.args.data.fileUrl in Glimmer components
```

**NOTE:** By default, a `close` method is passed in your rendered component, in
order to trigger the "close modal" action. It can be called like so:

```handlebars
<!-- app/components/file-preview.hbs -->

<button {{on "click" @close}}>Close</button>
```
```javascript
// app/components/file-preview.js

this.close(); // or this.args.close() in Glimmer components
```

Animation
------------------------------------------------------------------------------

### Custom animation

EPM uses [ember-animated](https://github.com/ember-animation/ember-animated) to
animate the modals.

You can override the default easing function using libraries like [d3-ease](https://github.com/d3/d3-ease).
To do so, you must override the [`modalsTransition` method from the `modals` service](https://github.com/simplabs/ember-promise-modals/blob/master/addon/services/modals.js#L19)
in your own app.

Create a new `modals` service like:

```javascript
// app/services/modals.js

import { easeSinInOut, easeCubicOut } from 'd3-ease';
import move from 'ember-animated/motions/move';
import ModalServices from 'ember-promise-modals/services/modals';

export default ModalServices.extend({
  *modalsTransition({ insertedSprites, keptSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ y: -window.innerHeight });
      move(sprite, { easing: easeCubicOut });
    });

    keptSprites.forEach(sprite => {
      move(sprite);
    });

    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ y: -window.innerHeight });
      move(sprite, { easing: easeSinInOut });
    });
  },
});
```

### Transition direction

By default, the EPM modal appears from top-to-bottom. You can change that to
bottom-to-up for example, by passing a custom value on EPM invocation:

```javascript
this.modals.open('file-preview', {
  reverseAnimation: true
});
```

And update your service:

```javascript
insertedSprites.forEach(sprite => {
  if (sprite.owner.value._data.reverseAnimation) {
    sprite.startAtPixel({ y: window.innerHeight });
  } else {
    sprite.startAtPixel({ y: -window.innerHeight });
  }
  move(sprite, { easing: easeCubicOut });
});

// ...

removedSprites.forEach(sprite => {
  if (sprite.owner.value._data.reverseAnimation) {
    sprite.endAtPixel({ y: window.innerHeight });
  } else {
    sprite.endAtPixel({ y: -window.innerHeight });
  }
  move(sprite, { easing: easeSinInOut });
});
```

You can find other ways to create custom animations in the [ember-animated documentation](https://ember-animation.github.io/ember-animated/docs/transitions#custom)


Accessibility
------------------------------------------------------------------------------

User can press the `ESC` key to close the modal.

EPM uses [focus-trap](https://github.com/davidtheclark/focus-trap) internally
in order to handle user focus.

EPM will ensure to [focus the first "tabbable element" by default](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal).
If no focusable element is present, focus will be applied on the currently
visible modal amber-auto-generated container.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
