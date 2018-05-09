'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function () {
  function Address() {
    _classCallCheck(this, Address);
  }

  _createClass(Address, [{
    key: 'toLegacyAddress',


    // Translate address from any address format into a specific format.
    value: function toLegacyAddress(address) {
      return _bchaddrjs2.default.toLegacyAddress(address);
    }
  }, {
    key: 'toCashAddress',
    value: function toCashAddress(address) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (prefix) {
        return _bchaddrjs2.default.toCashAddress(address);
      } else {
        return _bchaddrjs2.default.toCashAddress(address).split(':')[1];
      }
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
      if (address[0] === 'x') {
        return true;
      } else if (address[0] === 't') {
        return false;
      } else {
        return _bchaddrjs2.default.isMainnetAddress(address);
      }
    }
  }, {
    key: 'isTestnetAddress',
    value: function isTestnetAddress(address) {
      if (address[0] === 'x') {
        return false;
      } else if (address[0] === 't') {
        return true;
      } else {
        return _bchaddrjs2.default.isTestnetAddress(address);
      }
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
      if (address[0] === 'x') {
        return 'mainnet';
      } else if (address[0] === 't') {
        return 'testnet';
      } else {
        return _bchaddrjs2.default.detectAddressNetwork(address);
      }
    }

    // Detect address type.

  }, {
    key: 'detectAddressType',
    value: function detectAddressType(address) {
      return _bchaddrjs2.default.detectAddressType(address);
    }
  }, {
    key: 'fromXPub',
    value: function fromXPub(xpub) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0/0";

      var HDNode = _bitcoinjsLib2.default.HDNode.fromBase58(xpub, _bitcoinjsLib2.default.networks[this.detectAddressNetwork(xpub)]);
      var address = HDNode.derivePath(path);
      return this.toCashAddress(address.getAddress());
    }
  }, {
    key: 'fromOutputScript',
    value: function fromOutputScript(scriptPubKey) {
      return _bchaddrjs2.default.toCashAddress(_bitcoinjsLib2.default.address.fromOutputScript(scriptPubKey));
    }
  }, {
    key: 'details',
    value: function details(address) {
      if (typeof address !== 'string') {
        address = JSON.stringify(address);
      }
      return _axios2.default.get('https://rest.bitbox.earth/v1/address/details/' + address).then(function (response) {
        return response.data;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }, {
    key: 'utxo',
    value: function utxo(address) {
      if (typeof address !== 'string') {
        address = JSON.stringify(address);
      }
      return _axios2.default.get('https://rest.bitbox.earth/v1/address/utxo/' + address).then(function (response) {
        return response.data;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });
    }
  }]);

  return Address;
}();

exports.default = Address;