let fixtures = require('./fixtures/ECPair.json')
let chai = require('chai');
let assert = require('assert');
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let script = BITBOX.Script;
let Buffer = require('safe-buffer').Buffer

describe('#ECPair', () => {
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

  describe('#fromPublicKey', () => {
    fixtures.fromPublicKey.forEach((fixture) => {
      it(`should create ECPair from public key buffer`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKey(Buffer.from(fixture.pubkeyHex, 'hex'));
        assert.equal(typeof ecpair, 'object');
      });

      it(`should get ${fixture.legacy} legacy address`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKey(Buffer.from(fixture.pubkeyHex, 'hex'));
        assert.equal(BITBOX.HDNode.toLegacyAddress(ecpair), fixture.legacy);
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKey(Buffer.from(fixture.pubkeyHex, 'hex'));
        assert.equal(BITBOX.HDNode.toCashAddress(ecpair), fixture.cashAddr);
      })
    });
  });

  describe('#toPublicKey', () => {
    fixtures.toPublicKey.forEach((fixture) => {
      it(`should create a public key buffer from an ECPair`, () => {
        let ecpair = BITBOX.ECPair.fromPublicKey(Buffer.from(fixture.pubkeyHex, 'hex'));
        let pubkeyBuffer = BITBOX.ECPair.toPublicKey(ecpair);
        assert.equal(typeof pubkeyBuffer, 'object');
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

  describe('#sign', () => {
    fixtures.sign.forEach((fixture) => {
      it(`should sign 32 byte hash buffer`, () => {
        let ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF);
        let buf = Buffer.from(BITBOX.Crypto.sha256(fixture.data), 'hex');
        let signatureBuf = BITBOX.ECPair.sign(ecpair, buf);
        assert.equal(typeof signatureBuf, 'object');
      });
    });
  });

  describe('#verify', () => {
    fixtures.verify.forEach((fixture) => {
      it(`should verify signed 32 byte hash buffer`, () => {
        let ecpair1 = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF1);
        let ecpair2 = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF2);
        let buf = Buffer.from(BITBOX.Crypto.sha256(fixture.data), 'hex');
        let signature = BITBOX.ECPair.sign(ecpair1, buf);
        let verify = BITBOX.ECPair.verify(ecpair1, buf, signature);
        assert.equal(verify, true);
      });
    });
  });
});
