import { inject as service } from '@ember/service';

import Component from '@glimmer/component';

import './epm-modal-container.css';

export default class EpmModalContainerComponent extends Component {
  @service modals;
}
