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
    try {
      // Handle single address.
      if (typeof txid === "string") {
        const response = await axios.get(
          `${this.restURL}transaction/details/${txid}`
        )
        return response.data
      } else if (Array.isArray(txid)) {
        const options = {
          method: "POST",
          url: `${this.restURL}transaction/details`,
          data: {
            txids: txid
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input txid must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Transaction
