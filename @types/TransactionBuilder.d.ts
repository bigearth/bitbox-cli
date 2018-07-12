import Bitcoin from 'bitcoincashjs-lib';
import bchaddr from 'bchaddrjs';
import coininfo from 'coininfo';
import bip66 from 'bip66';
import bip68 from 'bip68';

export default class TransactionBuilder {
  
  bitcoincash: coininfo.bitcoincash.main;
  bitcoincashBitcoinJSLib: Bitcoin.toBitcoinJS;
  transaction: Bitcoin.Transaction;
  DEFAULT_SEQUENCE:string;
  hashTypes:Enumerator;
  bip66 : bip66;
  bip68 : bip68;

  constructor(network:string);
  
  addInput(txHash:string, vout:string, sequence:string, prevOutScript:string):void;

  addOutput(scriptPubKey:string, amount:number):void;

  sign(vin:string, keyPair:string, redeemScript:string, hashType:Enumerator, value:any):void;

  build():Bitcoin.Transaction;
}