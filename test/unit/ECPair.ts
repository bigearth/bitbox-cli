import * as assert from "assert";

// TODO: port from require to import syntax
const fixtures = require("./fixtures/ECPair.json")
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const ECPair = require("../../lib/ECPair").ECPair
const Buffer = require("safe-buffer").Buffer

describe("#ECPair", () => {
  describe("#ECPairConstructor", () => {
    it("should create instance of ECPair", () => {
      const ecpair = new ECPair()
      assert.equal(ecpair instanceof ECPair, true)
    })
  })

  describe("#fromWIF", () => {
    fixtures.fromWIF.forEach((fixture: any) => {
      it(`should create ECPair from WIF ${fixture.privateKeyWIF}`, () => {
        const ecpair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(typeof ecpair, "object")
      })

      it(`should get ${fixture.legacy} legacy address`, () => {
        const legacy = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(bitbox.HDNode.toLegacyAddress(legacy), fixture.legacy)
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        const cashAddr = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(bitbox.HDNode.toCashAddress(cashAddr), fixture.cashAddr)
      })

      it(`should get ${fixture.regtestAddr} cash address`, () => {
        const cashAddr = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(
          bitbox.HDNode.toCashAddress(cashAddr, true),
          fixture.regtestAddr
        )
      })
    })
  })

  describe("#toWIF", () => {
    fixtures.toWIF.forEach((fixture: any) => {
      it(`should get WIF ${fixture.privateKeyWIF} from ECPair`, () => {
        const ecpair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        const wif = bitbox.ECPair.toWIF(ecpair)
        assert.equal(wif, fixture.privateKeyWIF)
      })
    })
  })

  describe("#fromPublicKey", () => {
    fixtures.fromPublicKey.forEach((fixture: any) => {
      it(`should create ECPair from public key buffer`, () => {
        const ecpair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(typeof ecpair, "object")
      })

      it(`should get ${fixture.legacy} legacy address`, () => {
        const ecpair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(bitbox.HDNode.toLegacyAddress(ecpair), fixture.legacy)
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        const ecpair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(bitbox.HDNode.toCashAddress(ecpair), fixture.cashAddr)
      })

      it(`should get ${fixture.regtestAddr} cash address`, () => {
        const ecpair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(
          bitbox.HDNode.toCashAddress(ecpair, true),
          fixture.regtestAddr
        )
      })
    })
  })

  describe("#toPublicKey", () => {
    fixtures.toPublicKey.forEach((fixture: any) => {
      it(`should create a public key buffer from an ECPair`, () => {
        const ecpair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        const pubkeyBuffer = bitbox.ECPair.toPublicKey(ecpair)
        assert.equal(typeof pubkeyBuffer, "object")
      })
    })
  })

  describe("#toLegacyAddress", () => {
    fixtures.toLegacyAddress.forEach((fixture: any) => {
      it(`should create legacy address ${
        fixture.legacy
        } from an ECPair`, () => {
          const ecpair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
          const legacyAddress = bitbox.ECPair.toLegacyAddress(ecpair)
          assert.equal(legacyAddress, fixture.legacy)
        })
    })
  })

  describe("#toCashAddress", () => {
    fixtures.toCashAddress.forEach((fixture: any) => {
      it(`should create cash address ${
        fixture.cashAddr
        } from an ECPair`, () => {
          const ecpair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
          const cashAddr = bitbox.ECPair.toCashAddress(ecpair)
          assert.equal(cashAddr, fixture.cashAddr)
        })
    })

    fixtures.toCashAddress.forEach((fixture: any) => {
      it(`should create regtest cash address ${
        fixture.regtestAddr
        } from an ECPair`, () => {
          const ecpair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
          const regtestAddr = bitbox.ECPair.toCashAddress(ecpair, true)
          assert.equal(regtestAddr, fixture.regtestAddr)
        })
    })
  })

  describe("#sign", () => {
    fixtures.sign.forEach((fixture: any) => {
      it(`should sign 32 byte hash buffer`, () => {
        const ecpair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        const buf = Buffer.from(bitbox.Crypto.sha256(fixture.data), "hex")
        const signatureBuf = bitbox.ECPair.sign(ecpair, buf)
        assert.equal(typeof signatureBuf, "object")
      })
    })
  })

  describe("#verify", () => {
    fixtures.verify.forEach((fixture: any) => {
      it(`should verify signed 32 byte hash buffer`, () => {
        const ecpair1 = bitbox.ECPair.fromWIF(fixture.privateKeyWIF1)
        const buf = Buffer.from(bitbox.Crypto.sha256(fixture.data), "hex")
        const signature = bitbox.ECPair.sign(ecpair1, buf)
        const verify = bitbox.ECPair.verify(ecpair1, buf, signature)
        assert.equal(verify, true)
      })
    })
  })
})
