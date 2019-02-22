export interface Address {
    restURL: string;
    //constructor(restURL: string);
    toLegacyAddress(address: string): string;
    toCashAddress(address: string, prefix?: boolean, regtest?: boolean): string;
    toHash160(address: string): string;
    hash160ToLegacy(hash160: string, network?: number): string;
    hash160ToCash(hash160: string, network?: number, regtest?: boolean): string;
    isLegacyAddress(address: string): boolean;
    isCashAddress(address: string): boolean;
    isMainnetAddress(address: string): boolean;
    isTestnetAddress(address: string): boolean;
    isRegTestAddress(address: string): boolean;
    isP2PKHAddress(address: string): boolean;
    isP2SHAddress(address: string): boolean;
    detectAddressFormat(address: string): string;
    detectAddressNetwork(address: string): string;
    detectAddressType(address: string): string;
    fromXPub(xpub: string, path?: string): string;
    fromOutputScript(scriptPubKey:Buffer, network?: string): string;
    details(address: string[]): Promise<AddressDetailsResult[]>;
    utxo(address: string[]): Promise<AddressUtxoResult[]>;
    unconfirmed(address: string[]): Promise<AddressUnconfirmedResult[][]>;
}

export interface AddressDetailsResult {
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
    legacyAddress: string;
    cashAddress: string;
}

export interface AddressUtxoResult {
    legacyAddress: string;
    cashAddress: string;
    scriptPubKey: string;
    utxos: 
    [{
        txid: string;
        vout: number;
        amount: number;
        satoshis: number;
        height: number;
        confirmations: number;
    }]
}

export interface AddressUnconfirmedResult {
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