import {Buffer} from 'buffer';

import { Transaction } from './Transaction';
import { ECPair } from './ECPair';

declare type ECSignature = any;

export declare interface ITransactionBuilder {
  // bitcoincash: coininfo.bitcoincash.main;
  // bitcoincashBitcoinJSLib: Bitcoin.toBitcoinJS;
  transaction: Transaction;
  DEFAULT_SEQUENCE: number;
  hashTypes: HashTypes;
  bip66 : any;
  bip68 : any;

  new(network?: string): ITransactionBuilder;
  
  addInput(txHash: string|Buffer, vout: number, sequence?: number, prevOutScript?: string): void;
  addOutput(scriptPubKey: string|Buffer, amount: number): void;
  sign(vin: number, keyPair: ECPair, redeemScript: Buffer | undefined, hashType: number, value: number): ECSignature;
  build(): Transaction;
}

declare interface HashTypes {
  SIGHASH_ALL: number;
  SIGHASH_NONE: number;
  SIGHASH_SINGLE: number;
  SIGHASH_ANYONECANPAY: number;
  SIGHASH_BITCOINCASH_BIP143: number;
}