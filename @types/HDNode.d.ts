import Bitcoin from 'bitcoincashjs-lib';
import bchaddr from 'bchaddrjs';
import coininfo from'coininfo';
// let bip32utils = require('bip32-utils')

export default class HDNode {
  fromSeed(rootSeedBuffer, network:string):Bitcoin.HDNode; 
  
  toLegacyAddress(hdNode:Bitcoin.HDNode):string; 

  toCashAddress(hdNode:Bitcoin.HDNode):string; 

  toWIF(hdNode:Bitcoin.HDNode):string; 

  toXPub(hdNode:Bitcoin.HDNode):string; 

  toXPriv(hdNode:Bitcoin.HDNode): string;

  toKeyPair(hdNode:Bitcoin.HDNode): string;

  toPublicKey(hdNode:Bitcoin.HDNode): string;

  fromXPriv(xpriv:string):string;

  fromXPub(xpub:string):string; 
  
  derivePath(hdnode:Bitcoin.HDNode, path:string):string; 

  derive(hdnode:Bitcoin.HDNode, path:string):string; 

  deriveHardened(hdnode:Bitcoin.HDNode, path):string; 

  sign(hdnode:Bitcoin.HDNode, buffer:string):string; 

  verify(hdnode:Bitcoin.HDNode, buffer:string, signature:string):boolean; 

  isPublic(hdnode:Bitcoin.HDNode):boolean; 

  isPrivate(hdnode:Bitcoin.HDNode):boolean; 

  toIdentifier(hdnode:Bitcoin.HDNode):string;

  fromBase58(base58:string, network:string):string; 

  //
  // createChain(hdNode) {
  //   return new bip32utils.Chain(hdNode);
  // }
}