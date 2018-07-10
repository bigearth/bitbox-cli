import Bitcoin from 'bitcoincashjs-lib';
import bchaddr from 'bchaddrjs';
import sb from 'satoshi-bitcoin';
import bitcoinMessage from 'bitcoinjs-message';
import bs58 from 'bs58';
import bip21 from 'bip21';
import coininfo from'coininfo';
import bip38 from 'bip38';
import wif from 'wif';

//let Buffer = require('safe-buffer').Buffer;

export default class BitcoinCash {
  // Translate coins to satoshi value
  toSatoshi(coins:number):number;
  // Translate satoshi to coin value
  toBitcoinCash(satoshis:number):number;
  // Translate satoshi to bits denomination
  toBits(satoshis:number):number;

  // Translate satoshi to bits denomination
  // TODO remove in 2.0
  satsToBits(satoshis:number):number;

  // Translate bits to satoshi denomination
  // TODO remove in 2.0
  // fromBits(bits) {
  //   return this.toInteger(bits * 100);
  // }
  //
  // // Translate bits to satoshi denomination
  // satsFromBits(bits) {
  //   return this.toInteger(bits * 100);
  // }
  //
  // toInteger(number){
  //   return Math.round(  // round to nearest integer
  //     Number(number)    // type cast your input
  //   );
  // }

  // sign message
  signMessageWithPrivKey(privateKeyWIF:string, message:string):string;

  // verify message
  verifyMessage(address : string, signature: string, message:string) :true;

  // encode base58Check
  encodeBase58Check(hex:string):string;

  // decode base58Check
  decodeBase58Check(address:string):string;

  // encode bip21 url
  encodeBIP21(address:string, options:object):string;

  // decode bip21 url
  decodeBIP21(url:string):string;

  getByteCount(inputs:string[], outputs:string[]):number;
  encryptBIP38(privKeyWIF:string, passphrase:string):string; 

  decryptBIP38(encryptedKey:string, passphrase:string, network:string):string;

}
