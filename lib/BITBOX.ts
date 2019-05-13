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
import { Schnorr } from "./Schnorr"
// import { Wallet } from "./Wallet"

export const resturl = "https://rest.bitcoin.com/v2/"
export class BITBOX {
  public restURL: string
  public Address: Address
  public BitcoinCash: BitcoinCash
  public Block: Block
  public Blockchain: Blockchain
  public Control: Control
  public Crypto: Crypto
  public ECPair: any
  public Generating: Generating
  public HDNode: HDNode
  public Mining: Mining
  public Mnemonic: Mnemonic
  public Price: Price
  public RawTransactions: RawTransactions
  public Script: Script
  public Transaction: Transaction
  public TransactionBuilder: any
  public Util: Util
  public Socket: any
  public Schnorr: Schnorr
  // Wallet: Wallet
  constructor(config: IConfig = {}) {
    if (config && config.restURL && config.restURL !== "")
      this.restURL = config.restURL
    else this.restURL = resturl

    this.Address = new Address(this.restURL)
    this.BitcoinCash = new BitcoinCash(this.Address)
    this.Block = new Block(this.restURL)
    this.Blockchain = new Blockchain(this.restURL)
    this.Control = new Control(this.restURL)
    this.Crypto = new Crypto()
    this.ECPair = new ECPair()
    this.Generating = new Generating(this.restURL)
    this.HDNode = new HDNode(this.Address)
    this.Mining = new Mining(this.restURL)
    this.Mnemonic = new Mnemonic(this.Address)
    this.Price = new Price()
    this.RawTransactions = new RawTransactions(this.restURL)
    this.Script = new Script()
    this.Transaction = new Transaction(this.restURL)
    this.TransactionBuilder = TransactionBuilder
    this.Util = new Util(this.restURL)
    this.Socket = new Socket()
    this.Schnorr = new Schnorr()
    // this.Wallet = Wallet
  }
}
