"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDatabase = getDatabase;
exports.isValid = isValid;
exports.checkIsValid = checkIsValid;
exports.getRef = getRef;
exports.registerListener = registerListener;
exports.exists = exists;
exports.getData = getData;
exports.addData = addData;
exports.setData = setData;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.transaction = transaction;
exports.updateOnDisconnect = updateOnDisconnect;

require("regenerator-runtime/runtime");

var _Utils = require("../Utils");

var _database = require("firebase/database");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getDatabase(app) {
  return (0, _database.getDatabase)(app);
}

function isValid(ids) {
  return ids != null && !_Utils.isAnyNull.apply(void 0, _toConsumableArray(ids));
}

function checkIsValid(ids) {
  if (!isValid(ids)) {
    throw new Error("Invalid ids: ".concat(ids));
  }
}

function getRef(database, ids) {
  checkIsValid(ids);
  return (0, _database.ref)(database, ids.join("/"));
}

function registerListener(database, ids, callback) {
  var ref = getRef(database, ids);

  var f = function f(snapshot) {
    return callback(snapshot.val());
  };

  return (0, _database.onValue)(ref, f);
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
            return (0, _database.get)(getRef(database, ids));

          case 2:
            return _context.abrupt("return", _context.sent.exists());

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _exists.apply(this, arguments);
}

function getData(_x3, _x4) {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(database, ids) {
    var snapshot;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _database.get)(getRef(database, ids));

          case 2:
            snapshot = _context2.sent;
            return _context2.abrupt("return", snapshot.val());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getData.apply(this, arguments);
}

function addData(_x5, _x6, _x7) {
  return _addData.apply(this, arguments);
}

function _addData() {
  _addData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(database, ids, data) {
    var ref;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getRef(database, ids).push(data);

          case 2:
            ref = _context3.sent;
            return _context3.abrupt("return", ref.key);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _addData.apply(this, arguments);
}

function setData(_x8, _x9, _x10) {
  return _setData.apply(this, arguments);
}

function _setData() {
  _setData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(database, ids, data) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getRef(database, ids).set(data);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _setData.apply(this, arguments);
}

function updateData(_x11, _x12, _x13) {
  return _updateData.apply(this, arguments);
}

function _updateData() {
  _updateData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(database, ids, data) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getRef(database, ids).update(data);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _updateData.apply(this, arguments);
}

function deleteData(_x14, _x15) {
  return _deleteData.apply(this, arguments);
}

function _deleteData() {
  _deleteData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(database, ids) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getRef(database, ids).remove();

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _deleteData.apply(this, arguments);
}

function transaction(_x16, _x17, _x18) {
  return _transaction.apply(this, arguments);
}

function _transaction() {
  _transaction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(database, ids, updateFunction) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return getRef(database, ids).transaction(updateFunction);

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _transaction.apply(this, arguments);
}

function updateOnDisconnect(_x19, _x20, _x21) {
  return _updateOnDisconnect.apply(this, arguments);
}

function _updateOnDisconnect() {
  _updateOnDisconnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(database, ids, data) {
    var ref, disconnectRef;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            ref = getRef(database, ids);
            disconnectRef = ref.onDisconnect();
            _context8.next = 4;
            return disconnectRef.update(data);

          case 4:
            return _context8.abrupt("return", disconnectRef);

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _updateOnDisconnect.apply(this, arguments);
}