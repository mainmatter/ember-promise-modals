'use strict';

define("dummy/tests/application/basics-test", ["@ember/test-helpers", "ember-qunit", "qunit", "ember-promise-modals/test-support"], function (_testHelpers, _emberQunit, _qunit, _testSupport) {
  "use strict";

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  (0, _qunit.module)('Application | basics', function (hooks) {
    (0, _emberQunit.setupApplicationTest)(hooks);
    (0, _testSupport.setupPromiseModals)(hooks);
    (0, _qunit.test)('clicking the backdrop closes the modal', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assert) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _testHelpers.visit)('/');

              case 2:
                assert.dom('.epm-backdrop').doesNotExist();
                assert.dom('.epm-modal').doesNotExist();
                _context.next = 6;
                return (0, _testHelpers.click)('[data-test-show-modal]');

              case 6:
                assert.dom('.epm-modal').exists();
                assert.dom('.epm-backdrop').exists(); // we don't have a test waiter on the opening animation, so for this test we wait manually

                _context.next = 10;
                return (0, _testHelpers.waitUntil)(function () {
                  var _window$getComputedSt = window.getComputedStyle(document.querySelector('.epm-backdrop')),
                      opacity = _window$getComputedSt.opacity;

                  return opacity === '1';
                });

              case 10:
                assert.dom('.epm-backdrop').hasStyle({
                  opacity: '1',
                  pointerEvents: 'auto'
                });
                _context.next = 13;
                return (0, _testHelpers.click)('.epm-backdrop');

              case 13:
                assert.dom('.epm-backdrop').exists();
                assert.dom('.epm-backdrop').hasStyle({
                  opacity: '0',
                  pointerEvents: 'none'
                });
                assert.dom('.epm-modal').doesNotExist();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _qunit.test)('clicking the backdrop does not close the modal if `clickOutsideDeactivates` is `false`', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(assert) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.owner.lookup('service:modals').clickOutsideDeactivates = false;
                _context2.next = 3;
                return (0, _testHelpers.visit)('/');

              case 3:
                assert.dom('.epm-backdrop').doesNotExist();
                assert.dom('.epm-modal').doesNotExist();
                _context2.next = 7;
                return (0, _testHelpers.click)('[data-test-show-modal]');

              case 7:
                assert.dom('.epm-backdrop').exists();
                assert.dom('.epm-modal').exists();
                _context2.next = 11;
                return (0, _testHelpers.click)('.epm-backdrop');

              case 11:
                assert.dom('.epm-backdrop').exists();
                assert.dom('.epm-modal').exists();

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _qunit.test)('opening a modal disables scrolling on the <body> element', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(assert) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _testHelpers.visit)('/');

              case 2:
                assert.dom('body', document).hasStyle({
                  overflow: 'visible'
                });
                _context3.next = 5;
                return (0, _testHelpers.click)('[data-test-show-modal]');

              case 5:
                assert.dom('body', document).hasStyle({
                  overflow: 'hidden'
                });
                _context3.next = 8;
                return (0, _testHelpers.click)('.epm-backdrop');

              case 8:
                assert.dom('body', document).hasStyle({
                  overflow: 'visible'
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
    (0, _qunit.test)('pressing the Escape keyboard button closes the modal', /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(assert) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return (0, _testHelpers.visit)('/');

              case 2:
                assert.dom('.epm-modal').doesNotExist();
                _context4.next = 5;
                return (0, _testHelpers.click)('[data-test-show-modal]');

              case 5:
                assert.dom('.epm-modal').exists();
                _context4.next = 8;
                return (0, _testHelpers.triggerKeyEvent)(document, 'keydown', 'Escape');

              case 8:
                assert.dom('.epm-modal').doesNotExist();

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }());
  });
});
define("dummy/tests/integration/components/modal-container-test", ["@ember/template-factory", "@ember/test-helpers", "ember-qunit", "qunit", "@ember/component", "ember-promise-modals/test-support"], function (_templateFactory, _testHelpers, _emberQunit, _qunit, _component, _testSupport) {
  "use strict";

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  (0, _qunit.module)('Component | ModalContainer', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _testSupport.setupPromiseModals)(hooks);
    (0, _qunit.test)('renders the modals for the `modals` service', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assert) {
        var modals, modal;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.owner.register('component:foo', _component.default.extend({
                  tagName: '',
                  layout: (0, _templateFactory.createTemplateFactory)(
                  /*
                    <button type="button">foo</button> {{@data.bar}}
                  */
                  {
                    "id": "tscLCURu",
                    "block": "[[[10,\"button\"],[14,4,\"button\"],[12],[1,\"foo\"],[13],[1,\" \"],[1,[30,1,[\"bar\"]]]],[\"@data\"],false,[]]",
                    "moduleName": "(unknown template module)",
                    "isStrictMode": false
                  })
                }));
                _context.next = 3;
                return (0, _testHelpers.render)((0, _templateFactory.createTemplateFactory)(
                /*
                  <EpmModalContainer />
                */
                {
                  "id": "irVqHm26",
                  "block": "[[[8,[39,0],null,null,null]],[],false,[\"epm-modal-container\"]]",
                  "moduleName": "(unknown template module)",
                  "isStrictMode": false
                }));

              case 3:
                assert.dom('.epm-backdrop').doesNotExist();
                assert.dom('.epm-modal').doesNotExist();
                assert.dom(this.element).hasText('');
                modals = this.owner.lookup('service:modals');
                modal = modals.open('foo', {
                  bar: 'baz'
                });
                _context.next = 10;
                return (0, _testHelpers.settled)();

              case 10:
                assert.dom('.epm-modal').exists({
                  count: 1
                });
                assert.dom('.epm-modal').hasText('foo baz');
                modal.close();
                _context.next = 15;
                return (0, _testHelpers.settled)();

              case 15:
                assert.dom('.epm-modal').doesNotExist();
                assert.dom(this.element).hasText('');

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
});
define("dummy/tests/test-helper", ["@ember/test-helpers", "ember-qunit", "qunit", "qunit-dom", "dummy/app", "dummy/config/environment"], function (_testHelpers, _emberQunit, QUnit, _qunitDom, _app, _environment) {
  "use strict";

  (0, _qunitDom.setup)(QUnit.assert);
  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("dummy/tests/unit/services/modals-test", ["ember-qunit", "qunit"], function (_emberQunit, _qunit) {
  "use strict";

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  (0, _qunit.module)('Service | modals', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('basics', function (assert) {
      var modals = this.owner.lookup('service:modals');
      assert.equal(modals.count, 0, '#count');
      assert.strictEqual(modals.top, undefined, '#top');
      var modal1 = modals.open('modal1', {
        foo: 'bar'
      });
      assert.equal(modals.count, 1, '#count');
      assert.strictEqual(modals.top, modal1, '#top');
      var modal2 = modals.open('modal2');
      assert.equal(modals.count, 2, '#count');
      assert.strictEqual(modals.top, modal2, '#top');

      modal2._remove();

      assert.equal(modals.count, 1, '#count');
      assert.strictEqual(modals.top, modal1, '#top');

      modal1._remove();

      assert.equal(modals.count, 0, '#count');
      assert.strictEqual(modals.top, undefined, '#top');
    });
    (0, _qunit.test)('modals can have results', function (assert) {
      var modals = this.owner.lookup('service:modals');
      var modal = modals.open('modal');
      assert.strictEqual(modal.result, undefined);

      modal._resolve('foo');

      assert.strictEqual(modal.result, 'foo');

      modal._remove();
    });
    (0, _qunit.test)('modals are promises', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(assert) {
        var modals, modal, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                modals = this.owner.lookup('service:modals');
                modal = modals.open('modal'); // eslint-disable-next-line promise/catch-or-return

                modal.then(function () {
                  assert.step('then');
                });
                assert.verifySteps([]);

                modal._resolve('foo');

                _context.next = 7;
                return modal;

              case 7:
                result = _context.sent;
                assert.verifySteps(['then']);
                assert.equal(result, 'foo');

                modal._remove();

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _qunit.test)('modals do not show up in openCount when closing', /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(assert) {
        var modals, modal;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                modals = this.owner.lookup('service:modals');
                modal = modals.open('modal');
                assert.equal(modals.count, 1);

                modal._resolve();

                assert.equal(modals.count, 0);

                modal._remove();

                assert.equal(modals.count, 0);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    (0, _qunit.test)('modals will call the optional onAnimationModalOutEnd hook when it is passed as an option', /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(assert) {
        var modals, modal;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                modals = this.owner.lookup('service:modals');
                modal = modals.open('modal', {}, {
                  onAnimationModalOutEnd: function onAnimationModalOutEnd() {
                    assert.step('animation ended');
                  }
                });
                assert.step('modal open');

                modal._resolve();

                assert.step('modal closing');

                modal._remove();

                assert.step('modal closed'); // we need to wait a tick for the closing animation promise to be resolved

                _context3.next = 9;
                return new Promise(function (resolve) {
                  setTimeout(resolve, 0);
                });

              case 9:
                assert.verifySteps(['modal open', 'modal closing', 'modal closed', 'animation ended']);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
  });
});
define('dummy/config/environment', [], function() {
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

require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
