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

var TransactionBuilder = function () {
  function TransactionBuilder(keyPair) {
    var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bitcoincash';

    _classCallCheck(this, TransactionBuilder);

    this.keyPair = keyPair;
    if (network === 'bitcoincash') {
      network = 'bitcoin';
    }
    this.transaction = new _bitcoinjsLib2.default.TransactionBuilder(_bitcoinjsLib2.default.networks[network]);
  }

  _createClass(TransactionBuilder, [{
    key: 'addInput',
    value: function addInput(txid, vin) {
      var defaultSequence = 0xffffffff;
      var pubkey = this.keyPair.getPublicKeyBuffer();
      var pubKeyHashBuffer = _bitcoinjsLib2.default.crypto.hash160(pubkey);
      var scriptPubKey = _bitcoinjsLib2.default.script.pubKeyHash.output.encode(pubKeyHashBuffer);

      this.transaction.addInput(txid, vin, defaultSequence, scriptPubKey);
    }
  }, {
    key: 'addOutput',
    value: function addOutput(address, amount) {
      this.transaction.addOutput(_bchaddrjs2.default.toLegacyAddress(address), amount);
    }
  }, {
    key: 'sign',
    value: function sign(vin, originalAmount) {
      this.transaction.enableBitcoinCash(true);

      this.transaction.setVersion(2);

      var sighashAll = 0x01;
      var sighashBitcoinCashBIP143 = 0x40;

      var hashType = sighashAll | sighashBitcoinCashBIP143;

      this.transaction.sign(vin, this.keyPair, null, hashType, originalAmount);
    }
  }, {
    key: 'build',
    value: function build() {
      return this.transaction.build();
    }
  }]);

  return TransactionBuilder;
}();

exports.default = TransactionBuilder;