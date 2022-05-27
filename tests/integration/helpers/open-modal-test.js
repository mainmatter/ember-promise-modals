import { render, click, settled } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import Component from '@ember/component';

import { hbs } from 'ember-cli-htmlbars';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Integration | Helper | open-modal', function (hooks) {
  setupRenderingTest(hooks);
  setupPromiseModals(hooks);

  hooks.beforeEach(function () {
    this.modal = Component.extend({
      tagName: '',
      layout: hbs`
        <div data-test-wrap>
          {{!-- template-lint-disable no-action --}}
          <button type="button" data-test-close {{action @close}}>Close</button>
          <button type="button" data-test-submit {{action @close @data}}>Submit</button>
        </div>
      `,
    });
  });

  test('it renders the passed component in a modal', async function (assert) {
    this.data = {};

    await render(hbs`
      {{open-modal this.modal data=this.data}}
      <EpmModalContainer />
    `);

    assert.dom('[data-test-wrap]').exists();
  });

  test('it closes the modal and calls the close hook on a cancellation when setting show to false', async function (assert) {
    this.show = true;
    this.data = { foo: 'bar' };
    this.close = success => {
      assert.step(`close:${success}`);
    };

    await render(hbs`
      {{open-modal this.modal this.data show=this.show close=this.close}}
      <EpmModalContainer />
    `);
    assert.dom('[data-test-wrap]').exists('Modal is rendered');

    this.set('show', false);

    await settled();

    assert.dom('[data-test-wrap]').doesNotExist('setting `show` to `false` hides the modal');

    assert.verifySteps(['close:undefined']);
  });

  test('it closes the modal and calls the close hook when triggering the close action inside the modal', async function (assert) {
    this.show = true;
    this.data = { foo: 'bar' };
    this.close = success => {
      assert.step(`close:${success}`);
    };

    await render(hbs`
      {{open-modal this.modal this.data show=this.show close=this.close}}
      <EpmModalContainer />
    `);

    assert.dom('[data-test-wrap]').exists('Modal is rendered');

    await click('[data-test-close]');

    assert.dom('[data-test-wrap]').doesNotExist('clicking the close button closes the modal');

    assert.verifySteps(['close:undefined']);
  });

  test('it closes the modal and calls the close hook with passed data when triggering the close action inside the modal with data', async function (assert) {
    this.show = true;
    this.data = { foo: 'bar' };
    this.close = success => {
      assert.step(`close:${JSON.stringify(success)}`);
    };

    await render(hbs`
      {{open-modal this.modal this.data show=this.show close=this.close}}
      <EpmModalContainer />
    `);

    assert.dom('[data-test-wrap]').exists('Modal is rendered');

    await click('[data-test-submit]');

    assert.dom('[data-test-wrap]').doesNotExist('clicking the close button closes the modal');

    assert.verifySteps(['close:{"foo":"bar"}']);
  });

  test('it closes the modal and calls the close hook on a cancellation when clicking outside', async function (assert) {
    this.show = true;
    this.data = { foo: 'bar' };
    this.close = success => {
      assert.step(`close:${success}`);
    };

    await render(hbs`
      {{open-modal this.modal this.data show=this.show close=this.close}}
      <EpmModalContainer />
    `);

    assert.dom('[data-test-wrap]').exists('Modal is rendered');

    await click('.epm-backdrop');

    assert.dom('[data-test-wrap]').doesNotExist('clicking the backdrop closes the modal');

    this.set('show', false);

    assert.verifySteps(['close:undefined']);
  });

  test('it closes the modal and calls the close hook when the helper is unrendered', async function (assert) {
    this.renderHelper = true;
    this.show = true;
    this.data = {};
    this.close = success => {
      assert.step(`close:${success}`);
    };

    await render(
      hbs`
        {{#if this.renderHelper}}
          {{open-modal this.modal show=this.show data=this.data close=this.close}}
        {{/if}}
        <EpmModalContainer />
      `,
    );

    assert.dom('[data-test-wrap]').exists();
    this.set('renderHelper', false);
    await settled();

    assert.dom('[data-test-wrap]').doesNotExist();
    assert.verifySteps(['close:undefined']);
  });
});
