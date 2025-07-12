import { set } from '@ember/object';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Service from '@ember/service';

import Modal from '../modal.js';

/* eslint-disable ember/no-classic-classes */
export default Service.extend({
  count: computed('_stack.@each.isClosing', function () {
    return this._stack.filter(modal => !modal.isClosing).length;
  }),
  top: alias('_stack.lastObject'),

  focusTrapOptions: undefined,

  init() {
    this._super(...arguments);
    set(this, '_stack', A([]));

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
