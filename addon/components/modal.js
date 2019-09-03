import Component from '@ember/component';

import createFocusTrap from 'focus-trap';

import layout from '../templates/components/modal';

export default Component.extend({
  layout,
  classNames: ['epm-modal'],

  didInsertElement() {
    this._super(...arguments);

    this.focusTrap = createFocusTrap(this.element, {
      clickOutsideDeactivates: true,

      onDeactivate: () => {
        this.modal.close();
      },
    });

    this.focusTrap.activate();
  },

  willRemoveElement() {
    if (this.focusTrap) {
      this.focusTrap.deactivate({ onDeactivate: null });
    }

    this._super(...arguments);
  },

  actions: {
    close(result) {
      this.modal.close(result);
    },
  },
});
