'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generating = function () {
  function Generating(restURL) {
    _classCallCheck(this, Generating);

    this.restURL = restURL;
  }

  _createClass(Generating, [{
    key: 'generateToAddress',
    value: async function generateToAddress(blocks, address) {
      var maxtries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000000;


      // Mine blocks immediately to a specified address (before the RPC call returns)
      //
      // Arguments:
      // 1. nblocks      (numeric, required) How many blocks are generated immediately.
      // 2. address      (string, required) The address to send the newly generated bitcoin to.
      // 3. maxtries     (numeric, optional) How many iterations to try (default = 1000000).
      //
      // Result:
      // [ blockhashes ]     (array) hashes of blocks generated
      //
      try {
        var response = await _axios2.default.post(this.restURL + 'generating/generateToAddress/' + blocks + '/' + address + '?maxtries=' + maxtries);
        return response.data;
      } catch (error) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }]);

  return Generating;
}();

exports.default = Generating;