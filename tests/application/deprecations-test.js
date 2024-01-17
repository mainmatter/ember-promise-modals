import { visit, click, getDeprecations, waitUntil } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

import ENV from 'dummy/config/environment';

import { setupPromiseModals } from 'ember-promise-modals/test-support';

module('Application | Deprecations', function (hooks) {
  setupApplicationTest(hooks);
  setupPromiseModals(hooks);

  if (!ENV.SKIP_EMBROIDER_DEPRECATION_TEST) {
    test("opening a modal by it's path triggers a deprecation", async function (assert) {
      await visit('/');

      assert.dom('.epm-backdrop').doesNotExist();
      assert.dom('.epm-modal').doesNotExist();

      this.owner.lookup('service:modals').open('modal1');

      await waitUntil(() => {
        let { opacity } = window.getComputedStyle(document.querySelector('.epm-backdrop'));
        return opacity === '1';
      });

      assert.dom('.epm-modal').exists();
      assert.dom('.epm-backdrop').exists();

      assert.dom('.epm-backdrop').hasStyle({
        opacity: '1',
        pointerEvents: 'auto',
      });

      await click('.epm-backdrop');

      assert.dom('.epm-backdrop').doesNotExist();
      assert.dom('.epm-modal').doesNotExist();

      const deprecations = getDeprecations();
      const modalFromString = deprecations.find(
        ({ options }) => options.id === 'ember-promise-modals.modals-from-string',
      );

      assert.ok(modalFromString, 'ember-promise-modals.modals-from-string deprecation was triggered');
      console.log(modalFromString.message.includes('"modal1"'));
    });
  }
});
