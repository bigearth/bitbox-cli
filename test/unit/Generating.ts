// imports
import * as assert from "assert";
import axios from "axios";
import * as sinon from "sinon";
import { BITBOX } from "../../lib/BITBOX"
import { Generating } from "../../lib/Generating"
import { resturl } from "../../lib/BITBOX"

// consts
const bitbox: BITBOX = new BITBOX()

describe("#Generating", (): void => {
  describe("#GeneratingConstructor", (): void => {
    it("should create instance of Generating", (): void => {
      const generating: Generating = new Generating()
      assert.equal(generating instanceof Generating, true)
    })

    it("should have a restURL property", (): void => {
      const generating: Generating = new Generating()
      assert.equal(generating.restURL, resturl)
    })
  })

  describe("#generateToAddress", (): void => {
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
