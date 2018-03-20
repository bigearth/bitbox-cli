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

var bip32utils = require('bip32-utils');

var HDNode = function () {
  function HDNode() {
    _classCallCheck(this, HDNode);
  }

  _createClass(HDNode, [{
    key: 'fromSeedBuffer',
    value: function fromSeedBuffer(rootSeedBuffer) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bitcoin';

      return _bitcoinjsLib2.default.HDNode.fromSeedBuffer(rootSeedBuffer, _bitcoinjsLib2.default.networks[network]);
    }
  }, {
    key: 'fromSeedHex',
    value: function fromSeedHex(rootSeedHex) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bitcoin';

      return _bitcoinjsLib2.default.HDNode.fromSeedBuffer(Buffer.from(rootSeedHex, 'hex'), _bitcoinjsLib2.default.networks[network]);
    }
  }, {
    key: 'getLegacyAddress',
    value: function getLegacyAddress(hdNode) {
      return hdNode.getAddress();
    }
  }, {
    key: 'getCashAddress',
    value: function getCashAddress(hdNode) {
      return _bchaddrjs2.default.toCashAddress(hdNode.getAddress());
    }
  }, {
    key: 'getPrivateKeyWIF',
    value: function getPrivateKeyWIF(hdNode) {
      return hdNode.keyPair.toWIF();
    }
  }, {
    key: 'toXPub',
    value: function toXPub(hdNode) {
      return hdNode.neutered().toBase58();
    }
  }, {
    key: 'toXPriv',
    value: function toXPriv(hdNode) {
      return hdNode.toBase58();
    }
  }, {
    key: 'fromXPriv',
    value: function fromXPriv(xpriv) {
      var network = void 0;
      if (xpriv[0] === 'x') {
        network = 'bitcoin';
      } else if (xpriv[0] === 't') {
        network = 'testnet';
      }
      return _bitcoinjsLib2.default.HDNode.fromBase58(xpriv, _bitcoinjsLib2.default.networks[network]);
    }
  }, {
    key: 'fromXPub',
    value: function fromXPub(xpub) {
      var network = void 0;
      if (xpub[0] === 'x') {
        network = 'bitcoin';
      } else if (xpub[0] === 't') {
        network = 'testnet';
      }
      return _bitcoinjsLib2.default.HDNode.fromBase58(xpub, _bitcoinjsLib2.default.networks[network]);
    }
  }, {
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
    key: 'createAccount',
    value: function createAccount(hdNodes) {
      var arr = hdNodes.map(function (item, index) {
        return new bip32utils.Chain(item.neutered());
      });
      return new bip32utils.Account(arr);
    }
  }]);

  return HDNode;
}();

exports.default = HDNode;