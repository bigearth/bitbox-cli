import * as assert from "assert";
import axios from "axios";
import * as sinon from "sinon";

// TODO: port from require to import syntax
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Generating = require("../../lib/Generating").Generating
const resturl = require("../../lib/BITBOX").resturl

describe("#Generating", () => {
  describe("#GeneratingConstructor", () => {
    it("should create instance of Generating", () => {
      const generating = new Generating()
      assert.equal(generating instanceof Generating, true)
    })

    it("should have a restURL property", () => {
      const generating = new Generating()
      assert.equal(generating.restURL, resturl)
    })
  })

  describe("#generateToAddress", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should generate", done => {
      const data: any = []
      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "post").returns(resolved)

      bitbox.Generating.generateToAddress(
        1,
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"
      )
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })
})
