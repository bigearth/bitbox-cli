import io from 'socket.io-client';

class Socket {
  constructor(config) {
    if(config.restURL) {
      this.socket = io(`${config.restURL}`);
    } else {
      let restURL = 'https://rest.bitbox.earth';
      this.socket = io(`${restURL}`);
    }
    
    if(config.callback) {
      config.callback();
    }
  }

  listen(endpoint, cb) {
    this.socket.emit(endpoint);

    this.socket.on('blocks', (msg) => {
      return cb(msg);
    });

    this.socket.on('transactions', (msg) => {
      return cb(msg);
    });
  }
}

export default Socket;
