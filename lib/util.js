'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omitDeprecated;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function omitDeprecated(obj, isProperty) {
  var picked = {};
  Object.keys(obj).forEach(function (key) {
    if (isProperty) {
      // if we're inside 'properties', walk deeper only if the property is not deprecated
      if (!(0, _isPlainObject2.default)(obj[key].deprecated)) picked[key] = omitDeprecated(obj[key]);
    } else {
      if (key !== 'properties') {
        picked[key] = obj[key]; // shortcircuit non-properties nodes
      } else {
        picked[key] = omitDeprecated(obj[key], true);
      }
    }
  });

  return picked;
}