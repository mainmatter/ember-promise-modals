import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class OpenModalHelper extends Helper {
  @service modals;

  modal = null;
  show = false;

  compute([modalComponent, data], { show, close }) {
    show = Boolean(show ?? true);

    if (show !== this.show) {
      this.show = show;

      if (show) {
        this.showModal(modalComponent, data, close);
      } else {
        this.hideModal();
      }
    }
  }

  async showModal(modalComponent, data, close) {
    this.modal = this.modals.open(modalComponent, data);

    let success = await this.modal;

    this.modal = null;

    if (close) {
      close(success);
    }
  }

  hideModal() {
    this.modal?.close();
  }

  willDestroy() {
    this.hideModal();
    super.willDestroy(...arguments);
  }
}
