import { Transaction } from './Transaction';
import { ECPair } from './ECPair';

declare type ECSignature = any;

export declare class TransactionBuilder {
  // bitcoincash: coininfo.bitcoincash.main;
  // bitcoincashBitcoinJSLib: Bitcoin.toBitcoinJS;
  transaction: Transaction;
  DEFAULT_SEQUENCE: number;
  hashTypes: HashTypes;
  bip66 : any;
  bip68 : any;

  constructor(network: string);
  
  addInput(txHash: string|Buffer, vout: number, sequence?: number, prevOutScript?: string): void;
  addOutput(scriptPubKey: string|Buffer, amount: number): void;
  sign(vin: number, keyPair: ECPair, redeemScript: Buffer, hashType: number, value: number): ECSignature;
  build(): Transaction;
}

declare interface HashTypes {
  SIGHASH_ALL: number;
  SIGHASH_NONE: number;
  SIGHASH_SINGLE: number;
  SIGHASH_ANYONECANPAY: number;
  SIGHASH_BITCOINCASH_BIP143: number;
}