import { Buffer } from "buffer"

import { ECPair, ECSignature } from "./ECPair"

export declare interface HDNode {
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
