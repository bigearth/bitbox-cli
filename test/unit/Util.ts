import * as assert from "assert";
import axios from "axios";
import * as sinon from "sinon";

// TODO: port from require to import syntax
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Util = require("../../lib/Util").Util
const resturl = require("../../lib/BITBOX").resturl

describe("#Util", () => {
  describe("#UtilConstructor", () => {
    it("should create instance of Util", () => {
      const util = new Util()
      assert.equal(util instanceof Util, true)
    })

    it("should have a restURL property", () => {
      const util = new Util()
      assert.equal(util.restURL, resturl)
    })
  })

  describe("#validateAddress", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should validate address", done => {
      const data = {
        isvalid: true,
        address: "bitcoincash:qpz7qtkuyhrsz4qmnnrvf8gz9zd0u9v7eqsewyk4w5",
        scriptPubKey: "76a91445e02edc25c701541b9cc6c49d02289afe159ec888ac",
        ismine: false,
        iswatchonly: false,
        isscript: false
      }

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bitbox.Util.validateAddress(
        "bitcoincash:qpz7qtkuyhrsz4qmnnrvf8gz9zd0u9v7eqsewyk4w5"
      )
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })
})
