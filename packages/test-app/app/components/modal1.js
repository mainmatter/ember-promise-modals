import Component from '@ember/component';
import { inject as service } from '@ember/service';

import layout from '../templates/components/modal1';
import Modal2 from './modal2';

export default Component.extend({
  layout,
  tagName: '',
  modals: service(),

  actions: {
    showModal2() {
      this.modals.open(Modal2);
    },
  },
});
