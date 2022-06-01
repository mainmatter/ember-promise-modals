export function setupPromiseModals(hooks) {
  hooks.beforeEach(function () {
    document.documentElement.style.setProperty('--epm-animation-backdrop-in-duration', `0.001s`);
    document.documentElement.style.setProperty('--epm-animation-backdrop-out-duration', `0.001s`);
    document.documentElement.style.setProperty('--epm-animation-backdrop-in-delay', `0.001s`);
    document.documentElement.style.setProperty('--epm-animation-backdrop-out-delay', `0.001s`);
    document.documentElement.style.setProperty('--epm-animation-modal-in-duration', `0.001s`);
    document.documentElement.style.setProperty('--epm-animation-modal-out-duration', `0.001s`);
    document.documentElement.style.setProperty('--epm-animation-modal-in-delay', `0.001s`);
    document.documentElement.style.setProperty('--epm-animation-modal-out-delay', `0.001s`);

    this.modals = this.owner.lookup('service:modals');
  });

  hooks.afterEach(async function () {
    delete this.modals;

    document.documentElement.style.removeProperty('--epm-animation-backdrop-in-duration', `0.001s`);
    document.documentElement.style.removeProperty('--epm-animation-backdrop-out-duration', `0.001s`);
    document.documentElement.style.removeProperty('--epm-animation-backdrop-in-delay', `0.001s`);
    document.documentElement.style.removeProperty('--epm-animation-backdrop-out-delay', `0.001s`);
    document.documentElement.style.removeProperty('--epm-animation-modal-in-duration', `0.001s`);
    document.documentElement.style.removeProperty('--epm-animation-modal-out-duration', `0.001s`);
    document.documentElement.style.removeProperty('--epm-animation-modal-in-delay', `0.001s`);
    document.documentElement.style.removeProperty('--epm-animation-modal-out-delay', `0.001s`);
  });
}
