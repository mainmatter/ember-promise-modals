import { A } from '@ember/array';
import { computed, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import Service from '@ember/service';

import Modal from '../modal';

export default Service.extend({
  count: computed('_stack.@each.isClosing', function () {
    return this._stack.filter(modal => !modal.isClosing).length;
  }),
  top: alias('_stack.lastObject'),

  clickOutsideDeactivates: true,
  _renderBackdrop: false,

  init() {
    this._super(...arguments);
    this._stack = A([]);
  },

  willDestroy() {
    this._onLastModalRemoved();
  },

  open(name, data, options) {
    let modal = new Modal(this, name, data, options);

    this._stack.pushObject(modal);

    if (this._stack.length === 1) {
      this._onFirstModalAdded();
    }

    return modal;
  },

  _onFirstModalAdded() {
    set(this, '_renderBackdrop', true);
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
