'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoincashjsLib = require('bitcoincashjs-lib');

var _bitcoincashjsLib2 = _interopRequireDefault(_bitcoincashjsLib);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

var _satoshiBitcoin = require('satoshi-bitcoin');

var _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);

var _bitcoinjsMessage = require('bitcoinjs-message');

var _bitcoinjsMessage2 = _interopRequireDefault(_bitcoinjsMessage);

var _bs = require('bs58');

var _bs2 = _interopRequireDefault(_bs);

var _bip = require('bip21');

var _bip2 = _interopRequireDefault(_bip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;

var BitcoinCash = function () {
  function BitcoinCash() {
    _classCallCheck(this, BitcoinCash);
  }

  _createClass(BitcoinCash, [{
    key: 'address',
    value: function address() {
      return _bitcoincashjsLib2.default.address;
    }
  }, {
    key: 'transaction',
    value: function transaction() {
      return _bitcoincashjsLib2.default.Transaction;
    }
  }, {
    key: 'transactionBuilder',
    value: function transactionBuilder() {
      var network = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bitcoincash';

      if (network === 'bitcoincash') {
        network = 'bitcoin';
      }
      return new _bitcoincashjsLib2.default.TransactionBuilder(_bitcoincashjsLib2.default.networks[network]);
    }
  }, {
    key: 'fromTransaction',
    value: function fromTransaction() {
      return _bitcoincashjsLib2.default.TransactionBuilder;
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

    // Translate satoshi to bits denomination

  }, {
    key: 'toBits',
    value: function toBits(satoshis) {
      return parseFloat(satoshis) / 100000;
    }

    // Translate bits to satoshi denomination

  }, {
    key: 'fromBits',
    value: function fromBits(bits) {
      return Math.ceil(bits * 100000);
    }

    // sign message

  }, {
    key: 'signMessageWithPrivKey',
    value: function signMessageWithPrivKey(privateKeyWIF, message) {
      var network = privateKeyWIF.charAt(0) === 'c' ? 'testnet' : 'bitcoin';
      var keyPair = _bitcoincashjsLib2.default.ECPair.fromWIF(privateKeyWIF, _bitcoincashjsLib2.default.networks[network]);
      var privateKey = keyPair.d.toBuffer(32);
      return _bitcoinjsMessage2.default.sign(message, privateKey, keyPair.compressed).toString('base64');
    }

    // verify message

  }, {
    key: 'verifyMessage',
    value: function verifyMessage(address, signature, message) {
      return _bitcoinjsMessage2.default.verify(message, _bchaddrjs2.default.toLegacyAddress(address), signature);
    }

    // encode base58Check

  }, {
    key: 'encodeBase58Check',
    value: function encodeBase58Check(hex) {
      return _bs2.default.encode(Buffer.from(hex, 'hex'));
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
      return _bip2.default.encode(_bchaddrjs2.default.toCashAddress(address), options);
    }

    // decode bip21 url

  }, {
    key: 'decodeBIP21',
    value: function decodeBIP21(url) {
      return _bip2.default.decode(url);
    }
  }, {
    key: 'getByteCount',
    value: function getByteCount(inputs, outputs) {
      // from https://github.com/bitcoinjs/bitcoinjs-lib/issues/921#issuecomment-354394004
      var totalWeight = 0;
      var hasWitness = false;
      // assumes compressed pubkeys in all cases.
      var types = {
        'inputs': {
          'MULTISIG-P2SH': 49 * 4,
          'MULTISIG-P2WSH': 6 + 41 * 4,
          'MULTISIG-P2SH-P2WSH': 6 + 76 * 4,
          'P2PKH': 148 * 4,
          'P2WPKH': 108 + 41 * 4,
          'P2SH-P2WPKH': 108 + 64 * 4
        },
        'outputs': {
          'P2SH': 32 * 4,
          'P2PKH': 34 * 4,
          'P2WPKH': 31 * 4,
          'P2WSH': 43 * 4
        }
      };

      Object.keys(inputs).forEach(function (key) {
        if (key.slice(0, 8) === 'MULTISIG') {
          // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
          var keyParts = key.split(':');
          if (keyParts.length !== 2) throw new Error('invalid input: ' + key);
          var newKey = keyParts[0];
          var mAndN = keyParts[1].split('-').map(function (item) {
            return parseInt(item);
          });

          totalWeight += types.inputs[newKey] * inputs[key];
          var multiplyer = newKey === 'MULTISIG-P2SH' ? 4 : 1;
          totalWeight += (73 * mAndN[0] + 34 * mAndN[1]) * multiplyer;
        } else {
          totalWeight += types.inputs[key] * inputs[key];
        }
        if (key.indexOf('W') >= 0) hasWitness = true;
      });

      Object.keys(outputs).forEach(function (key) {
        totalWeight += types.outputs[key] * outputs[key];
      });

      if (hasWitness) totalWeight += 2;

      totalWeight += 10 * 4;

      return Math.ceil(totalWeight / 4);
    }
  }]);

  return BitcoinCash;
}();

exports.default = BitcoinCash;