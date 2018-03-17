'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _BitcoinCash = require('./BitcoinCash');

var _BitcoinCash2 = _interopRequireDefault(_BitcoinCash);

var _Crypto = require('./Crypto');

var _Crypto2 = _interopRequireDefault(_Crypto);

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _Blockchain = require('./Blockchain');

var _Blockchain2 = _interopRequireDefault(_Blockchain);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _Generating = require('./Generating');

var _Generating2 = _interopRequireDefault(_Generating);

var _Mining = require('./Mining');

var _Mining2 = _interopRequireDefault(_Mining);

var _Network = require('./Network');

var _Network2 = _interopRequireDefault(_Network);

var _RawTransactions = require('./RawTransactions');

var _RawTransactions2 = _interopRequireDefault(_RawTransactions);

var _Wallet = require('./Wallet');

var _Wallet2 = _interopRequireDefault(_Wallet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BITBOXCli = function () {
  function BITBOXCli(config) {
    _classCallCheck(this, BITBOXCli);

    if (!config) {
      config = {
        username: '',
        password: '',
        protocol: '',
        host: '',
        port: ''
      };
    }

    this.config = config;
    this.BitboxHTTP = _axios2.default.create({
      baseURL: config.protocol + '://' + config.host + ':' + config.port + '/'
    });
    this.BitcoinCash = new _BitcoinCash2.default();
    this.Crypto = _Crypto2.default;
    this.Util = new _Util2.default(config, this.BitboxHTTP);
    this.Blockchain = new _Blockchain2.default(config, this.BitboxHTTP);
    this.Control = new _Control2.default(config, this.BitboxHTTP);
    this.Generating = new _Generating2.default(config, this.BitboxHTTP);
    this.Mining = new _Mining2.default(config, this.BitboxHTTP);
    this.Network = new _Network2.default(config, this.BitboxHTTP);
    this.RawTransactions = new _RawTransactions2.default(config, this.BitboxHTTP);
    this.Wallet = new _Wallet2.default(config, this.BitboxHTTP);
  }

  _createClass(BITBOXCli, [{
    key: 'estimatesmartfee',
    value: function estimatesmartfee(nblocks) {
      // WARNING: This interface is unstable and may disappear or change!
      //
      // Estimates the approximate fee per kilobyte needed for a transaction to begin
      // confirmation within nblocks blocks if possible and return the number of blocks
      // for which the estimate is valid.
      //
      // Arguments:
      // 1. nblocks     (numeric)
      //
      // Result:
      // {
      //   "feerate" : x.x,     (numeric) estimate fee-per-kilobyte (in BCH)
      //   "blocks" : n         (numeric) block number where estimate was found
      // }
      //
      // A negative value is returned if not enough transactions and blocks
      // have been observed to make an estimate for any number of blocks.
      // However it will not return a value below the mempool reject fee.

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "estimatesmartfee",
          method: "estimatesmartfee",
          params: [nblocks]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'estimatesmartpriority',
    value: function estimatesmartpriority(nblocks) {
      // DEPRECATED. WARNING: This interface is unstable and may disappear or change!
      //
      // Estimates the approximate priority a zero-fee transaction needs to begin
      // confirmation within nblocks blocks if possible and return the number of blocks
      // for which the estimate is valid.
      //
      // Arguments:
      // 1. nblocks     (numeric, required)
      //
      // Result:
      // {
      //   "priority" : x.x,    (numeric) estimated priority
      //   "blocks" : n         (numeric) block number where estimate was found
      // }
      //
      // A negative value is returned if not enough transactions and blocks
      // have been observed to make an estimate for any number of blocks.
      // However if the mempool reject fee is set it will return 1e9 * MAX_MONEY.
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "estimatesmartpriority",
          method: "estimatesmartpriority",
          params: [nblocks]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'generatetoaddress',
    value: function generatetoaddress(blocks, address, maxtries) {

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
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'walletlock',
    value: function walletlock() {
      // removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.
      //
      // Parameters: none
      //
      // Result—null on success

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "walletlock",
          method: "walletlock",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'walletpassphrase',
    value: function walletpassphrase(passphrase, seconds) {
      // stores the wallet decryption key in memory for the indicated number of seconds. Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock time that overrides the old one.

      //Parameter #1—the passphrase

      // Parameter #2—the number of seconds to leave the wallet unlocked

      // Result—null on success
      var params = [];
      if (passphrase) {
        params.push(passphrase);
      }

      if (seconds) {
        params.push(seconds);
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "walletpassphrase",
          method: "walletpassphrase",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'walletpassphrasechange',
    value: function walletpassphrasechange(passphrase, newPassphrase) {
      //  changes the wallet passphrase from ‘old passphrase’ to ‘new passphrase’.
      // Parameter #1—the current passphrase

      // Parameter #2—the new passphrase

      // Result—null on success
      var params = [];
      if (passphrase) {
        params.push(passphrase);
      }

      if (newPassphrase) {
        params.push(newPassphrase);
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "walletpassphrasechange",
          method: "walletpassphrasechange",
          params: params
        }
      }).then(function (response) {}).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }]);

  return BITBOXCli;
}();

exports.default = BITBOXCli;