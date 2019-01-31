import {Buffer} from 'buffer';

import { TransactionBuilder } from './TransactionBuilder';
export declare interface Transaction {
  //constructor(restURL: string);
  transaction(): any;
  fromHex(hex: string): any;
  transactionBuilder(network: string): any;
  fromTransaction(tx: any): any;
  details(txids: string[]): Promise<TxnDetails[]>;
}

declare interface TxnDetails{
  txid: string;
  version: number;
  locktime: number;
  vin: object[];
  vout: object[];
  blockhash: string;
  blockheight: number;
  confirmations: number;
  time: number;
  blocktime: number;
  isCoinBase: boolean;
  valueOut: number;
  size: number;
}