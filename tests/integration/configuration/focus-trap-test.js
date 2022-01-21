import { click, render, settled, triggerKeyEvent } from '@ember/test-helpers';
import focus from '@ember/test-helpers/dom/focus';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import Component from '@ember/component';

import hbs from 'htmlbars-inline-precompile';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Configuration | focus trap', function (hooks) {
  setupRenderingTest(hooks);
  setupPromiseModals(hooks);

  let renderAndOpenModal = async (context, modalOptions) => {
    await render(hbs`
      <button type="button" data-test-outside-button>👋</button>
      <EpmModalContainer />
    `);

    let modals = context.owner.lookup('service:modals');
    modals.open('foo', undefined, modalOptions);

    await settled();
  };

  hooks.beforeEach(function () {
    this.owner.register(
      'component:foo',
      Component.extend({
        tagName: '',
        layout: hbs`
          <button type="button" data-test-inside-button {{on "click" @close}}>
            🎉
          </button>
        `,
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

  test('global focus trap options', async function (assert) {
    let modals = this.owner.lookup('service:modals');
    modals.set('focusTrapOptions', {
      onActivate() {
        assert.step('onActivate was called');
      },
    });

    await renderAndOpenModal(this);

    assert.verifySteps(['onActivate was called']);
  });

  test('local focus trap options', async function (assert) {
    await renderAndOpenModal(this, {
      focusTrapOptions: {
        onActivate() {
          assert.step('onActivate was called');
        },
      },
    });

    assert.verifySteps(['onActivate was called']);
  });

  test('local focus trap options take precedence', async function (assert) {
    let modals = this.owner.lookup('service:modals');
    modals.set('focusTrapOptions', {
      onActivate() {
        assert.step('global onActivate was called');
      },
    });

    await renderAndOpenModal(this, {
      focusTrapOptions: {
        onActivate() {
          assert.step('local onActivate was called');
        },
      },
    });

    assert.verifySteps(['local onActivate was called']);
  });

  test('onDeactivate is called on when the modal is closed when the Escape key is pressed', async function (assert) {
    await renderAndOpenModal(this, {
      focusTrapOptions: {
        onDeactivate() {
          assert.step('onDeactivate was called');
        },
      },
    });

    await triggerKeyEvent(document, 'keydown', 'Escape');

    assert.verifySteps(['onDeactivate was called']);
  });

  test('onDeactivate is called on when the modal is closed when the modal is closed via the close action', async function (assert) {
    await renderAndOpenModal(this, {
      focusTrapOptions: {
        onDeactivate() {
          assert.step('onDeactivate was called');
        },
      },
    });

    await click('[data-test-inside-button]');

    assert.verifySteps(['onDeactivate was called']);
  });
});
