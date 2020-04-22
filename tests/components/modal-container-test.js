import { render, settled } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import Component from '@ember/component';

import { animationsSettled } from 'ember-animated/test-support';
import hbs from 'htmlbars-inline-precompile';

module('Component | ModalContainer', function (hooks) {
  setupRenderingTest(hooks);

  test('renders the modals for the `modals` service', async function (assert) {
    this.owner.register(
      'component:foo',
      Component.extend({
        layout: hbs`<button>foo</button> {{@data.bar}}`,
      }),
    );

    await render(hbs`<EpmModalContainer />`);
    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();
    assert.dom(this.element).hasText('');

    let modals = this.owner.lookup('service:modals');

    let modal = modals.open('foo', { bar: 'baz' });
    await settled();
    await animationsSettled();
    assert.dom('.epm-backdrop').exists();
    assert.dom('.epm-modal').exists({ count: 1 });
    assert.dom('.epm-modal').hasText('foo baz');

    modal.close();
    await settled();
    await animationsSettled();
    assert.dom('.epm-backdrop').doesNotExist();
    assert.dom('.epm-modal').doesNotExist();
    assert.dom(this.element).hasText('');
  });
});
