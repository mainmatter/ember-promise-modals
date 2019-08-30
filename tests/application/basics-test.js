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

  test('opening a modal disables scrolling on the <body> element', async function(assert) {
    await visit('/');
    assert.dom('body', document).hasStyle({ overflow: 'visible' });

    await click('[data-test-show-modal]');
    assert.dom('body', document).hasStyle({ overflow: 'hidden' });

    await click('.epm-backdrop');
    assert.dom('body', document).hasStyle({ overflow: 'visible' });
  });
});
