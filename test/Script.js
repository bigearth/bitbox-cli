let fixtures = require('./fixtures/Script.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#decompileBuffer', () => {
  fixtures.decompileBuffer.forEach((fixture) => {
    it(`should decompile scriptSig buffer`, () => {
      let decompiledScriptSig = BITBOX.Script.decompileBuffer(new Buffer(fixture.scriptSigHex, 'hex'));
      assert.equal(typeof decompiledScriptSig, 'object');
    });

    it(`should decompile scriptSig buffer to cash address ${fixture.cashAddress}`, () => {
      let decompiledScriptSig = BITBOX.Script.decompileBuffer(new Buffer(fixture.scriptSigHex, 'hex'));
      let address = BITBOX.HDNode.toCashAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
      assert.equal(address, fixture.cashAddress);
    });

    it(`should decompile scriptSig buffer to legacy address ${fixture.legacyAddress}`, () => {
      let decompiledScriptSig = BITBOX.Script.decompileBuffer(new Buffer(fixture.scriptSigHex, 'hex'));
      let address = BITBOX.HDNode.toLegacyAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
      assert.equal(address, fixture.legacyAddress);
    });
  });
});

describe('#decompileHex', () => {
  fixtures.decompileHex.forEach((fixture) => {
    it(`should decompile scriptSig buffer`, () => {
      let decompiledScriptSig = BITBOX.Script.decompileHex(fixture.scriptSigHex);
      assert.equal(typeof decompiledScriptSig, 'object');
    });

    it(`should decompile scriptSig buffer to cash address ${fixture.cashAddress}`, () => {
      let decompiledScriptSig = BITBOX.Script.decompileHex(fixture.scriptSigHex);
      let address = BITBOX.HDNode.toCashAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
      assert.equal(address, fixture.cashAddress);
    });

    it(`should decompile scriptSig buffer to legacy address ${fixture.legacyAddress}`, () => {
      let decompiledScriptSig = BITBOX.Script.decompileHex(fixture.scriptSigHex);
      let address = BITBOX.HDNode.toLegacyAddress(BITBOX.ECPair.fromPublicKeyBuffer(decompiledScriptSig[1]));
      assert.equal(address, fixture.legacyAddress);
    });
  });
});

describe('#bufferToASM', () => {
  fixtures.bufferToASM.forEach((fixture) => {
    it(`should compile script buffer to ${fixture.asm}`, () => {
      let asm = BITBOX.Script.bufferToASM(Buffer.from(fixture.scriptHex, 'hex'));
      assert.equal(asm, fixture.asm);
    });
  });
});

describe('#hexToASM', () => {
  fixtures.hexToASM.forEach((fixture) => {
    it(`should compile script hex to ${fixture.asm}`, () => {
      let asm = BITBOX.Script.hexToASM(fixture.scriptHex);
      assert.equal(asm, fixture.asm);
    });
  });
});
