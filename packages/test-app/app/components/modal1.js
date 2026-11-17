import { action } from '@ember/object';
import * as emberService from '@ember/service';

import Component from '@glimmer/component';

import Modal2 from './modal2';

const service = emberService.service ?? emberService.inject;

export default class Modal1 extends Component {
  @service modals;

  @action
  showModal2() {
    this.modals.open(Modal2);
  }
}
