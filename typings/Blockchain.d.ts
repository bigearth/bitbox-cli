import { BlockDetails } from './Block';

export declare interface Blockchain {
  //constructor(restURL:string);
  getBestBlockHash(): Promise<string>;
  getBlock(blockhash: string, verbose?: boolean):Promise<BlockDetails>;
  getBlockchainInfo(): Promise<BlockchainInfo>;
  getBlockCount(): Promise<number>;
  getBlockHash(height: number): Promise<string>;
  getBlockHeader(hash: string, verbose?: boolean): Promise<BlockHeader>;
  getChainTips(): Promise<ChainTip[]>;
  getDifficulty(): Promise<number>;
  getMempoolAncestors(txid: string, verbose?: boolean): Promise<any>;
  getMempoolDescendants(txid: string, verbose?: boolean): Promise<any>;
  getMempoolEntry(txid:string): Promise<any>;
  getMempoolInfo(): Promise<MempoolInfo>;
  getRawMempool(verbose?:boolean): Promise<any>;
  getTxOut(txid:string, n:number, include_mempool?: boolean): Promise<any>;
  getTxOutProof(txids:string, blockhash:string): Promise<string>;
  preciousBlock(blockhash:string): Promise<any>;
  pruneBlockchain(height:number): Promise<number>;
  verifyChain(checklevel?:number, nblocks?:number): Promise<boolean>;
  verifyTxOutProof(proof:string): Promise<string[]>;
}

declare interface MempoolInfo {
  size: number;
  bytes: number;
  usage: number;
  maxmempool: number;
  mempoolminfee: number;
}

declare interface BlockchainInfo {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  chainwork: string;
  pruned: boolean;
  softforks: object[]
  bip9_softforks: object;
}

declare interface BlockHeader {
  hash: string;
  confirmations: number;
  height: number;
  version: number;
	versionHex: string;
	merkleroot: string;
	time: number;
	mediantime: number;
	nonce: number;
	bits: string;
	difficulty: number;
	chainwork: string;
	previousblockhash: string;
	nextblockhash: string;
}

declare interface ChainTip {
  height:number;
  hash: string;
  branchlen: number;
  status: string;
}

//declare interface RawMempoolTxn {

    // [  {'2ae541af20db6f2b50410f418af56e349d08877d685f6cf54df54658e892db7a':
  //  { size: 237,
  //    fee: 0.00000238,
  //    modifiedfee: 0.00000238,
  //    time: 1525732015,
  //    height: 529235,
  //    startingpriority: 0,
  //    currentpriority: 0,
  //    descendantcount: 10,
  //    descendantsize: 2376,
  //    descendantfees: 2380,
  //    ancestorcount: 3,
  //    ancestorsize: 712,
  //    ancestorfees: 714,
  //    depends:
  //     [ 'e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e' ] },]
//}