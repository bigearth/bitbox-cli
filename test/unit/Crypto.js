const fixtures = require("./fixtures/Crypto.json")
const assert = require("assert")
const BITBOXSDK = require("../../lib/BITBOX")
const BITBOX = new BITBOXSDK()
const Buffer = require("safe-buffer").Buffer

describe("#Crypto", () => {
  describe("#sha256", () => {
    fixtures.sha256.forEach(fixture => {
      it(`should create SHA256Hash hex encoded ${fixture.hash} from ${
        fixture.hex
      }`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const sha256Hash = BITBOX.Crypto.sha256(data).toString("hex")
        assert.equal(sha256Hash, fixture.hash)
      })

      it(`should create 64 character SHA256Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const sha256Hash = BITBOX.Crypto.sha256(data).toString("hex")
        assert.equal(sha256Hash.length, 64)
      })
    })
  })

  describe("#ripemd160", () => {
    fixtures.ripemd160.forEach(fixture => {
      it(`should create RIPEMD160Hash hex encoded ${fixture.hash} from ${
        fixture.hex
      }`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const ripemd160 = BITBOX.Crypto.ripemd160(data).toString("hex")
        assert.equal(ripemd160, fixture.hash)
      })

      it(`should create 64 character RIPEMD160Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const ripemd160 = BITBOX.Crypto.ripemd160(data).toString("hex")
        assert.equal(ripemd160.length, 40)
      })
    })
  })

  describe("#hash256", () => {
    fixtures.hash256.forEach(fixture => {
      it(`should create double SHA256 Hash hex encoded ${fixture.hash} from ${
        fixture.hex
      }`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const hash256 = BITBOX.Crypto.hash256(data).toString("hex")
        assert.equal(hash256, fixture.hash)
      })

      it(`should create 64 character SHA256 Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const hash256 = BITBOX.Crypto.hash256(data).toString("hex")
        assert.equal(hash256.length, 64)
      })
    })
  })

  describe("#hash160", () => {
    fixtures.hash160.forEach(fixture => {
      it(`should create RIPEMD160(SHA256()) hex encoded ${fixture.hash} from ${
        fixture.hex
      }`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const hash160 = BITBOX.Crypto.hash160(data).toString("hex")
        assert.equal(hash160, fixture.hash)
      })

      it(`should create 64 character SHA256Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const hash160 = BITBOX.Crypto.hash160(data).toString("hex")
        assert.equal(hash160.length, 40)
      })
    })
  })

  describe("#randomBytes", () => {
    for (let i = 0; i < 6; i++) {
      it("should return 16 bytes of entropy hex encoded", () => {
        const entropy = BITBOX.Crypto.randomBytes(16)
        assert.equal(Buffer.byteLength(entropy), 16)
      })

      it("should return 20 bytes of entropy hex encoded", () => {
        const entropy = BITBOX.Crypto.randomBytes(20)
        assert.equal(Buffer.byteLength(entropy), 20)
      })

      it("should return 24 bytes of entropy hex encoded", () => {
        const entropy = BITBOX.Crypto.randomBytes(24)
        assert.equal(Buffer.byteLength(entropy), 24)
      })

      it("should return 28 bytes of entropy hex encoded", () => {
        const entropy = BITBOX.Crypto.randomBytes(28)
        assert.equal(Buffer.byteLength(entropy), 28)
      })

      it("should return 32 bytes of entropy hex encoded", () => {
        const entropy = BITBOX.Crypto.randomBytes(32)
        assert.equal(Buffer.byteLength(entropy), 32)
      })
    }
  })
})
