'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RawTransactions = function () {
  function RawTransactions(config, baseURL) {
    _classCallCheck(this, RawTransactions);

    this.config = config;
    this.baseURL = baseURL;
  }

  _createClass(RawTransactions, [{
    key: 'decodeRawTransaction',
    value: function decodeRawTransaction(hex) {
      // decodes a serialized transaction hex string into a JSON object describing the transaction.

      // Parameter #1—serialized transaction in hex

      // Result—the decoded transaction

      return _axios2.default.get(this.baseURL + 'rawtransactions/decodeRawTransaction/' + hex).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: 'decodeScript',
    value: function decodeScript(hex) {
      // decodes a hex-encoded P2SH redeem script.

      // Parameter #1—a hex-encoded redeem script

      // Result—the decoded script
      // console.log('decode script called *****', redeemScript)

      return _axios2.default.get(this.baseURL + 'rawtransactions/decodeScript/' + hex).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: 'getRawTransaction',
    value: function getRawTransaction(txid) {
      var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // NOTE: By default this function only works for mempool transactions. If the -txindex option is
      // enabled, it also works for blockchain transactions.
      // DEPRECATED: for now, it also works for transactions with unspent outputs.
      //
      // Return the raw transaction data.
      //
      // If verbose is 'true', returns an Object with information about 'txid'.
      // If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.
      //
      // Arguments:
      // 1. "txid"      (string, required) The transaction id
      // 2. verbose       (bool, optional, default=false) If false, return a string, otherwise return a json object
      //
      // Result (if verbose is not set or set to false):
      // "data"      (string) The serialized, hex-encoded data for 'txid'

      return _axios2.default.get(this.baseURL + 'rawtransactions/getRawTransaction/' + txid + '?verbose=' + verbose).then(function (response) {
        return response.data;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: 'sendRawTransaction',
    value: function sendRawTransaction(hex) {
      var allowhighfees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // Submits raw transaction (serialized, hex-encoded) to local node and network.
      //
      // Also see createrawtransaction and signrawtransaction calls.
      //
      // Arguments:
      // 1. "hexstring"    (string, required) The hex string of the raw transaction)
      // 2. allowhighfees    (boolean, optional, default=false) Allow high fees
      //
      // Result:
      // "hex"             (string) The transaction hash in hex
      //

      return _axios2.default.post(this.baseURL + 'rawtransactions/sendRawTransaction/' + hex + '?allowhighfees=' + allowhighfees).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }]);

  return RawTransactions;
}();

exports.default = RawTransactions;
