import io from 'socket.io-client';

class Socket {
  constructor(restURL = 'https://rest.bitbox.earth', port = '3001') {
    this.socket = io(`${restURL}:${port}`);
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
