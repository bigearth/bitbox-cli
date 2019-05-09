const Bitcoin = require("bitcoincashjs-lib")
const coininfo = require("coininfo")
const bip32utils = require("bip32-utils")

export class HDNode {
  _address: any
  constructor(address: any) {
    this._address = address
  }

  fromSeed(rootSeedBuffer: any, network: string = "mainnet"): any {
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

  toLegacyAddress(hdNode: any): string {
    return hdNode.getAddress()
  }

  toCashAddress(hdNode: any, regtest: boolean = false): string {
    return this._address.toCashAddress(hdNode.getAddress(), true, regtest)
  }

  toWIF(hdNode: any): string {
    return hdNode.keyPair.toWIF()
  }

  toXPub(hdNode: any): string {
    return hdNode.neutered().toBase58()
  }

  toXPriv(hdNode: any): string {
    return hdNode.toBase58()
  }

  toKeyPair(hdNode: any): any {
    return hdNode.keyPair
  }

  toPublicKey(hdNode: any): any {
    return hdNode.getPublicKeyBuffer()
  }

  fromXPriv(xpriv: string): any {
    let bitcoincash: any
    if (xpriv[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpriv, bitcoincashBitcoinJSLib)
  }

  fromXPub(xpub: string): any {
    let bitcoincash: any
    if (xpub[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    return Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
  }

  derivePath(hdnode: any, path: string): any {
    return hdnode.derivePath(path)
  }

  derive(hdnode: any, path: string): any {
    return hdnode.derive(path)
  }

  deriveHardened(hdnode: any, path: string): any {
    return hdnode.deriveHardened(path)
  }

  sign(hdnode: any, buffer: any): any {
    return hdnode.sign(buffer)
  }

  verify(hdnode: any, buffer: any, signature: any): any {
    return hdnode.verify(buffer, signature)
  }

  isPublic(hdnode: any): any {
    return hdnode.isNeutered()
  }

  isPrivate(hdnode: any): any {
    return !hdnode.isNeutered()
  }

  toIdentifier(hdnode: any): any {
    return hdnode.getIdentifier()
  }

  fromBase58(base58: any, network: any): any {
    return Bitcoin.HDNode.fromBase58(base58, network)
  }

  createAccount(hdNodes: any): any {
    const arr = hdNodes.map(
      (item: any, index: number) => new bip32utils.Chain(item.neutered())
    )
    return new bip32utils.Account(arr)
  }

  createChain(hdNode: any): any {
    return new bip32utils.Chain(hdNode)
  }
}
