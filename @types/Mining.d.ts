import axios from 'axios';
import { Interface } from 'mocha';
export default class Mining {
  constructor(restURL:string);

  getBlockTemplate(template_request:Interface):any;

  getMiningInfo():any;

  getNetworkHashps(nblocks:number, height:number):any;

  submitBlock(hex:string, parameters:string):any;
}