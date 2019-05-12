import * as chai from "chai"
const assert = chai.assert

// TODO: port from require to import syntax
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Transaction = require("../../lib/Transaction").Transaction
const resturl = require("../../lib/BITBOX").resturl

describe("#Transaction", () => {
  describe("#TransactionConstructor", () => {
    it("should create instance of Transaction", () => {
      const transaction = new Transaction()
      assert.equal(transaction instanceof Transaction, true)
    })

    it("should have a restURL property", () => {
      const transaction = new Transaction()
      assert.equal(transaction.restURL, resturl)
    })
  })

  describe(`#details`, () => {
    it(`should GET details for a given txid`, async () => {
      const txid =
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"

      const result = await bitbox.Transaction.details(txid)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        "txid",
        "version",
        "locktime",
        "vin",
        "vout",
        "blockhash",
        "blockheight",
        "confirmations",
        "time",
        "blocktime",
        "isCoinBase",
        "valueOut",
        "size"
      ])
    })

    it(`should GET details for an array of txids`, async () => {
      const txids = [
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"
      ]

      const result = await bitbox.Transaction.details(txids)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const txid = 12345

        await bitbox.Transaction.details(txid)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input txid must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const dataMock =
          "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"
        const data = []
        for (let i = 0; i < 25; i++) data.push(dataMock)

        const result = await bitbox.Transaction.details(data)

        // console.log(`result: ${util.inspect(result)}`)
        assert.equal(false, false, "Unexpected result!")
      } catch (err) {
        // console.log(`err: ${util.inspect(err)}`)

        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
