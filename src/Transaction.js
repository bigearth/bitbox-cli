import Bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

class Transaction {
  static transaction() {
    return new Bitcoin.Transaction();
  }

  static fromHex(hex) {
    return Bitcoin.Transaction.fromHex(hex);
  }

  static transactionBuilder(network = 'bitcoin') {
    return new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
  }

  static fromTransaction(tx) {
    return Bitcoin.TransactionBuilder.fromTransaction(tx);
  }

  static details(txid) {
    return axios.get(`https://explorer.bitcoin.com/api/bch/tx/${txid}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Transaction;
