import * as emberService from '@ember/service';

import Component from '@glimmer/component';
import './epm-modal-container.css';

const service = emberService.service ?? emberService.inject;

export default class EpmModalContainer extends Component {
  @service modals;
}
