const assert = require("assert")
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()

describe("#price", () => {
  describe("#current", () => {
    describe("#single currency", () => {
      it("should get current price for single currency", async () => {
        const result = await bitbox.Price.current("usd")
        assert.notEqual(0, result)
      })
    })
  })
})
