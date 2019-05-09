const randomBytes = require("randomBytes")
const Bitcoin = require("bitcoincashjs-lib")
import { Buffer } from "buffer"

export interface Crypto {
  sha256(buffer: Buffer): Buffer
  ripemd160(buffer: Buffer): Buffer
  hash256(buffer: Buffer): Buffer
  hash160(buffer: Buffer): Buffer
  randomBytes(size: number): Buffer
}

export class Crypto implements Crypto {
  static sha256(buffer: Buffer): Buffer {
    return Bitcoin.crypto.sha256(buffer)
  }

  static ripemd160(buffer: Buffer): Buffer {
    return Bitcoin.crypto.ripemd160(buffer)
  }

  static hash256(buffer: Buffer): Buffer {
    return Bitcoin.crypto.hash256(buffer)
  }

  static hash160(buffer: Buffer): Buffer {
    return Bitcoin.crypto.hash160(buffer)
  }

  static randomBytes(size: number = 16): Buffer {
    return randomBytes(size)
  }
}
