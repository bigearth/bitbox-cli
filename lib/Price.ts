import axios, { AxiosResponse } from "axios"

export class Price {
  public async current(currency: string = "usd"): Promise<number> {
    try {
      const response: AxiosResponse = await axios.get(
        `https://index-api.bitcoin.com/api/v0/cash/price/${currency.toLowerCase()}`
      )
      return response.data.price
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
