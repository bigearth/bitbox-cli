"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _bitcoincashjsLib = require("bitcoincashjs-lib");

var _bitcoincashjsLib2 = _interopRequireDefault(_bitcoincashjsLib);

var _cashaddrjs = require("cashaddrjs");

var _cashaddrjs2 = _interopRequireDefault(_cashaddrjs);

var _coininfo = require("coininfo");

var _coininfo2 = _interopRequireDefault(_coininfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function () {
  function Address(restURL) {
    _classCallCheck(this, Address);

    this.restURL = restURL;
  }

  // Translate address from any address format into a specific format.


  _createClass(Address, [{
    key: "toLegacyAddress",
    value: function toLegacyAddress(address) {
      var _decode2 = this._decode(address),
          prefix = _decode2.prefix,
          type = _decode2.type,
          hash = _decode2.hash;

      var bitcoincash = void 0;
      switch (prefix) {
        case "bitcoincash":
          bitcoincash = _coininfo2.default.bitcoincash.main;
          break;
        case "bchtest":
          bitcoincash = _coininfo2.default.bitcoincash.test;
          break;
        case "bchreg":
          bitcoincash = _coininfo2.default.bitcoincash.regtest;
          break;
        default:
          throw "unsupported prefix : " + prefix;
      }

      var version = void 0;
      switch (type) {
        case "P2PKH":
          version = bitcoincash.versions.public;
          break;
        case "P2SH":
          version = bitcoincash.versions.scripthash;
          break;
        default:
          throw "unsupported address type : " + type;
      }

      var hashBuf = Buffer.from(hash);

      return _bitcoincashjsLib2.default.address.toBase58Check(hashBuf, version);
    }
  }, {
    key: "toCashAddress",
    value: function toCashAddress(address) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var regtest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var decoded = this._decode(address);

      var prefixString = void 0;
      if (regtest) prefixString = "bchreg";else prefixString = decoded.prefix;

      var cashAddress = _cashaddrjs2.default.encode(prefixString, decoded.type, decoded.hash);

      if (prefix) return cashAddress;
      return cashAddress.split(":")[1];
    }

    // Converts any address format to hash160

  }, {
    key: "toHash160",
    value: function toHash160(address) {
      var legacyAddress = this.toLegacyAddress(address);
      var bytes = _bitcoincashjsLib2.default.address.fromBase58Check(legacyAddress);
      return bytes.hash.toString("hex");
    }

    // Converts hash160 to Legacy Address

  }, {
    key: "hash160ToLegacy",
    value: function hash160ToLegacy(hash160) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _bitcoincashjsLib2.default.networks.bitcoin.pubKeyHash;

      var buffer = Buffer.from(hash160, "hex");
      var legacyAddress = _bitcoincashjsLib2.default.address.toBase58Check(buffer, network);
      return legacyAddress;
    }

    // Converts hash160 to Cash Address

  }, {
    key: "hash160ToCash",
    value: function hash160ToCash(hash160) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _bitcoincashjsLib2.default.networks.bitcoin.pubKeyHash;
      var regtest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var legacyAddress = this.hash160ToLegacy(hash160, network);
      return this.toCashAddress(legacyAddress, true, regtest);
    }
  }, {
    key: "_decode",
    value: function _decode(address) {
      try {
        return this._decodeLegacyAddress(address);
      } catch (error) {}

      try {
        return this._decodeCashAddress(address);
      } catch (error) {}

      try {
        return this._encodeAddressFromHash160(address);
      } catch (error) {}

      throw new Error("Unsupported address format : " + address);
    }
  }, {
    key: "_decodeLegacyAddress",
    value: function _decodeLegacyAddress(address) {
      var _Bitcoin$address$from = _bitcoincashjsLib2.default.address.fromBase58Check(address),
          version = _Bitcoin$address$from.version,
          hash = _Bitcoin$address$from.hash;

      var info = _coininfo2.default.bitcoincash;

      switch (version) {
        case info.main.versions.public:
          return {
            prefix: "bitcoincash",
            type: "P2PKH",
            hash: hash,
            format: "legacy"
          };
        case info.main.versions.scripthash:
          return {
            prefix: "bitcoincash",
            type: "P2SH",
            hash: hash,
            format: "legacy"
          };
        case info.test.versions.public:
          return {
            prefix: "bchtest",
            type: "P2PKH",
            hash: hash,
            format: "legacy"
          };
        case info.test.versions.scripthash:
          return {
            prefix: "bchtest",
            type: "P2SH",
            hash: hash,
            format: "legacy"
          };
        default:
          throw new Error("Invalid format : " + address);
      }
    }
  }, {
    key: "_decodeCashAddress",
    value: function _decodeCashAddress(address) {
      if (address.indexOf(":") !== -1) {
        var decoded = _cashaddrjs2.default.decode(address);
        decoded.format = "cashaddr";
        return decoded;
      }

      var prefixes = ["bitcoincash", "bchtest", "bchreg"];
      for (var i = 0; i < prefixes.length; ++i) {
        try {
          var _decoded = _cashaddrjs2.default.decode(prefixes[i] + ":" + address);
          _decoded.format = "cashaddr";
          return _decoded;
        } catch (error) {}
      }

      throw new Error("Invalid format : " + address);
    }
  }, {
    key: "_encodeAddressFromHash160",
    value: function _encodeAddressFromHash160(address) {
      try {
        return {
          legacyAddress: this.hash160ToLegacy(address),
          cashAddress: this.hash160ToCash(address),
          format: "hash160"
        };
      } catch (error) {}

      throw new Error("Invalid format : " + address);
    }

    // Test for address format.

  }, {
    key: "isLegacyAddress",
    value: function isLegacyAddress(address) {
      return this.detectAddressFormat(address) === "legacy";
    }
  }, {
    key: "isCashAddress",
    value: function isCashAddress(address) {
      return this.detectAddressFormat(address) === "cashaddr";
    }
  }, {
    key: "isHash160",
    value: function isHash160(address) {
      return this.detectAddressFormat(address) === "hash160";
    }

    // Test for address network.

  }, {
    key: "isMainnetAddress",
    value: function isMainnetAddress(address) {
      if (address[0] === "x") return true;else if (address[0] === "t") return false;

      return this.detectAddressNetwork(address) === "mainnet";
    }
  }, {
    key: "isTestnetAddress",
    value: function isTestnetAddress(address) {
      if (address[0] === "x") return false;else if (address[0] === "t") return true;

      return this.detectAddressNetwork(address) === "testnet";
    }
  }, {
    key: "isRegTestAddress",
    value: function isRegTestAddress(address) {
      return this.detectAddressNetwork(address) === "regtest";
    }

    // Test for address type.

  }, {
    key: "isP2PKHAddress",
    value: function isP2PKHAddress(address) {
      return this.detectAddressType(address) === "p2pkh";
    }
  }, {
    key: "isP2SHAddress",
    value: function isP2SHAddress(address) {
      return this.detectAddressType(address) === "p2sh";
    }

    // Detect address format.

  }, {
    key: "detectAddressFormat",
    value: function detectAddressFormat(address) {
      var decoded = this._decode(address);

      return decoded.format;
    }

    // Detect address network.

  }, {
    key: "detectAddressNetwork",
    value: function detectAddressNetwork(address) {
      if (address[0] === "x") return "mainnet";else if (address[0] === "t") return "testnet";

      var decoded = this._decode(address);

      switch (decoded.prefix) {
        case "bitcoincash":
          return "mainnet";
        case "bchtest":
          return "testnet";
        case "bchreg":
          return "regtest";
        default:
          throw new Error("Invalid prefix : " + decoded.prefix);
      }
    }

    // Detect address type.

  }, {
    key: "detectAddressType",
    value: function detectAddressType(address) {
      var decoded = this._decode(address);

      return decoded.type.toLowerCase();
    }
  }, {
    key: "fromXPub",
    value: function fromXPub(xpub) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "0/0";

      var HDNode = _bitcoincashjsLib2.default.HDNode.fromBase58(xpub, _bitcoincashjsLib2.default.networks[this.detectAddressNetwork(xpub)]);
      var address = HDNode.derivePath(path);
      return this.toCashAddress(address.getAddress());
    }
  }, {
    key: "fromOutputScript",
    value: function fromOutputScript(scriptPubKey) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "bitcoincash";

      var netParam = void 0;
      if (network !== "bitcoincash") netParam = _bitcoincashjsLib2.default.networks.testnet;

      var regtest = network === "bchreg";

      return this.toCashAddress(_bitcoincashjsLib2.default.address.fromOutputScript(scriptPubKey, netParam), true, regtest);
    }
  }, {
    key: "details",
    value: async function details(address) {
      try {
        // Handle single address.
        if (typeof address === "string") {
          var response = await _axios2.default.get(this.restURL + "address/details/" + address);

          return response.data;

          // Handle array of addresses.
        } else if (Array.isArray(address)) {
          var options = {
            method: "POST",
            url: this.restURL + "address/details",
            data: {
              addresses: address
            }
          };
          var _response = await (0, _axios2.default)(options);

          return _response.data;
        }

        throw new Error("Input address must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "utxo",
    value: async function utxo(address) {
      try {
        // Handle single address.
        if (typeof address === "string") {
          var response = await _axios2.default.get(this.restURL + "address/utxo/" + address);
          return response.data;
        } else if (Array.isArray(address)) {
          var options = {
            method: "POST",
            url: this.restURL + "address/utxo",
            data: {
              addresses: address
            }
          };
          var _response2 = await (0, _axios2.default)(options);

          return _response2.data;
        }

        throw new Error("Input address must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "unconfirmed",
    value: async function unconfirmed(address) {
      try {
        // Handle single address.
        if (typeof address === "string") {
          var response = await _axios2.default.get(this.restURL + "address/unconfirmed/" + address);
          return response.data;

          // Handle an array of addresses
        } else if (Array.isArray(address)) {
          var options = {
            method: "POST",
            url: this.restURL + "address/unconfirmed",
            data: {
              addresses: address
            }
          };
          var _response3 = await (0, _axios2.default)(options);

          return _response3.data;
        }

        throw new Error("Input address must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }, {
    key: "transactions",
    value: async function transactions(address) {
      try {
        // Handle single address.
        if (typeof address === "string") {
          var response = await _axios2.default.get(this.restURL + "address/transactions/" + address);
          return response.data;

          // Handle an array of addresses
        } else if (Array.isArray(address)) {
          var options = {
            method: "POST",
            url: this.restURL + "address/transactions",
            data: {
              addresses: address
            }
          };
          var _response4 = await (0, _axios2.default)(options);

          return _response4.data;
        }

        throw new Error("Input address must be a string or array of strings.");
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;else throw error;
      }
    }
  }]);

  return Address;
}();

exports.default = Address;