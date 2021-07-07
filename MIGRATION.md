# Migration

## From 0.x.x to 1.x.x
Version 1.0.0 replaced the ember-animated powered animations with CSS based animations. In addition to that the default animation was also changed. This guide will show you how to get the animations of the old version.

### From top/bottom animations

The first step is to add some CSS which replicates the old animations to your app.

```css
/* app/styles/app.css */

/* === Variation 1: Custom animation which animates the modal in from the bottom and back */
@keyframes from-bottom-in {
  0% {
    opacity: 0;
    transform: translate(0, calc(100% + 50vh));
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
    transform: translate(0, calc(100% + 50vh));
  }
}

/* === Variation 2: Custom animation which animates the modal in from the top and back */
@keyframes from-top-in {
  0% {
    opacity: 0;
    transform: translate(0, calc(-100vh - 50%));
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
    transform: translate(0, calc(-100vh - 50%));
  }
}
```

Furthermore, some CSS variables will need to be overridden so that the new animation will be used (whichever of the two you prefer).

```css
/* app/styles/app.css */
:root {
  --epm-animation-in-duration: 0.25s;
  --epm-animation-out-duration: 0.25s;
  --epm-animation-modal-in: from-top-in var(--epm-animation-in-duration) ease-out;
  --epm-animation-modal-out: from-top-out var(--epm-animation-out-duration) ease-in;
}
```

### Using both animations
If you need to switch between both animations it's easiest to replicate the setup shown in the dummy app. See [the application.js controller](./tests/dummy/app/controllers/application.js)
for how the modals are openend in your JavaScript actions and look at
[app.css](./tests/dummy/app/styles/app.css) for the style definition of these
custom animations.
