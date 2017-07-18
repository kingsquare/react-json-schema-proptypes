'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaSymbol = exports.ajv = exports.fake = exports.Schema = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getComponentSchema = getComponentSchema;

exports.default = function (mainSchema) {
  if ((typeof mainSchema === 'undefined' ? 'undefined' : _typeof(mainSchema)) !== 'object') {
    throw new TypeError('Schema must be of type \'object\'');
  }

  for (var _len = arguments.length, otherSchemas = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherSchemas[_key - 1] = arguments[_key];
  }

  var schema = _merge2.default.apply(undefined, [{}, getSchema(mainSchema)].concat(_toConsumableArray(otherSchemas.map(getSchema))));

  if (schema.type !== 'object') {
    throw new Error('Schema must define an object type (currently: ' + schema.type + ')');
  }

  var propTypes = _defineProperty({}, SchemaSymbol, schema);

  if (schema.properties) {
    (function () {
      var validate = _ajvEx2.default.compile(schema);

      for (var prop in schema.properties) {
        if (schema.properties.hasOwnProperty(prop)) {
          propTypes[prop] = function (props, propName, componentName) {
            var valid = validate(props);
            if (valid) return null;

            var propError = validate.errors.find(function (e) {
              return new RegExp('^.' + propName + '(.|$)').test(e.dataPath);
            });
            if (!propError) return null;

            return new Error('\'' + propError.dataPath + '\' ' + propError.message + ', found ' + JSON.stringify(props[propName]) + ' instead. Check propTypes of component ' + componentName);
          };
        }
      }
    })();
  }

  return propTypes;
};

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _ajvEx = require('./ajvEx');

var _ajvEx2 = _interopRequireDefault(_ajvEx);

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

var _schemas = require('./schemas');

var _Schema = _interopRequireWildcard(_schemas);

var _fake2 = require('./fake');

var _fake3 = _interopRequireDefault(_fake2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.Schema = _Schema;
exports.fake = _fake3.default;
exports.ajv = _ajvEx2.default;
var SchemaSymbol = exports.SchemaSymbol = Symbol.for('react-json-schema-proptypes');

function name(component) {
  return component.name || component.displayName;
}

function getSchema(schema) {
  return schema[SchemaSymbol] || schema;
}

function getComponentSchema(component) {
  if (typeof component.propTypes === 'undefined') throw new Error('Component ' + name(component) + ' has no propTypes.');

  if (typeof component.propTypes[SchemaSymbol] === 'undefined') throw new Error('Component ' + name(component) + ' has no JSON Schema propType definition.');

  return (0, _util2.default)(component.propTypes[SchemaSymbol]);
}