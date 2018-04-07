'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _bitcoinOps = require('bitcoin-ops');

var _bitcoinOps2 = _interopRequireDefault(_bitcoinOps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Script = function () {
  function Script() {
    _classCallCheck(this, Script);

    this.opcodes = _bitcoinOps2.default;
  }

  _createClass(Script, [{
    key: 'decompile',
    value: function decompile(scriptBuffer) {
      return _bitcoinjsLib2.default.script.decompile(scriptBuffer);
    }
  }, {
    key: 'compile',
    value: function compile(scriptChunks) {
      var arr = [];
      scriptChunks.forEach(function (chunk) {
        arr.push(chunk);
      });
      return _bitcoinjsLib2.default.script.compile(arr);
    }
  }, {
    key: 'toASM',
    value: function toASM(buffer) {
      return _bitcoinjsLib2.default.script.toASM(buffer);
    }
  }, {
    key: 'fromASM',
    value: function fromASM(asm) {
      return _bitcoinjsLib2.default.script.fromASM(asm);
    }
  }]);

  return Script;
}();

exports.default = Script;