"use strict"
const chai = require("chai")
const assert = require("assert")
const BITBOXSDK = require("./../lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const axios = require("axios")
const sinon = require("sinon")

describe("#Transaction", () => {
  describe("#details", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get transaction details", done => {
      const data = {
        txid:
          "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
        version: 1,
        locktime: 0,
        vin: [{ coinbase: "04ffff001d029804", sequence: 4294967295, n: 0 }],
        vout: [
          {
            value: "50.00000000",
            n: 0,
            scriptPubKey: [Object],
            spentTxId: null,
            spentIndex: null,
            spentHeight: null
          }
        ],
        blockhash:
          "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
        blockheight: 507,
        confirmations: 528399,
        time: 1231973656,
        blocktime: 1231973656,
        isCoinBase: true,
        valueOut: 50,
        size: 135
      }
      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      BITBOX.Transaction.details(
        "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
      )
        .then(result => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })
})
