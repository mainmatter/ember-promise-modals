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
  fadeOutEnd: null,

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

    this._addFocusTrap();
    this._addAnimationListeners();

    // animating in starts when the element is added to the DOM. Inform the service about it.
    this.modals._onModalAnimationStart();
  },

  willDestroyElement() {
    // Remove the focus trap without triggering the optional onDeactivate() hook
    this._removeFocusTrap(null);

    this._removeAnimationListeners();

    this._super(...arguments);
  },

  _getElement() {
    return document.getElementById(this.modalElementId);
  },

  _addFocusTrap() {
    let element = this._getElement();

    if (!this.focusTrapOptions) {
      return;
    }

    let options = {
      ...this.focusTrapOptions,
      fallbackFocus: element,
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
  },

  _removeFocusTrap(onDeactivate = this.focusTrapOptions?.onDeactivate) {
    if (!this.focusTrap) {
      return;
    }

    this.focusTrap.deactivate({ onDeactivate });
  },

  _addAnimationListeners() {
    this.fadeOutEnd = ({ target, animationName }) => {
      this.modals._onModalAnimationEnd();

      let isntTarget = target !== this._getElement();
      let animationEndsWrong = animationName.substring(animationName.length - 4) !== '-out';

      if (isntTarget || animationEndsWrong) {
        return;
      }

      this.modal._remove();
    };

    this._getElement().addEventListener('animationend', this.fadeOutEnd);
  },

  _removeAnimationListeners() {
    if (this.fadeOutEnd) {
      let element = this._getElement();

      if (element) {
        element.removeEventListener('animationend', this.fadeOutEnd);
        // make sure that we remove the modal, also resolving the test waiter
        this.modal._remove();
      }

      this.fadeOutEnd = null;
    }
  },

  closeModal(result) {
    // Trigger out animation
    set(this, 'animatingOutClass', this.outAnimationClass);

    this.modal._resolve(result);
  },

  actions: {
    close(result) {
      this.closeModal(result);

      // Remove the focus trap, triggering the onDeactivate() hook
      this._removeFocusTrap();
    },
  },
});
