import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: '',
  modals: service(),

  actions: {
    showModal2() {
      this.modals.open('modal2');
    },
  },
});
