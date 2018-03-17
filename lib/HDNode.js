'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HDNode = function (_Bitcoin$HDNode) {
  _inherits(HDNode, _Bitcoin$HDNode);

  function HDNode() {
    _classCallCheck(this, HDNode);

    return _possibleConstructorReturn(this, (HDNode.__proto__ || Object.getPrototypeOf(HDNode)).apply(this, arguments));
  }

  _createClass(HDNode, null, [{
    key: 'fromSeedBuffer',
    value: function fromSeedBuffer(rootSeedBuffer) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bitcoin';

      return _get(HDNode.__proto__ || Object.getPrototypeOf(HDNode), 'fromSeedBuffer', this).call(this, rootSeedBuffer, _bitcoinjsLib2.default.networks[network]);
    }
  }, {
    key: 'fromSeedHex',
    value: function fromSeedHex(rootSeedHex) {
      var network = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'bitcoin';

      return _get(HDNode.__proto__ || Object.getPrototypeOf(HDNode), 'fromSeedBuffer', this).call(this, Buffer.from(rootSeedHex, 'hex'), _bitcoinjsLib2.default.networks[network]);
    }
  }, {
    key: 'toXPub',
    value: function toXPub(hdNode) {
      return hdNode.neutered().toBase58();
    }
  }, {
    key: 'toXPriv',
    value: function toXPriv(hdNode) {
      return hdNode.toBase58();
    }
  }]);

  return HDNode;
}(_bitcoinjsLib2.default.HDNode);

exports.default = HDNode;