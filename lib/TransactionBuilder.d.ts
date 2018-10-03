import {Buffer} from 'buffer';

import { Transaction } from './Transaction';
import { ECPair } from './ECPair';

declare type ECSignature = any;

export declare interface TransactionBuilder {
  // bitcoincash: coininfo.bitcoincash.main;
  // bitcoincashBitcoinJSLib: Bitcoin.toBitcoinJS;
  transaction: any;
  DEFAULT_SEQUENCE: number;
  hashTypes: HashTypes;
  bip66 : any;
  bip68 : any;

  new(network?: string): TransactionBuilder;

  addInput(txHash: string|Buffer, vout: number, sequence?: number, prevOutScript?: string): void;
  addInputScript(vout: number, script: Buffer): void;
  addOutput(scriptPubKey: string|Buffer, amount: number): void;
  sign(vin: number, keyPair: ECPair, redeemScript: Buffer | undefined, hashType: number, value: number): ECSignature;
  build(): any;
}

declare interface HashTypes {
  SIGHASH_ALL: number;
  SIGHASH_NONE: number;
  SIGHASH_SINGLE: number;
  SIGHASH_ANYONECANPAY: number;
  SIGHASH_BITCOINCASH_BIP143: number;
}