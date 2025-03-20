import Component from '@ember/glimmer';
import { inject as service } from '@ember/service';

import './epm-modal-container.css';

export default class EpmModalContainerComponent extends Component {
  @service modals;
}
