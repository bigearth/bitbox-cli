let fixtures = require('./fixtures/Crypto.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#createHash', () => {
  fixtures.createSHA256Hash.forEach((data) => {
    it(`should create SHA256Hash hex encoded ${data.hash} from ${data.label}`, () => {
      let sha256Hash = BITBOX.Crypto.createHash(data.label, 'sha256');
      assert.equal(sha256Hash, data.hash);
    });

    it(`should create 64 character SHA256Hash hex encoded`, () => {
      let sha256Hash = BITBOX.Crypto.createHash(data.label, 'sha256');
      assert.lengthOf(sha256Hash, 64);
    });
  });

  fixtures.createRIPEMD160Hash.forEach((data) => {
    it(`should create RIPEMD160Hash hex encoded ${data.hash} from ${data.label}`, () => {
      let RIPEMD160Hash = BITBOX.Crypto.createHash(data.label, 'ripemd160');
      assert.equal(RIPEMD160Hash, data.hash);
    });

    it(`should create 64 character SHA256Hash hex encoded`, () => {
      let RIPEMD160Hash = BITBOX.Crypto.createHash(data.label, 'ripemd160');
      assert.lengthOf(RIPEMD160Hash, 40);
    });
  });
});

describe('#createSHA256Hash', () => {
  fixtures.createSHA256Hash.forEach((data) => {
    it(`should create SHA256Hash hex encoded ${data.hash} from ${data.label}`, () => {
      let sha256Hash = BITBOX.Crypto.createSHA256Hash(data.label);
      assert.equal(sha256Hash, data.hash);
    });

    it(`should create 64 character SHA256Hash hex encoded`, () => {
      let sha256Hash = BITBOX.Crypto.createSHA256Hash(data.label);
      assert.lengthOf(sha256Hash, 64);
    });
  });
});

describe('#createRIPEMD160Hash', () => {
  fixtures.createRIPEMD160Hash.forEach((data) => {
    it(`should create RIPEMD160Hash hex encoded ${data.hash} from ${data.label}`, () => {
      let RIPEMD160Hash = BITBOX.Crypto.createRIPEMD160Hash(data.label);
      assert.equal(RIPEMD160Hash, data.hash);
    });

    it(`should create 64 character RIPEMD160Hash hex encoded`, () => {
      let RIPEMD160Hash = BITBOX.Crypto.createRIPEMD160Hash(data.label);
      assert.lengthOf(RIPEMD160Hash, 40);
    });
  });
});

describe('#randomBytes', () => {
  for(let i = 0; i < 6; i++) {
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

    it('should return 32 bytes of entropy hex encoded', () => {
      let entropy = BITBOX.Crypto.randomBytes(32);
      assert.lengthOf(entropy, 64);
    });
  }
});

describe('#randomBytesHex', () => {
  for(let i = 0; i < 6; i++) {
    it('should return 16 bytes of entropy hex encoded', () => {
      let entropy = BITBOX.Crypto.randomBytesHex(16);
      assert.lengthOf(entropy, 32);
    });

    it('should return 20 bytes of entropy hex encoded', () => {
      let entropy = BITBOX.Crypto.randomBytesHex(20);
      assert.lengthOf(entropy, 40);
    });

    it('should return 24 bytes of entropy hex encoded', () => {
      let entropy = BITBOX.Crypto.randomBytesHex(24);
      assert.lengthOf(entropy, 48);
    });

    it('should return 28 bytes of entropy hex encoded', () => {
      let entropy = BITBOX.Crypto.randomBytesHex(28);
      assert.lengthOf(entropy, 56);
    });

    it('should return 32 bytes of entropy hex encoded', () => {
      let entropy = BITBOX.Crypto.randomBytesHex(32);
      assert.lengthOf(entropy, 64);
    });
  }
});

describe('#randomBytesBuffer', () => {
  for(let i = 0; i < 6; i++) {
    it('should return 16 bytes of entropy as a buffer', () => {
      let entropy = BITBOX.Crypto.randomBytesBuffer(16);
      assert.lengthOf(entropy, 16);
    });

    it('should return 20 bytes of entropy as a buffer', () => {
      let entropy = BITBOX.Crypto.randomBytesBuffer(20);
      assert.lengthOf(entropy, 20);
    });

    it('should return 24 bytes of entropy as a buffer', () => {
      let entropy = BITBOX.Crypto.randomBytesBuffer(24);
      assert.lengthOf(entropy, 24);
    });

    it('should return 28 bytes of entropy as a buffer', () => {
      let entropy = BITBOX.Crypto.randomBytesBuffer(28);
      assert.lengthOf(entropy, 28);
    });

    it('should return 32 bytes of entropy as a buffer', () => {
      let entropy = BITBOX.Crypto.randomBytesBuffer(32);
      assert.lengthOf(entropy, 32);
    });
  }
});
