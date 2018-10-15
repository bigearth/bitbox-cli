import axios from "axios"
class Price {
  // TODO: v3: Default currency to usd, always call index.bitcoin.com
  async current(currency = "all") {
    try {
      if (currency === "all") {
        const response = await axios.get(
          `https://www.blocktrail.com/BCC/json/blockchain/price`
        )
        return response.data
      }

      const response = await axios.get(
        `https://index-api.bitcoin.com/api/v0/cash/price/${currency}`
      )
      return response.data.price / 100.0
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Price
