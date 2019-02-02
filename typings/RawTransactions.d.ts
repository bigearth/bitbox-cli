export interface RawTransactions {
  decodeRawTransaction(hex:string):Promise<any>;
  decodeScript(hex: string):Promise<any>;
  getRawTransaction(txids: string[]): Promise<string[]>;
  getRawTransaction(txids: string[], verbose:boolean): Promise<VerboseRawTransaction[]>; // verbose must be set to true
  sendRawTransaction(hex: string, allowhighfees?:boolean): Promise<string>;
}

export interface VerboseRawTransaction {
  hex: string;
  txid: string;
  size: number;
  version: number;
  locktime: number;
  vin: [{ coinbase: string; sequence: number }]
  vout: [{value: number; n: number; scriptPubKey: { asm: string; hex: string; reqSigs: number; type: string; addresses: string[] }}]
  blockhash: string;
  confirmations: number;
  time: number;
  blocktime: number;
}