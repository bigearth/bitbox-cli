const Bitcoin = require("bitcoincashjs-lib")
const opcodes = require("bitcoincash-ops")

export class Script {
  opcodes: any
  nullData: any
  multisig: any
  pubKey: any
  pubKeyHash: any
  scriptHash: any
  constructor() {
    this.opcodes = opcodes
    this.nullData = Bitcoin.script.nullData
    this.multisig = {
      input: {
        encode: (signatures: any) => {
          const sigs: any[] = []
          signatures.forEach((sig: any) => {
            sigs.push(sig)
          })
          return Bitcoin.script.multisig.input.encode(sigs)
        },
        decode: Bitcoin.script.multisig.input.decode,
        check: Bitcoin.script.multisig.input.check
      },
      output: {
        encode: (m: any, pubKeys: any) => {
          const pks: any[] = []
          pubKeys.forEach((pubKey: any) => {
            pks.push(pubKey)
          })
          return Bitcoin.script.multisig.output.encode(m, pks)
        },
        decode: Bitcoin.script.multisig.output.decode,
        check: Bitcoin.script.multisig.output.check
      }
    }
    this.pubKey = Bitcoin.script.pubKey
    this.pubKeyHash = Bitcoin.script.pubKeyHash
    this.scriptHash = Bitcoin.script.scriptHash
  }

  classifyInput(script: any): string {
    return Bitcoin.script.classifyInput(script)
  }

  classifyOutput(script: any): string {
    return Bitcoin.script.classifyOutput(script)
  }

  decode(scriptBuffer: any): any[] {
    return Bitcoin.script.decompile(scriptBuffer)
  }

  encode(scriptChunks: any): any {
    const arr: any[] = []
    scriptChunks.forEach((chunk: any) => {
      arr.push(chunk)
    })
    return Bitcoin.script.compile(arr)
  }

  toASM(buffer: any): any {
    return Bitcoin.script.toASM(buffer)
  }

  fromASM(asm: any): any {
    return Bitcoin.script.fromASM(asm)
  }
}
