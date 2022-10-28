"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.onUserChange = onUserChange;
exports.getCurrentUser = getCurrentUser;
exports.signInAnonymously = signInAnonymously;
exports.signInWithGoogle = signInWithGoogle;
exports.signOut = signOut;

require("regenerator-runtime/runtime");

var _app = require("firebase/app");

var _auth = require("firebase/auth");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initialize(firebaseConfig) {
  return (0, _app.initializeApp)(firebaseConfig);
}

function onUserChange(callback) {
  return (0, _auth.onAuthStateChanged)((0, _auth.getAuth)(), callback);
}

function getCurrentUser() {
  return (0, _auth.getAuth)().currentUser;
}

function signInAnonymously() {
  return _signInAnonymously.apply(this, arguments);
}

function _signInAnonymously() {
  _signInAnonymously = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _auth.signInAnonymously)((0, _auth.getAuth)());

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _signInAnonymously.apply(this, arguments);
}

function signInWithGoogle() {
  return _signInWithGoogle.apply(this, arguments);
}

function _signInWithGoogle() {
  _signInWithGoogle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var provider;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            provider = new _auth.GoogleAuthProvider();
            _context2.next = 3;
            return (0, _auth.signInWithPopup)((0, _auth.getAuth)(), provider);

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _signInWithGoogle.apply(this, arguments);
}

function signOut() {
  return _signOut.apply(this, arguments);
}

function _signOut() {
  _signOut = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _auth.signOut)((0, _auth.getAuth)());

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _signOut.apply(this, arguments);
}