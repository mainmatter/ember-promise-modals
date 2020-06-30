import { A } from '@ember/array';
import { alias } from '@ember/object/computed';
import Service from '@ember/service';

import { easeOut, easeIn } from 'ember-animated/easings/cosine';
import move from 'ember-animated/motions/move';
import fade from 'ember-animated/transitions/fade';

import Modal from '../modal';

export default Service.extend({
  count: alias('_stack.length'),
  top: alias('_stack.lastObject'),

  clickOutsideDeactivates: true,

  backdropDuration: 600,
  backdropTransition: fade,

  modalsDuration: 250,
  *modalsTransition({ insertedSprites, keptSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ y: -window.innerHeight });
      move(sprite, { easing: easeOut });
    });

    keptSprites.forEach(sprite => {
      move(sprite);
    });

    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ y: -window.innerHeight });
      move(sprite, { easing: easeIn });
    });
  },

  init() {
    this._super(...arguments);
    this._stack = A([]);
  },

  willDestroy() {
    this._onLastModalRemoved();
  },

  open(name, data) {
    let modal = new Modal(this, name, data);
    this._stack.pushObject(modal);

    if (this._stack.length === 1) {
      this._onFirstModalAdded();
    }

    return modal;
  },

  _onFirstModalAdded() {
    document.body.classList.add('epm-scrolling-disabled');
  },

  _onLastModalRemoved() {
    document.body.classList.remove('epm-scrolling-disabled');
  },
});
