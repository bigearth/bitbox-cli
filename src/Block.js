import axios from 'axios';
class Block {
  static details(id) {
    return axios.get(`https://explorer.bitcoin.com/api/bch/block/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Block;
