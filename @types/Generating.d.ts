import axios from 'axios';
export default class Generating {
  constructor(restURL:string);

  generateToAddress(blocks:number, address:string, maxtries:number):string;
}