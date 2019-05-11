const schnorr = require("bip-schnorr")
import * as BigInteger from "bigi"

export interface Session {
    sessionId: Buffer;
    message: Buffer;
    pubKeyCombined: Buffer;
    ell: Buffer;
    idx: number;
}

export class Schnorr {
  sign(privateKey: BigInteger, message: Buffer): Buffer {
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

  nonInteractive(privateKeys: BigInteger, message: Buffer): Buffer {
    return schnorr.muSig.nonInteractive(privateKeys, message)
  }

  computeEll(publicKeys: BigInteger): Buffer {
    return schnorr.muSig.computeEll(publicKeys)
  }

  publicKeyCombine(publicKeys: Buffer[], publicKeyHash: Buffer): Buffer {
    return schnorr.muSig.pubKeyCombine(publicKeys, publicKeyHash)
  }

  sessionInitialize(
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

  sessionNonceCombine(session: Session, nonces: Buffer[]): Buffer {
    return schnorr.muSig.sessionNonceCombine(session, nonces)
  }

  partialSign(
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

  partialSignatureVerify(
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

  partialSignaturesCombine(
    nonceCombined: Buffer,
    partialSignatures: Buffer
  ): Buffer {
    return schnorr.muSig.partialSigCombine(nonceCombined, partialSignatures)
  }

  bufferToInt(buffer: Buffer): BigInteger {
    return schnorr.convert.bufferToInt(buffer)
  }

  intToBuffer(bigInteger: BigInteger): Buffer {
    return schnorr.convert.intToBuffer(bigInteger)
  }

  hash(buffer: Buffer): Buffer {
    return schnorr.convert.hash(buffer)
  }

  pointToBuffer(point: any): any {
    return schnorr.convert.pointToBuffer(point)
  }

  pubKeyToPoint(publicKey: any): any {
    return schnorr.convert.pubKeyToPoint(publicKey)
  }
}
