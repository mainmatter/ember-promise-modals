import { waitForPromise } from '@ember/test-waiters';

import { defer } from 'rsvp';

export default class Modal {
  constructor(service, name, data, options = {}) {
    this._service = service;
    this._name = name;
    this._data = data;
    this._options = options;
    this._result = undefined;
    this._deferred = defer();
    this._deferredOutAnimation = defer();
    this._componentInstance = undefined;
  }

  get result() {
    return this._result;
  }

  close(result) {
    if (this._componentInstance) {
      this._componentInstance.closeModal(result);
    }
  }

  then(onFulfilled, onRejected) {
    return this._deferred.promise.then(onFulfilled, onRejected);
  }

  _resolve(result) {
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
    this._deferredOutAnimation.resolve();
  }
}
