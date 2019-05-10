"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitcoin = require("bitcoincashjs-lib");
var sb = require("satoshi-bitcoin");
var bitcoinMessage = require("bitcoinjs-message");
var bs58 = require("bs58");
var bip21 = require("bip21");
var coininfo = require("coininfo");
var bip38 = require("bip38");
var wif = require("wif");
var Buffer = require("safe-buffer").Buffer;
var BitcoinCash = /** @class */ (function () {
    function BitcoinCash(address) {
        this._address = address;
    }
    // Translate coins to satoshi value
    BitcoinCash.prototype.toSatoshi = function (coins) {
        return sb.toSatoshi(coins);
    };
    // Translate satoshi to coin value
    BitcoinCash.prototype.toBitcoinCash = function (satoshis) {
        return sb.toBitcoin(satoshis);
    };
    // sign message
    BitcoinCash.prototype.signMessageWithPrivKey = function (privateKeyWIF, message) {
        var network = privateKeyWIF.charAt(0) === "c" ? "testnet" : "mainnet";
        var bitcoincash;
        if (network === "mainnet")
            bitcoincash = coininfo.bitcoincash.main;
        else
            bitcoincash = coininfo.bitcoincash.test;
        var bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS();
        var keyPair = Bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoincashBitcoinJSLib);
        var privateKey = keyPair.d.toBuffer(32);
        return bitcoinMessage
            .sign(message, privateKey, keyPair.compressed)
            .toString("base64");
    };
    // verify message
    BitcoinCash.prototype.verifyMessage = function (address, signature, message) {
        return bitcoinMessage.verify(message, this._address.toLegacyAddress(address), signature);
    };
    // encode base58Check
    BitcoinCash.prototype.encodeBase58Check = function (hex) {
        return bs58.encode(Buffer.from(hex, "hex"));
    };
    // decode base58Check
    BitcoinCash.prototype.decodeBase58Check = function (address) {
        return bs58.decode(address).toString("hex");
    };
    // encode bip21 url
    BitcoinCash.prototype.encodeBIP21 = function (address, options, regtest) {
        if (regtest === void 0) { regtest = false; }
        return bip21.encode(this._address.toCashAddress(address, true, regtest), options);
    };
    // decode bip21 url
    BitcoinCash.prototype.decodeBIP21 = function (url) {
        return bip21.decode(url);
    };
    BitcoinCash.prototype.getByteCount = function (inputs, outputs) {
        // from https://github.com/bitcoinjs/bitcoinjs-lib/issues/921#issuecomment-354394004
        var totalWeight = 0;
        var hasWitness = false;
        // assumes compressed pubkeys in all cases.
        var types = {
            inputs: {
                "MULTISIG-P2SH": 49 * 4,
                "MULTISIG-P2WSH": 6 + 41 * 4,
                "MULTISIG-P2SH-P2WSH": 6 + 76 * 4,
                P2PKH: 148 * 4,
                P2WPKH: 108 + 41 * 4,
                "P2SH-P2WPKH": 108 + 64 * 4
            },
            outputs: {
                P2SH: 32 * 4,
                P2PKH: 34 * 4,
                P2WPKH: 31 * 4,
                P2WSH: 43 * 4
            }
        };
        Object.keys(inputs).forEach(function (key) {
            if (key.slice(0, 8) === "MULTISIG") {
                // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
                var keyParts = key.split(":");
                if (keyParts.length !== 2)
                    throw new Error("invalid input: " + key);
                var newKey = keyParts[0];
                var mAndN = keyParts[1].split("-").map(function (item) {
                    return parseInt(item);
                });
                totalWeight += types.inputs[newKey] * inputs[key];
                var multiplyer = newKey === "MULTISIG-P2SH" ? 4 : 1;
                totalWeight += (73 * mAndN[0] + 34 * mAndN[1]) * multiplyer;
            }
            else {
                totalWeight += types.inputs[key] * inputs[key];
            }
            if (key.indexOf("W") >= 0)
                hasWitness = true;
        });
        Object.keys(outputs).forEach(function (key) {
            totalWeight += types.outputs[key] * outputs[key];
        });
        if (hasWitness)
            totalWeight += 2;
        totalWeight += 10 * 4;
        return Math.ceil(totalWeight / 4);
    };
    BitcoinCash.prototype.encryptBIP38 = function (privKeyWIF, passphrase) {
        var decoded = wif.decode(privKeyWIF);
        return bip38.encrypt(decoded.privateKey, decoded.compressed, passphrase);
    };
    BitcoinCash.prototype.decryptBIP38 = function (encryptedKey, passphrase, network) {
        if (network === void 0) { network = "mainnet"; }
        var decryptedKey = bip38.decrypt(encryptedKey, passphrase);
        var prefix;
        if (network === "testnet")
            prefix = 0xef;
        else
            prefix = 0x80;
        return wif.encode(prefix, decryptedKey.privateKey, decryptedKey.compressed);
    };
    return BitcoinCash;
}());
exports.BitcoinCash = BitcoinCash;
//# sourceMappingURL=BitcoinCash.js.map