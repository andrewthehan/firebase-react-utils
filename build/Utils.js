"use strict";

require("core-js/modules/es.array.find-index");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnyNull = isAnyNull;
exports.useIsMounted = useIsMounted;

var _react = require("react");

function isAnyNull() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.findIndex(function (x) {
    return x == null;
  }) !== -1;
}

function useIsMounted() {
  var isMounted = (0, _react.useRef)(true);
  (0, _react.useEffect)(function () {
    isMounted.current = true;
    return function () {
      isMounted.current = false;
    };
  }, []);
  return isMounted.current;
}