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
  Address: any
  BitcoinCash: any
  Block: any
  Blockchain: any
  Control: any
  Crypto: any
  ECPair: any
  Generating: any
  HDNode: any
  Mining: any
  Mnemonic: any
  Price: any
  RawTransactions: any
  Script: any
  Transaction: any
  TransactionBuilder: any
  Util: any
  Socket: any
  Wallet: any
  Schnorr: any
  constructor(config: IConfig = {}) {
    let restURL: string
    if (config && config.restURL && config.restURL !== "")
      restURL = config.restURL
    else restURL = "https://rest.bitcoin.com/v2/"

    this.Address = new Address(restURL)
    this.BitcoinCash = new BitcoinCash(this.Address)
    this.Block = new Block(restURL)
    this.Blockchain = new Blockchain(restURL)
    this.Control = new Control(restURL)
    this.Crypto = Crypto
    this.ECPair = ECPair
    this.ECPair.setAddress(this.Address)
    this.Generating = new Generating(restURL)
    this.HDNode = new HDNode(this.Address)
    this.Mining = new Mining(restURL)
    this.Mnemonic = new Mnemonic(this.Address)
    this.Price = new Price()
    this.RawTransactions = new RawTransactions(restURL)
    this.Script = new Script()
    this.Transaction = new Transaction(restURL)
    this.TransactionBuilder = TransactionBuilder
    this.TransactionBuilder.setAddress(this.Address)
    this.Util = new Util(restURL)
    this.Socket = Socket
    this.Wallet = Wallet
    this.Schnorr = new Schnorr(restURL)
  }
}
