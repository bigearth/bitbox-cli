import Bitcoin from 'bitcoinjs-lib';

class Script {
  static decompileBuffer(scriptBuffer) {
    return Bitcoin.script.decompile(scriptBuffer);
  }

  static decompileHex(scriptHex) {
    return Bitcoin.script.decompile(Buffer.from(scriptHex, 'hex'));
  }

  static compileBuffer(scriptChunks) {
    return Bitcoin.script.compile(scriptChunks);
  }

  static compileHex(scriptChunks) {
    return Bitcoin.script.compile(scriptChunks).toString('hex');
  }

  static bufferToASM(buffer) {
    return Bitcoin.script.toASM(buffer);
  }

  static hexToASM(hex) {
    return Bitcoin.script.toASM(Buffer.from(hex, 'hex'));
  }

  static bufferFromASM(asm) {
    return Bitcoin.script.fromASM(asm);
  }

  static hexFromASM(asm) {
    return Bitcoin.script.fromASM(asm).toString('hex');
  }
}

export default Script;
