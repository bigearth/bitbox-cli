"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitcoin = require("bitcoincashjs-lib");
var coininfo = require("coininfo");
var ECPair = /** @class */ (function () {
    function ECPair() {
    }
    ECPair.setAddress = function (address) {
        ECPair._address = address;
    };
    ECPair.fromWIF = function (privateKeyWIF) {
        var network;
        if (privateKeyWIF[0] === "L" || privateKeyWIF[0] === "K")
            network = "mainnet";
        else if (privateKeyWIF[0] === "c")
            network = "testnet";
        var bitcoincash;
        if (network === "mainnet")
            bitcoincash = coininfo.bitcoincash.main;
        else
            bitcoincash = coininfo.bitcoincash.test;
        var bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS();
        return Bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoincashBitcoinJSLib);
    };
    ECPair.toWIF = function (ecpair) {
        return ecpair.toWIF();
    };
    ECPair.sign = function (ecpair, buffer) {
        return ecpair.sign(buffer);
    };
    ECPair.verify = function (ecpair, buffer, signature) {
        return ecpair.verify(buffer, signature);
    };
    ECPair.fromPublicKey = function (pubkeyBuffer) {
        return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer);
    };
    ECPair.toPublicKey = function (ecpair) {
        return ecpair.getPublicKeyBuffer();
    };
    ECPair.toLegacyAddress = function (ecpair) {
        return ecpair.getAddress();
    };
    ECPair.toCashAddress = function (ecpair, regtest) {
        if (regtest === void 0) { regtest = false; }
        return ECPair._address.toCashAddress(ecpair.getAddress(), true, regtest);
    };
    return ECPair;
}());
exports.ECPair = ECPair;
