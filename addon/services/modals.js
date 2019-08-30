import { A } from '@ember/array';
import { alias } from '@ember/object/computed';
import Service from '@ember/service';

import Modal from '../modal';

export default Service.extend({
  count: alias('_stack.length'),
  top: alias('_stack.lastObject'),

  init() {
    this._super(...arguments);
    this._stack = A([]);
  },

  open(name, data) {
    let modal = new Modal(this, name, data);
    this._stack.pushObject(modal);
    return modal;
  },
});
