import crypto from 'crypto';
import BitcoinCash from './BitcoinCash';
import Bitcoin from 'bitcoinjs-lib';
let bc = new BitcoinCash();

class Crypto {
  // Utility class to wrap NodeJS's crypto module
  // https://nodejs.org/api/crypto.html
  static sha256(buffer) {
    return Bitcoin.crypto.sha256(buffer);
  }

  static ripemd160(buffer) {
    return Bitcoin.crypto.ripemd160(buffer);
  }

  static hash256(buffer) {
    return Bitcoin.crypto.hash256(buffer);
  }

  static hash160(buffer) {
    return Bitcoin.crypto.hash160(buffer);
  }

  static randomBytes(size = 16) {
    return crypto.randomBytes(size);
  }
}

export default Crypto;
