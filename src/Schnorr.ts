import * as schnorr from "bip-schnorr"

export class Schnorr {
  constructor(restURL) {
    this.restURL = restURL
  }

  sign(privateKey, message) {
    return schnorr.sign(privateKey, message)
  }

  verify(publicKey, message, signatureToVerify) {
    return schnorr.verify(publicKey, message, signatureToVerify)
  }

  batchVerify(publicKeys, messages, signaturesToVerify) {
    return schnorr.batchVerify(publicKeys, messages, signaturesToVerify)
  }

  nonInteractive(privateKeys, message) {
    return schnorr.muSig.nonInteractive(privateKeys, message)
  }

  computeEll(publicKeys) {
    return schnorr.muSig.computeEll(publicKeys)
  }

  publicKeyCombine(publicKeys, publicKeyHash) {
    return schnorr.muSig.pubKeyCombine(publicKeys, publicKeyHash)
  }

  sessionInitialize(sessionId, privateKey, message, pubKeyCombined, ell, idx) {
    return schnorr.muSig.sessionInitialize(
      sessionId,
      privateKey,
      message,
      pubKeyCombined,
      ell,
      idx
    )
  }

  sessionNonceCombine(session, nonces) {
    return schnorr.muSig.sessionNonceCombine(session, nonces)
  }

  partialSign(session, message, nonceCombined, pubKeyCombined) {
    return schnorr.muSig.partialSign(
      session,
      message,
      nonceCombined,
      pubKeyCombined
    )
  }

  partialSignatureVerify(
    session,
    partialSignature,
    nonceCombined,
    idx,
    pubKey,
    nonce
  ) {
    return schnorr.muSig.partialSigVerify(
      session,
      partialSignature,
      nonceCombined,
      idx,
      pubKey,
      nonce
    )
  }

  partialSignaturesCombine(nonceCombined, partialSignatures) {
    return schnorr.muSig.partialSigCombine(nonceCombined, partialSignatures)
  }

  bufferToInt(buffer) {
    return schnorr.convert.bufferToInt(buffer)
  }

  intToBuffer(bigInteger) {
    return schnorr.convert.intToBuffer(bigInteger)
  }

  hash(buffer) {
    return schnorr.convert.hash(buffer)
  }

  pointToBuffer(point) {
    return schnorr.convert.pointToBuffer(point)
  }

  pubKeyToPoint(publicKey) {
    return schnorr.convert.pubKeyToPoint(publicKey)
  }
}
