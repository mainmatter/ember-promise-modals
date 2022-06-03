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
  animatingClass: '',

  modals: service(),

  optionsClassName: readOnly('modal._options.className'),

  modalElementId: null,
  focusTrapOptions: null,
  _animationEnd: null,

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
    this._animationEnd = ({ target, animationName }) => {
      // ignore animations bubbling up
      if (target !== this._getElement()) {
        return;
      }

      // An animation has ended, inform the modals service
      this.modals._onModalAnimationEnd();

      let isOutAnimation = animationName.substring(animationName.length - 4) === '-out';
      if (isOutAnimation) {
        this.modal._remove();
      }
    };

    let element = this._getElement();
    if (element) {
      element.addEventListener('animationend', this._animationEnd);
    }
  },

  _removeAnimationListeners() {
    if (!this._animationEnd) {
      return;
    }

    let element = this._getElement();
    if (element) {
      element.removeEventListener('animationend', this._animationEnd);
    }

    this._animationEnd = null;
  },

  closeModal(result) {
    // This triggers the out animation, which in turn will remove the modal after it completes
    set(this, 'animatingClass', this.outAnimationClass);

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
