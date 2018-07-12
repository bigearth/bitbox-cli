import axios from "axios";
import bchaddr from 'bchaddrjs';
import Bitcoin from 'bitcoincashjs-lib';

export default class Address {

    restURL: string;
    
    constructor(restURL: string);
    // Translate address from any address format into a specific format.
    toLegacyAddress(address: string): string;
    toCashAddress(address: string, prefix : boolean): string;
    
    // Test for address format.
    isLegacyAddress(address:string):boolean;
    isCashAddress(address:string):boolean;
    // Test for address network.
    isMainnetAddress(address:string):boolean;
    isTestnetAddress(address:string):boolean;
    // Test for address type.
    isP2PKHAddress(address:string): boolean;
    isP2SHAddress(address:string):boolean;
    // Detect address format.
    detectAddressFormat(address:string):string;
    // Detect address network.
    detectAddressNetwork(address:string):string;
    // Detect address type.
    detectAddressType(address:string):string;
    fromXPub(xpub:string, path:string):string;
    fromOutputScript(scriptPubKey:string):string;

    details(address:string):string;
    utxo(address:string): string;

    unconfirmed(address:string):string;

}