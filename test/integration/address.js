/*
  Integration tests for the bitbox.Address library. Only covers calls made to
  rest.bitcoin.com.

  TODO:
  -Address.unconfirmed:
  --Retrieves transient 0-conf UTXOs. Needs an E2E test to be effectively tested.
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

describe(`#address`, () => {
  describe(`#details`, () => {
    it(`should GET address details for a single address`, async () => {
      const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result = await bitbox.Address.details(addr)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAllKeys(result, [
        "balance",
        "balanceSat",
        "totalReceived",
        "totalReceivedSat",
        "totalSent",
        "totalSentSat",
        "unconfirmedBalance",
        "unconfirmedBalanceSat",
        "unconfirmedTxApperances",
        "txApperances",
        "transactions",
        "legacyAddress",
        "cashAddress",
        "currentPage",
        "pagesTotal",
        "slpAddress"
      ])
      assert.isArray(result.transactions)
    })

    it(`should GET address details for an array of addresses`, async () => {
      const addr = [
        "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
        "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      ]

      const result = await bitbox.Address.details(addr)
      //console.log(`result: ${util.inspect(result)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "balance",
        "balanceSat",
        "totalReceived",
        "totalReceivedSat",
        "totalSent",
        "totalSentSat",
        "unconfirmedBalance",
        "unconfirmedBalanceSat",
        "unconfirmedTxApperances",
        "txApperances",
        "transactions",
        "legacyAddress",
        "cashAddress",
        "currentPage",
        "pagesTotal",
        "slpAddress"
      ])
      assert.isArray(result[0].transactions)
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bitbox.Address.details(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bitbox.Address.details(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bitcoincash:qqm8uru433pjygm7q8przw9qw9pacvmvx5cngmqmue"

      const result = await bitbox.Address.utxo(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        "utxos",
        "legacyAddress",
        "cashAddress",
        "scriptPubKey",
        "slpAddress"
      ])
      assert.isArray(result.utxos)
      assert.hasAnyKeys(result.utxos[0], [
        "txid",
        "vout",
        "amount",
        "satoshis",
        "height",
        "confirmations"
      ])
    })

    it(`should GET utxo details for an array of addresses`, async () => {
      const addr = [
        "bitcoincash:qqm8uru433pjygm7q8przw9qw9pacvmvx5cngmqmue",
        "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v"
      ]

      const result = await bitbox.Address.utxo(addr)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "utxos",
        "legacyAddress",
        "cashAddress",
        "scriptPubKey",
        "slpAddress"
      ])
      assert.isArray(result[0].utxos)
      assert.hasAnyKeys(result[0].utxos[0], [
        "txid",
        "vout",
        "amount",
        "satoshis",
        "height",
        "confirmations"
      ])
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bitbox.Address.utxo(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bitbox.Address.utxo(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#unconfirmed`, () => {
    it(`should GET unconfirmed details on a single address`, async () => {
      const addr = "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs"

      const result = await bitbox.Address.unconfirmed(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        "utxos",
        "legacyAddress",
        "cashAddress",
        "scriptPubKey",
        "slpAddress"
      ])
      assert.isArray(result.utxos)
    })

    it(`should GET unconfirmed details on multiple addresses`, async () => {
      const addr = [
        "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs",
        "bitcoincash:qqcp8fw06dmjd2gnfanpwytj7q93w408nv7usdqgsk"
      ]

      const result = await bitbox.Address.unconfirmed(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "utxos",
        "legacyAddress",
        "cashAddress",
        "scriptPubKey",
        "slpAddress"
      ])
      assert.isArray(result[0].utxos)
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bitbox.Address.unconfirmed(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bitbox.Address.unconfirmed(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })

  describe(`#transactions`, () => {
    it(`should GET transactions for a single address`, async () => {
      const addr = "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs"

      const result = await bitbox.Address.transactions(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.hasAllKeys(result, [
        "txs",
        "pagesTotal",
        "cashAddress",
        "currentPage",
        "legacyAddress"
      ])
      assert.isArray(result.txs)
      assert.hasAnyKeys(result.txs[0], [
        "txid",
        "version",
        "locktime",
        "vin",
        "vout",
        "confirmations",
        "time",
        "blocktime",
        "valueOut",
        "size",
        "valueIn",
        "fees"
      ])
    })

    it(`should get transactions on multiple addresses`, async () => {
      const addr = [
        "bitcoincash:qz7teqlcltdhqjn2an8nspu7g2x6g3d3rcq8nk4nzs",
        "bitcoincash:qqcp8fw06dmjd2gnfanpwytj7q93w408nv7usdqgsk"
      ]

      const result = await bitbox.Address.transactions(addr)
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      assert.isArray(result)
      assert.hasAllKeys(result[0], [
        "txs",
        "pagesTotal",
        "cashAddress",
        "currentPage",
        "legacyAddress"
      ])
      assert.isArray(result[0].txs)
      assert.hasAnyKeys(result[0].txs[0], [
        "txid",
        "version",
        "locktime",
        "vin",
        "vout",
        "confirmations",
        "time",
        "blocktime",
        "valueOut",
        "size",
        "valueIn",
        "fees"
      ])
    })

    it(`should throw an error for improper input`, async () => {
      try {
        const addr = 12345

        await bitbox.Address.transactions(addr)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        //console.log(`err: `, err)
        assert.include(
          err.message,
          `Input address must be a string or array of strings`
        )
      }
    })

    it(`should throw error on array size rate limit`, async () => {
      try {
        const addr = []
        for (let i = 0; i < 25; i++)
          addr.push("bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf")

        const result = await bitbox.Address.transactions(addr)

        console.log(`result: ${util.inspect(result)}`)
        assert.equal(true, false, "Unexpected result!")
      } catch (err) {
        assert.hasAnyKeys(err, ["error"])
        assert.include(err.error, "Array too large")
      }
    })
  })
})
