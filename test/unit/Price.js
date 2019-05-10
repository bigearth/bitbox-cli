const chai = require("chai")
const assert = require("assert")
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const axios = require("axios")
const sinon = require("sinon")

describe("#Price", () => {
  describe("#current", () => {
    describe("#single currency", () => {
      let sandbox
      beforeEach(() => (sandbox = sinon.sandbox.create()))
      afterEach(() => sandbox.restore())

      it("should get current price for single currency", done => {
        const data = 46347
        const resolved = new Promise(r => r({ data: data }))
        sandbox.stub(axios, "get").returns(resolved)

        bitbox.Price.current("usd")
          .then(result => {
            assert.deepEqual(data.price, result)
          })
          .then(done, done)
      })
    })
  })
})
