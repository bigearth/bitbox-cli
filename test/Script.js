let fixtures = require('./fixtures/Script.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#Script', () => {
  describe('#decode', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.decodeScriptSig.forEach((fixture) => {
        it(`should decode scriptSig buffer`, () => {
          let decodedScriptSig = BITBOX.Script.decode(Buffer.from(fixture.scriptSigHex, 'hex'));
          assert.equal(typeof decodedScriptSig, 'object');
        });

        it(`should decode scriptSig buffer to cash address ${fixture.cashAddress}`, () => {
          let decodedScriptSig = BITBOX.Script.decode(Buffer.from(fixture.scriptSigHex, 'hex'));
          let address = BITBOX.HDNode.toCashAddress(BITBOX.ECPair.fromPublicKey(decodedScriptSig[1]));
          assert.equal(address, fixture.cashAddress);
        });

        it(`should decode scriptSig buffer to legacy address ${fixture.legacyAddress}`, () => {
          let decodedScriptSig = BITBOX.Script.decode(Buffer.from(fixture.scriptSigHex, 'hex'));
          let address = BITBOX.HDNode.toLegacyAddress(BITBOX.ECPair.fromPublicKey(decodedScriptSig[1]));
          assert.equal(address, fixture.legacyAddress);
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.decodeScriptPubKey.forEach((fixture) => {
        it(`should decode scriptSig buffer`, () => {
          let decodedScriptPubKey = BITBOX.Script.decode(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          assert.equal(decodedScriptPubKey.length, 5);
        });

        it(`should match hashed pubKey ${fixture.pubKeyHex}`, () => {
          let decodedScriptPubKey = BITBOX.Script.decode(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          let data = Buffer.from(fixture.pubKeyHex, 'hex')
          let hash160 = BITBOX.Crypto.hash160(data).toString('hex');
          assert.equal(decodedScriptPubKey[2].toString('hex'), hash160);
        });
      });
    });
  });

  describe('#encode', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.encodeScriptSig.forEach((fixture) => {
        it(`should encode scriptSig chunks to buffer`, () => {
          let arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ];
          let encodedScriptSig = BITBOX.Script.encode(arr);
          assert.equal(typeof encodedScriptSig, 'object');
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.encodeScriptPubKey.forEach((fixture) => {
        it(`should encode scriptPubKey buffer`, () => {
          let decodedScriptPubKey = BITBOX.Script.decode(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          let compiledScriptPubKey = BITBOX.Script.encode(decodedScriptPubKey);
          assert.equal(compiledScriptPubKey.toString('hex'), fixture.scriptPubKeyHex);
        });
      });
    });
  });

  describe('#toASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigToASM.forEach((fixture) => {
        it(`should encode scriptSig buffer to ${fixture.asm}`, () => {
          let arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ];
          let compiledScriptSig = BITBOX.Script.encode(arr);
          let asm = BITBOX.Script.toASM(compiledScriptSig);
          assert.equal(asm, fixture.asm);
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyToASM.forEach((fixture) => {
        it(`should compile scriptPubKey buffer to ${fixture.asm}`, () => {
          let asm = BITBOX.Script.toASM(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          assert.equal(asm, fixture.asm);
        });
      });
    });
  });

  describe('#fromASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigFromASM.forEach((fixture) => {
        it(`should decode scriptSig asm to buffer`, () => {
          let buf = BITBOX.Script.fromASM(fixture.asm);
          assert.equal(typeof buf, 'object');
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyFromASM.forEach((fixture) => {
        it(`should decode scriptPubKey asm to buffer`, () => {
          let buf = BITBOX.Script.fromASM(fixture.asm);
          assert.equal(typeof buf, 'object');
        });
      });
    });
  });

  describe('#OPCodes', () => {
    for (let opcode in fixtures.opcodes) {
      it(`should have OP Code ${opcode}`, () => {
        assert.equal(BITBOX.Script.opcodes[opcode], fixtures.opcodes[opcode]);
      });
    }
  });

  describe('#classifyInput', () => {
    fixtures.classifyInput.forEach((fixture) => {
      it(`should classify input type ${fixture.type}`, () => {
        let type = BITBOX.Script.classifyInput(BITBOX.Script.fromASM(fixture.script));
        assert.equal(type, fixture.type);
      });
    });
  });

  describe('#classifyOutput', () => {
    fixtures.classifyOutput.forEach((fixture) => {
      it(`should classify ouput type ${fixture.type}`, () => {
        let type = BITBOX.Script.classifyOutput(BITBOX.Script.fromASM(fixture.script));
        assert.equal(type, fixture.type);
      });
    });
  });

  describe('#nullDataTemplate', () => {
    fixtures.nullDataTemplate.forEach((fixture) => {
      it(`should encode nulldata output`, () => {
        let buf = BITBOX.Script.nullData.output.encode(Buffer.from(`${fixture.data}`, 'ascii'));
        assert.equal(buf.toString('hex'), fixture.hex);
      });

      it(`should decode nulldata output`, () => {
        let buf = BITBOX.Script.nullData.output.decode(Buffer.from(`${fixture.hex}`, 'hex'));
        assert.equal(buf.toString('ascii'), fixture.data);
      });

      it(`should confirm correctly formatted nulldata output`, () => {
        let buf = BITBOX.Script.nullData.output.encode(Buffer.from(`${fixture.data}`, 'ascii'));
        let valid = BITBOX.Script.nullData.output.check(buf);
        assert.equal(valid, true);
      });
    });
  });

  describe('#pubKeyTemplate', () => {
    describe('#pubKeyInputTemplate', () => {
      fixtures.pubKeyInputTemplate.forEach((fixture) => {
        it(`should encode pubKey input`, () => {
          let buf = BITBOX.Script.pubKey.input.encode(Buffer.from(fixture.signature, 'hex'));
          assert.equal(buf.toString('hex'), fixture.hex);
        });

        it(`should decode pubKey input`, () => {
          let buf = BITBOX.Script.pubKey.input.decode(Buffer.from(fixture.hex, 'hex'));
          assert.equal(buf.toString('hex'), fixture.signature);
        });

        it(`should confirm correctly formatted pubKeyHash input`, () => {
          let buf = BITBOX.Script.pubKey.input.encode(Buffer.from(fixture.signature, 'hex'));
          let valid = BITBOX.Script.pubKey.input.check(buf);
          assert.equal(valid, true);
        });
      });
    });

    describe('#pubKeyOutputTemplate', () => {
      fixtures.pubKeyOutputTemplate.forEach((fixture) => {
        it(`should encode pubKey output`, () => {
          let buf = BITBOX.Script.pubKey.output.encode(Buffer.from(fixture.pubKey, 'hex'));
          assert.equal(buf.toString('hex'), fixture.hex);
        });

        it(`should decode pubKey output`, () => {
          let buf = BITBOX.Script.pubKey.output.decode(Buffer.from(`${fixture.hex}`, 'hex'));
          assert.equal(buf.toString('hex'), fixture.pubKey);
        });

        it(`should confirm correctly formatted pubKey output`, () => {
          let buf = BITBOX.Script.pubKey.output.encode(Buffer.from(fixture.pubKey, 'hex'));
          let valid = BITBOX.Script.pubKey.output.check(buf);
          assert.equal(valid, true);
        });
      });
    });
  });

  describe('#pubKeyHashTemplate', () => {
    describe('#pubKeyHashInputTemplate', () => {
      fixtures.pubKeyHashInputTemplate.forEach((fixture) => {
        it(`should encode pubKeyHash input`, () => {
          let buf = BITBOX.Script.pubKeyHash.input.encode(Buffer.from(fixture.signature, 'hex'), Buffer.from(fixture.pubKey, 'hex'));
          assert.equal(buf.toString('hex'), fixture.hex);
        });

        it(`should decode pubKeyHash input signature`, () => {
          let buf = BITBOX.Script.pubKeyHash.input.decode(Buffer.from(fixture.hex, 'hex'));
          assert.equal(buf.signature.toString('hex'), fixture.signature);
        });

        it(`should decode pubKeyHash input pubkey`, () => {
          let buf = BITBOX.Script.pubKeyHash.input.decode(Buffer.from(fixture.hex, 'hex'));
          assert.equal(buf.pubKey.toString('hex'), fixture.pubKey);
        });

        it(`should confirm correctly formatted pubKeyHash input`, () => {
          let buf = BITBOX.Script.pubKeyHash.input.encode(Buffer.from(fixture.signature, 'hex'), Buffer.from(fixture.pubKey, 'hex'));
          let valid = BITBOX.Script.pubKeyHash.input.check(buf);
          assert.equal(valid, true);
        });
      });
    });

    describe('#pubKeyHashOutputTemplate', () => {
      fixtures.pubKeyHashOutputTemplate.forEach((fixture) => {
        let node = BITBOX.HDNode.fromXPriv(fixture.xpriv);
        let identifier = BITBOX.HDNode.toIdentifier(node);
        it(`should encode pubKeyHash output`, () => {
          let buf = BITBOX.Script.pubKeyHash.output.encode(identifier);
          assert.equal(buf.toString('hex'), fixture.hex);
        });

        it(`should decode pubKeyHash output`, () => {
          let buf = BITBOX.Script.pubKeyHash.output.decode(Buffer.from(`${fixture.hex}`, 'hex'));
          assert.equal(buf.toString('hex'), identifier.toString('hex'));
        });

        it(`should confirm correctly formatted pubKeyHash output`, () => {
          let buf = BITBOX.Script.pubKeyHash.output.encode(identifier);
          let valid = BITBOX.Script.pubKeyHash.output.check(buf);
          assert.equal(valid, true);
        });
      });
    });
  });

  describe('#multisigTemplate', () => {
    describe('#multisigInputTemplate', () => {
      fixtures.multisigInputTemplate.forEach((fixture) => {
        it(`should encode multisig input`, () => {
          let signatures = fixture.signatures.map((signature) => {
            return signature ? Buffer.from(signature, 'hex') : BITBOX.Script.opcodes.OP_0
          })

          let buf = BITBOX.Script.multisig.input.encode(signatures);
          assert.equal(buf.toString('hex'), fixture.hex);
        });

        it(`should decode multisig input`, () => {
          let buf = BITBOX.Script.multisig.input.decode(Buffer.from(fixture.hex, 'hex'));
          assert.equal(buf[0].toString('hex'), fixture.signatures[0]);
        });

        it(`should confirm correctly formatted multisig input`, () => {
          let signatures = fixture.signatures.map((signature) => {
            return signature ? Buffer.from(signature, 'hex') : BITBOX.Script.opcodes.OP_0
          })

          let buf = BITBOX.Script.multisig.input.encode(signatures);
          let valid = BITBOX.Script.multisig.input.check(buf);
          assert.equal(valid, true);
        });
      });
    });

    describe('#multisigOutputTemplate', () => {
      fixtures.multisigOutputTemplate.forEach((fixture) => {
        it(`should encode multisig output`, () => {
          let pubKeys = fixture.pubKeys.map((p) => { return Buffer.from(p, 'hex') })
          let m = pubKeys.length
          let buf = BITBOX.Script.multisig.output.encode(m, pubKeys);

          assert.equal(buf.toString('hex'), fixture.hex);
        });

        it(`should decode multisig output`, () => {
          let output = BITBOX.Script.multisig.output.decode(Buffer.from(`${fixture.hex}`, 'hex'));
          assert.equal(output.m, fixture.pubKeys.length);
        });

        it(`should confirm correctly formatted multisig output`, () => {
          let pubKeys = fixture.pubKeys.map((p) => { return Buffer.from(p, 'hex') })
          let m = pubKeys.length
          let buf = BITBOX.Script.multisig.output.encode(m, pubKeys);
          let valid = BITBOX.Script.multisig.output.check(buf);
          assert.equal(valid, true);
        });
      });
    });
  });

  describe('#scriptHashTemplate', () => {
    describe('#scriptHashInputTemplate', () => {
      fixtures.scriptHashInputTemplate.forEach((fixture) => {
        it(`should encode scriptHash input`, () => {
          let buf = BITBOX.Script.scriptHash.input.encode(BITBOX.Script.fromASM(fixture.redeemScriptSig), BITBOX.Script.fromASM(fixture.redeemScript));
          assert.equal(buf.toString('hex'), fixture.hex);
        });

        it(`should decode scriptHash input`, () => {
          let redeemScriptSig = BITBOX.Script.fromASM(fixture.redeemScriptSig)
          let redeemScript = BITBOX.Script.fromASM(fixture.redeemScript)
          assert.deepEqual(BITBOX.Script.scriptHash.input.decode(Buffer.from(fixture.hex, 'hex')), {
            redeemScriptSig: redeemScriptSig,
            redeemScript: redeemScript
          })
        });

        it(`should confirm correctly formatted scriptHash input`, () => {
          let buf = BITBOX.Script.scriptHash.input.encode(BITBOX.Script.fromASM(fixture.redeemScriptSig), BITBOX.Script.fromASM(fixture.redeemScript));
          let valid = BITBOX.Script.scriptHash.input.check(buf);
          assert.equal(valid, true);
        });
      });
    });

    describe('#scriptHashOutputTemplate', () => {
      fixtures.scriptHashOutputTemplate.forEach((fixture) => {
        it(`should encode scriptHash output`, () => {
          let redeemScript = BITBOX.Script.fromASM(fixture.output);
          let scriptHash = BITBOX.Crypto.hash160(redeemScript);
          let buf = BITBOX.Script.scriptHash.output.encode(scriptHash);

          assert.equal(buf.toString('hex'), fixture.hex);
        });

        it(`should decode scriptHash output`, () => {
          let redeemScript = BITBOX.Script.fromASM(fixture.output);
          let scriptHash = BITBOX.Crypto.hash160(redeemScript);
          let buf = BITBOX.Script.scriptHash.output.decode(Buffer.from(`${fixture.hex}`, 'hex'));
          assert.deepEqual(buf, scriptHash)
        });

        it(`should confirm correctly formatted scriptHash output`, () => {
          let redeemScript = BITBOX.Script.fromASM(fixture.output);
          let scriptHash = BITBOX.Crypto.hash160(redeemScript);
          let buf = BITBOX.Script.scriptHash.output.encode(scriptHash);
          let valid = BITBOX.Script.scriptHash.output.check(buf);
          assert.equal(valid, true);
        });
      });
    });
  });
});
