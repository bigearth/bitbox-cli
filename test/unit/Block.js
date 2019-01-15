const chai = require("chai")
const assert = require("assert")
const BITBOXSDK = require("../../lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const axios = require("axios")
const sinon = require("sinon")

describe("#Block", () => {
  describe("#detailsByHash", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get block details", async () => {
      const data = {
        hash:
          "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
        size: 216,
        height: 507,
        version: 1,
        merkleroot:
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
        tx: [
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
        ],
        time: 1231973656,
        nonce: 330467862,
        bits: "1d00ffff",
        difficulty: 1,
        chainwork:
          "000000000000000000000000000000000000000000000000000001fc01fc01fc",
        confirmations: 528402,
        previousblockhash:
          "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
        nextblockhash:
          "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
        reward: 50,
        isMainChain: true,
        poolInfo: {}
      }
      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const result = await BITBOX.Block.detailsByHash(
        "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0"
      )

      assert.deepEqual(result, data)
    })
  })

  describe("#detailsByHeight", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get block details", async () => {
      const data = {
        hash:
          "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
        size: 216,
        height: 507,
        version: 1,
        merkleroot:
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
        tx: [
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
        ],
        time: 1231973656,
        nonce: 330467862,
        bits: "1d00ffff",
        difficulty: 1,
        chainwork:
          "000000000000000000000000000000000000000000000000000001fc01fc01fc",
        confirmations: 528402,
        previousblockhash:
          "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
        nextblockhash:
          "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
        reward: 50,
        isMainChain: true,
        poolInfo: {}
      }
      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const result = await BITBOX.Block.detailsByHeight("507")

      assert.deepEqual(result, data)
    })
  })
})
