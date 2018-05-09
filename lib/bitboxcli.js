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

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

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

var _Mnemonic = require('./Mnemonic');

var _Mnemonic2 = _interopRequireDefault(_Mnemonic);

var _Address = require('./Address');

var _Address2 = _interopRequireDefault(_Address);

var _HDNode = require('./HDNode');

var _HDNode2 = _interopRequireDefault(_HDNode);

var _Transaction = require('./Transaction');

var _Transaction2 = _interopRequireDefault(_Transaction);

var _TransactionBuilder = require('./TransactionBuilder');

var _TransactionBuilder2 = _interopRequireDefault(_TransactionBuilder);

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
      protocol: '',
      host: '',
      test: true
    };
  }

  this.config = config;
  this.baseURL = '/';

  if (!this.config.test && this.config.host !== 'localhost') {
    this.baseURL = config.protocol + '://' + config.host + '/v1/';
  } else if (!this.config.test && this.config.host === 'localhost') {
    this.baseURL = config.protocol + '://' + config.host + ':8332/';
  }

  this.BitcoinCash = new _BitcoinCash2.default();
  this.Crypto = _Crypto2.default;
  this.Mnemonic = new _Mnemonic2.default();
  this.Address = new _Address2.default();
  this.HDNode = new _HDNode2.default();
  this.Util = new _Util2.default(config, this.baseURL);
  this.Block = _Block2.default;
  this.Blockchain = new _Blockchain2.default(config, this.baseURL);
  this.Control = new _Control2.default(config, this.baseURL);
  this.Generating = new _Generating2.default(config, this.baseURL);
  this.Mining = new _Mining2.default(config, this.baseURL);
  this.Network = new _Network2.default(config, this.baseURL);
  this.RawTransactions = new _RawTransactions2.default(config, this.baseURL);
  this.Transaction = _Transaction2.default;
  this.TransactionBuilder = _TransactionBuilder2.default;
  this.Script = new _Script2.default();
  this.ECPair = _ECPair2.default;
};

exports.default = BITBOXCli;