import io from 'socket.io-client';

class Socket {
  constructor(restURL = 'https://rest.bitbox.earth') {
    this.socket = io(`${restURL}`);
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
