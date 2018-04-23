'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

var _satoshiBitcoin = require('satoshi-Bitcoin');

var _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);

var _BitcoinjsMessage = require('Bitcoinjs-message');

var _BitcoinjsMessage2 = _interopRequireDefault(_BitcoinjsMessage);

var _bs = require('bs58');

var _bs2 = _interopRequireDefault(_bs);

var _bip = require('bip21');

var _bip2 = _interopRequireDefault(_bip);

var _bigi = require('bigi');

var _bigi2 = _interopRequireDefault(_bigi);

var _ecurve = require('ecurve');

var _ecurve2 = _interopRequireDefault(_ecurve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secp256k1 = _ecurve2.default.getCurveByName('secp256k1');
var G = secp256k1.G;
var n = secp256k1.n;

var Stealth = function () {
  function Stealth() {
    _classCallCheck(this, Stealth);
  }

  _createClass(Stealth, [{
    key: 'send',

    // From https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/stealth.js

    // vG = (dG \+ sha256(e * dG)G)
    value: function send(e, Q) {
      var eQ = Q.multiply(e); // shared secret
      var c = _bigi2.default.fromBuffer(_bitcoinjsLib2.default.crypto.sha256(eQ.getEncoded()));
      var cG = G.multiply(c);
      var vG = new _bitcoinjsLib2.default.ECPair(null, Q.add(cG));

      return vG;
    }

    // v = (d + sha256(eG * d))

  }, {
    key: 'receive',
    value: function receive(d, eG) {
      var eQ = eG.multiply(d); // shared secret
      var c = _bigi2.default.fromBuffer(_bitcoinjsLib2.default.crypto.sha256(eQ.getEncoded()));
      var v = new _bitcoinjsLib2.default.ECPair(d.add(c).mod(n));

      return v;
    }
    //
    // // d = (v - sha256(e * dG))
    // recoverLeaked (receive, send, receiver) {
    //   let v = receive.d;
    //   let e = send.d;
    //   let Q = receiver.Q;
    //   let eQ = Q.multiply(e); // shared secret
    //   let c = bigi.fromBuffer(Bitcoin.crypto.sha256(eQ.getEncoded()));
    //   let d = new Bitcoin.ECPair(v.subtract(c).mod(n));
    //
    //   return d;
    // }

    // vG = (rG \+ sha256(e * dG)G)

  }, {
    key: 'sendDual',
    value: function sendDual(sender, receiver, scan) {
      var e = sender.d;
      var R = receiver.Q;
      var Q = scan.Q;
      var eQ = Q.multiply(e); // shared secret
      var c = _bigi2.default.fromBuffer(_bitcoinjsLib2.default.crypto.sha256(eQ.getEncoded()));
      var cG = G.multiply(c);
      var vG = new _bitcoinjsLib2.default.ECPair(null, R.add(cG));
      return vG;
    }

    // vG = (rG \+ sha256(eG * d)G)

  }, {
    key: 'scanDual',
    value: function scanDual(scan, receiver, sender) {
      var d = scan.d;
      var R = receiver.Q;
      var eG = sender.Q;
      var eQ = eG.multiply(d); // shared secret
      var c = _bigi2.default.fromBuffer(_bitcoinjsLib2.default.crypto.sha256(eQ.getEncoded()));
      var cG = G.multiply(c);
      var vG = new _bitcoinjsLib2.default.ECPair(null, R.add(cG));
      return vG;
    }

    // v = (r + sha256(eG * d))

  }, {
    key: 'receiveDual',
    value: function receiveDual(scan, receiver, send) {
      var d = scan.d;
      var r = receiver.d;
      var eG = send.Q;
      var eQ = eG.multiply(d); // shared secret
      var c = _bigi2.default.fromBuffer(_bitcoinjsLib2.default.crypto.sha256(eQ.getEncoded()));
      var v = new _bitcoinjsLib2.default.ECPair(r.add(c).mod(n));
      return v;
    }
  }, {
    key: 'toCashAddress',
    value: function toCashAddress(stealth) {
      return _bchaddrjs2.default.toCashAddress(stealth.getAddress());
    }
  }, {
    key: 'toLegacyAddress',
    value: function toLegacyAddress(stealth) {
      return stealth.getAddress();
    }
  }]);

  return Stealth;
}();

exports.default = Stealth;