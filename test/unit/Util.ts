// imports
import * as chai from "chai"
import { BITBOX } from "../../lib/BITBOX"
import { Util } from "../../lib/Util"
import { resturl } from "../../lib/BITBOX"
import * as util from "util"
import { AddressDetailsResult, AddressUtxoResult, AddressUnconfirmedResult } from "bitcoin-com-rest";

// conts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert

util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe("#Util", (): void => {
  describe("#UtilConstructor", (): void => {
    it("should create instance of Util", (): void => {
      const util: Util = new Util()
      assert.equal(util instanceof Util, true)
    })

    it("should have a restURL property", (): void => {
      const util: Util = new Util()
      assert.equal(util.restURL, resturl)
    })
  })

  describe(`#validateAddress`, (): void => {
    it(`should return false for testnet addr on mainnet`, async () => {
      const address: string = `bchtest:qqqk4y6lsl5da64sg5qc3xezmplyu5kmpyz2ysaa5y`

      const result = await bitbox.Util.validateAddress(address)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["isvalid"])
      assert.equal(result.isvalid, false)
    })

    it(`should return false for bad address`, async () => {
      const address: string = `bitcoincash:qp4k8fjtgunhdr7yq30ha4peu`

      const result = await bitbox.Util.validateAddress(address)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, ["isvalid"])
      assert.equal(result.isvalid, false)
    })

    it(`should return validate valid address`, async () => {
      const address: string = `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`

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
      const address: string[] = [
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
        const address: any = 15432

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
        const dataMock: string = `bitcoincash:qp4k8fjtgunhdr7yq30ha4peuwupzan2vcnwrmpy0z`
        const data: string[] = []
        for (let i: number = 0; i < 25; i++) data.push(dataMock)

        const result = await bitbox.Util.validateAddress(data)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
