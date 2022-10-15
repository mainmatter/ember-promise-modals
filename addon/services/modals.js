import { A } from '@ember/array';
import { deprecate } from '@ember/debug';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Service from '@ember/service';

import Modal from '../modal';

export default Service.extend({
  count: computed('_stack.@each.isClosing', function () {
    return this._stack.filter(modal => !modal.isClosing).length;
  }),
  top: alias('_stack.lastObject'),

  focusTrapOptions: undefined,

  init() {
    this._super(...arguments);
    this._stack = A([]);

    if (this.focusTrapOptions !== null) {
      this.focusTrapOptions = {
        ...(this.focusTrapOptions ?? {}),
        clickOutsideDeactivates: this.focusTrapOptions?.clickOutsideDeactivates ?? true,
      };
    }
  },

  willDestroy() {
    this._onLastModalRemoved();
    this._onModalAnimationEnd();
    this._destroyModals();

    this._super(...arguments);
  },

  /**
   * @param {*} componentClass component class
   * @param {*} data passed to the component template
   * @param {ModalOptions} options applied to the modal
   * @returns {Modal}
   */
  open(componentClass, data, options) {
    deprecate(
      `Ember Promise Modals: For extendend compatibility with Embroider and it's tree-shaking ability, you need to import and pass in the component class of the modal component you want to display instead of "${componentClass}".`,
      typeof componentClass !== 'string',
      {
        id: 'ember-promise-modals.modals-from-string',
        until: '4.0.0',
        for: 'ember-promise-modals',
        since: {
          enabled: '3.1.0',
        },
        url: 'https://github.com/mainmatter/ember-promise-modals/blob/main/DEPRECATIONS.md#ember-promise-modals.modals-from-string',
      },
    );

    let modal = new Modal(this, componentClass, data, options);

    this._stack.pushObject(modal);

    if (this._stack.length === 1) {
      this._onFirstModalAdded();
    }

    return modal;
  },

  _destroyModals() {
    this._stack.forEach(modal => {
      modal._destroy();
    });
  },

  _onFirstModalAdded() {
    document.body.classList.add('epm-scrolling-disabled');
  },

  _onLastModalRemoved() {
    document.body.classList.remove('epm-scrolling-disabled');
  },

  _onModalAnimationStart() {
    document.body.classList.add('epm-animating');
  },

  _onModalAnimationEnd() {
    document.body.classList.remove('epm-animating');
  },
});
