export declare class Generating {
  constructor(restURL:string);
  generateToAddress(blocks:number, address:string, maxtries:number):Promise<any[]>;
}