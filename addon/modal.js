import { defer } from 'rsvp';

export default class Modal {
  constructor(service, name, data, options = {}) {
    this._service = service;
    this._name = name;
    this._data = data;
    this._options = options;
    this._result = undefined;
    this._deferred = defer();
  }

  get result() {
    return this._result;
  }

  resolve(result) {
    this._result = result;
    this._deferred.resolve(result);
  }

  close() {
    this._service._stack.removeObject(this);

    if (this._service._stack.length === 0) {
      this._service._onLastModalRemoved();
    }
  }

  then(onFulfilled, onRejected) {
    return this._deferred.promise.then(onFulfilled, onRejected);
  }
}
