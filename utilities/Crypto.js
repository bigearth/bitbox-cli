import crypto from 'crypto';
// import bitcore from 'bitcore-lib';

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

  // static xpub(xpub, HDPath) {
  //   var HdPublicKey = new bitcore.HDPublicKey.fromString(xpub);
  //   var derivedPublicKey = HdPublicKey.derive(HDPath).publicKey;
  //   // for (let j = 0; j < 1; j++) {
  //     // console.log('asdasfd', j)
  //     // var derivedPublicKey = HdPublicKey.derive("m/0/"+j).publicKey;
  //     // var addy = derivedPublicKey.toAddress();
  //     // console.log('addy', BitcoinCash.toCashAddress(addy.toString()));
  //   // }
  //   return derivedPublicKey.toAddress().toString();
  // }

}

export default Crypto;
