import { visit, click, triggerKeyEvent, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import sinon from 'sinon';

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
    await click('[data-test-button-close]');

    assert.deepEqual(applicationController.get('result'), {
      foo: 'bar',
    });
  });

  test('closing a modal will trigger the animation start on the `modals` service', async function (assert) {
    await visit('/');

    let modalsService = this.owner.lookup('service:modals');
    let spy = sinon.spy(modalsService, '_onModalAnimationStart');

    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');

    assert.dom('.epm-modal').exists();

    await waitUntil(() => {
      let { opacity } = window.getComputedStyle(document.querySelector('.epm-backdrop'));
      return opacity === '1';
    });

    assert.strictEqual(spy.callCount, 1, '_onModalAnimationStart is called when opening a modal');

    await triggerKeyEvent(document, 'keydown', 'Escape');

    assert.dom('.epm-modal').doesNotExist();
    assert.strictEqual(spy.callCount, 2, '_onModalAnimationStart is called again when closing it');
  });
});
