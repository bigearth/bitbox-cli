// 3rd party deps
import axios from 'axios';
import Bitcoin from 'bitcoinjs-lib';

// local deps
import BitcoinCash from './BitcoinCash';
import Crypto from './Crypto';
import Util from './Util';
import Block from './Block';
import Blockchain from './Blockchain';
import Control from './Control';
import Generating from './Generating';
import Mining from './Mining';
import Network from './Network';
import RawTransactions from './RawTransactions';
import Mnemonic from './Mnemonic';
import Address from './Address';
import HDNode from './HDNode';
import Transaction from './Transaction';
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
        port: '',
        test: true
      };
    }

    this.config = config;
    this.baseURL = '/';
    if(this.config.corsproxy && this.config.corsproxy === 'local' && !this.config.test) {
      this.baseURL = `${config.protocol}://localhost:1337/${config.host}:${config.port}/`;
    } else if(this.config.corsproxy && this.config.corsproxy === 'remote' && !this.config.test) {
      this.baseURL = `${config.protocol}://proxy.bitbox.earth/${config.host}:${config.port}/`;
    } else if(!this.config.test) {
      this.baseURL = `${config.protocol}://${config.host}:${config.port}/`;
    }

    this.BitcoinCash = new BitcoinCash();
    this.Crypto = Crypto;
    this.Mnemonic = new Mnemonic();
    this.Address = new Address();
    this.HDNode = new HDNode();
    this.Util = new Util(config, this.baseURL);
    this.Block = Block;
    this.Blockchain = new Blockchain(config, this.baseURL);
    this.Control = new Control(config, this.baseURL);
    this.Generating = new Generating(config, this.baseURL);
    this.Mining = new Mining(config, this.baseURL);
    this.Network = new Network(config, this.baseURL);
    this.RawTransactions = new RawTransactions(config, this.baseURL);
    this.Transaction = Transaction;
    this.TransactionBuilder = TransactionBuilder;
    this.Script = new Script();
    this.ECPair = ECPair;
  }
}

export default BITBOXCli;
