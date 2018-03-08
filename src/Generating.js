class Generating {
  constructor(config, BitboxHTTP) {
    this.config = config;
    this.BitboxHTTP = BitboxHTTP;
  }

  generate(blocks, maxtries) {
    // Mine up to nblocks blocks immediately (before the RPC call returns)
    //
    // Arguments:
    // 1. nblocks      (numeric, required) How many blocks are generated immediately.
    // 2. maxtries     (numeric, optional) How many iterations to try (default = 1000000).

    let params;
    if(!maxtries) {
      params = [
        blocks
      ];
    } else {
      params = [
        blocks,
        maxtries
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"generate",
        method: "generate",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }
}

export default Generating;
