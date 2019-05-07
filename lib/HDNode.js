"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitcoin = require("bitcoincashjs-lib");
var coininfo = require("coininfo");
var bip32utils = require("bip32-utils");
var HDNode = /** @class */ (function () {
    function HDNode(address) {
        this._address = address;
    }
    HDNode.prototype.fromSeed = function (rootSeedBuffer, network) {
        if (network === void 0) { network = "mainnet"; }
        var bitcoincash;
        if (network === "bitcoincash" || network === "mainnet")
            bitcoincash = coininfo.bitcoincash.main;
        else
            bitcoincash = coininfo.bitcoincash.test;
        var bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS();
        return Bitcoin.HDNode.fromSeedBuffer(rootSeedBuffer, bitcoincashBitcoinJSLib);
    };
    HDNode.prototype.toLegacyAddress = function (hdNode) {
        return hdNode.getAddress();
    };
    HDNode.prototype.toCashAddress = function (hdNode, regtest) {
        if (regtest === void 0) { regtest = false; }
        return this._address.toCashAddress(hdNode.getAddress(), true, regtest);
    };
    HDNode.prototype.toWIF = function (hdNode) {
        return hdNode.keyPair.toWIF();
    };
    HDNode.prototype.toXPub = function (hdNode) {
        return hdNode.neutered().toBase58();
    };
    HDNode.prototype.toXPriv = function (hdNode) {
        return hdNode.toBase58();
    };
    HDNode.prototype.toKeyPair = function (hdNode) {
        return hdNode.keyPair;
    };
    HDNode.prototype.toPublicKey = function (hdNode) {
        return hdNode.getPublicKeyBuffer();
    };
    HDNode.prototype.fromXPriv = function (xpriv) {
        var bitcoincash;
        if (xpriv[0] === "x")
            bitcoincash = coininfo.bitcoincash.main;
        else if (xpriv[0] === "t")
            bitcoincash = coininfo.bitcoincash.test;
        var bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS();
        return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib);
    };
    HDNode.prototype.fromXPub = function (xpub) {
        var bitcoincash;
        if (xpub[0] === "x")
            bitcoincash = coininfo.bitcoincash.main;
        else if (xpub[0] === "t")
            bitcoincash = coininfo.bitcoincash.test;
        var bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS();
        return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib);
    };
    HDNode.prototype.derivePath = function (hdnode, path) {
        return hdnode.derivePath(path);
    };
    HDNode.prototype.derive = function (hdnode, path) {
        return hdnode.derive(path);
    };
    HDNode.prototype.deriveHardened = function (hdnode, path) {
        return hdnode.deriveHardened(path);
    };
    HDNode.prototype.sign = function (hdnode, buffer) {
        return hdnode.sign(buffer);
    };
    HDNode.prototype.verify = function (hdnode, buffer, signature) {
        return hdnode.verify(buffer, signature);
    };
    HDNode.prototype.isPublic = function (hdnode) {
        return hdnode.isNeutered();
    };
    HDNode.prototype.isPrivate = function (hdnode) {
        return !hdnode.isNeutered();
    };
    HDNode.prototype.toIdentifier = function (hdnode) {
        return hdnode.getIdentifier();
    };
    HDNode.prototype.fromBase58 = function (base58, network) {
        return Bitcoin.HDNode.fromBase58(base58, network);
    };
    HDNode.prototype.createAccount = function (hdNodes) {
        var arr = hdNodes.map(function (item, index) { return new bip32utils.Chain(item.neutered()); });
        return new bip32utils.Account(arr);
    };
    HDNode.prototype.createChain = function (hdNode) {
        return new bip32utils.Chain(hdNode);
    };
    return HDNode;
}());
exports.HDNode = HDNode;
