import { ECPair, ECSignature } from "./ECPair";

export declare class HDNode {
  fromSeed(rootSeedBuffer: Buffer, network?: string): HDNode; 
  toLegacyAddress(hdNode:HDNode):string; 
  toCashAddress(hdNode:HDNode):string; 
  toWIF(hdNode:HDNode): string; 
  toXPub(hdNode:HDNode):string; 
  toXPriv(hdNode:HDNode): string;
  toKeyPair(hdNode:HDNode): ECPair;
  toPublicKey(hdNode:HDNode): Buffer;
  fromXPriv(xpriv: string): HDNode;
  fromXPub(xpub:string): HDNode; 
  derivePath(hdnode: HDNode, path:string):HDNode; 
  derive(hdnode: HDNode, num:number):HDNode; 
  deriveHardened(hdnode:HDNode, num: number):HDNode; 
  sign(hdnode:HDNode, buffer:Buffer):ECSignature; 
  verify(hdnode:HDNode, buffer:Buffer, signature:ECSignature):boolean; 
  isPublic(hdnode:HDNode):boolean; 
  isPrivate(hdnode:HDNode):boolean; 
  toIdentifier(hdnode:HDNode):string;
  fromBase58(base58:string, network:string):string; 
}