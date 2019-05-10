const assert = require("assert")
const bitbox = require("../../lib/BITBOX").BITBOX
const BITBOX = new bitbox()

describe("#price", () => {
  describe("#current", () => {
    describe("#single currency", () => {
      it("should get current price for single currency", async () => {
        const result = await BITBOX.Price.current("usd")
        assert.notEqual(0, result)
      })
    })
  })
})
