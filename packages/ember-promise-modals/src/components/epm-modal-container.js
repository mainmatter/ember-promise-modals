import * as emberService from '@ember/service';

import { importSync, macroCondition, getOwnConfig } from '@embroider/macros';
import Component from '@glimmer/component';

// The stylesheet is imported from JS. In non-production builds ember-auto-import (style-loader) turns that into an
// inline <style> element, which a strict CSP (`style-src` without 'unsafe-inline') blocks. Apps can opt out and ship
// the file themselves, see README ("Serving the stylesheet yourself (strict CSP)").
if (macroCondition(!getOwnConfig()?.skipCssImport)) {
  importSync('./epm-modal-container.css');
}

const service = emberService.service ?? emberService.inject;

export default class EpmModalContainer extends Component {
  @service modals;
}
