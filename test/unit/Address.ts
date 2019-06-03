// imports
import {
  AddressDetailsResult,
  AddressUnconfirmedResult,
  AddressUtxoResult
} from "bitcoin-com-rest"
import * as chai from "chai"
import { Address } from "../../lib/Address"
import { BITBOX, resturl } from "../../lib/BITBOX"

import axios from "axios"

// consts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert

// TODO: port from require to import syntax
const fixtures = require("./fixtures/Address.json")
const Bitcoin = require("bitcoincashjs-lib")
const sinon = require("sinon")
const addressMock = require("./fixtures/address-mock.js")

function flatten(arrays: any) {
  return [].concat.apply([], arrays)
}

const XPUBS: any[] = flatten([fixtures.mainnetXPub, fixtures.testnetXPub])
const XPRIVS: any[] = flatten([fixtures.mainnetXPriv, fixtures.testnetXPriv])

const LEGACY_ADDRESSES: string[] = flatten([
  fixtures.legacyMainnetP2PKH,
  fixtures.legacyMainnetP2SH,
  fixtures.legacyTestnetP2PKH,
  fixtures.legacyTestnetP2SH
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
  fixtures.cashaddrTestnetP2PKH,
  fixtures.cashaddrTestnetP2SH
])

const CASHADDR_ADDRESSES_NO_PREFIX: string[] = CASHADDR_ADDRESSES.map(
  (address: string) => {
    const parts: string[] = address.split(":")
    return parts[1]
  }
)

const REGTEST_ADDRESSES: string[] = fixtures.cashaddrRegTestP2PKH

const REGTEST_ADDRESSES_NO_PREFIX: string[] = REGTEST_ADDRESSES.map(
  (address: string) => {
    const parts: string[] = address.split(":")
    return parts[1]
  }
)

const HASH160_HASHES: string[] = flatten([
  fixtures.hash160MainnetP2PKH,
  fixtures.hash160MainnetP2SH,
  fixtures.hash160TestnetP2PKH,
  fixtures.hash160TestnetP2SH
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
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe("#Address", (): void => {
/*
  describe("#AddressConstructor", (): void => {
    it("should create instance of Address", (): void => {
      const address: Address = new Address()
      assert.equal(address instanceof Address, true)
    })

    it("should have a restURL property", (): void => {
      const address: Address = new Address()
      assert.equal(address.restURL, resturl)
    })
  })

  describe("#addressConversion", (): void => {
    describe("#toLegacyAddress", (): void => {
      it("should translate legacy address format to itself correctly", (): void => {
        assert.deepEqual(
          LEGACY_ADDRESSES.map((address: string) =>
            bitbox.Address.toLegacyAddress(address)
          ),
          LEGACY_ADDRESSES
        )
      })

      it("should convert cashaddr address to legacy base58Check", (): void => {
        assert.deepEqual(
          CASHADDR_ADDRESSES.map((address: string) =>
            bitbox.Address.toLegacyAddress(address)
          ),
          LEGACY_ADDRESSES
        )
      })

      it("should convert cashaddr regtest address to legacy base58Check", (): void => {
        assert.deepEqual(
          REGTEST_ADDRESSES.map((address: string) =>
            bitbox.Address.toLegacyAddress(address)
          ),
          fixtures.legacyTestnetP2PKH
        )
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.toLegacyAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.toLegacyAddress("some invalid address")
          }, "")
        })
      })
    })

    describe("#toCashAddress", (): void => {
      it("should convert legacy base58Check address to cashaddr", (): void => {
        assert.deepEqual(
          LEGACY_ADDRESSES.map((address: string) =>
            bitbox.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it("should convert legacy base58Check address to regtest cashaddr", (): void => {
        assert.deepEqual(
          fixtures.legacyTestnetP2PKH.map((address: string) =>
            bitbox.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it("should translate cashaddr address format to itself correctly", (): void => {
        assert.deepEqual(
          CASHADDR_ADDRESSES.map((address: string) =>
            bitbox.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it("should translate regtest cashaddr address format to itself correctly", (): void => {
        assert.deepEqual(
          REGTEST_ADDRESSES.map((address: string) =>
            bitbox.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it("should translate no-prefix cashaddr address format to itself correctly", (): void => {
        assert.deepEqual(
          CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
            bitbox.Address.toCashAddress(address, true)
          ),
          CASHADDR_ADDRESSES
        )
      })

      it("should translate no-prefix regtest cashaddr address format to itself correctly", (): void => {
        assert.deepEqual(
          REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
            bitbox.Address.toCashAddress(address, true, true)
          ),
          REGTEST_ADDRESSES
        )
      })

      it("should translate cashaddr address format to itself of no-prefix correctly", (): void => {
        CASHADDR_ADDRESSES.forEach((address: string) => {
          const noPrefix = bitbox.Address.toCashAddress(address, false)
          assert.equal(address.split(":")[1], noPrefix)
        })
      })

      it("should translate regtest cashaddr address format to itself of no-prefix correctly", (): void => {
        REGTEST_ADDRESSES.forEach((address: string) => {
          const noPrefix = bitbox.Address.toCashAddress(address, false, true)
          assert.equal(address.split(":")[1], noPrefix)
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.toCashAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.toCashAddress("some invalid address")
          }, "")
        })
      })
    })
    describe("#legacyToHash160", (): void => {
      it("should convert legacy base58check address to hash160", (): void => {
        assert.deepEqual(
          LEGACY_ADDRESSES.map((address: string) =>
            bitbox.Address.legacyToHash160(address)
          ),
          HASH160_HASHES
        )
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.legacyToHash160()
          }, "")
          assert.throws(() => {
            bitbox.Address.legacyToHash160("some invalid address")
          }, "")
        })
      })
    })
    describe("#cashToHash160", (): void => {
      it("should convert cashaddr address to hash160", (): void => {
        assert.deepEqual(
          CASHADDR_ADDRESSES.map((address: string) =>
            bitbox.Address.cashToHash160(address)
          ),
          HASH160_HASHES
        )
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.cashToHash160()
          }, "")
          assert.throws(() => {
            bitbox.Address.cashToHash160("some invalid address")
          }, "")
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
    //       }, '')
    //       assert.throws(() => {
    //         bitbox.Address.regtestToHash160("some invalid address")
    //       }, '')
    //     })
    //   })
    // })
    describe("#fromHash160", (): void => {
      it("should convert hash160 to mainnet P2PKH legacy base58check address", (): void => {
        assert.deepEqual(
          fixtures.hash160MainnetP2PKH.map((hash160: string) =>
            bitbox.Address.hash160ToLegacy(hash160)
          ),
          fixtures.legacyMainnetP2PKH
        )
      })

      it("should convert hash160 to mainnet P2SH legacy base58check address", (): void => {
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

      it("should convert hash160 to testnet P2PKH legacy base58check address", (): void => {
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

      it("should convert hash160 to mainnet P2PKH cash address", (): void => {
        assert.deepEqual(
          fixtures.hash160MainnetP2PKH.map((hash160: string) =>
            bitbox.Address.hash160ToCash(hash160)
          ),
          fixtures.cashaddrMainnetP2PKH
        )
      })

      it("should convert hash160 to mainnet P2SH cash address", (): void => {
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

      it("should convert hash160 to testnet P2PKH cash address", (): void => {
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

      it("should convert hash160 to regtest P2PKH cash address", (): void => {
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

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.hash160ToLegacy()
          }, "")
          assert.throws(() => {
            bitbox.Address.hash160ToLegacy("some invalid address")
          }, "")
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.hash160ToCash()
          }, "")
          assert.throws(() => {
            bitbox.Address.hash160ToCash("some invalid address")
          }, "")
        })
      })
    })
  })

  describe("address format detection", (): void => {
    describe("#isLegacyAddress", (): void => {
      describe("is legacy", (): void => {
        LEGACY_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a legacy base58Check address`, (): void => {
            const isBase58Check = bitbox.Address.isLegacyAddress(address)
            assert.equal(isBase58Check, true)
          })
        })
      })
      describe("is not legacy", (): void => {
        CASHADDR_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a legacy address`, (): void => {
            const isBase58Check = bitbox.Address.isLegacyAddress(address)
            assert.equal(isBase58Check, false)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a legacy address`, (): void => {
            const isBase58Check = bitbox.Address.isLegacyAddress(address)
            assert.equal(isBase58Check, false)
          })
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.isLegacyAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.isLegacyAddress("some invalid address")
          }, "")
        })
      })
    })

    describe("#isCashAddress", (): void => {
      describe("is cashaddr", (): void => {
        CASHADDR_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a cashaddr address`, (): void => {
            const isCashaddr = bitbox.Address.isCashAddress(address)
            assert.equal(isCashaddr, true)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a cashaddr address`, (): void => {
            const isCashaddr = bitbox.Address.isCashAddress(address)
            assert.equal(isCashaddr, true)
          })
        })
      })

      describe("is not cashaddr", (): void => {
        LEGACY_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a cashaddr address`, (): void => {
            const isCashaddr = bitbox.Address.isCashAddress(address)
            assert.equal(isCashaddr, false)
          })
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.isCashAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.isCashAddress("some invalid address")
          }, "")
        })
      })
    })
    describe("#isHash160", (): void => {
      describe("is hash160", (): void => {
        HASH160_HASHES.forEach((address: string) => {
          it(`should detect ${address} is a hash160 hash`, (): void => {
            const isHash160 = bitbox.Address.isHash160(address)
            assert.equal(isHash160, true)
          })
        })
      })
      describe("is not hash160", (): void => {
        LEGACY_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a hash160 hash`, (): void => {
            const isHash160 = bitbox.Address.isHash160(address)
            assert.equal(isHash160, false)
          })
        })

        CASHADDR_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a hash160 hash`, (): void => {
            const isHash160 = bitbox.Address.isHash160(address)
            assert.equal(isHash160, false)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a legacy address`, (): void => {
            const isHash160 = bitbox.Address.isHash160(address)
            assert.equal(isHash160, false)
          })
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.isHash160()
          }, "")
          assert.throws(() => {
            bitbox.Address.isHash160("some invalid address")
          }, "")
        })
      })
    })
  })

  describe("network detection", (): void => {
    describe("#isMainnetAddress", (): void => {
      describe("is mainnet", (): void => {
        MAINNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a mainnet address`, (): void => {
            const isMainnet = bitbox.Address.isMainnetAddress(address)
            assert.equal(isMainnet, true)
          })
        })
      })

      describe("is not mainnet", (): void => {
        TESTNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a mainnet address`, (): void => {
            const isMainnet = bitbox.Address.isMainnetAddress(address)
            assert.equal(isMainnet, false)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a mainnet address`, (): void => {
            const isMainnet = bitbox.Address.isMainnetAddress(address)
            assert.equal(isMainnet, false)
          })
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.isMainnetAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.isMainnetAddress("some invalid address")
          }, "")
        })
      })
    })

    describe("#isTestnetAddress", (): void => {
      describe("is testnet", (): void => {
        TESTNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a testnet address`, (): void => {
            const isTestnet = bitbox.Address.isTestnetAddress(address)
            assert.equal(isTestnet, true)
          })
        })
      })

      describe("is not testnet", (): void => {
        MAINNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a testnet address`, (): void => {
            const isTestnet = bitbox.Address.isTestnetAddress(address)
            assert.equal(isTestnet, false)
          })
        })

        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a testnet address`, (): void => {
            const isTestnet = bitbox.Address.isTestnetAddress(address)
            assert.equal(isTestnet, false)
          })
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.isTestnetAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.isTestnetAddress("some invalid address")
          }, "")
        })
      })
    })

    describe("#isRegTestAddress", (): void => {
      describe("is testnet", () => {
        REGTEST_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a regtest address`, (): void => {
            const isRegTest = bitbox.Address.isRegTestAddress(address)
            assert.equal(isRegTest, true)
          })
        })
      })

      describe("is not testnet", (): void => {
        MAINNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a regtest address`, (): void => {
            const isRegTest = bitbox.Address.isRegTestAddress(address)
            assert.equal(isRegTest, false)
          })
        })

        TESTNET_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a regtest address`, (): void => {
            const isRegTest = bitbox.Address.isRegTestAddress(address)
            assert.equal(isRegTest, false)
          })
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.isRegTestAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.isRegTestAddress("some invalid address")
          }, "")
        })
      })
    })
  })

  describe("address type detection", (): void => {
    describe("#isP2PKHAddress", (): void => {
      describe("is P2PKH", (): void => {
        P2PKH_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a P2PKH address`, (): void => {
            const isP2PKH = bitbox.Address.isP2PKHAddress(address)
            assert.equal(isP2PKH, true)
          })
        })
      })

      describe("is not P2PKH", (): void => {
        P2SH_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a P2PKH address`, (): void => {
            const isP2PKH = bitbox.Address.isP2PKHAddress(address)
            assert.equal(isP2PKH, false)
          })
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.isP2PKHAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.isP2PKHAddress("some invalid address")
          }, "")
        })
      })
    })

    describe("#isP2SHAddress", (): void => {
      describe("is P2SH", (): void => {
        P2SH_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is a P2SH address`, (): void => {
            const isP2SH = bitbox.Address.isP2SHAddress(address)
            assert.equal(isP2SH, true)
          })
        })
      })

      describe("is not P2SH", (): void => {
        P2PKH_ADDRESSES.forEach((address: string) => {
          it(`should detect ${address} is not a P2SH address`, (): void => {
            const isP2SH = bitbox.Address.isP2SHAddress(address)
            assert.equal(isP2SH, false)
          })
        })
      })

      describe("errors", (): void => {
        it("should fail when called with an invalid address", (): void => {
          assert.throws(() => {
            // @ts-ignore
            bitbox.Address.isP2SHAddress()
          }, "")
          assert.throws(() => {
            bitbox.Address.isP2SHAddress("some invalid address")
          }, "")
        })
      })
    })
  })

  describe("cashaddr prefix detection", (): void => {
    it("should return the same result for detectAddressFormat", (): void => {
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
    it("should return the same result for detectAddressNetwork", (): void => {
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
    it("should return the same result for detectAddressType", (): void => {
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
    it("should return the same result for toLegacyAddress", (): void => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.toLegacyAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.toLegacyAddress(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.toLegacyAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.toLegacyAddress(address)
        )
      )
    })
    it("should return the same result for isLegacyAddress", (): void => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isLegacyAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.isLegacyAddress(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isLegacyAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.isLegacyAddress(address)
        )
      )
    })
    it("should return the same result for isCashAddress", (): void => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isCashAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.isCashAddress(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isCashAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.isCashAddress(address)
        )
      )
    })
    it("should return the same result for isMainnetAddress", (): void => {
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
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.isMainnetAddress(address)
        )
      )
    })
    it("should return the same result for isTestnetAddress", (): void => {
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
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.isTestnetAddress(address)
        )
      )
    })
    it("should return the same result for isP2PKHAddress", (): void => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isP2PKHAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.isP2PKHAddress(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isP2PKHAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.isP2PKHAddress(address)
        )
      )
    })
    it("should return the same result for isP2SHAddress", (): void => {
      assert.deepEqual(
        CASHADDR_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isP2SHAddress(address)
        ),
        CASHADDR_ADDRESSES.map((address: string) =>
          bitbox.Address.isP2SHAddress(address)
        )
      )
      assert.deepEqual(
        REGTEST_ADDRESSES_NO_PREFIX.map((address: string) =>
          bitbox.Address.isP2SHAddress(address)
        ),
        REGTEST_ADDRESSES.map((address: string) =>
          bitbox.Address.isP2SHAddress(address)
        )
      )
    })
  })

  describe("#detectAddressFormat", (): void => {
    LEGACY_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a legacy base58Check address`, (): void => {
        const isBase58Check = bitbox.Address.detectAddressFormat(address)
        assert.equal(isBase58Check, "legacy")
      })
    })

    CASHADDR_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a legacy cashaddr address`, (): void => {
        const isCashaddr = bitbox.Address.detectAddressFormat(address)
        assert.equal(isCashaddr, "cashaddr")
      })
    })

    REGTEST_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a legacy cashaddr address`, (): void => {
        const isCashaddr = bitbox.Address.detectAddressFormat(address)
        assert.equal(isCashaddr, "cashaddr")
      })
    })

    describe("errors", (): void => {
      it("should fail when called with an invalid address", (): void => {
        assert.throws(() => {
          // @ts-ignore
          bitbox.Address.detectAddressFormat()
        }, "")
        assert.throws(() => {
          bitbox.Address.detectAddressFormat("some invalid address")
        }, "")
      })
    })
  })

  describe("#detectAddressNetwork", (): void => {
    MAINNET_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a mainnet address`, (): void => {
        const isMainnet = bitbox.Address.detectAddressNetwork(address)
        assert.equal(isMainnet, "mainnet")
      })
    })

    TESTNET_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a testnet address`, (): void => {
        const isTestnet = bitbox.Address.detectAddressNetwork(address)
        assert.equal(isTestnet, "testnet")
      })
    })

    REGTEST_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a testnet address`, (): void => {
        const isTestnet = bitbox.Address.detectAddressNetwork(address)
        assert.equal(isTestnet, "regtest")
      })
    })

    describe("errors", (): void => {
      it("should fail when called with an invalid address", (): void => {
        assert.throws(() => {
          // @ts-ignore
          bitbox.Address.detectAddressNetwork()
        }, "")
        assert.throws(() => {
          bitbox.Address.detectAddressNetwork("some invalid address")
        }, "")
      })
    })
  })

  describe("#detectAddressType", (): void => {
    P2PKH_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a P2PKH address`, (): void => {
        const isP2PKH: string = bitbox.Address.detectAddressType(address)
        assert.equal(isP2PKH, "p2pkh")
      })
    })

    P2SH_ADDRESSES.forEach((address: string) => {
      it(`should detect ${address} is a P2SH address`, (): void => {
        const isP2SH: string = bitbox.Address.detectAddressType(address)
        assert.equal(isP2SH, "p2sh")
      })
    })

    describe("errors", (): void => {
      it("should fail when called with an invalid address", (): void => {
        assert.throws(() => {
          // @ts-ignore
          bitbox.Address.detectAddressType()
        }, "")
        assert.throws(() => {
          bitbox.Address.detectAddressType("some invalid address")
        }, "")
      })
    })
  })

  describe("#fromXPub", (): void => {
    XPUBS.forEach(
      (xpub: any): void => {
        xpub.addresses.forEach(
          (address: any, j: number): void => {
            it(`should generate public external change address ${j} for ${
              xpub.xpub
            }`, (): void => {
              assert.equal(
                bitbox.Address.fromXPub(xpub.xpub, `0/${j}`),
                address
              )
            })
          }
        )
      }
    )

    it(`should generate public external change address ${
      XPUBS[0].addresses[0]
    } for ${XPUBS[0].xpub}`, (): void => {
      const address: string = XPUBS[0].addresses[0]
      assert.equal(bitbox.Address.fromXPub(XPUBS[0].xpub), address)
    })
  })

  describe("#fromXPriv", (): void => {
    XPRIVS.forEach(
      (xpriv: any): void => {
        xpriv.addresses.forEach(
          (address: string, j: number): void => {
            it(`should generate hardened address ${j} for ${
              xpriv.xpriv
            }`, (): void => {
              assert.equal(
                bitbox.Address.fromXPriv(xpriv.xpriv, `0'/${j}`),
                address
              )
            })
          }
        )
      }
    )

    it(`should generate hardened address ${XPRIVS[0].addresses[0]} for ${
      XPRIVS[0].xpriv
    }`, (): void => {
      const address: string = XPRIVS[0].addresses[0]
      assert.equal(bitbox.Address.fromXPriv(XPRIVS[0].xpriv), address)
    })
  })

  describe("#fromOutputScript", (): void => {
    const script: Buffer = bitbox.Script.encode([
      Buffer.from("BOX", "ascii"),
      bitbox.Script.opcodes.OP_CAT,
      Buffer.from("BITBOX", "ascii"),
      bitbox.Script.opcodes.OP_EQUAL
    ])

    // hash160 script buffer
    const p2sh_hash160: Buffer = bitbox.Crypto.hash160(script)

    // encode hash160 as P2SH output
    const scriptPubKey: Buffer = bitbox.Script.encodeP2SHOutput(p2sh_hash160)
    fixtures.p2shMainnet.forEach(
      (address: string): void => {
        const p2shAddress: string = bitbox.Address.fromOutputScript(
          scriptPubKey
        )
        it(`generate mainnet address from output script`, (): void => {
          assert.equal(p2shAddress, address)
        })
      }
    )

    fixtures.p2shTestnet.forEach(
      (address: string): void => {
        const p2shAddress: any = bitbox.Address.fromOutputScript(
          scriptPubKey,
          "testnet"
        )
        it(`generate testnet address from output script`, (): void => {
          assert.equal(p2shAddress, address)
        })
      }
    )
  })
*/
  describe("#details", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it(`should GET address details for a single address`, async (): Promise<
      any
    > => {

      // Mock out data for unit test, to prevent live network call.
      const data: any = addressMock.details
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const addr: string =
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result:
        | AddressDetailsResult
        | AddressDetailsResult[] = await bitbox.Address.details(addr)
      //console.log(`result: ${JSON.stringify(result,null,2)}`)

      assert.hasAllKeys(result, [
        "balance",
        "balanceSat",
        "totalReceived",
        "totalReceivedSat",
        "totalSent",
        "totalSentSat",
        "unconfirmedBalance",
        "unconfirmedBalanceSat",
        "unconfirmedTxApperances",
        "txApperances",
        "transactions",
        "legacyAddress",
        "cashAddress",
        "slpAddress",
        "currentPage",
        "pagesTotal"
      ])
      if (!Array.isArray(result)) assert.isArray(result.transactions)
    })

    it(`should GET address details for an array of addresses`, async (): Promise<
      any
    > => {
      const addr: string[] = [
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
        "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      ]

      const result:
        | AddressDetailsResult
        | AddressDetailsResult[] = await bitbox.Address.details(addr)

      assert.isArray(result)
      if (Array.isArray(result)) {
        assert.hasAllKeys(result[0], [
          "balance",
          "balanceSat",
          "totalReceived",
          "totalReceivedSat",
          "totalSent",
          "totalSentSat",
          "unconfirmedBalance",
          "unconfirmedBalanceSat",
          "unconfirmedTxApperances",
          "txApperances",
          "transactions",
          "legacyAddress",
          "cashAddress",
          "slpAddress",
          "currentPage",
          "pagesTotal"
        ])
        assert.isArray(result[0].transactions)
      }
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr: any = 12345

        await bitbox.Address.details(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bitbox.Address.details(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })

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
  /*
  describe(`#utxo`, (): void => {
    describe(`#details`, (): void => {

      it(`should GET utxos for a single address`, async () => {
        const addr: string =
          "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

        const result:
          | AddressUtxoResult
          | AddressUtxoResult[] = await bitbox.Address.utxo(addr)

        assert.hasAllKeys(result, [
          "utxos",
          "legacyAddress",
          "cashAddress",
          "slpAddress",
          "scriptPubKey"
        ])
        if (!Array.isArray(result)) {
          assert.isArray(result.utxos)
          assert.hasAnyKeys(result.utxos[0], [
            "txid",
            "vout",
            "amount",
            "satoshis",
            "height",
            "confirmations"
          ])
        }
      })

      it(`should GET utxo details for an array of addresses`, async () => {
        const addr: string[] = [
          "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
          "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
        ]

        const result:
          | AddressUtxoResult
          | AddressUtxoResult[] = await bitbox.Address.utxo(addr)

        assert.isArray(result)
        if (Array.isArray(result)) {
          assert.hasAllKeys(result[0], [
            "utxos",
            "legacyAddress",
            "cashAddress",
            "slpAddress",
            "scriptPubKey"
          ])
          assert.isArray(result[0].utxos)
          assert.hasAnyKeys(result[0].utxos[0], [
            "txid",
            "vout",
            "amount",
            "satoshis",
            "height",
            "confirmations"
          ])
        }
      })

      it(`should throw an error for improper input`, async () => {
        try {
          const addr: any = 12345

          await bitbox.Address.utxo(addr)
          assert.equal(true, false, "Unexpected result!")
        } catch (err) {
          //console.log(`err: `, err)
          assert.include(
            err.message,
            `Input address must be a string or array of strings`
          )
        }
      })

      it(`should throw error on array size rate limit`, async (): Promise<
        any
      > => {
        try {
          const addr: string[] = []
          for (let i: number = 0; i < 25; i++)
            addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

          const result:
            | AddressUtxoResult
            | AddressUtxoResult[] = await bitbox.Address.utxo(addr)

          console.log(`result: ${util.inspect(result)}`)
          assert.equal(true, false, "Unexpected result!")
        } catch (err) {
          assert.hasAnyKeys(err, ["error"])
          assert.include(err.error, "Array too large")
        }
      })
    })
*/
  describe(`#unconfirmed`, (): void => {
    it(`should GET unconfirmed details on a single address`, async (): Promise<
      any
    > => {
      const addr: string =
        "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs"

      const result:
        | AddressUnconfirmedResult
        | AddressUnconfirmedResult[] = await bitbox.Address.unconfirmed(addr)

      assert.hasAllKeys(result, [
        "utxos",
        "legacyAddress",
        "cashAddress",
        "slpAddress",
        "scriptPubKey"
      ])
      if (!Array.isArray(result)) assert.isArray(result.utxos)
    })

    it(`should GET unconfirmed details on multiple addresses`, async (): Promise<
      any
    > => {
      const addr = [
        "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs",
        "bitcoincash:qqcp8fw06dmjd2gnfanpwytj7q93w408nv7usdqgsk"
      ]

      const result:
        | AddressUnconfirmedResult
        | AddressUnconfirmedResult[] = await bitbox.Address.unconfirmed(addr)

      assert.isArray(result)
      if (Array.isArray(result)) {
        assert.hasAllKeys(result[0], [
          "utxos",
          "legacyAddress",
          "cashAddress",
          "slpAddress",
          "scriptPubKey"
        ])
        assert.isArray(result[0].utxos)
      }
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr: any = 12345

        await bitbox.Address.unconfirmed(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async (): Promise<
      any
    > => {
      try {
        const addr: string[] = []
        for (let i: number = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result:
          | AddressUnconfirmedResult
          | AddressUnconfirmedResult[] = await bitbox.Address.unconfirmed(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#transactions`, (): void => {
    it(`should GET transactions for a single address`, async (): Promise<
      any
    > => {
      const addr: string =
        "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs"
      const result: any = await bitbox.Address.transactions(addr)

      assert.hasAllKeys(result, [
        "txs",
        "pagesTotal",
        "cashAddress",
        "currentPage",
        "legacyAddress"
      ])
      assert.isArray(result.txs)
      assert.hasAnyKeys(result.txs[0], [
        "txid",
        "version",
        "locktime",
        "vin",
        "vout",
        "confirmations",
        "time",
        "blocktime",
        "valueOut",
        "size",
        "valueIn",
        "fees"
      ])
    })

    it(`should get transactions on multiple addresses`, async (): Promise<
      any
    > => {
      const addr: string[] = [
        "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs",
        "bitcoincash:qqcp8fw06dmjd2gnfanpwytj7q93w408nv7usdqgsk"
      ]
      const result: any = await bitbox.Address.transactions(addr)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "txs",
        "pagesTotal",
        "cashAddress",
        "currentPage",
        "legacyAddress"
      ])
      assert.isArray(result[0].txs)
      assert.hasAnyKeys(result[0].txs[0], [
        "txid",
        "version",
        "locktime",
        "vin",
        "vout",
        "confirmations",
        "time",
        "blocktime",
        "valueOut",
        "size",
        "valueIn",
        "fees"
      ])
    })

    it(`should throw an error for improper input`, async (): Promise<any> => {
      try {
        const addr: any = 12345

        await bitbox.Address.transactions(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async (): Promise<
      any
    > => {
      try {
        const addr: string[] = []
        for (let i: number = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result: any = await bitbox.Address.transactions(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
// })
