// 3rd party deps
import axios from 'axios';
import Bitcoin from 'bitcoinjs-lib';

// local deps
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
import Address from './Address';
import HDNode from './HDNode';
// import Transaction from './Transaction';
import TransactionBuilder from './TransactionBuilder';
import ECPair from './ECPair';
import Script from './Script';

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
    this.Address = new Address();
    this.HDNode = new HDNode();
    this.Util = new Util(config, this.BitboxHTTP);
    this.Blockchain = new Blockchain(config, this.BitboxHTTP);
    this.Control = new Control(config, this.BitboxHTTP);
    this.Generating = new Generating(config, this.BitboxHTTP);
    this.Mining = new Mining(config, this.BitboxHTTP);
    this.Network = new Network(config, this.BitboxHTTP);
    this.RawTransactions = new RawTransactions(config, this.BitboxHTTP);
    this.Wallet = new Wallet(config, this.BitboxHTTP);
    // this.Transaction = Transaction;
    this.TransactionBuilder = TransactionBuilder;
    this.Script = new Script();
    this.ECPair = ECPair;
  }
  //
  // walletlock() {
  //   // removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.
  //   //
  //   // Parameters: none
  //   //
  //   // Result—null on success
  //
  //   return this.BitboxHTTP({
  //     method: 'post',
  //     auth: {
  //       username: this.config.username,
  //       password: this.config.password
  //     },
  //     data: {
  //       jsonrpc: "1.0",
  //       id:"walletlock",
  //       method: "walletlock",
  //       params: []
  //     }
  //   })
  //   .then((response) => {
  //     return response.data.result;
  //   })
  //   .catch(error => {
  //     return Error(error.response.data.error.message);
  //   });
  // }
  //
  // walletpassphrase(passphrase, seconds) {
  //   // stores the wallet decryption key in memory for the indicated number of seconds. Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock time that overrides the old one.
  //
  //   //Parameter #1—the passphrase
  //
  //   // Parameter #2—the number of seconds to leave the wallet unlocked
  //
  //   // Result—null on success
  //   let params = [];
  //   if(passphrase) {
  //     params.push(passphrase);
  //   }
  //
  //   if(seconds) {
  //     params.push(seconds);
  //   }
  //
  //   return this.BitboxHTTP({
  //     method: 'post',
  //     auth: {
  //       username: this.config.username,
  //       password: this.config.password
  //     },
  //     data: {
  //       jsonrpc: "1.0",
  //       id:"walletpassphrase",
  //       method: "walletpassphrase",
  //       params: params
  //     }
  //   })
  //   .then((response) => {
  //     return response.data.result;
  //   })
  //   .catch(error => {
  //     return Error(error.response.data.error.message);
  //   });
  // }
  //
  // walletpassphrasechange(passphrase, newPassphrase) {
  //   //  changes the wallet passphrase from ‘old passphrase’ to ‘new passphrase’.
  //   // Parameter #1—the current passphrase
  //
  //   // Parameter #2—the new passphrase
  //
  //   // Result—null on success
  //   let params = [];
  //   if(passphrase) {
  //     params.push(passphrase);
  //   }
  //
  //   if(newPassphrase) {
  //     params.push(newPassphrase);
  //   }
  //
  //   return this.BitboxHTTP({
  //     method: 'post',
  //     auth: {
  //       username: this.config.username,
  //       password: this.config.password
  //     },
  //     data: {
  //       jsonrpc: "1.0",
  //       id:"walletpassphrasechange",
  //       method: "walletpassphrasechange",
  //       params: params
  //     }
  //   })
  //   .then((response) => {
  //   })
  //   .catch(error => {
  //     return Error(error.response.data.error.message);
  //   });
  // }
}

export default BITBOXCli;
