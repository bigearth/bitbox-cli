export declare interface Control {
  //constructor(restURL:string);
  getInfo(): Promise<NodeInfo>;
  getMemoryInfo():Promise<NodeMemoryInfo>; 
}

declare interface NodeInfo {
  version: number;
  protocolversion: number;
  blocks: number;
  timeoffset: number;
  connections: number;
  proxy: string;
  difficulty: number;
  testnet: boolean;
  paytxfee: number;
  relayfee: number;
  errors: string;
}

declare interface NodeMemoryInfo {
  locked: { 
    used: number, 
    free: number, 
    total: number, 
    locked: number, 
    chunks_used: number, 
    chunks_free: number 
  }
}