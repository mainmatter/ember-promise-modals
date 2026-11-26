import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { setupPromiseModals } from 'ember-promise-modals/test-support';
import hbs from 'htmlbars-inline-precompile';

import config from '../../config/environment';
import { mockModalComponent } from '../helpers/mocks';

// Run with and without `EPM_SKIP_CSS_IMPORT=true` (see ember-cli-build.js)
const { skipCssImport } = config.APP;

module('Integration | styles', function (hooks) {
  setupRenderingTest(hooks);
  setupPromiseModals(hooks);

  test('the addon stylesheet applies', async function (assert) {
    await render(hbs`<EpmModalContainer />`);
    this.owner.lookup('service:modals').open(mockModalComponent(hbs`modal`));
    await new Promise(resolve => requestAnimationFrame(resolve));

    assert.strictEqual(getComputedStyle(document.querySelector('.epm-backdrop')).position, 'fixed');
  });

  // Only assert the opt-out: whether the default import ends up inline depends on the bundler and environment.
  if (skipCssImport) {
    test('the addon does not inject an inline <style> element', function (assert) {
      let inlineStyles = [...document.querySelectorAll('style')].filter(style =>
        style.textContent.includes('.epm-backdrop'),
      );

      assert.strictEqual(inlineStyles.length, 0);
    });
  }
});
