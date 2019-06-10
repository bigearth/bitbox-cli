/*
  This test file should be run last as it will trigger the rate limits in
  rest.bitcoin.com and no more calls to rest will be possible for about 1 minute
  after this test is run.
*/

const chai = require("chai")
const assert = chai.assert

const BITBOX = require("../../lib/BITBOX").BITBOX
let bitbox = new BITBOX()

if (process.env.SERVER === "local")
  bitbox = new BITBOX({ restURL: "http://localhost:3000/v2/" })
if (process.env.SERVER === "stage")
  bitbox = new BITBOX({ restURL: "https://rest.btctest.net/v2/" })

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe("#rate-limits", () => {
  it("should throw an error when RPM rate limits are triggered", async () => {
    try {
      const promises = []
      for (let i = 0; i < 300; i++) {
        const promise = bitbox.Control.getInfo()
        promises.push(promise)
      }

      const temp = await Promise.all(promises)

      // console.log(`temp: ${util.inspect(temp)}`)
      assert.equal(true, false, "Unexpected result!")
    } catch (err) {
      // Expected error response
      if (err.error) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Too many requests")

        // Handle other types of error response.
      } else {
        console.log(`Unexpected error:`)
        // console.log(`err: ${util.inspect(err)}`)
        assert.equal(true, false, "Unexpected error")
      }
    }
  })
})
