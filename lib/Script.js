'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoincashjsLib = require('bitcoincashjs-lib');

var _bitcoincashjsLib2 = _interopRequireDefault(_bitcoincashjsLib);

var _bitcoinOps = require('bitcoin-ops');

var _bitcoinOps2 = _interopRequireDefault(_bitcoinOps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Script = function () {
  function Script() {
    _classCallCheck(this, Script);

    this.opcodes = _bitcoinOps2.default;
    this.nullData = _bitcoincashjsLib2.default.script.nullData;
    this.multisig = {
      input: {
        encode: function encode(signatures) {
          var sigs = [];
          signatures.forEach(function (sig) {
            sigs.push(sig);
          });
          return _bitcoincashjsLib2.default.script.multisig.input.encode(sigs);
        },
        decode: _bitcoincashjsLib2.default.script.multisig.input.decode,
        check: _bitcoincashjsLib2.default.script.multisig.input.check
      },
      output: {
        encode: function encode(m, pubKeys) {
          var pks = [];
          pubKeys.forEach(function (pubKey) {
            pks.push(pubKey);
          });
          return _bitcoincashjsLib2.default.script.multisig.output.encode(m, pks);
        },
        decode: _bitcoincashjsLib2.default.script.multisig.output.decode,
        check: _bitcoincashjsLib2.default.script.multisig.output.check
      }
    };
    this.pubKey = _bitcoincashjsLib2.default.script.pubKey;
    this.pubKeyHash = _bitcoincashjsLib2.default.script.pubKeyHash;
    this.scriptHash = _bitcoincashjsLib2.default.script.scriptHash;
  }

  _createClass(Script, [{
    key: 'classifyInput',
    value: function classifyInput(script) {
      return _bitcoincashjsLib2.default.script.classifyInput(script);
    }
  }, {
    key: 'classifyOutput',
    value: function classifyOutput(script) {
      return _bitcoincashjsLib2.default.script.classifyOutput(script);
    }
  }, {
    key: 'decode',
    value: function decode(scriptBuffer) {
      return _bitcoincashjsLib2.default.script.decompile(scriptBuffer);
    }
  }, {
    key: 'encode',
    value: function encode(scriptChunks) {
      var arr = [];
      scriptChunks.forEach(function (chunk) {
        arr.push(chunk);
      });
      return _bitcoincashjsLib2.default.script.compile(arr);
    }
  }, {
    key: 'toASM',
    value: function toASM(buffer) {
      return _bitcoincashjsLib2.default.script.toASM(buffer);
    }
  }, {
    key: 'fromASM',
    value: function fromASM(asm) {
      return _bitcoincashjsLib2.default.script.fromASM(asm);
    }
  }]);

  return Script;
}();

exports.default = Script;