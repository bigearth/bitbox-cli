// imports
import * as bcl from "bitcoincashjs-lib"
import { Address } from "./Address"

// consts
const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")
const bip32utils = require("bip32-utils")

export class HDNode {
  private _address: Address
  constructor(address: Address = new Address()) {
    this._address = address
  }

  public fromSeed(rootSeedBuffer: any, network: string = "mainnet"): bcl.HDNode {
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

  public toLegacyAddress(hdNode: bcl.HDNode): string {
    return hdNode.getAddress()
  }

  public toCashAddress(hdNode: bcl.HDNode, regtest: boolean = false): string {
    return this._address.toCashAddress(hdNode.getAddress(), true, regtest)
  }

  public toWIF(hdNode: bcl.HDNode): string {
    return hdNode.keyPair.toWIF()
  }

  public toXPub(hdNode: bcl.HDNode): string {
    return hdNode.neutered().toBase58()
  }

  public toXPriv(hdNode: bcl.HDNode): string {
    return hdNode.toBase58()
  }

  public toKeyPair(hdNode: bcl.HDNode): bcl.ECPair {
    return hdNode.keyPair
  }

  public toPublicKey(hdNode: bcl.HDNode): Buffer {
    return hdNode.getPublicKeyBuffer()
  }

  public fromXPriv(xpriv: string): bcl.HDNode {
    let bitcoincash: any
    if (xpriv[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib)
  }

  public fromXPub(xpub: string): bcl.HDNode {
    let bitcoincash: any
    if (xpub[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib: any = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
  }

  public derivePath(hdnode: bcl.HDNode, path: string): bcl.HDNode {
    return hdnode.derivePath(path)
  }

  public derive(hdnode: bcl.HDNode, path: string): bcl.HDNode {
    return hdnode.derive(path)
  }

  public deriveHardened(hdnode: bcl.HDNode, path: string): bcl.HDNode {
    return hdnode.deriveHardened(path)
  }

  public sign(hdnode: bcl.HDNode, buffer: Buffer): bcl.ECSignature {
    return hdnode.sign(buffer)
  }

  public verify(hdnode: bcl.HDNode, buffer: Buffer, signature: bcl.ECSignature): boolean {
    return hdnode.verify(buffer, signature)
  }

  public isPublic(hdnode: bcl.HDNode): boolean {
    return JSON.parse(hdnode.isNeutered())
  }

  public isPrivate(hdnode: bcl.HDNode): boolean {
    return !hdnode.isNeutered()
  }

  public toIdentifier(hdnode: bcl.HDNode): string {
    return hdnode.getIdentifier()
  }

  public fromBase58(base58: string, network: string): string {
    return Bitcoin.HDNode.fromBase58(base58, network)
  }

  public createAccount(hdNodes: bcl.HDNode[]): object {
    const arr: any = hdNodes.map(
      (item: any, index: number) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  public createChain(hdNode: bcl.HDNode): object {
    return new bip32utils.Chain(hdNode)
  }
}
