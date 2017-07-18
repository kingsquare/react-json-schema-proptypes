'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var func = exports.func = {
  'isFunction': true,
  'faker': {
    'type': 'function'
  }
};

var element = exports.element = {
  'type': 'object',
  'isReactElement': true,
  'faker': {
    'type': 'element'
  }
};

var node = exports.node = {
  'oneOf': [{
    'type': 'array',
    'items': {
      'oneOf': [{ 'type': 'number' }, { 'type': 'string' }, element]
    }
  }, { 'type': 'number' }, { 'type': 'string' }, element]
};