// imports
import * as chai from "chai"
import { BITBOX } from "../../lib/BITBOX"
import { Transaction } from "../../lib/Transaction"
import { resturl } from "../../lib/BITBOX"
import { TxnDetailsResult } from "bitcoin-com-rest"
import axios from "axios"
import * as sinon from "sinon"

// consts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert
const mockData = require("./mocks/transactions-mock")

describe("#Transaction", (): void => {
  let sandbox: any
  beforeEach(() => (sandbox = sinon.sandbox.create()))
  afterEach(() => sandbox.restore())

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
    it(`should GET details for a given txid`, async (): Promise<any> => {
      // Mock the call to rest to prevent live network calls.
      const resolved = new Promise(r => r({ data: mockData.details }))
      sandbox.stub(axios, "get").returns(resolved)

      const txid: string =
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"

      const result:
        | TxnDetailsResult
        | TxnDetailsResult[] = await bitbox.Transaction.details(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

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
      // Mock the call to rest to prevent live network calls.
      const testData = [mockData.details, mockData.details]
      const resolved = new Promise(r => r({ data: testData }))
      sandbox.stub(axios, "post").returns(resolved)

      const txids: string[] = [
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
        "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"
      ]
      const result:
        | TxnDetailsResult
        | TxnDetailsResult[] = await bitbox.Transaction.details(txids)
      assert.isArray(result)
    })

    it(`should pass error from server to user`, async (): Promise<any> => {
      try {
        // Mock out data for unit test, to prevent live network call.
        sandbox
          .stub(axios, "get")
          .throws("error", "Input txid must be a string or array of strings.")

        const txid: any = 12345

        await bitbox.Transaction.details(txid)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: ${util.inspect(err)}`)
        assert.include(
          err.message,
          `Input txid must be a string or array of strings.`
        )
      }
    })
  })
})
