import axios from 'axios';
class Generating {
  constructor(config, baseURL) {
    this.config = config;
    this.baseURL = baseURL;
  }

  generateToAddress(blocks, address, maxtries) {

    // Mine blocks immediately to a specified address (before the RPC call returns)
    //
    // Arguments:
    // 1. nblocks      (numeric, required) How many blocks are generated immediately.
    // 2. address      (string, required) The address to send the newly generated bitcoin to.
    // 3. maxtries     (numeric, optional) How many iterations to try (default = 1000000).
    //
    // Result:
    // [ blockhashes ]     (array) hashes of blocks generated
    //
    let params;
    if(!maxtries) {
      params = [
        blocks,
        address
      ];
    } else {
      params = [
        blocks,
        address,
        maxtries
      ];
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"generatetoaddress",
      method: "generatetoaddress",
      params: params
    }, {
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Generating;
