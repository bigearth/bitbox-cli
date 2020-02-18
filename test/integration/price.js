const assert = require("assert")
const BITBOX = require("../../lib/BITBOX").BITBOX
let bitbox = new BITBOX()

if (process.env.SERVER === "local")
  bitbox = new BITBOX({ restURL: "http://localhost:3000/v2/" })
if (process.env.SERVER === "stage")
  bitbox = new BITBOX({ restURL: "https://rest.btctest.net/v2/" })
if (process.env.SERVER === "custom")
  bitbox = new BITBOX({ restURL: process.env.SERVERIP })

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
