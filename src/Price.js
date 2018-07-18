import axios from 'axios';
class Price {
  current(currency = 'all') {
    return axios.get(`https://www.blocktrail.com/BCC/json/blockchain/price`)
    .then((response) => {
      if(currency === 'all') {
        return response.data;
      } else {
        return response.data[currency.toUpperCase()];
      }
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Price;
