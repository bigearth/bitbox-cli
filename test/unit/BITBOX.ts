import * as assert from "assert";

// TODO: port from require to import syntax
const BITBOX = require("../../lib/BITBOX").BITBOX
const BitcoinCash = require("../../lib/BitcoinCash").BitcoinCash
const Block = require("../../lib/Block").Block
const Blockchain = require("../../lib/Blockchain").Blockchain
const Control = require("../../lib/Control").Control
const Generating = require("../../lib/Generating").Generating
const HDNode = require("../../lib/HDNode").HDNode
const Mining = require("../../lib/Mining").Mining
const Mnemonic = require("../../lib/Mnemonic").Mnemonic
const Price = require("../../lib/Price").Price
const RawTransactions = require("../../lib/RawTransactions").RawTransactions
const Script = require("../../lib/Script").Script
const Transaction = require("../../lib/Transaction").Transaction
const Util = require("../../lib/Util").Util
const Schnorr = require("../../lib/Schnorr").Schnorr
const resturl = require("../../lib/BITBOX").resturl

describe("#BITBOX", () => {
  describe("#BITBOXConstructor", () => {
    it("should create instance of BITBOX", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox instanceof BITBOX, true)
    })

    it("should have a restURL property", () => {
      const bitbox = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
      assert.equal(bitbox.restURL, resturl)
    })

    it("should have a BitcoinCash property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.BitcoinCash instanceof BitcoinCash, true)
    })

    it("should have a BitcoinCash property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.BitcoinCash instanceof BitcoinCash, true)
    })

    it("should have a Block property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Block instanceof Block, true)
    })

    it("should have a Blockchain property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Blockchain instanceof Blockchain, true)
    })

    it("should have a Control property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Control instanceof Control, true)
    })

    it("should have a Generating property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Generating instanceof Generating, true)
    })

    it("should have a HDNode property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.HDNode instanceof HDNode, true)
    })

    it("should have a Mining property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Mining instanceof Mining, true)
    })

    it("should have a Mnemonic property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Mnemonic instanceof Mnemonic, true)
    })

    it("should have a Price property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Price instanceof Price, true)
    })

    it("should have a RawTransactions property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.RawTransactions instanceof RawTransactions, true)
    })

    it("should have a Script property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Script instanceof Script, true)
    })

    it("should have a Transaction property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Transaction instanceof Transaction, true)
    })

    it("should have a Util property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Util instanceof Util, true)
    })

    it("should have a Schnorr property", () => {
      const bitbox = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Schnorr instanceof Schnorr, true)
    })
  })
})
