// eslint-disable-next-line ember/no-computed-properties-in-native-classes
import EmberObject, { computed, set } from '@ember/object';
import { alias, notEmpty } from '@ember/object/computed';
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
export default EmberObject.extend({
  _service: null,
  _name: null,
  _data: null,
  _options: null,
  _result: undefined,
  _deferred: null,
  _deferredOutAnimation: undefined,
  _componentInstance: undefined,

  init() {
    this._super(...arguments);
    this.set('_deferred', defer());
  },

  data: alias('_data'),
  name: alias('_name'),
  result: alias('_result'),
  service: alias('_service'),
  isClosing: notEmpty('_deferredOutAnimation'),

  options: computed('_options', {
    get() {
      return this._options;
    },
    set(key, value) {
      let options = { className: '', onAnimationModalOutEnd: undefined, ...(this._options ?? {}), ...(value ?? {}) };
      this.set('_options', options);
      return options;
    },
  }),

  close(result) {
    if (this._componentInstance) {
      this._componentInstance.closeModal(result);
    }
  },

  then(onFulfilled, onRejected) {
    return this._deferred.promise.then(onFulfilled, onRejected);
  },

  _resolve(result) {
    if (!this._deferredOutAnimation) {
      set(this, '_deferredOutAnimation', defer());
      if (this._options.onAnimationModalOutEnd) {
        this._deferredOutAnimation.promise.then(() => this._options.onAnimationModalOutEnd()).catch(() => {});
      }

      this.set('_result', result);
      this._deferred.resolve(result);

      waitForPromise(this._deferredOutAnimation.promise);
    }
  },

  _remove() {
    this._service._stack.removeObject(this);

    if (this._service._stack.length === 0) {
      this._service._onLastModalRemoved();
    }

    this._componentInstance = undefined;

    if (this._deferredOutAnimation) {
      this._deferredOutAnimation.resolve();
    }
  },
});
