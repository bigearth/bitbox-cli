import axios from 'axios';
class Block {
  constructor(restBaseURL) {
    this.restBaseURL = restBaseURL;
  }

  details(id) {
    return axios.get(`${this.restBaseURL}block/details/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Block;
