import axios from 'axios';
export default class Blockchain {
  constructor(restURL:string);
  getBestBlockHash():any;

  getBlock(blockhash:string, verbose?:boolean):any; 

  getBlockchainInfo():any;

  getBlockCount() :any;

  getBlockHash(height:number):any;

  getBlockHeader(hash:string, verbose?:boolean):any;

  getChainTips():any;

  getDifficulty():any;

  getMempoolAncestors(txid:string, verbose?:boolean):any;

  getMempoolDescendants(txid:string, verbose?:boolean):any;

  getMempoolEntry(txid:string):any;

  getMempoolInfo():any;
  getRawMempool(verbose?:boolean):any;
  getTxOut(txid:string, n:number, include_mempool?:boolean):any;
  getTxOutProof(txids:string, blockhash:string):any;
  preciousBlock(blockhash:string):any;
  pruneBlockchain(height:number):any;

  verifyChain(checklevel?:number, nblocks?:number):any;
  verifyTxOutProof(proof:string):any;
}


