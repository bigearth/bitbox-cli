import axios from "axios"
import * as Bitcoin from "bitcoincashjs-lib"
import * as cashaddr from "cashaddrjs"
import * as coininfo from "coininfo"

export class Address {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  // Translate address from any address format into a specific format.
  toLegacyAddress(address) {
    const { prefix, type, hash } = this._decode(address)

    let bitcoincash
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

    let version
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

    const hashBuf = Buffer.from(hash)

    return Bitcoin.address.toBase58Check(hashBuf, version)
  }

  toCashAddress(address, prefix = true, regtest = false) {
    const decoded = this._decode(address)

    let prefixString
    if (regtest) prefixString = "bchreg"
    else prefixString = decoded.prefix

    const cashAddress = cashaddr.encode(
      prefixString,
      decoded.type,
      decoded.hash
    )

    if (prefix) return cashAddress
    return cashAddress.split(":")[1]
  }

  // Converts any address format to hash160
  toHash160(address) {
    const legacyAddress = this.toLegacyAddress(address)
    const bytes = Bitcoin.address.fromBase58Check(legacyAddress)
    return bytes.hash.toString("hex")
  }

  // Converts hash160 to Legacy Address
  hash160ToLegacy(hash160, network = Bitcoin.networks.bitcoin.pubKeyHash) {
    const buffer = Buffer.from(hash160, "hex")
    const legacyAddress = Bitcoin.address.toBase58Check(buffer, network)
    return legacyAddress
  }

  // Converts hash160 to Cash Address
  hash160ToCash(
    hash160,
    network = Bitcoin.networks.bitcoin.pubKeyHash,
    regtest = false
  ) {
    const legacyAddress = this.hash160ToLegacy(hash160, network)
    return this.toCashAddress(legacyAddress, true, regtest)
  }

  _decode(address) {
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

  _decodeLegacyAddress(address) {
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

  _decodeCashAddress(address) {
    if (address.indexOf(":") !== -1) {
      const decoded = cashaddr.decode(address)
      decoded.format = "cashaddr"
      return decoded
    }

    const prefixes = ["bitcoincash", "bchtest", "bchreg"]
    for (let i = 0; i < prefixes.length; ++i) {
      try {
        const decoded = cashaddr.decode(`${prefixes[i]}:${address}`)
        decoded.format = "cashaddr"
        return decoded
      } catch (error) {}
    }

    throw new Error(`Invalid format : ${address}`)
  }

  _encodeAddressFromHash160(address) {
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
  isLegacyAddress(address) {
    return this.detectAddressFormat(address) === "legacy"
  }

  isCashAddress(address) {
    return this.detectAddressFormat(address) === "cashaddr"
  }

  isHash160(address) {
    return this.detectAddressFormat(address) === "hash160"
  }

  // Test for address network.
  isMainnetAddress(address) {
    if (address[0] === "x") return true
    else if (address[0] === "t") return false

    return this.detectAddressNetwork(address) === "mainnet"
  }

  isTestnetAddress(address) {
    if (address[0] === "x") return false
    else if (address[0] === "t") return true

    return this.detectAddressNetwork(address) === "testnet"
  }

  isRegTestAddress(address) {
    return this.detectAddressNetwork(address) === "regtest"
  }

  // Test for address type.
  isP2PKHAddress(address) {
    return this.detectAddressType(address) === "p2pkh"
  }

  isP2SHAddress(address) {
    return this.detectAddressType(address) === "p2sh"
  }

  // Detect address format.
  detectAddressFormat(address) {
    const decoded = this._decode(address)

    return decoded.format
  }

  // Detect address network.
  detectAddressNetwork(address) {
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
  detectAddressType(address) {
    const decoded = this._decode(address)

    return decoded.type.toLowerCase()
  }

  fromXPub(xpub, path = "0/0") {
    const HDNode = Bitcoin.HDNode.fromBase58(
      xpub,
      Bitcoin.networks[this.detectAddressNetwork(xpub)]
    )
    const address = HDNode.derivePath(path)
    return this.toCashAddress(address.getAddress())
  }

  fromOutputScript(scriptPubKey, network = "mainnet") {
    let netParam
    if (network !== "bitcoincash" && network !== "mainnet")
      netParam = Bitcoin.networks.testnet

    const regtest = network === "bchreg"

    return this.toCashAddress(
      Bitcoin.address.fromOutputScript(scriptPubKey, netParam),
      true,
      regtest
    )
  }

  async details(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response: any = await axios.get(
          `${this.restURL}address/details/${address}`
        )

        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const options = {
          method: "POST",
          url: `${this.restURL}address/details`,
          data: {
            addresses: address
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async utxo(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response: any = await axios.get(
          `${this.restURL}address/utxo/${address}`
        )
        return response.data
      } else if (Array.isArray(address)) {
        const options = {
          method: "POST",
          url: `${this.restURL}address/utxo`,
          data: {
            addresses: address
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async unconfirmed(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response: any = await axios.get(
          `${this.restURL}address/unconfirmed/${address}`
        )
        return response.data

        // Handle an array of addresses
      } else if (Array.isArray(address)) {
        const options = {
          method: "POST",
          url: `${this.restURL}address/unconfirmed`,
          data: {
            addresses: address
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async transactions(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response: any = await axios.get(
          `${this.restURL}address/transactions/${address}`
        )
        return response.data

        // Handle an array of addresses
      } else if (Array.isArray(address)) {
        const options = {
          method: "POST",
          url: `${this.restURL}address/transactions`,
          data: {
            addresses: address
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
