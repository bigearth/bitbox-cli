// 3rd party deps
import axios from 'axios';
import Bitcoin from 'bitcoincashjs-lib';

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

export class BITBOXCli {
    
  restURL:string;
  Address:string;
  BitcoinCash:string;
  Block:string;
  Blockchain:string;
  Control:string;
  Generating:string;
  Mining:string;

  Crypto:Crypto;
  ECPair:ECPair;
  HDNode:HDNode;
  Mnemonic:Mnemonic;
  Network: Network;
  RawTransactions:RawTransactions;
  Script:Script;
  Transaction: Transaction;
  TransactionBuilder:TransactionBuilder;
  Util:Util;
  
  constructor(config:Object);
    
}
