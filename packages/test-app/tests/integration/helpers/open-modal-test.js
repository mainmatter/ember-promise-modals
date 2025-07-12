import { click, render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupPromiseModals } from 'ember-promise-modals/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { mockModalComponent } from '../../helpers/mocks';

module('Integration | Helper | open-modal', function (hooks) {
  setupRenderingTest(hooks);
  setupPromiseModals(hooks);

  hooks.beforeEach(function () {
    this.modal = mockModalComponent(hbs`
      <div data-test-wrap>
        <button type="button" data-test-close {{on "click" (fn @close undefined)}}>Close</button>
        <button type="button" data-test-submit {{on "click" (fn @close @data)}}>Submit</button>
      </div>
    `);
  });

  test('it renders the passed component in a modal', async function (assert) {
    this.data = {};

    await render(hbs`
      {{open-modal this.modal this.data}}
      <EpmModalContainer />
    `);

    assert.dom('[data-test-wrap]').exists();
  });

  test('it closes the modal and calls the close hook when triggering the close action inside the modal', async function (assert) {
    this.data = { foo: 'bar' };
    this.options = {};
    this.close = success => {
      assert.step(`close:${success}`);
    };

    await render(hbs`
      {{open-modal this.modal this.data this.options close=this.close}}
      <EpmModalContainer />
    `);

    assert.dom('[data-test-wrap]').exists('Modal is rendered');

    await click('[data-test-close]');

    assert.dom('[data-test-wrap]').doesNotExist('clicking the close button closes the modal');
    assert.verifySteps(['close:undefined']);
  });

  test('it closes the modal and calls the close hook with passed data when triggering the close action inside the modal with data', async function (assert) {
    this.data = { foo: 'bar' };
    this.close = success => {
      assert.step(`close:${JSON.stringify(success)}`);
    };

    await render(hbs`
      {{open-modal this.modal this.data close=this.close}}
      <EpmModalContainer />
    `);

    assert.dom('[data-test-wrap]').exists('Modal is rendered');

    await click('[data-test-submit]');

    assert.dom('[data-test-wrap]').doesNotExist('clicking the close button closes the modal');
    assert.verifySteps(['close:{"foo":"bar"}']);
  });

  test('it closes the modal and calls the close hook on a cancellation when clicking outside', async function (assert) {
    this.data = { foo: 'bar' };
    this.close = success => {
      assert.step(`close:${success}`);
    };

    await render(hbs`
      {{open-modal this.modal this.data close=this.close}}
      <EpmModalContainer />
    `);

    assert.dom('[data-test-wrap]').exists('Modal is rendered');

    await click('.epm-backdrop');

    assert.dom('[data-test-wrap]').doesNotExist('clicking the backdrop closes the modal');
    assert.verifySteps(['close:undefined']);
  });

  test('it closes the modal and calls the close hook when the helper is unrendered', async function (assert) {
    this.renderHelper = true;
    this.data = {};
    this.close = success => {
      assert.step(`close:${success}`);
    };

    await render(
      hbs`
        {{#if this.renderHelper}}
          {{open-modal this.modal this.data close=this.close}}
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
