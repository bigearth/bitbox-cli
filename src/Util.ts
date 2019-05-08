import axios from "axios"

export class Util {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async validateAddress(address: string): Promise<any> {
    try {
      // Single block
      if (typeof address === "string") {
        const response: any = await axios.get(
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
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
