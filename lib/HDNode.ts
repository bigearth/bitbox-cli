const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")
const bip32utils = require("bip32-utils")
import { Buffer } from "buffer"
import { ECPair, ECSignature } from "./ECPair"

export interface HDNodeBCL {
  keyPair: any
  getAddress(): any
  isNeutered(): any
  getIdentifier(): any
  verify(buffer: any, signature: any): any
  deriveHardened(path: any): any
  sign(buffer: any): any
  toBase58(): any
  neutered(): any
  getPublicKeyBuffer(): any
  derivePath(path: any): any
  derive(path: any): any
}

export class HDNode {
  _address: any
  constructor(address: any) {
    this._address = address
  }

  fromSeed(rootSeedBuffer: any, network: string = "mainnet"): HDNodeBCL {
    let bitcoincash: any
    if (network === "bitcoincash" || network === "mainnet")
      bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromSeedBuffer(
      rootSeedBuffer,
      bitcoincashBitcoinJSLib
    )
  }

  toLegacyAddress(hdNode: HDNodeBCL): string {
    return hdNode.getAddress()
  }

  toCashAddress(hdNode: HDNodeBCL, regtest: boolean = false): string {
    return this._address.toCashAddress(hdNode.getAddress(), true, regtest)
  }

  toWIF(hdNode: HDNodeBCL): string {
    return hdNode.keyPair.toWIF()
  }

  toXPub(hdNode: HDNodeBCL): string {
    return hdNode.neutered().toBase58()
  }

  toXPriv(hdNode: HDNodeBCL): string {
    return hdNode.toBase58()
  }

  toKeyPair(hdNode: HDNodeBCL): ECPair {
    return hdNode.keyPair
  }

  toPublicKey(hdNode: HDNodeBCL): Buffer {
    return hdNode.getPublicKeyBuffer()
  }

  fromXPriv(xpriv: string): HDNodeBCL {
    let bitcoincash: any
    if (xpriv[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib)
  }

  fromXPub(xpub: string): HDNodeBCL {
    let bitcoincash: any
    if (xpub[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
  }

  derivePath(hdnode: HDNodeBCL, path: string): HDNodeBCL {
    return hdnode.derivePath(path)
  }

  derive(hdnode: HDNodeBCL, path: string): HDNodeBCL {
    return hdnode.derive(path)
  }

  deriveHardened(hdnode: HDNodeBCL, path: string): HDNodeBCL {
    return hdnode.deriveHardened(path)
  }

  sign(hdnode: HDNodeBCL, buffer: Buffer): ECSignature {
    return hdnode.sign(buffer)
  }

  verify(hdnode: HDNodeBCL, buffer: Buffer, signature: ECSignature): boolean {
    return hdnode.verify(buffer, signature)
  }

  isPublic(hdnode: HDNodeBCL): boolean {
    return JSON.parse(hdnode.isNeutered())
  }

  isPrivate(hdnode: HDNodeBCL): boolean {
    return !hdnode.isNeutered()
  }

  toIdentifier(hdnode: HDNodeBCL): string {
    return hdnode.getIdentifier()
  }

  fromBase58(base58: string, network: string): string {
    return Bitcoin.HDNode.fromBase58(base58, network)
  }

  createAccount(hdNodes: HDNodeBCL[]): object {
    const arr = hdNodes.map(
      (item: any, index: number) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  createChain(hdNode: HDNodeBCL): object {
    return new bip32utils.Chain(hdNode)
  }
}
