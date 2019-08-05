/// <reference path="./interfaces/vendors.d.ts"/>

// imports
import { Address } from "./Address"
import { BitcoinCash } from "./BitcoinCash"
import { BitDB } from "./BitDB"
import { Block } from "./Block"
import { Blockchain } from "./Blockchain"
import { CashAccounts } from "./CashAccounts"
import { Control } from "./Control"
import { Crypto } from "./Crypto"
import { ECPair } from "./ECPair"
import { Generating } from "./Generating"
import { HDNode } from "./HDNode"
import { IConfig } from "./interfaces/BITBOXInterfaces"
import { Mining } from "./Mining"
import { Mnemonic } from "./Mnemonic"
import { Price } from "./Price"
import { RawTransactions } from "./RawTransactions"
import { Schnorr } from "./Schnorr"
import { Script } from "./Script"
import { Socket } from "./Socket"
import { Transaction } from "./Transaction"
import { TransactionBuilder } from "./TransactionBuilder"
import { Util } from "./Util"
// import { Wallet } from "./Wallet"

// Defaults
export const WS_URL = "wss://ws.bitcoin.com"
export const TWS_URL = "wss://tws.bitcoin.com"
export const BITSOCKET_URL = "https://bitsocket.bch.sx"
export const TBITSOCKET_URL = "https://tbitsocket.bitcoin.com"
export const REST_URL = "https://rest.bitcoin.com/v2/"
export const TREST_URL = "https://trest.bitcoin.com/v2/"
export const BITDB_URL = "https://bitdb.bitcoin.com/"
export const TBITDB_URL = "https://tbitdb.bitcoin.com/"

export class BITBOX {
  public restURL: string
  public bitdbURL: string
  public wsURL: string
  public Address: Address
  public BitcoinCash: BitcoinCash
  public BitDB: BitDB
  public Block: Block
  public Blockchain: Blockchain
  public CashAccounts: CashAccounts
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
    else this.restURL = REST_URL

    if (config && config.wsURL && config.wsURL !== "") this.wsURL = config.wsURL
    else this.wsURL = WS_URL

    if (config && config.bitdbURL && config.bitdbURL !== "")
      this.bitdbURL = config.bitdbURL
    else this.bitdbURL = BITDB_URL

    this.Address = new Address(this.restURL)
    this.BitcoinCash = new BitcoinCash(this.Address)
    this.BitDB = new BitDB(this.bitdbURL)
    this.Block = new Block(this.restURL)
    this.Blockchain = new Blockchain(this.restURL)
    this.CashAccounts = new CashAccounts(this.restURL)
    this.Control = new Control(this.restURL)
    this.Crypto = new Crypto()
    this.ECPair = new ECPair(this.Address)
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
    this.Socket = Socket
    this.Schnorr = new Schnorr()
    // this.Wallet = Wallet
  }
}
