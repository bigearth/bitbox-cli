import axios, { AxiosResponse } from "axios"
import { resturl } from "./BITBOX"

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
  constructor(restURL: string = resturl) {
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
        const options = {
          method: "POST",
          url: `${this.restURL}util/validateAddress`,
          data: {
            addresses: address
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
}
