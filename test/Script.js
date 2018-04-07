let fixtures = require('./fixtures/Script.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#Script', () => {
  describe('#decompile', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.decompileScriptSig.forEach((fixture) => {
        it(`should decompile scriptSig buffer`, () => {
          let decompiledScriptSig = BITBOX.Script.decompile(Buffer.from(fixture.scriptSigHex, 'hex'));
          assert.equal(typeof decompiledScriptSig, 'object');
        });

        it(`should decompile scriptSig buffer to cash address ${fixture.cashAddress}`, () => {
          let decompiledScriptSig = BITBOX.Script.decompile(Buffer.from(fixture.scriptSigHex, 'hex'));
          let address = BITBOX.HDNode.toCashAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
          assert.equal(address, fixture.cashAddress);
        });

        it(`should decompile scriptSig buffer to legacy address ${fixture.legacyAddress}`, () => {
          let decompiledScriptSig = BITBOX.Script.decompile(Buffer.from(fixture.scriptSigHex, 'hex'));
          let address = BITBOX.HDNode.toLegacyAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
          assert.equal(address, fixture.legacyAddress);
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.decompileScriptPubKey.forEach((fixture) => {
        it(`should decompile scriptSig buffer`, () => {
          let decompiledScriptPubKey = BITBOX.Script.decompile(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          assert.equal(decompiledScriptPubKey.length, 5);
        });

        it(`should match hashed pubKey ${fixture.pubKeyHex}`, () => {
          let decompiledScriptPubKey = BITBOX.Script.decompile(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          let data = Buffer.from(fixture.pubKeyHex, 'hex')
          let hash160 = BITBOX.Crypto.hash160(data).toString('hex');
          assert.equal(decompiledScriptPubKey[2].toString('hex'), hash160);
        });
      });
    });
  });

  describe('#compile', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.compileScriptSig.forEach((fixture) => {
        it(`should compile scriptSig chunks to buffer`, () => {
          let arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ];
          let compiledScriptSig = BITBOX.Script.compile(arr);
          assert.equal(typeof compiledScriptSig, 'object');
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.compileScriptPubKey.forEach((fixture) => {
        it(`should compile scriptPubKey buffer`, () => {
          let decompiledScriptPubKey = BITBOX.Script.decompile(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          let compiledScriptPubKey = BITBOX.Script.compile(decompiledScriptPubKey);
          assert.equal(compiledScriptPubKey.toString('hex'), fixture.scriptPubKeyHex);
        });
      });
    });
  });

  describe('#toASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigToASM.forEach((fixture) => {
        it(`should compile scriptSig buffer to ${fixture.asm}`, () => {
          let arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ];
          let compiledScriptSig = BITBOX.Script.compile(arr);
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
        it(`should decompile scriptSig asm to buffer`, () => {
          let buf = BITBOX.Script.fromASM(fixture.asm);
          assert.equal(typeof buf, 'object');
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyFromASM.forEach((fixture) => {
        it(`should decompile scriptPubKey asm to buffer`, () => {
          let buf = BITBOX.Script.fromASM(fixture.asm);
          assert.equal(typeof buf, 'object');
        });
      });
    });
  });

  describe('#OPCodes', () => {
    for (let opcode in fixtures.opcodes) {
      it(`should have have OP Code ${opcode}`, () => {
        assert.equal(BITBOX.Script.opcodes[opcode], fixtures.opcodes[opcode]);
      });
    }
  });
});
