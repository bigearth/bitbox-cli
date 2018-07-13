export declare class Mining {
  constructor(restURL:string);
  getBlockTemplate(template_request?:any):Promise<any>;
  getMiningInfo():Promise<any>;
  getNetworkHashps(nblocks?:number, height?:number):Promise<any>;
  submitBlock(hex:string, parameters?:string):Promise<any>;
}