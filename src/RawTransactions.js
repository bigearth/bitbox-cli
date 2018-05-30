import axios from 'axios';
class RawTransactions {
  constructor(restBaseURL) {
    this.restBaseURL = restBaseURL;
  }

  decodeRawTransaction(hex) {
    // decodes a serialized transaction hex string into a JSON object describing the transaction.

    // Parameter #1—serialized transaction in hex

    // Result—the decoded transaction

    return axios.get(`${this.restBaseURL}rawtransactions/decodeRawTransaction/${hex}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  decodeScript(hex) {
    // decodes a hex-encoded P2SH redeem script.

    // Parameter #1—a hex-encoded redeem script

    // Result—the decoded script
    // console.log('decode script called *****', redeemScript)

    return axios.get(`${this.restBaseURL}rawtransactions/decodeScript/${hex}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  getRawTransaction(txid, verbose = false) {
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

    return axios.get(`${this.restBaseURL}rawtransactions/getRawTransaction/${txid}?verbose=${verbose}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  sendRawTransaction(hex, allowhighfees = false) {
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

    return axios.post(`${this.restBaseURL}rawtransactions/sendRawTransaction/${hex}?allowhighfees=${allowhighfees}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default RawTransactions;
