'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

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

var _Mnemonic = require('./Mnemonic');

var _Mnemonic2 = _interopRequireDefault(_Mnemonic);

var _Address = require('./Address');

var _Address2 = _interopRequireDefault(_Address);

var _HDNode = require('./HDNode');

var _HDNode2 = _interopRequireDefault(_HDNode);

var _Transaction = require('./Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _ECPair = require('./ECPair');

var _ECPair2 = _interopRequireDefault(_ECPair);

var _Script = require('./Script');

var _Script2 = _interopRequireDefault(_Script);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // 3rd party deps


// local deps


var BITBOXCli = function BITBOXCli(config) {
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
  this.Mnemonic = new _Mnemonic2.default();
  this.Address = new _Address2.default();
  this.HDNode = new _HDNode2.default();
  this.Util = new _Util2.default(config, this.BitboxHTTP);
  this.Blockchain = new _Blockchain2.default(config, this.BitboxHTTP);
  this.Control = new _Control2.default(config, this.BitboxHTTP);
  this.Generating = new _Generating2.default(config, this.BitboxHTTP);
  this.Mining = new _Mining2.default(config, this.BitboxHTTP);
  this.Network = new _Network2.default(config, this.BitboxHTTP);
  this.RawTransactions = new _RawTransactions2.default(config, this.BitboxHTTP);
  this.Wallet = new _Wallet2.default(config, this.BitboxHTTP);
  this.Transaction = _Transaction2.default;
  this.Script = _Script2.default;
  this.ECPair = _ECPair2.default;
}
//
// walletlock() {
//   // removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.
//   //
//   // Parameters: none
//   //
//   // Result—null on success
//
//   return this.BitboxHTTP({
//     method: 'post',
//     auth: {
//       username: this.config.username,
//       password: this.config.password
//     },
//     data: {
//       jsonrpc: "1.0",
//       id:"walletlock",
//       method: "walletlock",
//       params: []
//     }
//   })
//   .then((response) => {
//     return response.data.result;
//   })
//   .catch(error => {
//     return Error(error.response.data.error.message);
//   });
// }
//
// walletpassphrase(passphrase, seconds) {
//   // stores the wallet decryption key in memory for the indicated number of seconds. Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock time that overrides the old one.
//
//   //Parameter #1—the passphrase
//
//   // Parameter #2—the number of seconds to leave the wallet unlocked
//
//   // Result—null on success
//   let params = [];
//   if(passphrase) {
//     params.push(passphrase);
//   }
//
//   if(seconds) {
//     params.push(seconds);
//   }
//
//   return this.BitboxHTTP({
//     method: 'post',
//     auth: {
//       username: this.config.username,
//       password: this.config.password
//     },
//     data: {
//       jsonrpc: "1.0",
//       id:"walletpassphrase",
//       method: "walletpassphrase",
//       params: params
//     }
//   })
//   .then((response) => {
//     return response.data.result;
//   })
//   .catch(error => {
//     return Error(error.response.data.error.message);
//   });
// }
//
// walletpassphrasechange(passphrase, newPassphrase) {
//   //  changes the wallet passphrase from ‘old passphrase’ to ‘new passphrase’.
//   // Parameter #1—the current passphrase
//
//   // Parameter #2—the new passphrase
//
//   // Result—null on success
//   let params = [];
//   if(passphrase) {
//     params.push(passphrase);
//   }
//
//   if(newPassphrase) {
//     params.push(newPassphrase);
//   }
//
//   return this.BitboxHTTP({
//     method: 'post',
//     auth: {
//       username: this.config.username,
//       password: this.config.password
//     },
//     data: {
//       jsonrpc: "1.0",
//       id:"walletpassphrasechange",
//       method: "walletpassphrasechange",
//       params: params
//     }
//   })
//   .then((response) => {
//   })
//   .catch(error => {
//     return Error(error.response.data.error.message);
//   });
// }
;

exports.default = BITBOXCli;