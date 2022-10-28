"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLocalFunctionEmulator = useLocalFunctionEmulator;
exports.callCloudFunction = callCloudFunction;

var _functions = require("firebase/functions");

function useLocalFunctionEmulator() {
  (0, _functions.getFunctions)().useFunctionsEmulator("http://localhost:5001");
}

function callCloudFunction(name, args) {
  return (0, _functions.httpsCallable)((0, _functions.getFunctions)(), name)(args);
}