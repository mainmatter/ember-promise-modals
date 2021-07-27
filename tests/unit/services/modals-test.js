import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Service | modals', function (hooks) {
  setupTest(hooks);

  test('basics', function (assert) {
    let modals = this.owner.lookup('service:modals');
    assert.equal(modals.count, 0, '#count');
    assert.strictEqual(modals.top, undefined, '#top');

    let modal1 = modals.open('modal1', { foo: 'bar' });
    assert.equal(modals.count, 1, '#count');
    assert.strictEqual(modals.top, modal1, '#top');

    let modal2 = modals.open('modal2');
    assert.equal(modals.count, 2, '#count');
    assert.strictEqual(modals.top, modal2, '#top');

    modal2._remove();
    assert.equal(modals.count, 1, '#count');
    assert.strictEqual(modals.top, modal1, '#top');

    modal1._remove();
    assert.equal(modals.count, 0, '#count');
    assert.strictEqual(modals.top, undefined, '#top');
  });

  test('modals can have results', function (assert) {
    let modals = this.owner.lookup('service:modals');

    let modal = modals.open('modal');
    assert.strictEqual(modal.result, undefined);

    modal._resolve('foo');
    assert.strictEqual(modal.result, 'foo');

    modal._remove();
  });

  test('modals are promises', async function (assert) {
    let modals = this.owner.lookup('service:modals');
    let modal = modals.open('modal');

    // eslint-disable-next-line promise/catch-or-return
    modal.then(() => {
      assert.step('then');
    });

    assert.verifySteps([]);

    modal._resolve('foo');

    let result = await modal;
    assert.verifySteps(['then']);
    assert.equal(result, 'foo');

    modal._remove();
  });

  test('modals do not show up in openCount when closing', async function (assert) {
    let modals = this.owner.lookup('service:modals');
    let modal = modals.open('modal');

    assert.equal(modals.count, 1);

    modal._resolve();

    assert.equal(modals.count, 0);

    modal._remove();

    assert.equal(modals.count, 0);
  });

  test('modals will call the optional onAnimationModalOutEnd hook when it is passed as an option', async function (assert) {
    let modals = this.owner.lookup('service:modals');
    let modal = modals.open(
      'modal',
      {},
      {
        onAnimationModalOutEnd: () => {
          assert.step('animation ended');
        },
      },
    );
    assert.step('modal open');

    modal._resolve();
    assert.step('modal closing');

    modal._remove();
    assert.step('modal closed');

    // we need to wait a tick for the closing animation promise to be resolved
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    assert.verifySteps(['modal open', 'modal closing', 'modal closed', 'animation ended']);
  });
});
