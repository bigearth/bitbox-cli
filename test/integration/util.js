/*
  Integration tests for the bitbox. Only covers calls made to
  rest.bitcoin.com.
*/

const chai = require("chai")
const assert = chai.assert

const BITBOX = require("../../lib/BITBOX").BITBOX
let bitbox = new BITBOX()

if (process.env.SERVER === "local")
  bitbox = new BITBOX({ restURL: "http://localhost:3000/v2/" })
if (process.env.SERVER === "stage")
  bitbox = new BITBOX({ restURL: "https://rest.btctest.net/v2/" })

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe(`#util`, () => {
  describe(`#validateAddress`, () => {
    it(`should return false for testnet addr on mainnet`, async () => {
      const address = `bchtest:qqqk4y6lsl5da64sg5qc3xezmplyu5kmpyz2ysaa5y`

      const result = await bitbox.Util.validateAddress(address)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["isvalid"])
      assert.equal(result.isvalid, false)
    })

    it(`should return false for bad address`, async () => {
      const address = `bitcoincash:qp4k8fjtgunhdr7yq30ha4peu`

      const result = await bitbox.Util.validateAddress(address)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["isvalid"])
      assert.equal(result.isvalid, false)
    })

    it(`should return validate valid address`, async () => {
      const address = `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`

      const result = await bitbox.Util.validateAddress(address)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        "isvalid",
        "address",
        "scriptPubKey",
        "ismine",
        "iswatchonly",
        "isscript"
      ])
      assert.equal(result.isvalid, true)
    })

    it(`should validate an array of addresses`, async () => {
      const address = [
        `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`,
        `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`
      ]

      const result = await bitbox.Util.validateAddress(address)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "isvalid",
        "address",
        "scriptPubKey",
        "ismine",
        "iswatchonly",
        "isscript"
      ])
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const address = 15432

        await bitbox.Util.validateAddress(address)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a string or array of strings.`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const dataMock = `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`
        const data = []
        for (let i = 0; i < 25; i++) data.push(dataMock)

        const result = await bitbox.Util.validateAddress(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe("#sweep", () => {
    it("should return balance only", async () => {
      const wif = "L287yGQj4DB4fbUKSV7DMHsyGQs1qh2E3EYJ21P88mXNKaFvmNWk"
      const result = await bitbox.Util.sweep(wif, "abc123", true)
      console.log(`result: ${result}`)
    })

    it("should sweep funds", async () => {
      const wif = "L287yGQj4DB4fbUKSV7DMHsyGQs1qh2E3EYJ21P88mXNKaFvmNWk"
      const toAddr = "bitcoincash:qqjes5sxwneywmnzqndvs6p3l9rp55a2ug0e6e6s0a"
      const result = await bitbox.Util.sweep(wif, toAddr)
      console.log(`result: ${result}`)
    })
  })
})
