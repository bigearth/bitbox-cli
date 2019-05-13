import axios, { AxiosResponse } from "axios"
import { resturl } from "./BITBOX"

export class Mining {
  public restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  public async getBlockTemplate(template_request: any): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}mining/getBlockTemplate/${template_request}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getMiningInfo(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.restURL}mining/getMiningInfo`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async getNetworkHashps(
    nblocks: number = 120,
    height: number = 1
  ): Promise<number> {
    try {
      const response: AxiosResponse = await axios.get(
        `${
        this.restURL
        }mining/getNetworkHashps?nblocks=${nblocks}&height=${height}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  public async submitBlock(hex: string, parameters: any): Promise<any> {
    let path: string = `${this.restURL}mining/submitBlock/${hex}`
    if (parameters) path = `${path}?parameters=${parameters}`

    try {
      const response: AxiosResponse = await axios.post(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
