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
// 4. create BITBOX fromBase58 method
//   * confirm xpub cannot generate WIF
//   * confirm xpriv can generate WIF
// 5. create fromXPriv method w/ tests and docs
    // 1. mainnet
    //   * confirm xpriv generates address
    //   * confirm xpriv generates WIF
    // 2. testnet
    //   * confirm xpriv generates address
    //   * confirm xpriv generates WIF
// 6. More error test cases.
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
          BitcoinCash.toCashAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BitcoinCash.toCashAddress('some invalid address')
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

describe('encode and decode to base58Check', () => {
  describe('#encodeBase58Check', () => {
    fixtures.encodeBase58Check.forEach((base58Check, i) => {
      it(`encode ${base58Check.hex} as base58Check ${base58Check.base58Check}`, () => {
        const bytes = Buffer.from(base58Check.hex, 'hex')
        assert.equal(BITBOX.BitcoinCash.encodeBase58Check(bytes), base58Check.base58Check);
      });
    });
  });

  describe('#decodeBase58Check', () => {
    fixtures.encodeBase58Check.forEach((base58Check, i) => {
      it(`decode ${base58Check.base58Check} as ${base58Check.hex}`, () => {
        assert.equal(BITBOX.BitcoinCash.decodeBase58Check(base58Check.base58Check), base58Check.hex);
      });
    });
  });
});

describe('encode and decode BIP21 urls', () => {
  describe('#encodeBIP21', () => {
    fixtures.bip21.valid.forEach((bip21, i) => {
      it(`encode ${bip21.address} as url`, () => {
        let url = BITBOX.BitcoinCash.encodeBIP21(bip21.address, bip21.options)
        assert.equal(url, bip21.url);
      });
    });
  });

  describe('#decodeBIP21', () => {
    fixtures.bip21.valid.forEach((bip21, i) => {
      it(`decodes ${bip21.url}`, () => {
        let decoded = BITBOX.BitcoinCash.decodeBIP21(bip21.url);
        assert.equal(decoded.options.amount, bip21.options.amount);
        assert.equal(decoded.options.label, bip21.options.label);
        assert.equal(BITBOX.BitcoinCash.toCashAddress(decoded.address), BITBOX.BitcoinCash.toCashAddress(bip21.address));
      });
    });
  });
});
