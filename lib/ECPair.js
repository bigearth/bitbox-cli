'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ECPair = function () {
  function ECPair() {
    _classCallCheck(this, ECPair);
  }

  _createClass(ECPair, null, [{
    key: 'fromWIF',
    value: function fromWIF(privateKeyWIF) {
      var network = void 0;
      if (privateKeyWIF[0] === 'L' || privateKeyWIF[0] === 'K') {
        network = 'bitcoin';
      } else if (privateKeyWIF[0] === 'c') {
        network = 'testnet';
      }
      return _bitcoinjsLib2.default.ECPair.fromWIF(privateKeyWIF, _bitcoinjsLib2.default.networks[network]);
    }
  }, {
    key: 'toPublicKeyBuffer',
    value: function toPublicKeyBuffer(ecpair) {
      return ecpair.getPublicKeyBuffer();
    }
  }, {
    key: 'toPublicKeyHex',
    value: function toPublicKeyHex(ecpair) {
      return ecpair.getPublicKeyBuffer().toString('hex');
    }
  }, {
    key: 'fromPublicKeyBuffer',
    value: function fromPublicKeyBuffer(pubkeyBuffer) {
      return _bitcoinjsLib2.default.ECPair.fromPublicKeyBuffer(pubkeyBuffer);
    }
  }, {
    key: 'fromPublicKeyHex',
    value: function fromPublicKeyHex(pubkeyHex) {
      return _bitcoinjsLib2.default.ECPair.fromPublicKeyBuffer(Buffer.from(pubkeyHex, 'hex'));
    }
  }, {
    key: 'toLegacyAddress',
    value: function toLegacyAddress(ecpair) {
      return ecpair.getAddress();
    }
  }, {
    key: 'toCashAddress',
    value: function toCashAddress(ecpair) {
      return _bchaddrjs2.default.toCashAddress(ecpair.getAddress());
    }
  }]);

  return ECPair;
}();

exports.default = ECPair;