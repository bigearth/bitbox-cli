import Bitcoin from 'bitcoinjs-lib';

class Script {
  static decompileBuffer(scriptBuffer) {
    return Bitcoin.script.decompile(scriptBuffer);
  }

  static decompileHex(scriptHex) {
    return Bitcoin.script.decompile(Buffer.from(scriptHex, 'hex'));
  }

  static bufferToASM(buffer) {
    return Bitcoin.script.toASM(buffer);
  }

  static hexToASM(hex) {
    return Bitcoin.script.toASM(Buffer.from(hex, 'hex'));
  }
}

export default Script;
