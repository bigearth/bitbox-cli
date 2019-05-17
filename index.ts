#!/usr/bin/env node
/// <reference path="./lib/interfaces/vendors.d.ts"/>

export * from './lib/BITBOX';
export * from './lib/Address';
export * from './lib/BitcoinCash';
export * from './lib/Block';
export * from './lib/Blockchain';
export * from './lib/Control';
export * from './lib/Crypto';
export * from './lib/ECPair';
export * from './lib/Generating';
export * from './lib/HDNode';
export * from './lib/Mining';
export * from './lib/Mnemonic';
export * from './lib/Price';
export * from './lib/RawTransactions';
export * from './lib/Script';
export * from './lib/Transaction';
export * from './lib/TransactionBuilder';
export * from './lib/Util';
export * from './lib/Socket';
export * from './lib/Schnorr';

export interface BchInfo {
  hashGenesisBlock: string
  port: number
  portRpc: number
  protocol: {
    magic: number
  }
  seedsDns: string[]
  versions: {
    bip32: {
      private: number
      public: number
    }
    bip44: number
    private: number
    public: number
    scripthash: number
    messagePrefix: string
  }
  name: string
  per1: number
  unit: string
  testnet: boolean
  toBitcoinJS: any
  toBitcore: any
}