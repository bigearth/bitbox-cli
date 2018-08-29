'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function () {
  function Control(restURL) {
    _classCallCheck(this, Control);

    this.restURL = restURL;
  }

  _createClass(Control, [{
    key: 'getInfo',
    value: async function getInfo() {
      try {
        var response = await _axios2.default.get(this.restURL + 'control/getInfo');
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
  }, {
    key: 'getMemoryInfo',
    value: async function getMemoryInfo() {
      try {
        var response = await _axios2.default.get(this.restURL + 'control/getMemoryInfo');
        return response.data;
      } catch (error) {
        throw error.response.data;
      }
    }
    //
    // stop() {
    //   // Stop Bitcoin Cash server.
    //   return axios.post(`${this.restURL}control/stop`)
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     return JSON.stringify(error.response.data.error.message);
    //   });
    // }

  }]);

  return Control;
}();

exports.default = Control;