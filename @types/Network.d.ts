import axios from 'axios';
export default class Network {
  constructor(restURL:string);

  addNode(node:string, command:string):any;

  clearBanned():any;

  disconnectNode(configuration:object):any; 

  getAddedNodeInfo(node?:string):any;

  getConnectionCount():any;

  getNetTotals():any;

  getNetworkInfo():any;

  getPeerInfo():any;
  

  ping():any;
  
}