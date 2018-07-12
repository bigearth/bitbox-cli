import Bitcoin from 'bitcoincashjs-lib';
import opcodes from 'bitcoin-ops';

export default class Script {
  
    opcodes: opcodes; 
    nullData: null;
    multisig: string;
    pubKey:string;
    pubKeyHash:string;
    scriptHash: string;

  constructor();

  classifyInput(script:any):any;

  classifyOutput(script:any):any;

  decode(scriptBuffer:any):any;

  encode(scriptChunks:any):Buffer;

  toASM(buffer:any):any;

  fromASM(asm:any):Buffer;
}


