import { easeIn, easeOut } from 'ember-animated/easings/cosine';
import move from 'ember-animated/motions/move';

import ModalServices from 'ember-promise-modals/services/modals';

export default ModalServices.extend({
  clickOutsideDeactivates: false,

  /*
   * modalsTrasition is a function managing the transition of the DOM element provided (sprite)
   * We override this function from the service in order to provide two
   * differents transition for fullscreenModal and classic modal
   * in order to understand better the role of this function, please
   * refer to the documentation of ember-animated
   *
   **/
  // eslint-disable-next-line require-yield
  *modalsTransition({ insertedSprites, keptSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      if (sprite.owner.value._data.isFullScreenModal) {
        sprite.startAtPixel({ y: window.innerHeight });
      } else {
        sprite.startAtPixel({ y: -window.innerHeight });
      }
      move(sprite, { easing: easeOut });
    });

    keptSprites.forEach(sprite => {
      move(sprite);
    });

    removedSprites.forEach(sprite => {
      if (sprite.owner.value._data.isFullScreenModal) {
        sprite.endAtPixel({ y: window.innerHeight });
      } else {
        sprite.endAtPixel({ y: -window.innerHeight });
      }
      move(sprite, { easing: easeIn });
    });
  },
});
