import axios from "axios"
const Bitcoin = require("bitcoincashjs-lib")
const cashaddr = require("cashaddrjs")
const coininfo = require("coininfo")

export interface AddressDetailsResult {
  balance: number
  balanceSat: number
  totalReceived: number
  totalReceivedSat: number
  totalSent: number
  totalSentSat: number
  unconfirmedBalance: number
  unconfirmedBalanceSat: number
  unconfirmedTxApperances: number
  txApperances: number
  transactions: string[]
  legacyAddress: string
  cashAddress: string
}

export interface AddressUtxoResult {
  legacyAddress: string
  cashAddress: string
  scriptPubKey: string
  utxos: [
    {
      txid: string
      vout: number
      amount: number
      satoshis: number
      height: number
      confirmations: number
    }
  ]
}

export interface AddressUnconfirmedResult {
  txid: string
  vout: number
  scriptPubKey: string
  amount: number
  satoshis: number
  confirmations: number
  ts: number
  legacyAddress: string
  cashAddress: string
}

export class Address {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  // Translate address from any address format into a specific format.
  toLegacyAddress(address: string): string {
    const { prefix, type, hash } = this._decode(address)

    let bitcoincash: any
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

    let version: any
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

    const hashBuf: any = Buffer.from(hash)

    return Bitcoin.address.toBase58Check(hashBuf, version)
  }

  toCashAddress(
    address: string,
    prefix: boolean = true,
    regtest: boolean = false
  ): string {
    const decoded = this._decode(address)

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
    const bytes = Bitcoin.address.fromBase58Check(address)
    return bytes.hash.toString("hex")
  }

  // Converts cash address format to hash160
  cashToHash160(address: string): string {
    const legacyAddress = this.toLegacyAddress(address)
    const bytes = Bitcoin.address.fromBase58Check(legacyAddress)
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
    hash160: any,
    network: any = Bitcoin.networks.bitcoin.pubKeyHash
  ): string {
    const buffer = Buffer.from(hash160, "hex")
    const legacyAddress = Bitcoin.address.toBase58Check(buffer, network)
    return legacyAddress
  }

  // Converts hash160 to Cash Address
  hash160ToCash(
    hash160: any,
    network: any = Bitcoin.networks.bitcoin.pubKeyHash,
    regtest: boolean = false
  ): string {
    const legacyAddress = this.hash160ToLegacy(hash160, network)
    return this.toCashAddress(legacyAddress, true, regtest)
  }

  _decode(address: string): any {
    try {
      return this._decodeLegacyAddress(address)
    } catch (error) {}

    try {
      return this._decodeCashAddress(address)
    } catch (error) {}

    try {
      return this._encodeAddressFromHash160(address)
    } catch (error) {}

    throw new Error(`Unsupported address format : ${address}`)
  }

  _decodeLegacyAddress(address: any): any {
    const { version, hash } = Bitcoin.address.fromBase58Check(address)
    const info = coininfo.bitcoincash

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

  _decodeCashAddress(address: string): any {
    if (address.indexOf(":") !== -1) {
      const decoded = cashaddr.decode(address)
      decoded.format = "cashaddr"
      return decoded
    }

    const prefixes: string[] = ["bitcoincash", "bchtest", "bchreg"]
    for (let i: number = 0; i < prefixes.length; ++i) {
      try {
        const decoded: any = cashaddr.decode(`${prefixes[i]}:${address}`)
        decoded.format = "cashaddr"
        return decoded
      } catch (error) {}
    }

    throw new Error(`Invalid format : ${address}`)
  }

  _encodeAddressFromHash160(address: string): any {
    try {
      return {
        legacyAddress: this.hash160ToLegacy(address),
        cashAddress: this.hash160ToCash(address),
        format: "hash160"
      }
    } catch (error) {}

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
    return this.detectAddressFormat(address) === "hash160"
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
    const decoded: any = this._decode(address)

    return decoded.format
  }

  // Detect address network.
  detectAddressNetwork(address: string): string {
    if (address[0] === "x") return "mainnet"
    else if (address[0] === "t") return "testnet"

    const decoded = this._decode(address)

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
    const decoded: any = this._decode(address)

    return decoded.type.toLowerCase()
  }

  fromXPub(xpub: string, path: string = "0/0"): string {
    let bitcoincash: any
    if (xpub[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpub[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    const HDNode: any = Bitcoin.HDNode.fromBase58(xpub, bitcoincashBitcoinJSLib)
    const address: any = HDNode.derivePath(path)
    return this.toCashAddress(address.getAddress())
  }

  fromXPriv(xpriv: string, path: string = "0'/0"): string {
    let bitcoincash: any
    if (xpriv[0] === "x") bitcoincash = coininfo.bitcoincash.main
    else if (xpriv[0] === "t") bitcoincash = coininfo.bitcoincash.test

    const bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS()
    const HDNode: any = Bitcoin.HDNode.fromBase58(
      xpriv,
      bitcoincashBitcoinJSLib
    )
    const address: any = HDNode.derivePath(path)
    return this.toCashAddress(address.getAddress())
  }

  fromOutputScript(scriptPubKey: any, network: string = "mainnet"): string {
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
