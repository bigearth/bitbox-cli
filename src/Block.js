import axios from "axios"
class Block {
  constructor(restURL) {
    this.restURL = restURL
  }

  async details(id) {
    try {
      const response = await axios.get(`${this.restURL}block/details/${id}`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Block
