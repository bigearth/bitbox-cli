const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")
const bip32utils = require("bip32-utils")
import * as bcl from "bitcoincashjs-lib"

export class HDNode {
  _address: any
  constructor(address: any) {
    this._address = address
  }

  fromSeed(rootSeedBuffer: any, network: string = "mainnet"): bcl.HDNode {
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

  toLegacyAddress(hdNode: bcl.HDNode): string {
    return hdNode.getAddress()
  }

  toCashAddress(hdNode: bcl.HDNode, regtest: boolean = false): string {
    return this._address.toCashAddress(hdNode.getAddress(), true, regtest)
  }

  toWIF(hdNode: bcl.HDNode): string {
    return hdNode.keyPair.toWIF()
  }

  toXPub(hdNode: bcl.HDNode): string {
    return hdNode.neutered().toBase58()
  }

  toXPriv(hdNode: bcl.HDNode): string {
    return hdNode.toBase58()
  }

  toKeyPair(hdNode: bcl.HDNode): bcl.ECPair {
    return hdNode.keyPair
  }

  toPublicKey(hdNode: bcl.HDNode): Buffer {
    return hdNode.getPublicKeyBuffer()
  }

  fromXPriv(xpriv: string): bcl.HDNode {
    let bitcoincash: any
    if (xpriv[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib)
  }

  fromXPub(xpub: string): bcl.HDNode {
    let bitcoincash: any
    if (xpub[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
  }

  derivePath(hdnode: bcl.HDNode, path: string): bcl.HDNode {
    return hdnode.derivePath(path)
  }

  derive(hdnode: bcl.HDNode, path: string): bcl.HDNode {
    return hdnode.derive(path)
  }

  deriveHardened(hdnode: bcl.HDNode, path: string): bcl.HDNode {
    return hdnode.deriveHardened(path)
  }

  sign(hdnode: bcl.HDNode, buffer: Buffer): bcl.ECSignature {
    return hdnode.sign(buffer)
  }

  verify(hdnode: bcl.HDNode, buffer: Buffer, signature: bcl.ECSignature): boolean {
    return hdnode.verify(buffer, signature)
  }

  isPublic(hdnode: bcl.HDNode): boolean {
    return JSON.parse(hdnode.isNeutered())
  }

  isPrivate(hdnode: bcl.HDNode): boolean {
    return !hdnode.isNeutered()
  }

  toIdentifier(hdnode: bcl.HDNode): string {
    return hdnode.getIdentifier()
  }

  fromBase58(base58: string, network: string): string {
    return Bitcoin.HDNode.fromBase58(base58, network)
  }

  createAccount(hdNodes: bcl.HDNode[]): object {
    const arr = hdNodes.map(
      (item: any, index: number) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  createChain(hdNode: bcl.HDNode): object {
    return new bip32utils.Chain(hdNode)
  }
}
