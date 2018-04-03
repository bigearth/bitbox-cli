'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Script = function () {
  function Script() {
    _classCallCheck(this, Script);
  }

  _createClass(Script, null, [{
    key: 'decompileBuffer',
    value: function decompileBuffer(scriptBuffer) {
      return _bitcoinjsLib2.default.script.decompile(scriptBuffer);
    }
  }, {
    key: 'decompileHex',
    value: function decompileHex(scriptHex) {
      return _bitcoinjsLib2.default.script.decompile(Buffer.from(scriptHex, 'hex'));
    }
  }, {
    key: 'bufferToASM',
    value: function bufferToASM(buffer) {
      return _bitcoinjsLib2.default.script.toASM(buffer);
    }
  }, {
    key: 'hexToASM',
    value: function hexToASM(hex) {
      return _bitcoinjsLib2.default.script.toASM(Buffer.from(hex, 'hex'));
    }
  }, {
    key: 'encodePubKeyHashBuffer',
    value: function encodePubKeyHashBuffer(pubKeyHashBuffer) {
      return _bitcoinjsLib2.default.script.pubKeyHash.output.encode(pubKeyHashBuffer);
    }
  }, {
    key: 'encodePubKeyHashHex',
    value: function encodePubKeyHashHex(pubKeyHashHex) {
      return _bitcoinjsLib2.default.script.pubKeyHash.output.encode(Buffer.from(pubKeyHashHex, 'hex'));
    }
  }]);

  return Script;
}();

exports.default = Script;