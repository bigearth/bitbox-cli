'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

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

var BitcoinCash = function () {
  function BitcoinCash() {
    _classCallCheck(this, BitcoinCash);
  }

  _createClass(BitcoinCash, [{
    key: 'address',
    value: function address() {
      return _bitcoinjsLib2.default.address;
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
  }]);

  return BitcoinCash;
}();

exports.default = BitcoinCash;