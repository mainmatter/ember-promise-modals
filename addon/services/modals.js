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
  clickOutsideDeactivates: undefined,
  disableFocusTrap: false,

  init() {
    this._super(...arguments);
    this._stack = A([]);

    let focusTrapOptions = this.focusTrapOptions ?? {};
    let clickOutsideDeactivates = focusTrapOptions.clickOutsideDeactivates ?? this.clickOutsideDeactivates ?? true;

    deprecate(
      'Defining `clickOutsideDeactivates` directly on the `modals` service is deprecated. ' +
        `Please use \`focusTrapOptions: { clickOutsideDeactivates: ${this.clickOutsideDeactivates} }\` instead.`,
      typeof this.clickOutsideDeactivates === 'undefined',
      {
        id: 'clickOutsideDeactivates-on-modals-service',
        since: '3.1.0',
        until: '3.0.0',
        for: 'ember-promise-modals',
      },
    );

    this.focusTrapOptions = {
      ...this.focusTrapOptions,
      clickOutsideDeactivates,
    };
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
