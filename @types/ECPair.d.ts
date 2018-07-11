import Bitcoin from 'bitcoincashjs-lib';
import bchaddr from 'bchaddrjs';
import coininfo from'coininfo';

export default class ECPair {
  static fromWIF(privateKeyWIF:string): string;
  static toWIF(ecpair:ECPair):string; 

  static sign(ecpair:ECPair, buffer:string):string; 

  static verify(ecpair:ECPair, buffer:string, signature:string):string; 

  static fromPublicKey(pubkeyBuffer:string):string; 

  static toPublicKey(ecpair:ECPair):string; 
  
  static toLegacyAddress(ecpair:ECPair):string; 

  static toCashAddress(ecpair:ECPair):string; 
}