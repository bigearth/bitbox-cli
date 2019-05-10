"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schnorr = require("bip-schnorr");
var Schnorr = /** @class */ (function () {
    function Schnorr() {
    }
    Schnorr.prototype.sign = function (privateKey, message) {
        return schnorr.sign(privateKey, message);
    };
    Schnorr.prototype.verify = function (publicKey, message, signatureToVerify) {
        return schnorr.verify(publicKey, message, signatureToVerify);
    };
    Schnorr.prototype.batchVerify = function (publicKeys, messages, signaturesToVerify) {
        return schnorr.batchVerify(publicKeys, messages, signaturesToVerify);
    };
    Schnorr.prototype.nonInteractive = function (privateKeys, message) {
        return schnorr.muSig.nonInteractive(privateKeys, message);
    };
    Schnorr.prototype.computeEll = function (publicKeys) {
        return schnorr.muSig.computeEll(publicKeys);
    };
    Schnorr.prototype.publicKeyCombine = function (publicKeys, publicKeyHash) {
        return schnorr.muSig.pubKeyCombine(publicKeys, publicKeyHash);
    };
    Schnorr.prototype.sessionInitialize = function (sessionId, privateKey, message, pubKeyCombined, ell, idx) {
        return schnorr.muSig.sessionInitialize(sessionId, privateKey, message, pubKeyCombined, ell, idx);
    };
    Schnorr.prototype.sessionNonceCombine = function (session, nonces) {
        return schnorr.muSig.sessionNonceCombine(session, nonces);
    };
    Schnorr.prototype.partialSign = function (session, message, nonceCombined, pubKeyCombined) {
        return schnorr.muSig.partialSign(session, message, nonceCombined, pubKeyCombined);
    };
    Schnorr.prototype.partialSignatureVerify = function (session, partialSignature, nonceCombined, idx, pubKey, nonce) {
        return schnorr.muSig.partialSigVerify(session, partialSignature, nonceCombined, idx, pubKey, nonce);
    };
    Schnorr.prototype.partialSignaturesCombine = function (nonceCombined, partialSignatures) {
        return schnorr.muSig.partialSigCombine(nonceCombined, partialSignatures);
    };
    Schnorr.prototype.bufferToInt = function (buffer) {
        return schnorr.convert.bufferToInt(buffer);
    };
    Schnorr.prototype.intToBuffer = function (bigInteger) {
        return schnorr.convert.intToBuffer(bigInteger);
    };
    Schnorr.prototype.hash = function (buffer) {
        return schnorr.convert.hash(buffer);
    };
    Schnorr.prototype.pointToBuffer = function (point) {
        return schnorr.convert.pointToBuffer(point);
    };
    Schnorr.prototype.pubKeyToPoint = function (publicKey) {
        return schnorr.convert.pubKeyToPoint(publicKey);
    };
    return Schnorr;
}());
exports.Schnorr = Schnorr;
//# sourceMappingURL=Schnorr.js.map