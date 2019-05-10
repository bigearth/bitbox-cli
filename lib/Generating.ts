import axios from "axios"

export interface Generating {
  restURL: string
  generateToAddress(
    blocks: number,
    address: string,
    maxtries?: number
  ): Promise<any[]>
}

export class Generating implements Generating {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async generateToAddress(
    blocks: number,
    address: string,
    maxtries: number = 1000000
  ): Promise<any[]> {
    try {
      const response: any = await axios.post(
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
