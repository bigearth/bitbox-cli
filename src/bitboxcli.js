import axios from 'axios';
import BitcoinCash from './BitcoinCash';
import Crypto from './Crypto';
import Util from './Util';
import Blockchain from './Blockchain';
import Control from './Control';
import Generating from './Generating';
import Mining from './Mining';
import Network from './Network';
import RawTransactions from './RawTransactions';
import Wallet from './Wallet';
import Mnemonic from './Mnemonic';

class BITBOXCli {
  constructor(config) {
    if(!config) {
      config = {
        username: '',
        password: '',
        protocol: '',
        host: '',
        port: ''
      };
    }

    this.config = config;
    this.BitboxHTTP = axios.create({
      baseURL: `${config.protocol}://${config.host}:${config.port}/`
    });
    this.BitcoinCash = new BitcoinCash();
    this.Crypto = Crypto;
    this.Mnemonic = new Mnemonic();
    this.Util = new Util(config, this.BitboxHTTP);
    this.Blockchain = new Blockchain(config, this.BitboxHTTP);
    this.Control = new Control(config, this.BitboxHTTP);
    this.Generating = new Generating(config, this.BitboxHTTP);
    this.Mining = new Mining(config, this.BitboxHTTP);
    this.Network = new Network(config, this.BitboxHTTP);
    this.RawTransactions = new RawTransactions(config, this.BitboxHTTP);
    this.Wallet = new Wallet(config, this.BitboxHTTP);
  }


  estimatesmartfee(nblocks) {
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

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"estimatesmartfee",
        method: "estimatesmartfee",
        params: [
          nblocks
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  estimatesmartpriority(nblocks) {
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
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"estimatesmartpriority",
        method: "estimatesmartpriority",
        params: [
          nblocks
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  generatetoaddress(blocks, address, maxtries) {

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

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"generatetoaddress",
        method: "generatetoaddress",
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

  walletlock() {
    // removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.
    //
    // Parameters: none
    //
    // Result—null on success

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"walletlock",
        method: "walletlock",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  walletpassphrase(passphrase, seconds) {
    // stores the wallet decryption key in memory for the indicated number of seconds. Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock time that overrides the old one.

    //Parameter #1—the passphrase

    // Parameter #2—the number of seconds to leave the wallet unlocked

    // Result—null on success
    let params = [];
    if(passphrase) {
      params.push(passphrase);
    }

    if(seconds) {
      params.push(seconds);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"walletpassphrase",
        method: "walletpassphrase",
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

  walletpassphrasechange(passphrase, newPassphrase) {
    //  changes the wallet passphrase from ‘old passphrase’ to ‘new passphrase’.
    // Parameter #1—the current passphrase

    // Parameter #2—the new passphrase

    // Result—null on success
    let params = [];
    if(passphrase) {
      params.push(passphrase);
    }

    if(newPassphrase) {
      params.push(newPassphrase);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"walletpassphrasechange",
        method: "walletpassphrasechange",
        params: params
      }
    })
    .then((response) => {
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }
}

export default BITBOXCli;
