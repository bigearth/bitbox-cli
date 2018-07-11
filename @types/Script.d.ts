import Bitcoin from 'bitcoincashjs-lib';
import opcodes from 'bitcoin-ops';

export default class Script {
  
    opcodes: opcodes; 
    nullData: null;

  constructor() {
    this.opcodes = opcodes;
    this.nullData = Bitcoin.script.nullData;
    this.multisig = {
      input: {
        encode: (signatures) => {
          let sigs = [];
          signatures.forEach((sig) => {
            sigs.push(sig);
          })
          return Bitcoin.script.multisig.input.encode(sigs)
        },
        decode: Bitcoin.script.multisig.input.decode,
        check: Bitcoin.script.multisig.input.check,
      },
      output: {
        encode: (m, pubKeys) => {
          let pks = [];
          pubKeys.forEach((pubKey) => {
            pks.push(pubKey);
          })
          return Bitcoin.script.multisig.output.encode(m, pks);
        },
        decode: Bitcoin.script.multisig.output.decode,
        check: Bitcoin.script.multisig.output.check,
      }
    };
    this.pubKey = Bitcoin.script.pubKey;
    this.pubKeyHash = Bitcoin.script.pubKeyHash;
    this.scriptHash = Bitcoin.script.scriptHash;
  }

  classifyInput(script) {
    return Bitcoin.script.classifyInput(script);
  }

  classifyOutput(script) {
    return Bitcoin.script.classifyOutput(script);
  }

  decode(scriptBuffer) {
    return Bitcoin.script.decompile(scriptBuffer);
  }

  encode(scriptChunks) {
    let arr = [];
    scriptChunks.forEach((chunk) => {
      arr.push(chunk);
    });
    return Bitcoin.script.compile(arr);
  }

  toASM(buffer) {
    return Bitcoin.script.toASM(buffer);
  }

  fromASM(asm) {
    return Bitcoin.script.fromASM(asm);
  }
}


