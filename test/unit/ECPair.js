const fixtures = require("./fixtures/ECPair.json")
const assert = require("assert")
const BITBOXSDK = require("../../lib/BITBOX")
const BITBOX = new BITBOXSDK()
const Buffer = require("safe-buffer").Buffer

describe("#ECPair", () => {
  describe("#fromWIF", () => {
    fixtures.fromWIF.forEach(fixture => {
      it(`should create ECPair from WIF ${fixture.privateKeyWIF}`, () => {
        const ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(typeof ecpair, "object")
      })

      it(`should get ${fixture.legacy} legacy address`, () => {
        const legacy = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(BITBOX.HDNode.toLegacyAddress(legacy), fixture.legacy)
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        const cashAddr = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(BITBOX.HDNode.toCashAddress(cashAddr), fixture.cashAddr)
      })

      it(`should get ${fixture.regtestAddr} cash address`, () => {
        const cashAddr = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(
          BITBOX.HDNode.toCashAddress(cashAddr, true),
          fixture.regtestAddr
        )
      })
    })
  })

  describe("#toWIF", () => {
    fixtures.toWIF.forEach(fixture => {
      it(`should get WIF ${fixture.privateKeyWIF} from ECPair`, () => {
        const ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        const wif = BITBOX.ECPair.toWIF(ecpair)
        assert.equal(wif, fixture.privateKeyWIF)
      })
    })
  })

  describe("#fromPublicKey", () => {
    fixtures.fromPublicKey.forEach(fixture => {
      it(`should create ECPair from public key buffer`, () => {
        const ecpair = BITBOX.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(typeof ecpair, "object")
      })

      it(`should get ${fixture.legacy} legacy address`, () => {
        const ecpair = BITBOX.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(BITBOX.HDNode.toLegacyAddress(ecpair), fixture.legacy)
      })

      it(`should get ${fixture.cashAddr} cash address`, () => {
        const ecpair = BITBOX.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(BITBOX.HDNode.toCashAddress(ecpair), fixture.cashAddr)
      })

      it(`should get ${fixture.regtestAddr} cash address`, () => {
        const ecpair = BITBOX.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(
          BITBOX.HDNode.toCashAddress(ecpair, true),
          fixture.regtestAddr
        )
      })
    })
  })

  describe("#toPublicKey", () => {
    fixtures.toPublicKey.forEach(fixture => {
      it(`should create a public key buffer from an ECPair`, () => {
        const ecpair = BITBOX.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        const pubkeyBuffer = BITBOX.ECPair.toPublicKey(ecpair)
        assert.equal(typeof pubkeyBuffer, "object")
      })
    })
  })

  describe("#toLegacyAddress", () => {
    fixtures.toLegacyAddress.forEach(fixture => {
      it(`should create legacy address ${
        fixture.legacy
      } from an ECPair`, () => {
        const ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        const legacyAddress = BITBOX.ECPair.toLegacyAddress(ecpair)
        assert.equal(legacyAddress, fixture.legacy)
      })
    })
  })

  describe("#toCashAddress", () => {
    fixtures.toCashAddress.forEach(fixture => {
      it(`should create cash address ${
        fixture.cashAddr
      } from an ECPair`, () => {
        const ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        const cashAddr = BITBOX.ECPair.toCashAddress(ecpair)
        assert.equal(cashAddr, fixture.cashAddr)
      })
    })

    fixtures.toCashAddress.forEach(fixture => {
      it(`should create regtest cash address ${
        fixture.regtestAddr
      } from an ECPair`, () => {
        const ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        const regtestAddr = BITBOX.ECPair.toCashAddress(ecpair, true)
        assert.equal(regtestAddr, fixture.regtestAddr)
      })
    })
  })

  describe("#sign", () => {
    fixtures.sign.forEach(fixture => {
      it(`should sign 32 byte hash buffer`, () => {
        const ecpair = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF)
        const buf = Buffer.from(BITBOX.Crypto.sha256(fixture.data), "hex")
        const signatureBuf = BITBOX.ECPair.sign(ecpair, buf)
        assert.equal(typeof signatureBuf, "object")
      })
    })
  })

  describe("#verify", () => {
    fixtures.verify.forEach(fixture => {
      it(`should verify signed 32 byte hash buffer`, () => {
        const ecpair1 = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF1)
        const ecpair2 = BITBOX.ECPair.fromWIF(fixture.privateKeyWIF2)
        const buf = Buffer.from(BITBOX.Crypto.sha256(fixture.data), "hex")
        const signature = BITBOX.ECPair.sign(ecpair1, buf)
        const verify = BITBOX.ECPair.verify(ecpair1, buf, signature)
        assert.equal(verify, true)
      })
    })
  })
})
