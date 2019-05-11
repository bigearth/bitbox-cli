const fixtures = require("./fixtures/Crypto.json")
const assert = require("assert")
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Buffer = require("safe-buffer").Buffer

describe("#Crypto", () => {
  describe("#sha1", () => {
    fixtures.sha1.forEach(fixture => {
      it(`should create SHA1 Hash hex encoded ${fixture.hash} from ${
        fixture.hex
      }`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const sha1Hash = bitbox.Crypto.sha1(data).toString("hex")
        assert.equal(sha1Hash, fixture.hash)
      })

      it(`should create 40 character SHA1 Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const sha1Hash = bitbox.Crypto.sha1(data).toString("hex")
        assert.equal(sha1Hash.length, 40)
      })
    })
  })

  describe("#sha256", () => {
    fixtures.sha256.forEach(fixture => {
      it(`should create SHA256 Hash hex encoded ${fixture.hash} from ${
        fixture.hex
      }`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const sha256Hash = bitbox.Crypto.sha256(data).toString("hex")
        assert.equal(sha256Hash, fixture.hash)
      })

      it(`should create 64 character SHA256Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const sha256Hash = bitbox.Crypto.sha256(data).toString("hex")
        assert.equal(sha256Hash.length, 64)
      })
    })
  })

  describe("#ripemd160", () => {
    fixtures.ripemd160.forEach(fixture => {
      it(`should create RIPEMD160 Hash hex encoded ${fixture.hash} from ${
        fixture.hex
      }`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const ripemd160 = bitbox.Crypto.ripemd160(data).toString("hex")
        assert.equal(ripemd160, fixture.hash)
      })

      it(`should create 64 character RIPEMD160Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const ripemd160 = bitbox.Crypto.ripemd160(data).toString("hex")
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
        const hash256 = bitbox.Crypto.hash256(data).toString("hex")
        assert.equal(hash256, fixture.hash)
      })

      it(`should create 64 character SHA256 Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const hash256 = bitbox.Crypto.hash256(data).toString("hex")
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
        const hash160 = bitbox.Crypto.hash160(data).toString("hex")
        assert.equal(hash160, fixture.hash)
      })

      it(`should create 64 character SHA256Hash hex encoded`, () => {
        const data = Buffer.from(fixture.hex, "hex")
        const hash160 = bitbox.Crypto.hash160(data).toString("hex")
        assert.equal(hash160.length, 40)
      })
    })
  })

  describe("#randomBytes", () => {
    for (let i = 0; i < 6; i++) {
      it("should return 16 bytes of entropy hex encoded", () => {
        const entropy = bitbox.Crypto.randomBytes(16)
        assert.equal(Buffer.byteLength(entropy), 16)
      })

      it("should return 20 bytes of entropy hex encoded", () => {
        const entropy = bitbox.Crypto.randomBytes(20)
        assert.equal(Buffer.byteLength(entropy), 20)
      })

      it("should return 24 bytes of entropy hex encoded", () => {
        const entropy = bitbox.Crypto.randomBytes(24)
        assert.equal(Buffer.byteLength(entropy), 24)
      })

      it("should return 28 bytes of entropy hex encoded", () => {
        const entropy = bitbox.Crypto.randomBytes(28)
        assert.equal(Buffer.byteLength(entropy), 28)
      })

      it("should return 32 bytes of entropy hex encoded", () => {
        const entropy = bitbox.Crypto.randomBytes(32)
        assert.equal(Buffer.byteLength(entropy), 32)
      })
    }
  })
})
