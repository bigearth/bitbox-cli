import axios from 'axios';
class Control {
  constructor(config, baseURL) {
    this.config = config;
    this.baseURL = baseURL;
  }

  getInfo() {
    // DEPRECATED. Returns an object containing various state info.
    //
    // Result:
    // {
    //   "version": xxxxx,           (numeric) the server version
    //   "protocolversion": xxxxx,   (numeric) the protocol version
    //   "walletversion": xxxxx,     (numeric) the wallet version
    //   "balance": xxxxxxx,         (numeric) the total bitcoin balance of the wallet
    //   "blocks": xxxxxx,           (numeric) the current number of blocks processed in the server
    //   "timeoffset": xxxxx,        (numeric) the time offset
    //   "connections": xxxxx,       (numeric) the number of connections
    //   "proxy": "host:port",     (string, optional) the proxy used by the server
    //   "difficulty": xxxxxx,       (numeric) the current difficulty
    //   "testnet": true|false,      (boolean) if the server is using testnet or not
    //   "keypoololdest": xxxxxx,    (numeric) the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
    //   "keypoolsize": xxxx,        (numeric) how many new keys are pre-generated
    //   "unlocked_until": ttt,      (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
    //   "paytxfee": x.xxxx,         (numeric) the transaction fee set in BCH/kB
    //   "relayfee": x.xxxx,         (numeric) minimum relay fee for non-free transactions in BCH/kB
    //   "errors": "..."           (string) any error messages
    // }

    return axios.get(`${this.baseURL}control/getInfo`)
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  getMemoryInfo() {

    // Returns an object containing information about memory usage.
    //
    // Result:
    // {
    //   "locked": {               (json object) Information about locked memory manager
    //     "used": xxxxx,          (numeric) Number of bytes used
    //     "free": xxxxx,          (numeric) Number of bytes available in current arenas
    //     "total": xxxxxxx,       (numeric) Total number of bytes managed
    //     "locked": xxxxxx,       (numeric) Amount of bytes that succeeded locking. If this number is smaller than total, locking pages failed at some point and key data could be swapped to disk.
    //     "chunks_used": xxxxx,   (numeric) Number allocated chunks
    //     "chunks_free": xxxxx,   (numeric) Number unused chunks
    //   }
    // }
    //

    return axios.get(`${this.baseURL}control/getMemoryInfo`)
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  stop() {
    // Stop Bitcoin Cash server.
    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"stop",
      method: "stop",
      params: []
    }, {
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Control;
