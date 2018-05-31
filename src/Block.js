import axios from 'axios';
class Block {
  constructor(restURL) {
    this.restURL = restURL;
  }

  details(id) {
    return axios.get(`${this.restURL}block/details/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Block;
