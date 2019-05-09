const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")
import { Buffer } from "buffer"
export type ECSignature = any

export interface ECPair {
  _address: any
  fromWIF(privateKeyWIF: string): ECPair
  toWIF(ecpair?: ECPair): string
  sign(sigHash: number): ECSignature
  sign(ecpair: ECPair, sigHash: number): ECSignature
  sign(buffer: Buffer): Boolean | ECSignature
  sign(ecpair: ECPair, buffer: Buffer): Boolean | ECSignature
  verify(buffer: Buffer, signature: ECSignature): boolean
  verify(ecpair: ECPair, buffer: Buffer, signature: ECSignature): boolean
  fromPublicKey(pubkeyBuffer: string): ECPair
  toPublicKey(): Buffer
  toPublicKey(ecpair: ECPair): Buffer
  toLegacyAddress(): string
  toLegacyAddress(ecpair: ECPair): string
  toCashAddress(): string
  toCashAddress(ecpair: ECPair, regtest?: boolean): string
  getPublicKeyBuffer(): any
  getAddress(): string
}

export class ECPair implements ECPair {
  static _address: any
  static setAddress(address: any): void {
    ECPair._address = address
  }

  static fromWIF(privateKeyWIF: string): any {
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

  static toWIF(ecpair: ECPair): string {
    return ecpair.toWIF()
  }

  static sign(ecpair: ECPair, buffer: Buffer): ECSignature {
    return ecpair.sign(buffer)
  }

  static verify(ecpair: ECPair, buffer: Buffer, signature: ECSignature): any {
    return ecpair.verify(buffer, signature)
  }

  static fromPublicKey(pubkeyBuffer: Buffer): any {
    return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer)
  }

  static toPublicKey(ecpair: ECPair): Buffer {
    return ecpair.getPublicKeyBuffer()
  }

  static toLegacyAddress(ecpair: ECPair): string {
    return ecpair.getAddress()
  }

  static toCashAddress(ecpair: ECPair, regtest: boolean = false): string {
    return ECPair._address.toCashAddress(ecpair.getAddress(), true, regtest)
  }
}
