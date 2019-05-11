import * as bcl from "bitcoincashjs-lib";

const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")

export class ECPair {
  static _address: any
  static setAddress(address: any): void {
    ECPair._address = address
  }

  static fromWIF(privateKeyWIF: string): bcl.ECPair {
    let network: string = "mainnet"
    if (privateKeyWIF[0] === "L" || privateKeyWIF[0] === "K")
      network = "mainnet"
    else if (privateKeyWIF[0] === "c") network = "testnet"

    let bitcoincash: any
    if (network === "mainnet") bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()

    return Bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoincashBitcoinJSLib)
  }

  static toWIF(ecpair: bcl.ECPair): string {
    return ecpair.toWIF()
  }

  static sign(ecpair: bcl.ECPair, buffer: Buffer): bcl.ECSignature {
    return ecpair.sign(buffer)
  }

  static verify(ecpair: bcl.ECPair, buffer: Buffer, signature: bcl.ECSignature): boolean {
    return ecpair.verify(buffer, signature)
  }

  static fromPublicKey(pubkeyBuffer: Buffer): bcl.ECPair {
    return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer)
  }

  static toPublicKey(ecpair: bcl.ECPair): Buffer {
    return ecpair.getPublicKeyBuffer()
  }

  static toLegacyAddress(ecpair: bcl.ECPair): string {
    return ecpair.getAddress()
  }

  static toCashAddress(ecpair: bcl.ECPair, regtest: boolean = false): string {
    return ECPair._address.toCashAddress(ecpair.getAddress(), true, regtest)
  }
}
