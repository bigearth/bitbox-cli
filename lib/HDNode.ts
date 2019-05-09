const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")
const bip32utils = require("bip32-utils")
import { Buffer } from "buffer"
import { ECPair, ECSignature } from "./ECPair"

export interface HDNode {
  _address: any
  fromSeed(rootSeedBuffer: Buffer, network?: string): HDNode
  toLegacyAddress(): string
  toLegacyAddress(hdNode: HDNode): string
  toCashAddress(): string
  toCashAddress(hdNode: HDNode, regtest?: boolean): string
  toWIF(): string
  toWIF(hdNode: HDNode): string
  toXPub(): string
  toXPub(hdNode: HDNode): string
  toXPriv(): string
  toXPriv(hdNode: HDNode): string
  toKeyPair(): ECPair
  toKeyPair(hdNode: HDNode): ECPair
  toPublicKey(): Buffer
  toPublicKey(hdNode: HDNode): Buffer
  fromXPriv(xpriv: string): HDNode
  fromXPub(xpub: string): HDNode
  derivePath(path: string): HDNode
  derivePath(hdNode: HDNode, path: string): HDNode
  derive(num: number): HDNode
  derive(hdNode: HDNode, num: number): HDNode
  deriveHardened(num: number): HDNode
  deriveHardened(hdNode: HDNode, num: number): HDNode
  sign(buffer: Buffer): ECSignature
  sign(hdNode: HDNode, buffer: Buffer): ECSignature
  verify(buffer: Buffer, signature: ECSignature): boolean
  verify(hdNode: HDNode, buffer: Buffer, signature: ECSignature): boolean
  isPublic(): boolean
  isPublic(hdNode: HDNode): boolean
  isPrivate(): boolean
  isPrivate(hdNode: HDNode): boolean
  toIdentifier(): string
  toIdentifier(hdNode: HDNode): string
  fromBase58(base58: string, network: string): string
  createAccount(hdNodes: Array<HDNode>): object
  createChain(hdNode: HDNode): object
}

export class HDNode implements HDNode {
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

  toLegacyAddress(hdNode: HDNode): string {
    return hdNode.getAddress()
  }

  toCashAddress(hdNode: HDNode, regtest: boolean = false): string {
    return this._address.toCashAddress(hdNode.getAddress(), true, regtest)
  }

  toWIF(hdNode: HDNode): string {
    return hdNode.keyPair.toWIF()
  }

  toXPub(hdNode: HDNode): string {
    return hdNode.neutered().toBase58()
  }

  toXPriv(hdNode: HDNode): string {
    return hdNode.toBase58()
  }

  toKeyPair(hdNode: HDNode): ECPair {
    return hdNode.keyPair
  }

  toPublicKey(hdNode: HDNode): Buffer {
    return hdNode.getPublicKeyBuffer()
  }

  fromXPriv(xpriv: string): HDNode {
    let bitcoincash: any
    if (xpriv[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib)
  }

  fromXPub(xpub: string): HDNode {
    let bitcoincash: any
    if (xpub[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
  }

  derivePath(hdnode: HDNode, path: string): HDNode {
    return hdnode.derivePath(path)
  }

  derive(hdnode: HDNode, path: string): HDNode {
    return hdnode.derive(path)
  }

  deriveHardened(hdnode: HDNode, path: string): HDNode {
    return hdnode.deriveHardened(path)
  }

  sign(hdnode: HDNode, buffer: Buffer): ECSignature {
    return hdnode.sign(buffer)
  }

  verify(hdnode: HDNode, buffer: Buffer, signature: ECSignature): boolean {
    return hdnode.verify(buffer, signature)
  }

  isPublic(hdnode: HDNode): boolean {
    return hdnode.isNeutered()
  }

  isPrivate(hdnode: HDNode): boolean {
    return !hdnode.isNeutered()
  }

  toIdentifier(hdnode: HDNode): string {
    return hdnode.getIdentifier()
  }

  fromBase58(base58: string, network: string): string {
    return Bitcoin.HDNode.fromBase58(base58, network)
  }

  createAccount(hdNodes: HDNode[]): object {
    const arr = hdNodes.map(
      (item: any, index: number) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  createChain(hdNode: HDNode): object {
    return new bip32utils.Chain(hdNode)
  }
}
