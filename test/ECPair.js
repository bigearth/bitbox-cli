let fixtures = require('./fixtures/ECPair.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let script = BITBOX.Script;

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
      let ecpair = BITBOX.ECPair.fromPublicKeyHex(Buffer.from(fixture.pubkeyHex, 'hex'));
      assert.equal(typeof ecpair, 'object');
    });

    it(`should get ${fixture.legacy} legacy address`, () => {
      let ecpair = BITBOX.ECPair.fromPublicKeyHex(Buffer.from(fixture.pubkeyHex, 'hex'));
      assert.equal(BITBOX.HDNode.toLegacyAddress(ecpair), fixture.legacy);
    })

    it(`should get ${fixture.cashAddr} cash address`, () => {
      let ecpair = BITBOX.ECPair.fromPublicKeyHex(Buffer.from(fixture.pubkeyHex, 'hex'));
      assert.equal(BITBOX.HDNode.toCashAddress(ecpair), fixture.cashAddr);
    })
  });
});
