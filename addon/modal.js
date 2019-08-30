export default class Modal {
  constructor(service, name, data) {
    this._service = service;
    this._name = name;
    this._data = data;
    this._result = undefined;
  }

  get result() {
    return this._result;
  }

  close(result) {
    this._result = result;

    this._service._stack.removeObject(this);

    if (this._service._stack.length === 0) {
      this._service._onLastModalRemoved();
    }
  }
}
