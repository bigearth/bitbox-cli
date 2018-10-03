import axios from "axios"
class Price {
  async current(currency = "all") {
    try {
      const response = await axios.get(
        `https://www.blocktrail.com/BCC/json/blockchain/price`
      )
      if (currency === "all") return response.data

      return response.data[currency.toUpperCase()]
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Price
