/*
  Integration tests for the BITBOX.Address library. Only covers calls made to
  rest.bitcoin.com.

  TODO:
  -Address.unconfirmed:
  --Retrieves transient 0-conf UTXOs. Needs an E2E test to be effectively tested.
*/

const chai = require("chai")
const assert = chai.assert
const BITBOXSDK = require("../../lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const axios = require("axios")

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe(`#address`, () => {
  describe(`#details`, () => {
    it(`should GET address details`, async () => {
      const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result = await BITBOX.Address.details(addr)
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
        "addrStr",
        "currentPage",
        "pagesTotal"
      ])
      assert.isArray(result.transactions)
    })
  })

  describe(`#utxo`, () => {
    it(`should GET utxos for a single address`, async () => {
      const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result = await BITBOX.Address.utxo(addr)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAllKeys(result, ["utxos", "legacyAddress", "cashAddress"])
      assert.isArray(result.utxos)
      assert.hasAllKeys(result.utxos[0], [
        "address",
        "txid",
        "vout",
        "scriptPubKey",
        "amount",
        "satoshis",
        "height",
        "confirmations"
      ])
    })
  })

  describe(`#unconfirmed`, () => {
    it(`should GET unconfirmed details on a single address`, async () => {
      const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result = await BITBOX.Address.unconfirmed(addr)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAllKeys(result, ["utxos", "legacyAddress", "cashAddress"])
      assert.isArray(result.utxos)
    })
  })

  describe(`#transactions`, () => {
    it(`should GET transactions for a single address`, async () => {
      const addr = "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf"

      const result = await BITBOX.Address.transactions(addr)
      //console.log(`result: ${util.inspect(result)}`)

      assert.hasAllKeys(result, [
        "txs",
        "pagesTotal",
        "cashAddress",
        "currentPage",
        "legacyAddress"
      ])
      assert.isArray(result.txs)
      assert.hasAllKeys(result.txs[0], [
        "txid",
        "version",
        "locktime",
        "vin",
        "vout",
        "blockhash",
        "blockheight",
        "confirmations",
        "time",
        "blocktime",
        "valueOut",
        "size",
        "valueIn",
        "fees"
      ])
    })
  })
})
