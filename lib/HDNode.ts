const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")
const bip32utils = require("bip32-utils")
import { ECPair, ECSignature } from "./ECPair"
import * as bitcoincashjs from "bitcoincashjs-lib"

export class HDNode {
  _address: any
  constructor(address: any) {
    this._address = address
  }

  fromSeed(rootSeedBuffer: any, network: string = "mainnet"): HDNode {
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

  toLegacyAddress(hdNode: bitcoincashjs.HDNode): string {
    return hdNode.getAddress()
  }

  toCashAddress(hdNode: bitcoincashjs.HDNode, regtest: boolean = false): string {
    return this._address.toCashAddress(hdNode.getAddress(), true, regtest)
  }

  toWIF(hdNode: bitcoincashjs.HDNode): string {
    return hdNode.keyPair.toWIF()
  }

  toXPub(hdNode: bitcoincashjs.HDNode): string {
    return hdNode.neutered().toBase58()
  }

  toXPriv(hdNode: bitcoincashjs.HDNode): string {
    return hdNode.toBase58()
  }

  toKeyPair(hdNode: bitcoincashjs.HDNode): ECPair {
    return hdNode.keyPair
  }

  toPublicKey(hdNode: bitcoincashjs.HDNode): Buffer {
    return hdNode.getPublicKeyBuffer()
  }

  fromXPriv(xpriv: string): bitcoincashjs.HDNode {
    let bitcoincash: any
    if (xpriv[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib)
  }

  fromXPub(xpub: string): bitcoincashjs.HDNode {
    let bitcoincash: any
    if (xpub[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
  }

  derivePath(hdnode: bitcoincashjs.HDNode, path: string): bitcoincashjs.HDNode {
    return hdnode.derivePath(path)
  }

  derive(hdnode: bitcoincashjs.HDNode, path: string): bitcoincashjs.HDNode {
    return hdnode.derive(path)
  }

  deriveHardened(hdnode: bitcoincashjs.HDNode, path: string): bitcoincashjs.HDNode {
    return hdnode.deriveHardened(path)
  }

  sign(hdnode: bitcoincashjs.HDNode, buffer: Buffer): ECSignature {
    return hdnode.sign(buffer)
  }

  verify(hdnode: bitcoincashjs.HDNode, buffer: Buffer, signature: ECSignature): boolean {
    return hdnode.verify(buffer, signature)
  }

  isPublic(hdnode: bitcoincashjs.HDNode): boolean {
    return JSON.parse(hdnode.isNeutered())
  }

  isPrivate(hdnode: bitcoincashjs.HDNode): boolean {
    return !hdnode.isNeutered()
  }

  toIdentifier(hdnode: bitcoincashjs.HDNode): string {
    return hdnode.getIdentifier()
  }

  fromBase58(base58: string, network: string): string {
    return Bitcoin.HDNode.fromBase58(base58, network)
  }

  createAccount(hdNodes: bitcoincashjs.HDNode[]): object {
    const arr = hdNodes.map(
      (item: any, index: number) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  createChain(hdNode: bitcoincashjs.HDNode): object {
    return new bip32utils.Chain(hdNode)
  }
}
