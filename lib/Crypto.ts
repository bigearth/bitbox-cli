const randomBytes = require("randomBytes")
const Bitcoin = require("bitcoincashjs-lib")

export class Crypto {
  static sha256(buffer: any): any {
    return Bitcoin.crypto.sha256(buffer)
  }

  static ripemd160(buffer: any): any {
    return Bitcoin.crypto.ripemd160(buffer)
  }

  static hash256(buffer: any): any {
    return Bitcoin.crypto.hash256(buffer)
  }

  static hash160(buffer: any): any {
    return Bitcoin.crypto.hash160(buffer)
  }

  static randomBytes(size: number = 16): any {
    return randomBytes(size)
  }
}
