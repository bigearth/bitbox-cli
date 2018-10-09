"use strict"
const chai = require("chai")
const assert = require("assert")
const BITBOXSDK = require("./../lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const axios = require("axios")
const sinon = require("sinon")

describe("#Price", () => {
  describe("#current", () => {
    describe("#all currencies", () => {
      let sandbox
      beforeEach(() => (sandbox = sinon.sandbox.create()))
      afterEach(() => sandbox.restore())

      it("should get current price for all currencies", done => {
        const data = {
          USD: 872.31,
          GBP: 665.3,
          EUR: 748.34,
          CNY: 5848.32,
          PAB: 872.31,
          ARS: 24005.97,
          BOB: 6060.11,
          CLP: 570141.82,
          PEN: 2851.32,
          PYG: 4986964.67,
          UYU: 27300.76,
          VEF: 69697569,
          CRC: 494264.3,
          MXN: 16476.28,
          NGN: 314903.91,
          INR: 59620.88,
          RUB: 54650.83,
          AUD: 1180.92,
          BRL: 3347.57,
          CAD: 1151.44,
          ZAR: 11579.24,
          GHS: 4177.25,
          JPY: 98519.56,
          ILS: 3165.36,
          SAR: 3271.21,
          KRW: 984345.13,
          COP: 2521500.32,
          PHP: 46612.32,
          PLN: 3215.41
        }
        const resolved = new Promise(r => r({ data: data }))
        sandbox.stub(axios, "get").returns(resolved)

        BITBOX.Price.current()
          .then(result => {
            assert.deepEqual(data, result)
          })
          .then(done, done)
      })
    })

    describe("#single currency", () => {
      let sandbox
      beforeEach(() => (sandbox = sinon.sandbox.create()))
      afterEach(() => sandbox.restore())

      it("should get current price for single currency", done => {
        const data = {
          USD: 872.31,
          GBP: 665.3,
          EUR: 748.34,
          CNY: 5848.32,
          PAB: 872.31,
          ARS: 24005.97,
          BOB: 6060.11,
          CLP: 570141.82,
          PEN: 2851.32,
          PYG: 4986964.67,
          UYU: 27300.76,
          VEF: 69697569,
          CRC: 494264.3,
          MXN: 16476.28,
          NGN: 314903.91,
          INR: 59620.88,
          RUB: 54650.83,
          AUD: 1180.92,
          BRL: 3347.57,
          CAD: 1151.44,
          ZAR: 11579.24,
          GHS: 4177.25,
          JPY: 98519.56,
          ILS: 3165.36,
          SAR: 3271.21,
          KRW: 984345.13,
          COP: 2521500.32,
          PHP: 46612.32,
          PLN: 3215.41
        }
        const resolved = new Promise(r => r({ data: data }))
        sandbox.stub(axios, "get").returns(resolved)

        BITBOX.Price.current("usd")
          .then(result => {
            assert.deepEqual(data.USD, result)
          })
          .then(done, done)
      })
    })
  })
})
