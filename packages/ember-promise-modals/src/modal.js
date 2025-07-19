import { waitForPromise } from '@ember/test-waiters';

import { tracked } from '@glimmer/tracking';
import { defer } from 'rsvp';

/**
 * @typedef {Object} ModalOptions
 * @property {Function} [onAnimationModalOutEnd]
 * @property {String} [className] - CSS class name passed to the modal element
 */

/**
 * @class Modal
 * @param {Service} service
 * @param {String} componentClass
 * @param {any} data
 * @param {ModalOptions} options
 * @method close - closes the modal
 * @method then - resolves when the modal is closed
 */
export default class Modal {
  @tracked _deferredOutAnimation = undefined;

  constructor(service, componentClass, data, options = {}) {
    this._service = service;
    this._componentClass = componentClass;
    this._data = data;
    this._options = {
      className: '',
      onAnimationModalOutEnd: undefined,
      ...options,
    };
    this._result = undefined;
    this._deferred = defer();
    this._componentInstance = undefined;
  }

  get result() {
    return this._result;
  }

  get isClosing() {
    return Boolean(this._deferredOutAnimation);
  }

  close(result) {
    if (this._componentInstance) {
      this._componentInstance.closeModal(result);
    }
  }

  then(onFulfilled, onRejected) {
    return this._deferred.promise.then(onFulfilled, onRejected);
  }

  _destroy() {
    if (!this._componentInstance) {
      return;
    }

    this._componentInstance.destroyModal();
  }

  _resolve(result) {
    if (this._deferredOutAnimation) {
      return;
    }

    this._deferredOutAnimation = defer();
    if (this._options.onAnimationModalOutEnd) {
      this._deferredOutAnimation.promise.then(() => this._options.onAnimationModalOutEnd()).catch(() => {});
    }

    this._result = result;
    this._deferred.resolve(result);

    waitForPromise(this._deferredOutAnimation.promise);
  }

  _remove() {
    const index = this._service._stack.indexOf(this);
    if (index !== -1) {
      this._service._stack.splice(index, 1);
    }

    if (this._service._stack.length === 0) {
      this._service._onLastModalRemoved();
    }

    this._componentInstance = undefined;

    if (this._deferredOutAnimation) {
      this._deferredOutAnimation.resolve();
    }
  }
}
