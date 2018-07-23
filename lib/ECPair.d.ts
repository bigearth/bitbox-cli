
declare type ECSignature = any;

export declare interface ECPair {
  //constructor();
  fromWIF(privateKeyWIF: string): ECPair;
  toWif(): string;
  toWIF(ecpair: ECPair): string; 
  sign(sigHash: number): ECSignature;
  sign(ecpair: ECPair, sigHash: number): ECSignature;
  sign(buffer: Buffer): Boolean | ECSignature; 
  sign(ecpair: ECPair, buffer: Buffer): Boolean | ECSignature; 
  verify(buffer: Buffer, signature: ECSignature): boolean; 
  verify(ecpair: ECPair, buffer: Buffer, signature: ECSignature): boolean; 
  fromPublicKey(pubkeyBuffer: string): ECPair;
  toPublicKey(): Buffer; 
  toPublicKey(ecpair: ECPair): Buffer; 
  toLegacyAddress(): string; 
  toLegacyAddress(ecpair: ECPair): string; 
  toCashAddress(): string; 
  toCashAddress(ecpair: ECPair): string; 
}