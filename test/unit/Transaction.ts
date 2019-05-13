// imports
import * as chai from "chai"
import { BITBOX } from "../../lib/BITBOX"
import { Transaction } from "../../lib/Transaction"
import { resturl } from "../../lib/BITBOX"
import { TxnDetailsResult } from "bitcoin-com-rest";

// consts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert

describe("#Transaction", (): void => {
  describe("#TransactionConstructor", (): void => {
    it("should create instance of Transaction", (): void => {
      const transaction: Transaction = new Transaction()
      assert.equal(transaction instanceof Transaction, true)
    })

    it("should have a restURL property", (): void => {
      const transaction: Transaction = new Transaction()
      assert.equal(transaction.restURL, resturl)
    })
  })

  describe(`#details`, (): void => {
    it(`should GET details for a given txid`, async () => {
      const txid: string =
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"
      const result: TxnDetailsResult | TxnDetailsResult[] = await bitbox.Transaction.details(txid)
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
      const txids: string[] = [
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"
      ]
      const result: TxnDetailsResult | TxnDetailsResult[] = await bitbox.Transaction.details(txids)
      assert.isArray(result)
    })

    it(`should throw an error for improper single input`, async () => {
      try {
        const txid: any = 12345
        await bitbox.Transaction.details(txid)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.include(
          err.message,
          `Input txid must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const dataMock: string =
          "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"
        const data: string[] = []
        for (let i: number = 0; i < 25; i++) data.push(dataMock)
        await bitbox.Transaction.details(data)
        assert.equal(false, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
