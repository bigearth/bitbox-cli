import io from 'socket.io-client';

class Socket {
  constructor() {
    this.socket = io('http://localhost:3001');
  }

  listen(endpoint, cb) {
    this.socket.emit(endpoint);

    this.socket.on('block', (msg) => {
      return cb(msg);
    });

    this.socket.on('rawtx', (msg) => {
      return cb(msg);
    });
  }
}

export default Socket;
