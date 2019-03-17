/*
  This test file should be run last as it will trigger the rate limits in
  rest.bitcoin.com and no more calls to rest will be possible for about 1 minute
  after this test is run.
*/

const chai = require("chai")
const assert = chai.assert
const BITBOXSDK = require("../../src/BITBOX")
const BITBOX = new BITBOXSDK()

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
        const promise = BITBOX.Control.getInfo()
        promises.push(promise)
      }

      const temp = await Promise.all(promises)

      console.log(`temp: ${util.inspect(temp)}`)
      assert.equal(true, false, "Unexpected result!")
    } catch (err) {
      // Expected error response
      if (err.error) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Too many requests")

        // Handle other types of error response.
      } else {
        console.log(`Unexpected error:`)
        console.log(`err: ${util.inspect(err)}`)
        assert.equal(true, false, "Unexpected error")
      }
    }
  })
})
