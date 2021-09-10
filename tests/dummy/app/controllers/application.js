import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

import Modal1 from '../components/modal1';

export default Controller.extend({
  modals: service(),

  actions: {
    showModal() {
      this.modals.open(Modal1);
    },

    showModalFromTop() {
      this.modals.open(Modal1, null, {
        className: 'from-top',
      });
    },

    showModalFromBottom() {
      this.modals.open(Modal1, null, {
        className: 'from-bottom',
      });
    },
  },
});
