import * as bcl from "bitcoincashjs-lib"
import { Address } from "./Address"

const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")

export class ECPair {
  private _address: Address
  constructor(address: Address = new Address()) {
    this._address = address
  }

  public fromWIF(privateKeyWIF: string): bcl.ECPair {
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

  public toWIF(ecpair: bcl.ECPair): string {
    return ecpair.toWIF()
  }

  public sign(ecpair: bcl.ECPair, buffer: Buffer, signatureAlgorithm?: number): bcl.ECSignature {
    return ecpair.sign(buffer, signatureAlgorithm)
  }

  public verify(
    ecpair: bcl.ECPair,
    buffer: Buffer,
    signature: bcl.ECSignature
  ): boolean {
    return ecpair.verify(buffer, signature)
  }

  public fromPublicKey(pubkeyBuffer: Buffer): bcl.ECPair {
    return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer)
  }

  public toPublicKey(ecpair: bcl.ECPair): Buffer {
    return ecpair.getPublicKeyBuffer()
  }

  public toLegacyAddress(ecpair: bcl.ECPair): string {
    return ecpair.getAddress()
  }

  public toCashAddress(ecpair: bcl.ECPair, regtest: boolean = false): string {
    return this._address.toCashAddress(ecpair.getAddress(), true, regtest)
  }
}
