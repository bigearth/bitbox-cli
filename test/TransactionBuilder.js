let fixtures = require('./fixtures/TransactionBuilder.json')
let chai = require('chai');
let assert = require('assert');
let BITBOXCli = require('./../lib/bitbox-cli').default;
let BITBOX = new BITBOXCli();
let Buffer = require('safe-buffer').Buffer


describe('#TransactionBuilder', () => {
  describe('#hashTypes', () => {
    let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
    fixtures.hashTypes.forEach((fixture) => {
      it(`should match hash type`, () => {
        assert.equal(fixture[Object.keys(fixture)[0]], transactionBuilder.hashTypes[Object.keys(fixture)[0]]);
      });
    });
  });

  describe('#toOne', () => {
    fixtures.toOne.forEach((fixture) => {
      it(`should create 1-to-1 transaction`, () => {
        let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
        let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
        let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
        let txHash = fixture.txHash;
        // original amount of satoshis in vin
        let originalAmount = fixture.amount;
        transactionBuilder.addInput(txHash, fixture.vout);
        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let sendAmount = originalAmount - byteCount;
        // add output w/ address and amount to send
        let redeemScript
        transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
        transactionBuilder.sign(0, keyPair, redeemScript, fixture.hashType, originalAmount);

        // build tx
        let tx = transactionBuilder.build();
        // output rawhex
        let hex = tx.toHex();
        assert.equal(hex, fixture.hex);
      });
    });
  });

  describe('#toMany', () => {
    fixtures.toMany.forEach((fixture) => {
      it(`should create 1-to-2 transaction`, () => {
        let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
        let transactionBuilder = new BITBOX.TransactionBuilder();
        let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
        let txHash = fixture.txHash;
        // original amount of satoshis in vin
        let originalAmount = fixture.amount;
        transactionBuilder.addInput(txHash, fixture.vout);
        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let sendAmount = originalAmount - byteCount;
        // add output w/ address and amount to send
        transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
        transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
        let redeemScript
        transactionBuilder.sign(0, keyPair, redeemScript, fixture.hashType, originalAmount);
        // build tx
        let tx = transactionBuilder.build();
        // output rawhex
        let hex = tx.toHex();
        assert.equal(hex, fixture.hex);
      });
    });
  });

  describe('#manyToMany', () => {
    fixtures.manyToMany.forEach((fixture) => {
      it(`should create 2-to-2 transaction`, () => {
        let key1 = BITBOX.ECPair.fromWIF(fixture.wifs[0]);
        let key2 = BITBOX.ECPair.fromWIF(fixture.wifs[0]);
        let transactionBuilder = new BITBOX.TransactionBuilder();
        let txHash = fixture.txHash;
        // original amount of satoshis in vin
        let originalAmount = fixture.amount;
        transactionBuilder.addInput(txHash, 0);
        transactionBuilder.addInput(txHash, 1);
        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 2 });
        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let sendAmount = originalAmount - byteCount;
        // add output w/ address and amount to send
        transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
        transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
        let redeemScript
        transactionBuilder.sign(0, key1, redeemScript, fixture.hashType, originalAmount / 2);
        transactionBuilder.sign(1, key2, redeemScript, fixture.hashType, originalAmount / 2);
        // build tx
        let tx = transactionBuilder.build();
        // output rawhex
        let hex = tx.toHex();
        assert.equal(hex, fixture.hex);
      });
    });
  });

  describe('#fromMany', () => {
    fixtures.fromMany.forEach((fixture) => {
      it(`should create 2-to-1 transaction`, () => {
        let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
        let txHash = fixture.txHash;
        let hdnode0 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
        let keyPair0 = BITBOX.HDNode.toKeyPair(hdnode0);
        // original amount of satoshis in vin
        let originalAmount = fixture.amount;
        transactionBuilder.addInput(txHash, 0);

        let hdnode1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
        let keyPair1 = BITBOX.HDNode.toKeyPair(hdnode1);
        transactionBuilder.addInput(txHash, 1);
        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let sendAmount = originalAmount - byteCount;
        // add output w/ address and amount to send
        transactionBuilder.addOutput(fixture.outputs[0], sendAmount);

        let redeemScript
        transactionBuilder.sign(0, keyPair0, redeemScript, fixture.hashType, originalAmount / 2);
        transactionBuilder.sign(1, keyPair1, redeemScript, fixture.hashType, originalAmount / 2);
        // build tx
        let tx = transactionBuilder.build();
        // output rawhex
        let hex = tx.toHex();
        assert.equal(hex, fixture.hex);
      });
    });
  });

  describe('#op_return', () => {
    fixtures.nulldata.forEach((fixture) => {
      it(`should transaction w/ OP_RETURN output`, () => {

        let buf = Buffer.from(fixture.data);
        let transactionBuilder = new BITBOX.TransactionBuilder();
        let originalAmount = fixture.amount;

        transactionBuilder.addInput(fixture.txHash, 1)
        let data = BITBOX.Script.encode([
          BITBOX.Script.opcodes.OP_RETURN,
          buf
        ]);

        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
        let sendAmount = originalAmount - byteCount;

        transactionBuilder.addOutput(fixture.output, sendAmount);
        transactionBuilder.addOutput(data, 0);
        let key = BITBOX.ECPair.fromWIF(fixture.wif);

        let redeemScript;
        transactionBuilder.sign(0, key, redeemScript, fixture.hashType, originalAmount);
        let hex = transactionBuilder.build().toHex();
        assert.equal(hex, fixture.hex);
      });

      it(`should decompile data to #BCHForEveryone`, () => {

        let b = BITBOX.Script.fromASM(fixture.script);
        let a = BITBOX.Script.decode(b);

        assert.equal(a[1].toString('ascii'), fixture.data);
      });
    });
  });
});
