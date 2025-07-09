import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { createFocusTrap } from 'focus-trap';

export default class EpmModal extends Component {
  @service modals;

  element = null;
  outAnimationClass = 'epm-out';
  _animationEnd = null;

  @tracked animatingClass = '';

  get optionsClassName() {
    return this.args.modal._options.className;
  }

  get focusTrapOptions() {
    let { focusTrapOptions: globalFocusTrapOptions } = this.modals;
    let { focusTrapOptions: localFocusTrapOptions } = this.args.modal._options;

    if (localFocusTrapOptions !== undefined) {
      return localFocusTrapOptions;
    }

    return globalFocusTrapOptions;
  }

  setup = modifier(element => {
    this.element = element;
    this._addFocusTrap();
    this._addAnimationListeners();

    // animating in starts when the element is added to the DOM. Inform the service about it.
    this.modals._onModalAnimationStart();

    return () => {
      this.destroyModal();
    };
  });

  constructor() {
    super(...arguments);

    this.args.modal._componentInstance = this;
  }

  _addFocusTrap() {
    if (!this.focusTrapOptions) {
      return;
    }

    let options = {
      ...this.focusTrapOptions,
      fallbackFocus: this.element,
      onDeactivate: (...args) => {
        this.focusTrapOptions.onDeactivate?.(...args);

        if (this.isDestroyed || this.isDestroying) {
          return;
        }

        this.closeModal();
      },
    };

    this.focusTrap = createFocusTrap(this.element, options);
    this.focusTrap.activate();
  }

  _removeFocusTrap(onDeactivate = this.focusTrapOptions?.onDeactivate) {
    if (!this.focusTrap) {
      return;
    }

    this.focusTrap.deactivate({ onDeactivate });
  }

  _addAnimationListeners() {
    this._animationEnd = ({ target, animationName }) => {
      // ignore animations bubbling up
      if (target !== this.element) {
        return;
      }

      // An animation has ended, inform the modals service
      this.modals._onModalAnimationEnd();

      let isOutAnimation = animationName.substring(animationName.length - 4) === '-out';
      if (isOutAnimation) {
        this.args.modal._remove();
      }
    };

    if (this.element) {
      this.element.addEventListener('animationend', this._animationEnd);
    }
  }

  _removeAnimationListeners() {
    if (!this._animationEnd) {
      return;
    }

    if (this.element) {
      this.element.removeEventListener('animationend', this._animationEnd);
    }

    this._animationEnd = null;
  }

  destroyModal() {
    // Remove the focus trap without triggering the optional onDeactivate() hook
    this._removeFocusTrap(null);

    // Remove the animation listeners
    this._removeAnimationListeners();

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
