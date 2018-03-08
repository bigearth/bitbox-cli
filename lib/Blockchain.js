"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blockchain = function () {
  function Blockchain(config, BitboxHTTP) {
    _classCallCheck(this, Blockchain);

    this.config = config;
    this.BitboxHTTP = BitboxHTTP;
  }

  _createClass(Blockchain, [{
    key: "getBestblockHash",
    value: function getBestblockHash() {
      // Returns the hash of the best (tip) block in the longest blockchain.
      //
      // Result:
      // "hex"      (string) the block hash hex encoded

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getbestblockhash",
          method: "getbestblockhash",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getBlock",
    value: function getBlock(blockhash, verbose) {
      // If verbose is false, returns a string that is serialized, hex-encoded data for block 'hash'.
      // If verbose is true, returns an Object with information about block <hash>.
      //
      // Arguments:
      // 1. "blockhash"          (string, required) The block hash
      // 2. verbose                (boolean, optional, default=true) true for a json object, false for the hex encoded data
      //
      // Result (for verbose = true):
      // {
      //   "hash" : "hash",     (string) the block hash (same as provided)
      //   "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
      //   "size" : n,            (numeric) The block size
      //   "height" : n,          (numeric) The block height or index
      //   "version" : n,         (numeric) The block version
      //   "versionHex" : "00000000", (string) The block version formatted in hexadecimal
      //   "merkleroot" : "xxxx", (string) The merkle root
      //   "tx" : [               (array of string) The transaction ids
      //      "transactionid"     (string) The transaction id
      //      ,...
      //   ],
      //   "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
      //   "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
      //   "nonce" : n,           (numeric) The nonce
      //   "bits" : "1d00ffff", (string) The bits
      //   "difficulty" : x.xxx,  (numeric) The difficulty
      //   "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
      //   "previousblockhash" : "hash",  (string) The hash of the previous block
      //   "nextblockhash" : "hash"       (string) The hash of the next block
      // }
      //
      // Result (for verbose=false):
      // "data"             (string) A string that is serialized, hex-encoded data for block 'hash'.
      var params = void 0;
      if (!verbose) {
        params = [blockhash];
      } else {
        params = [blockhash, verbose];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getblock",
          method: "getblock",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getBlockchainInfo",
    value: function getBlockchainInfo() {
      // Returns an object containing various state info regarding blockchain processing.
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getblockchaininfo",
          method: "getblockchaininfo",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getBlockCount",
    value: function getBlockCount() {
      // Returns the number of blocks in the longest blockchain.
      //
      // Result:
      // n    (numeric) The current block count

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getblockcount",
          method: "getblockcount",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getBlockHash",
    value: function getBlockHash(height) {
      // Returns hash of block in best-block-chain at height provided.
      //
      // Arguments:
      // 1. height         (numeric, required) The height index
      //
      // Result:
      // "hash"         (string) The block hash
      var params = [];
      if (height) {
        params.push(height);
      } else {
        params.push(0);
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getblockhash",
          method: "getblockhash",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getBlockHeader",
    value: function getBlockHeader(hash, verbose) {

      // If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'.
      // If verbose is true, returns an Object with information about blockheader <hash>.
      //
      // Arguments:
      // 1. "hash"          (string, required) The block hash
      // 2. verbose           (boolean, optional, default=true) true for a json object, false for the hex encoded data
      //
      // Result (for verbose = true):
      // {
      //   "hash" : "hash",     (string) the block hash (same as provided)
      //   "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
      //   "height" : n,          (numeric) The block height or index
      //   "version" : n,         (numeric) The block version
      //   "versionHex" : "00000000", (string) The block version formatted in hexadecimal
      //   "merkleroot" : "xxxx", (string) The merkle root
      //   "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
      //   "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
      //   "nonce" : n,           (numeric) The nonce
      //   "bits" : "1d00ffff", (string) The bits
      //   "difficulty" : x.xxx,  (numeric) The difficulty
      //   "chainwork" : "0000...1f3"     (string) Expected number of hashes required to produce the current chain (in hex)
      //   "previousblockhash" : "hash",  (string) The hash of the previous block
      //   "nextblockhash" : "hash",      (string) The hash of the next block
      // }
      //
      // Result (for verbose=false):
      // "data"             (string) A string that is serialized, hex-encoded data for block 'hash'.
      var params = void 0;
      if (!verbose) {
        params = [hash];
      } else {
        params = [hash, verbose];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getblockheader",
          method: "getblockheader",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getChainTips",
    value: function getChainTips() {

      // Return information about all known tips in the block tree, including the main chain as well as orphaned branches.
      //
      // Result:
      // [
      //   {
      //     "height": xxxx,         (numeric) height of the chain tip
      //     "hash": "xxxx",         (string) block hash of the tip
      //     "branchlen": 0          (numeric) zero for main chain
      //     "status": "active"      (string) "active" for the main chain
      //   },
      //   {
      //     "height": xxxx,
      //     "hash": "xxxx",
      //     "branchlen": 1          (numeric) length of branch connecting the tip to the main chain
      //     "status": "xxxx"        (string) status of the chain (active, valid-fork, valid-headers, headers-only, invalid)
      //   }
      // ]
      // Possible values for status:
      // 1.  "invalid"               This branch contains at least one invalid block
      // 2.  "headers-only"          Not all blocks for this branch are available, but the headers are valid
      // 3.  "valid-headers"         All blocks are available for this branch, but they were never fully validated
      // 4.  "valid-fork"            This branch is not part of the active chain, but is fully validated
      // 5.  "active"                This is the tip of the active main chain, which is certainly valid

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getchaintips",
          method: "getchaintips",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getDifficulty",
    value: function getDifficulty() {

      // Returns the proof-of-work difficulty as a multiple of the minimum difficulty.
      //
      // Result:
      // n.nnn       (numeric) the proof-of-work difficulty as a multiple of the minimum difficulty.

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getdifficulty",
          method: "getdifficulty",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getMempoolAncestors",
    value: function getMempoolAncestors(txid, verbose) {
      // If txid is in the mempool, returns all in-mempool ancestors.
      //
      // Arguments:
      // 1. "txid"                 (string, required) The transaction id (must be in mempool)
      // 2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids
      //
      // Result (for verbose=false):
      // [                       (json array of strings)
      //   "transactionid"           (string) The transaction id of an in-mempool ancestor transaction
      //   ,...
      // ]
      //
      // Result (for verbose=true):
      // {                           (json object)
      //   "transactionid" : {       (json object)
      //     "size" : n,             (numeric) transaction size.
      //     "fee" : n,              (numeric) transaction fee in BCH
      //     "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
      //     "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
      //     "height" : n,           (numeric) block height when transaction entered pool
      //     "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
      //     "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
      //     "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
      //     "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
      //     "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
      //     "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
      //     "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
      //     "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
      //     "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
      //         "transactionid",    (string) parent transaction id
      //        ... ]
      //   }, ...
      // }

      var params = void 0;
      if (!verbose) {
        params = [txid];
      } else {
        params = [txid, verbose];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getmempoolancestors",
          method: "getmempoolancestors",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getMempoolDescendants",
    value: function getMempoolDescendants(txid, verbose) {
      // If txid is in the mempool, returns all in-mempool descendants.
      //
      // Arguments:
      // 1. "txid"                 (string, required) The transaction id (must be in mempool)
      // 2. verbose                  (boolean, optional, default=false) True for a json object, false for array of transaction ids
      //
      // Result (for verbose=false):
      // [                       (json array of strings)
      //   "transactionid"           (string) The transaction id of an in-mempool descendant transaction
      //   ,...
      // ]
      //
      // Result (for verbose=true):
      // {                           (json object)
      //   "transactionid" : {       (json object)
      //     "size" : n,             (numeric) transaction size.
      //     "fee" : n,              (numeric) transaction fee in BCH
      //     "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
      //     "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
      //     "height" : n,           (numeric) block height when transaction entered pool
      //     "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
      //     "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
      //     "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
      //     "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
      //     "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
      //     "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
      //     "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
      //     "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
      //     "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
      //         "transactionid",    (string) parent transaction id
      //        ... ]
      //   }, ...
      // }

      var params = void 0;
      if (!verbose) {
        params = [txid];
      } else {
        params = [txid, verbose];
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getmempooldescendants",
          method: "getmempooldescendants",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getMempoolEntry",
    value: function getMempoolEntry(txid) {
      // Returns mempool data for given transaction
      //
      // Arguments:
      // 1. "txid"                   (string, required) The transaction id (must be in mempool)
      //
      // Result:
      // {                           (json object)
      //     "size" : n,             (numeric) transaction size.
      //     "fee" : n,              (numeric) transaction fee in BCH
      //     "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
      //     "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
      //     "height" : n,           (numeric) block height when transaction entered pool
      //     "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
      //     "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
      //     "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
      //     "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
      //     "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
      //     "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
      //     "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
      //     "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
      //     "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
      //         "transactionid",    (string) parent transaction id
      //        ... ]
      // }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getmempoolentry",
          method: "getmempoolentry",
          params: [txid]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getMempoolInfo",
    value: function getMempoolInfo() {
      // Returns details on the active state of the TX memory pool.
      //
      // Result:
      // {
      //   "size": xxxxx,               (numeric) Current tx count
      //   "bytes": xxxxx,              (numeric) Transaction size.
      //   "usage": xxxxx,              (numeric) Total memory usage for the mempool
      //   "maxmempool": xxxxx,         (numeric) Maximum memory usage for the mempool
      //   "mempoolminfee": xxxxx       (numeric) Minimum fee for tx to be accepted
      // }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getmempoolinfo",
          method: "getmempoolinfo",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getRawMempool",
    value: function getRawMempool(verbose) {
      // Returns all transaction ids in memory pool as a json array of string transaction ids.
      //
      // Arguments:
      // 1. verbose (boolean, optional, default=false) True for a json object, false for array of transaction ids
      //
      // Result: (for verbose = false):
      // [                     (json array of string)
      //   "transactionid"     (string) The transaction id
      //   ,...
      // ]
      //
      // Result: (for verbose = true):
      // {                           (json object)
      //   "transactionid" : {       (json object)
      //     "size" : n,             (numeric) transaction size.
      //     "fee" : n,              (numeric) transaction fee in BCH
      //     "modifiedfee" : n,      (numeric) transaction fee with fee deltas used for mining priority
      //     "time" : n,             (numeric) local time transaction entered pool in seconds since 1 Jan 1970 GMT
      //     "height" : n,           (numeric) block height when transaction entered pool
      //     "startingpriority" : n, (numeric) DEPRECATED. Priority when transaction entered pool
      //     "currentpriority" : n,  (numeric) DEPRECATED. Transaction priority now
      //     "descendantcount" : n,  (numeric) number of in-mempool descendant transactions (including this one)
      //     "descendantsize" : n,   (numeric) virtual transaction size of in-mempool descendants (including this one)
      //     "descendantfees" : n,   (numeric) modified fees (see above) of in-mempool descendants (including this one)
      //     "ancestorcount" : n,    (numeric) number of in-mempool ancestor transactions (including this one)
      //     "ancestorsize" : n,     (numeric) virtual transaction size of in-mempool ancestors (including this one)
      //     "ancestorfees" : n,     (numeric) modified fees (see above) of in-mempool ancestors (including this one)
      //     "depends" : [           (array) unconfirmed transactions used as inputs for this transaction
      //         "transactionid",    (string) parent transaction id
      //        ... ]
      //   }, ...
      // }
      var params = [];
      if (verbose) {
        params.push(verbose);
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getrawmempool",
          method: "getrawmempool",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getTxOut",
    value: function getTxOut(txid, n, include_mempool) {
      // Returns details about an unspent transaction output.
      //
      // Arguments:
      // 1. "txid"       (string, required) The transaction id
      // 2. n              (numeric, required) vout number
      // 3. include_mempool  (boolean, optional) Whether to include the mempool
      //
      // Result:
      // {
      //   "bestblock" : "hash",    (string) the block hash
      //   "confirmations" : n,       (numeric) The number of confirmations
      //   "value" : x.xxx,           (numeric) The transaction value in BCH
      //   "scriptPubKey" : {         (json object)
      //      "asm" : "code",       (string)
      //      "hex" : "hex",        (string)
      //      "reqSigs" : n,          (numeric) Number of required signatures
      //      "type" : "pubkeyhash", (string) The type, eg pubkeyhash
      //      "addresses" : [          (array of string) array of bitcoin addresses
      //         "address"     (string) bitcoin address
      //         ,...
      //      ]
      //   },
      //   "coinbase" : true|false   (boolean) Coinbase or not
      // }
      //
      var params = void 0;
      if (!include_mempool) {
        params = [txid, n];
      } else {
        params = [txid, n, include_mempool];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "gettxout",
          method: "gettxout",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getTxOutProof",
    value: function getTxOutProof(txids, blockhash) {
      // Returns a hex-encoded proof that "txid" was included in a block.
      //
      // NOTE: By default this function only works sometimes. This is when there is an
      // unspent output in the utxo for this transaction. To make it always work,
      // you need to maintain a transaction index, using the -txindex command line option or
      // specify the block in which the transaction is included manually (by blockhash).
      //
      // Arguments:
      // 1. "txids"       (string) A json array of txids to filter
      //     [
      //       "txid"     (string) A transaction hash
      //       ,...
      //     ]
      // 2. "blockhash"   (string, optional) If specified, looks for txid in the block with this hash
      //
      // Result:
      // "data"           (string) A string that is a serialized, hex-encoded data for the proof.
      var params = void 0;
      if (!blockhash) {
        params = [txids];
      } else {
        params = [txids, blockhash];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "gettxoutproof",
          method: "gettxoutproof",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "getTxOutSetInfo",
    value: function getTxOutSetInfo() {
      // Returns statistics about the unspent transaction output set.
      // Note this call may take some time.
      //
      // Result:
      // {
      //   "height":n,     (numeric) The current block height (index)
      //   "bestblock": "hex",   (string) the best block hash hex
      //   "transactions": n,      (numeric) The number of transactions
      //   "txouts": n,            (numeric) The number of output transactions
      //   "bogosize": n,          (numeric) A database-independent metric for UTXO set size
      //   "hash_serialized": "hash",   (string) The serialized hash
      //   "disk_size": n,         (numeric) The estimated size of the chainstate on disk
      //   "total_amount": x.xxx          (numeric) The total amount
      // }
      //

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "gettxoutsetinfo",
          method: "gettxoutsetinfo",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "preciousBlock",
    value: function preciousBlock(blockhash) {
      // Treats a block as if it were received before others with the same work.
      //
      // A later preciousblock call can override the effect of an earlier one.
      //
      // The effects of preciousblock are not retained across restarts.
      //
      // Arguments:
      // 1. "blockhash"   (string, required) the hash of the block to mark as precious

      var params = [];
      if (blockhash) {
        params.push(blockhash);
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "preciousblock",
          method: "preciousblock",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "pruneBlockchain",
    value: function pruneBlockchain(height) {
      // Arguments:
      // 1. "height"       (numeric, required) The block height to prune up to. May be set to a discrete height, or a unix timestamp
      //                   to prune blocks whose block time is at least 2 hours older than the provided timestamp.
      //
      // Result:
      // n    (numeric) Height of the last block pruned.
      var params = [];
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
          id: "pruneblockchain",
          method: "pruneblockchain",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "verifyChain",
    value: function verifyChain(checklevel, nblocks) {
      // Verifies blockchain database.
      //
      // Arguments:
      // 1. checklevel   (numeric, optional, 0-4, default=3) How thorough the block verification is.
      // 2. nblocks      (numeric, optional, default=6, 0=all) The number of blocks to check.
      //
      // Result:
      // true|false       (boolean) Verified or not
      var params = [];
      if (checklevel) {
        params.push(checklevel);
      }

      if (nblocks) {
        params.push(nblocks);
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "verifychain",
          method: "verifychain",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: "verifyTxOutProof",
    value: function verifyTxOutProof(proof) {
      // Verifies that a proof points to a transaction in a block, returning the transaction it commits to
      // and throwing an RPC error if the block is not in our best chain
      //
      // Arguments:
      // 1. "proof"    (string, required) The hex-encoded proof generated by gettxoutproof
      //
      // Result:
      // ["txid"]      (array, strings) The txid(s) which the proof commits to, or empty array if the proof is invalid

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "verifytxoutproof",
          method: "verifytxoutproof",
          params: [proof]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }]);

  return Blockchain;
}();

exports.default = Blockchain;