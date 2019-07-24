// imports
import axios from "axios"
import {
  CashAccountCheckResult,
  CashAccountLookupResult,
  CashAccountReverseLookupResult
} from "bitcoin-com-rest"
import * as chai from "chai"
import * as util from "util"
import { BITBOX, REST_URL } from "../../lib/BITBOX"
import { CashAccounts } from "../../lib/CashAccounts"

// consts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert

// TODO: port from require to import syntax
const sinon = require("sinon")
const cashAccountsMock = require("./mocks/cashaccounts-mock.js")

util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe("#CashAccounts", (): void => {
  describe("#CashAccountsConstructor", (): void => {
    it("should create instance of CashAccounts", (): void => {
      const cashAccounts: CashAccounts = new CashAccounts()
      assert.equal(cashAccounts instanceof CashAccounts, true)
    })

    it("should have a restURL property", (): void => {
      const cashAccounts: CashAccounts = new CashAccounts()
      assert.equal(cashAccounts.restURL, REST_URL)
    })
  })

  describe("#lookup", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it(`should lookup CashAccount details by account, number and collision`, async (): Promise<
      any
    > => {
      // Mock out data for unit test, to prevent live network call.
      const data: any = cashAccountsMock.lookup
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const account: string = "cgcardona"
      const number: number = 122
      const collision: number = 6383276713

      const result = (await bitbox.CashAccounts.lookup(
        account,
        number,
        collision
      )) as CashAccountLookupResult
      //console.log(`result: ${JSON.stringify(result,null,2)}`)

      assert.hasAllKeys(result, ["identifier", "information"])
    })
  })

  describe("#check", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it(`should check CashAccount by account and number`, async (): Promise<
      any
    > => {
      // Mock out data for unit test, to prevent live network call.
      const data: any = cashAccountsMock.check
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const account: string = "cgcardona"
      const number: number = 122

      const result = (await bitbox.CashAccounts.check(
        account,
        number
      )) as CashAccountCheckResult
      //console.log(`result: ${JSON.stringify(result,null,2)}`)

      assert.hasAllKeys(result, ["identifier", "block", "results"])
    })
  })

  describe("#reverseLookup", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it(`should reverse lookup CashAccount details by cash address`, async (): Promise<
      any
    > => {
      // Mock out data for unit test, to prevent live network call.
      const data: any = cashAccountsMock.reverseLookup
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const cashAddress: string =
        "bitcoincash:qr4aadjrpu73d2wxwkxkcrt6gqxgu6a7usxfm96fst"

      const result = (await bitbox.CashAccounts.reverseLookup(
        cashAddress
      )) as CashAccountReverseLookupResult
      //console.log(`result: ${JSON.stringify(result,null,2)}`)

      assert.hasAllKeys(result.results[0], [
        "accountEmoji",
        "nameText",
        "accountNumber",
        "accountHash",
        "accountCollisionLength",
        "payloadType",
        "payloadAddress"
      ])
    })
  })
})
