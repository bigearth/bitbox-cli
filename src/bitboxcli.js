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
        protocol: '',
        host: '',
        test: true
      };
    }

    this.config = config;
    this.baseURL = '/';

    if(!this.config.test && this.config.host !== 'localhost') {
      this.baseURL = `${config.protocol}://${config.host}/v1/`;
    } else if(!this.config.test && this.config.host === 'localhost') {
      this.baseURL = `${config.protocol}://${config.host}:8332/`;
    }

    this.restBaseURL = 'https://rest.bitbox.earth/v1/';
    this.Address = new Address(this.restBaseURL);
    this.BitcoinCash = new BitcoinCash();
    this.Block = new Block(this.restBaseURL);
    this.Blockchain = new Blockchain(this.restBaseURL);
    this.Control = new Control(this.restBaseURL);
    this.Crypto = Crypto;
    this.ECPair = ECPair;
    this.Generating = new Generating(this.restBaseURL);
    this.HDNode = new HDNode();
    this.Mining = new Mining(this.restBaseURL);
    this.Mnemonic = new Mnemonic();
    this.Network = new Network(this.restBaseURL);
    this.RawTransactions = new RawTransactions(this.restBaseURL);
    this.Script = new Script();
    this.Transaction = new Transaction(this.restBaseURL);
    this.TransactionBuilder = TransactionBuilder;
    this.Util = new Util(this.restBaseURL);
  }
}

export default BITBOXCli;
