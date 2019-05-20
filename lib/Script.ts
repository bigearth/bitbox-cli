// consts
const Bitcoin = require("bitcoincashjs-lib")
const opcodes = require("bitcoincash-ops")

export interface opcodes {
  OP_FALSE: 0
  OP_0: 0
  OP_PUSHDATA1: 76
  OP_PUSHDATA2: 77
  OP_PUSHDATA4: 78
  OP_1NEGATE: 79
  OP_RESERVED: 80
  OP_TRUE: 81
  OP_1: 81
  OP_2: 82
  OP_3: 83
  OP_4: 84
  OP_5: 85
  OP_6: 86
  OP_7: 87
  OP_8: 88
  OP_9: 89
  OP_10: 90
  OP_11: 91
  OP_12: 92
  OP_13: 93
  OP_14: 94
  OP_15: 95
  OP_16: 96

  OP_NOP: 97
  OP_VER: 98
  OP_IF: 99
  OP_NOTIF: 100
  OP_VERIF: 101
  OP_VERNOTIF: 102
  OP_ELSE: 103
  OP_ENDIF: 104
  OP_VERIFY: 105
  OP_RETURN: 106
  OP_TOALTSTACK: 107
  OP_FROMALTSTACK: 108
  OP_2DROP: 109
  OP_2DUP: 110
  OP_3DUP: 111
  OP_2OVER: 112
  OP_2ROT: 113
  OP_2SWAP: 114
  OP_IFDUP: 115
  OP_DEPTH: 116
  OP_DROP: 117
  OP_DUP: 118
  OP_NIP: 119
  OP_OVER: 120
  OP_PICK: 121
  OP_ROLL: 122
  OP_ROT: 123
  OP_SWAP: 124
  OP_TUCK: 125
  OP_CAT: 126
  OP_SPLIT: 127
  OP_NUM2BIN: 128
  OP_BIN2NUM: 129
  OP_SIZE: 130
  OP_INVERT: 131
  OP_AND: 132
  OP_OR: 133
  OP_XOR: 134
  OP_EQUAL: 135
  OP_EQUALVERIFY: 136
  OP_RESERVED1: 137
  OP_RESERVED2: 138
  OP_1ADD: 139
  OP_1SUB: 140
  OP_2MUL: 141
  OP_2DIV: 142
  OP_NEGATE: 143
  OP_ABS: 144
  OP_NOT: 145
  OP_0NOTEQUAL: 146
  OP_ADD: 147
  OP_SUB: 148
  OP_MUL: 149
  OP_DIV: 150
  OP_MOD: 151
  OP_LSHIFT: 152
  OP_RSHIFT: 153
  OP_BOOLAND: 154
  OP_BOOLOR: 155
  OP_NUMEQUAL: 156
  OP_NUMEQUALVERIFY: 157
  OP_NUMNOTEQUAL: 158
  OP_LESSTHAN: 159
  OP_GREATERTHAN: 160
  OP_LESSTHANOREQUAL: 161
  OP_GREATERTHANOREQUAL: 162
  OP_MIN: 163
  OP_MAX: 164
  OP_WITHIN: 165
  OP_RIPEMD160: 166
  OP_SHA1: 167
  OP_SHA256: 168
  OP_HASH160: 169
  OP_HASH256: 170
  OP_CODESEPARATOR: 171
  OP_CHECKSIG: 172
  OP_CHECKSIGVERIFY: 173
  OP_CHECKMULTISIG: 174
  OP_CHECKMULTISIGVERIFY: 175
  OP_NOP1: 176
  OP_NOP2: 177
  OP_CHECKLOCKTIMEVERIFY: 177
  OP_NOP3: 178
  OP_CHECKSEQUENCEVERIFY: 178
  OP_NOP4: 179
  OP_NOP5: 180
  OP_NOP6: 181
  OP_NOP7: 182
  OP_NOP8: 183
  OP_NOP9: 184
  OP_NOP10: 185
  OP_CHECKDATASIG: 186
  OP_CHECKDATASIGVERIFY: 187
  OP_PUBKEYHASH: 253
  OP_PUBKEY: 254
  OP_INVALIDOPCODE: 255
}

export interface DecodedP2PKHInput {
  signature: Buffer
  pubKey: Buffer
}

export interface DecodedP2MSOutput {
  m: number
  pubKeys: Buffer[]
}

export interface DecodedP2SHInput {
  redeemScript: Buffer
  redeemScriptSig: Buffer
}

export interface nullData {
  output: {
    encode(data: Buffer): Buffer
    decode(output: Buffer): Buffer
    check(output: Buffer): boolean
  }
}

export interface pubKey {
  input:
  {
    encode(signature: Buffer): Buffer
    decode(input: Buffer): Buffer
    check(input: Buffer): boolean
    decodeStack(data: Buffer): Buffer
    encodeStack(data: Buffer): Buffer
  },
  output: {
    encode(pubKey: Buffer): Buffer
    decode(output: Buffer): Buffer
    check(output: Buffer): boolean
  }
}

export interface pubKeyHash {
  input:
  {
    encode(signature: Buffer, pubKey: Buffer): Buffer
    decode(data: Buffer): DecodedP2PKHInput
    check(data: Buffer): boolean
    decodeStack(data: Buffer): Buffer
    encodeStack(data: Buffer): Buffer
  },
  output:
  {
    encode(identifier: Buffer): Buffer
    decode(output: Buffer): Buffer
    check(output: Buffer): boolean
  }
}

export interface multisig {
  input:
  {
    encode(signatures: Buffer[]): Buffer
    decode(input: Buffer): Buffer[]
    check(input: Buffer): boolean
  },
  output:
  {
    encode(m: number, pubKeys: Buffer[]): Buffer
    decode(output: Buffer): DecodedP2MSOutput
    check(output: Buffer): boolean
  }
}

export interface scriptHash {
  input:
  {
    encode(redeemScriptSig: Buffer, redeemScript: Buffer): Buffer
    decode(input: Buffer): DecodedP2SHInput
    check(data: Buffer): boolean
    decodeStack(data: Buffer): Buffer
    encodeStack(data: Buffer): Buffer
  },
  output:
  {
    encode(scriptHash: Buffer): Buffer
    decode(output: Buffer): Buffer
    check(output: Buffer): boolean
  }
}

export interface scriptNumber {
  encode(number: number): Buffer
  decode(buffer: Buffer, maxLength?: number, minimal?: boolean): number
}

export class Script {
  public opcodes: opcodes
  public nullData: nullData
  public pubKey: pubKey
  public pubKeyHash: pubKeyHash
  public multisig: multisig
  public scriptHash: scriptHash
  public number: scriptNumber

  constructor() {
    this.opcodes = opcodes
    this.nullData = Bitcoin.script.nullData
    this.multisig = {
      input: {
        encode: (signatures: Buffer[]): Buffer => {
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
        encode: (m: number, pubKeys: Buffer[]): Buffer => {
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
    this.number = Bitcoin.script.number
  }

  public encode(scriptChunks: Array<number | Buffer>): Buffer {
    const arr: Array<number | Buffer> = []
    scriptChunks.forEach((chunk: number | Buffer) => {
      arr.push(chunk)
    })
    return Bitcoin.script.compile(arr)
  }

  public decode(scriptBuffer: Buffer): Array<number | Buffer> {
    return Bitcoin.script.decompile(scriptBuffer)
  }

  public toASM(buffer: Buffer): string {
    return Bitcoin.script.toASM(buffer)
  }

  public fromASM(asm: string): Buffer {
    return Bitcoin.script.fromASM(asm)
  }

  public classifyInput(script: Buffer): string {
    return Bitcoin.script.classifyInput(script)
  }

  public classifyOutput(script: Buffer): string {
    return Bitcoin.script.classifyOutput(script)
  }

  public encodeNullDataOutput(data: Buffer): Buffer {
    return this.nullData.output.encode(data)
  }

  public decodeNullDataOutput(output: Buffer): Buffer {
    return this.nullData.output.decode(output)
  }

  public checkNullDataOutput(output: Buffer): boolean {
    return this.nullData.output.check(output)
  }

  public encodeP2PKInput(signature: Buffer): Buffer {
    return this.pubKey.input.encode(signature)
  }

  public decodeP2PKInput(input: Buffer): Buffer {
    return this.pubKey.input.decode(input)
  }

  public checkP2PKInput(input: Buffer): boolean {
    return this.pubKey.input.check(input)
  }

  public encodeP2PKOutput(pubKey: Buffer): Buffer {
    return this.pubKey.output.encode(pubKey)
  }

  public decodeP2PKOutput(output: Buffer): Buffer {
    return this.pubKey.output.decode(output)
  }

  public checkP2PKOutput(output: Buffer): boolean {
    return this.pubKey.output.check(output);
  }

  public encodeP2PKHInput(signature: Buffer, pubKey: Buffer): Buffer {
    return this.pubKeyHash.input.encode(signature, pubKey)
  }

  public decodeP2PKHInput(input: Buffer): DecodedP2PKHInput {
    return this.pubKeyHash.input.decode(input)
  }

  public checkP2PKHInput(input: Buffer): boolean {
    return this.pubKeyHash.input.check(input)
  }

  public encodeP2PKHOutput(identifier: Buffer): Buffer {
    return this.pubKeyHash.output.encode(identifier)
  }

  public decodeP2PKHOutput(output: Buffer): Buffer {
    return this.pubKeyHash.output.decode(output)
  }

  public checkP2PKHOutput(output: Buffer): boolean {
    return this.pubKeyHash.output.check(output);
  }

  public encodeP2MSInput(signatures: Buffer[]): Buffer {
    return this.multisig.input.encode(signatures)
  }

  public decodeP2MSInput(input: Buffer): Buffer[] {
    return this.multisig.input.decode(input);
  }

  public checkP2MSInput(input: Buffer): boolean {
    return this.multisig.input.check(input)
  }

  public encodeP2MSOutput(m: number, pubKeys: Buffer[]): Buffer {
    return this.multisig.output.encode(m, pubKeys)
  }

  public decodeP2MSOutput(output: Buffer): DecodedP2MSOutput {
    return this.multisig.output.decode(output)
  }

  public checkP2MSOutput(output: Buffer): boolean {
    return this.multisig.output.check(output);
  }

  public encodeP2SHInput(redeemScriptSig: Buffer, redeemScript: Buffer): Buffer {
    return this.scriptHash.input.encode(redeemScriptSig, redeemScript)
  }

  public decodeP2SHInput(input: Buffer): DecodedP2SHInput {
    return this.scriptHash.input.decode(input)
  }

  public checkP2SHInput(input: Buffer): boolean {
    return this.scriptHash.input.check(input);
  }

  public encodeP2SHOutput(scriptHash: Buffer): Buffer {
    return this.scriptHash.output.encode(scriptHash)
  }

  public decodeP2SHOutput(output: Buffer): Buffer {
    return this.scriptHash.output.decode(output);
  }

  public checkP2SHOutput(output: Buffer): boolean {
    return this.scriptHash.output.check(output)
  }
}
