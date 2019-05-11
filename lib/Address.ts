import axios from "axios"
import { AddressDetailsResult, AddressUtxoResult, AddressUnconfirmedResult } from "bitcoin-com-rest";
import * as bcl from "bitcoincashjs-lib"
import { resturl } from "./BITBOX"
// TODO: port require statements to impprt
const Bitcoin = require("bitcoincashjs-lib")
const cashaddr = require("cashaddrjs")
const coininfo = require("coininfo")

interface Hash {
  hash: Buffer
}

interface Bytes extends Hash {
  version: number
}

interface Decoded extends Hash {
  prefix: string
  type: string
  format: string
}

interface BitcoinCash {
  hashGenesisBlock: string
  port: number
  portRpc: number
  protocol: { 
    magic: number
  }
  seedsDns: string[]
  versions: {
    bip32: { 
      private: number 
      public: number
    }
    bip44: number
    private: number
    public: number
    scripthash: number
    messagePrefix: string
  }
  name: string
  per1: number
  unit: string
  testnet: boolean
  toBitcoinJS: any
  toBitcore: any
}

  interface DecodedHash160 {
    legacyAddress: string
    cashAddress: string
    format: string
  }

export class Address {
  restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  // Translate address from any address format into a specific format.
  toLegacyAddress(address: string): string {
    const { prefix, type, hash } = this._decode(address)

    let bitcoincash: BitcoinCash
    switch (prefix) {
      case "bitcoincash":
        bitcoincash = coininfo.bitcoincash.main
        break
      case "bchtest":
        bitcoincash = coininfo.bitcoincash.test
        break
      case "bchreg":
        bitcoincash = coininfo.bitcoincash.regtest
        break
      default:
        throw `unsupported prefix : ${prefix}`
    }

    let version: number
    switch (type) {
      case "P2PKH":
        version = bitcoincash.versions.public
        break
      case "P2SH":
        version = bitcoincash.versions.scripthash
        break
      default:
        throw `unsupported address type : ${type}`
    }

    const hashBuf: Buffer = Buffer.from(hash)

    return Bitcoin.address.toBase58Check(hashBuf, version)
  }

  toCashAddress(
    address: string,
    prefix: boolean = true,
    regtest: boolean = false
  ): string {
    const decoded: Decoded = this._decode(address)

    let prefixString: string
    if (regtest) prefixString = "bchreg"
    else prefixString = decoded.prefix

    const cashAddress: string = cashaddr.encode(
      prefixString,
      decoded.type,
      decoded.hash
    )

    if (prefix) return cashAddress
    return cashAddress.split(":")[1]
  }

  // Converts legacy address format to hash160
  legacyToHash160(address: string): string {
    const bytes: Bytes  = Bitcoin.address.fromBase58Check(address)
    return bytes.hash.toString("hex")
  }

  // Converts cash address format to hash160
  cashToHash160(address: string): string {
    const legacyAddress: string = this.toLegacyAddress(address)
    const bytes: Bytes = Bitcoin.address.fromBase58Check(legacyAddress)
    return bytes.hash.toString("hex")
  }

  // Converts regtest address format to hash160
  // regtestToHash160(address: string): string {
  //   const legacyAddress = this.toLegacyAddress(address)
  //   const bytes = Bitcoin.address.fromBase58Check(legacyAddress)
  //   return bytes.hash.toString("hex")
  // }

  // Converts hash160 to Legacy Address
  hash160ToLegacy(
    hash160: string,
    network: number = Bitcoin.networks.bitcoin.pubKeyHash
  ): string {
    const buffer: Buffer = Buffer.from(hash160, "hex")
    return Bitcoin.address.toBase58Check(buffer, network)
  }

  // Converts hash160 to Cash Address
  hash160ToCash(
    hash160: string,
    network: number = Bitcoin.networks.bitcoin.pubKeyHash,
    regtest: boolean = false
  ): string {
    const legacyAddress: string = this.hash160ToLegacy(hash160, network)
    return this.toCashAddress(legacyAddress, true, regtest)
  }

  _decode(address: string): Decoded {
    try {
      return this._decodeLegacyAddress(address)
    } catch (error) {}

    try {
      return this._decodeCashAddress(address)
    } catch (error) {}

    throw new Error(`Unsupported address format : ${address}`)
  }

  _decodeHash160(address: string): DecodedHash160 {
    try {
      return this._decodeAddressFromHash160(address)
    } catch (error) {}

    throw new Error(`Unsupported address format : ${address}`)
  }

  _decodeLegacyAddress(address: string): Decoded {
    const { version, hash } = Bitcoin.address.fromBase58Check(address)
    const info: {
      main: any
      test: any
    } = coininfo.bitcoincash

    switch (version) {
      case info.main.versions.public:
        return {
          prefix: "bitcoincash",
          type: "P2PKH",
          hash: hash,
          format: "legacy"
        }
      case info.main.versions.scripthash:
        return {
          prefix: "bitcoincash",
          type: "P2SH",
          hash: hash,
          format: "legacy"
        }
      case info.test.versions.public:
        return {
          prefix: "bchtest",
          type: "P2PKH",
          hash: hash,
          format: "legacy"
        }
      case info.test.versions.scripthash:
        return {
          prefix: "bchtest",
          type: "P2SH",
          hash: hash,
          format: "legacy"
        }
      default:
        throw new Error(`Invalid format : ${address}`)
    }
  }

  _decodeCashAddress(address: string): Decoded {
    if (address.indexOf(":") !== -1) {
      const decoded: Decoded = cashaddr.decode(address)
      decoded.format = "cashaddr"
      return decoded
    }

    const prefixes: string[] = ["bitcoincash", "bchtest", "bchreg"]
    for (let i: number = 0; i < prefixes.length; ++i) {
      try {
        const decoded: Decoded = cashaddr.decode(`${prefixes[i]}:${address}`)
        decoded.format = "cashaddr"
        return decoded
      } catch (error) {}
    }

    throw new Error(`Invalid format : ${address}`)
  }

  _decodeAddressFromHash160(address: string): DecodedHash160 {
    if (address.length === 40) {
      return {
        legacyAddress: this.hash160ToLegacy(address),
        cashAddress: this.hash160ToCash(address),
        format: "hash160"
      }
    } else if(this.isCashAddress(address) || this.isLegacyAddress(address)) {
      return {
        legacyAddress: this.toLegacyAddress(address),
        cashAddress: this.toCashAddress(address),
        format: "nonHash160"
      }
    }

    throw new Error(`Invalid format : ${address}`)
  }

  // Test for address format.
  isLegacyAddress(address: string): boolean {
    return this.detectAddressFormat(address) === "legacy"
  }

  isCashAddress(address: string): boolean {
    return this.detectAddressFormat(address) === "cashaddr"
  }

  isHash160(address: string): boolean {
    return this._detectHash160Format(address) === "hash160"
  }

  // Test for address network.
  isMainnetAddress(address: string): boolean {
    if (address[0] === "x") return true
    else if (address[0] === "t") return false

    return this.detectAddressNetwork(address) === "mainnet"
  }

  isTestnetAddress(address: string): boolean {
    if (address[0] === "x") return false
    else if (address[0] === "t") return true

    return this.detectAddressNetwork(address) === "testnet"
  }

  isRegTestAddress(address: string): boolean {
    return this.detectAddressNetwork(address) === "regtest"
  }

  // Test for address type.
  isP2PKHAddress(address: string): boolean {
    return this.detectAddressType(address) === "p2pkh"
  }

  isP2SHAddress(address: string): boolean {
    return this.detectAddressType(address) === "p2sh"
  }

  // Detect address format.
  detectAddressFormat(address: string): string {
    const decoded: Decoded = this._decode(address)
    return decoded.format
  }

  // Detect address format.
  _detectHash160Format(address: string): string {
    const decoded: DecodedHash160 = this._decodeHash160(address)
    return decoded.format
  }

  // Detect address network.
  detectAddressNetwork(address: string): string {
    if (address[0] === "x") return "mainnet"
    else if (address[0] === "t") return "testnet"

    const decoded: Decoded = this._decode(address)

    switch (decoded.prefix) {
      case "bitcoincash":
        return "mainnet"
      case "bchtest":
        return "testnet"
      case "bchreg":
        return "regtest"
      default:
        throw new Error(`Invalid prefix : ${decoded.prefix}`)
    }
  }

  // Detect address type.
  detectAddressType(address: string): string {
    const decoded: Decoded = this._decode(address)
    return decoded.type.toLowerCase()
  }

  fromXPub(xpub: string, path: string = "0/0"): string {
    let bitcoincash: BitcoinCash
    if (xpub[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib: any = bitcoincash.toBitcoinJS()
    const HDNode: bcl.HDNode = Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
    const address: bcl.HDNode = HDNode.derivePath(path)
    return this.toCashAddress(address.getAddress())
  }

  fromXPriv(xpriv: string, path: string = "0'/0"): string {
    let bitcoincash: BitcoinCash
    if (xpriv[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib: any = bitcoincash.toBitcoinJS()
    const HDNode: bcl.HDNode = Bitcoin.HDNode.fromBase58(
      xpriv,
      bitcoincashBitcoinJSLib
    )
    const address: bcl.HDNode = HDNode.derivePath(path)
    return this.toCashAddress(address.getAddress())
  }

  fromOutputScript(scriptPubKey: Buffer, network: string = "mainnet"): string {
    let netParam: any
    if (network !== "bitcoincash" && network !== "mainnet")
      netParam = Bitcoin.networks.testnet

    const regtest: boolean = network === "bchreg"

    return this.toCashAddress(
      Bitcoin.address.fromOutputScript(scriptPubKey, netParam),
      true,
      regtest
    )
  }

  async details(
    address: string | string[]
  ): Promise<AddressDetailsResult | AddressDetailsResult[]> {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response: any = await axios.get(
          `${this.restURL}address/details/${address}`
        )

        return <AddressDetailsResult>response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const options: any = {
          method: "POST",
          url: `${this.restURL}address/details`,
          data: {
            addresses: address
          }
        }
        const response: any = await axios(options)

        return <AddressDetailsResult>response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async utxo(
    address: string | string[]
  ): Promise<AddressUtxoResult | AddressUtxoResult[]> {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response: any = await axios.get(
          `${this.restURL}address/utxo/${address}`
        )
        return response.data
      } else if (Array.isArray(address)) {
        const options: any = {
          method: "POST",
          url: `${this.restURL}address/utxo`,
          data: {
            addresses: address
          }
        }
        const response: any = await axios(options)

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async unconfirmed(
    address: string | string[]
  ): Promise<AddressUnconfirmedResult | AddressUnconfirmedResult[]> {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response: any = await axios.get(
          `${this.restURL}address/unconfirmed/${address}`
        )
        return response.data

        // Handle an array of addresses
      } else if (Array.isArray(address)) {
        const options: any = {
          method: "POST",
          url: `${this.restURL}address/unconfirmed`,
          data: {
            addresses: address
          }
        }
        const response: any = await axios(options)

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async transactions(address: string | string[]): Promise<any> {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response: any = await axios.get(
          `${this.restURL}address/transactions/${address}`
        )
        return response.data

        // Handle an array of addresses
      } else if (Array.isArray(address)) {
        const options: any = {
          method: "POST",
          url: `${this.restURL}address/transactions`,
          data: {
            addresses: address
          }
        }
        const response: any = await axios(options)

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
