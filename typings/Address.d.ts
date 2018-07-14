export declare interface Address {
    restURL: string;
    //constructor(restURL: string);
    toLegacyAddress(address: string): string;
    toCashAddress(address: string, prefix?: boolean): string;
    isLegacyAddress(address: string): boolean;
    isCashAddress(address: string): boolean;
    isMainnetAddress(address: string): boolean;
    isTestnetAddress(address: string): boolean;
    isP2PKHAddress(address: string): boolean;
    isP2SHAddress(address: string): boolean;
    detectAddressFormat(address: string): string;
    detectAddressNetwork(address: string): string;
    detectAddressType(address: string): string;
    fromXPub(xpub: string, path?: string): string;
    fromOutputScript(scriptPubKey:string): string;
    details(address: string): Promise<AddressDetailsResult | AddressDetailsResult[]>;
    utxo(address: string): Promise<AddressUtxoResult[]>;
    unconfirmed(address: string): Promise<AddressUnconfirmedResult[]>;
}

export declare interface AddressDetailsResult {
    addrStr: string;
    balance: number;
    balanceSat: number;
    totalReceived: number;
    totalReceivedSat: number;
    totalSent: number;
    totalSentSat: number;
    unconfirmedBalance: number;
    unconfirmedBalanceSat: number;
    unconfirmedTxApperances: number;
    txApperances: number;
    transactions: string[];
}

export declare interface AddressUtxoResult {
    address: string;
    txid: string;
    vout: number;
    scriptPubKey: string;
    amount: number;
    satoshis: number;
    height: number;
    confirmations: number;
}

export declare interface AddressUnconfirmedResult {
    txid: string;
    vout: number;
    scriptPubKey: string;
    amount: number;
    satoshis: number;
    confirmations: number;
    ts: number;
    legacyAddress: string;
    cashAddress: string;
}