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
  function TransactionBuilder() {
    var network = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bitcoincash';

    _classCallCheck(this, TransactionBuilder);

    if (network === 'bitcoincash') {
      network = 'bitcoin';
    }
    this.keyPairs = [];
    this.transaction = new _bitcoinjsLib2.default.TransactionBuilder(_bitcoinjsLib2.default.networks[network]);
  }

  _createClass(TransactionBuilder, [{
    key: 'addInput',
    value: function addInput(txid, vin, keyPair) {
      var defaultSequence = 0xffffffff;
      var pubkey = keyPair.getPublicKeyBuffer();
      var pubKeyHashBuffer = _bitcoinjsLib2.default.crypto.hash160(pubkey);
      var scriptPubKey = _bitcoinjsLib2.default.script.pubKeyHash.output.encode(pubKeyHashBuffer);
      this.keyPairs.push(keyPair);

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

      this.transaction.sign(vin, this.keyPairs[vin], null, hashType, originalAmount);
    }
  }, {
    key: 'build',
    value: function build() {
      return this.transaction.build();
    }
  }], [{
    key: 'createMultisigAddress',
    value: function createMultisigAddress(required, pubKeys) {
      var pks = [];
      pubKeys.forEach(function (pk) {
        pks.push(pk);
      });

      var redeemScript = _bitcoinjsLib2.default.script.multisig.output.encode(required, pks.map(function (hex) {
        return Buffer.from(hex, 'hex');
      }));
      var scriptPubKey = _bitcoinjsLib2.default.script.scriptHash.output.encode(_bitcoinjsLib2.default.crypto.hash160(redeemScript));
      return _bchaddrjs2.default.toCashAddress(_bitcoinjsLib2.default.address.fromOutputScript(scriptPubKey));
    }
  }]);

  return TransactionBuilder;
}();

exports.default = TransactionBuilder;