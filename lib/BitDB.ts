// imports
import axios, { AxiosResponse } from "axios"
import { BITDB_URL } from "./BITBOX"
import { BitDBResponse, QueryInterface } from "./interfaces/BITBOXInterfaces"

// consts
const Buffer = require("safe-buffer").Buffer

export class BitDB {
  public bitdbURL: string
  constructor(bitdbURL: string = BITDB_URL) {
    this.bitdbURL = bitdbURL
  }

  public async get(query: QueryInterface): Promise<BitDBResponse> {
    try {
      const s: string = JSON.stringify(query)
      const b64: string = Buffer.from(s).toString("base64")
      const url: string = `${this.bitdbURL}q/${b64}`
      const tokenRes: AxiosResponse = await axios.get(url)
      return tokenRes.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
