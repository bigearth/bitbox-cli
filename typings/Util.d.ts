export declare interface Util {
  //constructor(restURL:string);
  validateAddress(address: string): Promise<any>;
}

declare interface AddressDetails {
  isvalid: boolean;
  address: string;
  scriptPubKey: string;
  ismine: boolean;
  iswatchonly: boolean;
  isscript: boolean;
  pubkey: string;
  iscompressed: boolean;
  account: string;
}