'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Address from '../models/Address';


var _Crypto = require('./Crypto');

var _Crypto2 = _interopRequireDefault(_Crypto);

var _HDNode = require('./HDNode');

var _HDNode2 = _interopRequireDefault(_HDNode);

var _Mnemonic = require('./Mnemonic');

var _Mnemonic2 = _interopRequireDefault(_Mnemonic);

var _Address = require('./Address');

var _Address2 = _interopRequireDefault(_Address);

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

var _satoshiBitcoin = require('satoshi-bitcoin');

var _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);

var _bitcoinjsMessage = require('bitcoinjs-message');

var _bitcoinjsMessage2 = _interopRequireDefault(_bitcoinjsMessage);

var _randombytes = require('randombytes');

var _randombytes2 = _interopRequireDefault(_randombytes);

var _bs = require('bs58');

var _bs2 = _interopRequireDefault(_bs);

var _bip = require('bip21');

var _bip2 = _interopRequireDefault(_bip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BitcoinCash = function () {
  function BitcoinCash() {
    _classCallCheck(this, BitcoinCash);

    this.HDNode = _HDNode2.default;
    this.Mnemonic = new _Mnemonic2.default();
    this.Address = new _Address2.default();
  }

  _createClass(BitcoinCash, [{
    key: 'fromWIF',
    value: function fromWIF(privateKeyWIF) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bitcoin';

      return _bitcoinjsLib2.default.ECPair.fromWIF(privateKeyWIF, _bitcoinjsLib2.default.networks[network]);
    }
  }, {
    key: 'ECPair',
    value: function ECPair() {
      return _bitcoinjsLib2.default.ECPair;
    }
  }, {
    key: 'address',
    value: function address() {
      return _bitcoinjsLib2.default.address;
    }
  }, {
    key: 'script',
    value: function script() {
      return _bitcoinjsLib2.default.script;
    }
  }, {
    key: 'transaction',
    value: function transaction() {
      return _bitcoinjsLib2.default.Transaction;
    }
  }, {
    key: 'transactionBuilder',
    value: function transactionBuilder() {
      var network = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bitcoin';

      return new _bitcoinjsLib2.default.TransactionBuilder(_bitcoinjsLib2.default.networks[network]);
    }
  }, {
    key: 'fromTransaction',
    value: function fromTransaction() {
      return _bitcoinjsLib2.default.TransactionBuilder;
    }
  }, {
    key: 'createHDWallet',
    value: function createHDWallet(config) {
      var language = config.language;

      if (!language || language !== 'chinese_simplified' && language !== 'chinese_traditional' && language !== 'english' && language !== 'french' && language !== 'italian' && language !== 'japanese' && language !== 'korean' && language !== 'spanish') {
        config.language = 'english';
      }

      var mnemonic = config.mnemonic;
      if (config.autogenerateHDMnemonic) {
        // create a random mnemonic w/ user provided entropy size
        var _randomBytes = _Crypto2.default.randomBytes(config.entropy);
        mnemonic = this.entropyToMnemonic(_randomBytes, this.mnemonicWordLists()[config.language]);
      }

      // create 512 bit HMAC-SHA512 root seed
      var rootSeedBuffer = this.mnemonicToSeedBuffer(mnemonic, config.password);

      // create master private key
      var masterHDNode = this.HDNode.fromSeedBuffer(rootSeedBuffer, config.network);

      var HDPath = 'm/' + config.HDPath.purpose + '/' + config.HDPath.coinCode;

      var accounts = [];

      for (var i = 0; i < config.totalAccounts; i++) {
        // create accounts
        // follow BIP 44 account discovery algo https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#account-discovery
        var account = masterHDNode.derivePath(HDPath.replace(/\/$/, "") + '/' + i + '\'');
        var xpriv = this.HDNode.toXPriv(account);
        var xpub = this.HDNode.toXPub(account);
        var address = masterHDNode.derivePath(HDPath.replace(/\/$/, "") + '/' + i + '\'/' + config.HDPath.change + '/' + config.HDPath.address_index);

        // TODO: Is this the right privkey?
        accounts.push({
          title: '',
          privateKeyWIF: address.keyPair.toWIF(),
          xpriv: xpriv,
          xpub: xpub,
          index: i
        });
      };

      return [rootSeedBuffer, masterHDNode, mnemonic, config.HDPath, accounts];
    }
  }, {
    key: 'fromXPub',
    value: function fromXPub(xpub) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var network = void 0;
      if (xpub[0] === 'x') {
        network = 'bitcoin';
      } else {
        network = 'testnet';
      }
      var HDNode = _bitcoinjsLib2.default.HDNode.fromBase58(xpub, _bitcoinjsLib2.default.networks[network]);
      var address = HDNode.derivePath('0/' + index);
      return this.Address.toCashAddress(address.getAddress());
    }

    // Translate coins to satoshi value

  }, {
    key: 'toSatoshi',
    value: function toSatoshi(coins) {
      return _satoshiBitcoin2.default.toSatoshi(coins);
    }

    // Translate satoshi to coin value

  }, {
    key: 'toBitcoinCash',
    value: function toBitcoinCash(satoshis) {
      return _satoshiBitcoin2.default.toBitcoin(satoshis);
    }

    // sign message

  }, {
    key: 'signMessageWithPrivKey',
    value: function signMessageWithPrivKey(privateKeyWIF, message) {
      var network = privateKeyWIF.charAt(0) === 'c' ? 'testnet' : 'bitcoin';
      var keyPair = _bitcoinjsLib2.default.ECPair.fromWIF(privateKeyWIF, _bitcoinjsLib2.default.networks[network]);
      var privateKey = keyPair.d.toBuffer(32);
      return _bitcoinjsMessage2.default.sign(message, privateKey, keyPair.compressed).toString('base64');
    }

    // verify message

  }, {
    key: 'verifyMessage',
    value: function verifyMessage(address, signature, message) {
      return _bitcoinjsMessage2.default.verify(message, this.Address.toLegacyAddress(address), signature);
    }

    // encode base58Check

  }, {
    key: 'encodeBase58Check',
    value: function encodeBase58Check(bytes) {
      return _bs2.default.encode(bytes);
    }

    // decode base58Check

  }, {
    key: 'decodeBase58Check',
    value: function decodeBase58Check(address) {
      return _bs2.default.decode(address).toString('hex');
    }

    // encode bip21 url

  }, {
    key: 'encodeBIP21',
    value: function encodeBIP21(address, options) {
      return _bip2.default.encode(this.Address.toCashAddress(address), options);
    }

    // decode bip21 url

  }, {
    key: 'decodeBIP21',
    value: function decodeBIP21(url) {
      return _bip2.default.decode(url);
    }
  }]);

  return BitcoinCash;
}();

exports.default = BitcoinCash;