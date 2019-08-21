// imports
import axios, { AxiosResponse } from "axios"
import { AddressDetailsResult, AddressUtxoResult, utxo } from "bitcoin-com-rest"
import * as bcl from "bitcoincashjs-lib"
import { Address } from "./Address"
import { REST_URL } from "./BITBOX"
import { BitcoinCash } from "./BitcoinCash"
import { ECPair } from "./ECPair"
import { RawTransactions } from "./RawTransactions"
import { TransactionBuilder } from "./TransactionBuilder"

export interface AddressDetails {
  isvalid: boolean
  address: string
  scriptPubKey: string
  ismine: boolean
  iswatchonly: boolean
  isscript: boolean
  pubkey: string
  iscompressed: boolean
  account: string
}

export class Util {
  public restURL: string
  public address: Address
  public ecPair: ECPair
  public bitcoinCash: BitcoinCash
  public rawTransactions: RawTransactions
  constructor(restURL: string = REST_URL) {
    this.restURL = restURL
    this.address = new Address(restURL)
    this.ecPair = new ECPair(this.address)
    this.bitcoinCash = new BitcoinCash(this.address)
    this.rawTransactions = new RawTransactions(restURL)
  }
  public async validateAddress(
    address: string | string[]
  ): Promise<AddressDetails | AddressDetails[]> {
    try {
      // Single block
      if (typeof address === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}util/validateAddress/${address}`
        )
        return response.data
        // Array of blocks.
      } else if (Array.isArray(address)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response: AxiosResponse = await axios.post(
          `${this.restURL}util/validateAddress`,
          {
            addresses: address
          }
        )
        return response.data
      }
      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
  // Sweep a private key in compressed WIF format and sends funds to another
  // address.
  // Passing in optional balanceOnly flag will return just the balance without
  // actually moving the funds.
  // Or 0 if no funds are found, otherwise:
  // Returns an object containing the amount of BCH swept from address,
  // and the txid of the generated transaction that swept the funds.
  async sweep(wif: string, toAddr: string, balanceOnly: boolean) {
    try {
      // Input validation
      if (!wif || wif === "") {
        throw new Error(
          `wif private key must be included in Compressed WIF format.`
        )
      }
      // Input validation
      if (!balanceOnly) {
        if (!toAddr || toAddr === "") {
          throw new Error(
            `Address to receive swept funds must be included unless balanceOnly flag is true.`
          )
        }
      }
      // Generate a keypair from the WIF.
      const keyPair: bcl.ECPair = this.ecPair.fromWIF(wif)

      // Generate the public address associated with the private key.
      const fromAddr: string = this.ecPair.toCashAddress(keyPair)

      // Check the BCH balance of that public address.
      const details = (await this.address.details(
        fromAddr
      )) as AddressDetailsResult
      const balance: number = details.unconfirmedBalance

      // If balance is zero or balanceOnly flag is passed in, exit.
      if (balance === 0 || balanceOnly) return balance

      // Get UTXOs associated with public address.
      const u = (await this.address.utxo(fromAddr)) as AddressUtxoResult
      const utxos: utxo[] = u.utxos

      // Prepare to generate a transaction to sweep funds.

      const transactionBuilder: TransactionBuilder = new TransactionBuilder(
        this.address.detectAddressNetwork(fromAddr)
      )
      let originalAmount: number = 0

      // Add all UTXOs to the transaction inputs.
      for (let i: number = 0; i < utxos.length; i++) {
        const utxo: utxo = utxos[i]
        originalAmount = originalAmount + utxo.satoshis
        transactionBuilder.addInput(utxo.txid, utxo.vout)
      }

      if (originalAmount < 1)
        throw new Error(`Original amount is zero. No BCH to send.`)

      // get byte count to calculate fee. paying 1.1 sat/byte
      const byteCount: number = this.bitcoinCash.getByteCount(
        { P2PKH: utxos.length },
        { P2PKH: 1 }
      )
      const fee: number = Math.ceil(1.1 * byteCount)

      // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      const sendAmount: number = originalAmount - fee

      // add output w/ address and amount to send
      transactionBuilder.addOutput(
        this.address.toLegacyAddress(toAddr),
        sendAmount
      )

      // Loop through each input and sign it with the private key.
      let redeemScript: undefined
      for (let i: number = 0; i < utxos.length; i++) {
        const utxo = utxos[i]
        transactionBuilder.sign(
          i,
          keyPair,
          redeemScript,
          transactionBuilder.hashTypes.SIGHASH_ALL,
          utxo.satoshis
        )
      }

      // build tx
      const tx: any = transactionBuilder.build()

      // output rawhex
      const hex: string = tx.toHex()

      // Broadcast the transaction to the BCH network.
      let txid: string = await this.rawTransactions.sendRawTransaction(hex)
      return txid
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
