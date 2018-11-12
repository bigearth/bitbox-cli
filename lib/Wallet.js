"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _web3bch = require("web3bch.js");

var _web3bch2 = _interopRequireDefault(_web3bch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wallet = function () {
  function Wallet(walletProvider) {
    _classCallCheck(this, Wallet);

    this.web3bch = new _web3bch2.default(walletProvider);
  }

  _createClass(Wallet, [{
    key: "setWalletProvider",
    value: function setWalletProvider(walletProvider) {
      this.web3bch.walletProvider = walletProvider;
    }
  }, {
    key: "getAddress",
    value: function getAddress(changeType, index, dAppId) {
      return this.web3bch.getAddress(changeType, index, dAppId);
    }
  }, {
    key: "getAddressIndex",
    value: function getAddressIndex(changeType, dAppId) {
      return this.web3bch.getAddressIndex(changeType, dAppId);
    }
  }, {
    key: "getAddresses",
    value: function getAddresses(changeType, startIndex, size, dAppId) {
      return this.web3bch.getAddresses(changeType, startIndex, size, dAppId);
    }
  }, {
    key: "getRedeemScript",
    value: function getRedeemScript(p2shAddress, dAppId) {
      return this.web3bch.getRedeemScript(p2shAddress, dAppId);
    }
  }, {
    key: "getRedeemScripts",
    value: function getRedeemScripts(dAppId) {
      return this.web3bch.getRedeemScripts(dAppId);
    }
  }, {
    key: "addRedeemScript",
    value: function addRedeemScript(redeemScript, dAppId) {
      return this.web3bch.addRedeemScript(redeemScript, dAppId);
    }
  }, {
    key: "getUtxos",
    value: function getUtxos(dAppId) {
      return this.web3bch.getUtxos(dAppId);
    }
  }, {
    key: "getBalance",
    value: function getBalance(dAppId) {
      return this.web3bch.getBalance(dAppId);
    }
  }, {
    key: "sign",
    value: function sign(address, dataToSign) {
      return this.web3bch.sign(address, dataToSign);
    }
  }, {
    key: "buildTransaction",
    value: function buildTransaction(outputs, dAppId) {
      return this.web3bch.buildTransaction(outputs, dAppId);
    }
  }, {
    key: "getProtocolVersion",
    value: function getProtocolVersion() {
      return this.web3bch.getProtocolVersion();
    }
  }, {
    key: "getNetwork",
    value: function getNetwork() {
      return this.web3bch.getNetwork();
    }
  }, {
    key: "getFeePerByte",
    value: function getFeePerByte() {
      return this.web3bch.getFeePerByte();
    }
  }, {
    key: "getDefaultDAppId",
    value: function getDefaultDAppId() {
      return this.web3bch.getDefaultDAppId();
    }
  }, {
    key: "setDefaultDAppId",
    value: function setDefaultDAppId(dAppId) {
      return this.web3bch.setDefaultDAppId(dAppId);
    }
  }]);

  return Wallet;
}();

exports.default = Wallet;