import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { TxnDetailsResult } from "bitcoin-com-rest"
import { REST_URL } from "./BITBOX"

export class Transaction {
  public restURL: string
  constructor(restURL: string = REST_URL) {
    this.restURL = restURL
  }

  public async details(
    txid: string | string[]
  ): Promise<TxnDetailsResult | TxnDetailsResult[]> {
    try {
      // Handle single address.
      if (typeof txid === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}transaction/details/${txid}`
        )
        return response.data

        // Array of addresses
      } else if (Array.isArray(txid)) {
        // Dev note: must use axios.post for unit test stubbing.
        const response: AxiosResponse = await axios.post(
          `${this.restURL}transaction/details`,
          {
            txids: txid
          }
        )

        return response.data
      }

      throw new Error(`Input txid must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
