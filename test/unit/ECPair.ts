// imports
import * as assert from "assert";
import { BITBOX } from "../../lib/BITBOX"
import { ECPair } from "../../lib/ECPair"
import { Buffer } from "buffer"
import * as bcl from "bitcoincashjs-lib";

// consts
const bitbox: BITBOX = new BITBOX()

// TODO: port from require to import syntax
const fixtures = require("./fixtures/ECPair.json")

describe("#ECPair", (): void => {
  describe("#ECPairConstructor", (): void => {
    it("should create instance of ECPair", (): void => {
      const ecpair: ECPair = new ECPair()
      assert.equal(ecpair instanceof ECPair, true)
    })
  })

  describe("#fromWIF", (): void => {
    fixtures.fromWIF.forEach((fixture: any): void => {
      it(`should create ECPair from WIF ${fixture.privateKeyWIF}`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(typeof ecpair, "object")
      })

      it(`should get ${fixture.legacy} legacy address`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(bitbox.ECPair.toLegacyAddress(ecpair), fixture.legacy)
      })

      it(`should get ${fixture.cashAddr} cash address`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(bitbox.ECPair.toCashAddress(ecpair), fixture.cashAddr)
      })

      it(`should get ${fixture.regtestAddr} cash address`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        assert.equal(
          bitbox.ECPair.toCashAddress(ecpair, true),
          fixture.regtestAddr
        )
      })
    })
  })

  describe("#toWIF", (): void => {
    fixtures.toWIF.forEach((fixture: any): void => {
      it(`should get WIF ${fixture.privateKeyWIF} from ECPair`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        const wif: string = bitbox.ECPair.toWIF(ecpair)
        assert.equal(wif, fixture.privateKeyWIF)
      })
    })
  })

  describe("#fromPublicKey", (): void => {
    fixtures.fromPublicKey.forEach((fixture: any): void => {
      it(`should create ECPair from public key buffer`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(typeof ecpair, "object")
      })

      it(`should get ${fixture.legacy} legacy address`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(bitbox.ECPair.toLegacyAddress(ecpair), fixture.legacy)
      })

      it(`should get ${fixture.cashAddr} cash address`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(bitbox.ECPair.toCashAddress(ecpair), fixture.cashAddr)
      })

      it(`should get ${fixture.regtestAddr} cash address`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        assert.equal(
          bitbox.ECPair.toCashAddress(ecpair, true),
          fixture.regtestAddr
        )
      })
    })
  })

  describe("#toPublicKey", (): void => {
    fixtures.toPublicKey.forEach((fixture: any): void => {
      it(`should create a public key buffer from an ECPair`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromPublicKey(
          Buffer.from(fixture.pubkeyHex, "hex")
        )
        const pubkeyBuffer: Buffer = bitbox.ECPair.toPublicKey(ecpair)
        assert.equal(typeof pubkeyBuffer, "object")
      })
    })
  })

  describe("#toLegacyAddress", (): void => {
    fixtures.toLegacyAddress.forEach((fixture: any): void => {
      it(`should create legacy address ${
        fixture.legacy
        } from an ECPair`, (): void => {
          const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
          const legacyAddress: string = bitbox.ECPair.toLegacyAddress(ecpair)
          assert.equal(legacyAddress, fixture.legacy)
        })
    })
  })

  describe("#toCashAddress", (): void => {
    fixtures.toCashAddress.forEach((fixture: any): void => {
      it(`should create cash address ${
        fixture.cashAddr
        } from an ECPair`, (): void => {
          const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
          const cashAddr: string = bitbox.ECPair.toCashAddress(ecpair)
          assert.equal(cashAddr, fixture.cashAddr)
        })
    })

    fixtures.toCashAddress.forEach((fixture: any): void => {
      it(`should create regtest cash address ${
        fixture.regtestAddr
        } from an ECPair`, (): void => {
          const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
          const regtestAddr: string = bitbox.ECPair.toCashAddress(ecpair, true)
          assert.equal(regtestAddr, fixture.regtestAddr)
        })
    })
  })

  describe("#sign", (): void => {
    fixtures.sign.forEach((fixture: any): void => {
      it(`should sign 32 byte hash buffer`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF)
        const buf: Buffer = Buffer.from(bitbox.Crypto.sha256(fixture.data), "hex")
        const signatureBuf: Buffer = bitbox.ECPair.sign(ecpair, buf)
        assert.equal(typeof signatureBuf, "object")
      })
    })
  })

  describe("#verify", (): void => {
    fixtures.verify.forEach((fixture: any): void => {
      it(`should verify signed 32 byte hash buffer`, (): void => {
        const ecpair: ECPair = bitbox.ECPair.fromWIF(fixture.privateKeyWIF1)
        const buf: Buffer = Buffer.from(bitbox.Crypto.sha256(fixture.data), "hex")
        const signature: Buffer = bitbox.ECPair.sign(ecpair, buf)
        const verify: boolean = bitbox.ECPair.verify(ecpair, buf, signature)
        assert.equal(verify, true)
      })
    })
  })
})
