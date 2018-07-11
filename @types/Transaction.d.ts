import Bitcoin from 'bitcoincashjs-lib';
import axios from 'axios';

export default class Transaction {
  constructor(restURL:string);

  transaction() {
    return new Bitcoin.Transaction();
  }

  fromHex(hex:string):string;

  transactionBuilder(network:string) {
    return new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
  }

  fromTransaction(tx) {
    return Bitcoin.TransactionBuilder.fromTransaction(tx);
  }

  details(txid:string):any;
}