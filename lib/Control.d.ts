export declare class Control {
  constructor(restURL:string);
  getInfo(): Promise<NodeInfo>;
  getMemoryInfo():Promise<NodeMemoryInfo>; 
}

declare class NodeInfo {
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

declare class NodeMemoryInfo {
  locked: { 
    used: number, 
    free: number, 
    total: number, 
    locked: number, 
    chunks_used: number, 
    chunks_free: number 
  }
}