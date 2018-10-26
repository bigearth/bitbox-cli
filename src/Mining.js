import axios from "axios"
class Mining {
  constructor(restURL) {
    this.restURL = restURL
  }

  async getBlockTemplate(template_request) {
    try {
      const response = await axios.get(
        `${this.restURL}mining/getBlockTemplate/${template_request}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getMiningInfo() {
    try {
      const response = await axios.get(`${this.restURL}mining/getMiningInfo`)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  async getNetworkHashps(nblocks = 120, height = 1) {
    try {
      const response = await axios.get(
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

  async submitBlock(hex, parameters) {
    let path = `${this.restURL}mining/submitBlock/${hex}`
    if (parameters) path = `${path}?parameters=${parameters}`

    try {
      const response = await axios.post(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

export default Mining
