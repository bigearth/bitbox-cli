import crypto from 'crypto';
import BitcoinCash from './BitcoinCash';
let bc = new BitcoinCash();

class Crypto {
  // Utility class to wrap NodeJS's crypto module
  // https://nodejs.org/api/crypto.html
  static createHash(data, type = 'sha256') {
    // create byte array from string
    let byteArray = bc.hexStringToByte(data);
    return crypto.createHash(type).update(byteArray).digest().toString('hex');
  }

  static createSHA256Hash(data) {
    // create byte array from string
    let byteArray = bc.hexStringToByte(data);
    return crypto.createHash('sha256').update(byteArray).digest().toString('hex');
  }

  static createRIPEMD160Hash(data) {
    // create byte array from string
    let byteArray = bc.hexStringToByte(data);
    return crypto.createHash('ripemd160').update(byteArray).digest().toString('hex');
  }

  static randomBytes(size = 16) {
    return crypto.randomBytes(size).toString('hex');
  }

  static randomBytesHex(size = 16) {
    return crypto.randomBytes(size).toString('hex');
  }

  static randomBytesBuffer(size = 16) {
    return crypto.randomBytes(size);
  }
}

export default Crypto;
