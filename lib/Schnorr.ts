// imports
import * as BigInteger from "bigi"

// consts
const schnorr = require("bip-schnorr")

export interface Session {
  sessionId: Buffer
  message: Buffer
  pubKeyCombined: Buffer
  ell: Buffer
  idx: number
}

export class Schnorr {
  public sign(privateKey: BigInteger, message: Buffer): Buffer {
    return schnorr.sign(privateKey, message)
  }

  public verify(
    publicKey: Buffer,
    message: Buffer,
    signatureToVerify: Buffer
  ): void {
    return schnorr.verify(publicKey, message, signatureToVerify)
  }

  public batchVerify(
    publicKeys: Buffer[],
    messages: Buffer[],
    signaturesToVerify: Buffer[]
  ): void {
    return schnorr.batchVerify(publicKeys, messages, signaturesToVerify)
  }

  public nonInteractive(privateKeys: BigInteger, message: Buffer): Buffer {
    return schnorr.muSig.nonInteractive(privateKeys, message)
  }

  public computeEll(publicKeys: BigInteger): Buffer {
    return schnorr.muSig.computeEll(publicKeys)
  }

  public publicKeyCombine(publicKeys: Buffer[], publicKeyHash: Buffer): Buffer {
    return schnorr.muSig.pubKeyCombine(publicKeys, publicKeyHash)
  }

  public sessionInitialize(
    sessionId: Buffer,
    privateKey: BigInteger,
    message: Buffer,
    pubKeyCombined: Buffer,
    ell: Buffer,
    idx: number
  ): Session {
    return schnorr.muSig.sessionInitialize(
      sessionId,
      privateKey,
      message,
      pubKeyCombined,
      ell,
      idx
    )
  }

  public sessionNonceCombine(session: Session, nonces: Buffer[]): Buffer {
    return schnorr.muSig.sessionNonceCombine(session, nonces)
  }

  public partialSign(
    session: Session,
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

  public partialSignatureVerify(
    session: Session,
    partialSignature: Buffer,
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

  public partialSignaturesCombine(
    nonceCombined: Buffer,
    partialSignatures: Buffer
  ): Buffer {
    return schnorr.muSig.partialSigCombine(nonceCombined, partialSignatures)
  }

  public bufferToInt(buffer: Buffer): BigInteger {
    return schnorr.convert.bufferToInt(buffer)
  }

  public intToBuffer(bigInteger: BigInteger): Buffer {
    return schnorr.convert.intToBuffer(bigInteger)
  }

  public hash(buffer: Buffer): Buffer {
    return schnorr.convert.hash(buffer)
  }

  public pointToBuffer(point: any): any {
    return schnorr.convert.pointToBuffer(point)
  }

  public pubKeyToPoint(publicKey: any): any {
    return schnorr.convert.pubKeyToPoint(publicKey)
  }
}
