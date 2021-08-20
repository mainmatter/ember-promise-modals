'use strict';



;define("dummy/app", ["exports", "@ember/application", "ember-load-initializers", "dummy/config/environment", "dummy/resolver"], function (_exports, _application, _emberLoadInitializers, _environment, _resolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var App = _application.default.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("dummy/components/epm-modal-container", ["exports", "ember-promise-modals/components/modal-container"], function (_exports, _modalContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _modalContainer.default;
    }
  });
});
;define("dummy/components/epm-modal", ["exports", "ember-promise-modals/components/modal"], function (_exports, _modal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _modal.default;
    }
  });
});
;define("dummy/components/modal1", ["exports", "@ember/component", "@ember/service"], function (_exports, _component, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _component.default.extend({
    tagName: '',
    modals: (0, _service.inject)(),
    actions: {
      showModal2: function showModal2() {
        this.modals.open('modal2');
      }
    }
  });

  _exports.default = _default;
});
;define("dummy/controllers/application", ["exports", "@ember/controller", "@ember/service"], function (_exports, _controller, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _controller.default.extend({
    modals: (0, _service.inject)(),
    actions: {
      showModal: function showModal() {
        this.modals.open('modal1');
      },
      showModalFromTop: function showModalFromTop() {
        this.modals.open('modal1', null, {
          className: 'from-top'
        });
      },
      showModalFromBottom: function showModalFromBottom() {
        this.modals.open('modal1', null, {
          className: 'from-bottom'
        });
      }
    }
  });

  _exports.default = _default;
});
;define("dummy/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',
    initialize: function initialize() {
      var app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
  _exports.default = _default;
});
;define("dummy/initializers/export-application-global", ["exports", "ember", "dummy/config/environment"], function (_exports, _ember, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember.default.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("dummy/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("dummy/router", ["exports", "@ember/routing/router", "dummy/config/environment"], function (_exports, _router, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var Router = _router.default.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  }); // eslint-disable-next-line array-callback-return


  Router.map(function () {});
  var _default = Router;
  _exports.default = _default;
});
;define("dummy/services/modals", ["exports", "ember-promise-modals/services/modals"], function (_exports, _modals) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _modals.default;
    }
  });
});
;define("dummy/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "/Jw4OcLb",
    "block": "[[[10,\"header\"],[12],[1,\"\\n  \"],[10,\"h1\"],[12],[1,\"\\n    \"],[10,3],[14,6,\"https://github.com/simplabs/ember-promise-modals\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,\"src\",\"./ember-promise-modals-logo.svg\"],[14,\"alt\",\"ember-promise-modals\"],[14,\"width\",\"600\"],[14,\"height\",\"400\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"main\"],[12],[1,\"\\n  \"],[10,2],[12],[1,\"\\n    Code for the demonstrations shown here can be found in the \"],[10,3],[14,6,\"https://github.com/simplabs/ember-promise-modals/tree/master/tests/dummy\"],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,\"dummy application of the addon\"],[13],[1,\".\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"box box-blue\"],[12],[1,\"\\n    \"],[10,2],[12],[1,\"\\n      \"],[11,\"button\"],[24,\"data-test-show-modal\",\"\"],[24,4,\"button\"],[4,[38,0],[[30,0],\"showModal\"],null],[12],[1,\"A simple modal with a button to close it \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"Examples for custom animations\"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"box box-green\"],[12],[1,\"\\n    \"],[10,2],[12],[1,\"\\n      \"],[11,\"button\"],[24,\"data-test-show-modal\",\"\"],[24,4,\"button\"],[4,[38,0],[[30,0],\"showModalFromBottom\"],null],[12],[1,\"From and to the bottom of the window\"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,2],[12],[1,\"\\n      \"],[11,\"button\"],[24,\"data-test-show-modal\",\"\"],[24,4,\"button\"],[4,[38,0],[[30,0],\"showModalFromTop\"],null],[12],[1,\"From and to the top of the window\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"See the \"],[10,3],[14,6,\"https://github.com/simplabs/ember-promise-modals#readme\"],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,\"README on GitHub\"],[13],[1,\" for setup & further instructions.\"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"box box-placeholder\"],[12],[1,\"\\n    \"],[10,2],[12],[1,\"\\n      \"],[10,\"small\"],[12],[1,\"\\n        Left blank to see \"],[10,\"br\"],[12],[13],[1,\"how scrolling is handled.\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"ember-promise-modals is \"],[10,\"br\"],[12],[13],[1,\"made & sponsored with ❤️ by \"],[10,3],[14,6,\"https://simplabs.com\"],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,\"simplabs\"],[13],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"footer\"],[12],[1,\"\\n  \"],[10,2],[12],[1,\"\\n    \"],[10,\"small\"],[12],[1,\"ember-promise-modals is not an official part of Ember.js and is not maintained by the Ember.js Core Team.\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,1],null,null,null]],[],false,[\"action\",\"epm-modal-container\"]]",
    "moduleName": "dummy/templates/application.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/components/modal1", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "qCRFp+R3",
    "block": "[[[10,0],[14,0,\"modal modal1\"],[12],[1,\"\\n  \"],[10,\"header\"],[12],[1,\"\\n    \"],[11,\"button\"],[24,4,\"button\"],[4,[38,0],[[30,0],[30,1]],null],[12],[1,\"Close\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"h2\"],[12],[1,\"Modal 1\"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"\\n    Sociis per justo neque pulvinar orci sagittis tristique tincidunt suspendisse cum est, rhoncus euismod velit interdum condimentum aenean sed hendrerit arcu venenatis, rutrum commodo elementum eros ac at non ullamcorper pellentesque turpis. Tincidunt consequat purus quam ante aliquam mattis scelerisque viverra suspendisse, tellus convallis mollis ornare primis penatibus montes dapibus sagittis fringilla, magna feugiat conubia luctus posuere suscipit praesent quis. Interdum a iaculis aliquet inceptos vulputate torquent dapibus, ultricies nisl congue leo molestie eu rutrum lectus, ac non pretium magna ad primis. Cursus dui tempus iaculis nostra habitant quis platea hendrerit, purus augue massa elementum dapibus morbi ridiculus, magna convallis pretium ac tincidunt inceptos cum.\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"\\n    \"],[11,\"button\"],[24,\"data-test-show-modal-2\",\"\"],[24,4,\"button\"],[4,[38,0],[[30,0],\"showModal2\"],null],[12],[1,\"Open another modal\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"\\n    Sociis per justo neque pulvinar orci sagittis tristique tincidunt suspendisse cum est, rhoncus euismod velit interdum condimentum aenean sed hendrerit arcu venenatis, rutrum commodo elementum eros ac at non ullamcorper pellentesque turpis. Tincidunt consequat purus quam ante aliquam mattis scelerisque viverra suspendisse, tellus convallis mollis ornare primis penatibus montes dapibus sagittis fringilla, magna feugiat conubia luctus posuere suscipit praesent quis. Interdum a iaculis aliquet inceptos vulputate torquent dapibus, ultricies nisl congue leo molestie eu rutrum lectus, ac non pretium magna ad primis. Cursus dui tempus iaculis nostra habitant quis platea hendrerit, purus augue massa elementum dapibus morbi ridiculus, magna convallis pretium ac tincidunt inceptos cum.\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"\\n    Sociis per justo neque pulvinar orci sagittis tristique tincidunt suspendisse cum est, rhoncus euismod velit interdum condimentum aenean sed hendrerit arcu venenatis, rutrum commodo elementum eros ac at non ullamcorper pellentesque turpis. Tincidunt consequat purus quam ante aliquam mattis scelerisque viverra suspendisse, tellus convallis mollis ornare primis penatibus montes dapibus sagittis fringilla, magna feugiat conubia luctus posuere suscipit praesent quis. Interdum a iaculis aliquet inceptos vulputate torquent dapibus, ultricies nisl congue leo molestie eu rutrum lectus, ac non pretium magna ad primis. Cursus dui tempus iaculis nostra habitant quis platea hendrerit, purus augue massa elementum dapibus morbi ridiculus, magna convallis pretium ac tincidunt inceptos cum.\\n  \"],[13],[1,\"\\n\"],[13]],[\"@close\"],false,[\"action\"]]",
    "moduleName": "dummy/templates/components/modal1.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;define("dummy/templates/components/modal2", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = (0, _templateFactory.createTemplateFactory)({
    "id": "DmWpvezG",
    "block": "[[[10,0],[14,0,\"modal modal2\"],[12],[1,\"\\n  \"],[10,\"header\"],[12],[1,\"\\n    \"],[11,\"button\"],[24,4,\"button\"],[4,[38,0],[[30,0],[30,1]],null],[12],[1,\"Close\"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"h2\"],[12],[1,\"Modal 2\"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"\\n    Sociis per justo neque pulvinar orci sagittis tristique tincidunt suspendisse cum est, rhoncus euismod velit interdum condimentum aenean sed hendrerit arcu venenatis, rutrum commodo elementum eros ac at non ullamcorper pellentesque turpis. Tincidunt consequat purus quam ante aliquam mattis scelerisque viverra suspendisse, tellus convallis mollis ornare primis penatibus montes dapibus sagittis fringilla, magna feugiat conubia luctus posuere suscipit praesent quis. Interdum a iaculis aliquet inceptos vulputate torquent dapibus, ultricies nisl congue leo molestie eu rutrum lectus, ac non pretium magna ad primis. Cursus dui tempus iaculis nostra habitant quis platea hendrerit, purus augue massa elementum dapibus morbi ridiculus, magna convallis pretium ac tincidunt inceptos cum.\\n  \"],[13],[1,\"\\n\"],[13]],[\"@close\"],false,[\"action\"]]",
    "moduleName": "dummy/templates/components/modal2.hbs",
    "isStrictMode": false
  });

  _exports.default = _default;
});
;

;define('dummy/config/environment', [], function() {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("dummy/app")["default"].create({});
          }
        
//# sourceMappingURL=dummy.map
