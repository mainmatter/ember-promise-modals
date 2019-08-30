import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Application | basics', function(hooks) {
  setupApplicationTest(hooks);

  test('clicking the backdrop closes the modal', async function(assert) {
    await visit('/');
    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();

    await click('[data-test-show-modal]');
    assert.dom('.epm-backdrop').exists();
    assert.dom('.epm-modal').exists();

    await click('.epm-backdrop');
    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();
  });
});
