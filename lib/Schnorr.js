"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bipSchnorr = require("bip-schnorr");

var _bipSchnorr2 = _interopRequireDefault(_bipSchnorr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Schnorr = function () {
  function Schnorr(restURL) {
    _classCallCheck(this, Schnorr);

    this.restURL = restURL;
  }

  _createClass(Schnorr, [{
    key: "sign",
    value: function sign(privateKey, message) {
      return _bipSchnorr2.default.sign(privateKey, message);
    }
  }, {
    key: "verify",
    value: function verify(publicKey, message, signatureToVerify) {
      return _bipSchnorr2.default.verify(publicKey, message, signatureToVerify);
    }
  }, {
    key: "batchVerify",
    value: function batchVerify(publicKeys, messages, signaturesToVerify) {
      return _bipSchnorr2.default.batchVerify(publicKeys, messages, signaturesToVerify);
    }
  }, {
    key: "nonInteractive",
    value: function nonInteractive(privateKeys, message) {
      return _bipSchnorr2.default.muSig.nonInteractive(privateKeys, message);
    }
  }, {
    key: "computeEll",
    value: function computeEll(publicKeys) {
      return _bipSchnorr2.default.muSig.computeEll(publicKeys);
    }
  }, {
    key: "publicKeyCombine",
    value: function publicKeyCombine(publicKeys, publicKeyHash) {
      return _bipSchnorr2.default.muSig.pubKeyCombine(publicKeys, publicKeyHash);
    }
  }, {
    key: "sessionInitialize",
    value: function sessionInitialize(sessionId, privateKey, message, pubKeyCombined, ell, idx) {
      return _bipSchnorr2.default.muSig.sessionInitialize(sessionId, privateKey, message, pubKeyCombined, ell, idx);
    }
  }, {
    key: "sessionNonceCombine",
    value: function sessionNonceCombine(session, nonces) {
      return _bipSchnorr2.default.muSig.sessionNonceCombine(session, nonces);
    }
  }, {
    key: "partialSign",
    value: function partialSign(session, message, nonceCombined, pubKeyCombined) {
      return _bipSchnorr2.default.muSig.partialSign(session, message, nonceCombined, pubKeyCombined);
    }
  }, {
    key: "partialSignatureVerify",
    value: function partialSignatureVerify(session, partialSignature, nonceCombined, idx, pubKey, nonce) {
      return _bipSchnorr2.default.muSig.partialSigVerify(session, partialSignature, nonceCombined, idx, pubKey, nonce);
    }
  }, {
    key: "partialSignaturesCombine",
    value: function partialSignaturesCombine(nonceCombined, partialSignatures) {
      return _bipSchnorr2.default.muSig.partialSigCombine(nonceCombined, partialSignatures);
    }
  }, {
    key: "bufferToInt",
    value: function bufferToInt(buffer) {
      return _bipSchnorr2.default.convert.bufferToInt(buffer);
    }
  }, {
    key: "intToBuffer",
    value: function intToBuffer(bigInteger) {
      return _bipSchnorr2.default.convert.intToBuffer(bigInteger);
    }
  }, {
    key: "hash",
    value: function hash(buffer) {
      return _bipSchnorr2.default.convert.hash(buffer);
    }
  }, {
    key: "pointToBuffer",
    value: function pointToBuffer(point) {
      return _bipSchnorr2.default.convert.pointToBuffer(point);
    }
  }, {
    key: "pubKeyToPoint",
    value: function pubKeyToPoint(publicKey) {
      return _bipSchnorr2.default.convert.pubKeyToPoint(publicKey);
    }
  }]);

  return Schnorr;
}();

exports.default = Schnorr;