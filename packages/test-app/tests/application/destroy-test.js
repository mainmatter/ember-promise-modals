import { click, isSettled, settled, visit } from '@ember/test-helpers';
import { waitForPromise } from '@ember/test-waiters';
import { setupPromiseModals } from 'ember-promise-modals/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Application | destroy', function (hooks) {
  setupApplicationTest(hooks);

  module('manually', function () {
    setupPromiseModals(hooks);

    test('destroying the modal removes it from the DOM', async function (assert) {
      await visit('/');

      assert.dom('.epm-backdrop').doesNotExist();
      assert.dom('.epm-modal').doesNotExist();

      await click('[data-test-show-modal]');

      assert.dom('.epm-modal').exists();
      assert.dom('.epm-backdrop').exists();

      this.modals._destroyModals();

      await settled();

      assert.dom('.epm-backdrop').doesNotExist();
      assert.dom('.epm-modal').doesNotExist();
    });
  });

  module('when the test helper destroys the modal', function (hooks) {
    let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    hooks.afterEach(function (assert) {
      assert.dom('.epm-backdrop').doesNotExist();
      assert.dom('.epm-modal').doesNotExist();
      assert.true(isSettled(), 'application is in settled state');
    });

    setupPromiseModals(hooks);

    hooks.afterEach(async function () {
      waitForPromise(wait(20));
    });

    test('it waits until application is settled', async function (assert) {
      this.data = {};

      await visit('/');

      assert.dom('.epm-backdrop').doesNotExist();
      assert.dom('.epm-modal').doesNotExist();

      await click('[data-test-show-modal]');

      assert.dom('.epm-modal').exists();
      assert.dom('.epm-backdrop').exists();
    });
  });
});
