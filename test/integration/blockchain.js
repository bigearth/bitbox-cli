/*
  Integration tests for the BITBOX. Only covers calls made to
  rest.bitcoin.com.
*/

const chai = require("chai")
const assert = chai.assert
const BITBOXSDK = require("../../lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const axios = require("axios")

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe(`#blockchain`, () => {
  describe(`#getBestBlockHash`, () => {
    it(`should GET best block hash`, async () => {
      const result = await BITBOX.Blockchain.getBestBlockHash()
      //console.log(`result: ${util.inspect(result)}`)

      assert.isString(result)
    })
  })

  describe(`#getBlock`, () => {
    it(`should GET best block`, async () => {
      const hash =
        "00000000000000000308b4bbb26ae1a9197ffcac424f53625830249249857459"

      const result = await BITBOX.Blockchain.getBlock(hash)
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
        "mediantime",
        "versionHex",
        "nextblockhash"
      ])
    })
  })
})
