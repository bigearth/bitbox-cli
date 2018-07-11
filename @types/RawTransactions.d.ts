import axios from 'axios';
export default class RawTransactions {
  constructor(restURL:string);

  decodeRawTransaction(hex:string):any;

  decodeScript(hex:string):any;

  getRawTransaction(txid:string, verbose?:boolean):any;

  sendRawTransaction(hex:string, allowhighfees?:boolean):any;
}


