import Bitcoin from 'bitcoinjs-lib';
import opcodes from 'bitcoin-ops';

class Script {
  constructor() {
    this.opcodes = opcodes;
  }

  decompile(scriptBuffer) {
    return Bitcoin.script.decompile(scriptBuffer);
  }

  compile(scriptChunks) {
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
