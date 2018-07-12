import Crypto from './Crypto';

import BIP39 from 'bip39';
import randomBytes from 'randombytes';
import Bitcoin from 'bitcoincashjs-lib';
import bchaddr from 'bchaddrjs';
//let Buffer = require('safe-buffer').Buffer

export default class Mnemonic {
  generate(bits:number, wordlist:string[]):string;

  fromEntropy(bytes:string, wordlist:string[]):string; 

  toEntropy(mnemonic:string, wordlist:string[]):Buffer;

  validate(mnemonic:string, wordlist:string[]):string;

  toSeed(mnemonic:string, password:string):Buffer;

  wordLists():string[];

  toKeypairs(mnemonic:string, numberOfKeypairs:number):any[];
  findNearestWord(word:string, wordlist:string[]):string;
}



// The following code is from: https://raw.githubusercontent.com/iancoleman/bip39/7ff86d4c983f1e8c80b87b31acfd69fcf98c1b82/src/js/levenshtein.js

/**
 * Extend an Object with another Object's properties.
 *
 * The source objects are specified as additional arguments.
 *
 * @param dst Object the object to extend.
 *
 * @return Object the final object.
 */


  declare var _extend : object;
  /**
   * Defer execution of given function.
   * @param  {Function} func
   */

  declare var _defer : number;
  /**
  * Based on the algorithm at http://en.wikipedia.org/wiki/Levenshtein_distance.
  */

  declare var Levenshtein: number; 