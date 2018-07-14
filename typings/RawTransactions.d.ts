export declare interface RawTransactions {
  //constructor(restURL:string);
  decodeRawTransaction(hex:string):Promise<any>;
  decodeScript(hex: string):Promise<any>;
  getRawTransaction(txid: string, verbose?:boolean): Promise<string>;
  sendRawTransaction(hex: string, allowhighfees?:boolean): Promise<string>;
}