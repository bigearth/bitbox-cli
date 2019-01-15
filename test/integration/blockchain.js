/*
  Integration tests for the BITBOX. Only covers calls made to
  rest.bitcoin.com.

  TODO
  - getMempoolEntry() only works on TXs in the mempool, so it needs to be part
  of an e2e test to be properly tested.
*/

const chai = require("chai")
const assert = chai.assert
const BITBOXSDK = require("../../src/bitbox-sdk").default
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
      assert.equal(result.length, 64, "Specific hash length")
    })
  })

  describe("#getMempoolEntry", () => {
    /*
    // To run this test, the txid must be unconfirmed.
    const txid =
      "8be69f3ba6bde8152ae11789aa4ba292a4d2cea40bef3d7cb9f69adde150b9fd"

    it(`should GET single mempool entry`, async () => {
      const result = await BITBOX.Blockchain.getMempoolEntry(txid)

      assert.hasAnyKeys(result, [
        "size",
        "fee",
        "modifiedfee",
        "time",
        "height",
        "startingpriority",
        "currentpriority",
        "descendantcount",
        "descendantsize",
        "descendantfees",
        "ancestorcount",
        "ancestorsize",
        "ancestorfees",
        "depends"
      ])
    })

    it(`should get an array of mempool entries`, async () => {
      const result = await BITBOX.Blockchain.getMempoolEntry([txid, txid])

      assert.isArray(result)
      assert.hasAnyKeys(result[0], [
        "size",
        "fee",
        "modifiedfee",
        "time",
        "height",
        "startingpriority",
        "currentpriority",
        "descendantcount",
        "descendantsize",
        "descendantfees",
        "ancestorcount",
        "ancestorsize",
        "ancestorfees",
        "depends"
      ])
    })
    */

    it(`should throw an error if txid is not in mempool`, async () => {
      try {
        const txid =
          "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"

        await BITBOX.Blockchain.getMempoolEntry(txid)

        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: ${util.inspect(err)}`)
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, `Transaction not in mempool`)
      }
    })
  })

  describe(`#getTxOutProof`, () => {
    it(`should get single tx out proof`, async () => {
      const txid =
        "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"

      const result = await BITBOX.Blockchain.getTxOutProof(txid)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isString(result)
    })

    it(`should get an array of tx out proofs`, async () => {
      const txid = [
        "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7",
        "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
      ]

      const result = await BITBOX.Blockchain.getTxOutProof(txid)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isArray(result)
      assert.isString(result[0])
    })
  })
})
