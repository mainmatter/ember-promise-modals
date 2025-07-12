import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import './epm-modal-container.css';

export default class EpmModalContainer extends Component {
  @service modals;
}
