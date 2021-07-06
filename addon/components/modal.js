import Component from '@ember/component';
import { set } from '@ember/object';
import { or, readOnly } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { later, cancel } from '@ember/runloop';
import { inject as service } from '@ember/service';

import { createFocusTrap } from 'focus-trap';

import layout from '../templates/components/modal';

export default Component.extend({
  layout,

  tagName: '',
  outAnimationClass: 'epm-out',

  modals: service(),

  outAnimationTimeout: or('modal._service.outAnimationTimeout', 'modal._options.timeout'),
  optionsClassName: readOnly('modal._options.className'),

  modalElementId: null,

  init() {
    this._super(...arguments);

    set(this, 'modalElementId', guidFor(this));
  },

  didInsertElement() {
    this._super(...arguments);

    let { clickOutsideDeactivates } = this.modals;
    let element = document.getElementById(this.modalElementId);
    let options = {
      clickOutsideDeactivates,
      fallbackFocus: `#${this.modalElementId}`,
      onDeactivate: () => {
        if (this.isDestroyed || this.isDestroying) {
          return;
        }

        this.closeModal();
      },
    };

    this.focusTrap = createFocusTrap(element, options);
    this.focusTrap.activate();

    this.fadeOutEnd = ({ target, animationName }) => {
      this.modals._onModalAnimationEnd();

      let isntTarget = target !== element;
      let wrongAnimation = this.modal._options.animationName && this.modal._options.animationName !== animationName;
      let animationEndsWrong = animationName.substring(animationName.length - 4) !== '-out';

      if (isntTarget || wrongAnimation || animationEndsWrong) {
        return;
      }

      this.removeModal();
    };

    this.modals._onModalAnimationStart();
    element.addEventListener('animationend', this.fadeOutEnd);
    set(this, 'animatingOutClass', '');
  },

  willDestroyElement() {
    if (this._timeout) {
      cancel(this._timeout);
    }

    if (this.focusTrap) {
      this.focusTrap.deactivate({ onDeactivate: null });
    }

    if (this.fadeOutEnd) {
      let element = document.getElementById(this.modalElementId);

      if (element) {
        element.removeEventListener('animationend', this.fadeOutEnd);
      }
    }

    this._super(...arguments);
  },

  closeModal(result) {
    // Timeout fallback in case something with the animation goes wrong
    this._timeout = later(() => {
      this.removeModal();
    }, this.outAnimationTimeout);

    // Trigger out animation
    set(this, 'animatingOutClass', this.outAnimationClass);

    if (this.focusTrap) {
      this.focusTrap.deactivate({ onDeactivate: null });
    }

    this.modal.resolve(result);
  },

  removeModal() {
    if (this._timeout) {
      cancel(this._timeout);
    }

    this.modal.close();
  },

  actions: {
    close(result) {
      this.closeModal(result);
    },
  },
});
