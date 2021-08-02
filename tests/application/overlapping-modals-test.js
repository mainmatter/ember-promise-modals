import { visit, click, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Application | overlapping modals', function (hooks) {
  setupApplicationTest(hooks);
  setupPromiseModals(hooks);

  test('every modal should have a dedicated backdrop', async function (assert) {
    await visit('/');

    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');

    assert.dom('.epm-modal').exists();
    assert.dom('.epm-backdrop').exists({ count: 1 });

    await click('[data-test-show-modal-2]');

    await waitUntil(() => {
      let { opacity } = window.getComputedStyle(document.querySelector('[data-test-epm-backdrop="1"]'));
      return opacity === '1';
    });

    assert.dom('[data-test-epm-backdrop="0"]').hasStyle({
      opacity: '1',
      pointerEvents: 'auto',
    });

    assert.dom('[data-test-epm-backdrop="1"]').hasStyle({
      opacity: '1',
      pointerEvents: 'auto',
    });
  });

  test('clicking a backdrop closes the associated modal', async function (assert) {
    await visit('/');

    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');
    await click('[data-test-show-modal-2]');

    assert.dom('.epm-backdrop').exists({ count: 2 });
    assert.dom('.epm-modal').exists({ count: 2 });

    await click('[data-test-epm-backdrop="1"]');

    assert.dom('[data-test-epm-backdrop="1"]').doesNotExist();
    assert.dom('[data-test-epm-modal="1"]').doesNotExist();

    // check that there are still a modal and a backdrop left
    assert.dom('.epm-backdrop').exists({ count: 1 });
    assert.dom('.epm-modal').exists({ count: 1 });

    await click('[data-test-epm-backdrop="0"]');
    assert.dom('[data-test-epm-modal="0"]').doesNotExist();

    // check that there are no modals nor backdrops left
    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();
  });
});
