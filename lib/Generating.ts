import axios, { AxiosResponse } from "axios"
import { resturl } from "./BITBOX"

export class Generating {
  public restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  public async generateToAddress(
    blocks: number,
    address: string,
    maxtries: number = 1000000
  ): Promise<string[]> {
    try {
      const response: AxiosResponse = await axios.post(
        `${
          this.restURL
        }generating/generateToAddress/${blocks}/${address}?maxtries=${maxtries}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
