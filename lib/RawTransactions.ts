import axios from "axios"

export interface RawTransactions {
  restURL: string
  decodeRawTransaction(hex: string | string[]): Promise<any | any[]>
  decodeScript(script: string | string[]): Promise<any | any[]>
  getRawTransaction(
    txid: string | string,
    verbose?: boolean
  ): Promise<any | VerboseRawTransaction | VerboseRawTransaction[]>
  sendRawTransaction(
    hex: string | string[],
    allowhighfees?: boolean
  ): Promise<any | any[]>
}

export interface VerboseRawTransaction {
  hex: string
  txid: string
  size: number
  version: number
  locktime: number
  vin: [{ coinbase: string; sequence: number }]
  vout: [
    {
      value: number
      n: number
      scriptPubKey: {
        asm: string
        hex: string
        reqSigs: number
        type: string
        addresses: string[]
      }
    }
  ]
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export class RawTransactions implements RawTransactions {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async decodeRawTransaction(hex: string | string[]): Promise<any | any[]> {
    try {
      // Single hex
      if (typeof hex === "string") {
        const response: any = await axios.get(
          `${this.restURL}rawtransactions/decodeRawTransaction/${hex}`
        )

        return response.data

        // Array of hexes
      } else if (Array.isArray(hex)) {
        const options = {
          method: "POST",
          url: `${this.restURL}rawtransactions/decodeRawTransaction`,
          data: {
            hexes: hex
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async decodeScript(script: string | string[]): Promise<any | any[]> {
    //if (typeof script !== "string") script = JSON.stringify(script)

    try {
      if (typeof script === "string") {
        const response: any = await axios.get(
          `${this.restURL}rawtransactions/decodeScript/${script}`
        )

        return response.data
      } else if (Array.isArray(script)) {
        const options = {
          method: "POST",
          url: `${this.restURL}rawtransactions/decodeScript`,
          data: {
            hexes: script
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getRawTransaction(
    txid: string | string[],
    verbose: boolean = false
  ): Promise<any | VerboseRawTransaction | VerboseRawTransaction[]> {
    try {
      if (typeof txid === "string") {
        const response: any = await axios.get(
          `${
            this.restURL
          }rawtransactions/getRawTransaction/${txid}?verbose=${verbose}`
        )

        return response.data
      } else if (Array.isArray(txid)) {
        const options = {
          method: "POST",
          url: `${this.restURL}rawtransactions/getRawTransaction`,
          data: {
            txids: txid,
            verbose: verbose
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async sendRawTransaction(
    hex: string | string[],
    allowhighfees: boolean = false
  ): Promise<any | any[]> {
    try {
      // Single tx hex.
      if (typeof hex === "string") {
        const response: any = await axios.get(
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
        const options = {
          method: "POST",
          url: `${this.restURL}rawtransactions/sendRawTransaction`,
          data: {
            hexes: hex
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input hex must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
