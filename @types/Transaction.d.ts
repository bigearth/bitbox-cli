import { TransactionBuilder } from './TransactionBuilder';
export declare class Transaction {
  constructor(restURL: string);
  transaction(): Transaction;
  toHex(): string;
  fromHex(hex: string): string;
  transactionBuilder(network: string): TransactionBuilder;
  fromTransaction(tx: Transaction): TransactionBuilder;
  details(txid: string| string[]): Promise<TxnDetails | TxnDetails[]>;

  // lower level methods
  buildIncomplete(): Transaction;
  hashForWitnessV0(idx: number, script: Buffer, amount: number, hashType: number): number;
  setInputScript(idx: number, scriptSig: Buffer): void;
}

declare class TxnDetails{
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