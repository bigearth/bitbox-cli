
declare type ECSignature = any;

export declare class ECPair {
  constructor();
  fromWIF(privateKeyWIF: string): ECPair;
  toWIF(ecpair: ECPair): string; 
  sign(sigHash: number): ECSignature;
  sign(ecpair: ECPair, buffer: Buffer): Boolean | ECSignature; 
  verify(ecpair: ECPair, buffer: Buffer, signature: ECSignature): boolean; 
  fromPublicKey(pubkeyBuffer: string): ECPair; 
  toPublicKey(ecpair: ECPair): Buffer; 
  toLegacyAddress(ecpair: ECPair): string; 
  toCashAddress(ecpair: ECPair): string; 
}