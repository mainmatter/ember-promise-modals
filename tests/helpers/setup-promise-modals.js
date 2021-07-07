export default function setupPromiseModals(hooks) {
  hooks.beforeEach(function () {
    document.documentElement.style.setProperty('--epm-animation-in-duration', `0.0001s`);
    document.documentElement.style.setProperty('--epm-animation-out-duration', `0.0001s`);
  });

  hooks.afterEach(function () {
    document.documentElement.style.removeProperty('--epm-animation-in-duration', `0.0001s`);
    document.documentElement.style.removeProperty('--epm-animation-out-duration', `0.0001s`);
  });
}
