let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

function flatten (arrays) {
  return [].concat.apply([], arrays)
}

// TODO
// 1. generate testnet p2sh
// 2. generate cashaddr mainnet p2sh
// 3. generate cashaddr testnet p2sh
let LEGACY_ADDRESSES = flatten([
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyMainnetP2SH,
  fixtures.legacyTestnetP2PKH
]);

let mainnet_xpubs = [];
fixtures.mainnetXPub.forEach((f, i) => {
  mainnet_xpubs.push(f.xpub);
})
let MAINNET_ADDRESSES = flatten([
  mainnet_xpubs,
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyMainnetP2SH,
  fixtures.cashaddrMainnetP2PKH
]);

let testnet_xpubs = [];
fixtures.testnetXPub.forEach((f, i) => {
  testnet_xpubs.push(f.xpub);
})
let TESTNET_ADDRESSES = flatten([
  testnet_xpubs,
  fixtures.legacyTestnetP2PKH,
  fixtures.cashaddrTestnetP2PKH
]);

let CASHADDR_ADDRESSES = flatten([
  fixtures.cashaddrMainnetP2PKH,
  fixtures.cashaddrMainnetP2SH,
  fixtures.cashaddrTestnetP2PKH
]);

let CASHADDR_ADDRESSES_NO_PREFIX = CASHADDR_ADDRESSES.map((address) => {
  let parts = address.split(':');
  return parts[1];
})

let P2PKH_ADDRESSES = flatten([
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyTestnetP2PKH,
  fixtures.cashaddrMainnetP2PKH,
  fixtures.cashaddrTestnetP2PKH
])

let P2SH_ADDRESSES = flatten([
  fixtures.legacyMainnetP2SH,
  fixtures.cashaddrMainnetP2SH
])

let XPUBS = flatten([
  fixtures.mainnetXPub,
  fixtures.testnetXPub
])

describe('price conversion', () => {
  describe('#toBitcoinCash', () => {
    fixtures.conversion.toBCH.satoshis.forEach((satoshi) => {
      it(`should convert ${satoshi[0]} Satoshis to ${satoshi[1]} $BCH`, () => {
        assert.equal(BITBOX.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1]);
      });
    });

    fixtures.conversion.toBCH.strings.forEach((satoshi) => {
      it(`should convert "${satoshi[0]}" Satoshis as a string to ${satoshi[1]} $BCH`, () => {
        assert.equal(BITBOX.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1]);
      });
    });

    fixtures.conversion.toBCH.not.forEach((bch) => {
      it(`converts ${bch[0]} to Bitcoin Cash, not to ${bch[1]} Satoshi`, () => {
        assert.notEqual(BITBOX.BitcoinCash.toBitcoinCash(bch[0]), bch[1]);
      });
    });

    fixtures.conversion.toBCH.rounding.forEach((satoshi) => {
      it(`rounding ${satoshi[0]} to ${satoshi[1]} $BCH`, () => {
        assert.equal(BITBOX.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1]);
      });
    });
  });

  describe('#toSatoshi', () => {
    fixtures.conversion.toSatoshi.bch.forEach((bch) => {
      it(`should convert ${bch[0]} $BCH to ${bch[1]} Satoshis`, () => {
        assert.equal(BITBOX.BitcoinCash.toSatoshi(bch[0]), bch[1]);
      });
    });

    fixtures.conversion.toSatoshi.strings.forEach((bch) => {
      it(`should convert "${bch[0]}" $BCH as a string to ${bch[1]} Satoshis`, () => {
        assert.equal(BITBOX.BitcoinCash.toSatoshi(bch[0]), bch[1]);
      });
    });

    fixtures.conversion.toSatoshi.not.forEach((satoshi) => {
      it(`converts ${satoshi[0]} to Satoshi, not to ${satoshi[1]} Bitcoin Cash`, () => {
        assert.notEqual(BITBOX.BitcoinCash.toSatoshi(satoshi[0]), satoshi[1]);
      });
    });

    fixtures.conversion.toSatoshi.rounding.forEach((bch) => {
      it(`rounding ${bch[0]} to ${bch[1]} Satoshi`, () => {
        assert.equal(BITBOX.BitcoinCash.toSatoshi(bch[0]), bch[1]);
      });
    });
  });
});

describe('address conversion', () => {
  describe('#toLegacyAddress', () => {
    it('should translate legacy address format to itself correctly', () => {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(BITBOX.BitcoinCash.toLegacyAddress),
        LEGACY_ADDRESSES
      );
    })

    it('should convert cashaddr address to legacy base58Check', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.toLegacyAddress),
        LEGACY_ADDRESSES
      );
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.toLegacyAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.toLegacyAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#toCashAddress', () => {
    it('should convert legacy base58Check address to cashaddr', () => {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(BITBOX.BitcoinCash.toCashAddress),
        CASHADDR_ADDRESSES
      );
    });

    it('should translate cashaddr address format to itself correctly', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.toCashAddress),
        CASHADDR_ADDRESSES
      );
    })

    it('should translate no-prefix cashaddr address format to itself correctly', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.toCashAddress),
        CASHADDR_ADDRESSES
      )
    })

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.toCashAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.toCashAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });
});

describe('address format detection', () => {

  describe('#isLegacyAddress', () => {
    describe('is legacy', () => {
      LEGACY_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a legacy base58Check address`, () => {
          let isBase58Check = BITBOX.BitcoinCash.isLegacyAddress(address);
          assert.equal(isBase58Check, true);
        });
      });
    });
    describe('is not legacy', () => {
      CASHADDR_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a legacy address`, () => {
          let isBase58Check = BITBOX.BitcoinCash.isLegacyAddress(address);
          assert.equal(isBase58Check, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.isLegacyAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.isLegacyAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isCashAddress', () => {
    describe('is cashaddr', () => {
      CASHADDR_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a cashaddr address`, () => {
          let isCashaddr = BITBOX.BitcoinCash.isCashAddress(address);
          assert.equal(isCashaddr, true);
        });
      });
    });

    describe('is not cashaddr', () => {
      LEGACY_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a cashaddr address`, () => {
          let isCashaddr = BITBOX.BitcoinCash.isCashAddress(address);
          assert.equal(isCashaddr, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.isCashAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.isCashAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });
});

describe('network detection', () => {

  describe('#isMainnetAddress', () => {
    describe('is mainnet', () => {
      MAINNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a mainnet address`, () => {
          let isMainnet = BITBOX.BitcoinCash.isMainnetAddress(address);
          assert.equal(isMainnet, true);
        });
      });
    });

    describe('is not mainnet', () => {
      TESTNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a mainnet address`, () => {
          let isMainnet = BITBOX.BitcoinCash.isMainnetAddress(address);
          assert.equal(isMainnet, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.isMainnetAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.isMainnetAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isTestnetAddress', () => {
    describe('is testnet', () => {
      TESTNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a testnet address`, () => {
          let isTestnet = BITBOX.BitcoinCash.isTestnetAddress(address);
          assert.equal(isTestnet, true);
        });
      });
    });

    describe('is not testnet', () => {
      MAINNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a testnet address`, () => {
          let isTestnet = BITBOX.BitcoinCash.isTestnetAddress(address);
          assert.equal(isTestnet, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.isTestnetAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.isTestnetAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });
});

describe('address type detection', () => {
  describe('#isP2PKHAddress', () => {
    describe('is P2PKH', () => {
      P2PKH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a P2PKH address`, () => {
          let isP2PKH = BITBOX.BitcoinCash.isP2PKHAddress(address);
          assert.equal(isP2PKH, true);
        });
      });
    });

    describe('is not P2PKH', () => {
      P2SH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a P2PKH address`, () => {
          let isP2PKH = BITBOX.BitcoinCash.isP2PKHAddress(address);
          assert.equal(isP2PKH, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.isP2PKHAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.isP2PKHAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isP2SHAddress', () => {
    describe('is P2SH', () => {
      P2SH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a P2SH address`, () => {
          let isP2SH = BITBOX.BitcoinCash.isP2SHAddress(address);
          assert.equal(isP2SH, true);
        });
      });
    });

    describe('is not P2SH', () => {
      P2PKH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a P2SH address`, () => {
          let isP2SH = BITBOX.BitcoinCash.isP2SHAddress(address);
          assert.equal(isP2SH, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.isP2SHAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.isP2SHAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });
});

describe('cashaddr prefix detection', () => {
  it('should return the same result for detectAddressFormat', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.detectAddressFormat),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.detectAddressFormat)
    )
  })
  it('should return the same result for detectAddressNetwork', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.detectAddressNetwork),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.detectAddressNetwork)
    )
  })
  it('should return the same result for detectAddressType', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.detectAddressType),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.detectAddressType)
    )
  })
  it('should return the same result for toLegacyAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.toLegacyAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.toLegacyAddress)
    )
  })
  it('should return the same result for isLegacyAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.isLegacyAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.isLegacyAddress)
    )
  })
  it('should return the same result for isCashAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.isCashAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.isCashAddress)
    )
  })
  it('should return the same result for isMainnetAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.isMainnetAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.isMainnetAddress)
    )
  })
  it('should return the same result for isTestnetAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.isTestnetAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.isTestnetAddress)
    )
  })
  it('should return the same result for isP2PKHAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.isP2PKHAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.isP2PKHAddress)
    )
  })
  it('should return the same result for isP2SHAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.isP2SHAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.isP2SHAddress)
    )
  })
})

describe('#detectAddressFormat', () => {
  LEGACY_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a legacy base58Check address`, () => {
      let isBase58Check = BITBOX.BitcoinCash.detectAddressFormat(address);
      assert.equal(isBase58Check, 'legacy');
    });
  });

  CASHADDR_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a legacy cashaddr address`, () => {
      let isCashaddr = BITBOX.BitcoinCash.detectAddressFormat(address);
      assert.equal(isCashaddr, 'cashaddr');
    });
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.BitcoinCash.detectAddressFormat()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.BitcoinCash.detectAddressFormat('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    })
  });
});

describe('#detectAddressNetwork', () => {
  MAINNET_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a mainnet address`, () => {
      let isMainnet = BITBOX.BitcoinCash.detectAddressNetwork(address);
      assert.equal(isMainnet, 'mainnet');
    })
  });

  TESTNET_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a testnet address`, () => {
      let isTestnet = BITBOX.BitcoinCash.detectAddressNetwork(address);
      assert.equal(isTestnet, 'testnet');
    });
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.BitcoinCash.detectAddressNetwork()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.BitcoinCash.detectAddressNetwork('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    });
  });
});

describe('#detectAddressType', () => {
  P2PKH_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a P2PKH address`, () => {
      let isP2PKH = BITBOX.BitcoinCash.detectAddressType(address);
      assert.equal(isP2PKH, 'p2pkh');
    })
  });

  P2SH_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a P2SH address`, () => {
      let isP2SH = BITBOX.BitcoinCash.detectAddressType(address);
      assert.equal(isP2SH, 'p2sh');
    })
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.BitcoinCash.detectAddressType()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.BitcoinCash.detectAddressType('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    })
  });
});

describe('#generateMnemonic', () => {
  it('should generate a 12 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(128);
    assert.lengthOf(mnemonic.split(' '), 12);
  });

  it('should generate a 15 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(160);
    assert.lengthOf(mnemonic.split(' '), 15);
  });

  it('should generate a 18 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(192);
    assert.lengthOf(mnemonic.split(' '), 18);
  });

  it('should generate an 21 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(224);
    assert.lengthOf(mnemonic.split(' '), 21);
  });

  it('should generate an 24 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    assert.lengthOf(mnemonic.split(' '), 24);
  });

  it('should generate an 24 word italian mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256, BITBOX.BitcoinCash.mnemonicWordLists().italian);
    assert.lengthOf(mnemonic.split(' '), 24);
  });
});

describe('#entropyToMnemonic', () => {
  it('should generate a 12 word mnemonic', () => {
    let rand = BITBOX.Crypto.randomBytes(16);
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 12);
  });

  it('should generate a 15 word mnemonic', () => {
    let rand = BITBOX.Crypto.randomBytes(20);
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 15);
  });

  it('should generate an 18 word mnemonic', () => {
    let rand = BITBOX.Crypto.randomBytes(24);
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 18);
  });

  it('should generate an 21 word mnemonic', () => {
    let rand = BITBOX.Crypto.randomBytes(28);
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 21);
  });

  it('should generate an 24 word mnemonic', () => {
    let rand = BITBOX.Crypto.randomBytes(32);
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 24);
  });

  it('should generate an 24 french word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256, BITBOX.BitcoinCash.mnemonicWordLists().french);
    assert.lengthOf(mnemonic.split(' '), 24);
  });
});

describe('#mnemonicToEntropy', () => {
  it('should turn a 12 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(128);
    let entropy = BITBOX.BitcoinCash.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 32);
  });

  it('should turn a 15 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(160);
    let entropy = BITBOX.BitcoinCash.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 40);
  });

  it('should turn a 18 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(192);
    let entropy = BITBOX.BitcoinCash.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 48);
  });

  it('should turn a 21 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(224);
    let entropy = BITBOX.BitcoinCash.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 56);
  });

  it('should turn a 24 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let entropy = BITBOX.BitcoinCash.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 64);
  });

  it('should turn a 24 word spanish mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256, BITBOX.BitcoinCash.mnemonicWordLists().spanish);
    let entropy = BITBOX.BitcoinCash.mnemonicToEntropy(mnemonic, BITBOX.BitcoinCash.mnemonicWordLists().spanish);
    assert.lengthOf(entropy, 64);
  });
});

describe('#validateMnemonic', () => {
  it('validate a 128 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(128);
    assert.equal(BITBOX.BitcoinCash.validateMnemonic(mnemonic), true);
  });

  it('validate a 160 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(160);
    assert.equal(BITBOX.BitcoinCash.validateMnemonic(mnemonic), true);
  });

  it('validate a 192 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(192);
    assert.equal(BITBOX.BitcoinCash.validateMnemonic(mnemonic), true);
  });

  it('validate a 224 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(224);
    assert.equal(BITBOX.BitcoinCash.validateMnemonic(mnemonic), true);
  });

  it('validate a 256 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    assert.equal(BITBOX.BitcoinCash.validateMnemonic(mnemonic), true);
  });

  it('validate a 256 bit chinese simplified mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256, BITBOX.BitcoinCash.mnemonicWordLists().chinese_simplified);
    assert.equal(BITBOX.BitcoinCash.validateMnemonic(mnemonic, BITBOX.BitcoinCash.mnemonicWordLists().chinese_simplified), true);
  });
});

describe('#mnemonicToSeedHex', () => {
  it('should create 128 character hex encoded root seed from 128 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(128);
    let seedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });

  it('should create 128 character hex encoded root seed from 160 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(160);
    let seedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });

  it('should create 128 character hex encoded root seed from 192 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(192);
    let seedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });

  it('should create 128 character hex encoded root seed from 224 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(224);
    let seedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });

  it('should create 128 character hex encoded root seed from 256 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let seedHex = BITBOX.BitcoinCash.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });
});

describe('#mnemonicToSeed', () => {
  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 128 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(128);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.equal(rootSeed.byteLength, 64);
  });

  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 160 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(160);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.equal(rootSeed.byteLength, 64);
  });

  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 192 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(192);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.equal(rootSeed.byteLength, 64);
  });

  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 224 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(224);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.equal(rootSeed.byteLength, 64);
  });

  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 256 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.equal(rootSeed.byteLength, 64);
  });

  it('should create a 128 character root seed hex encoded from a 128 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(128);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.lengthOf(rootSeed.toString('hex'), 128);
  });

  it('should create a 128 character root seed hex encoded from a 160 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(160);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.lengthOf(rootSeed.toString('hex'), 128);
  });

  it('should create a 128 character root seed hex encoded from a 192 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(192);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.lengthOf(rootSeed.toString('hex'), 128);
  });

  it('should create a 128 character root seed hex encoded from a 224 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(224);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.lengthOf(rootSeed.toString('hex'), 128);
  });

  it('should create a 128 character root seed hex encoded from a 256 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, '');
    assert.lengthOf(rootSeed.toString('hex'), 128);
  });
});

describe('#mnemonicWordLists', () => {
  it('return a list of 2048 english words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.mnemonicWordLists().EN, 2048);
  });

  it('return a list of 2048 japanese words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.mnemonicWordLists().JA, 2048);
  });

  it('return a list of 2048 chinese simplified words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.mnemonicWordLists().chinese_simplified, 2048);
  });

  it('return a list of 2048 chinese traditional words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.mnemonicWordLists().chinese_traditional, 2048);
  });

  it('return a list of 2048 french words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.mnemonicWordLists().french, 2048);
  });

  it('return a list of 2048 italian words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.mnemonicWordLists().italian, 2048);
  });

  it('return a list of 2048 korean words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.mnemonicWordLists().korean, 2048);
  });

  it('return a list of 2048 spanish words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.mnemonicWordLists().spanish, 2048);
  });
});

describe('#translateMnemonic', () => {
  it('should translate mnemonic from english to chinese_simplified', () => {
    let englishMnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let chineseMnemonic = BITBOX.BitcoinCash.translateMnemonic(englishMnemonic, 'english', 'chinese_simplified')
    let englishMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(chineseMnemonic, 'chinese_simplified', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to chinese_traditional', () => {
    let englishMnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let chineseMnemonic = BITBOX.BitcoinCash.translateMnemonic(englishMnemonic, 'english', 'chinese_traditional')
    let englishMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(chineseMnemonic, 'chinese_traditional', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to french', () => {
    let englishMnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let frenchMnemonic = BITBOX.BitcoinCash.translateMnemonic(englishMnemonic, 'english', 'french')
    let englishMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(frenchMnemonic, 'french', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to italian', () => {
    let englishMnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let italianMnemonic = BITBOX.BitcoinCash.translateMnemonic(englishMnemonic, 'english', 'italian')
    let englishMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(italianMnemonic, 'italian', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to japanese', () => {
    let englishMnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let japaneseMnemonic = BITBOX.BitcoinCash.translateMnemonic(englishMnemonic, 'english', 'japanese')
    let englishMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(japaneseMnemonic, 'japanese', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to korean', () => {
    let englishMnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let koreanMnemonic = BITBOX.BitcoinCash.translateMnemonic(englishMnemonic, 'english', 'korean')
    let englishMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(koreanMnemonic, 'korean', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to spanish', () => {
    let englishMnemonic = BITBOX.BitcoinCash.generateMnemonic(256);
    let spanishMnemonic = BITBOX.BitcoinCash.translateMnemonic(englishMnemonic, 'english', 'spanish')
    let englishMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(spanishMnemonic, 'spanish', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from korean to spanish', () => {
    let koreanWordlist = BITBOX.BitcoinCash.mnemonicWordLists().korean;
    let koreanMnemonic = BITBOX.BitcoinCash.generateMnemonic(256, koreanWordlist);
    let spanishMnemonic = BITBOX.BitcoinCash.translateMnemonic(koreanMnemonic, 'korean', 'spanish')
    let koreanMnemonic2 = BITBOX.BitcoinCash.translateMnemonic(spanishMnemonic, 'spanish', 'korean')
    assert.equal(koreanMnemonic, koreanMnemonic2);
  });
});

describe('#fromSeedBuffer', () => {
  it('should create 32 byte chain code', () => {
    let rand = BITBOX.Crypto.randomBytes(32);
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(rand);
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(mnemonic, 'password');
    let masterkey = BITBOX.BitcoinCash.fromSeedBuffer(rootSeed);
    assert.equal(masterkey.chainCode.byteLength, 32);
  });
});

describe('sign and verify messages', () => {
  describe('#signMessageWithPrivKey', () => {
    fixtures.signatures.sign.forEach((sign) => {
      it(`should sign a message w/ ${sign.network} ${sign.privateKeyWIF}`, () => {
        let privateKeyWIF = sign.privateKeyWIF;
        let message = sign.message;
        let signature = BITBOX.BitcoinCash.signMessageWithPrivKey(privateKeyWIF, message)
        assert.equal(signature, sign.signature);
      });
    });
  });


  describe('#verifyMessage', () => {
    fixtures.signatures.verify.forEach((sign) => {
      it(`should verify a valid signed message from ${sign.network} cashaddr address ${sign.address}`, () => {
        assert.equal(BITBOX.BitcoinCash.verifyMessage(sign.address, sign.signature, sign.message), true);
      });
    });

    fixtures.signatures.verify.forEach((sign) => {
      let legacyAddress = BITBOX.BitcoinCash.toLegacyAddress(sign.address);
      it(`should verify a valid signed message from ${sign.network} legacy address ${legacyAddress}`, () => {
        assert.equal(BITBOX.BitcoinCash.verifyMessage(legacyAddress, sign.signature, sign.message), true);
      });
    });

    fixtures.signatures.verify.forEach((sign) => {
      let legacyAddress = BITBOX.BitcoinCash.toLegacyAddress(sign.address);
      it(`should not verify an invalid signed message from ${sign.network} cashaddr address ${sign.address}`, () => {
        assert.equal(BITBOX.BitcoinCash.verifyMessage(sign.address, sign.signature, 'nope'), false);
      });
    });
  });

});
describe('#fromXPub', () => {
  XPUBS.forEach((xpub, i) => {
    xpub.addresses.forEach((address, j) => {
      it(`generate public external change address ${j} for ${xpub.xpub}`, () => {
        assert.equal(BITBOX.BitcoinCash.fromXPub(xpub.xpub, j), address);
      });
    });
  });
});
// 1. Update to detect xpub and xpriv network format type
// 2. create BITBOX fromBase58 method
//   * confirm xpub cannot generate WIF
//   * confirm xpriv can generate WIF
// 3. create fromXPriv method w/ tests and docs
    // 1. mainnet
    //   * confirm xpriv generates address
    //   * confirm xpriv generates WIF
    // 2. testnet
    //   * confirm xpriv generates address
    //   * confirm xpriv generates WIF
