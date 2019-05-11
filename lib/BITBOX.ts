/// <reference path="./interfaces/vendors.d.ts"/>

// import interfaces
import { IConfig } from "./interfaces/BITBOXInterfaces"

// local deps
import { BitcoinCash } from "./BitcoinCash"
import { Crypto } from "./Crypto"
import { Util } from "./Util"
import { Block } from "./Block"
import { Blockchain } from "./Blockchain"
import { Control } from "./Control"
import { Generating } from "./Generating"
import { Mining } from "./Mining"
import { RawTransactions } from "./RawTransactions"
import { Mnemonic } from "./Mnemonic"
import { Address } from "./Address"
import { HDNode } from "./HDNode"
import { Transaction } from "./Transaction"
import { TransactionBuilder } from "./TransactionBuilder"
import { ECPair } from "./ECPair"
import { Script } from "./Script"
import { Price } from "./Price"
import { Socket } from "./Socket"
import { Wallet } from "./Wallet"
import { Schnorr } from "./Schnorr"

export class BITBOX {
  restURL: string
  Address: Address
  BitcoinCash: BitcoinCash
  Block: Block
  Blockchain: Blockchain
  Control: Control
  Crypto: Crypto
  ECPair: any
  Generating: Generating
  HDNode: HDNode
  Mining: Mining
  Mnemonic: Mnemonic
  Price: Price
  RawTransactions: RawTransactions
  Script: Script
  Transaction: Transaction
  TransactionBuilder: any
  Util: Util
  Socket: any
  Wallet: Wallet
  Schnorr: Schnorr
  constructor(config: IConfig = {}) {
    if (config && config.restURL && config.restURL !== "")
      this.restURL = config.restURL
    else this.restURL = "https://rest.bitcoin.com/v2/"

    this.Address = new Address(this.restURL)
    this.BitcoinCash = new BitcoinCash(this.Address)
    this.Block = new Block(this.restURL)
    this.Blockchain = new Blockchain(this.restURL)
    this.Control = new Control(this.restURL)
    this.Crypto = Crypto
    this.ECPair = ECPair
    this.ECPair.setAddress(this.Address)
    this.Generating = new Generating(this.restURL)
    this.HDNode = new HDNode(this.Address)
    this.Mining = new Mining(this.restURL)
    this.Mnemonic = new Mnemonic(this.Address)
    this.Price = new Price()
    this.RawTransactions = new RawTransactions(this.restURL)
    this.Script = new Script()
    this.Transaction = new Transaction(this.restURL)
    this.TransactionBuilder = TransactionBuilder
    this.TransactionBuilder.setAddress(this.Address)
    this.Util = new Util(this.restURL)
    this.Socket = Socket
    this.Wallet = Wallet
    this.Schnorr = new Schnorr()
  }
}
