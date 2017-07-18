'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajv = (0, _ajv2.default)({
  errorDataPath: 'property', // restore pre v2.0 behavior
  unknownFormats: 'ignore' // restore pre v5.0 behavior
});

function safeEscapeQuotes(str) {
  return str.replace(/\\([\s\S])|(')/g, "\\$1$2").replace(/\\([\s\S])|(")/g, "\\$1$2"); // escape only if not escaped already
}

ajv.addKeyword('deprecated', { inline: function inline(it, keyword, schema) {
    var op = schema ? 'console && console.warn && console.warn(\'Property "' + it.schemaPath.replace(/^\.properties\./, '') + '" was deprecated on: ' + schema.deprecatedOn + '. Recommended alternative is: "' + safeEscapeQuotes(schema.description) + '".\')' : '';
    return op + ' || 1';
  } });

ajv.addKeyword('isReactElement', { compile: function compile() {
    return React.isValidElement;
  } });

ajv.addKeyword('isFunction', { compile: function compile() {
    return _isFunction2.default;
  } });

exports.default = ajv;