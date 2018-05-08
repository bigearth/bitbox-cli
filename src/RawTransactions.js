import axios from 'axios';
class RawTransactions {
  constructor(config, baseURL) {
    this.config = config;
    this.baseURL = baseURL;
  }

  decodeRawTransaction(rawHex) {
    // decodes a serialized transaction hex string into a JSON object describing the transaction.

    // Parameter #1—serialized transaction in hex

    // Result—the decoded transaction

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"decoderawtransaction",
      method: "decoderawtransaction",
      params: [
        rawHex
      ]
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

  decodeScript(redeemScript) {
    // decodes a hex-encoded P2SH redeem script.

    // Parameter #1—a hex-encoded redeem script

    // Result—the decoded script
    // console.log('decode script called *****', redeemScript)

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"decodescript",
      method: "decodescript",
      params: [
        redeemScript
      ]
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

  getRawTransaction(txid, verbose) {
    // NOTE: By default this function only works for mempool transactions. If the -txindex option is
    // enabled, it also works for blockchain transactions.
    // DEPRECATED: for now, it also works for transactions with unspent outputs.
    //
    // Return the raw transaction data.
    //
    // If verbose is 'true', returns an Object with information about 'txid'.
    // If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.
    //
    // Arguments:
    // 1. "txid"      (string, required) The transaction id
    // 2. verbose       (bool, optional, default=false) If false, return a string, otherwise return a json object
    //
    // Result (if verbose is not set or set to false):
    // "data"      (string) The serialized, hex-encoded data for 'txid'

    let params;
    if(!verbose) {
      params = [
        txid
      ];
    } else {
      params = [
        txid,
        verbose
      ];
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"getrawtransaction",
      method: "getrawtransaction",
      params: params
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

  sendRawTransaction(hexstring, allowhighfees) {
    // Submits raw transaction (serialized, hex-encoded) to local node and network.
    //
    // Also see createrawtransaction and signrawtransaction calls.
    //
    // Arguments:
    // 1. "hexstring"    (string, required) The hex string of the raw transaction)
    // 2. allowhighfees    (boolean, optional, default=false) Allow high fees
    //
    // Result:
    // "hex"             (string) The transaction hash in hex
    //

    let params = [];
    if(hexstring) {
      params.push(hexstring);
    }

    if(allowhighfees) {
      params.push(allowhighfees);
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"sendrawtransaction",
      method: "sendrawtransaction",
      params: params
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

export default RawTransactions;
