import crypto from 'crypto';

class Crypto {
  // Utility class to wrap NodeJS's crypto module
  // https://nodejs.org/api/crypto.html
  static createHash(data, type = 'sha256') {
    return crypto.createHash(type).update(data).digest().toString('hex');
  }

  static createSHA256Hash(data) {
    return crypto.createHash('sha256').update(data).digest().toString('hex');
  }

  static createRIPEMD160Hash(data) {
    return crypto.createHash('ripemd160').update(data).digest().toString('hex');
  }

  static randomBytes(size = 16) {
    return crypto.randomBytes(size).toString('hex');
  }
}

export default Crypto;
