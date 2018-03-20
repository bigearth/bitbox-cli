let fixtures = require('./fixtures/HDNode.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#fromSeedBuffer', () => {
  fixtures.fromSeedBuffer.forEach((mnemonic) => {
    it(`should create an HDNode from root seed buffer`, () => {
      let rootSeedBuffer = BITBOX.Mnemonic.mnemonicToSeedBuffer(mnemonic);
      let hdNode = BITBOX.HDNode.fromSeedBuffer(rootSeedBuffer);
      assert.notEqual(hdNode, null);
    });
  });
});

describe('#fromSeedHex', () => {
  fixtures.fromSeedHex.forEach((mnemonic) => {
    it(`should create an HDNode from root seed hex`, () => {
      let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(mnemonic);
      let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
      assert.notEqual(hdNode, null);
    });
  });
});

describe('#derive', () => {
  fixtures.derive.forEach((derive) => {
    it(`should derive non hardened child HDNode`, () => {
      let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
      let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.derive(0);
      assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub);
      assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv);
    });
  });
});

describe('#deriveHardened', () => {
  fixtures.deriveHardened.forEach((derive) => {
    it(`should derive hardened child HDNode`, () => {
      let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
      let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.deriveHardened(0);
      assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub);
      assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv);
    });
  });

  describe('derive BIP44 $BCH account', () => {
    fixtures.deriveBIP44.forEach((derive) => {
      it(`should derive BIP44 $BCH account`, () => {
        let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.deriveHardened(44).deriveHardened(145).deriveHardened(0);
        assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });
});

describe('#derivePath', () => {
  describe('derive non hardened Path', () => {
    fixtures.derivePath.forEach((derive) => {
      it(`should derive non hardened child HDNode from path`, () => {
        let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.derivePath("0");
        assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });

  describe('derive hardened Path', () => {
    fixtures.deriveHardenedPath.forEach((derive) => {
      it(`should derive hardened child HDNode from path`, () => {
        let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.derivePath("0'");
        assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });

  describe('derive BIP44 $BCH account', () => {
    fixtures.deriveBIP44.forEach((derive) => {
      it(`should derive BIP44 $BCH account`, () => {
        let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(derive.mnemonic);
        let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
        let childHDNode = hdNode.derivePath("44'/145'/0'");
        assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub);
        assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv);
      });
    });
  });
});

describe('#toLegacyAddress', () => {
  fixtures.toLegacyAddress.forEach((address) => {
    it(`should get address ${address.address} from HDNode`, () => {
      let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(address.mnemonic);
      let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.derivePath("0");
      let addy = BITBOX.HDNode.toLegacyAddress(childHDNode);
      assert.equal(addy, address.address);
    });
  });
});

describe('#toCashAddress', () => {
  fixtures.toCashAddress.forEach((address) => {
    it(`should get address ${address.address} from HDNode`, () => {
      let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(address.mnemonic);
      let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
      let childHDNode = hdNode.derivePath("0");
      let addy = BITBOX.HDNode.toCashAddress(childHDNode);
      assert.equal(addy, address.address);
    });
  });
});

describe('#toWIF', () => {
  fixtures.toWIF.forEach((fixture) => {
    it(`should get privateKeyWIF ${fixture.privateKeyWIF} from HDNode`, () => {
      let hdNode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
      assert.equal(BITBOX.HDNode.toWIF(hdNode), fixture.privateKeyWIF);
    });
  });
});

describe('#toXPub', () => {
  fixtures.toXPub.forEach((mnemonic) => {
    it(`should create xpub ${mnemonic.xpub} from an HDNode`, () => {
      let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(mnemonic.mnemonic);
      let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
      let xpub = BITBOX.HDNode.toXPub(hdNode);
      assert.equal(xpub, mnemonic.xpub);
    });
  });
});

describe('#toXPriv', () => {
  fixtures.toXPriv.forEach((mnemonic) => {
    it(`should create xpriv ${mnemonic.xpriv} from an HDNode`, () => {
      let rootSeedHex = BITBOX.Mnemonic.mnemonicToSeedHex(mnemonic.mnemonic);
      let hdNode = BITBOX.HDNode.fromSeedHex(rootSeedHex);
      let xpriv = BITBOX.HDNode.toXPriv(hdNode);
      assert.equal(xpriv, mnemonic.xpriv);
    });
  });
});

describe('#fromXPriv', () => {
  fixtures.fromXPriv.forEach((fixture) => {
    let hdNode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
    it(`should create HDNode from xpriv ${fixture.xpriv}`, () => {
      assert.notEqual(hdNode, null);
    });

    it(`should export xpriv ${fixture.xpriv}`, () => {
      assert.equal(BITBOX.HDNode.toXPriv(hdNode), fixture.xpriv);
    });

    it(`should export xpub ${fixture.xpub}`, () => {
      assert.equal(BITBOX.HDNode.toXPub(hdNode), fixture.xpub);
    });

    it(`should export legacy address ${fixture.legacy}`, () => {
      assert.equal(BITBOX.HDNode.toLegacyAddress(hdNode), fixture.legacy);
    });

    it(`should export cashaddress ${fixture.cashaddress}`, () => {
      assert.equal(BITBOX.HDNode.toCashAddress(hdNode), fixture.cashaddress);
    });

    it(`should export privateKeyWIF ${fixture.privateKeyWIF}`, () => {
      assert.equal(BITBOX.HDNode.toWIF(hdNode), fixture.privateKeyWIF);
    });
  });
});

describe('#fromXPub', () => {
  fixtures.fromXPub.forEach((fixture) => {
    let hdNode = BITBOX.HDNode.fromXPub(fixture.xpub);
    it(`should create HDNode from xpub ${fixture.xpub}`, () => {
      assert.notEqual(hdNode, null);
    });

    it(`should export xpub ${fixture.xpub}`, () => {
      assert.equal(BITBOX.HDNode.toXPub(hdNode), fixture.xpub);
    });

    it(`should export legacy address ${fixture.legacy}`, () => {
      assert.equal(BITBOX.HDNode.toLegacyAddress(hdNode), fixture.legacy);
    });

    it(`should export cashaddress ${fixture.cashaddress}`, () => {
      assert.equal(BITBOX.HDNode.toCashAddress(hdNode), fixture.cashaddress);
    });
  });
});

describe('create accounts and addresses', () => {
  fixtures.accounts.forEach((fixture) => {
    let seedHex = BITBOX.Mnemonic.mnemonicToSeedHex(fixture.mnemonic)
    let hdNode = BITBOX.HDNode.fromSeedHex(seedHex)
    let a = hdNode.derivePath("0'")
    let external = a.derivePath("0")
    let account = BITBOX.HDNode.createAccount([external]);

    it(`#createAccount`, () => {
      assert.notEqual(account, null);
    });

    describe('#getChainAddress', () => {
      let external1 = BITBOX.Address.toCashAddress(account.getChainAddress(0));
      it(`should create external change address ${external1}`, () => {
        assert.equal(external1, fixture.externals[0] );
      });
    });

    describe('#nextChainAddress', () => {
      for(let i = 0; i < 4; i++) {
        let ex = BITBOX.Address.toCashAddress(account.nextChainAddress(0));
        it(`should create external change address ${ex}`, () => {
          assert.equal(ex, fixture.externals[i + 1]);
        });
      }
    });
  });
});

describe('#fromWIF', () => {
  fixtures.fromWIF.forEach((fixture) => {
    it(`should import ${fixture.privateKeyWIF} WIF`, () => {
      let ecpair = BITBOX.HDNode.fromWIF(fixture.privateKeyWIF);
      assert.notEqual(ecpair, null);
    })

    it(`should get ${fixture.legacy} legacy address`, () => {
      let legacy = BITBOX.HDNode.fromWIF(fixture.privateKeyWIF);
      assert.equal(BITBOX.HDNode.toLegacyAddress(legacy), fixture.legacy);
    })

    it(`should get ${fixture.cashAddr} cash address`, () => {
      let cashAddr = BITBOX.HDNode.fromWIF(fixture.privateKeyWIF);
      assert.equal(BITBOX.HDNode.toCashAddress(cashAddr), fixture.cashAddr);
    })
  });
});
