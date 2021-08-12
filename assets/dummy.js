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
;define("dummy/components/modal1", ["exports", "@ember/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _component.default.extend({
    tagName: ''
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
    "id": "YmZ6hj36",
    "block": "[[[10,\"h1\"],[12],[1,\"ember-promise-modals\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Lorem ipsum dolor sit amet consectetur adipiscing elit tempus iaculis, nunc ridiculus pretium donec justo tempor nulla felis nec, est class libero suscipit duis ut erat eget. Orci ultricies at faucibus accumsan pulvinar dictum, quisque ridiculus dictumst fermentum dui per vivamus, volutpat imperdiet justo taciti sed. Praesent facilisis hac nostra suspendisse volutpat ultrices aliquet vestibulum molestie diam aenean justo, dignissim semper etiam rutrum elementum metus ullamcorper per parturient venenatis orci, phasellus class ac mollis et sagittis varius ridiculus porta vehicula fermentum. Class lacus penatibus nam ornare eleifend etiam parturient posuere ut taciti, euismod ultricies diam purus risus blandit platea netus ac, pharetra integer sed est facilisis nibh venenatis aliquam maecenas.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Turpis placerat faucibus et primis phasellus metus cursus ac pretium, pharetra class feugiat dignissim vulputate magnis nullam. Mollis sodales tempus lacinia montes hac ante viverra, fusce laoreet libero urna integer quam cras, nascetur facilisis vivamus turpis habitasse consequat. Cursus pretium vitae tristique eget sed mauris cras vivamus, tincidunt himenaeos aliquam mi est felis tempus, curabitur dictumst taciti et suspendisse varius euismod.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Laoreet tincidunt blandit tempor viverra dui volutpat natoque, ut vestibulum mauris posuere arcu ante sociosqu nostra, habitant dapibus torquent litora id porttitor. Nec faucibus rhoncus vestibulum ultricies augue imperdiet, accumsan sem penatibus parturient curabitur, hendrerit hac auctor eros natoque. Lacinia placerat eu suscipit curae cubilia potenti sociosqu, iaculis quis per augue vulputate risus sed, nunc netus habitasse vel mollis mauris.\\n\"],[13],[1,\"\\n\\n\"],[11,\"button\"],[24,\"data-test-show-modal\",\"\"],[24,4,\"button\"],[4,[38,0],[[30,0],\"showModal\"],null],[12],[1,\"Show Modal default\"],[13],[1,\"\\n\\n\"],[11,\"button\"],[24,\"data-test-show-modal\",\"\"],[24,4,\"button\"],[4,[38,0],[[30,0],\"showModalFromBottom\"],null],[12],[1,\"Show Modal from bottom\"],[13],[1,\"\\n\\n\"],[11,\"button\"],[24,\"data-test-show-modal\",\"\"],[24,4,\"button\"],[4,[38,0],[[30,0],\"showModalFromTop\"],null],[12],[1,\"Show Modal from top\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Aenean nostra egestas in eu nunc consequat praesent scelerisque vivamus, mattis curabitur luctus pharetra curae vestibulum phasellus class, natoque dis proin aptent blandit condimentum mi vel. Sapien non integer nulla quam mauris turpis nisl erat, himenaeos inceptos cum aliquam congue consequat donec malesuada, orci a viverra montes cursus posuere nisi, penatibus suscipit magna potenti nostra semper scelerisque. Eu sodales magna accumsan ante lobortis mauris, sollicitudin luctus class aliquam facilisi vulputate, fusce phasellus cubilia porttitor mus.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Consequat libero lobortis primis platea mus, potenti nunc quam urna senectus pretium, suscipit sociosqu pharetra magna. Magnis platea senectus taciti lectus imperdiet volutpat metus nec enim interdum facilisi, mi faucibus laoreet tristique conubia pulvinar dictumst luctus natoque. Nisl arcu blandit phasellus pharetra sagittis facilisis, nascetur at habitant tempus suspendisse, dis morbi fusce euismod litora.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Id suspendisse volutpat tortor proin varius senectus mus per laoreet cubilia mattis cras, fermentum velit eros orci tristique elementum quisque morbi fringilla eu. Rhoncus lacus viverra arcu praesent lectus, ridiculus nunc interdum primis est eget, massa senectus mus suscipit. Torquent fermentum taciti massa mauris eros iaculis primis condimentum suspendisse mi odio, nascetur aptent hac habitant eleifend consequat convallis etiam blandit penatibus praesent semper, vitae rutrum ante varius montes augue scelerisque eu mattis purus.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Tincidunt quisque nulla mauris semper nisi etiam, nascetur habitasse felis a eu pulvinar fringilla, hendrerit blandit morbi ad condimentum. Maecenas erat facilisis arcu per non auctor proin phasellus, tempus diam nulla placerat hac aliquam suspendisse dignissim, dui vulputate a ultricies dictum convallis tempor.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Ut justo leo et sapien lobortis magna senectus, vehicula semper tempus vivamus rhoncus id sociis, habitasse quis arcu viverra curabitur platea, ante velit montes taciti eros vel. Fringilla auctor est aliquam facilisi magnis senectus dictum, diam elementum molestie taciti eleifend sollicitudin pulvinar varius, sapien magna laoreet metus venenatis sociosqu. Libero aliquam magnis volutpat risus semper curabitur sociosqu auctor natoque, lacinia ultricies non justo magna imperdiet at. Platea mi habitant nibh turpis fames sociis, donec non malesuada hac habitasse, aliquam est suspendisse ut cum.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Parturient suscipit blandit nisl nam turpis aenean, velit commodo pellentesque erat mus tempor, mollis neque ridiculus dictumst nostra. Nec potenti augue vulputate nascetur quisque ac proin aptent quis, nibh sociosqu ante rhoncus sodales accumsan primis congue, per interdum morbi in ornare habitant semper vestibulum. Pellentesque imperdiet dis nunc molestie congue blandit at, netus etiam pharetra montes tincidunt venenatis interdum taciti, magna tempor tempus sociis mauris ligula.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Sociis per justo neque pulvinar orci sagittis tristique tincidunt suspendisse cum est, rhoncus euismod velit interdum condimentum aenean sed hendrerit arcu venenatis, rutrum commodo elementum eros ac at non ullamcorper pellentesque turpis. Tincidunt consequat purus quam ante aliquam mattis scelerisque viverra suspendisse, tellus convallis mollis ornare primis penatibus montes dapibus sagittis fringilla, magna feugiat conubia luctus posuere suscipit praesent quis. Interdum a iaculis aliquet inceptos vulputate torquent dapibus, ultricies nisl congue leo molestie eu rutrum lectus, ac non pretium magna ad primis. Cursus dui tempus iaculis nostra habitant quis platea hendrerit, purus augue massa elementum dapibus morbi ridiculus, magna convallis pretium ac tincidunt inceptos cum.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Lorem ipsum dolor sit amet consectetur adipiscing elit tempus iaculis, nunc ridiculus pretium donec justo tempor nulla felis nec, est class libero suscipit duis ut erat eget. Orci ultricies at faucibus accumsan pulvinar dictum, quisque ridiculus dictumst fermentum dui per vivamus, volutpat imperdiet justo taciti sed. Praesent facilisis hac nostra suspendisse volutpat ultrices aliquet vestibulum molestie diam aenean justo, dignissim semper etiam rutrum elementum metus ullamcorper per parturient venenatis orci, phasellus class ac mollis et sagittis varius ridiculus porta vehicula fermentum. Class lacus penatibus nam ornare eleifend etiam parturient posuere ut taciti, euismod ultricies diam purus risus blandit platea netus ac, pharetra integer sed est facilisis nibh venenatis aliquam maecenas.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Turpis placerat faucibus et primis phasellus metus cursus ac pretium, pharetra class feugiat dignissim vulputate magnis nullam. Mollis sodales tempus lacinia montes hac ante viverra, fusce laoreet libero urna integer quam cras, nascetur facilisis vivamus turpis habitasse consequat. Cursus pretium vitae tristique eget sed mauris cras vivamus, tincidunt himenaeos aliquam mi est felis tempus, curabitur dictumst taciti et suspendisse varius euismod.\\n\"],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  Laoreet tincidunt blandit tempor viverra dui volutpat natoque, ut vestibulum mauris posuere arcu ante sociosqu nostra, habitant dapibus torquent litora id porttitor. Nec faucibus rhoncus vestibulum ultricies augue imperdiet, accumsan sem penatibus parturient curabitur, hendrerit hac auctor eros natoque. Lacinia placerat eu suscipit curae cubilia potenti sociosqu, iaculis quis per augue vulputate risus sed, nunc netus habitasse vel mollis mauris.\\n\"],[13],[1,\"\\n\\n\"],[8,[39,1],null,null,null]],[],false,[\"action\",\"epm-modal-container\"]]",
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
    "id": "Nhg8ylxk",
    "block": "[[[10,0],[14,0,\"modal1\"],[12],[1,\"\\n  \"],[11,\"button\"],[24,4,\"button\"],[4,[38,0],[[30,0],[30,1]],null],[12],[1,\"Close\"],[13],[1,\"\\n\\n  \"],[10,\"h2\"],[12],[1,\"Modal 1\"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"\\n    Sociis per justo neque pulvinar orci sagittis tristique tincidunt suspendisse cum est, rhoncus euismod velit interdum condimentum aenean sed hendrerit arcu venenatis, rutrum commodo elementum eros ac at non ullamcorper pellentesque turpis. Tincidunt consequat purus quam ante aliquam mattis scelerisque viverra suspendisse, tellus convallis mollis ornare primis penatibus montes dapibus sagittis fringilla, magna feugiat conubia luctus posuere suscipit praesent quis. Interdum a iaculis aliquet inceptos vulputate torquent dapibus, ultricies nisl congue leo molestie eu rutrum lectus, ac non pretium magna ad primis. Cursus dui tempus iaculis nostra habitant quis platea hendrerit, purus augue massa elementum dapibus morbi ridiculus, magna convallis pretium ac tincidunt inceptos cum.\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"\\n    Sociis per justo neque pulvinar orci sagittis tristique tincidunt suspendisse cum est, rhoncus euismod velit interdum condimentum aenean sed hendrerit arcu venenatis, rutrum commodo elementum eros ac at non ullamcorper pellentesque turpis. Tincidunt consequat purus quam ante aliquam mattis scelerisque viverra suspendisse, tellus convallis mollis ornare primis penatibus montes dapibus sagittis fringilla, magna feugiat conubia luctus posuere suscipit praesent quis. Interdum a iaculis aliquet inceptos vulputate torquent dapibus, ultricies nisl congue leo molestie eu rutrum lectus, ac non pretium magna ad primis. Cursus dui tempus iaculis nostra habitant quis platea hendrerit, purus augue massa elementum dapibus morbi ridiculus, magna convallis pretium ac tincidunt inceptos cum.\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,\"\\n    Sociis per justo neque pulvinar orci sagittis tristique tincidunt suspendisse cum est, rhoncus euismod velit interdum condimentum aenean sed hendrerit arcu venenatis, rutrum commodo elementum eros ac at non ullamcorper pellentesque turpis. Tincidunt consequat purus quam ante aliquam mattis scelerisque viverra suspendisse, tellus convallis mollis ornare primis penatibus montes dapibus sagittis fringilla, magna feugiat conubia luctus posuere suscipit praesent quis. Interdum a iaculis aliquet inceptos vulputate torquent dapibus, ultricies nisl congue leo molestie eu rutrum lectus, ac non pretium magna ad primis. Cursus dui tempus iaculis nostra habitant quis platea hendrerit, purus augue massa elementum dapibus morbi ridiculus, magna convallis pretium ac tincidunt inceptos cum.\\n  \"],[13],[1,\"\\n\"],[13]],[\"@close\"],false,[\"action\"]]",
    "moduleName": "dummy/templates/components/modal1.hbs",
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
