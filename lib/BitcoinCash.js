'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Address from '../models/Address';


var _Crypto = require('./Crypto');

var _Crypto2 = _interopRequireDefault(_Crypto);

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _bip = require('bip39');

var _bip2 = _interopRequireDefault(_bip);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

var _satoshiBitcoin = require('satoshi-bitcoin');

var _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);

var _bitcoinjsMessage = require('bitcoinjs-message');

var _bitcoinjsMessage2 = _interopRequireDefault(_bitcoinjsMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// let bitcore = require('bitcore-lib');


var BitcoinCash = function () {
  function BitcoinCash() {
    _classCallCheck(this, BitcoinCash);
  }

  _createClass(BitcoinCash, null, [{
    key: 'entropyToMnemonic',
    value: function entropyToMnemonic() {
      var bytes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

      // Generate cryptographically strong pseudo-random data.
      // The bytes argument is a number indicating the number of bytes to generate.
      // Uses the NodeJS crypto lib. More info: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
      var randomBytes = void 0;
      if (typeof bytes === 'number') {
        randomBytes = _Crypto2.default.randomBytes(bytes);
      } else if (typeof bytes === 'string') {
        randomBytes = bytes;
      }
      // Create BIP 39 compliant mnemonic w/ entropy
      // Entropy (bits/bytes)	Checksum (bits)	Entropy + checksum (bits)	Mnemonic length (words)
      // 128/16               4               132                       12
      //
      // 160/20               5               165                       15
      //
      // 192/24               6               198                       18
      //
      // 224/28               7               231                       21
      //
      // 256/32               8               264                       24

      return _bip2.default.entropyToMnemonic(randomBytes);
    }
  }, {
    key: 'mnemonicToSeed',
    value: function mnemonicToSeed(mnemonic) {
      var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return _bip2.default.mnemonicToSeed(mnemonic, password);
    }
  }, {
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
      // nore info: https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch05.asciidoc

      var mnemonic = config.mnemonic;
      if (config.autogenerateHDMnemonic) {
        // create a random mnemonic w/ user provided entropy size
        mnemonic = BitcoinCash.entropyToMnemonic(config.entropy);
      }

      // create 512 bit HMAC-SHA512 root seed
      var rootSeed = BitcoinCash.mnemonicToSeed(mnemonic, config.password);

      // create master private key
      var masterPrivateKey = BitcoinCash.fromSeedBuffer(rootSeed, config.network);

      var HDPath = 'm/' + config.HDPath.purpose + '/' + config.HDPath.coinCode;

      var accounts = [];

      for (var i = 0; i < config.totalAccounts; i++) {
        // create accounts
        // follow BIP 44 account discovery algo https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#account-discovery
        var account = masterPrivateKey.derivePath(HDPath.replace(/\/$/, "") + '/' + i + '\'');
        var xpriv = account.toBase58();
        var xpub = account.neutered().toBase58();
        var address = masterPrivateKey.derivePath(HDPath.replace(/\/$/, "") + '/' + i + '\'/' + config.HDPath.change + '/' + config.HDPath.address_index);

        accounts.push({
          title: '',
          privateKeyWIF: address.keyPair.toWIF(),
          xpriv: xpriv,
          xpub: xpub,
          index: i
        });
        // addresses.push(new Address(BitcoinCash.toCashAddress(account.derive(i).getAddress()), account.derive(i).keyPair.toWIF()));
      };

      return [rootSeed, masterPrivateKey, mnemonic, config.HDPath, accounts];
    }
  }, {
    key: 'fromSeedBuffer',
    value: function fromSeedBuffer(rootSeed) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bitcoin';

      return _bitcoinjsLib2.default.HDNode.fromSeedBuffer(rootSeed, _bitcoinjsLib2.default.networks[network]);
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
      return BitcoinCash.toCashAddress(address.getAddress());
    }
  }, {
    key: 'keypairsFromMnemonic',
    value: function keypairsFromMnemonic(mnemonic) {
      var numberOfKeypairs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var rootSeed = BitcoinCash.mnemonicToSeed(mnemonic, '');
      var masterPrivateKey = BitcoinCash.fromSeedBuffer(rootSeed);
      var HDPath = 'm/44\'/145\'/0\'/0/';

      var accounts = [];

      for (var i = 0; i < numberOfKeypairs; i++) {
        var keyPair = masterPrivateKey.derivePath('' + HDPath + i);
        var address = BitcoinCash.fromWIF(keyPair.keyPair.toWIF()).getAddress();

        accounts.push({
          privateKeyWIF: keyPair.keyPair.toWIF(),
          address: BitcoinCash.toCashAddress(address)
        });
      };
      return accounts;
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

    // Translate address from any address format into a specific format.

  }, {
    key: 'toLegacyAddress',
    value: function toLegacyAddress(address) {
      return _bchaddrjs2.default.toLegacyAddress(address);
    }
  }, {
    key: 'toCashAddress',
    value: function toCashAddress(address) {
      return _bchaddrjs2.default.toCashAddress(address);
    }

    // Test for address format.

  }, {
    key: 'isLegacyAddress',
    value: function isLegacyAddress(address) {
      return _bchaddrjs2.default.isLegacyAddress(address);
    }
  }, {
    key: 'isCashAddress',
    value: function isCashAddress(address) {
      return _bchaddrjs2.default.isCashAddress(address);
    }

    // Test for address network.

  }, {
    key: 'isMainnetAddress',
    value: function isMainnetAddress(address) {
      return _bchaddrjs2.default.isMainnetAddress(address);
    }
  }, {
    key: 'isTestnetAddress',
    value: function isTestnetAddress(address) {
      return _bchaddrjs2.default.isTestnetAddress(address);
    }

    // Test for address type.

  }, {
    key: 'isP2PKHAddress',
    value: function isP2PKHAddress(address) {
      return _bchaddrjs2.default.isP2PKHAddress(address);
    }
  }, {
    key: 'isP2SHAddress',
    value: function isP2SHAddress(address) {
      return _bchaddrjs2.default.isP2SHAddress(address);
    }

    // Detect address format.

  }, {
    key: 'detectAddressFormat',
    value: function detectAddressFormat(address) {
      return _bchaddrjs2.default.detectAddressFormat(address);
    }

    // Detect address network.

  }, {
    key: 'detectAddressNetwork',
    value: function detectAddressNetwork(address) {
      return _bchaddrjs2.default.detectAddressNetwork(address);
    }

    // Detect address type.

  }, {
    key: 'detectAddressType',
    value: function detectAddressType(address) {
      return _bchaddrjs2.default.detectAddressType(address);
    }

    // sign message

  }, {
    key: 'signMessageWithPrivKey',
    value: function signMessageWithPrivKey(privateKeyWIF, message) {
      var keyPair = _bitcoinjsLib2.default.ECPair.fromWIF(privateKeyWIF);
      var privateKey = keyPair.d.toBuffer(32);
      return _bitcoinjsMessage2.default.sign(message, privateKey, keyPair.compressed).toString('base64');
    }

    // verify message

  }, {
    key: 'verifyMessage',
    value: function verifyMessage(address, signature, message) {
      return _bitcoinjsMessage2.default.verify(message, BitcoinCash.toLegacyAddress(address), signature);
    }
  }]);

  return BitcoinCash;
}();

exports.default = BitcoinCash;