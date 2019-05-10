const fixtures = require("./fixtures/HDNode.json")
const assert = require("assert")
const BITBOXSDK = require("../../lib/BITBOX").BITBOX
const BITBOX = new BITBOXSDK()
const Buffer = require("safe-buffer").Buffer

describe("#HDNode", () => {
  describe("#fromSeed", () => {
    fixtures.fromSeed.forEach(mnemonic => {
      it(`should create an HDNode from root seed buffer`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        assert.notEqual(hdNode, null)
      })
    })
  })

  describe("#derive", () => {
    fixtures.derive.forEach(derive => {
      it(`should derive non hardened child HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(derive.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = BITBOX.HDNode.derive(hdNode, 0)
        assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub)
        assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv)
      })
    })
  })

  describe("#deriveHardened", () => {
    fixtures.deriveHardened.forEach(derive => {
      it(`should derive hardened child HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(derive.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = BITBOX.HDNode.deriveHardened(hdNode, 0)
        assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub)
        assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv)
      })
    })

    describe("derive BIP44 $BCH account", () => {
      fixtures.deriveBIP44.forEach(derive => {
        it(`should derive BIP44 $BCH account`, () => {
          const rootSeedBuffer = BITBOX.Mnemonic.toSeed(derive.mnemonic)
          const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
          const purpose = BITBOX.HDNode.deriveHardened(hdNode, 44)
          const coin = BITBOX.HDNode.deriveHardened(purpose, 145)
          const childHDNode = BITBOX.HDNode.deriveHardened(coin, 0)
          assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })
  })

  describe("#derivePath", () => {
    describe("derive non hardened Path", () => {
      fixtures.derivePath.forEach(derive => {
        it(`should derive non hardened child HDNode from path`, () => {
          const rootSeedBuffer = BITBOX.Mnemonic.toSeed(derive.mnemonic)
          const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode = BITBOX.HDNode.derivePath(hdNode, "0")
          assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })

    describe("derive hardened Path", () => {
      fixtures.deriveHardenedPath.forEach(derive => {
        it(`should derive hardened child HDNode from path`, () => {
          const rootSeedBuffer = BITBOX.Mnemonic.toSeed(derive.mnemonic)
          const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode = BITBOX.HDNode.derivePath(hdNode, "0'")
          assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })

    describe("derive BIP44 $BCH account", () => {
      fixtures.deriveBIP44.forEach(derive => {
        it(`should derive BIP44 $BCH account`, () => {
          const rootSeedBuffer = BITBOX.Mnemonic.toSeed(derive.mnemonic)
          const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode = BITBOX.HDNode.derivePath(hdNode, "44'/145'/0'")
          assert.equal(BITBOX.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(BITBOX.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })
  })

  describe("#toLegacyAddress", () => {
    fixtures.toLegacyAddress.forEach(fixture => {
      it(`should get address ${fixture.address} from HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = BITBOX.HDNode.derivePath(hdNode, "0")
        const addy = BITBOX.HDNode.toLegacyAddress(childHDNode)
        assert.equal(addy, fixture.address)
      })
    })
  })

  describe("#toCashAddress", () => {
    fixtures.toCashAddress.forEach(fixture => {
      it(`should get address ${fixture.address} from HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = BITBOX.HDNode.derivePath(hdNode, "0")
        const addy = BITBOX.HDNode.toCashAddress(childHDNode)
        assert.equal(addy, fixture.address)
      })

      it(`should get address ${fixture.regtestAddress} from HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode = BITBOX.HDNode.derivePath(hdNode, "0")
        const addr = BITBOX.HDNode.toCashAddress(childHDNode, true)
        assert.equal(addr, fixture.regtestAddress)
      })
    })
  })

  describe("#toWIF", () => {
    fixtures.toWIF.forEach(fixture => {
      it(`should get privateKeyWIF ${
        fixture.privateKeyWIF
      } from HDNode`, () => {
        const hdNode = BITBOX.HDNode.fromXPriv(fixture.xpriv)
        assert.equal(BITBOX.HDNode.toWIF(hdNode), fixture.privateKeyWIF)
      })
    })
  })

  describe("#toXPub", () => {
    fixtures.toXPub.forEach(fixture => {
      it(`should create xpub ${fixture.xpub} from an HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const xpub = BITBOX.HDNode.toXPub(hdNode)
        assert.equal(xpub, fixture.xpub)
      })
    })
  })

  describe("#toXPriv", () => {
    fixtures.toXPriv.forEach(fixture => {
      it(`should create xpriv ${fixture.xpriv} from an HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const xpriv = BITBOX.HDNode.toXPriv(hdNode)
        assert.equal(xpriv, fixture.xpriv)
      })
    })
  })

  describe("#toKeyPair", () => {
    fixtures.toKeyPair.forEach(fixture => {
      it(`should get ECPair from an HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const keyPair = BITBOX.HDNode.toKeyPair(hdNode)
        assert.equal(typeof keyPair, "object")
      })
    })
  })

  describe("#toPublicKey", () => {
    fixtures.toPublicKey.forEach(fixture => {
      it(`should create public key buffer from an HDNode`, () => {
        const rootSeedBuffer = BITBOX.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(rootSeedBuffer)
        const publicKeyBuffer = BITBOX.HDNode.toPublicKey(hdNode)
        assert.equal(typeof publicKeyBuffer, "object")
      })
    })
  })

  describe("#fromXPriv", () => {
    fixtures.fromXPriv.forEach(fixture => {
      const hdNode = BITBOX.HDNode.fromXPriv(fixture.xpriv)
      it(`should create HDNode from xpriv ${fixture.xpriv}`, () => {
        assert.notEqual(hdNode, null)
      })

      it(`should export xpriv ${fixture.xpriv}`, () => {
        assert.equal(BITBOX.HDNode.toXPriv(hdNode), fixture.xpriv)
      })

      it(`should export xpub ${fixture.xpub}`, () => {
        assert.equal(BITBOX.HDNode.toXPub(hdNode), fixture.xpub)
      })

      it(`should export legacy address ${fixture.legacy}`, () => {
        assert.equal(BITBOX.HDNode.toLegacyAddress(hdNode), fixture.legacy)
      })

      it(`should export cashaddress ${fixture.cashaddress}`, () => {
        assert.equal(BITBOX.HDNode.toCashAddress(hdNode), fixture.cashaddress)
      })

      it(`should export regtest cashaddress ${fixture.regtestaddress}`, () => {
        assert.equal(
          BITBOX.HDNode.toCashAddress(hdNode, true),
          fixture.regtestaddress
        )
      })

      it(`should export privateKeyWIF ${fixture.privateKeyWIF}`, () => {
        assert.equal(BITBOX.HDNode.toWIF(hdNode), fixture.privateKeyWIF)
      })
    })
  })

  describe("#fromXPub", () => {
    fixtures.fromXPub.forEach(fixture => {
      const hdNode = BITBOX.HDNode.fromXPub(fixture.xpub)
      it(`should create HDNode from xpub ${fixture.xpub}`, () => {
        assert.notEqual(hdNode, null)
      })

      it(`should export xpub ${fixture.xpub}`, () => {
        assert.equal(BITBOX.HDNode.toXPub(hdNode), fixture.xpub)
      })

      it(`should export legacy address ${fixture.legacy}`, () => {
        assert.equal(BITBOX.HDNode.toLegacyAddress(hdNode), fixture.legacy)
      })

      it(`should export cashaddress ${fixture.cashaddress}`, () => {
        assert.equal(BITBOX.HDNode.toCashAddress(hdNode), fixture.cashaddress)
      })

      it(`should export regtest cashaddress ${fixture.regtestaddress}`, () => {
        assert.equal(
          BITBOX.HDNode.toCashAddress(hdNode, true),
          fixture.regtestaddress
        )
      })
    })
  })

  describe("#bip32", () => {
    describe("create accounts and addresses", () => {
      fixtures.accounts.forEach(fixture => {
        const seedBuffer = BITBOX.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode = BITBOX.HDNode.fromSeed(seedBuffer)
        const a = BITBOX.HDNode.derivePath(hdNode, "0'")
        const external = BITBOX.HDNode.derivePath(a, "0")
        const account = BITBOX.HDNode.createAccount([external])

        it(`#createAccount`, () => {
          assert.notEqual(account, null)
        })

        describe("#getChainAddress", () => {
          const external1 = BITBOX.Address.toCashAddress(
            account.getChainAddress(0)
          )
          it(`should create external change address ${external1}`, () => {
            assert.equal(external1, fixture.externals[0])
          })
        })

        describe("#nextChainAddress", () => {
          for (let i = 0; i < 4; i++) {
            const ex = BITBOX.Address.toCashAddress(account.nextChainAddress(0))
            it(`should create external change address ${ex}`, () => {
              assert.equal(ex, fixture.externals[i + 1])
            })
          }
        })
      })
    })
  })

  describe("#sign", () => {
    fixtures.sign.forEach(fixture => {
      it(`should sign 32 byte hash buffer`, () => {
        const hdnode = BITBOX.HDNode.fromXPriv(fixture.privateKeyWIF)
        const buf = Buffer.from(BITBOX.Crypto.sha256(fixture.data), "hex")
        const signatureBuf = BITBOX.HDNode.sign(hdnode, buf)
        assert.equal(typeof signatureBuf, "object")
      })
    })
  })

  describe("#verify", () => {
    fixtures.verify.forEach(fixture => {
      it(`should verify signed 32 byte hash buffer`, () => {
        const hdnode1 = BITBOX.HDNode.fromXPriv(fixture.privateKeyWIF1)
        const buf = Buffer.from(BITBOX.Crypto.sha256(fixture.data), "hex")
        const signature = BITBOX.HDNode.sign(hdnode1, buf)
        const verify = BITBOX.HDNode.verify(hdnode1, buf, signature)
        assert.equal(verify, true)
      })
    })
  })

  describe("#isPublic", () => {
    fixtures.isPublic.forEach(fixture => {
      it(`should verify hdnode is public`, () => {
        const node = BITBOX.HDNode.fromXPub(fixture.xpub)
        assert.equal(BITBOX.HDNode.isPublic(node), true)
      })
    })

    fixtures.isPublic.forEach(fixture => {
      it(`should verify hdnode is not public`, () => {
        const node = BITBOX.HDNode.fromXPriv(fixture.xpriv)
        assert.equal(BITBOX.HDNode.isPublic(node), false)
      })
    })
  })

  describe("#isPrivate", () => {
    fixtures.isPrivate.forEach(fixture => {
      it(`should verify hdnode is not private`, () => {
        const node = BITBOX.HDNode.fromXPub(fixture.xpub)
        assert.equal(BITBOX.HDNode.isPrivate(node), false)
      })
    })

    fixtures.isPrivate.forEach(fixture => {
      it(`should verify hdnode is private`, () => {
        const node = BITBOX.HDNode.fromXPriv(fixture.xpriv)
        assert.equal(BITBOX.HDNode.isPrivate(node), true)
      })
    })
  })

  describe("#toIdentifier", () => {
    fixtures.toIdentifier.forEach(fixture => {
      it(`should get identifier of hdnode`, () => {
        const node = BITBOX.HDNode.fromXPriv(fixture.xpriv)
        const publicKeyBuffer = BITBOX.HDNode.toPublicKey(node)
        const hash160 = BITBOX.Crypto.hash160(publicKeyBuffer)
        const identifier = BITBOX.HDNode.toIdentifier(node)
        assert.equal(identifier.toString("hex"), hash160.toString("hex"))
      })
    })
  })
})
