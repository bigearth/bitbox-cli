let fixtures = require('./fixtures/Address.json')
let chai = require('chai');
let assert = require('assert');
let BITBOXCli = require('./../lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();
let axios = require('axios');
let sinon = require('sinon');
let Bitcoin = require('bitcoincashjs-lib');

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

let HASH160_HASHES = flatten([
  fixtures.hash160MainnetP2PKH,
  fixtures.hash160MainnetP2SH,
  fixtures.hash160TestnetP2PKH
]);

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

describe('#addressConversion', () => {
  describe('#toLegacyAddress', () => {
    it('should translate legacy address format to itself correctly', () => {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(BITBOX.Address.toLegacyAddress),
        LEGACY_ADDRESSES
      );
    })

    it('should convert cashaddr address to legacy base58Check', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(BITBOX.Address.toLegacyAddress),
        LEGACY_ADDRESSES
      );
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.toLegacyAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.toLegacyAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#toCashAddress', () => {
    it('should convert legacy base58Check address to cashaddr', () => {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(address => BITBOX.Address.toCashAddress(address, true)),
        CASHADDR_ADDRESSES
      );
    });

    it('should translate cashaddr address format to itself correctly', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(address => BITBOX.Address.toCashAddress(address, true)),
        CASHADDR_ADDRESSES
      );
    })

    it('should translate no-prefix cashaddr address format to itself correctly', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map(address => BITBOX.Address.toCashAddress(address, true)),
        CASHADDR_ADDRESSES
      )
    })

    it('should translate no-prefix cashaddr address format to itself correctly', () => {
      CASHADDR_ADDRESSES.forEach((address) => {
        let noPrefix = BITBOX.Address.toCashAddress(address, false);
        assert.equal(address.split(':')[1], noPrefix);
      });
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
  describe('#toHash160', () => {
    it('should convert legacy base58check address to hash160', () => {
      assert.deepEqual(
        LEGACY_ADDRESSES.map(BITBOX.Address.toHash160),
        HASH160_HASHES
      );
    })

    it('should convert cashaddr address to hash160', () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES.map(BITBOX.Address.toHash160),
        HASH160_HASHES
      );
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.toHash160()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.toHash160('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });
  describe('#fromHash160', () => {
    it('should convert hash160 to mainnet P2PKH legacy base58check address', () => {
      assert.deepEqual(
        fixtures.hash160MainnetP2PKH.map(hash160 => BITBOX.Address.hash160ToLegacy(hash160)),
        fixtures.legacyMainnetP2PKH
      );
    })

    it('should convert hash160 to mainnet P2SH legacy base58check address', () => {
      assert.deepEqual(
        fixtures.hash160MainnetP2SH.map(hash160 => BITBOX.Address.hash160ToLegacy(hash160, Bitcoin.networks.bitcoin.scriptHash)),
        fixtures.legacyMainnetP2SH
      );
    })

    it('should convert hash160 to testnet P2PKH legacy base58check address', () => {
      assert.deepEqual(
        fixtures.hash160TestnetP2PKH.map(hash160 => BITBOX.Address.hash160ToLegacy(hash160, Bitcoin.networks.testnet.pubKeyHash)),
        fixtures.legacyTestnetP2PKH
      );
    })

    it('should convert hash160 to mainnet P2PKH cash address', () => {
      assert.deepEqual(
        fixtures.hash160MainnetP2PKH.map(hash160 => BITBOX.Address.hash160ToCash(hash160)),
        fixtures.cashaddrMainnetP2PKH
      );
    })

    it('should convert hash160 to mainnet P2SH cash address', () => {
      assert.deepEqual(
        fixtures.hash160MainnetP2SH.map(hash160 => BITBOX.Address.hash160ToCash(hash160, Bitcoin.networks.bitcoin.scriptHash)),
        fixtures.cashaddrMainnetP2SH
      );
    })

    it('should convert hash160 to testnet P2PKH cash address', () => {
      assert.deepEqual(
        fixtures.hash160TestnetP2PKH.map(hash160 => BITBOX.Address.hash160ToCash(hash160, Bitcoin.networks.testnet.pubKeyHash)),
        fixtures.cashaddrTestnetP2PKH
      );
    })

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.hash160ToLegacy()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.hash160ToLegacy('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.hash160ToCash()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.hash160ToCash('some invalid address')
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
          let isBase58Check = BITBOX.Address.isLegacyAddress(address);
          assert.equal(isBase58Check, true);
        });
      });
    });
    describe('is not legacy', () => {
      CASHADDR_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a legacy address`, () => {
          let isBase58Check = BITBOX.Address.isLegacyAddress(address);
          assert.equal(isBase58Check, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.isLegacyAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.isLegacyAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isCashAddress', () => {
    describe('is cashaddr', () => {
      CASHADDR_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a cashaddr address`, () => {
          let isCashaddr = BITBOX.Address.isCashAddress(address);
          assert.equal(isCashaddr, true);
        });
      });
    });

    describe('is not cashaddr', () => {
      LEGACY_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a cashaddr address`, () => {
          let isCashaddr = BITBOX.Address.isCashAddress(address);
          assert.equal(isCashaddr, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.isCashAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.isCashAddress('some invalid address')
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
          let isMainnet = BITBOX.Address.isMainnetAddress(address);
          assert.equal(isMainnet, true);
        });
      });
    });

    describe('is not mainnet', () => {
      TESTNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a mainnet address`, () => {
          let isMainnet = BITBOX.Address.isMainnetAddress(address);
          assert.equal(isMainnet, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.isMainnetAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.isMainnetAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isTestnetAddress', () => {
    describe('is testnet', () => {
      TESTNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a testnet address`, () => {
          let isTestnet = BITBOX.Address.isTestnetAddress(address);
          assert.equal(isTestnet, true);
        });
      });
    });

    describe('is not testnet', () => {
      MAINNET_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a testnet address`, () => {
          let isTestnet = BITBOX.Address.isTestnetAddress(address);
          assert.equal(isTestnet, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.isTestnetAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.isTestnetAddress('some invalid address')
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
          let isP2PKH = BITBOX.Address.isP2PKHAddress(address);
          assert.equal(isP2PKH, true);
        });
      });
    });

    describe('is not P2PKH', () => {
      P2SH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a P2PKH address`, () => {
          let isP2PKH = BITBOX.Address.isP2PKHAddress(address);
          assert.equal(isP2PKH, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.isP2PKHAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.isP2PKHAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });

  describe('#isP2SHAddress', () => {
    describe('is P2SH', () => {
      P2SH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is a P2SH address`, () => {
          let isP2SH = BITBOX.Address.isP2SHAddress(address);
          assert.equal(isP2SH, true);
        });
      });
    });

    describe('is not P2SH', () => {
      P2PKH_ADDRESSES.forEach((address) => {
        it(`should detect ${address} is not a P2SH address`, () => {
          let isP2SH = BITBOX.Address.isP2SHAddress(address);
          assert.equal(isP2SH, false);
        });
      });
    });

    describe('errors', () => {
      it('should fail when called with an invalid address', () => {
        assert.throws(() => {
          BITBOX.Address.isP2SHAddress()
        }, BITBOX.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          BITBOX.Address.isP2SHAddress('some invalid address')
        }, BITBOX.BitcoinCash.InvalidAddressError)
      })
    });
  });
});

describe('cashaddr prefix detection', () => {
  it('should return the same result for detectAddressFormat', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.detectAddressFormat),
      CASHADDR_ADDRESSES.map(BITBOX.Address.detectAddressFormat)
    )
  })
  it('should return the same result for detectAddressNetwork', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.detectAddressNetwork),
      CASHADDR_ADDRESSES.map(BITBOX.Address.detectAddressNetwork)
    )
  })
  it('should return the same result for detectAddressType', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.detectAddressType),
      CASHADDR_ADDRESSES.map(BITBOX.Address.detectAddressType)
    )
  })
  it('should return the same result for toLegacyAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.toLegacyAddress),
      CASHADDR_ADDRESSES.map(BITBOX.Address.toLegacyAddress)
    )
  })
  it('should return the same result for isLegacyAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.isLegacyAddress),
      CASHADDR_ADDRESSES.map(BITBOX.Address.isLegacyAddress)
    )
  })
  it('should return the same result for isCashAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.isCashAddress),
      CASHADDR_ADDRESSES.map(BITBOX.Address.isCashAddress)
    )
  })
  it('should return the same result for isMainnetAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.isMainnetAddress),
      CASHADDR_ADDRESSES.map(BITBOX.Address.isMainnetAddress)
    )
  })
  it('should return the same result for isTestnetAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.isTestnetAddress),
      CASHADDR_ADDRESSES.map(BITBOX.Address.isTestnetAddress)
    )
  })
  it('should return the same result for isP2PKHAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.isP2PKHAddress),
      CASHADDR_ADDRESSES.map(BITBOX.Address.isP2PKHAddress)
    )
  })
  it('should return the same result for isP2SHAddress', () => {
    assert.deepEqual(
      CASHADDR_ADDRESSES_NO_PREFIX.map(BITBOX.Address.isP2SHAddress),
      CASHADDR_ADDRESSES.map(BITBOX.Address.isP2SHAddress)
    )
  })
})

describe('#detectAddressFormat', () => {
  LEGACY_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a legacy base58Check address`, () => {
      let isBase58Check = BITBOX.Address.detectAddressFormat(address);
      assert.equal(isBase58Check, 'legacy');
    });
  });

  CASHADDR_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a legacy cashaddr address`, () => {
      let isCashaddr = BITBOX.Address.detectAddressFormat(address);
      assert.equal(isCashaddr, 'cashaddr');
    });
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.Address.detectAddressFormat()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.Address.detectAddressFormat('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    })
  });
});

describe('#detectAddressNetwork', () => {
  MAINNET_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a mainnet address`, () => {
      let isMainnet = BITBOX.Address.detectAddressNetwork(address);
      assert.equal(isMainnet, 'mainnet');
    })
  });

  TESTNET_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a testnet address`, () => {
      let isTestnet = BITBOX.Address.detectAddressNetwork(address);
      assert.equal(isTestnet, 'testnet');
    });
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.Address.detectAddressNetwork()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.Address.detectAddressNetwork('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    });
  });
});

describe('#detectAddressType', () => {
  P2PKH_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a P2PKH address`, () => {
      let isP2PKH = BITBOX.Address.detectAddressType(address);
      assert.equal(isP2PKH, 'p2pkh');
    })
  });

  P2SH_ADDRESSES.forEach((address) => {
    it(`should detect ${address} is a P2SH address`, () => {
      let isP2SH = BITBOX.Address.detectAddressType(address);
      assert.equal(isP2SH, 'p2sh');
    })
  });

  describe('errors', () => {
    it('should fail when called with an invalid address', () => {
      assert.throws(() => {
        BITBOX.Address.detectAddressType()
      }, BITBOX.BitcoinCash.InvalidAddressError)
      assert.throws(() => {
        BITBOX.Address.detectAddressType('some invalid address')
      }, BITBOX.BitcoinCash.InvalidAddressError)
    })
  });
});

describe('#fromXPub', () => {
  XPUBS.forEach((xpub, i) => {
    xpub.addresses.forEach((address, j) => {
      it(`generate public external change address ${j} for ${xpub.xpub}`, () => {
        assert.equal(BITBOX.Address.fromXPub(xpub.xpub, `0/${j}`), address);
      });
    });
  });
});

describe('#details', () => {
  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should get details', (done) => {
    let data = {
      "legacyAddress": "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
      "cashAddress": "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
      "balance": 300.0828874,
      "balanceSat": 30008288740,
      "totalReceived": 12945.45174649,
      "totalReceivedSat": 1294545174649,
      "totalSent": 12645.36885909,
      "totalSentSat": 1264536885909,
      "unconfirmedBalance": 0,
      "unconfirmedBalanceSat": 0,
      "unconfirmedTxApperances": 0,
      "txApperances": 1042,
      "transactions": [
        "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309"
      ]
    };

    const resolved = new Promise((r) => r({ data: data }));
    sandbox.stub(axios, 'get').returns(resolved);

    BITBOX.Address.details('bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf')
      .then((result) => {
        assert.deepEqual(
          data,
          result
        );
      })
      .then(done, done);
  });
});

describe('#utxo', () => {
  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should get utxo', (done) => {
    let data = [
      {
        "legacyAddress": "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
        "cashAddress": "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
        "txid": "6f56254424378d6914cebd097579c70664843e5876ca86f0bf412ba7f3928326",
        "vout": 0,
        "scriptPubKey": "a91479cb06a5986baf588237de9b7fb1a8f68c35b76687",
        "amount": 12.5002911,
        "satoshis": 1250029110,
        "height": 528745,
        "confirmations": 17
        },
        {
        "legacyAddress": "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
        "cashAddress": "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
        "txid": "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309",
        "vout": 0,
        "scriptPubKey": "a91479cb06a5986baf588237de9b7fb1a8f68c35b76687",
        "amount": 12.50069247,
        "satoshis": 1250069247,
        "height": 528744,
        "confirmations": 18
       }
    ];
    const resolved = new Promise((r) => r({ data: data }));
    sandbox.stub(axios, 'get').returns(resolved);

    BITBOX.Address.utxo('bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l')
      .then((result) => {
        assert.deepEqual(
          data,
          result
        );
      })
      .then(done, done);
  });
});

describe('#unconfirmed', () => {
  let sandbox;
  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('should get unconfirmed transactions', (done) => {
    let data = [
      {
        "txid": "e0aadd861a06993e39af932bb0b9ad69e7b37ef5843a13c6724789e1c94f3513",
        "vout": 1,
        "scriptPubKey": "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
        "amount": 0.00008273,
        "satoshis": 8273,
        "confirmations": 0,
        "ts": 1526680569,
        "legacyAddress": "1Fg4r9iDrEkCcDmHTy2T79EusNfhyQpu7W",
        "cashAddress": "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
      }
    ];
    const resolved = new Promise((r) => r({ data: data }));
    sandbox.stub(axios, 'get').returns(resolved);

    BITBOX.Address.unconfirmed('bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c')
      .then((result) => {
        assert.deepEqual(
          data,
          result
        );
      })
      .then(done, done);
  });
});
