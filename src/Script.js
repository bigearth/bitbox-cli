import Bitcoin from 'bitcoinjs-lib';
import opcodes from 'bitcoin-ops';

class Script {
  constructor() {
    this.opcodes = opcodes;
  }

  decompileBuffer(scriptBuffer) {
    return Bitcoin.script.decompile(scriptBuffer);
  }

  decompileHex(scriptHex) {
    return Bitcoin.script.decompile(Buffer.from(scriptHex, 'hex'));
  }

  compileBuffer(scriptChunks) {
    let arr = [];
    scriptChunks.forEach((chunk) => {
      arr.push(chunk);
    });
    return Bitcoin.script.compile(arr);
  }

  compileHex(scriptChunks) {
    return Bitcoin.script.compile(scriptChunks).toString('hex');
  }

  bufferToASM(buffer) {
    return Bitcoin.script.toASM(buffer);
  }

  hexToASM(hex) {
    return Bitcoin.script.toASM(Buffer.from(hex, 'hex'));
  }

  bufferFromASM(asm) {
    return Bitcoin.script.fromASM(asm);
  }

  hexFromASM(asm) {
    return Bitcoin.script.fromASM(asm).toString('hex');
  }
}

export default Script;
