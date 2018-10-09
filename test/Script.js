"use strict"
const fixtures = require("./fixtures/Script.json")
const chai = require("chai")
const assert = require("assert")
const BITBOXCli = require("./../lib/bitbox-sdk").default
const BITBOX = new BITBOXCli()
const Buffer = require("safe-buffer").Buffer

describe("#Script", () => {
  describe("#decode", () => {
    describe("P2PKH scriptSig", () => {
      fixtures.decodeScriptSig.forEach(fixture => {
        it(`should decode scriptSig buffer`, () => {
          const decodedScriptSig = BITBOX.Script.decode(
            Buffer.from(fixture.scriptSigHex, "hex")
          )
          assert.equal(typeof decodedScriptSig, "object")
        })

        it(`should decode scriptSig buffer to cash address ${
          fixture.cashAddress
        }`, () => {
          const decodedScriptSig = BITBOX.Script.decode(
            Buffer.from(fixture.scriptSigHex, "hex")
          )
          const address = BITBOX.HDNode.toCashAddress(
            BITBOX.ECPair.fromPublicKey(decodedScriptSig[1])
          )
          assert.equal(address, fixture.cashAddress)
        })

        it(`should decode scriptSig buffer to legacy address ${
          fixture.legacyAddress
        }`, () => {
          const decodedScriptSig = BITBOX.Script.decode(
            Buffer.from(fixture.scriptSigHex, "hex")
          )
          const address = BITBOX.HDNode.toLegacyAddress(
            BITBOX.ECPair.fromPublicKey(decodedScriptSig[1])
          )
          assert.equal(address, fixture.legacyAddress)
        })
      })
    })

    describe("P2PKH scriptPubKey", () => {
      fixtures.decodeScriptPubKey.forEach(fixture => {
        it(`should decode scriptSig buffer`, () => {
          const decodedScriptPubKey = BITBOX.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, "hex")
          )
          assert.equal(decodedScriptPubKey.length, 5)
        })

        it(`should match hashed pubKey ${fixture.pubKeyHex}`, () => {
          const decodedScriptPubKey = BITBOX.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, "hex")
          )
          const data = Buffer.from(fixture.pubKeyHex, "hex")
          const hash160 = BITBOX.Crypto.hash160(data).toString("hex")
          assert.equal(decodedScriptPubKey[2].toString("hex"), hash160)
        })
      })
    })
  })

  describe("#encode", () => {
    describe("P2PKH scriptSig", () => {
      fixtures.encodeScriptSig.forEach(fixture => {
        it(`should encode scriptSig chunks to buffer`, () => {
          const arr = [
            Buffer.from(fixture.scriptSigChunks[0], "hex"),
            Buffer.from(fixture.scriptSigChunks[1], "hex")
          ]
          const encodedScriptSig = BITBOX.Script.encode(arr)
          assert.equal(typeof encodedScriptSig, "object")
        })
      })
    })

    describe("P2PKH scriptPubKey", () => {
      fixtures.encodeScriptPubKey.forEach(fixture => {
        it(`should encode scriptPubKey buffer`, () => {
          const decodedScriptPubKey = BITBOX.Script.decode(
            Buffer.from(fixture.scriptPubKeyHex, "hex")
          )
          const compiledScriptPubKey = BITBOX.Script.encode(decodedScriptPubKey)
          assert.equal(
            compiledScriptPubKey.toString("hex"),
            fixture.scriptPubKeyHex
          )
        })
      })
    })
  })

  describe("#toASM", () => {
    describe("P2PKH scriptSig", () => {
      fixtures.scriptSigToASM.forEach(fixture => {
        it(`should encode scriptSig buffer to ${fixture.asm}`, () => {
          const arr = [
            Buffer.from(fixture.scriptSigChunks[0], "hex"),
            Buffer.from(fixture.scriptSigChunks[1], "hex")
          ]
          const compiledScriptSig = BITBOX.Script.encode(arr)
          const asm = BITBOX.Script.toASM(compiledScriptSig)
          assert.equal(asm, fixture.asm)
        })
      })
    })

    describe("P2PKH scriptPubKey", () => {
      fixtures.scriptPubKeyToASM.forEach(fixture => {
        it(`should compile scriptPubKey buffer to ${fixture.asm}`, () => {
          const asm = BITBOX.Script.toASM(
            Buffer.from(fixture.scriptPubKeyHex, "hex")
          )
          assert.equal(asm, fixture.asm)
        })
      })
    })
  })

  describe("#fromASM", () => {
    describe("P2PKH scriptSig", () => {
      fixtures.scriptSigFromASM.forEach(fixture => {
        it(`should decode scriptSig asm to buffer`, () => {
          const buf = BITBOX.Script.fromASM(fixture.asm)
          assert.equal(typeof buf, "object")
        })
      })
    })

    describe("P2PKH scriptPubKey", () => {
      fixtures.scriptPubKeyFromASM.forEach(fixture => {
        it(`should decode scriptPubKey asm to buffer`, () => {
          const buf = BITBOX.Script.fromASM(fixture.asm)
          assert.equal(typeof buf, "object")
        })
      })
    })
  })

  describe("#OPCodes", () => {
    for (const opcode in fixtures.opcodes) {
      it(`should have OP Code ${opcode}`, () => {
        assert.equal(BITBOX.Script.opcodes[opcode], fixtures.opcodes[opcode])
      })
    }
  })

  describe("#classifyInput", () => {
    fixtures.classifyInput.forEach(fixture => {
      it(`should classify input type ${fixture.type}`, () => {
        const type = BITBOX.Script.classifyInput(
          BITBOX.Script.fromASM(fixture.script)
        )
        assert.equal(type, fixture.type)
      })
    })
  })

  describe("#classifyOutput", () => {
    fixtures.classifyOutput.forEach(fixture => {
      it(`should classify ouput type ${fixture.type}`, () => {
        const type = BITBOX.Script.classifyOutput(
          BITBOX.Script.fromASM(fixture.script)
        )
        assert.equal(type, fixture.type)
      })
    })
  })

  describe("#nullDataTemplate", () => {
    fixtures.nullDataTemplate.forEach(fixture => {
      it(`should encode nulldata output`, () => {
        const buf = BITBOX.Script.nullData.output.encode(
          Buffer.from(`${fixture.data}`, "ascii")
        )
        assert.equal(buf.toString("hex"), fixture.hex)
      })

      it(`should decode nulldata output`, () => {
        const buf = BITBOX.Script.nullData.output.decode(
          Buffer.from(`${fixture.hex}`, "hex")
        )
        assert.equal(buf.toString("ascii"), fixture.data)
      })

      it(`should confirm correctly formatted nulldata output`, () => {
        const buf = BITBOX.Script.nullData.output.encode(
          Buffer.from(`${fixture.data}`, "ascii")
        )
        const valid = BITBOX.Script.nullData.output.check(buf)
        assert.equal(valid, true)
      })
    })
  })

  describe("#pubKeyTemplate", () => {
    describe("#pubKeyInputTemplate", () => {
      fixtures.pubKeyInputTemplate.forEach(fixture => {
        it(`should encode pubKey input`, () => {
          const buf = BITBOX.Script.pubKey.input.encode(
            Buffer.from(fixture.signature, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode pubKey input`, () => {
          const buf = BITBOX.Script.pubKey.input.decode(
            Buffer.from(fixture.hex, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.signature)
        })

        it(`should confirm correctly formatted pubKeyHash input`, () => {
          const buf = BITBOX.Script.pubKey.input.encode(
            Buffer.from(fixture.signature, "hex")
          )
          const valid = BITBOX.Script.pubKey.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe("#pubKeyOutputTemplate", () => {
      fixtures.pubKeyOutputTemplate.forEach(fixture => {
        it(`should encode pubKey output`, () => {
          const buf = BITBOX.Script.pubKey.output.encode(
            Buffer.from(fixture.pubKey, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode pubKey output`, () => {
          const buf = BITBOX.Script.pubKey.output.decode(
            Buffer.from(`${fixture.hex}`, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.pubKey)
        })

        it(`should confirm correctly formatted pubKey output`, () => {
          const buf = BITBOX.Script.pubKey.output.encode(
            Buffer.from(fixture.pubKey, "hex")
          )
          const valid = BITBOX.Script.pubKey.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })

  describe("#pubKeyHashTemplate", () => {
    describe("#pubKeyHashInputTemplate", () => {
      fixtures.pubKeyHashInputTemplate.forEach(fixture => {
        it(`should encode pubKeyHash input`, () => {
          const buf = BITBOX.Script.pubKeyHash.input.encode(
            Buffer.from(fixture.signature, "hex"),
            Buffer.from(fixture.pubKey, "hex")
          )
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode pubKeyHash input signature`, () => {
          const buf = BITBOX.Script.pubKeyHash.input.decode(
            Buffer.from(fixture.hex, "hex")
          )
          assert.equal(buf.signature.toString("hex"), fixture.signature)
        })

        it(`should decode pubKeyHash input pubkey`, () => {
          const buf = BITBOX.Script.pubKeyHash.input.decode(
            Buffer.from(fixture.hex, "hex")
          )
          assert.equal(buf.pubKey.toString("hex"), fixture.pubKey)
        })

        it(`should confirm correctly formatted pubKeyHash input`, () => {
          const buf = BITBOX.Script.pubKeyHash.input.encode(
            Buffer.from(fixture.signature, "hex"),
            Buffer.from(fixture.pubKey, "hex")
          )
          const valid = BITBOX.Script.pubKeyHash.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe("#pubKeyHashOutputTemplate", () => {
      fixtures.pubKeyHashOutputTemplate.forEach(fixture => {
        const node = BITBOX.HDNode.fromXPriv(fixture.xpriv)
        const identifier = BITBOX.HDNode.toIdentifier(node)
        it(`should encode pubKeyHash output`, () => {
          const buf = BITBOX.Script.pubKeyHash.output.encode(identifier)
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode pubKeyHash output`, () => {
          const buf = BITBOX.Script.pubKeyHash.output.decode(
            Buffer.from(`${fixture.hex}`, "hex")
          )
          assert.equal(buf.toString("hex"), identifier.toString("hex"))
        })

        it(`should confirm correctly formatted pubKeyHash output`, () => {
          const buf = BITBOX.Script.pubKeyHash.output.encode(identifier)
          const valid = BITBOX.Script.pubKeyHash.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })

  describe("#multisigTemplate", () => {
    describe("#multisigInputTemplate", () => {
      fixtures.multisigInputTemplate.forEach(fixture => {
        it(`should encode multisig input`, () => {
          const signatures = fixture.signatures.map(
            signature =>
              signature
                ? Buffer.from(signature, "hex")
                : BITBOX.Script.opcodes.OP_0
          )

          const buf = BITBOX.Script.multisig.input.encode(signatures)
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode multisig input`, () => {
          const buf = BITBOX.Script.multisig.input.decode(
            Buffer.from(fixture.hex, "hex")
          )
          assert.equal(buf[0].toString("hex"), fixture.signatures[0])
        })

        it(`should confirm correctly formatted multisig input`, () => {
          const signatures = fixture.signatures.map(
            signature =>
              signature
                ? Buffer.from(signature, "hex")
                : BITBOX.Script.opcodes.OP_0
          )

          const buf = BITBOX.Script.multisig.input.encode(signatures)
          const valid = BITBOX.Script.multisig.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe("#multisigOutputTemplate", () => {
      fixtures.multisigOutputTemplate.forEach(fixture => {
        it(`should encode multisig output`, () => {
          const pubKeys = fixture.pubKeys.map(p => Buffer.from(p, "hex"))
          const m = pubKeys.length
          const buf = BITBOX.Script.multisig.output.encode(m, pubKeys)

          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode multisig output`, () => {
          const output = BITBOX.Script.multisig.output.decode(
            Buffer.from(`${fixture.hex}`, "hex")
          )
          assert.equal(output.m, fixture.pubKeys.length)
        })

        it(`should confirm correctly formatted multisig output`, () => {
          const pubKeys = fixture.pubKeys.map(p => Buffer.from(p, "hex"))
          const m = pubKeys.length
          const buf = BITBOX.Script.multisig.output.encode(m, pubKeys)
          const valid = BITBOX.Script.multisig.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })

  describe("#scriptHashTemplate", () => {
    describe("#scriptHashInputTemplate", () => {
      fixtures.scriptHashInputTemplate.forEach(fixture => {
        it(`should encode scriptHash input`, () => {
          const buf = BITBOX.Script.scriptHash.input.encode(
            BITBOX.Script.fromASM(fixture.redeemScriptSig),
            BITBOX.Script.fromASM(fixture.redeemScript)
          )
          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode scriptHash input`, () => {
          const redeemScriptSig = BITBOX.Script.fromASM(fixture.redeemScriptSig)
          const redeemScript = BITBOX.Script.fromASM(fixture.redeemScript)
          assert.deepEqual(
            BITBOX.Script.scriptHash.input.decode(
              Buffer.from(fixture.hex, "hex")
            ),
            {
              redeemScriptSig: redeemScriptSig,
              redeemScript: redeemScript
            }
          )
        })

        it(`should confirm correctly formatted scriptHash input`, () => {
          const buf = BITBOX.Script.scriptHash.input.encode(
            BITBOX.Script.fromASM(fixture.redeemScriptSig),
            BITBOX.Script.fromASM(fixture.redeemScript)
          )
          const valid = BITBOX.Script.scriptHash.input.check(buf)
          assert.equal(valid, true)
        })
      })
    })

    describe("#scriptHashOutputTemplate", () => {
      fixtures.scriptHashOutputTemplate.forEach(fixture => {
        it(`should encode scriptHash output`, () => {
          const redeemScript = BITBOX.Script.fromASM(fixture.output)
          const scriptHash = BITBOX.Crypto.hash160(redeemScript)
          const buf = BITBOX.Script.scriptHash.output.encode(scriptHash)

          assert.equal(buf.toString("hex"), fixture.hex)
        })

        it(`should decode scriptHash output`, () => {
          const redeemScript = BITBOX.Script.fromASM(fixture.output)
          const scriptHash = BITBOX.Crypto.hash160(redeemScript)
          const buf = BITBOX.Script.scriptHash.output.decode(
            Buffer.from(`${fixture.hex}`, "hex")
          )
          assert.deepEqual(buf, scriptHash)
        })

        it(`should confirm correctly formatted scriptHash output`, () => {
          const redeemScript = BITBOX.Script.fromASM(fixture.output)
          const scriptHash = BITBOX.Crypto.hash160(redeemScript)
          const buf = BITBOX.Script.scriptHash.output.encode(scriptHash)
          const valid = BITBOX.Script.scriptHash.output.check(buf)
          assert.equal(valid, true)
        })
      })
    })
  })
})
