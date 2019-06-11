// imports
import * as chai from "chai"
import { BITBOX } from "../../lib/BITBOX"
import { BitcoinCash, BIP21Object } from "../../lib/BitcoinCash"

// consts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert

// TODO: port from require to import syntax
const fixtures = require("./fixtures/BitcoinCash.json")

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

describe("#BitcoinCash", (): void => {

  describe("#BitcoinCashConstructor", (): void => {
    it("should create instance of BitcoinCash", (): void => {
      const bitcoinCash: BitcoinCash = new BitcoinCash()
      assert.equal(bitcoinCash instanceof BitcoinCash, true)
    })
  })

  describe("price conversion", (): void => {
    describe("#toBitcoinCash", (): void => {
      fixtures.conversion.toBCH.satoshis.forEach((satoshi: any): void => {
        it(`should convert ${satoshi[0]} Satoshis to ${
          satoshi[1]
          } $BCH`, (): void => {
            assert.equal(bitbox.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1])
          })
      })

      fixtures.conversion.toBCH.strings.forEach((satoshi: any): void => {
        it(`should convert "${satoshi[0]}" Satoshis as a string to ${
          satoshi[1]
          } $BCH`, (): void => {
            assert.equal(bitbox.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1])
          })
      })

      fixtures.conversion.toBCH.not.forEach((bch: any): void => {
        it(`converts ${bch[0]} to Bitcoin Cash, not to ${
          bch[1]
          } Satoshi`, (): void => {
            assert.notEqual(bitbox.BitcoinCash.toBitcoinCash(bch[0]), bch[1])
          })
      })

      fixtures.conversion.toBCH.rounding.forEach((satoshi: any): void => {
        it(`rounding ${satoshi[0]} to ${satoshi[1]} $BCH`, (): void => {
          assert.equal(bitbox.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1])
        })
      })
    })

    describe("#toSatoshi", (): void => {
      fixtures.conversion.toSatoshi.bch.forEach((bch: any): void => {
        it(`should convert ${bch[0]} $BCH to ${bch[1]} Satoshis`, (): void => {
          assert.equal(bitbox.BitcoinCash.toSatoshi(bch[0]), bch[1])
        })
      })

      fixtures.conversion.toSatoshi.strings.forEach((bch: any): void => {
        it(`should convert "${bch[0]}" $BCH as a string to ${
          bch[1]
          } Satoshis`, (): void => {
            assert.equal(bitbox.BitcoinCash.toSatoshi(bch[0]), bch[1])
          })
      })

      fixtures.conversion.toSatoshi.not.forEach((satoshi: any): void => {
        it(`converts ${satoshi[0]} to Satoshi, not to ${
          satoshi[1]
          } Bitcoin Cash`, (): void => {
            assert.notEqual(bitbox.BitcoinCash.toSatoshi(satoshi[0]), satoshi[1])
          })
      })

      fixtures.conversion.toSatoshi.rounding.forEach((bch: any): void => {
        it(`rounding ${bch[0]} to ${bch[1]} Satoshi`, (): void => {
          assert.equal(bitbox.BitcoinCash.toSatoshi(bch[0]), bch[1])
        })
      })
    })
  })

  describe("#toBits", (): void => {
    fixtures.conversion.satsToBits.bch.forEach((bch: any): void => {
      it(`should convert ${bch[0]} BCH to ${bch[1]} bits`, (): void => {
        assert.equal(
          bitbox.BitcoinCash.toBits(bitbox.BitcoinCash.toSatoshi(bch[0])),
          bch[1]
        )
      })

      fixtures.conversion.satsToBits.strings.forEach((bch: any): void => {
        it(`should convert "${bch[0]}" BCH as a string to ${
          bch[1]
          } bits`, (): void => {
            assert.equal(
              bitbox.BitcoinCash.toBits(bitbox.BitcoinCash.toSatoshi(bch[0])),
              bch[1]
            )
          })
      })
    })

    describe("#satsToBits", (): void => {
      fixtures.conversion.satsToBits.bch.forEach((bch: any): void => {
        it(`should convert ${bch[0]} BCH to ${bch[1]} bits`, (): void => {
          assert.equal(
            bitbox.BitcoinCash.satsToBits(bitbox.BitcoinCash.toSatoshi(bch[0])),
            bch[1]
          )
        })
      })

      fixtures.conversion.satsToBits.strings.forEach((bch: any): void => {
        it(`should convert "${bch[0]}" BCH as a string to ${
          bch[1]
          } bits`, (): void => {
            assert.equal(
              bitbox.BitcoinCash.satsToBits(bitbox.BitcoinCash.toSatoshi(bch[0])),
              bch[1]
            )
          })
      })
    })

    describe("sign and verify messages", (): void => {
      describe("#signMessageWithPrivKey", (): void => {
        fixtures.signatures.sign.forEach((sign: any): void => {
          it(`should sign a message w/ ${sign.network} ${
            sign.privateKeyWIF
            }`, () => {
              const privateKeyWIF: string = sign.privateKeyWIF
              const message: string = sign.message
              const signature: string = bitbox.BitcoinCash.signMessageWithPrivKey(
                privateKeyWIF,
                message
              )
              assert.equal(signature, sign.signature)
            })
        })
      })

      describe("#verifyMessage", (): void => {
        fixtures.signatures.verify.forEach((sign: any): void => {
          it(`should verify a valid signed message from ${
            sign.network
            } cashaddr address ${sign.address}`, (): void => {
              assert.equal(
                bitbox.BitcoinCash.verifyMessage(
                  sign.address,
                  sign.signature,
                  sign.message
                ),
                true
              )
            })
        })

        fixtures.signatures.verify.forEach((sign: any): void => {
          const legacyAddress = bitbox.Address.toLegacyAddress(sign.address)
          it(`should verify a valid signed message from ${
            sign.network
            } legacy address ${legacyAddress}`, (): void => {
              assert.equal(
                bitbox.BitcoinCash.verifyMessage(
                  legacyAddress,
                  sign.signature,
                  sign.message
                ),
                true
              )
            })
        })

        fixtures.signatures.verify.forEach((sign: any): void => {
          const legacyAddress = bitbox.Address.toLegacyAddress(sign.address)
          it(`should not verify an invalid signed message from ${
            sign.network
            } cashaddr address ${sign.address}`, (): void => {
              assert.equal(
                bitbox.BitcoinCash.verifyMessage(
                  sign.address,
                  sign.signature,
                  "nope"
                ),
                false
              )
            })
        })
      })
    })

    describe("encode and decode to base58Check", (): void => {
      describe("#encodeBase58Check", (): void => {
        fixtures.encodeBase58Check.forEach((base58Check: any): void => {
          it(`encode ${base58Check.hex} as base58Check ${
            base58Check.base58Check
            }`, (): void => {
              assert.equal(
                bitbox.BitcoinCash.encodeBase58Check(base58Check.hex),
                base58Check.base58Check
              )
            })
        })
      })

      describe("#decodeBase58Check", (): void => {
        fixtures.encodeBase58Check.forEach((base58Check: any): void => {
          it(`decode ${base58Check.base58Check} as ${base58Check.hex}`, (): void => {
            assert.equal(
              bitbox.BitcoinCash.decodeBase58Check(base58Check.base58Check),
              base58Check.hex
            )
          })
        })
      })
    })

    describe("encode and decode BIP21 urls", (): void => {
      describe("#encodeBIP21", (): void => {
        fixtures.bip21.valid.forEach((bip21: any): void => {
          it(`encode ${bip21.address} as url`, (): void => {
            const url: string = bitbox.BitcoinCash.encodeBIP21(
              bip21.address,
              bip21.options
            )
            assert.equal(url, bip21.url)
          })
        })
        fixtures.bip21.valid_regtest.forEach((bip21: any): void => {
          it(`encode ${bip21.address} as url`, (): void => {
            const url: string = bitbox.BitcoinCash.encodeBIP21(
              bip21.address,
              bip21.options,
              true
            )
            assert.equal(url, bip21.url)
          })
        })
      })

      describe("#decodeBIP21", (): void => {
        fixtures.bip21.valid.forEach((bip21: any): void => {
          it(`decodes ${bip21.url}`, (): void => {
            const decoded: BIP21Object = bitbox.BitcoinCash.decodeBIP21(bip21.url)
            assert.equal(
              bitbox.Address.toCashAddress(decoded.address),
              bitbox.Address.toCashAddress(bip21.address)
            )
            if (decoded.options) {
              assert.equal(decoded.options.amount, bip21.options.amount)
              assert.equal(decoded.options.label, bip21.options.label)
            }
          })
        })
        // fixtures.bip21.valid_regtest.forEach((bip21, i) => {
        //   it(`decodes ${bip21.url}`, () => {
        //     const decoded = bitbox.BitcoinCash.decodeBIP21(bip21.url)
        //     assert.equal(decoded.options.amount, bip21.options.amount)
        //     assert.equal(decoded.options.label, bip21.options.label)
        //     assert.equal(
        //       bitbox.Address.toCashAddress(decoded.address, true, true),
        //       bitbox.Address.toCashAddress(bip21.address, true, true)
        //     )
        //   })
        // })
      })
    })

    describe("#getByteCount", (): void => {
      fixtures.getByteCount.forEach((fixture: any): void => {
        it(`get byte count`, (): void => {
          const byteCount: number = bitbox.BitcoinCash.getByteCount(
            fixture.inputs,
            fixture.outputs
          )
          assert.equal(byteCount, fixture.byteCount)
        })
      })
    })

    describe("#bip38", (): void => {
      describe("#encryptBIP38", (): void => {
        fixtures.bip38.encrypt.mainnet.forEach((fixture: any): void => {
          it(`BIP 38 encrypt wif ${fixture.wif} with password ${
            fixture.password
            } on mainnet`, (): void => {
              const encryptedKey: string = bitbox.BitcoinCash.encryptBIP38(
                fixture.wif,
                fixture.password
              )
              assert.equal(encryptedKey, fixture.encryptedKey)
            })
        })

        fixtures.bip38.encrypt.testnet.forEach((fixture: any): void => {
          it(`BIP 38 encrypt wif ${fixture.wif} with password ${
            fixture.password
            } on testnet`, (): void => {
              const encryptedKey: string = bitbox.BitcoinCash.encryptBIP38(
                fixture.wif,
                fixture.password
              )
              assert.equal(encryptedKey, fixture.encryptedKey)
            })
        })
      })

      describe("#decryptBIP38", (): void => {
        fixtures.bip38.decrypt.mainnet.forEach((fixture: any): void => {
          it(`BIP 38 decrypt encrypted key ${
            fixture.encryptedKey
            } on mainnet`, (): void => {
              const wif: string = bitbox.BitcoinCash.decryptBIP38(
                fixture.encryptedKey,
                fixture.password,
                "mainnet"
              )
              assert.equal(wif, fixture.wif)
            })
        })

        fixtures.bip38.decrypt.testnet.forEach((fixture: any): void => {
          it(`BIP 38 decrypt encrypted key ${
            fixture.encryptedKey
            } on testnet`, (): void => {
              const wif: string = bitbox.BitcoinCash.decryptBIP38(
                fixture.encryptedKey,
                fixture.password,
                "testnet"
              )
              assert.equal(wif, fixture.wif)
            })
        })
      })
    })
  })
})

