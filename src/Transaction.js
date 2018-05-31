import Bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

class Transaction {
  constructor(restURL) {
    this.restURL = restURL;
  }

  transaction() {
    return new Bitcoin.Transaction();
  }

  fromHex(hex) {
    return Bitcoin.Transaction.fromHex(hex);
  }

  transactionBuilder(network = 'bitcoin') {
    return new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
  }

  fromTransaction(tx) {
    return Bitcoin.TransactionBuilder.fromTransaction(tx);
  }

  details(txid) {
    if(typeof txid !== 'string') {
      txid = JSON.stringify(txid);
    }

    return axios.get(`${this.restURL}transaction/details/${txid}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Transaction;
