import axios from "axios"
class Block {
  constructor(restURL) {
    this.restURL = restURL
  }

  async detailsByHeight(id) {
    try {
      const response = await axios.get(
        `${this.restURL}block/detailsByHeight/${id}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async detailsByHash(hash) {
    try {
      const response = await axios.get(
        `${this.restURL}block/detailsByHash/${hash}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Block
