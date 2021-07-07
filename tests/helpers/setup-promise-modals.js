export default function setupPromiseModals(hooks) {
  hooks.beforeEach(function () {
    document.documentElement.style.setProperty('--epm-animation-in-duration', `0.0001s`);
    document.documentElement.style.setProperty('--epm-animation-out-duration', `0.0001s`);

    this.modals = this.owner.lookup('service:modals');
  });

  hooks.afterEach(function () {
    // be sure to close all modals after a test
    this.modals._stack.forEach(modal => modal.close());

    document.documentElement.style.removeProperty('--epm-animation-in-duration', `0.0001s`);
    document.documentElement.style.removeProperty('--epm-animation-out-duration', `0.0001s`);
  });
}
