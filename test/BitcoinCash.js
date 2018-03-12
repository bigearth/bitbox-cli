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

let MAINNET_ADDRESSES = flatten([
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyMainnetP2SH,
  fixtures.cashaddrMainnetP2PKH
]);

let TESTNET_ADDRESSES = flatten([
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
  describe('to legacy', () => {
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

  describe('to cashaddr', () => {
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

  describe('legacy base58Check', () => {
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

  describe('cashaddr', () => {
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

  describe('mainnet', () => {
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

  describe('testnet', () => {
    describe('is testnet', () => {
      TESTNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a testnet address`, () => {
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
  describe('P2PKH', () => {
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

  describe('P2SH', () => {
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

describe('return address format', () => {
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

describe('return address network', () => {
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

describe('return address type', () => {
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

describe('generate specific length mnemonic', () => {
  it('should generate a 12 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(16);
    assert.lengthOf(mnemonic.split(' '), 12);
  });

  it('should generate a 15 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(20);
    assert.lengthOf(mnemonic.split(' '), 15);
  });

  it('should generate an 18 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(24);
    assert.lengthOf(mnemonic.split(' '), 18);
  });

  it('should generate an 21 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(28);
    assert.lengthOf(mnemonic.split(' '), 21);
  });

  it('should generate an 24 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(32);
    assert.lengthOf(mnemonic.split(' '), 24);
  });
});

describe('create 512 bit HMAC-SHA512 root seed', () => {
  let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(BITBOX.BitcoinCash.entropyToMnemonic(32), 'password');
  it('should create 64 byte root seed', () => {
    assert.equal(rootSeed.byteLength, 64);
  });

  it('should create root seed hex encoded', () => {
    assert.lengthOf(rootSeed.toString('hex'), 128);
  });
});

describe('create master private key', () => {
  it('should create 32 byte chain code', () => {
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(BITBOX.BitcoinCash.entropyToMnemonic(32), 'password');
    let masterkey = BITBOX.BitcoinCash.fromSeedBuffer(rootSeed);
    assert.equal(masterkey.chainCode.byteLength, 32);
  });
});

describe('sign and verify messages', () => {
  it('should sign a message and produce an 88 character signature in base64 encoding', () => {

    let privateKeyWIF = '5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss'
    let message = 'This is an example of a signed message.'

    let signature = BITBOX.BitcoinCash.signMessageWithPrivKey(privateKeyWIF, message)
    assert.equal(signature.length, 88);
  });

  it('should verify a valid signed message', () => {

    let address = '1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN'
    let signature = 'HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE'
    let message = 'This is an example of a signed message.'

    assert.equal(BITBOX.BitcoinCash.verifyMessage(address, signature, message), true);
  });

  it('should not verify a invalid signed message', () => {

    let address = '1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN'
    let signature = 'HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE'
    let message = 'This is an example of an invalid message.'

    assert.equal(BITBOX.BitcoinCash.verifyMessage(address, signature, message), false);
  });
});
