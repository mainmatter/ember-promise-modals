import { setComponentTemplate } from '@ember/component';

import Component from '@glimmer/component';
import { hbs } from 'ember-cli-htmlbars';

export function mockModalComponent(template = hbs`<button type="button" {{on "click" (fn @close undefined)}} data-test-modal-button>foo</button>`) {
  /* eslint-disable-next-line ember/no-empty-glimmer-component-classes */
  class Modal extends Component {}
  setComponentTemplate(template, Modal);

  return Modal;
}
