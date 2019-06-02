import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { VerboseRawTransactionResult } from "bitcoin-com-rest"
import { resturl } from "./BITBOX"

export class RawTransactions {
  public restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  public async decodeRawTransaction(
    hex: string | string[]
  ): Promise<any | any[]> {
    try {
      // Single hex
      if (typeof hex === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}rawtransactions/decodeRawTransaction/${hex}`
        )

        return response.data

        // Array of hexes
      } else if (Array.isArray(hex)) {
        const options: AxiosRequestConfig = {
          method: "POST",
          url: `${this.restURL}rawtransactions/decodeRawTransaction`,
          data: {
            hexes: hex
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async decodeScript(script: string | string[]): Promise<any | any[]> {
    //if (typeof script !== "string") script = JSON.stringify(script)

    try {
      if (typeof script === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}rawtransactions/decodeScript/${script}`
        )

        return response.data
      } else if (Array.isArray(script)) {
        const options: AxiosRequestConfig = {
          method: "POST",
          url: `${this.restURL}rawtransactions/decodeScript`,
          data: {
            hexes: script
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getRawTransaction(
    txid: string | string[],
    verbose: boolean = false
  ): Promise<
    | VerboseRawTransactionResult
    | VerboseRawTransactionResult[]
    | string
    | string[]
  > {
    try {
      if (typeof txid === "string") {
        const response: AxiosResponse = await axios.get(
          `${
            this.restURL
          }rawtransactions/getRawTransaction/${txid}?verbose=${verbose}`
        )

        return response.data
      } else if (Array.isArray(txid)) {
        const options: AxiosRequestConfig = {
          method: "POST",
          url: `${this.restURL}rawtransactions/getRawTransaction`,
          data: {
            txids: txid,
            verbose: verbose
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async sendRawTransaction(
    hex: string | string[],
    allowhighfees: boolean = false
  ): Promise<any | any[]> {
    try {
      // Single tx hex.
      if (typeof hex === "string") {
        const response: AxiosResponse = await axios.get(
          `${this.restURL}rawtransactions/sendRawTransaction/${hex}`
        )

        if (response.data === "66: insufficient priority") {
          console.warn(
            `WARN: Insufficient Priority! This is likely due to a fee that is too low, or insufficient funds.
            Please ensure that there is BCH in the given wallet. If you are running on the testnet, get some
            BCH from the testnet faucet at https://developer.bitcoin.com/faucets/bch`
          )
        }

        return response.data

        // Array input
      } else if (Array.isArray(hex)) {
        const options: AxiosRequestConfig = {
          method: "POST",
          url: `${this.restURL}rawtransactions/sendRawTransaction`,
          data: {
            hexes: hex
          }
        }
        const response: AxiosResponse = await axios(options)

        return response.data
      }

      throw new Error(`Input hex must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
