// imports
import * as assert from "assert";
import { BITBOX } from "../../lib/BITBOX"
import { Address } from "../../lib/Address"
import { BitcoinCash } from "../../lib/BitcoinCash"
import { Block } from "../../lib/Block"
import { Blockchain } from "../../lib/Blockchain"
import { Control } from "../../lib/Control"
import { Generating } from "../../lib/Generating"
import { HDNode } from "../../lib/HDNode"
import { Mining } from "../../lib/Mining"
import { Mnemonic } from "../../lib/Mnemonic"
import { Price } from "../../lib/Price"
import { RawTransactions } from "../../lib/RawTransactions"
import { Script } from "../../lib/Script"
import { Transaction } from "../../lib/Transaction"
import { TransactionBuilder } from "../../lib/TransactionBuilder"
import { Util } from "../../lib/Util"
import { Schnorr } from "../../lib/Schnorr"
import { resturl } from "../../lib/BITBOX"

describe("#BITBOX", (): void => {
  describe("#BITBOXConstructor", (): void => {
    it("should create instance of BITBOX", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox instanceof BITBOX, true)
    })

    it("should have a restURL property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: "https://rest.bitcoin.com/v2/" })
      assert.equal(bitbox.restURL, resturl)
    })

    it("should have a Address property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Address instanceof Address, true)
    })

    it("should have a BitcoinCash property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.BitcoinCash instanceof BitcoinCash, true)
    })

    it("should have a Block property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Block instanceof Block, true)
    })

    it("should have a Blockchain property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Blockchain instanceof Blockchain, true)
    })

    it("should have a Control property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Control instanceof Control, true)
    })

    it("should have a Generating property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Generating instanceof Generating, true)
    })

    it("should have a HDNode property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.HDNode instanceof HDNode, true)
    })

    it("should have a Mining property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Mining instanceof Mining, true)
    })

    it("should have a Mnemonic property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Mnemonic instanceof Mnemonic, true)
    })

    it("should have a Price property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Price instanceof Price, true)
    })

    it("should have a RawTransactions property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.RawTransactions instanceof RawTransactions, true)
    })

    it("should have a Script property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Script instanceof Script, true)
    })

    it("should have a Transaction property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Transaction instanceof Transaction, true)
    })

    // it("should have a TransactionBuilder property", (): void => {
    //   const bitbox: BITBOX = new BITBOX({ restURL: resturl })
    //   assert.equal(bitbox.TransactionBuilder instanceof TransactionBuilder, true)
    // })

    it("should have a Util property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Util instanceof Util, true)
    })

    it("should have a Schnorr property", (): void => {
      const bitbox: BITBOX = new BITBOX({ restURL: resturl })
      assert.equal(bitbox.Schnorr instanceof Schnorr, true)
    })
  })
})
