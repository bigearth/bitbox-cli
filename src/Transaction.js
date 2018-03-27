import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';
import sb from 'satoshi-bitcoin';
import bitcoinMessage from 'bitcoinjs-message';
import bs58 from 'bs58';
import bip21 from 'bip21';

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
}

export default Transaction;
