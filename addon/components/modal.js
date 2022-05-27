import Component from '@ember/component';
import { set } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
import { cancel, later } from '@ember/runloop';
import { inject as service } from '@ember/service';

import { createFocusTrap } from 'focus-trap';

import layout from '../templates/components/modal';

export default Component.extend({
  layout,

  tagName: '',
  outAnimationClass: 'epm-out',

  modals: service(),

  optionsClassName: readOnly('modal._options.className'),

  modalElementId: null,
  focusTrapOptions: null,
  _timeout: null,

  init() {
    this._super(...arguments);

    set(this, 'modalElementId', guidFor(this));
    this.modal._componentInstance = this;

    let { focusTrapOptions: globalFocusTrapOptions } = this.modals;
    let { focusTrapOptions: localFocusTrapOptions } = this.modal._options;

    if (localFocusTrapOptions !== null) {
      this.focusTrapOptions = localFocusTrapOptions || globalFocusTrapOptions;
    }
  },

  didInsertElement() {
    this._super(...arguments);

    let element = document.getElementById(this.modalElementId);

    if (this.focusTrapOptions) {
      let options = {
        ...this.focusTrapOptions,
        fallbackFocus: `#${this.modalElementId}`,
        onPostDeactivate: (...args) => {
          this.focusTrapOptions.onPostDeactivate?.(...args);

          if (this.isDestroyed || this.isDestroying) {
            return;
          }

          this.closeModal();
        },
      };

      this.focusTrap = createFocusTrap(element, options);
      this.focusTrap.activate();
    }

    this.fadeOutEnd = ({ target, animationName }) => {
      cancel(this._timeout);

      if (target !== element) {
        return;
      }

      this.modals._onModalAnimationEnd();

      let isOutAninmation = animationName.substring(animationName.length - 4) === '-out';

      if (isOutAninmation) {
        this.removeModal();

        return;
      }

      this.modal.onAnimationModalInEnd(animationName);
    };

    this.modals._onModalAnimationStart();
    element.addEventListener('animationend', this.fadeOutEnd);
    set(this, 'animatingOutClass', '');
  },

  willDestroyElement() {
    if (this.focusTrap) {
      this.focusTrap.deactivate({ onDeactivate: null });
    }

    if (this.fadeOutEnd) {
      let element = document.getElementById(this.modalElementId);

      if (element) {
        element.removeEventListener('animationend', this.fadeOutEnd);
        // make sure that we remove the modal, also resolving the test waiter
        this.removeModal();
      }
    }

    this._super(...arguments);
  },

  closeModal(result) {
    this.modals._onModalAnimationStart();

    // Trigger out animation
    set(this, 'animatingOutClass', this.outAnimationClass);

    const element = document.getElementById(this.modalElementId);
    const animationDuration = window.getComputedStyle(element)['animation-duration'] ?? '0.001s';
    this._timeout = later(this, 'removeModal', animationDuration.replace('s', '') * 1000 + 1);

    if (this.focusTrap) {
      this.focusTrap.deactivate({
        onDeactivate: this.focusTrapOptions.onDeactivate,
      });
    }

    this.modal._resolve(result);
  },

  removeModal() {
    cancel(this._timeout);
    this.modals._onModalAnimationEnd();
    this.modal?._remove();
  },

  actions: {
    close(result) {
      this.closeModal(result);
    },
  },
});
