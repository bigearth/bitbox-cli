import {Buffer} from 'buffer';

import { ECPair, ECSignature } from "./ECPair";

export declare interface HDNode {
  fromSeed(rootSeedBuffer: Buffer, network?: string): HDNode; 
  toLegacyAddress():string; 
  toLegacyAddress(hdNode:HDNode):string; 
  toCashAddress():string; 
  toCashAddress(hdNode:HDNode):string; 
  toWIF(): string; 
  toWIF(hdNode:HDNode): string; 
  toXPub():string; 
  toXPub(hdNode:HDNode):string; 
  toXPriv(): string;
  toXPriv(hdNode:HDNode): string;
  toKeyPair(): ECPair;
  toKeyPair(hdNode:HDNode): ECPair;
  toPublicKey(): Buffer;
  toPublicKey(hdNode:HDNode): Buffer;
  fromXPriv(xpriv: string): HDNode;
  fromXPub(xpub:string): HDNode; 
  derivePath(path:string):HDNode; 
  derivePath(hdnode: HDNode, path:string):HDNode; 
  derive(num:number):HDNode; 
  derive(hdnode: HDNode, num:number):HDNode; 
  deriveHardened(num: number):HDNode; 
  deriveHardened(hdnode:HDNode, num: number):HDNode; 
  sign(buffer:Buffer):ECSignature; 
  sign(hdnode:HDNode, buffer:Buffer):ECSignature; 
  verify(buffer:Buffer, signature:ECSignature):boolean; 
  verify(hdnode:HDNode, buffer:Buffer, signature:ECSignature):boolean; 
  isPublic():boolean; 
  isPublic(hdnode:HDNode):boolean; 
  isPrivate():boolean; 
  isPrivate(hdnode:HDNode):boolean; 
  toIdentifier():string;
  toIdentifier(hdnode:HDNode):string;
  fromBase58(base58:string, network:string):string; 
}