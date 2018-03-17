'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Crypto = require('./Crypto');

var _Crypto2 = _interopRequireDefault(_Crypto);

var _bip = require('bip39');

var _bip2 = _interopRequireDefault(_bip);

var _randombytes = require('randombytes');

var _randombytes2 = _interopRequireDefault(_randombytes);

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mnemonic = function () {
  function Mnemonic() {
    _classCallCheck(this, Mnemonic);
  }

  _createClass(Mnemonic, [{
    key: 'generateMnemonic',
    value: function generateMnemonic() {
      var bits = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 128;
      var wordlist = arguments[1];

      return _bip2.default.generateMnemonic(bits, _randombytes2.default, wordlist);
    }
  }, {
    key: 'entropyToMnemonic',
    value: function entropyToMnemonic() {
      var bytes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
      var wordlist = arguments[1];

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

      return _bip2.default.entropyToMnemonic(randomBytes, wordlist);
    }
  }, {
    key: 'mnemonicToEntropy',
    value: function mnemonicToEntropy(mnemonic, wordlist) {
      return _bip2.default.mnemonicToEntropy(mnemonic, wordlist);
    }
  }, {
    key: 'validateMnemonic',
    value: function validateMnemonic(mnemonic, wordlist) {
      return _bip2.default.validateMnemonic(mnemonic, wordlist);
    }
  }, {
    key: 'mnemonicToSeedHex',
    value: function mnemonicToSeedHex(mnemonic) {
      var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return _bip2.default.mnemonicToSeedHex(mnemonic, password);
    }
  }, {
    key: 'mnemonicToSeedBuffer',
    value: function mnemonicToSeedBuffer(mnemonic) {
      var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return _bip2.default.mnemonicToSeed(mnemonic, password);
    }
  }, {
    key: 'translateMnemonic',
    value: function translateMnemonic(mnemonic) {
      var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'english';
      var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'english';

      var fromWordlist = this.mnemonicWordLists()[from.toLowerCase()];
      var toWordlist = this.mnemonicWordLists()[to.toLowerCase()];
      var entropy = this.mnemonicToEntropy(mnemonic, fromWordlist);
      return this.entropyToMnemonic(entropy, toWordlist);
    }
  }, {
    key: 'mnemonicWordLists',
    value: function mnemonicWordLists() {
      return _bip2.default.wordlists;
    }
  }, {
    key: 'keypairsFromMnemonic',
    value: function keypairsFromMnemonic(mnemonic) {
      var numberOfKeypairs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var rootSeedBuffer = this.mnemonicToSeedBuffer(mnemonic, '');
      var hdNode = _bitcoinjsLib2.default.HDNode.fromSeedBuffer(rootSeedBuffer);
      var HDPath = '44\'/145\'/0\'/0/';

      var accounts = [];

      for (var i = 0; i < numberOfKeypairs; i++) {
        var childHDNode = hdNode.derivePath('' + HDPath + i);
        accounts.push({
          privateKeyWIF: childHDNode.keyPair.toWIF(),
          address: _bchaddrjs2.default.toCashAddress(childHDNode.getAddress())
        });
      };
      return accounts;
    }
  }]);

  return Mnemonic;
}();

exports.default = Mnemonic;