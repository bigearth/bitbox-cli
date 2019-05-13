// imports
import * as assert from "assert";
import { BITBOX } from "../../lib/BITBOX"
import { Script } from "../../lib/Script"
import * as bcl from "bitcoincashjs-lib"

// consts
const bitbox: BITBOX = new BITBOX()

// TODO: port from require to import syntax
const fixtures = require("./fixtures/Script.json")

describe("#Script", (): void => {
  describe("#ScriptConstructor", (): void => {
    it("should create instance of Script", (): void => {
      const script: Script = new Script()
      assert.equal(script instanceof Script, true)
    })
  })

  describe("#decode", (): void => {
    describe("P2PKH scriptSig", (): void => {
      fixtures.decodeScriptSig.forEach((fixture: any): void => {
        it(`should decode scriptSig buffer`, (): void => {
          const decodedScriptSig: any[] = bitbox.Script.decode(
            Buffer.from(fixture.scriptSigHex, "hex")
          )
          assert.equal(typeof decodedScriptSig, "object")
        })

        it(`should decode scriptSig buffer to cash address ${
          fixture.cashAddress
          }`, (): void => {
            const decodedScriptSig: any[] = bitbox.Script.decode(
              Buffer.from(fixture.scriptSigHex, "hex")
            )
            const address: string = bitbox.HDNode.toCashAddress(
              bitbox.ECPair.fromPublicKey(decodedScriptSig[1])
            )
            assert.equal(address, fixture.cashAddress)
          })

        it(`should decode scriptSig buffer to legacy address ${
          fixture.legacyAddress
          }`, (): void => {
            const decodedScriptSig: any[] = bitbox.Script.decode(
              Buffer.from(fixture.scriptSigHex, "hex")
            )
            const address: string = bitbox.HDNode.toLegacyAddress(
              bitbox.ECPair.fromPublicKey(decodedScriptSig[1])
            )
            assert.equal(address, fixture.legacyAddress)
          })
      })
    })

    describe("P2PKH scriptPubKey", (): void => {
      fixtures.decodeScriptPubKey.forEach((fixture: any): void => {
        it(`should decode scriptSig buffer`, (): void => {
          const decodedScriptPubKey: any[] = bitbox.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, "hex")
          )
          assert.equal(decodedScriptPubKey.length, 5)
        })

        it(`should match hashed pubKey ${fixture.pubKeyHex}`, (): void => {
          const decodedScriptPubKey: any[] = bitbox.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, "hex")
          )
          const data: Buffer = Buffer.from(fixture.pubKeyHex, "hex")
          const hash160: Buffer = bitbox.Crypto.hash160(data)
          assert.equal(decodedScriptPubKey[2].toString("hex"), hash160.toString("hex"))
        })
      })
    })
  })

  describe("#encode", (): void => {
    describe("P2PKH scriptSig", (): void => {
      fixtures.encodeScriptSig.forEach((fixture: any): void => {
        it(`should encode scriptSig chunks to buffer`, (): void => {
          const arr: Buffer[] = [
            Buffer.from(fixture.scriptSigChunks[0], "hex"),
            Buffer.from(fixture.scriptSigChunks[1], "hex")
          ]
          const encodedScriptSig: any = bitbox.Script.encode(arr)
          assert.equal(typeof encodedScriptSig, "object")
        })
      })
    })

    describe("P2PKH scriptPubKey", (): void => {
      fixtures.encodeScriptPubKey.forEach((fixture: any): void => {
        it(`should encode scriptPubKey buffer`, (): void => {
          const decodedScriptPubKey: any[] = bitbox.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, "hex")
          )
          const compiledScriptPubKey: any = bitbox.Script.encode(decodedScriptPubKey)
          assert.equal(
            compiledScriptPubKey.toString("hex"),
            fixture.scriptPubKeyHex
          )
        })
      })
    })
  })

  describe("#toASM", (): void => {
    describe("P2PKH scriptSig", (): void => {
      fixtures.scriptSigToASM.forEach((fixture: any): void => {
        it(`should encode scriptSig buffer to ${fixture.asm}`, (): void => {
          const arr: Buffer[] = [
            Buffer.from(fixture.scriptSigChunks[0], "hex"),
            Buffer.from(fixture.scriptSigChunks[1], "hex")
          ]
          const compiledScriptSig: any = bitbox.Script.encode(arr)
          const asm: string = bitbox.Script.toASM(compiledScriptSig)
          assert.equal(asm, fixture.asm)
        })
      })
    })

    describe("P2PKH scriptPubKey", (): void => {
      fixtures.scriptPubKeyToASM.forEach((fixture: any): void => {
        it(`should compile scriptPubKey buffer to ${fixture.asm}`, (): void => {
          const asm: string = bitbox.Script.toASM(
            Buffer.from(fixture.scriptPubKeyHex, "hex")
          )
          assert.equal(asm, fixture.asm)
        })
      })
    })
  })

  describe("#fromASM", (): void => {
    describe("P2PKH scriptSig", (): void => {
      fixtures.scriptSigFromASM.forEach((fixture: any): void => {
        it(`should decode scriptSig asm to buffer`, (): void => {
          const buf: Buffer = bitbox.Script.fromASM(fixture.asm)
          assert.equal(typeof buf, "object")
        })
      })
    })

    describe("P2PKH scriptPubKey", (): void => {
      fixtures.scriptPubKeyFromASM.forEach((fixture: any): void => {
        it(`should decode scriptPubKey asm to buffer`, (): void => {
          const buf: Buffer = bitbox.Script.fromASM(fixture.asm)
          assert.equal(typeof buf, "object")
        })
      })
    })
  })

  describe("#OPCodes", (): void => {
    for (const opcode in fixtures.opcodes) {
      it(`should have OP Code ${opcode}`, (): void => {
        // @ts-ignore
        assert.equal(bitbox.Script.opcodes[opcode], fixtures.opcodes[opcode])
      })
    }
  })

  describe("#classifyInput", (): void => {
    fixtures.classifyInput.forEach((fixture: any): void => {
      it(`should classify input type ${fixture.type}`, (): void => {
        const type: string = bitbox.Script.classifyInput(
          bitbox.Script.fromASM(fixture.script)
        )
        assert.equal(type, fixture.type)
      })
    })
  })

  describe("#classifyOutput", (): void => {
    fixtures.classifyOutput.forEach((fixture: any): void => {
      it(`should classify ouput type ${fixture.type}`, (): void => {
        const type: string = bitbox.Script.classifyOutput(
          bitbox.Script.fromASM(fixture.script)
        )
        assert.equal(type, fixture.type)
      })
    })
  })

  describe("#nullDataTemplate", (): void => {
    fixtures.nullDataTemplate.forEach((fixture: any): void => {
      it(`should encode nulldata output`, (): void => {
        const buf: Buffer = bitbox.Script.nullData.output.encode(
          Buffer.from(`${fixture.data}`, "ascii")
        )
        assert.equal(buf.toString("hex"), fixture.hex)
      })

      it(`should decode nulldata output`, (): void => {
        const buf: Buffer = bitbox.Script.nullData.output.decode(
          Buffer.from(`${fixture.hex}`, "hex")
        )
        assert.equal(buf.toString("ascii"), fixture.data)
      })

      it(`should confirm correctly formatted nulldata output`, (): void => {
        const buf: Buffer = bitbox.Script.nullData.output.encode(
          Buffer.from(`${fixture.data}`, "ascii")
        )
        const valid: boolean = bitbox.Script.nullData.output.check(buf)
        assert.equal(valid, true)
      })
    })
  })

  describe("#pubKeyTemplate", (): void => {
    describe("#pubKeyInputTemplate", (): void => {
      fixtures.pubKeyInputTemplate.forEach((fixture: any): void => {
        it(`should encode pubKey input`, (): void => {
          const buf: Buffer = bitbox.Script.pubKey.input.encode(
            Buffer.from(fixture.signature, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode pubKey input`, (): void => {
          const buf: Buffer = bitbox.Script.pubKey.input.decode(
            Buffer.from(fixture.hex, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.signature)
        })

        it(`should confirm correctly formatted pubKeyHash input`, (): void => {
          const buf: Buffer = bitbox.Script.pubKey.input.encode(
            Buffer.from(fixture.signature, "hex")
          )
          const valid: boolean = bitbox.Script.pubKey.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe("#pubKeyOutputTemplate", (): void => {
      fixtures.pubKeyOutputTemplate.forEach((fixture: any): void => {
        it(`should encode pubKey output`, (): void => {
          const buf: Buffer = bitbox.Script.pubKey.output.encode(
            Buffer.from(fixture.pubKey, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode pubKey output`, (): void => {
          const buf: Buffer = bitbox.Script.pubKey.output.decode(
            Buffer.from(`${fixture.hex}`, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.pubKey)
        })

        it(`should confirm correctly formatted pubKey output`, (): void => {
          const buf: Buffer = bitbox.Script.pubKey.output.encode(
            Buffer.from(fixture.pubKey, "hex")
          )
          const valid: boolean = bitbox.Script.pubKey.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })

  describe("#pubKeyHashTemplate", (): void => {
    describe("#pubKeyHashInputTemplate", (): void => {
      fixtures.pubKeyHashInputTemplate.forEach((fixture: any): void => {
        it(`should encode pubKeyHash input`, (): void => {
          const buf: Buffer = bitbox.Script.pubKeyHash.input.encode(
            Buffer.from(fixture.signature, "hex"),
            Buffer.from(fixture.pubKey, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode pubKeyHash input signature`, (): void => {
          const buf: {
            signature: Buffer
            pubKey: Buffer
          } = bitbox.Script.pubKeyHash.input.decode(
            Buffer.from(fixture.hex, "hex")
          )
          assert.equal(buf.signature.toString("hex"), fixture.signature)
        })

        it(`should decode pubKeyHash input pubkey`, (): void => {
          const buf: {
            signature: Buffer
            pubKey: Buffer
          } = bitbox.Script.pubKeyHash.input.decode(
            Buffer.from(fixture.hex, "hex")
          )
          console.log(buf)
          assert.equal(buf.pubKey.toString("hex"), fixture.pubKey)
        })

        it(`should confirm correctly formatted pubKeyHash input`, (): void => {
          const buf: Buffer = bitbox.Script.pubKeyHash.input.encode(
            Buffer.from(fixture.signature, "hex"),
            Buffer.from(fixture.pubKey, "hex")
          )
          const valid: boolean = bitbox.Script.pubKeyHash.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe("#pubKeyHashOutputTemplate", (): void => {
      fixtures.pubKeyHashOutputTemplate.forEach((fixture: any): void => {
        const node: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.xpriv)
        const identifier: Buffer = bitbox.HDNode.toIdentifier(node)
        it(`should encode pubKeyHash output`, (): void => {
          const buf: Buffer = bitbox.Script.pubKeyHash.output.encode(identifier)
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode pubKeyHash output`, (): void => {
          const buf: Buffer = bitbox.Script.pubKeyHash.output.decode(
            Buffer.from(`${fixture.hex}`, "hex")
          )
          assert.equal(buf.toString("hex"), identifier.toString("hex"))
        })

        it(`should confirm correctly formatted pubKeyHash output`, (): void => {
          const buf: Buffer = bitbox.Script.pubKeyHash.output.encode(identifier)
          const valid: boolean = bitbox.Script.pubKeyHash.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })

  describe("#multisigTemplate", (): void => {
    describe("#multisigInputTemplate", (): void => {
      fixtures.multisigInputTemplate.forEach((fixture: any): void => {
        it(`should encode multisig input`, (): void => {
          const signatures: any[] = fixture.signatures.map((signature: any) =>
            signature
              ? Buffer.from(signature, "hex")
              : bitbox.Script.opcodes.OP_0
          )

          const buf: Buffer = bitbox.Script.multisig.input.encode(signatures)
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode multisig input`, (): void => {
          const buf: Buffer[] = bitbox.Script.multisig.input.decode(
            Buffer.from(fixture.hex, "hex")
          )
          assert.equal(buf[0].toString("hex"), fixture.signatures[0])
        })

        it(`should confirm correctly formatted multisig input`, (): void => {
          const signatures: any[] = fixture.signatures.map((signature: any) =>
            signature
              ? Buffer.from(signature, "hex")
              : bitbox.Script.opcodes.OP_0
          )

          const buf: Buffer = bitbox.Script.multisig.input.encode(signatures)
          const valid: boolean = bitbox.Script.multisig.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe("#multisigOutputTemplate", (): void => {
      fixtures.multisigOutputTemplate.forEach((fixture: any): void => {
        it(`should encode multisig output`, (): void => {
          const pubKeys: Buffer[] = fixture.pubKeys.map((p: string) => Buffer.from(p, "hex"))
          const m: number = pubKeys.length
          const buf: Buffer = bitbox.Script.multisig.output.encode(m, pubKeys)

          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode multisig output`, (): void => {
          const output: any = bitbox.Script.multisig.output.decode(
            Buffer.from(`${fixture.hex}`, "hex")
          )
          assert.equal(output.m, fixture.pubKeys.length)
        })

        it(`should confirm correctly formatted multisig output`, (): void => {
          const pubKeys: Buffer[] = fixture.pubKeys.map((p: any) => Buffer.from(p, "hex"))
          const m: number = pubKeys.length
          const buf: Buffer = bitbox.Script.multisig.output.encode(m, pubKeys)
          const valid: boolean = bitbox.Script.multisig.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })

  describe("#scriptHashTemplate", (): void => {
    describe("#scriptHashInputTemplate", (): void => {
      fixtures.scriptHashInputTemplate.forEach((fixture: any): void => {
        it(`should encode scriptHash input`, (): void => {
          const buf: Buffer = bitbox.Script.scriptHash.input.encode(
            bitbox.Script.fromASM(fixture.redeemScriptSig),
            bitbox.Script.fromASM(fixture.redeemScript)
          )
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode scriptHash input`, (): void => {
          const redeemScriptSig: any = bitbox.Script.fromASM(fixture.redeemScriptSig)
          const redeemScript: any = bitbox.Script.fromASM(fixture.redeemScript)
          assert.deepEqual(
            bitbox.Script.scriptHash.input.decode(
              Buffer.from(fixture.hex, "hex")
            ),
            {
              redeemScriptSig: redeemScriptSig,
              redeemScript: redeemScript
            }
          )
        })

        it(`should confirm correctly formatted scriptHash input`, (): void => {
          const buf: Buffer = bitbox.Script.scriptHash.input.encode(
            bitbox.Script.fromASM(fixture.redeemScriptSig),
            bitbox.Script.fromASM(fixture.redeemScript)
          )
          const valid: boolean = bitbox.Script.scriptHash.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe("#scriptHashOutputTemplate", (): void => {
      fixtures.scriptHashOutputTemplate.forEach((fixture: any): void => {
        it(`should encode scriptHash output`, (): void => {
          const redeemScript: any = bitbox.Script.fromASM(fixture.output)
          const scriptHash: Buffer = bitbox.Crypto.hash160(redeemScript)
          const buf: Buffer = bitbox.Script.scriptHash.output.encode(scriptHash)

          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode scriptHash output`, (): void => {
          const redeemScript: any = bitbox.Script.fromASM(fixture.output)
          const scriptHash: Buffer = bitbox.Crypto.hash160(redeemScript)
          const buf: Buffer = bitbox.Script.scriptHash.output.decode(
            Buffer.from(`${fixture.hex}`, "hex")
          )
          assert.deepEqual(buf, scriptHash)
        })

        it(`should confirm correctly formatted scriptHash output`, (): void => {
          const redeemScript: any = bitbox.Script.fromASM(fixture.output)
          const scriptHash: Buffer = bitbox.Crypto.hash160(redeemScript)
          const buf: Buffer = bitbox.Script.scriptHash.output.encode(scriptHash)
          const valid: boolean = bitbox.Script.scriptHash.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })
})
