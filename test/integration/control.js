const chai = require("chai")
const assert = chai.assert
const BITBOX = require("../../lib/BITBOX").BITBOX
let bitbox = new BITBOX()

if (process.env.SERVER === "local")
  bitbox = new BITBOX({ restURL: "http://localhost:3000/v2/" })
if (process.env.SERVER === "stage")
  bitbox = new BITBOX({ restURL: "https://rest.btctest.net/v2/" })
if (process.env.SERVER === "custom")
  bitbox = new BITBOX({ restURL: process.env.SERVERIP })

describe("#control", () => {
  describe("#getNetworkInfo", () => {
    it("should GET getNetworkInfo data", async () => {
      const result = await bitbox.Control.getNetworkInfo()
      //console.log(`getNetworkInfo: ${JSON.stringify(result, null, 2)}`)

      assert.hasAnyKeys(result, [
        "version",
        "subversion",
        "protocolversion",
        "localservices",
        "localrelay",
        "timeoffset",
        "networkactive",
        "connections",
        "networks",
        "relayfee",
        "excessutxocharge",
        "warnings"
      ])
    })
  })
})
