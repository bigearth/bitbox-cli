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
});
