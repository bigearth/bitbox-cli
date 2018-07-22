'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Socket = function () {
  function Socket() {
    var restURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://rest.bitbox.earth';

    _classCallCheck(this, Socket);

    this.socket = (0, _socket2.default)('' + restURL);
  }

  _createClass(Socket, [{
    key: 'listen',
    value: function listen(endpoint, cb) {
      this.socket.emit(endpoint);

      this.socket.on('block', function (msg) {
        return cb(msg);
      });

      this.socket.on('rawtx', function (msg) {
        return cb(msg);
      });
    }
  }]);

  return Socket;
}();

exports.default = Socket;