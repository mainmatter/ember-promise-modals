import Component from '@ember/component';
import { inject as service } from '@ember/service';

import './epm-modal-container.css';

export default Component.extend({
  tagName: '',

  modals: service(),
});
