import Bitcoin from 'bitcoincashjs-lib';
import axios from 'axios';

export default class Transaction {
  constructor(restURL:string);

  transaction():Bitcoin.Transaction;
  fromHex(hex:string):string;

  transactionBuilder(network:string):Bitcoin.TransactionBuilder;

  fromTransaction(tx:Bitcoin.Transaction):Bitcoin.TransactionBuilder;

  details(txid:string):any;
}