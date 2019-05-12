import * as assert from "assert";
import axios from "axios";
import * as sinon from "sinon";

// TODO: port from require to import syntax
const fixtures = require("./fixtures/Address.json")
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Address = require("../../lib/Address").Address
const Bitcoin = require("bitcoincashjs-lib")
const resturl = require("../../lib/BITBOX").resturl

function flatten(arrays: any) {
  return [].concat.apply([], arrays)
}

const XPUBS: string[] = flatten([fixtures.mainnetXPub, fixtures.testnetXPub])
const XPRIVS: string[] = flatten([fixtures.mainnetXPriv, fixtures.testnetXPriv])

const LEGACY_ADDRESSES: string[] = flatten([
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyMainnetP2SH,
  fixtures.legacyTestnetP2PKH
])

const mainnet_xpubs: string[] = []
fixtures.mainnetXPub.forEach((f: any) => {
  mainnet_xpubs.push(f.xpub)
})
const MAINNET_ADDRESSES: string[] = flatten([
  mainnet_xpubs,
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyMainnetP2SH,
  fixtures.cashaddrMainnetP2PKH
])

const testnet_xpubs: string[] = []
fixtures.testnetXPub.forEach((f: any) => {
  testnet_xpubs.push(f.xpub)
})
const TESTNET_ADDRESSES: string[] = flatten([
  testnet_xpubs,
  fixtures.legacyTestnetP2PKH,
  fixtures.cashaddrTestnetP2PKH
])

const CASHADDR_ADDRESSES: string[] = flatten([
  fixtures.cashaddrMainnetP2PKH,
  fixtures.cashaddrMainnetP2SH,
  fixtures.cashaddrTestnetP2PKH
])

const CASHADDR_ADDRESSES_NO_PREFIX: string[] = CASHADDR_ADDRESSES.map((address: string) => {
  const parts = address.split(":")
  return parts[1]
})

const REGTEST_ADDRESSES: string[] = fixtures.cashaddrRegTestP2PKH

const REGTEST_ADDRESSES_NO_PREFIX: string[] = REGTEST_ADDRESSES.map((address: string) => {
  const parts = address.split(":")
  return parts[1]
})

const HASH160_HASHES: string[] = flatten([
  fixtures.hash160MainnetP2PKH,
  fixtures.hash160MainnetP2SH,
  fixtures.hash160TestnetP2PKH
])

const P2PKH_ADDRESSES: string[] = flatten([
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyTestnetP2PKH,
  fixtures.cashaddrMainnetP2PKH,
  fixtures.cashaddrTestnetP2PKH,
  fixtures.cashaddrRegTestP2PKH
])

const P2SH_ADDRESSES: string[] = flatten([
  fixtures.legacyMainnetP2SH,
  fixtures.cashaddrMainnetP2SH
])

describe("#Address", () => {
  describe("#AddressConstructor", () => {
    it("should create instance of Address", () => {
      const address = new Address()
      assert.equal(address instanceof Address, true)
    })

    it("should have a restURL property", () => {
      const address = new Address()
      assert.equal(address.restURL, resturl)
    })
  })

  describe("#addressConversion", () => {
    describe("#toLegacyAddress", () => {
      it("should translate legacy address format to itself correctly", () => {
        assert.deepEqual(
          LEGACY_ADDRESSES.map((address: string) =>
            bitbox.Address.toLegacyAddress(address)
          ),
          LEGACY_ADDRESSES
        )
      })

      it("should convert cashaddr address to legacy base58Check", () => {
        assert.deepEqual(
          CASHADDR_ADDRESSES.map((address: string) =>
            bitbox.Address.toLegacyAddress(address)
          ),
          LEGACY_ADDRESSES
        )
      })

      it("should convert cashaddr regtest address to legacy base58Check", () => {
        assert.deepEqual(
          REGTEST_ADDRESSES.map((address: string) =>
            bitbox.Address.toLegacyAddress(address)
          ),
          fixtures.legacyTestnetP2PKH
        )
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.toLegacyAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.toLegacyAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe("#toCashAddress", () => {
      it("should convert legacy base58Check address to cashaddr", () => {
        assert.deepEqual(
          LEGACY_ADDRESSES.map((address: string) =>
            bitbox.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it("should convert legacy base58Check address to regtest cashaddr", () => {
        assert.deepEqual(
          fixtures.legacyTestnetP2PKH.map((address: string) =>
            bitbox.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it("should translate cashaddr address format to itself correctly", () => {
        assert.deepEqual(
          CASHADDR_ADDRESSES.map((address: string) =>
            bitbox.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it("should translate regtest cashaddr address format to itself correctly", () => {
        assert.deepEqual(
          REGTEST_ADDRESSES.map((address: string) =>
            bitbox.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it("should translate no-prefix cashaddr address format to itself correctly", () => {
        assert.deepEqual(
          CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
            bitbox.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it("should translate no-prefix regtest cashaddr address format to itself correctly", () => {
        assert.deepEqual(
          REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
            bitbox.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it("should translate cashaddr address format to itself of no-prefix correctly", () => {
        CASHADDR_ADDRESSES.forEach((address: string) => {
          const noPrefix = bitbox.Address.toCashAddress(address, false)
          assert.equal(address.split(":")[1], noPrefix)
        })
      })

      it("should translate regtest cashaddr address format to itself of no-prefix correctly", () => {
        REGTEST_ADDRESSES.forEach((address: string) => {
          const noPrefix = bitbox.Address.toCashAddress(address, false, true)
          assert.equal(address.split(":")[1], noPrefix)
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.BitcoinCash.Address.toCashAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.BitcoinCash.Address.toCashAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })
    describe("#legacyToHash160", () => {
      it("should convert legacy base58check address to hash160", () => {
        assert.deepEqual(
          LEGACY_ADDRESSES.map((address: string) =>
            bitbox.Address.legacyToHash160(address)
          ),
          HASH160_HASHES
        )
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.legacyToHash160()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.legacyToHash160("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })
    describe("#cashToHash160", () => {
      it("should convert cashaddr address to hash160", () => {
        assert.deepEqual(
          CASHADDR_ADDRESSES.map((address: string) =>
            bitbox.Address.cashToHash160(address)
          ),
          HASH160_HASHES
        )
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.cashToHash160()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.cashToHash160("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })
    // describe("#regtestToHash160", () => {
    //   it("should convert regtest address to hash160", () => {
    //     assert.deepEqual(
    //       REGTEST_ADDRESSES.map((address: string) =>
    //         bitbox.Address.regtestToHash160(address)
    //       ),
    //       fixtures.hash160TestnetP2PKH
    //     )
    //   })
    //
    //   describe("errors", () => {
    //     it("should fail when called with an invalid address", () => {
    //       assert.throws(() => {
    //         bitbox.Address.regtestToHash160()
    //       }, bitbox.BitcoinCash.InvalidAddressError)
    //       assert.throws(() => {
    //         bitbox.Address.regtestToHash160("some invalid address")
    //       }, bitbox.BitcoinCash.InvalidAddressError)
    //     })
    //   })
    // })
    describe("#fromHash160", () => {
      it("should convert hash160 to mainnet P2PKH legacy base58check address", () => {
        assert.deepEqual(
          fixtures.hash160MainnetP2PKH.map((hash160: string) =>
            bitbox.Address.hash160ToLegacy(hash160)
          ),
          fixtures.legacyMainnetP2PKH
        )
      })

      it("should convert hash160 to mainnet P2SH legacy base58check address", () => {
        assert.deepEqual(
          fixtures.hash160MainnetP2SH.map((hash160: string) =>
            bitbox.Address.hash160ToLegacy(
              hash160,
              Bitcoin.networks.bitcoin.scriptHash
            )
          ),
          fixtures.legacyMainnetP2SH
        )
      })

      it("should convert hash160 to testnet P2PKH legacy base58check address", () => {
        assert.deepEqual(
          fixtures.hash160TestnetP2PKH.map((hash160: string) =>
            bitbox.Address.hash160ToLegacy(
              hash160,
              Bitcoin.networks.testnet.pubKeyHash
            )
          ),
          fixtures.legacyTestnetP2PKH
        )
      })

      it("should convert hash160 to mainnet P2PKH cash address", () => {
        assert.deepEqual(
          fixtures.hash160MainnetP2PKH.map((hash160: string) =>
            bitbox.Address.hash160ToCash(hash160)
          ),
          fixtures.cashaddrMainnetP2PKH
        )
      })

      it("should convert hash160 to mainnet P2SH cash address", () => {
        assert.deepEqual(
          fixtures.hash160MainnetP2SH.map((hash160: string) =>
            bitbox.Address.hash160ToCash(
              hash160,
              Bitcoin.networks.bitcoin.scriptHash
            )
          ),
          fixtures.cashaddrMainnetP2SH
        )
      })

      it("should convert hash160 to testnet P2PKH cash address", () => {
        assert.deepEqual(
          fixtures.hash160TestnetP2PKH.map((hash160: string) =>
            bitbox.Address.hash160ToCash(
              hash160,
              Bitcoin.networks.testnet.pubKeyHash
            )
          ),
          fixtures.cashaddrTestnetP2PKH
        )
      })

      it("should convert hash160 to regtest P2PKH cash address", () => {
        assert.deepEqual(
          fixtures.hash160TestnetP2PKH.map((hash160: string) =>
            bitbox.Address.hash160ToCash(
              hash160,
              Bitcoin.networks.testnet.pubKeyHash,
              true
            )
          ),
          REGTEST_ADDRESSES
        )
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.hash160ToLegacy()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.hash160ToLegacy("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.hash160ToCash()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.hash160ToCash("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })
  })

  describe("address format detection", () => {
    describe("#isLegacyAddress", () => {
      describe("is legacy", () => {
        LEGACY_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a legacy base58Check address`, () => {
            const isBase58Check = bitbox.Address.isLegacyAddress(address)
            assert.equal(isBase58Check, true)
          })
        })
      })
      describe("is not legacy", () => {
        CASHADDR_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isBase58Check = bitbox.Address.isLegacyAddress(address)
            assert.equal(isBase58Check, false)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isBase58Check = bitbox.Address.isLegacyAddress(address)
            assert.equal(isBase58Check, false)
          })
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.isLegacyAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.isLegacyAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe("#isCashAddress", () => {
      describe("is cashaddr", () => {
        CASHADDR_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a cashaddr address`, () => {
            const isCashaddr = bitbox.Address.isCashAddress(address)
            assert.equal(isCashaddr, true)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a cashaddr address`, () => {
            const isCashaddr = bitbox.Address.isCashAddress(address)
            assert.equal(isCashaddr, true)
          })
        })
      })

      describe("is not cashaddr", () => {
        LEGACY_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a cashaddr address`, () => {
            const isCashaddr = bitbox.Address.isCashAddress(address)
            assert.equal(isCashaddr, false)
          })
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.isCashAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.isCashAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })
    describe("#isHash160", () => {
      describe("is hash160", () => {
        HASH160_HASHES.forEach((address: string) => {
          it(`should detect ${address} is a hash160 hash`, () => {
            const isHash160 = bitbox.Address.isHash160(address)
            assert.equal(isHash160, true)
          })
        })
      })
      describe("is not hash160", () => {
        LEGACY_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a hash160 hash`, () => {
            const isHash160 = bitbox.Address.isHash160(address)
            assert.equal(isHash160, false)
          })
        })

        CASHADDR_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a hash160 hash`, () => {
            const isHash160 = bitbox.Address.isHash160(address)
            assert.equal(isHash160, false)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isHash160 = bitbox.Address.isHash160(address)
            assert.equal(isHash160, false)
          })
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.isHash160()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.isHash160("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })
  })

  describe("network detection", () => {
    describe("#isMainnetAddress", () => {
      describe("is mainnet", () => {
        MAINNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a mainnet address`, () => {
            const isMainnet = bitbox.Address.isMainnetAddress(address)
            assert.equal(isMainnet, true)
          })
        })
      })

      describe("is not mainnet", () => {
        TESTNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a mainnet address`, () => {
            const isMainnet = bitbox.Address.isMainnetAddress(address)
            assert.equal(isMainnet, false)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a mainnet address`, () => {
            const isMainnet = bitbox.Address.isMainnetAddress(address)
            assert.equal(isMainnet, false)
          })
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.isMainnetAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.isMainnetAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe("#isTestnetAddress", () => {
      describe("is testnet", () => {
        TESTNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a testnet address`, () => {
            const isTestnet = bitbox.Address.isTestnetAddress(address)
            assert.equal(isTestnet, true)
          })
        })
      })

      describe("is not testnet", () => {
        MAINNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a testnet address`, () => {
            const isTestnet = bitbox.Address.isTestnetAddress(address)
            assert.equal(isTestnet, false)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a testnet address`, () => {
            const isTestnet = bitbox.Address.isTestnetAddress(address)
            assert.equal(isTestnet, false)
          })
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.isTestnetAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.isTestnetAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe("#isRegTestAddress", () => {
      describe("is testnet", () => {
        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a regtest address`, () => {
            const isRegTest = bitbox.Address.isRegTestAddress(address)
            assert.equal(isRegTest, true)
          })
        })
      })

      describe("is not testnet", () => {
        MAINNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a regtest address`, () => {
            const isRegTest = bitbox.Address.isRegTestAddress(address)
            assert.equal(isRegTest, false)
          })
        })

        TESTNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a regtest address`, () => {
            const isRegTest = bitbox.Address.isRegTestAddress(address)
            assert.equal(isRegTest, false)
          })
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.isRegTestAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.isRegTestAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })
  })

  describe("address type detection", () => {
    describe("#isP2PKHAddress", () => {
      describe("is P2PKH", () => {
        P2PKH_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a P2PKH address`, () => {
            const isP2PKH = bitbox.Address.isP2PKHAddress(address)
            assert.equal(isP2PKH, true)
          })
        })
      })

      describe("is not P2PKH", () => {
        P2SH_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a P2PKH address`, () => {
            const isP2PKH = bitbox.Address.isP2PKHAddress(address)
            assert.equal(isP2PKH, false)
          })
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.isP2PKHAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.isP2PKHAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })

    describe("#isP2SHAddress", () => {
      describe("is P2SH", () => {
        P2SH_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a P2SH address`, () => {
            const isP2SH = bitbox.Address.isP2SHAddress(address)
            assert.equal(isP2SH, true)
          })
        })
      })

      describe("is not P2SH", () => {
        P2PKH_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a P2SH address`, () => {
            const isP2SH = bitbox.Address.isP2SHAddress(address)
            assert.equal(isP2SH, false)
          })
        })
      })

      describe("errors", () => {
        it("should fail when called with an invalid address", () => {
          assert.throws(() => {
            bitbox.Address.isP2SHAddress()
          }, bitbox.BitcoinCash.InvalidAddressError)
          assert.throws(() => {
            bitbox.Address.isP2SHAddress("some invalid address")
          }, bitbox.BitcoinCash.InvalidAddressError)
        })
      })
    })
  })

  describe("cashaddr prefix detection", () => {
    it("should return the same result for detectAddressFormat", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.detectAddressFormat(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.detectAddressFormat(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.detectAddressFormat(address)
        ),
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.detectAddressFormat(address)
        )
      )
    })
    it("should return the same result for detectAddressNetwork", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.detectAddressNetwork(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.detectAddressNetwork(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.detectAddressNetwork(address)
        ),
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.detectAddressNetwork(address)
        )
      )
    })
    it("should return the same result for detectAddressType", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.detectAddressType(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.detectAddressType(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.detectAddressType(address)
        ),
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.detectAddressType(address)
        )
      )
    })
    it("should return the same result for toLegacyAddress", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.toLegacyAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) => bitbox.Address.toLegacyAddress(address))
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.toLegacyAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) => bitbox.Address.toLegacyAddress(address))
      )
    })
    it("should return the same result for isLegacyAddress", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isLegacyAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) => bitbox.Address.isLegacyAddress(address))
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isLegacyAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) => bitbox.Address.isLegacyAddress(address))
      )
    })
    it("should return the same result for isCashAddress", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isCashAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) => bitbox.Address.isCashAddress(address))
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isCashAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) => bitbox.Address.isCashAddress(address))
      )
    })
    it("should return the same result for isMainnetAddress", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isMainnetAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.isMainnetAddress(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isMainnetAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) => bitbox.Address.isMainnetAddress(address))
      )
    })
    it("should return the same result for isTestnetAddress", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isTestnetAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.isTestnetAddress(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isTestnetAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) => bitbox.Address.isTestnetAddress(address))
      )
    })
    it("should return the same result for isP2PKHAddress", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isP2PKHAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) => bitbox.Address.isP2PKHAddress(address))
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isP2PKHAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) => bitbox.Address.isP2PKHAddress(address))
      )
    })
    it("should return the same result for isP2SHAddress", () => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isP2SHAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) => bitbox.Address.isP2SHAddress(address))
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isP2SHAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) => bitbox.Address.isP2SHAddress(address))
      )
    })
  })

  describe("#detectAddressFormat", () => {
    LEGACY_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a legacy base58Check address`, () => {
        const isBase58Check = bitbox.Address.detectAddressFormat(address)
        assert.equal(isBase58Check, "legacy")
      })
    })

    CASHADDR_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a legacy cashaddr address`, () => {
        const isCashaddr = bitbox.Address.detectAddressFormat(address)
        assert.equal(isCashaddr, "cashaddr")
      })
    })

    REGTEST_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a legacy cashaddr address`, () => {
        const isCashaddr = bitbox.Address.detectAddressFormat(address)
        assert.equal(isCashaddr, "cashaddr")
      })
    })

    describe("errors", () => {
      it("should fail when called with an invalid address", () => {
        assert.throws(() => {
          bitbox.Address.detectAddressFormat()
        }, bitbox.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          bitbox.Address.detectAddressFormat("some invalid address")
        }, bitbox.BitcoinCash.InvalidAddressError)
      })
    })
  })

  describe("#detectAddressNetwork", () => {
    MAINNET_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a mainnet address`, () => {
        const isMainnet = bitbox.Address.detectAddressNetwork(address)
        assert.equal(isMainnet, "mainnet")
      })
    })

    TESTNET_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a testnet address`, () => {
        const isTestnet = bitbox.Address.detectAddressNetwork(address)
        assert.equal(isTestnet, "testnet")
      })
    })

    REGTEST_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a testnet address`, () => {
        const isTestnet = bitbox.Address.detectAddressNetwork(address)
        assert.equal(isTestnet, "regtest")
      })
    })

    describe("errors", () => {
      it("should fail when called with an invalid address", () => {
        assert.throws(() => {
          bitbox.Address.detectAddressNetwork()
        }, bitbox.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          bitbox.Address.detectAddressNetwork("some invalid address")
        }, bitbox.BitcoinCash.InvalidAddressError)
      })
    })
  })

  describe("#detectAddressType", () => {
    P2PKH_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a P2PKH address`, () => {
        const isP2PKH: string = bitbox.Address.detectAddressType(address)
        assert.equal(isP2PKH, "p2pkh")
      })
    })

    P2SH_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a P2SH address`, () => {
        const isP2SH: string = bitbox.Address.detectAddressType(address)
        assert.equal(isP2SH, "p2sh")
      })
    })

    describe("errors", () => {
      it("should fail when called with an invalid address", () => {
        assert.throws(() => {
          bitbox.Address.detectAddressType()
        }, bitbox.BitcoinCash.InvalidAddressError)
        assert.throws(() => {
          bitbox.Address.detectAddressType("some invalid address")
        }, bitbox.BitcoinCash.InvalidAddressError)
      })
    })
  })

  describe("#fromXPub", () => {
    XPUBS.forEach((xpub: any) => {
      xpub.addresses.forEach((address: any, j: number) => {
        it(`generate public external change address ${j} for ${
          xpub.xpub
          }`, () => {
            assert.equal(bitbox.Address.fromXPub(xpub.xpub, `0/${j}`), address)
          })
      })
    })
  })

  describe("#fromXPriv", () => {
    XPRIVS.forEach((xpriv: any) => {
      xpriv.addresses.forEach((address: string, j: number) => {
        it(`generate hardened address ${j} for ${xpriv.xpriv}`, () => {
          assert.equal(bitbox.Address.fromXPriv(xpriv.xpriv, `0'/${j}`), address)
        })
      })
    })
  })

  describe("#fromOutputScript", () => {
    const script: any = bitbox.Script.encode([
      Buffer.from("BOX", "ascii"),
      bitbox.Script.opcodes.OP_CAT,
      Buffer.from("BITBOX", "ascii"),
      bitbox.Script.opcodes.OP_EQUAL
    ])

    // hash160 script buffer
    const p2sh_hash160: any = bitbox.Crypto.hash160(script)

    // encode hash160 as P2SH output
    const scriptPubKey: any = bitbox.Script.scriptHash.output.encode(p2sh_hash160)
    const p2shAddress: any = bitbox.Address.fromOutputScript(scriptPubKey)
    fixtures.p2shMainnet.forEach((address: string) => {
      it(`generate address from output script`, () => {
        assert.equal(p2shAddress, address)
      })
    })
  })

  describe("#details", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get details", done => {
      const data: any = {
        legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
        cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
        balance: 300.0828874,
        balanceSat: 30008288740,
        totalReceived: 12945.45174649,
        totalReceivedSat: 1294545174649,
        totalSent: 12645.36885909,
        totalSentSat: 1264536885909,
        unconfirmedBalance: 0,
        unconfirmedBalanceSat: 0,
        unconfirmedTxApperances: 0,
        txApperances: 1042,
        transactions: [
          "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309"
        ]
      }

      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bitbox.Address.details(
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
      )
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe("#utxo", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get utxo", done => {
      const data = [
        {
          legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
          cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
          txid:
            "6f56254424378d6914cebd097579c70664843e5876ca86f0bf412ba7f3928326",
          vout: 0,
          scriptPubKey: "a91479cb06a5986baf588237de9b7fb1a8f68c35b76687",
          amount: 12.5002911,
          satoshis: 1250029110,
          height: 528745,
          confirmations: 17
        },
        {
          legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
          cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
          txid:
            "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309",
          vout: 0,
          scriptPubKey: "a91479cb06a5986baf588237de9b7fb1a8f68c35b76687",
          amount: 12.50069247,
          satoshis: 1250069247,
          height: 528744,
          confirmations: 18
        }
      ]
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bitbox.Address.utxo(
        "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l"
      )
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe("#unconfirmed", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get unconfirmed transactions", done => {
      const data = [
        {
          txid:
            "e0aadd861a06993e39af932bb0b9ad69e7b37ef5843a13c6724789e1c94f3513",
          vout: 1,
          scriptPubKey: "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
          amount: 0.00008273,
          satoshis: 8273,
          confirmations: 0,
          ts: 1526680569,
          legacyAddress: "1Fg4r9iDrEkCcDmHTy2T79EusNfhyQpu7W",
          cashAddress: "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
        }
      ]
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bitbox.Address.unconfirmed(
        "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
      )
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })
})