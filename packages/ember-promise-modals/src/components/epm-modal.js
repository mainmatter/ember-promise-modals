import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { createFocusTrap } from 'focus-trap';

let initialiseModal = modifier(element => {
  this._addFocusTrap(element);
  this._addAnimationListeners(element);
  this.modals._onModalAnimationStart(element);
  return () => this.destroyModal();
});

export default class EpmModalComponent extends Component {
  outAnimationClass = 'epm-out';
  @tracked animatingClass = '';

  @service modals;

  initialiseModal = initialiseModal;

  get optionsClassName() {
    return this.args.modal._options.className;
  }

  @tracked focusTrapOptions = null;
  _animationEnd = null;

  constructor() {
    super(...arguments);

    this.args.modal._componentInstance = this;

    let { focusTrapOptions: globalFocusTrapOptions } = this.modals;
    let { focusTrapOptions: localFocusTrapOptions } = this.args.modal._options;

    if (localFocusTrapOptions !== null) {
      this.focusTrapOptions = localFocusTrapOptions || globalFocusTrapOptions;
    }
  }

  _addFocusTrap(element) {
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
  }

  _removeFocusTrap(onDeactivate = this.focusTrapOptions?.onDeactivate) {
    if (!this.focusTrap) {
      return;
    }

    this.focusTrap.deactivate({ onDeactivate });
  }

  _addAnimationListeners(element) {
    this._animationEnd = ({ target, animationName }) => {
      // ignore animations bubbling up
      if (target !== this._getElement()) {
        return;
      }

      // An animation has ended, inform the modals service
      this.modals._onModalAnimationEnd();

      let isOutAnimation = animationName.substring(animationName.length - 4) === '-out';
      if (isOutAnimation) {
        this.args.modal._remove();
      }
    };

    if (element) {
      element.addEventListener('animationend', this._animationEnd);
    }
  }

  _removeAnimationListeners(element) {
    if (!this._animationEnd) {
      return;
    }

    if (element) {
      element.removeEventListener('animationend', this._animationEnd);
    }

    this._animationEnd = null;
  }

  destroyModal(element) {
    // Remove the focus trap without triggering the optional onDeactivate() hook
    this._removeFocusTrap(null);

    // Remove the animation listeners
    this._removeAnimationListeners(element);

    // make sure that we remove the modal, also resolving the test waiter
    this.args.modal._remove();
  }

  closeModal(result) {
    if (this.animatingClass !== '') {
      return;
    }

    this.modals._onModalAnimationStart();

    // This triggers the out animation, which in turn will remove the modal after it completes
    this.animatingClass = this.outAnimationClass;

    this.args.modal._resolve(result);
  }

  @action
  close(result) {
    this.closeModal(result);

    // Remove the focus trap, triggering the onDeactivate() hook
    this._removeFocusTrap();
  }
}
