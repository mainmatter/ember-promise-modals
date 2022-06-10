import Component from '@ember/component';
import { set } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { guidFor } from '@ember/object/internals';
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

    if (this.focusTrapOptions) {
      let element = this._getElement();
      let options = {
        ...this.focusTrapOptions,
        fallbackFocus: `#${this.modalElementId}`,
        onDeactivate: (...args) => {
          this.focusTrapOptions.onDeactivate?.(...args);

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
      this.modals._onModalAnimationEnd();

      let isntTarget = target !== this._getElement();
      let animationEndsWrong = animationName.substring(animationName.length - 4) !== '-out';

      if (isntTarget || animationEndsWrong) {
        return;
      }

      this.modal._remove();
    };

    this.modals._onModalAnimationStart();
    this._getElement().addEventListener('animationend', this.fadeOutEnd);
    set(this, 'animatingOutClass', '');
  },

  willDestroyElement() {
    if (this.focusTrap) {
      this.focusTrap.deactivate({ onDeactivate: null });
    }

    if (this.fadeOutEnd) {
      let element = this._getElement();

      if (element) {
        element.removeEventListener('animationend', this.fadeOutEnd);
        // make sure that we remove the modal, also resolving the test waiter
        this.modal._remove();
      }
    }

    this._super(...arguments);
  },

  _getElement() {
    return document.getElementById(this.modalElementId);
  },

  closeModal(result) {
    // Trigger out animation
    set(this, 'animatingOutClass', this.outAnimationClass);

    this.modal._resolve(result);
  },

  actions: {
    close(result) {
      this.closeModal(result);

      if (this.focusTrap) {
        this.focusTrap.deactivate({
          onDeactivate: this.focusTrapOptions.onDeactivate,
        });
      }
    },
  },
});
