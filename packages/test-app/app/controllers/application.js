import Controller from '@ember/controller';
import { action } from '@ember/object';
import * as emberService from '@ember/service';

import Modal1 from '../components/modal1';

const service = emberService.service ?? emberService.inject;

export default class ApplicationController extends Controller {
  @service modals;

  @action
  showModal() {
    this.modals
      .open(Modal1)
      .then(result => {
        this.result = result;
      })
      .catch(() => {});
  }

  @action
  showModalFromTop() {
    this.modals.open(Modal1, null, {
      className: 'from-top',
    });
  }

  @action
  showModalFromBottom() {
    this.modals.open(Modal1, null, {
      className: 'from-bottom',
    });
  }
}
