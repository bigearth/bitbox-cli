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
    this.transaction = new _bitcoinjsLib2.default.TransactionBuilder(_bitcoinjsLib2.default.networks[network]);
    this.DEFAULT_SEQUENCE = 0xffffffff;
    this.hashTypes = {
      SIGHASH_ALL: 0x01,
      SIGHASH_NONE: 0x02,
      SIGHASH_SINGLE: 0x03,
      SIGHASH_ANYONECANPAY: 0x80,
      SIGHASH_BITCOINCASH_BIP143: 0x40,
      ADVANCED_TRANSACTION_MARKER: 0x00,
      ADVANCED_TRANSACTION_FLAG: 0x01
    };
  }

  _createClass(TransactionBuilder, [{
    key: 'addInput',
    value: function addInput(txHash, vout) {
      var sequence = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.DEFAULT_SEQUENCE;
      var prevOutScript = arguments[3];

      this.transaction.addInput(txHash, vout, sequence, prevOutScript);
    }
  }, {
    key: 'addOutput',
    value: function addOutput(scriptPubKey, amount) {
      try {
        this.transaction.addOutput(_bchaddrjs2.default.toLegacyAddress(scriptPubKey), amount);
      } catch (error) {
        this.transaction.addOutput(scriptPubKey, amount);
      }
    }
  }, {
    key: 'sign',
    value: function sign(vin, keyPair, redeemScript) {
      var hashType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.hashTypes.SIGHASH_ALL;
      var value = arguments[4];

      this.transaction.enableBitcoinCash(true);

      this.transaction.setVersion(2);

      var ht = hashType | this.hashTypes.SIGHASH_BITCOINCASH_BIP143;

      var witnessScript = void 0;

      this.transaction.sign(vin, keyPair, redeemScript, ht, value, witnessScript);
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