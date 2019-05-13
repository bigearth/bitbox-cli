// imports
import * as assert from "assert";
import { BITBOX } from "../../lib/BITBOX"
import { Price } from "../../lib/Price"

// consts
const bitbox: BITBOX = new BITBOX()

describe("#Price", (): void => {
  describe("#PriceConstructor", (): void => {
    it("should create instance of Price", (): void => {
      const price: Price = new Price()
      assert.equal(price instanceof Price, true)
    })
  })

  // describe("#current", (): void => {
  //   describe("#single currency", (): void => {
  //     it("should get current price for single currency", async () => {
  //       const result = await bitbox.Price.current("usd")
  //       assert.notEqual(0, result)
  //     })
  //   })
  // })
})
