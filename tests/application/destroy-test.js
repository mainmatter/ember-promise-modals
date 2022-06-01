import { visit, click, settled } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Application | destroy', function (hooks) {
  setupApplicationTest(hooks);
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
