import { settled } from '@ember/test-helpers';

function setMinimum(propertyName) {
  document.documentElement.style.setProperty(propertyName, '0.001s');
}

function unsetMinimum(propertyName) {
  document.documentElement.style.removeProperty(propertyName);
}

export function setupPromiseModals(hooks) {
  hooks.beforeEach(function () {
    setMinimum('--epm-animation-backdrop-in-duration');
    setMinimum('--epm-animation-backdrop-out-duration');
    setMinimum('--epm-animation-backdrop-in-delay');
    setMinimum('--epm-animation-backdrop-out-delay');
    setMinimum('--epm-animation-modal-in-duration');
    setMinimum('--epm-animation-modal-out-duration');
    setMinimum('--epm-animation-modal-in-delay');
    setMinimum('--epm-animation-modal-out-delay');

    this.modals = this.owner.lookup('service:modals');
  });

  hooks.afterEach(async function () {
    // be sure to close all modals after a test
    if (this.modals) {
      this.modals._destroyModals();
    }

    delete this.modals;

    unsetMinimum('--epm-animation-backdrop-in-duration');
    unsetMinimum('--epm-animation-backdrop-out-duration');
    unsetMinimum('--epm-animation-backdrop-in-delay');
    unsetMinimum('--epm-animation-backdrop-out-delay');
    unsetMinimum('--epm-animation-modal-in-duration');
    unsetMinimum('--epm-animation-modal-out-duration');
    unsetMinimum('--epm-animation-modal-in-delay');
    unsetMinimum('--epm-animation-modal-out-delay');

    // wait for any registered test waiters to settle
    await settled();
  });
}
