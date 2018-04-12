import Bitcoin from 'bitcoinjs-lib';
import opcodes from 'bitcoin-ops';

class Script {
  constructor() {
    this.opcodes = opcodes;
    this.nullData = Bitcoin.script.nullData;
    this.multisig = Bitcoin.script.multisig;
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

export default Script;
