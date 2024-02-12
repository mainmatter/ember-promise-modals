import { click, render, settled, triggerKeyEvent } from '@ember/test-helpers';
import focus from '@ember/test-helpers/dom/focus';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import Component from '@ember/component';

import ModalsService from 'ember-promise-modals/services/modals';
import { setupPromiseModals } from 'ember-promise-modals/test-support';
import hbs from 'htmlbars-inline-precompile';

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

  // Since `setupPromiseModals(hooks)` perform a lookup at `beforeEach`, use
  // this to get a freshly baked service
  let reregisterModalsService = (owner, obj) => {
    owner.unregister('service:modals');
    owner.register('service:modals', obj);
  };

  hooks.beforeEach(function () {
    this.owner.register(
      'component:foo',
      Component.extend({
        tagName: '',
        layout: hbs`
          <button type="button" data-test-inside-button onclick={{action this.close}}>
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
    reregisterModalsService(
      this.owner,
      ModalsService.extend({
        focusTrapOptions: null,
      }),
    );

    await renderAndOpenModal(this);

    await focus('[data-test-outside-button]');

    assert.dom('[data-test-outside-button]').isFocused();
    assert.dom('[data-test-inside-button]').isNotFocused();
  });

  test('global focus trap options', async function (assert) {
    reregisterModalsService(
      this.owner,
      ModalsService.extend({
        // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
        focusTrapOptions: {
          onActivate() {
            assert.step('onActivate was called');
          },
        },
      }),
    );

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

  test('local focus trap options override service options', async function (assert) {
    assert.expect(2);

    reregisterModalsService(
      this.owner,
      ModalsService.extend({
        // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
        focusTrapOptions: {
          onActivate() {
            assert.step('global onActivate was called');
          },

          onDeactivate() {
            assert.notOk(true, 'global onDeactivate should have been overriden');
          },
        },
      }),
    );

    await renderAndOpenModal(this, {
      focusTrapOptions: {
        onActivate() {
          assert.step('local onActivate was called');
        },
      },
    });

    await click('[data-test-inside-button]');

    assert.verifySteps(['local onActivate was called']);
  });

  test('focust trap is disabled locally', async function (assert) {
    assert.expect(0);

    reregisterModalsService(
      this.owner,
      ModalsService.extend({
        // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
        focusTrapOptions: {
          onActivate() {
            assert.notOk(true, 'global onActivate should not have been called');
          },
        },
      }),
    );

    await renderAndOpenModal(this, {
      focusTrapOptions: null,
    });

    await click('[data-test-inside-button]');
  });

  test('globally disabled focusTrapOptions is overriden when local options are provided', async function (assert) {
    reregisterModalsService(
      this.owner,
      ModalsService.extend({
        focusTrapOptions: null,
      }),
    );

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
