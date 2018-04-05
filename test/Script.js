let fixtures = require('./fixtures/Script.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();


describe('Script', () => {
  describe('#decompileBuffer', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.decompileScriptSigBuffer.forEach((fixture) => {
        it(`should decompile scriptSig buffer`, () => {
          let decompiledScriptSig = BITBOX.Script.decompileBuffer(Buffer.from(fixture.scriptSigHex, 'hex'));
          assert.equal(typeof decompiledScriptSig, 'object');
        });

        it(`should decompile scriptSig buffer to cash address ${fixture.cashAddress}`, () => {
          let decompiledScriptSig = BITBOX.Script.decompileBuffer(Buffer.from(fixture.scriptSigHex, 'hex'));
          let address = BITBOX.HDNode.toCashAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
          assert.equal(address, fixture.cashAddress);
        });

        it(`should decompile scriptSig buffer to legacy address ${fixture.legacyAddress}`, () => {
          let decompiledScriptSig = BITBOX.Script.decompileBuffer(Buffer.from(fixture.scriptSigHex, 'hex'));
          let address = BITBOX.HDNode.toLegacyAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
          assert.equal(address, fixture.legacyAddress);
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.decompileScriptPubKeyBuffer.forEach((fixture) => {
        it(`should decompile scriptSig buffer`, () => {
          let decompiledScriptPubKey = BITBOX.Script.decompileBuffer(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          assert.equal(decompiledScriptPubKey.length, 5);
        });

        it(`should match hashed pubKey ${fixture.pubKeyHex}`, () => {
          let decompiledScriptPubKey = BITBOX.Script.decompileBuffer(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          let sha256 = BITBOX.Crypto.createSHA256Hash(fixture.pubKeyHex);
          let ripe = BITBOX.Crypto.createRIPEMD160Hash(sha256);
          assert.equal(decompiledScriptPubKey[2].toString('hex'), ripe);
        });
      });
    });
  });

  describe('#decompileHex', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.decompileScriptSigHex.forEach((fixture) => {
        it(`should decompile scriptSig hex`, () => {
          let decompiledScriptSig = BITBOX.Script.decompileHex(fixture.scriptSigHex);
          assert.equal(typeof decompiledScriptSig, 'object');
        });

        it(`should decompile scriptSig hex to cash address ${fixture.cashAddress}`, () => {
          let decompiledScriptSig = BITBOX.Script.decompileHex(fixture.scriptSigHex);
          console.log(decompiledScriptSig[0].toString('hex'))
          console.log(decompiledScriptSig[1].toString('hex'))
          let address = BITBOX.HDNode.toCashAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
          assert.equal(address, fixture.cashAddress);
        });

        it(`should decompile scriptSig hex to legacy address ${fixture.legacyAddress}`, () => {
          let decompiledScriptSig = BITBOX.Script.decompileHex(fixture.scriptSigHex);
          let address = BITBOX.HDNode.toLegacyAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
          assert.equal(address, fixture.legacyAddress);
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.decompileScriptPubKeyHex.forEach((fixture) => {
        it(`should decompile scriptSig hex`, () => {
          let decompiledScriptPubKey = BITBOX.Script.decompileHex(fixture.scriptPubKeyHex);
          assert.equal(decompiledScriptPubKey.length, 5);
        });

        it(`should match hashed pubKey ${fixture.pubKeyHex}`, () => {
          let decompiledScriptPubKey = BITBOX.Script.decompileHex(fixture.scriptPubKeyHex);
          let sha256 = BITBOX.Crypto.createSHA256Hash(fixture.pubKeyHex);
          let ripe = BITBOX.Crypto.createRIPEMD160Hash(sha256);
          assert.equal(decompiledScriptPubKey[2].toString('hex'), ripe);
        });
      });
    });
  });

  describe('#compileBuffer', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.compileScriptSigBuffer.forEach((fixture) => {
        it(`should compile scriptSig chunks to buffer`, () => {
          let arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ];
          let compiledScriptSig = BITBOX.Script.compileBuffer(arr);
          assert.equal(typeof compiledScriptSig, 'object');
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.compileScriptPubKeyBuffer.forEach((fixture) => {
        it(`should compile scriptPubKey buffer`, () => {
          let decompiledScriptPubKey = BITBOX.Script.decompileHex(fixture.scriptPubKeyHex);
          let compiledScriptPubKey = BITBOX.Script.compileBuffer(decompiledScriptPubKey);
          assert.equal(compiledScriptPubKey.toString('hex'), fixture.scriptPubKeyHex);
        });
      });
    });
  });

  describe('#bufferToASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigBufferToASM.forEach((fixture) => {
        it(`should compile scriptSig buffer to ${fixture.asm}`, () => {
          let arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ];
          let compiledScriptSig = BITBOX.Script.compileBuffer(arr);
          let asm = BITBOX.Script.bufferToASM(compiledScriptSig);
          assert.equal(asm, fixture.asm);
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyBufferToASM.forEach((fixture) => {
        it(`should compile scriptPubKey buffer to ${fixture.asm}`, () => {
          let asm = BITBOX.Script.bufferToASM(Buffer.from(fixture.scriptPubKeyHex, 'hex'));
          assert.equal(asm, fixture.asm);
        });
      });
    });
  });

  describe('#hexToASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigHexToASM.forEach((fixture) => {
        it(`should compile scriptSig hex to ${fixture.asm}`, () => {
          let arr = [
            Buffer.from(fixture.scriptSigChunks[0], 'hex'),
            Buffer.from(fixture.scriptSigChunks[1], 'hex')
          ];
          let compiledScriptSig = BITBOX.Script.compileBuffer(arr);
          let asm = BITBOX.Script.hexToASM(compiledScriptSig.toString('hex'));
          assert.equal(asm, fixture.asm);
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyHexToASM.forEach((fixture) => {
        it(`should compile scriptPubKey hex to ${fixture.asm}`, () => {
          let asm = BITBOX.Script.hexToASM(fixture.scriptPubKeyHex);
          assert.equal(asm, fixture.asm);
        });
      });
    });
  });

  describe('#bufferFromASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigBufferFromASM.forEach((fixture) => {
        it(`should decompile scriptSig asm to buffer`, () => {
          let buf = BITBOX.Script.bufferFromASM(fixture.asm);
          assert.equal(typeof buf, 'object');
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyBufferFromASM.forEach((fixture) => {
        it(`should decompile scriptPubKey asm to buffer`, () => {
          let buf = BITBOX.Script.bufferFromASM(fixture.asm);
          assert.equal(typeof buf, 'object');
        });
      });
    });
  });

  describe('#hexFromASM', () => {
    describe('P2PKH scriptSig', () => {
      fixtures.scriptSigHexFromASM.forEach((fixture) => {
        it(`should decompile scriptSig asm to hex`, () => {
          let hex = BITBOX.Script.hexFromASM(fixture.asm);
          assert.equal(hex, fixture.scriptSigHex);
        });
      });
    });

    describe('P2PKH scriptPubKey', () => {
      fixtures.scriptPubKeyHexFromASM.forEach((fixture) => {
        it(`should decompile scriptPubKey asm to hex`, () => {
          let hex = BITBOX.Script.hexFromASM(fixture.asm);
          assert.equal(hex, fixture.scriptPubKeyHex);
        });
      });
    });
  });
});
