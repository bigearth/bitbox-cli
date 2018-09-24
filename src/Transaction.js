"use strict"
import Bitcoin from "bitcoincashjs-lib"
import axios from "axios"

class Transaction {
  constructor(restURL) {
    this.restURL = restURL
  }

  transaction() {
    return new Bitcoin.Transaction()
  }

  fromHex(hex) {
    return Bitcoin.Transaction.fromHex(hex)
  }

  transactionBuilder(network = "bitcoin") {
    return new Bitcoin.TransactionBuilder(Bitcoin.networks[network])
  }

  fromTransaction(tx) {
    return Bitcoin.TransactionBuilder.fromTransaction(tx)
  }

  async details(txid) {
    if (typeof txid !== "string") {
      txid = JSON.stringify(txid)
    }

    try {
      let response = await axios.get(
        `${this.restURL}transaction/details/${txid}`
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  }
}

export default Transaction
