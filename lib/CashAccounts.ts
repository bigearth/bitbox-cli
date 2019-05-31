import axios, { AxiosResponse } from "axios"
import { CashAccountLookupResult } from "bitcoin-com-rest"
import { resturl } from "./BITBOX"

export class CashAccounts {
  public restURL: string
  constructor(restURL: string = resturl) {
    this.restURL = restURL
  }

  public async lookup(
    account: string,
    number: number,
    collision?: number
  ): Promise<CashAccountLookupResult> {
    try {
      let col: string = ""
      if (collision) {
        col = collision.toString()
      }
      const response: AxiosResponse = await axios.get(
        `${this.restURL}cashAccounts/lookup/${account}/${number}/${col}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
