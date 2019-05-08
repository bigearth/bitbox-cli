import axios from "axios"

export class Block {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async detailsByHeight(id: number | number[]): Promise<any> {
    try {
      // Single block
      if (typeof id === "number") {
        const response: any = await axios.get(
          `${this.restURL}block/detailsByHeight/${id}`
        )
        return response.data

        // Array of blocks.
      } else if (Array.isArray(id)) {
        const options = {
          method: "POST",
          url: `${this.restURL}block/detailsByHeight`,
          data: {
            heights: id
          }
        }
        const response = await axios(options)

        return response.data
      }

      throw new Error(`Input must be a number or array of numbers.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async detailsByHash(hash: string | string[]): Promise<any> {
    try {
      // Single block
      if (typeof hash === "string") {
        const response: any = await axios.get(
          `${this.restURL}block/detailsByHash/${hash}`
        )
        return response.data

        // Array of hashes.
      } else if (Array.isArray(hash)) {
        const options = {
          method: "POST",
          url: `${this.restURL}block/detailsByHash`,
          data: {
            hashes: hash
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
