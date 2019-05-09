const Bitcoin = require("bitcoincashjs-lib")
import axios from "axios"

export class Transaction {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async details(txid: string) {
    try {
      // Handle single address.
      if (typeof txid === "string") {
        const response: any = await axios.get(
          `${this.restURL}transaction/details/${txid}`
        )
        return response.data

        // Array of addresses
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
