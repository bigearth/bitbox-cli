# Getting Started

### Dependencies

#### NodeJS

NodeJS is a javascript runtime build on Chrome’s V8 engine. npm is the package manager for NodeJS.

Use the official installer from [nodejs.org](https://nodejs.org/). Install the one which says “Recommended for Most Users”

### Command Line

To use commands like `new` and `console`:

    npm install bitbox-cli --global
    // installs a `bitbox` command

To use inside a client/server app:

    npm install bitbox-sdk --save

### Usage

Import BITBOX into your code:

    // require syntax
    let BITBOX = require('bitbox-sdk').BITBOX;
    let bitbox = new BITBOX();
    bitbox.Mnemonic.generate()
    // couple sleep cruise hybrid physical nature spin hedgehog put paddle silver laundry

    // import syntax
    import { BITBOX } from 'bitbox-sdk'
    let bitbox = new BITBOX();
    bitbox.Mnemonic.generate()
    // whip mind item rapid use cigar gap inherit shove weasel similar stick

All classes are able to be included via both `require` and `import`

    // require syntax
    const Address = require("bitbox-sdk").Address
    let address = new Address()
    const BitcoinCash = require("bitbox-sdk").BitcoinCash
    let bitcoincash = new BitcoinCash()
    const BitDB = require("bitbox-sdk").BitDB
    let bitdb = new BitDB()
    const Block = require("bitbox-sdk").Block
    let block = new Block()
    const Blockchain = require("bitbox-sdk").Blockchain
    let blockchain = new Blockchain
    const CashAccounts = require("bitbox-sdk").CashAccounts
    let cashAccounts = new CashAccounts()
    const Control = require("bitbox-sdk").Control
    let control = new Control()
    const Crypto = require("bitbox-sdk").Crypto
    let crypto = new Crypto()
    const ECPair = require("bitbox-sdk").ECPair
    let ecpair = new ECPair()
    const Generating = require("bitbox-sdk").Generating
    let generating = new Generating()
    const HDNode = require("bitbox-sdk").HDNode
    let hdnode = new HDNode()
    const Mining = require("bitbox-sdk").Mining
    let mining = new Mining()
    const Mnemonic = require("bitbox-sdk").Mnemonic
    let mnemonic = new Mnemonic()
    const Price = require("bitbox-sdk").Price
    let price = new Price()
    const RawTransactions = require("bitbox-sdk").RawTransactions
    let rawtransactions = new RawTransactions()
    const Schnorr = require("bitbox-sdk").Schnorr
    let schnorr = new Schnorr
    const Script = require("bitbox-sdk").Script
    let script = new Script()
    const Socket = require("bitbox-sdk").Socket
    let socket = new Socket()
    const Transaction = require("bitbox-sdk").Transaction
    let transaction = new Transaction
    const TransactionBuilder = require("bitbox-sdk").TransactionBuilder
    let transactionbuilder = new TransactionBuilder()
    const Util = require("bitbox-sdk").Util
    let util = new Util()

    // import syntax
    import {
      Address,
      BitcoinCash,
      BitDB,
      Block,
      Blockchain,
      CashAccounts,
      Control,
      Crypto,
      ECPair,
      Generating,
      HDNode,
      Mining,
      Mnemonic,
      Price,
      RawTransactions,
      Schnorr,
      Script,
      Socket,
      Transaction,
      TransactionBuilder,
      Util
     } from "bitbox-sdk"

    let address = new Address()
    let bitcoincash = new BitcoinCash()
    let bitdb = new BitDB()
    let block = new Block()
    let blockchain = new Blockchain
    let cashAccounts = new CashAccounts()
    let control = new Control()
    let crypto = new Crypto()
    let ecpair = new ECPair()
    let generating = new Generating()
    let hdnode = new HDNode()
    let mining = new Mining()
    let mnemonic = new Mnemonic()
    let price = new Price()
    let rawtransactions = new RawTransactions()
    let schnorr = new Schnorr
    let script = new Script()
    let socket = new Socket()
    let transaction = new Transaction
    let transactionbuilder = new TransactionBuilder()
    let util = new Util()
