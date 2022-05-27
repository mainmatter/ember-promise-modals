import { visit, click, triggerKeyEvent, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import Modal1 from 'dummy/components/modal1';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Application | basics', function (hooks) {
  setupApplicationTest(hooks);
  setupPromiseModals(hooks);

  test('clicking the backdrop closes the modal', async function (assert) {
    await visit('/');

    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');

    assert.dom('.epm-modal').exists();
    assert.dom('.epm-backdrop').exists();

    // we don't have a test waiter on the opening animation, so for this test we wait manually
    await waitUntil(() => {
      let { opacity } = window.getComputedStyle(document.querySelector('.epm-backdrop'));
      return opacity === '1';
    });

    assert.dom('.epm-backdrop').hasStyle({
      opacity: '1',
      pointerEvents: 'auto',
    });

    await click('.epm-backdrop');

    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();
  });

  test('clicking the backdrop does not close the modal if `clickOutsideDeactivates` is `false`', async function (assert) {
    this.owner.lookup('service:modals').focusTrapOptions.clickOutsideDeactivates = false;

    await visit('/');

    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');

    assert.dom('.epm-backdrop').exists();
    assert.dom('.epm-modal').exists();

    await click('.epm-backdrop');

    assert.dom('.epm-backdrop').exists();
    assert.dom('.epm-modal').exists();
  });

  test('opening a modal disables scrolling on the <body> element', async function (assert) {
    await visit('/');

    assert.dom('body', document).hasStyle({ overflow: 'visible' });

    await click('[data-test-show-modal]');

    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    await click('.epm-backdrop');

    assert.dom('body', document).hasStyle({ overflow: 'visible' });
  });

  test('opening a modal calls onAnimationModal*End once the animation ends', async function (assert) {
    await visit('/');

    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();

    const applicationController = this.owner.lookup('controller:application');
    const modalsService = applicationController.modals;
    const showModal = applicationController.actions.showModal;

    applicationController.actions.showModal = () => {
      assert.step('open');

      modalsService.open(
        Modal1,
        {},
        {
          onAnimationModalInEnd: () => {
            assert.step('onAnimationModalInEnd');
          },
          onAnimationModalOutEnd: () => {
            assert.step('onAnimationModalOutEnd');
          },
        },
      );
    };

    await click('[data-test-show-modal]');
    await waitUntil(() => !document.body.classList.contains('epm-animating'));
    await click('.epm-backdrop');

    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();

    assert.verifySteps(['open', 'onAnimationModalInEnd', 'onAnimationModalOutEnd']);

    applicationController.actions.showModal = showModal;
  });

  test('pressing the Escape keyboard button closes the modal', async function (assert) {
    await visit('/');

    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');

    assert.dom('.epm-modal').exists();

    await triggerKeyEvent(document, 'keydown', 'Escape');

    assert.dom('.epm-modal').doesNotExist();
  });

  test('closing the modal via the @close function returns passed values', async function (assert) {
    await visit('/');

    let applicationController = this.owner.lookup('controller:application');

    assert.strictEqual(applicationController.get('result'), undefined);
    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');
    await click('[data-test-close]');

    assert.deepEqual(applicationController.get('result'), {
      foo: 'bar',
    });
  });
});
