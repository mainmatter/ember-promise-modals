import Component from '@ember/component';
import { inject as service } from '@ember/service';

import { createFocusTrap } from 'focus-trap';

import layout from '../templates/components/modal';

export default Component.extend({
  layout,
  classNames: ['epm-modal'],

  modals: service(),

  didInsertElement() {
    this._super(...arguments);

    let { clickOutsideDeactivates } = this.modals;

    this.focusTrap = createFocusTrap(this.element, {
      clickOutsideDeactivates,

      onDeactivate: () => {
        this.modal.close();
      },
    });

    this.focusTrap.activate();
  },

  willDestroyElement() {
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
