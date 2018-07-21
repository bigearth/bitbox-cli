import io from 'socket.io-client';
// import axios from 'axios';

class Socket {
  constructor() {
    this.socket = io('http://localhost:3001');
    this.socket.on('connect', this.onConnect.bind(this));
  }

  onConnect() {
    // this.socket.emit('chat message', 'winning');
    //
    // this.socket.on('chat message', (msg) => {
    //   console.log('message ', msg);
    // });
  }

  listen(endpoint) {
    this.socket.emit(endpoint);

    this.socket.on('block', (msg) => {
      console.log(msg);
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
}

export default Socket;
