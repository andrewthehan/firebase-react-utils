"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDatabase = getDatabase;
exports.isValid = isValid;
exports.checkIsValid = checkIsValid;
exports.isDoc = isDoc;
exports.checkIsDoc = checkIsDoc;
exports.checkIsCollection = checkIsCollection;
exports.getRef = getRef;
exports.registerListener = registerListener;
exports.exists = exists;
exports.getDoc = getDoc;
exports.addDoc = addDoc;
exports.setDoc = setDoc;
exports.updateDoc = updateDoc;
exports.deleteDoc = deleteDoc;
exports.runTransaction = runTransaction;
exports.onDisconnect = onDisconnect;

require("regenerator-runtime/runtime");

var _Utils = require("../Utils");

var _firestore = require("firebase/firestore");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDatabase(app) {
  return (0, _firestore.getFirestore)(app);
}

function isValid(ids) {
  return ids != null && !(0, _Utils.isAnyNull)(ids);
}

function checkIsValid(ids) {
  if (!isValid(ids)) {
    throw new Error("Invalid ids: ".concat(ids));
  }
}

function isDoc(ids) {
  return ids.length % 2 === 0;
}

function checkIsDoc(ids) {
  if (!isDoc(ids)) {
    throw new Error("Tried to find a doc with an invalid id path: ".concat(ids));
  }
}

function checkIsCollection(ids) {
  if (isDoc(ids)) {
    throw new Error("Tried to find a collection with an invalid id path: ".concat(ids));
  }
}

function getRef(database, ids) {
  checkIsValid(ids);
  return ids.reduce(function (ref, id, i) {
    return i % 2 === 0 ? ref.collection(id) : ref.doc(id);
  }, database);
}

function registerListener(database, ids, callback) {
  return getRef(database, ids).onSnapshot(isDoc(ids) ? function (d) {
    return callback(_objectSpread({
      id: d.id
    }, d.data()));
  } : function (c) {
    return callback(c.docs.map(function (d) {
      return _objectSpread({
        id: d.id
      }, d.data());
    }));
  });
}

function exists(_x, _x2) {
  return _exists.apply(this, arguments);
}

function _exists() {
  _exists = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(database, ids) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getDoc(database, ids);

          case 2:
            return _context.abrupt("return", _context.sent.exists);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _exists.apply(this, arguments);
}

function getDoc(_x3, _x4) {
  return _getDoc.apply(this, arguments);
}

function _getDoc() {
  _getDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(database, ids) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            checkIsDoc(ids);
            _context2.next = 3;
            return getRef(database, ids).get();

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getDoc.apply(this, arguments);
}

function addDoc(_x5, _x6, _x7) {
  return _addDoc.apply(this, arguments);
}

function _addDoc() {
  _addDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(database, ids, data) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            checkIsCollection(ids);
            _context3.next = 3;
            return getRef(database, ids).add(data);

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _addDoc.apply(this, arguments);
}

function setDoc(_x8, _x9, _x10) {
  return _setDoc.apply(this, arguments);
}

function _setDoc() {
  _setDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(database, ids, data) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            checkIsDoc(ids);
            _context4.next = 3;
            return getRef(database, ids).set(data);

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _setDoc.apply(this, arguments);
}

function updateDoc(_x11, _x12, _x13) {
  return _updateDoc.apply(this, arguments);
}

function _updateDoc() {
  _updateDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(database, ids, data) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            checkIsDoc(ids);
            _context5.next = 3;
            return getRef(database, ids).update(data);

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateDoc.apply(this, arguments);
}

function deleteDoc(_x14, _x15) {
  return _deleteDoc.apply(this, arguments);
}

function _deleteDoc() {
  _deleteDoc = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(database, ids) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            checkIsDoc(ids);
            _context6.next = 3;
            return getRef(database, ids)["delete"]();

          case 3:
            return _context6.abrupt("return", _context6.sent);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _deleteDoc.apply(this, arguments);
}

function runTransaction(_x16, _x17, _x18) {
  return _runTransaction.apply(this, arguments);
}

function _runTransaction() {
  _runTransaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(database, ids, updateFunction) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            checkIsDoc(ids);
            _context8.next = 3;
            return database.runTransaction( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(t) {
                var ref, doc, updates;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        ref = getRef(database, ids);
                        _context7.next = 3;
                        return t.get(ref);

                      case 3:
                        doc = _context7.sent.data();
                        updates = updateFunction(doc);
                        t.update(ref, updates);

                      case 6:
                      case "end":
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));

              return function (_x22) {
                return _ref.apply(this, arguments);
              };
            }());

          case 3:
            return _context8.abrupt("return", _context8.sent);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _runTransaction.apply(this, arguments);
}

function onDisconnect(_x19, _x20, _x21) {
  return _onDisconnect.apply(this, arguments);
}

function _onDisconnect() {
  _onDisconnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(database, ids, data) {
    var ref, disconnectRef;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            checkIsDoc(ids);
            ref = getRef(database, ids);
            disconnectRef = ref.onDisconnect();
            _context9.next = 5;
            return disconnectRef.update(data);

          case 5:
            return _context9.abrupt("return", disconnectRef);

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _onDisconnect.apply(this, arguments);
}