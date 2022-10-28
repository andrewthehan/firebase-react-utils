"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utils = exports.Hooks = exports.Firebase = exports.RealtimeStore = exports.RealtimeHooks = exports.FunctionsUtil = exports.FirestoreStore = exports.FirestoreHooks = void 0;

var _FirestoreHooks = _interopRequireWildcard(require("./firestore/FirestoreHooks"));

exports.FirestoreHooks = _FirestoreHooks;

var _FirestoreStore = _interopRequireWildcard(require("./firestore/FirestoreStore"));

exports.FirestoreStore = _FirestoreStore;

var _FunctionsUtil = _interopRequireWildcard(require("./functions/FunctionsUtil"));

exports.FunctionsUtil = _FunctionsUtil;

var _RealtimeHooks = _interopRequireWildcard(require("./realtime/RealtimeHooks"));

exports.RealtimeHooks = _RealtimeHooks;

var _RealtimeStore = _interopRequireWildcard(require("./realtime/RealtimeStore"));

exports.RealtimeStore = _RealtimeStore;

var _Firebase = _interopRequireWildcard(require("./Firebase"));

exports.Firebase = _Firebase;

var _Hooks = _interopRequireWildcard(require("./Hooks"));

exports.Hooks = _Hooks;

var _Utils = _interopRequireWildcard(require("./Utils"));

exports.Utils = _Utils;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }