import randomBytes from 'randombytes';
import BitcoinCash from './BitcoinCash';
import Bitcoin from 'bitcoincashjs-lib';
//let bc = new BitcoinCash();

export default class Crypto {
  // Utility class to wrap NodeJS's crypto module
  // https://nodejs.org/api/crypto.html
  static sha256(buffer:string):string;

  static ripemd160(buffer:string):string;

  static hash256(buffer:string):string;
    
  static hash160(buffer:string):string;

  static randomBytes(size:number):string; 
}