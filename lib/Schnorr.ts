const schnorr = require("bip-schnorr")

export interface Schnorr {
  sign(privateKey: any, message: any): any
  verify(publicKey: any, message: any, signatureToVerify: any): any
  batchVerify(publicKeys: any, messages: any, signaturesToVerify: any): any
  nonInteractive(privateKeys: any, message: any): any
  computeEll(publicKeys: any): any
  publicKeyCombine(publicKeys: any, publicKeyHash: any): any
  sessionInitialize(
    sessionId: any,
    privateKey: any,
    message: any,
    pubKeyCombined: any,
    ell: any,
    idx: any
  ): any
  sessionNonceCombine(session: any, nonces: any): any
  partialSign(
    session: any,
    message: any,
    nonceCombined: any,
    pubKeyCombined: any
  ): any
  partialSignatureVerify(
    session: any,
    partialSignature: any,
    nonceCombined: any,
    idx: any,
    pubKey: any,
    nonce: any
  ): any
  partialSignaturesCombine(nonceCombined: any, partialSignatures: any): any
  bufferToInt(buffer: any): any
  intToBuffer(bigInteger: any): any
  hash(buffer: any): any
  pointToBuffer(point: any): any
  pubKeyToPoint(publicKey: any): any
}

export class Schnorr implements Schnorr {
  sign(privateKey: any, message: any): any {
    return schnorr.sign(privateKey, message)
  }

  verify(publicKey: any, message: any, signatureToVerify: any): any {
    return schnorr.verify(publicKey, message, signatureToVerify)
  }

  batchVerify(publicKeys: any, messages: any, signaturesToVerify: any): any {
    return schnorr.batchVerify(publicKeys, messages, signaturesToVerify)
  }

  nonInteractive(privateKeys: any, message: any): any {
    return schnorr.muSig.nonInteractive(privateKeys, message)
  }

  computeEll(publicKeys: any): any {
    return schnorr.muSig.computeEll(publicKeys)
  }

  publicKeyCombine(publicKeys: any, publicKeyHash: any): any {
    return schnorr.muSig.pubKeyCombine(publicKeys, publicKeyHash)
  }

  sessionInitialize(
    sessionId: any,
    privateKey: any,
    message: any,
    pubKeyCombined: any,
    ell: any,
    idx: any
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

  sessionNonceCombine(session: any, nonces: any): any {
    return schnorr.muSig.sessionNonceCombine(session, nonces)
  }

  partialSign(
    session: any,
    message: any,
    nonceCombined: any,
    pubKeyCombined: any
  ): any {
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
    nonceCombined: any,
    idx: any,
    pubKey: any,
    nonce: any
  ): any {
    return schnorr.muSig.partialSigVerify(
      session,
      partialSignature,
      nonceCombined,
      idx,
      pubKey,
      nonce
    )
  }

  partialSignaturesCombine(nonceCombined: any, partialSignatures: any): any {
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
