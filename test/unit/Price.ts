import * as assert from "assert";
import axios from "axios";
import * as sinon from "sinon";

// TODO: port from require to import syntax
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Price = require("../../lib/Price").Price

describe("#Price", () => {
  describe("#PriceConstructor", () => {
    it("should create instance of Price", () => {
      const price = new Price()
      assert.equal(price instanceof Price, true)
    })
  })

  describe("#current", () => {
    describe("#single currency", () => {
      let sandbox: any
      beforeEach(() => (sandbox = sinon.sandbox.create()))
      afterEach(() => sandbox.restore())

      it("should get current price for single currency", done => {
        const data: any = []
        const resolved = new Promise(r => r({ data: data }))
        sandbox.stub(axios, "get").returns(resolved)

        bitbox.Price.current("usd")
          .then((result: any) => {
            assert.deepEqual(data.price, result)
          })
          .then(done, done)
      })
    })
  })
})
