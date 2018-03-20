let fixtures = require('./fixtures/Address.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

function flatten (arrays) {
  return [].concat.apply([], arrays)
}

let XPUBS = flatten([
  fixtures.mainnetXPub,
  fixtures.testnetXPub
])

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

describe('address conversion', () => {
  describe('#toLegacyAddress', () => {
    it('should translate legacy address format to itself correctly', () => {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(BITBOX.BitcoinCash.Address.toLegacyAddress),
        LEGACY_ADDRESSES
      );
    })

    it('should convert cashaddr address to legacy base58Check', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.toLegacyAddress),
        LEGACY_ADDRESSES
      );
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.toLegacyAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.toLegacyAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#toCashAddress', () => {
    it('should convert legacy base58Check address to cashaddr', () => {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(BITBOX.BitcoinCash.Address.toCashAddress),
        CASHADDR_ADDRESSES
      );
    });

    it('should translate cashaddr address format to itself correctly', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.toCashAddress),
        CASHADDR_ADDRESSES
      );
    })

    it('should translate no-prefix cashaddr address format to itself correctly', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.toCashAddress),
        CASHADDR_ADDRESSES
      )
    })

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.Addresst.oCashAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.Addresst.toCashAddress('some invalid address')
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
          let isBase58Check = BITBOX.BitcoinCash.Address.isLegacyAddress(address);
          assert.equal(isBase58Check, true);
        });
      });
    });
    describe('is not legacy', () => {
      CASHADDR_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a legacy address`, () => {
          let isBase58Check = BITBOX.BitcoinCash.Address.isLegacyAddress(address);
          assert.equal(isBase58Check, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isLegacyAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isLegacyAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isCashAddress', () => {
    describe('is cashaddr', () => {
      CASHADDR_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a cashaddr address`, () => {
          let isCashaddr = BITBOX.BitcoinCash.Address.isCashAddress(address);
          assert.equal(isCashaddr, true);
        });
      });
    });

    describe('is not cashaddr', () => {
      LEGACY_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a cashaddr address`, () => {
          let isCashaddr = BITBOX.BitcoinCash.Address.isCashAddress(address);
          assert.equal(isCashaddr, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isCashAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isCashAddress('some invalid address')
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
          let isMainnet = BITBOX.BitcoinCash.Address.isMainnetAddress(address);
          assert.equal(isMainnet, true);
        });
      });
    });

    describe('is not mainnet', () => {
      TESTNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a mainnet address`, () => {
          let isMainnet = BITBOX.BitcoinCash.Address.isMainnetAddress(address);
          assert.equal(isMainnet, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isMainnetAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isMainnetAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isTestnetAddress', () => {
    describe('is testnet', () => {
      TESTNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a testnet address`, () => {
          let isTestnet = BITBOX.BitcoinCash.Address.isTestnetAddress(address);
          assert.equal(isTestnet, true);
        });
      });
    });

    describe('is not testnet', () => {
      MAINNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a testnet address`, () => {
          let isTestnet = BITBOX.BitcoinCash.Address.isTestnetAddress(address);
          assert.equal(isTestnet, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isTestnetAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isTestnetAddress('some invalid address')
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
          let isP2PKH = BITBOX.BitcoinCash.Address.isP2PKHAddress(address);
          assert.equal(isP2PKH, true);
        });
      });
    });

    describe('is not P2PKH', () => {
      P2SH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a P2PKH address`, () => {
          let isP2PKH = BITBOX.BitcoinCash.Address.isP2PKHAddress(address);
          assert.equal(isP2PKH, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isP2PKHAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isP2PKHAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isP2SHAddress', () => {
    describe('is P2SH', () => {
      P2SH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a P2SH address`, () => {
          let isP2SH = BITBOX.BitcoinCash.Address.isP2SHAddress(address);
          assert.equal(isP2SH, true);
        });
      });
    });

    describe('is not P2SH', () => {
      P2PKH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a P2SH address`, () => {
          let isP2SH = BITBOX.BitcoinCash.Address.isP2SHAddress(address);
          assert.equal(isP2SH, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isP2SHAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.BitcoinCash.Address.isP2SHAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });
});

describe('cashaddr prefix detection', () => {
  it('should return the same result for detectAddressFormat', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.detectAddressFormat),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.detectAddressFormat)
    )
  })
  it('should return the same result for detectAddressNetwork', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.detectAddressNetwork),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.detectAddressNetwork)
    )
  })
  it('should return the same result for detectAddressType', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.detectAddressType),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.detectAddressType)
    )
  })
  it('should return the same result for toLegacyAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.toLegacyAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.toLegacyAddress)
    )
  })
  it('should return the same result for isLegacyAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.isLegacyAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.isLegacyAddress)
    )
  })
  it('should return the same result for isCashAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.isCashAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.isCashAddress)
    )
  })
  it('should return the same result for isMainnetAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.isMainnetAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.isMainnetAddress)
    )
  })
  it('should return the same result for isTestnetAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.isTestnetAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.isTestnetAddress)
    )
  })
  it('should return the same result for isP2PKHAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.isP2PKHAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.isP2PKHAddress)
    )
  })
  it('should return the same result for isP2SHAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.BitcoinCash.Address.isP2SHAddress),
      CASHADDR_ADDRESSES.map(BITBOX.BitcoinCash.Address.isP2SHAddress)
    )
  })
})

describe('#detectAddressFormat', () => {
  LEGACY_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a legacy base58Check address`, () => {
      let isBase58Check = BITBOX.BitcoinCash.Address.detectAddressFormat(address);
      assert.equal(isBase58Check, 'legacy');
    });
  });

  CASHADDR_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a legacy cashaddr address`, () => {
      let isCashaddr = BITBOX.BitcoinCash.Address.detectAddressFormat(address);
      assert.equal(isCashaddr, 'cashaddr');
    });
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.BitcoinCash.Address.detectAddressFormat()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.BitcoinCash.Address.detectAddressFormat('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    })
  });
});

describe('#detectAddressNetwork', () => {
  MAINNET_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a mainnet address`, () => {
      let isMainnet = BITBOX.BitcoinCash.Address.detectAddressNetwork(address);
      assert.equal(isMainnet, 'mainnet');
    })
  });

  TESTNET_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a testnet address`, () => {
      let isTestnet = BITBOX.BitcoinCash.Address.detectAddressNetwork(address);
      assert.equal(isTestnet, 'testnet');
    });
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.BitcoinCash.Address.detectAddressNetwork()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.BitcoinCash.Address.detectAddressNetwork('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    });
  });
});

describe('#detectAddressType', () => {
  P2PKH_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a P2PKH address`, () => {
      let isP2PKH = BITBOX.BitcoinCash.Address.detectAddressType(address);
      assert.equal(isP2PKH, 'p2pkh');
    })
  });

  P2SH_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a P2SH address`, () => {
      let isP2SH = BITBOX.BitcoinCash.Address.detectAddressType(address);
      assert.equal(isP2SH, 'p2sh');
    })
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.BitcoinCash.Address.detectAddressType()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.BitcoinCash.Address.detectAddressType('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    })
  });
});

describe('#fromWIF', () => {
  fixtures.fromWIF.forEach((fixture) => {
    it(`should import ${fixture.privateKeyWIF} WIF`, () => {
      let ecpair = BITBOX.BitcoinCash.Address.fromWIF(fixture.privateKeyWIF);
      assert.notEqual(ecpair, null);
    })

    it(`should get ${fixture.legacy} legacy address`, () => {
      let legacy = BITBOX.BitcoinCash.Address.fromWIF(fixture.privateKeyWIF);
      assert.equal(BITBOX.BitcoinCash.HDNode.getLegacyAddress(legacy), fixture.legacy);
    })

    it(`should get ${fixture.cashAddr} cash address`, () => {
      let cashAddr = BITBOX.BitcoinCash.Address.fromWIF(fixture.privateKeyWIF);
      assert.equal(BITBOX.BitcoinCash.HDNode.getCashAddress(cashAddr), fixture.cashAddr);
    })
  });
  //
  // P2SH_ADDRESSES.forEach((address) => {
  //   it(`should detect ${address} is a P2SH address`, () => {
  //     let isP2SH = BITBOX.BitcoinCash.Address.detectAddressType(address);
  //     assert.equal(isP2SH, 'p2sh');
  //   })
  // });
  //
  // describe('errors', () => {
  //   it('should fail when called with an invalid address', () => {
  //     assert.throws(() => {
  //       BITBOX.BitcoinCash.Address.detectAddressType()
  //     }, BITBOX.BitcoinCash.InvalidAddressError)
  //     assert.throws(() => {
  //       BITBOX.BitcoinCash.Address.detectAddressType('some invalid address')
  //     }, BITBOX.BitcoinCash.InvalidAddressError)
  //   })
  // });
});

describe('#fromXPub', () => {
  XPUBS.forEach((xpub, i) => {
    xpub.addresses.forEach((address, j) => {
      it(`generate public external change address ${j} for ${xpub.xpub}`, () => {
        assert.equal(BITBOX.BitcoinCash.Address.fromXPub(xpub.xpub, `0/${j}`), address);
      });
    });
  });
});
