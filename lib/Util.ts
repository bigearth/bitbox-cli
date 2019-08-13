import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { REST_URL } from "./BITBOX"

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
  constructor(restURL: string = REST_URL) {
    this.restURL = restURL
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

  // Sweep a private key in compressed WIF format and send funds to another address.
  // Returns the amount of BCH swept from address. Or 0 if no funds were found.
  // Passing in optional balanceOnly flag will return just the balance without
  // actually moving the funds.
  async sweep(wif: string, toAddr: string, balaneOnly: boolean) {
    try {
      console.log(`wif: ${wif}`)

      return true
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
