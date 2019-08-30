import { A } from '@ember/array';
import { alias } from '@ember/object/computed';
import Service from '@ember/service';

import { easeOut, easeIn } from 'ember-animated/easings/cosine';
import move from 'ember-animated/motions/move';
import fade from 'ember-animated/transitions/fade';

import Modal from '../modal';

const ESCAPE_KEY = 27;

export default Service.extend({
  count: alias('_stack.length'),
  top: alias('_stack.lastObject'),

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
    this._onKeyDown = this._onKeyDown.bind(this);
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
    document.addEventListener('keydown', this._onKeyDown);
  },

  _onLastModalRemoved() {
    document.body.classList.remove('epm-scrolling-disabled');
    document.removeEventListener('keydown', this._onKeyDown);
  },

  _onKeyDown(event) {
    let { top } = this;

    if (top && event.which === ESCAPE_KEY) {
      event.preventDefault();
      top.close();
    }
  },
});
