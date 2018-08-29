'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
  function Util(restURL) {
    _classCallCheck(this, Util);

    this.restURL = restURL;
  }

  _createClass(Util, [{
    key: 'validateAddress',
    value: async function validateAddress(address) {
      try {
        var response = await _axios2.default.get(this.restURL + 'util/validateAddress/' + address);
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }]);

  return Util;
}();

exports.default = Util;