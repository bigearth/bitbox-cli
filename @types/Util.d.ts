export declare class Util {
  constructor(restURL:string);
  validateAddress(address: string): Promise<any>;
}

declare class AddressDetails {
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