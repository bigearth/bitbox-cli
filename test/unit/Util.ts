// imports
import * as chai from "chai"
import { BITBOX, REST_URL } from "../../lib/BITBOX"
import { Util } from "../../lib/Util"
import * as util from "util"
import { AddressValidateResult } from "bitcoin-com-rest"
import axios from "axios"
import * as sinon from "sinon"

// conts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert
const mockData = require("./mocks/util-mock")

util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe("#Util", (): void => {
  let sandbox: any
  beforeEach(() => (sandbox = sinon.sandbox.create()))
  afterEach(() => sandbox.restore())

  describe("#UtilConstructor", (): void => {
    it("should create instance of Util", (): void => {
      const util: Util = new Util()
      assert.equal(util instanceof Util, true)
    })

    it("should have a restURL property", (): void => {
      const util: Util = new Util()
      assert.equal(util.restURL, REST_URL)
    })
  })

  describe(`#validateAddress`, (): void => {
    it(`should return false for testnet addr on mainnet`, async () => {
      // Mock the call to rest to prevent live network calls.
      const resolved = new Promise(r => r({ data: mockData.invalid }))
      sandbox.stub(axios, "get").returns(resolved)

      const address: string = `bchtest:qqqk4y6lsl5da64sg5qc3xezmplyu5kmpyz2ysaa5y`

      const result:
        | AddressValidateResult
        | AddressValidateResult[] = await bitbox.Util.validateAddress(address)
      //console.log(`result: ${JSON.stringify(result,null,2)}`)

      assert.hasAllKeys(result, ["isvalid"])
      if (!Array.isArray(result)) assert.equal(result.isvalid, false)
    })

    it(`should validate valid address`, async () => {
      // Mock the call to rest to prevent live network calls.
      const resolved = new Promise(r => r({ data: mockData.valid }))
      sandbox.stub(axios, "get").returns(resolved)

      const address: string = `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`

      const result:
        | AddressValidateResult
        | AddressValidateResult[] = await bitbox.Util.validateAddress(address)
      //console.log(`result: ${JSON.stringify(result,null,2)}`)

      assert.hasAllKeys(result, [
        "isvalid",
        "address",
        "scriptPubKey",
        "ismine",
        "iswatchonly",
        "isscript"
      ])
      if (!Array.isArray(result)) assert.equal(result.isvalid, true)
    })

    it(`should validate an array of addresses`, async () => {
      // Mock the call to rest to prevent live network calls.
      const testData = [mockData.valid, mockData.valid]
      const resolved = new Promise(r => r({ data: testData }))
      sandbox.stub(axios, "post").returns(resolved)

      const address: string[] = [
        `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`,
        `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`
      ]

      const result:
        | AddressValidateResult
        | AddressValidateResult[] = await bitbox.Util.validateAddress(address)

      assert.isArray(result)
      if (Array.isArray(result)) {
        assert.hasAllKeys(result[0], [
          "isvalid",
          "address",
          "scriptPubKey",
          "ismine",
          "iswatchonly",
          "isscript"
        ])
      }
    })

    it(`should pass error from server to user`, async () => {
      try {
        // Mock out data for unit test, to prevent live network call.
        sandbox
          .stub(axios, "get")
          .throws("error", "Input must be a string or array of strings.")

        const address: any = 15432

        await bitbox.Util.validateAddress(address)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: ${util.inspect(err)}`)
        assert.include(
          err.message,
          `Input must be a string or array of strings.`
        )
      }
    })
  })

  describe('#sweep', () => {
    it('should do something', async () => {
      const result = await bitbox.Util.sweep('abc123', 'abc123', true)
      console.log(`result: ${result}`)
    })
  })
})
