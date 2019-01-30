"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RawTransactions = function () {
  function RawTransactions(restURL) {
    _classCallCheck(this, RawTransactions);

    this.restURL = restURL;
  }

  _createClass(RawTransactions, [{
    key: "decodeRawTransaction",
    value: async function decodeRawTransaction(hex) {
      try {
        // Single hex
        if (typeof hex === "string") {
          var response = await _axios2.default.get(this.restURL + "rawtransactions/decodeRawTransaction/" + hex);

          return response.data;

          // Array of hexes
        } else if (Array.isArray(hex)) {
          var options = {
            method: "POST",
            url: this.restURL + "rawtransactions/decodeRawTransaction",
            data: {
              hexes: hex
            }
          };
          var _response = await (0, _axios2.default)(options);

          return _response.data;
        }

        throw new Error("Input must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "decodeScript",
    value: async function decodeScript(script) {
      if (typeof script !== "string") script = JSON.stringify(script);

      try {
        var response = await _axios2.default.get(this.restURL + "rawtransactions/decodeScript/" + script);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getRawTransaction",
    value: async function getRawTransaction(txid) {
      var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      try {
        if (typeof txid === "string") {
          var response = await _axios2.default.get(this.restURL + "rawtransactions/getRawTransaction/" + txid + "?verbose=" + verbose);

          return response.data;
        } else if (Array.isArray(txid)) {
          var options = {
            method: "POST",
            url: this.restURL + "rawtransactions/getRawTransaction",
            data: {
              txids: txid,
              verbose: verbose
            }
          };
          var _response2 = await (0, _axios2.default)(options);

          return _response2.data;
        }

        throw new Error("Input must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "sendRawTransaction",
    value: async function sendRawTransaction(hex) {
      var allowhighfees = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      //if (typeof hex !== "string") hex = JSON.stringify(hex)

      try {
        var response = await _axios2.default.post(this.restURL + "rawtransactions/sendRawTransaction", {
          hexes: [hex]
        });

        if (response.data === "66: insufficient priority") {
          console.warn("WARN: Insufficient Priority! This is likely due to a fee that is too low, or insufficient funds.\n          Please ensure that there is BCH in the given wallet. If you are running on the testnet, get some\n          BCH from the testnet faucet at https://developer.bitcoin.com/faucets/bch");
        }

        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }]);

  return RawTransactions;
}();

exports.default = RawTransactions;