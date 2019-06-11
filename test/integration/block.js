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

describe(`#block`, () => {
  describe(`#detailsByHeight`, () => {
    it(`should GET block details for a given Height`, async () => {
      const block = 500000

      const result = await bitbox.Block.detailsByHeight(block)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should GET block details for an array of blocks`, async () => {
      const blocks = [500000, 500001]

      const result = await bitbox.Block.detailsByHeight(blocks)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const blocks = "asdf"

        await bitbox.Block.detailsByHeight(blocks)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a number or array of numbers.`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const blocks = []
        for (let i = 0; i < 25; i++) blocks.push(500000)

        const result = await bitbox.Block.detailsByHeight(blocks)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe("#detailsByHash", () => {
    it(`should GET block details for a given hash`, async () => {
      const hash =
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"

      const result = await bitbox.Block.detailsByHash(hash)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAllKeys(result, [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should GET block details for an array of hashes`, async () => {
      const hash = [
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201",
        "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"
      ]

      const result = await bitbox.Block.detailsByHash(hash)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "hash",
        "size",
        "height",
        "version",
        "merkleroot",
        "tx",
        "time",
        "nonce",
        "bits",
        "difficulty",
        "chainwork",
        "confirmations",
        "previousblockhash",
        "nextblockhash",
        "reward",
        "isMainChain",
        "poolInfo"
      ])
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const hash = 12345

        await bitbox.Block.detailsByHash(hash)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const data = []
        for (let i = 0; i < 25; i++) {
          data.push(
            "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"
          )
        }

        const result = await bitbox.Block.detailsByHash(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
