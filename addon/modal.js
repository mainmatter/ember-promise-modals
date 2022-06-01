// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import { computed, set } from '@ember/object';
import { waitForPromise } from '@ember/test-waiters';

import { defer } from 'rsvp';

/**
 * @typedef {Object} ModalOptions
 * @property {Function} [onAnimationModalOutEnd]
 * @property {String} [className] - CSS class name passed to the modal element
 */

/**
 * @class Modal
 * @param {Service} service
 * @param {String} name
 * @param {any} data
 * @param {ModalOptions} options
 * @method close - closes the modal
 * @method then - resolves when the modal is closed
 */
export default class Modal {
  constructor(service, name, data, options = {}) {
    this._service = service;
    this._name = name;
    this._data = data;
    this._options = {
      className: '',
      onAnimationModalOutEnd: undefined,
      onAnimationModalInEnd: undefined,
      ...options,
    };
    this._result = undefined;
    this._deferred = defer();
    this._deferredOutAnimation = undefined;
    this._componentInstance = undefined;
  }

  get result() {
    return this._result;
  }

  onAnimationModalInEnd() {
    if (!this._options.onAnimationModalInEnd) {
      return;
    }

    return this._options.onAnimationModalInEnd(...arguments);
  }

  @computed('_deferredOutAnimation')
  get isClosing() {
    return Boolean(this._deferredOutAnimation);
  }

  close(result) {
    if (!this._componentInstance) {
      return;
    }

    this._componentInstance.closeModal(result);
  }

  destroy() {
    if (!this._componentInstance) {
      return;
    }

    this._componentInstance.destroyModal();
  }

  then(onFulfilled, onRejected) {
    return this._deferred.promise.then(onFulfilled, onRejected);
  }

  _resolve(result) {
    if (this._deferredOutAnimation) {
      return;
    }

    set(this, '_deferredOutAnimation', defer());

    if (this._options.onAnimationModalOutEnd) {
      this._deferredOutAnimation.promise.then(() => this._options.onAnimationModalOutEnd()).catch(() => {});
    }

    this._result = result;
    this._deferred.resolve(result);

    waitForPromise(this._deferredOutAnimation.promise);
  }

  _remove() {
    this._service._stack.removeObject(this);

    if (this._service._stack.length === 0) {
      this._service._onLastModalRemoved();
    }

    this._componentInstance = undefined;

    if (this._deferredOutAnimation) {
      this._deferredOutAnimation.resolve();
    }
  }
}
