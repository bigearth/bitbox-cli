import io from 'socket.io-client';

class Socket {
  constructor() {
    this.socket = io('http://localhost:3001');
  }

  listen(endpoint) {
    this.socket.emit(endpoint);

    this.socket.on('block', (msg) => {
      return msg;
    });

    this.socket.on('rawtx', (msg) => {
      return msg;
    });
  }
}

export default Socket;
