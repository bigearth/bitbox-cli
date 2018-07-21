'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import axios from 'axios';

var Socket = function () {
  function Socket() {
    _classCallCheck(this, Socket);

    this.socket = (0, _socket2.default)('http://localhost:3001');
    this.socket.on('connect', this.onConnect.bind(this));
  }

  _createClass(Socket, [{
    key: 'onConnect',
    value: function onConnect() {
      this.socket.emit('chat message', 'winning');

      this.socket.on('chat message', function (msg) {
        console.log('message ', msg);
      });
    }
  }, {
    key: 'listen',
    value: function listen(foo, address) {
      return axios.get(this.restURL + 'address/foobar/' + address).then(function (response) {
        return response.data;
      }).catch(function (error) {
        return JSON.stringify(error.response.data.error.message);
      });

      this.socket.emit(foo, address);

      this.socket.on(foo, function (msg) {
        console.log(foo, msg);
      });
    }
    // current(currency = 'all') {
    //   return axios.get(`https://www.blocktrail.com/BCC/json/blockchain/Socket`)
    //   .then((response) => {
    //     if(currency === 'all') {
    //       return response.data;
    //     } else {
    //       return response.data[currency.toUpperCase()];
    //     }
    //   })
    //   .catch((error) => {
    //     return JSON.stringify(error.response.data.error.message);
    //   });
    // }

  }]);

  return Socket;
}();

exports.default = Socket;