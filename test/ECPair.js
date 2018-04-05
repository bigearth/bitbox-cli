let fixtures = require('./fixtures/ECPair.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let script = BITBOX.Script;

describe('ECPair', () => {
  describe('#fromWIF', () => {
    fixtures.fromWIF.forEach((fixture) => {
      it(`should create ECPair from WIF ${fixture.privateKeyWIF}`, () => {
        let ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        assert.equal(typeof ecpair, 'object');
      })

      it(`should get ${fixture.legacy} legacy address`, () => {
        let legacy = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        assert.equal(BITBOX.HDNode.toLegacyAddress(legacy), fixture.legacy);
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        let cashAddr = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        assert.equal(BITBOX.HDNode.toCashAddress(cashAddr), fixture.cashAddr);
      })
    });
  });

  describe('#toWIF', () => {
    fixtures.toWIF.forEach((fixture) => {
      it(`should get WIF ${fixture.privateKeyWIF} from ECPair`, () => {
        let ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        let wif = BITBOX.ECPair.toWIF(ecpair);
        assert.equal(wif, fixture.privateKeyWIF);
      })
    });
  });

  describe('#fromPublicKeyBuffer', () => {
    fixtures.fromPublicKeyBuffer.forEach((fixture) => {
      it(`should create ECPair from public key buffer`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKeyBuffer(Buffer.from(fixture.pubkeyHex, 'hex'));
        assert.equal(typeof ecpair, 'object');
      });

      it(`should get ${fixture.legacy} legacy address`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKeyBuffer(Buffer.from(fixture.pubkeyHex, 'hex'));
        assert.equal(BITBOX.HDNode.toLegacyAddress(ecpair), fixture.legacy);
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKeyBuffer(Buffer.from(fixture.pubkeyHex, 'hex'));
        assert.equal(BITBOX.HDNode.toCashAddress(ecpair), fixture.cashAddr);
      })
    });
  });

  describe('#fromPublicKeyHex', () => {
    fixtures.fromPublicKeyHex.forEach((fixture) => {
      it(`should create ECPair from ${fixture.pubkeyHex}`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKeyHex(fixture.pubkeyHex);
        assert.equal(typeof ecpair, 'object');
      });

      it(`should get ${fixture.legacy} legacy address`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKeyHex(fixture.pubkeyHex);
        assert.equal(BITBOX.HDNode.toLegacyAddress(ecpair), fixture.legacy);
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKeyHex(fixture.pubkeyHex);
        assert.equal(BITBOX.HDNode.toCashAddress(ecpair), fixture.cashAddr);
      })
    });
  });

  describe('#toPublicKeyBuffer', () => {
    fixtures.toPublicKeyBuffer.forEach((fixture) => {
      it(`should create a public key buffer from an ECPair`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKeyHex(fixture.pubkeyHex);
        let pubkeyBuffer = BITBOX.ECPair.toPublicKeyBuffer(ecpair);
        assert.equal(typeof pubkeyBuffer, 'object');
      });
    });
  });

  describe('#toPublicKeyHex', () => {
    fixtures.toPublicKeyHex.forEach((fixture) => {
      it(`should create a public key hex ${fixture.pubkeyHex} from an ECPair`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKeyHex(fixture.pubkeyHex);
        let pubkeyHex = BITBOX.ECPair.toPublicKeyHex(ecpair);
        assert.equal(pubkeyHex, fixture.pubkeyHex);
      });
    });
  });

  describe('#toLegacyAddress', () => {
    fixtures.toLegacyAddress.forEach((fixture) => {
      it(`should create legacy address ${fixture.legacy} from an ECPair`, () => {
        let ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        let legacyAddress = BITBOX.ECPair.toLegacyAddress(ecpair);
        assert.equal(legacyAddress, fixture.legacy);
      });
    });
  });

  describe('#toCashAddress', () => {
    fixtures.toCashAddress.forEach((fixture) => {
      it(`should create cash address ${fixture.cashAddr} from an ECPair`, () => {
        let ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        let cashAddr = BITBOX.ECPair.toCashAddress(ecpair);
        assert.equal(cashAddr, fixture.cashAddr);
      });
    });
  });

  describe('#signHex', () => {
    fixtures.signHex.forEach((fixture) => {
      it(`should sign 32 byte hash encoded as hex`, () => {
        let ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        let hex = BITBOX.Crypto.createSHA256Hash('EARTH');
        let signatureHex = BITBOX.ECPair.signHex(ecpair, hex);
        assert.equal(typeof signatureHex, 'object');
      });
    });
  });

  describe('#verifyHex', () => {
    fixtures.verifyHex.forEach((fixture) => {
      it(`should verify signed 32 byte hash encoded as hex`, () => {
        let ecpair1 = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF1);
        let ecpair2 = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF2);
        let hex = BITBOX.Crypto.createSHA256Hash(fixture.data);
        let signature = BITBOX.ECPair.signHex(ecpair1, hex);
        let verify = BITBOX.ECPair.verifyHex(ecpair1, hex, signature);
        assert.equal(verify, true);
      });
    });
  });

  describe('#signBuffer', () => {
    fixtures.signBuffer.forEach((fixture) => {
      it(`should sign 32 byte hash buffer`, () => {
        let ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        let buf = Buffer.from(BITBOX.Crypto.createSHA256Hash(fixture.data), 'hex');
        let signatureBuf = BITBOX.ECPair.signBuffer(ecpair, buf);
        assert.equal(typeof signatureBuf, 'object');
      });
    });
  });

  describe('#verifyBuffer', () => {
    fixtures.verifyBuffer.forEach((fixture) => {
      it(`should verify signed 32 byte hash buffer`, () => {
        let ecpair1 = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF1);
        let ecpair2 = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF2);
        let buf = Buffer.from(BITBOX.Crypto.createSHA256Hash(fixture.data), 'hex');
        let signature = BITBOX.ECPair.signBuffer(ecpair1, buf);
        let verify = BITBOX.ECPair.verifyBuffer(ecpair1, buf, signature);
        assert.equal(verify, true);
      });
    });
  });
});
