"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import BCHWalletBridge from "bch-wallet-bridge.js"
var Wallet = function () {
  function Wallet(walletProvider) {
    // this.bchWalletBridge = new BCHWalletBridge(walletProvider)

    _classCallCheck(this, Wallet);
  }

  _createClass(Wallet, [{
    key: "setWalletProvider",
    value: function setWalletProvider(walletProvider) {
      this.bchWalletBridge.walletProvider = walletProvider;
    }
  }, {
    key: "getAddress",
    value: function getAddress(changeType, index, dAppId) {
      return this.bchWalletBridge.getAddress(changeType, index, dAppId);
    }
  }, {
    key: "getAddressIndex",
    value: function getAddressIndex(changeType, dAppId) {
      return this.bchWalletBridge.getAddressIndex(changeType, dAppId);
    }
  }, {
    key: "getAddresses",
    value: function getAddresses(changeType, startIndex, size, dAppId) {
      return this.bchWalletBridge.getAddresses(changeType, startIndex, size, dAppId);
    }
  }, {
    key: "getRedeemScript",
    value: function getRedeemScript(p2shAddress, dAppId) {
      return this.bchWalletBridge.getRedeemScript(p2shAddress, dAppId);
    }
  }, {
    key: "getRedeemScripts",
    value: function getRedeemScripts(dAppId) {
      return this.bchWalletBridge.getRedeemScripts(dAppId);
    }
  }, {
    key: "addRedeemScript",
    value: function addRedeemScript(redeemScript, dAppId) {
      return this.bchWalletBridge.addRedeemScript(redeemScript, dAppId);
    }
  }, {
    key: "getUtxos",
    value: function getUtxos(dAppId) {
      return this.bchWalletBridge.getUtxos(dAppId);
    }
  }, {
    key: "getBalance",
    value: function getBalance(dAppId) {
      return this.bchWalletBridge.getBalance(dAppId);
    }
  }, {
    key: "sign",
    value: function sign(address, dataToSign) {
      return this.bchWalletBridge.sign(address, dataToSign);
    }
  }, {
    key: "buildTransaction",
    value: function buildTransaction(outputs, dAppId) {
      return this.bchWalletBridge.buildTransaction(outputs, dAppId);
    }
  }, {
    key: "getProtocolVersion",
    value: function getProtocolVersion() {
      return this.bchWalletBridge.getProtocolVersion();
    }
  }, {
    key: "getNetwork",
    value: function getNetwork() {
      return this.bchWalletBridge.getNetwork();
    }
  }, {
    key: "getFeePerByte",
    value: function getFeePerByte() {
      return this.bchWalletBridge.getFeePerByte();
    }
  }, {
    key: "getDefaultDAppId",
    value: function getDefaultDAppId() {
      return this.bchWalletBridge.getDefaultDAppId();
    }
  }, {
    key: "setDefaultDAppId",
    value: function setDefaultDAppId(dAppId) {
      return this.bchWalletBridge.setDefaultDAppId(dAppId);
    }
  }]);

  return Wallet;
}();

exports.default = Wallet;