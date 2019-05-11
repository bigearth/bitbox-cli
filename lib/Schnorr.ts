const schnorr = require("bip-schnorr")
import { Buffer } from "buffer"

export class Schnorr {
  sign(privateKey: any, message: Buffer): Buffer {
    return schnorr.sign(privateKey, message)
  }

  verify(publicKey: Buffer, message: Buffer, signatureToVerify: Buffer): void {
    return schnorr.verify(publicKey, message, signatureToVerify)
  }

  batchVerify(
    publicKeys: Buffer[],
    messages: Buffer[],
    signaturesToVerify: Buffer[]
  ): void {
    return schnorr.batchVerify(publicKeys, messages, signaturesToVerify)
  }

  nonInteractive(privateKeys: any, message: Buffer): Buffer {
    return schnorr.muSig.nonInteractive(privateKeys, message)
  }

  computeEll(publicKeys: any): Buffer {
    return schnorr.muSig.computeEll(publicKeys)
  }

  publicKeyCombine(publicKeys: Buffer[], publicKeyHash: Buffer): Buffer {
    return schnorr.muSig.pubKeyCombine(publicKeys, publicKeyHash)
  }

  sessionInitialize(
    sessionId: Buffer,
    privateKey: any,
    message: Buffer,
    pubKeyCombined: Buffer,
    ell: Buffer,
    idx: number
  ): any {
    return schnorr.muSig.sessionInitialize(
      sessionId,
      privateKey,
      message,
      pubKeyCombined,
      ell,
      idx
    )
  }

  sessionNonceCombine(session: any, nonces: Buffer[]): Buffer {
    return schnorr.muSig.sessionNonceCombine(session, nonces)
  }

  partialSign(
    session: any,
    message: Buffer,
    nonceCombined: Buffer,
    pubKeyCombined: Buffer
  ): void {
    return schnorr.muSig.partialSign(
      session,
      message,
      nonceCombined,
      pubKeyCombined
    )
  }

  partialSignatureVerify(
    session: any,
    partialSignature: any,
    nonceCombined: Buffer,
    idx: number,
    pubKey: Buffer,
    nonce: Buffer
  ): void {
    return schnorr.muSig.partialSigVerify(
      session,
      partialSignature,
      nonceCombined,
      idx,
      pubKey,
      nonce
    )
  }

  partialSignaturesCombine(
    nonceCombined: Buffer,
    partialSignatures: any
  ): Buffer {
    return schnorr.muSig.partialSigCombine(nonceCombined, partialSignatures)
  }

  bufferToInt(buffer: any): any {
    return schnorr.convert.bufferToInt(buffer)
  }

  intToBuffer(bigInteger: any): any {
    return schnorr.convert.intToBuffer(bigInteger)
  }

  hash(buffer: any): any {
    return schnorr.convert.hash(buffer)
  }

  pointToBuffer(point: any): any {
    return schnorr.convert.pointToBuffer(point)
  }

  pubKeyToPoint(publicKey: any): any {
    return schnorr.convert.pubKeyToPoint(publicKey)
  }
}
