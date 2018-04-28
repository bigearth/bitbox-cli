import axios from 'axios';
class Util {
  constructor(config, baseURL) {
    this.config = config;
    this.baseURL = baseURL;
  }

  estimateSmartFee(nblocks) {
    // WARNING: This interface is unstable and may disappear or change!
    //
    // Estimates the approximate fee per kilobyte needed for a transaction to begin
    // confirmation within nblocks blocks if possible and return the number of blocks
    // for which the estimate is valid.
    //
    // Arguments:
    // 1. nblocks     (numeric)
    //
    // Result:
    // {
    //   "feerate" : x.x,     (numeric) estimate fee-per-kilobyte (in BCH)
    //   "blocks" : n         (numeric) block number where estimate was found
    // }
    //
    // A negative value is returned if not enough transactions and blocks
    // have been observed to make an estimate for any number of blocks.
    // However it will not return a value below the mempool reject fee.

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"estimatesmartfee",
      method: "estimatesmartfee",
      params: [
        nblocks
      ]
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

  estimateSmartPriority(nblocks) {
    // DEPRECATED. WARNING: This interface is unstable and may disappear or change!
    //
    // Estimates the approximate priority a zero-fee transaction needs to begin
    // confirmation within nblocks blocks if possible and return the number of blocks
    // for which the estimate is valid.
    //
    // Arguments:
    // 1. nblocks     (numeric, required)
    //
    // Result:
    // {
    //   "priority" : x.x,    (numeric) estimated priority
    //   "blocks" : n         (numeric) block number where estimate was found
    // }
    //
    // A negative value is returned if not enough transactions and blocks
    // have been observed to make an estimate for any number of blocks.
    // However if the mempool reject fee is set it will return 1e9 * MAX_MONEY.

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"estimatesmartpriority",
      method: "estimatesmartpriority",
      params: [
        nblocks
      ]
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

  createMultisig(required, address) {
    // The createmultisig RPC creates a P2SH multi-signature address.

    // Parameter #1—the number of signatures required
    // The minimum (m) number of signatures required to spend this m-of-n multisig script

    // Parameter #2—the full public keys, or addresses for known public keys

    // An array of strings with each string being a public key or address
    // or
    // A public key against which signatures will be checked. If wallet support is enabled, this may be a P2PKH address belonging to the wallet—the corresponding public key will be substituted.
    // There must be at least as many keys as specified by the Required parameter, and there may be more keys

    // Result—P2SH address and hex-encoded redeem script

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"createmultisig",
      method: "createmultisig",
      params: [
        required,
        address
      ]
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


  estimateFee(nblocks) {
    // Estimates the approximate fee per kilobyte needed for a transaction to begin confirmation within nblocks blocks.

    // Arguments:
    // 1. nblocks     (numeric, required)

    // Result:
    // n              (numeric) estimated fee-per-kilobyte

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"estimatefee",
      method: "estimatefee",
      params: [
        parseInt(nblocks)
      ]
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

  estimatePriority(nblocks) {
    // DEPRECATED. Estimates the approximate priority a zero-fee transaction needs to begin
    // confirmation within nblocks blocks.
    //
    // Arguments:
    // 1. nblocks     (numeric, required)
    //
    // Result:
    // n              (numeric) estimated priority

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"estimatepriority",
      method: "estimatepriority",
      params: [
        parseInt(nblocks)
      ]
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

  signMessageWithPrivKey(privkey, message) {
    // Sign a message with the private key of an address

    // Arguments:
    // 1. "privkey"         (string, required) The private key to sign the message with.
    // 2. "message"         (string, required) The message to create a signature of.

    // Result:
    // "signature"          (string) The signature of the message encoded in base 64

    let params = [];
    if(privkey) {
      params.push(privkey);
    }

    if(message) {
      params.push(message);
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"signmessagewithprivkey",
      method: "signmessagewithprivkey",
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

  validateAddress(address) {
    // Return information about the given bitcoin address.
    //
    // Arguments:
    // 1. "address"     (string, required) The bitcoin address to validate
    //
    // Result:
    // {
    //   "isvalid" : true|false,       (boolean) If the address is valid or not. If not, this is the only property returned.
    //   "address" : "address", (string) The bitcoin address validated
    //   "scriptPubKey" : "hex",       (string) The hex encoded scriptPubKey generated by the address
    //   "ismine" : true|false,        (boolean) If the address is yours or not
    //   "iswatchonly" : true|false,   (boolean) If the address is watchonly
    //   "isscript" : true|false,      (boolean) If the key is a script
    //   "pubkey" : "publickeyhex",    (string) The hex value of the raw public key
    //   "iscompressed" : true|false,  (boolean) If the address is compressed
    //   "account" : "account"         (string) DEPRECATED. The account associated with the address, "" is the default account
    //   "timestamp" : timestamp,        (number, optional) The creation time of the key if available in seconds since epoch (Jan 1 1970 GMT)
    //   "hdkeypath" : "keypath"       (string, optional) The HD keypath if the key is HD and available
    //   "hdmasterkeyid" : "<hash160>" (string, optional) The Hash160 of the HD master pubkey
    // }
    let params = [];
    if(address) {
      params.push(address);
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"validateaddress",
      method: "validateaddress",
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

  verifyMessage(address, signature, message) {
    // Verify a signed message

    // Arguments:
    // 1. "address"         (string, required) The bitcoin address to use for the signature.
    // 2. "signature"       (string, required) The signature provided by the signer in base 64 encoding (see signmessage).
    // 3. "message"         (string, required) The message that was signed.

    // Result:
    // true|false   (boolean) If the signature is verified or not.

    let params = [];
    if(address) {
      params.push(address);
    }

    if(signature) {
      params.push(signature);
    }

    if(message) {
      params.push(message);
    }
    
    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"verifymessage",
      method: "verifymessage",
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

export default Util;
