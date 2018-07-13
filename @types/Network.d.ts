export declare class Network {
  constructor(restURL:string);
  //addNode(node:string, command:string):any;
  //clearBanned():any;
  //disconnectNode(configuration:object):any; 
  //getAddedNodeInfo(node?:string):any;
  getConnectionCount():Promise<number>;
  getNetTotals():Promise<object>;
  getNetworkInfo():Promise<object>;
  getPeerInfo():Promise<object>;
  ping():Promise<any>;
}