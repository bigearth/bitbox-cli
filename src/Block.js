import axios from 'axios';
class Block {
  constructor(restURL) {
    this.restURL = restURL;
  }

  async details(id) {
    try {
      let response = await axios.get(`${this.restURL}block/details/${id}`)
      return response.data;
    } catch (error) {
      return JSON.stringify(error.response.data.error.message);
    }
  }
}

export default Block;
