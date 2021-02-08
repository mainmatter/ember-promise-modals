import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  modals: service(),

  actions: {
    showModal() {
      this.modals.open('modal1');
    },

    showModalFromTop() {
      this.modals.open('modal1', null, {
        className: 'from-top',
      });
    },

    showModalFromBottom() {
      this.modals.open('modal1', null, {
        className: 'from-bottom',
      });
    },
  },
});
