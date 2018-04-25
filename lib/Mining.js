"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mining = function () {
  function Mining(config, BitboxHTTP) {
    _classCallCheck(this, Mining);

    this.config = config;
    this.BitboxHTTP = BitboxHTTP;
  }

  _createClass(Mining, [{
    key: "getBlockTemplate",
    value: function getBlockTemplate(template_request) {

      // If the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'.
      // It returns data needed to construct a block to work on.
      // For full specification, see BIPs 22, 23, 9, and 145:
      //     https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki
      //     https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki
      //     https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes
      //     https://github.com/bitcoin/bips/blob/master/bip-0145.mediawiki
      //
      // Arguments:
      // 1. template_request         (json object, optional) A json object in the following spec
      //      {
      //        "mode":"template"    (string, optional) This must be set to "template", "proposal" (see BIP 23), or omitted
      //        "capabilities":[     (array, optional) A list of strings
      //            "support"          (string) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
      //            ,...
      //        ],
      //        "rules":[            (array, optional) A list of strings
      //            "support"          (string) client side supported softfork deployment
      //            ,...
      //        ]
      //      }

      var params = void 0;
      if (!template_request) {
        params = [];
      } else {
        params = [template_request];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getblocktemplate",
          method: "getblocktemplate",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: "getMiningInfo",
    value: function getMiningInfo() {
      // Returns a json object containing mining-related information.
      // Result:
      // {
      //   "blocks": nnn,             (numeric) The current block
      //   "currentblocksize": nnn,   (numeric) The last block size
      //   "currentblocktx": nnn,     (numeric) The last block transaction
      //   "difficulty": xxx.xxxxx    (numeric) The current difficulty
      //   "errors": "..."            (string) Current errors
      //   "networkhashps": nnn,      (numeric) The network hashes per second
      //   "pooledtx": n              (numeric) The size of the mempool
      //   "chain": "xxxx",           (string) current network name as defined in BIP70 (main, test, regtest)
      // }


      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getmininginfo",
          method: "getmininginfo",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: "getNetworkHashps",
    value: function getNetworkHashps(nblocks, height) {
      // Returns the estimated network hashes per second based on the last n blocks.
      // Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change.
      // Pass in [height] to estimate the network speed at the time when a certain block was found.
      //
      // Arguments:
      // 1. nblocks     (numeric, optional, default=120) The number of blocks, or -1 for blocks since last difficulty change.
      // 2. height      (numeric, optional, default=-1) To estimate at the time of the given height.
      //
      // Result:
      // x             (numeric) Hashes per second estimated

      var params = [];
      if (nblocks) {
        params.push(nblocks);
      } else {
        params.push(0);
      }

      if (height) {
        params.push(height);
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getnetworkhashps",
          method: "getnetworkhashps",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: "prioritiseTransaction",
    value: function prioritiseTransaction(txid, priority_delta, fee_delta) {
      // Accepts the transaction into mined blocks at a higher (or lower) priority
      //
      // Arguments:
      // 1. "txid"       (string, required) The transaction id.
      // 2. priority_delta (numeric, required) The priority to add or subtract.
      //                   The transaction selection algorithm considers the tx as it would have a higher priority.
      //                   (priority of a transaction is calculated: coinage * value_in_satoshis / txsize)
      // 3. fee_delta      (numeric, required) The fee value (in satoshis) to add (or subtract, if negative).
      //                   The fee is not actually paid, only the algorithm for selecting transactions into a block
      //                   considers the transaction as it would have paid a higher (or lower) fee.
      //
      // Result:
      // true              (boolean) Returns true

      var params = [];
      if (txid) {
        params.push(txid);
      }

      if (priority_delta) {
        params.push(priority_delta);
      }

      if (fee_delta) {
        params.push(fee_delta);
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "prioritisetransaction",
          method: "prioritisetransaction",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: "submitBlock",
    value: function submitBlock(hexdata, parameters) {
      // Attempts to submit new block to network.
      // The 'jsonparametersobject' parameter is currently ignored.
      // See https://en.bitcoin.it/wiki/BIP_0022 for full specification.
      //
      // Arguments
      // 1. "hexdata"        (string, required) the hex-encoded block data to submit
      // 2. "parameters"     (string, optional) object of optional parameters
      //     {
      //       "workid" : "id"    (string, optional) if the server provided a workid, it MUST be included with submissions
      //     }
      //
      var params = [];
      if (hexdata) {
        params.push(hexdata);
      }

      if (parameters) {
        params.push(parameters);
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "submitblock",
          method: "submitblock",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }]);

  return Mining;
}();

exports.default = Mining;