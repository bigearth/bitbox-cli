"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// local deps
var BitcoinCash_1 = require("./BitcoinCash");
var Crypto_1 = require("./Crypto");
var Util_1 = require("./Util");
var Block_1 = require("./Block");
var Blockchain_1 = require("./Blockchain");
var Control_1 = require("./Control");
var Generating_1 = require("./Generating");
var Mining_1 = require("./Mining");
var RawTransactions_1 = require("./RawTransactions");
var Mnemonic_1 = require("./Mnemonic");
var Address_1 = require("./Address");
var HDNode_1 = require("./HDNode");
var Transaction_1 = require("./Transaction");
var TransactionBuilder_1 = require("./TransactionBuilder");
var ECPair_1 = require("./ECPair");
var Script_1 = require("./Script");
var Price_1 = require("./Price");
var Socket_1 = require("./Socket");
var Wallet_1 = require("./Wallet");
var Schnorr_1 = require("./Schnorr");
var BITBOX = /** @class */ (function () {
    function BITBOX(config) {
        if (config === void 0) { config = {}; }
        if (config && config.restURL && config.restURL !== "")
            this.restURL = config.restURL;
        else
            this.restURL = "https://rest.bitcoin.com/v2/";
        this.Address = new Address_1.Address(this.restURL);
        this.BitcoinCash = new BitcoinCash_1.BitcoinCash(this.Address);
        this.Block = new Block_1.Block(this.restURL);
        this.Blockchain = new Blockchain_1.Blockchain(this.restURL);
        this.Control = new Control_1.Control(this.restURL);
        this.Crypto = Crypto_1.Crypto;
        this.ECPair = ECPair_1.ECPair;
        this.ECPair.setAddress(this.Address);
        this.Generating = new Generating_1.Generating(this.restURL);
        this.HDNode = new HDNode_1.HDNode(this.Address);
        this.Mining = new Mining_1.Mining(this.restURL);
        this.Mnemonic = new Mnemonic_1.Mnemonic(this.Address);
        this.Price = new Price_1.Price();
        this.RawTransactions = new RawTransactions_1.RawTransactions(this.restURL);
        this.Script = new Script_1.Script();
        this.Transaction = new Transaction_1.Transaction(this.restURL);
        this.TransactionBuilder = TransactionBuilder_1.TransactionBuilder;
        this.TransactionBuilder.setAddress(this.Address);
        this.Util = new Util_1.Util(this.restURL);
        this.Socket = Socket_1.Socket;
        this.Wallet = Wallet_1.Wallet;
        this.Schnorr = new Schnorr_1.Schnorr();
    }
    return BITBOX;
}());
exports.BITBOX = BITBOX;
//# sourceMappingURL=BITBOX.js.map