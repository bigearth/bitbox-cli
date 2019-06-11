// imports
import * as assert from "assert";
import { BITBOX } from "../../lib/BITBOX"
import { Buffer } from "buffer"

// consts
const bitbox: BITBOX = new BITBOX()

// TODO: port from require to import syntax
const fixtures = require("./fixtures/Crypto.json")

describe("#Crypto", (): void => {
  describe("#sha1", (): void => {
    fixtures.sha1.forEach((fixture: any): void => {
      it(`should create SHA1 Hash hex encoded ${fixture.hash} from ${
        fixture.hex
        }`, (): void => {
          const data: Buffer = Buffer.from(fixture.hex, "hex")
          const sha1Hash: string = bitbox.Crypto.sha1(data).toString("hex")
          assert.equal(sha1Hash, fixture.hash)
        })

      it(`should create 40 character SHA1 Hash hex encoded`, (): void => {
        const data: Buffer = Buffer.from(fixture.hex, "hex")
        const sha1Hash: string = bitbox.Crypto.sha1(data).toString("hex")
        assert.equal(sha1Hash.length, 40)
      })
    })
  })

  describe("#sha256", (): void => {
    fixtures.sha256.forEach((fixture: any): void => {
      it(`should create SHA256 Hash hex encoded ${fixture.hash} from ${
        fixture.hex
        }`, (): void => {
          const data: Buffer = Buffer.from(fixture.hex, "hex")
          const sha256Hash: string = bitbox.Crypto.sha256(data).toString("hex")
          assert.equal(sha256Hash, fixture.hash)
        })

      it(`should create 64 character SHA256Hash hex encoded`, (): void => {
        const data: Buffer = Buffer.from(fixture.hex, "hex")
        const sha256Hash: string = bitbox.Crypto.sha256(data).toString("hex")
        assert.equal(sha256Hash.length, 64)
      })
    })
  })

  describe("#ripemd160", (): void => {
    fixtures.ripemd160.forEach((fixture: any): void => {
      it(`should create RIPEMD160 Hash hex encoded ${fixture.hash} from ${
        fixture.hex
        }`, (): void => {
          const data: Buffer = Buffer.from(fixture.hex, "hex")
          const ripemd160: string = bitbox.Crypto.ripemd160(data).toString("hex")
          assert.equal(ripemd160, fixture.hash)
        })

      it(`should create 64 character RIPEMD160Hash hex encoded`, (): void => {
        const data: Buffer = Buffer.from(fixture.hex, "hex")
        const ripemd160: string = bitbox.Crypto.ripemd160(data).toString("hex")
        assert.equal(ripemd160.length, 40)
      })
    })
  })

  describe("#hash256", (): void => {
    fixtures.hash256.forEach((fixture: any): void => {
      it(`should create double SHA256 Hash hex encoded ${fixture.hash} from ${
        fixture.hex
        }`, (): void => {
          const data: Buffer = Buffer.from(fixture.hex, "hex")
          const hash256: string = bitbox.Crypto.hash256(data).toString("hex")
          assert.equal(hash256, fixture.hash)
        })

      it(`should create 64 character SHA256 Hash hex encoded`, (): void => {
        const data: Buffer = Buffer.from(fixture.hex, "hex")
        const hash256: string = bitbox.Crypto.hash256(data).toString("hex")
        assert.equal(hash256.length, 64)
      })
    })
  })

  describe("#hash160", (): void => {
    fixtures.hash160.forEach((fixture: any): void => {
      it(`should create RIPEMD160(SHA256()) hex encoded ${fixture.hash} from ${
        fixture.hex
        }`, (): void => {
          const data: Buffer = Buffer.from(fixture.hex, "hex")
          const hash160: string = bitbox.Crypto.hash160(data).toString("hex")
          assert.equal(hash160, fixture.hash)
        })

      it(`should create 64 character SHA256Hash hex encoded`, (): void => {
        const data: Buffer = Buffer.from(fixture.hex, "hex")
        const hash160: string = bitbox.Crypto.hash160(data).toString("hex")
        assert.equal(hash160.length, 40)
      })
    })
  })


  describe("#randomBytes", (): void => {
    for (let i: number = 0; i < 6; i++) {
      it("should return 16 bytes of entropy hex encoded via default value", (): void => {
        const entropy: Buffer = bitbox.Crypto.randomBytes()
        assert.equal(Buffer.byteLength(entropy), 16)
      })

      it("should return 16 bytes of entropy hex encoded", (): void => {
        const entropy: Buffer = bitbox.Crypto.randomBytes(16)
        assert.equal(Buffer.byteLength(entropy), 16)
      })

      it("should return 20 bytes of entropy hex encoded", (): void => {
        const entropy: Buffer = bitbox.Crypto.randomBytes(20)
        assert.equal(Buffer.byteLength(entropy), 20)
      })

      it("should return 24 bytes of entropy hex encoded", (): void => {
        const entropy: Buffer = bitbox.Crypto.randomBytes(24)
        assert.equal(Buffer.byteLength(entropy), 24)
      })

      it("should return 28 bytes of entropy hex encoded", (): void => {
        const entropy: Buffer = bitbox.Crypto.randomBytes(28)
        assert.equal(Buffer.byteLength(entropy), 28)
      })

      it("should return 32 bytes of entropy hex encoded", (): void => {
        const entropy: Buffer = bitbox.Crypto.randomBytes(32)
        assert.equal(Buffer.byteLength(entropy), 32)
      })
    }
  })
})
