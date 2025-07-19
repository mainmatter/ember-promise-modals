import Service from '@ember/service';

import { TrackedArray } from 'tracked-built-ins';

import Modal from '../modal';

export default class ModalsService extends Service {
  _stack = new TrackedArray([]);

  focusTrapOptions = undefined;

  get count() {
    return this._stack.filter(modal => !modal.isClosing).length;
  }

  get top() {
    return this._stack.at(-1);
  }

  constructor() {
    super(...arguments);

    if (this.focusTrapOptions !== null) {
      this.focusTrapOptions = {
        ...(this.focusTrapOptions ?? {}),
        clickOutsideDeactivates: this.focusTrapOptions?.clickOutsideDeactivates ?? true,
      };
    }
  }

  willDestroy() {
    this._onLastModalRemoved();
    this._onModalAnimationEnd();
    this._destroyModals();

    super.willDestroy(...arguments);
  }

  /**
   * @param {*} componentClass component class
   * @param {*} data passed to the component template
   * @param {ModalOptions} options applied to the modal
   * @returns {Modal}
   */
  open(componentClass, data, options) {
    let modal = new Modal(this, componentClass, data, options);

    this._stack.push(modal);

    if (this._stack.length === 1) {
      this._onFirstModalAdded();
    }

    return modal;
  }

  _destroyModals() {
    for (let modal of this._stack) {
      modal._destroy();
    }
  }

  _onFirstModalAdded() {
    document.body.classList.add('epm-scrolling-disabled');
  }

  _onLastModalRemoved() {
    document.body.classList.remove('epm-scrolling-disabled');
  }

  _onModalAnimationStart() {
    document.body.classList.add('epm-animating');
  }

  _onModalAnimationEnd() {
    document.body.classList.remove('epm-animating');
  }
}
