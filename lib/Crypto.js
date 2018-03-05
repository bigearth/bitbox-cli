'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import bitcore from 'bitcore-lib';

var Crypto = function () {
  function Crypto() {
    _classCallCheck(this, Crypto);
  }

  _createClass(Crypto, null, [{
    key: 'createHash',

    // Utility class to wrap NodeJS's crypto module
    // https://nodejs.org/api/crypto.html
    value: function createHash(data) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'sha256';

      return _crypto2.default.createHash(type).update(data).digest().toString('hex');
    }
  }, {
    key: 'createSHA256Hash',
    value: function createSHA256Hash(data) {
      return _crypto2.default.createHash('sha256').update(data).digest().toString('hex');
    }
  }, {
    key: 'createRIPEMD160Hash',
    value: function createRIPEMD160Hash(data) {
      return _crypto2.default.createHash('ripemd160').update(data).digest().toString('hex');
    }
  }, {
    key: 'randomBytes',
    value: function randomBytes() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

      return _crypto2.default.randomBytes(size).toString('hex');
    }

    // static xpub(xpub, HDPath) {
    //   var HdPublicKey = new bitcore.HDPublicKey.fromString(xpub);
    //   var derivedPublicKey = HdPublicKey.derive(HDPath).publicKey;
    //   // for (let j = 0; j < 1; j++) {
    //     // console.log('asdasfd', j)
    //     // var derivedPublicKey = HdPublicKey.derive("m/0/"+j).publicKey;
    //     // var addy = derivedPublicKey.toAddress();
    //     // console.log('addy', BitcoinCash.toCashAddress(addy.toString()));
    //   // }
    //   return derivedPublicKey.toAddress().toString();
    // }

  }]);

  return Crypto;
}();

exports.default = Crypto;