import {Buffer} from 'buffer';

export declare interface Mnemonic {
  generate(bits: number, wordlist?: string[]): string;
  fromEntropy(bytes: Buffer, wordlist?: string[]): string; 
  toEntropy(mnemonic: string, wordlist?: string[]): Buffer;
  validate(mnemonic: string, wordlist?: string[]): boolean;
  toSeed(mnemonic: string, passphrase?: string): Buffer;
  wordLists(): any;
  toKeypairs(mnemonic: string, numberOfKeypairs?: number, regtest?: boolean): { privateKeyWIF: string, address: string}[];
  findNearestWord(word: string, wordlist: string[]): string;
}