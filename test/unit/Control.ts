import * as assert from "assert";
import axios from "axios";
import * as sinon from "sinon";

// TODO: port from require to import syntax
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
const Control = require("../../lib/Control").Control
const resturl = require("../../lib/BITBOX").resturl

describe("#Control", () => {
  describe("#ControlConstructor", () => {
    it("should create instance of Control", () => {
      const control = new Control()
      assert.equal(control instanceof Control, true)
    })

    it("should have a restURL property", () => {
      const control = new Control()
      assert.equal(control.restURL, resturl)
    })
  })

  describe("#getInfo", () => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get info", done => {
      const data = {
        version: 170000,
        protocolversion: 70015,
        blocks: 527813,
        timeoffset: 0,
        connections: 21,
        proxy: "",
        difficulty: 581086703759.5878,
        testnet: false,
        paytxfee: 0,
        relayfee: 0.00001,
        errors: ""
      }
      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bitbox.Control.getInfo()
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })

  // describe("#getMemoryInfo", () => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())

  //   it("should get memory info", done => {
  //     const data = {
  //       locked: {
  //         used: 0,
  //         free: 65536,
  //         total: 65536,
  //         locked: 65536,
  //         chunks_used: 0,
  //         chunks_free: 1
  //       }
  //     }
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Control.getMemoryInfo()
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })
})
