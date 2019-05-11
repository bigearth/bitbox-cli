const Bitcoin = require("bitcoincashjs-lib")
const sb = require("satoshi-bitcoin")
const bitcoinMessage = require("bitcoinjs-message")
const bs58 = require("bs58")
const bip21 = require("bip21")
const coininfo = require("coininfo")
const bip38 = require("bip38")
const wif = require("wif")

const Buffer = require("safe-buffer").Buffer


export interface EncodeBIP21Options {
  amount?: number
  label?: string
  message?: string
}

export interface BIP21Object {
  address: string
  options?: EncodeBIP21Options
}

export interface ByteCountInput {
  P2PKH?: number
}

export interface ByteCountOutput {
  P2PKH?: number
  P2SH?: number
}

export class BitcoinCash {
  _address: any
  constructor(address: any) {
    this._address = address
  }

  // Translate coins to satoshi value
  toSatoshi(coins: number): number {
    return sb.toSatoshi(coins)
  }

  // Translate satoshi to coin value
  toBitcoinCash(satoshis: number): number {
    return sb.toBitcoin(satoshis)
  }

  // sign message
  signMessageWithPrivKey(privateKeyWIF: string, message: string): string {
    const network: string =
      privateKeyWIF.charAt(0) === "c" ? "testnet" : "mainnet"
    let bitcoincash: any
    if (network === "mainnet") bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib: any = bitcoincash.toBitcoinJS()
    const keyPair: any = Bitcoin.ECPair.fromWIF(
      privateKeyWIF,
      bitcoincashBitcoinJSLib
    )
    const privateKey: any = keyPair.d.toBuffer(32)
    return bitcoinMessage
      .sign(message, privateKey, keyPair.compressed)
      .toString("base64")
  }

  // verify message
  verifyMessage(address: string, signature: string, message: string): boolean {
    return bitcoinMessage.verify(
      message,
      this._address.toLegacyAddress(address),
      signature
    )
  }

  // encode base58Check
  encodeBase58Check(hex: string): string {
    return bs58.encode(Buffer.from(hex, "hex"))
  }

  // decode base58Check
  decodeBase58Check(address: string): string {
    return bs58.decode(address).toString("hex")
  }

  // encode bip21 url
  encodeBIP21(
    address: string,
    options: EncodeBIP21Options,
    regtest: boolean = false
  ): string {
    return bip21.encode(
      this._address.toCashAddress(address, true, regtest),
      options
    )
  }

  // decode bip21 url
  decodeBIP21(url: string): BIP21Object {
    return bip21.decode(url)
  }

  getByteCount(inputs: any, outputs: any): number {
    // from https://github.com/bitcoinjs/bitcoinjs-lib/issues/921#issuecomment-354394004
    let totalWeight: number = 0
    let hasWitness: boolean = false
    // assumes compressed pubkeys in all cases.
    const types: any = {
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
    }

    Object.keys(inputs).forEach(function(key) {
      if (key.slice(0, 8) === "MULTISIG") {
        // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
        const keyParts = key.split(":")
        if (keyParts.length !== 2) throw new Error(`invalid input: ${key}`)
        const newKey = keyParts[0]
        const mAndN = keyParts[1].split("-").map(function(item) {
          return parseInt(item)
        })

        totalWeight += types.inputs[newKey] * inputs[key]
        const multiplyer = newKey === "MULTISIG-P2SH" ? 4 : 1
        totalWeight += (73 * mAndN[0] + 34 * mAndN[1]) * multiplyer
      } else {
        totalWeight += types.inputs[key] * inputs[key]
      }
      if (key.indexOf("W") >= 0) hasWitness = true
    })

    Object.keys(outputs).forEach(function(key) {
      totalWeight += types.outputs[key] * outputs[key]
    })

    if (hasWitness) totalWeight += 2

    totalWeight += 10 * 4

    return Math.ceil(totalWeight / 4)
  }

  encryptBIP38(privKeyWIF: string, passphrase: string): string {
    const decoded: any = wif.decode(privKeyWIF)

    return bip38.encrypt(decoded.privateKey, decoded.compressed, passphrase)
  }

  decryptBIP38(
    encryptedKey: string,
    passphrase: string,
    network: string = "mainnet"
  ): string {
    const decryptedKey: any = bip38.decrypt(encryptedKey, passphrase)
    let prefix: any
    if (network === "testnet") prefix = 0xef
    else prefix = 0x80

    return wif.encode(prefix, decryptedKey.privateKey, decryptedKey.compressed)
  }
}
