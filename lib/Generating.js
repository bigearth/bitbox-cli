"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generating = function () {
  function Generating(config, BitboxHTTP) {
    _classCallCheck(this, Generating);

    this.config = config;
    this.BitboxHTTP = BitboxHTTP;
  }

  _createClass(Generating, [{
    key: "generate",
    value: function generate(blocks, maxtries) {
      // Mine up to nblocks blocks immediately (before the RPC call returns)
      //
      // Arguments:
      // 1. nblocks      (numeric, required) How many blocks are generated immediately.
      // 2. maxtries     (numeric, optional) How many iterations to try (default = 1000000).

      var params = void 0;
      if (!maxtries) {
        params = [blocks];
      } else {
        params = [blocks, maxtries];
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "generate",
          method: "generate",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: "generateToAddress",
    value: function generateToAddress(blocks, address, maxtries) {

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
      var params = void 0;
      if (!maxtries) {
        params = [blocks, address];
      } else {
        params = [blocks, address, maxtries];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "generatetoaddress",
          method: "generatetoaddress",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }]);

  return Generating;
}();

exports.default = Generating;