import axios from 'axios';
class Generating {
  constructor(restBaseURL) {
    this.restBaseURL = restBaseURL;
  }

  generateToAddress(blocks, address, maxtries = 1000000) {

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
    return axios.post(`${this.restBaseURL}generating/generateToAddress/${blocks}/${address}?maxtries=${maxtries}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default Generating;
