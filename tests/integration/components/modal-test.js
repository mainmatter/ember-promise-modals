import { render, settled, waitFor } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import Component from '@ember/component';

import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Component | Modal', function (hooks) {
  setupRenderingTest(hooks);
  setupPromiseModals(hooks);

  test('closeModal() should resolve only once', async function (assert) {
    this.owner.register(
      'component:foo',
      Component.extend({
        tagName: '',
        layout: hbs`<button type="button">foo</button>`,
      }),
    );

    await render(hbs`<EpmModalContainer />`);

    let modals = this.owner.lookup('service:modals');
    let modal = modals.open('foo');
    let spy = sinon.spy(modal, '_resolve');

    await settled();

    modal.close();

    await waitFor('.epm-out');

    modal.close();

    await settled();

    assert.ok(spy.calledOnce, 'modal._resolve() was called only once');
  });
});
