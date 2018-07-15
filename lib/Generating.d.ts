export declare interface Generating {
  //constructor(restURL:string);
  generateToAddress(blocks:number, address:string, maxtries:number):Promise<any[]>;
}