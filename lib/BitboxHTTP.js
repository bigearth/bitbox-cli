'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitboxHTTP = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BitboxHTTP = exports.BitboxHTTP = _axios2.default.create({
  baseURL: 'http://localhost:8332/'
});