'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mining = function () {
  function Mining(restURL) {
    _classCallCheck(this, Mining);

    this.restURL = restURL;
  }

  _createClass(Mining, [{
    key: 'getBlockTemplate',
    value: async function getBlockTemplate(template_request) {

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

      try {
        var response = await _axios2.default.get(this.restURL + 'mining/getBlockTemplate/' + template_request);
        return response.data;
      } catch (error) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'getMiningInfo',
    value: async function getMiningInfo() {
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

      try {
        var response = await _axios2.default.get(this.restURL + 'mining/getMiningInfo');
        return response.data;
      } catch (error) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'getNetworkHashps',
    value: async function getNetworkHashps() {
      var nblocks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 120;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

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
      try {
        var response = await _axios2.default.get(this.restURL + 'mining/getNetworkHashps?nblocks=' + nblocks + '&height=' + height);
        return response.data;
      } catch (error) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }, {
    key: 'submitBlock',
    value: async function submitBlock(hex, parameters) {
      // Attempts to submit new block to network.
      // The 'jsonparametersobject' parameter is currently ignored.
      // See https://en.bitcoin.it/wiki/BIP_0022 for full specification.
      //
      // Arguments
      // 1. "hex"        (string, required) the hex-encoded block data to submit
      // 2. "parameters"     (string, optional) object of optional parameters
      //     {
      //       "workid" : "id"    (string, optional) if the server provided a workid, it MUST be included with submissions
      //     }
      //
      var path = this.restURL + 'mining/submitBlock/' + hex;
      if (parameters) {
        path = path + '?parameters=' + parameters;
      }
      try {
        var response = await _axios2.default.post(path);
        return response.data;
      } catch (error) {
        return JSON.stringify(error.response.data.error.message);
      }
    }
  }]);

  return Mining;
}();

exports.default = Mining;