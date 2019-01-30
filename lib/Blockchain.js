"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       TODO
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       - Add blockhash functionality back into getTxOutProof
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blockchain = function () {
  function Blockchain(restURL) {
    _classCallCheck(this, Blockchain);

    this.restURL = restURL;
  }

  _createClass(Blockchain, [{
    key: "getBestBlockHash",
    value: async function getBestBlockHash() {
      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getBestBlockHash");
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getBlock",
    value: async function getBlock(blockhash) {
      var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getBlock/" + blockhash + "?verbose=" + verbose);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getBlockchainInfo",
    value: async function getBlockchainInfo() {
      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getBlockchainInfo");
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getBlockCount",
    value: async function getBlockCount() {
      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getBlockCount");
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getBlockHash",
    value: async function getBlockHash() {
      var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (typeof height !== "string") height = JSON.stringify(height);

      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getBlockHash/" + height);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getBlockHeader",
    value: async function getBlockHeader(hash) {
      var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      try {
        // Handle single hash.
        if (typeof hash === "string") {
          var response = await _axios2.default.get(this.restURL + "blockchain/getBlockHeader/" + hash + "?verbose=" + verbose);

          return response.data;

          // Handle array of hashes.
        } else if (Array.isArray(hash)) {
          var options = {
            method: "POST",
            url: this.restURL + "blockchain/getBlockHeader",
            data: {
              hashes: hash,
              verbose: verbose
            }
          };
          var _response = await (0, _axios2.default)(options);

          return _response.data;
        }

        throw new Error("Input hash must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getChainTips",
    value: async function getChainTips() {
      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getChainTips");
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getDifficulty",
    value: async function getDifficulty() {
      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getDifficulty");
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getMempoolAncestors",
    value: async function getMempoolAncestors(txid) {
      var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (typeof txid !== "string") txid = JSON.stringify(txid);

      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getMempoolAncestors/" + txid + "?verbose=" + verbose);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getMempoolDescendants",
    value: async function getMempoolDescendants(txid) {
      var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (typeof txid !== "string") txid = JSON.stringify(txid);

      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getMempoolDescendants/" + txid + "?verbose=" + verbose);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getMempoolEntry",
    value: async function getMempoolEntry(txid) {
      //if (typeof txid !== "string") txid = JSON.stringify(txid)

      try {
        if (typeof txid === "string") {
          var response = await _axios2.default.get(this.restURL + "blockchain/getMempoolEntry/" + txid);

          return response.data;
        } else if (Array.isArray(txid)) {
          var options = {
            method: "POST",
            url: this.restURL + "blockchain/getMempoolEntry",
            data: {
              txids: txid
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
    key: "getMempoolInfo",
    value: async function getMempoolInfo() {
      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getMempoolInfo");
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getRawMempool",
    value: async function getRawMempool() {
      var verbose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getRawMempool?vebose=" + verbose);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getTxOut",
    value: async function getTxOut(txid, n) {
      var include_mempool = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/getTxOut/" + txid + "/n?include_mempool=" + include_mempool);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "getTxOutProof",
    value: async function getTxOutProof(txids) {
      try {
        // Single txid.
        if (typeof txids === "string") {
          var path = this.restURL + "blockchain/getTxOutProof/" + txids;
          //if (blockhash) path = `${path}?blockhash=${blockhash}`

          var response = await _axios2.default.get(path);
          return response.data;

          // Array of txids.
        } else if (Array.isArray(txids)) {
          var options = {
            method: "POST",
            url: this.restURL + "blockchain/getTxOutProof",
            data: {
              txids: txids
            }
          };
          var _response3 = await (0, _axios2.default)(options);

          return _response3.data;
        }

        throw new Error("Input must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "preciousBlock",
    value: async function preciousBlock(blockhash) {
      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/preciousBlock/" + blockhash);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "pruneBlockchain",
    value: async function pruneBlockchain(height) {
      try {
        var response = await _axios2.default.post(this.restURL + "blockchain/pruneBlockchain/" + height);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "verifyChain",
    value: async function verifyChain() {
      var checklevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      var nblocks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;

      try {
        var response = await _axios2.default.get(this.restURL + "blockchain/verifyChain?checklevel=" + checklevel + "&nblocks=" + nblocks);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "verifyTxOutProof",
    value: async function verifyTxOutProof(proof) {
      try {
        // Single block
        if (typeof proof === "string") {
          var response = await _axios2.default.get(this.restURL + "blockchain/verifyTxOutProof/" + proof);
          return response.data;

          // Array of hashes.
        } else if (Array.isArray(proof)) {
          var options = {
            method: "POST",
            url: this.restURL + "blockchain/verifyTxOutProof",
            data: {
              proofs: proof
            }
          };
          var _response4 = await (0, _axios2.default)(options);

          return _response4.data;
        }

        throw new Error("Input must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }]);

  return Blockchain;
}();

exports.default = Blockchain;