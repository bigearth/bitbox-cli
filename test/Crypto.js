let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('create SHA256Hash', () => {
  it('should create a SHA256Hash hex encoded', () => {
    let sha256Hash = BITBOX.Crypto.createSHA256Hash('foobar');
    assert.lengthOf(sha256Hash, 64);
    assert.equal(sha256Hash, 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2');
  });
});

describe('create RIPEMD160Hash', () => {
  it('should create a RIPEMD160Hash hex encoded', () => {
    let RIPEMD160Hash = BITBOX.Crypto.createRIPEMD160Hash('foobar');
    assert.lengthOf(RIPEMD160Hash, 40);
    assert.equal(RIPEMD160Hash, 'a06e327ea7388c18e4740e350ed4e60f2e04fc41');
  });
});

describe('return hex encoded entropy', () => {
  it('should return 16 bytes of entropy hex encoded', () => {
    let entropy = BITBOX.Crypto.randomBytes(16);
    assert.lengthOf(entropy, 32);
  });

  it('should return 20 bytes of entropy hex encoded', () => {
    let entropy = BITBOX.Crypto.randomBytes(20);
    assert.lengthOf(entropy, 40);
  });

  it('should return 24 bytes of entropy hex encoded', () => {
    let entropy = BITBOX.Crypto.randomBytes(24);
    assert.lengthOf(entropy, 48);
  });

  it('should return 28 bytes of entropy hex encoded', () => {
    let entropy = BITBOX.Crypto.randomBytes(28);
    assert.lengthOf(entropy, 56);
  });

  it('should return 20 bytes of entropy hex encoded', () => {
    let entropy = BITBOX.Crypto.randomBytes(32);
    assert.lengthOf(entropy, 64);
  });
});
