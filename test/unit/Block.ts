// imports
import * as chai from "chai"
import axios from "axios"
import * as sinon from "sinon"
import { BITBOX } from "../../lib/BITBOX"
import { Block } from "../../lib/Block"
import { REST_URL } from "../../lib/BITBOX"
import * as util from "util"
import { BlockDetailsResult } from "bitcoin-com-rest"

// consts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert
const blockMock: any = require("./mocks/block-mock")

util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe("#Block", (): void => {
  describe("#BlockConstructor", (): void => {
    it("should create instance of Block", (): void => {
      const block: Block = new Block()
      assert.equal(block instanceof Block, true)
    })
  })

  it("should have a restURL property", (): void => {
    const block: Block = new Block()
    assert.equal(block.restURL, REST_URL)
  })

  describe("#detailsByHash", (): void => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it(`should GET a single hash`, async (): Promise<any> => {
      // Mock out data for unit test, to prevent live network call.
      const data: any = blockMock.details
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const result: any = await bitbox.Block.detailsByHash(
        "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0"
      )
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.deepEqual(blockMock.details, result)
    })

    it(`should POST an array of hashes`, async (): Promise<any> => {
      const hashes: string[] = [
        "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
        "000000000000000002160687d7f39b6232b5acbb2e2b44cd68e3c6b2debe9ea3"
      ]

      // Mock out data for unit test, to prevent live network call.
      const data: any = [blockMock.details, blockMock.details]
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "post").returns(resolved)

      const result: any = await bitbox.Block.detailsByHash(hashes)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.deepEqual(data, result)
    })

    it(`should pass error from server to user`, async () => {
      try {
        // Mock out data for unit test, to prevent live network call.
        sandbox
          .stub(axios, "get")
          .throws("error", "Input must be a string or array of strings.")

        const hash: any = 12345

        await bitbox.Block.detailsByHash(hash)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input must be a string or array of strings.`
        )
      }
    })
  })

  describe("#detailsByHeight", (): void => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it(`should GET a single height`, async (): Promise<any> => {
      // Mock out data for unit test, to prevent live network call.
      const data: any = blockMock.details
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      const height: number = 500007

      const result: any = await bitbox.Block.detailsByHeight(height)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.deepEqual(blockMock.details, result)
    })

    it(`should POST an array of heights`, async (): Promise<any> => {
      const heights: number[] = [500007, 500008]

      // Mock out data for unit test, to prevent live network call.
      const data: any = [blockMock.details, blockMock.details]
      const resolved: any = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "post").returns(resolved)

      const result: any = await bitbox.Block.detailsByHeight(heights)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.deepEqual(data, result)
    })

    it(`should pass error from server to user`, async () => {
      try {
        // Mock out data for unit test, to prevent live network call.
        sandbox
          .stub(axios, "get")
          .throws("error", "Input must be a number or array of numbers.")

        const height: any = "abc123"

        await bitbox.Block.detailsByHeight(height)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)

        assert.include(
          err.message,
          `Input must be a number or array of numbers.`
        )
      }
    })
  })
})
