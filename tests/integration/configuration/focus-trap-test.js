import { render, settled } from '@ember/test-helpers';
import focus from '@ember/test-helpers/dom/focus';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import Component from '@ember/component';

import hbs from 'htmlbars-inline-precompile';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Configuration | focus trap', function (hooks) {
  setupRenderingTest(hooks);
  setupPromiseModals(hooks);

  let renderAndOpenModal = async context => {
    await render(hbs`
      <button type="button" data-test-outside-button>👋</button>
      <EpmModalContainer />
    `);

    let modals = context.owner.lookup('service:modals');
    modals.open('foo');

    await settled();
  };

  hooks.beforeEach(function () {
    this.owner.register(
      'component:foo',
      Component.extend({
        tagName: '',
        layout: hbs`<button type="button" data-test-inside-button>🎉</button>`,
      }),
    );
  });

  test('focus trap is enabled', async function (assert) {
    await renderAndOpenModal(this);

    await focus('[data-test-outside-button]');

    assert.dom('[data-test-outside-button]').isNotFocused();
    assert.dom('[data-test-inside-button]').isFocused();
  });

  test('focus trap is disabled', async function (assert) {
    let modals = this.owner.lookup('service:modals');
    modals.set('disableFocusTrap', true);

    await renderAndOpenModal(this);

    await focus('[data-test-outside-button]');

    assert.dom('[data-test-outside-button]').isFocused();
    assert.dom('[data-test-inside-button]').isNotFocused();
  });
});
