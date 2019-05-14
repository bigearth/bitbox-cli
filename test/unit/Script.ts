// imports
import * as assert from "assert";
import { BITBOX } from "../../lib/BITBOX"
import { Script, DecodedP2PKHInput, DecodedP2MSOutput } from "../../lib/Script"
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
                let buf: Buffer = Buffer.from(fixture.data, "ascii")
                const encoded: Buffer = bitbox.Script.encodeNullDataOutput(buf)
                assert.equal(encoded.toString("hex"), fixture.hex)
            })

            it(`should decode nulldata output`, (): void => {
                let buf: Buffer = Buffer.from(fixture.hex, "hex")
                const decoded: Buffer = bitbox.Script.decodeNullDataOutput(buf)
                assert.equal(decoded.toString("ascii"), fixture.data)
            })

            it(`should confirm correctly formatted nulldata output`, (): void => {
                let buf: Buffer = Buffer.from(fixture.data, "ascii")
                const encoded: Buffer = bitbox.Script.encodeNullDataOutput(buf)
                const valid: boolean = bitbox.Script.checkNullDataOutput(encoded)
                assert.equal(valid, true)
            })
        })
    })

    describe("#pubKeyTemplate", (): void => {
        describe("#pubKeyInputTemplate", (): void => {
            fixtures.pubKeyInputTemplate.forEach((fixture: any): void => {
                it(`should encode pubKey input`, (): void => {
                    const buf: Buffer = bitbox.Script.encodeP2PKInput(
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
                    const buf: Buffer = bitbox.Script.encodeP2PKInput(
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
                    const buf: Buffer = Buffer.from(fixture.pubKey, "hex")
                    const encoded: Buffer = bitbox.Script.encodeP2PKOutput(buf)
                    assert.equal(encoded.toString("hex"), fixture.hex)
                })

                it(`should decode pubKey output`, (): void => {
                    const buf: Buffer = Buffer.from(fixture.hex, "hex")
                    const decoded: Buffer = bitbox.Script.decodeP2PKOutput(buf)
                    assert.equal(decoded.toString("hex"), fixture.pubKey)
                })

                it(`should confirm correctly formatted pubKey output`, (): void => {
                    const buf: Buffer = Buffer.from(fixture.pubKey, "hex")
                    const encoded: Buffer = bitbox.Script.encodeP2PKOutput(buf)
                    const valid: boolean = bitbox.Script.checkP2PKOutput(encoded)
                    assert.equal(valid, true)
                })
            })
        })
    })

    describe("#pubKeyHashTemplate", (): void => {
        describe("#pubKeyHashInputTemplate", (): void => {
            fixtures.pubKeyHashInputTemplate.forEach((fixture: any): void => {
                it(`should encode pubKeyHash input`, (): void => {
                    const sigBuf = Buffer.from(fixture.signature, 'hex')
                    const pubKeyBuf = Buffer.from(fixture.pubKey, 'hex')
                    const encoded: Buffer = bitbox.Script.encodeP2PKHInput(sigBuf, pubKeyBuf)
                    assert.equal(encoded.toString("hex"), fixture.hex)
                })

                it(`should decode pubKeyHash input signature`, (): void => {
                    const input: Buffer = Buffer.from(fixture.hex, "hex")
                    const buf: DecodedP2PKHInput = bitbox.Script.decodeP2PKHInput(input)
                    assert.equal(buf.signature.toString("hex"), fixture.signature)
                })

                it(`should decode pubKeyHash input pubkey`, (): void => {
                    const input: Buffer = Buffer.from(fixture.hex, "hex")
                    const buf: DecodedP2PKHInput = bitbox.Script.decodeP2PKHInput(input)
                    assert.equal(buf.pubKey.toString("hex"), fixture.pubKey)
                })

                it(`should confirm correctly formatted pubKeyHash input`, (): void => {
                    const sigBuf = Buffer.from(fixture.signature, 'hex')
                    const pubKeyBuf = Buffer.from(fixture.pubKey, 'hex')
                    const encoded: Buffer = bitbox.Script.encodeP2PKHInput(sigBuf, pubKeyBuf)
                    const valid: boolean = bitbox.Script.checkP2PKHInput(encoded)
                    assert.equal(valid, true)
                })
            })
        })

        describe("#pubKeyHashOutputTemplate", (): void => {
            fixtures.pubKeyHashOutputTemplate.forEach((fixture: any): void => {
                const node: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.xpriv)
                const identifier: Buffer = bitbox.HDNode.toIdentifier(node)
                it(`should encode pubKeyHash output`, (): void => {
                    const output: Buffer = bitbox.Script.encodeP2PKHOutput(identifier)
                    assert.equal(output.toString("hex"), fixture.hex)
                })

                it(`should decode pubKeyHash output`, (): void => {
                    let output: Buffer = Buffer.from(`${fixture.hex}`, "hex")
                    const decoded: Buffer = bitbox.Script.pubKeyHash.output.decode(output)
                    assert.equal(decoded.toString("hex"), identifier.toString("hex"))
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
                    const signatures: Buffer[] = fixture.signatures.map((signature: any) =>
                        Buffer.from(signature, "hex")
                    )
                    const input: Buffer = bitbox.Script.encodeP2MSInput(signatures)
                    assert.equal(input.toString("hex"), fixture.hex)
                })

                it(`should decode multisig input`, (): void => {
                    const output: Buffer = Buffer.from(fixture.hex, "hex")
                    const decoded: Buffer[] = bitbox.Script.decodeP2MSInput(output)
                    assert.equal(decoded[0].toString("hex"), fixture.signatures[0])
                })

                it(`should confirm correctly formatted multisig input`, (): void => {
                    const signatures: Buffer[] = fixture.signatures.map((signature: any) =>
                        Buffer.from(signature, "hex")
                    )
                    const input: Buffer = bitbox.Script.encodeP2MSInput(signatures)
                    const valid: boolean = bitbox.Script.checkP2MSInput(input)
                    assert.equal(valid, true)
                })
            })
        })

        describe("#multisigOutputTemplate", (): void => {
            fixtures.multisigOutputTemplate.forEach((fixture: any): void => {
                it(`should encode multisig output`, (): void => {
                    const pubKeys: Buffer[] = fixture.pubKeys.map((p: string) => Buffer.from(p, "hex"))
                    const m: number = pubKeys.length
                    const output: Buffer = bitbox.Script.encodeP2MSOutput(m, pubKeys)

                    assert.equal(output.toString("hex"), fixture.hex)
                })

                it(`should decode multisig output`, (): void => {
                    const output: Buffer = Buffer.from(`${fixture.hex}`, "hex")
                    const decoded: DecodedP2MSOutput = bitbox.Script.decodeP2MSOutput(output)
                    assert.equal(decoded.m, fixture.pubKeys.length)
                })

                it(`should confirm correctly formatted multisig output`, (): void => {
                    const pubKeys: Buffer[] = fixture.pubKeys.map((p: any) => Buffer.from(p, "hex"))
                    const m: number = pubKeys.length
                    const output: Buffer = bitbox.Script.encodeP2MSOutput(m, pubKeys)
                    const valid: boolean = bitbox.Script.checkP2MSOutput(output)
                    assert.equal(valid, true)
                })
            })
        })
    })

    describe("#scriptHashTemplate", (): void => {
        describe("#scriptHashInputTemplate", (): void => {
            fixtures.scriptHashInputTemplate.forEach((fixture: any): void => {
                it(`should encode scriptHash input`, (): void => {
                    const redeemScriptSig: Buffer = bitbox.Script.fromASM(fixture.redeemScriptSig)
                    const redeemScript: Buffer = bitbox.Script.fromASM(fixture.redeemScript)
                    const input: Buffer = bitbox.Script.encodeP2SHInput(redeemScriptSig, redeemScript)
                    assert.equal(input.toString("hex"), fixture.hex)
                })

                it(`should decode scriptHash input`, (): void => {
                    const redeemScriptSig: Buffer = bitbox.Script.fromASM(fixture.redeemScriptSig)
                    const redeemScript: Buffer = bitbox.Script.fromASM(fixture.redeemScript)
                    const input: Buffer = bitbox.Script.encodeP2SHInput(redeemScriptSig, redeemScript)
                    assert.deepEqual(
                        bitbox.Script.decodeP2SHInput(input),
                        {
                            redeemScriptSig: redeemScriptSig,
                            redeemScript: redeemScript
                        }
                    )
                })

                it(`should confirm correctly formatted scriptHash input`, (): void => {
                    const redeemScriptSig: Buffer = bitbox.Script.fromASM(fixture.redeemScriptSig)
                    const redeemScript: Buffer = bitbox.Script.fromASM(fixture.redeemScript)
                    const input: Buffer = bitbox.Script.encodeP2SHInput(redeemScriptSig, redeemScript)
                    const valid: boolean = bitbox.Script.scriptHash.input.check(input)
                    assert.equal(valid, true)
                })
            })
        })

        describe("#scriptHashOutputTemplate", (): void => {
            fixtures.scriptHashOutputTemplate.forEach((fixture: any): void => {
                it(`should encode scriptHash output`, (): void => {
                    const redeemScript: Buffer = bitbox.Script.fromASM(fixture.output)
                    const scriptHash: Buffer = bitbox.Crypto.hash160(redeemScript)
                    const output: Buffer = bitbox.Script.encodeP2SHOutput(scriptHash)

                    assert.equal(output.toString("hex"), fixture.hex)
                })

                it(`should decode scriptHash output`, (): void => {
                    const redeemScript: any = bitbox.Script.fromASM(fixture.output)
                    const scriptHash: Buffer = bitbox.Crypto.hash160(redeemScript)
                    const output: Buffer = bitbox.Script.encodeP2SHOutput(scriptHash)
                    let decoded: Buffer = bitbox.Script.decodeP2SHOutput(output)
                    assert.deepEqual(decoded, scriptHash)
                })

                it(`should confirm correctly formatted scriptHash output`, (): void => {
                    const redeemScript: any = bitbox.Script.fromASM(fixture.output)
                    const scriptHash: Buffer = bitbox.Crypto.hash160(redeemScript)
                    const buf: Buffer = bitbox.Script.encodeP2SHOutput(scriptHash)
                    const valid: boolean = bitbox.Script.scriptHash.output.check(buf)
                    assert.equal(valid, true)
                })
            })
        })
    })
})
