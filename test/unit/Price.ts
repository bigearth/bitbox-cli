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
      it("should get current price for single currency", async () => {
        const result = await bitbox.Price.current("usd")
        assert.notEqual(0, result)
      })
    })
  })
})
