import axios, { AxiosResponse } from "axios"
import { TxnDetails } from "bitcoin-com-rest";
import { resturl } from "./BITBOX"

export class Transaction {
  public restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  public async details(txid: string | string[]): Promise<TxnDetails | TxnDetails[]> {
    try {
      // Handle single address.
      if (typeof txid === "string") {
        const response: AxiosResponse = await axios.get(
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
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input txid must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
