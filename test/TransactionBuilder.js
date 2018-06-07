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
    describe('#Mainnet', () => {
      fixtures.toOne.mainnet.forEach((fixture) => {
        it(`should create 1-to-1 transaction on mainnet`, () => {
          let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
          let transactionBuilder = new BITBOX.TransactionBuilder();
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
          transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);

          // build tx
          let tx = transactionBuilder.build();
          // output rawhex
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });

    describe('#Testnet', () => {
      fixtures.toOne.testnet.forEach((fixture) => {
        it(`should create 1-to-1 transaction on testnet`, () => {
          let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv, 'testnet');
          let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
          let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
          let txHash = fixture.txHash;
          // original amount of satoshis in vin
          let originalAmount = fixture.amount;
          transactionBuilder.addInput(txHash, fixture.vout);
          // get byte count to calculate fee. paying 1 sat/byte
          let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
          // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
          let sendAmount = originalAmount - (byteCount * 15);
          // add output w/ address and amount to send
          let redeemScript
          transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
          transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);

          // build tx
          let tx = transactionBuilder.build();
          // output rawhex
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });
  });

  describe('#toMany', () => {
    describe('#Mainnet', () => {
      fixtures.toMany.mainnet.forEach((fixture) => {
        it(`should create 1-to-2 transaction on mainnet`, () => {
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
          transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
          // build tx
          let tx = transactionBuilder.build();
          // output rawhex
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });

    describe('#Testnet', () => {
      fixtures.toMany.testnet.forEach((fixture) => {
        // TODO pass in tesnet network config
        it(`should create 1-to-2 transaction on testnet`, () => {
          let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
          let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
          let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
          let txHash = fixture.txHash;
          // original amount of satoshis in vin
          let originalAmount = fixture.amount;
          transactionBuilder.addInput(txHash, fixture.vout);
          // get byte count to calculate fee. paying 1 sat/byte
          let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
          // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
          let sendAmount = originalAmount - (byteCount * 15);
          // add output w/ address and amount to send
          transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
          transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
          let redeemScript
          transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
          // build tx
          let tx = transactionBuilder.build();
          // output rawhex
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });
  });

  describe('#manyToMany', () => {
    describe('#Mainnet', () => {
      fixtures.manyToMany.mainnet.forEach((fixture) => {
        it(`should create 2-to-2 transaction on mainnet`, () => {
          let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
          let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
          let transactionBuilder = new BITBOX.TransactionBuilder();
          let txHash = fixture.txHash;
          let originalAmount = fixture.amounts[0] + fixture.amounts[1];
          transactionBuilder.addInput(txHash, 0);
          transactionBuilder.addInput(txHash, 1);
          let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 2 });
          let sendAmount = originalAmount - byteCount;
          transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
          transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
          let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
          let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
          let redeemScript;
          transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
          transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
          let tx = transactionBuilder.build();
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });

    describe('#Testnet', () => {
      fixtures.manyToMany.testnet.forEach((fixture) => {
        it(`should create 2-to-2 transaction on testnet`, () => {
          let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
          let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
          let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
          let txHash = fixture.txHash;
          let originalAmount = fixture.amounts[0] + fixture.amounts[1];
          transactionBuilder.addInput(txHash, 0);
          transactionBuilder.addInput(txHash, 1);
          let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 2 });
          let sendAmount = originalAmount - (byteCount * 15);
          transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
          transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
          let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
          let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
          let redeemScript;
          transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
          transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
          let tx = transactionBuilder.build();
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });
  });

  describe('#fromMany', () => {
    describe('#Mainnet', () => {
      fixtures.fromMany.mainnet.forEach((fixture) => {
        it(`should create 2-to-1 transaction on mainnet`, () => {
          let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
          let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
          let transactionBuilder = new BITBOX.TransactionBuilder();
          let txHash = fixture.txHash;
          let originalAmount = fixture.amounts[0] + fixture.amounts[1];
          transactionBuilder.addInput(txHash, 0);
          transactionBuilder.addInput(txHash, 1);
          let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
          let sendAmount = originalAmount - byteCount;
          transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
          let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
          let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
          let redeemScript;
          transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
          transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
          let tx = transactionBuilder.build();
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });

    describe('#Testnet', () => {
      fixtures.fromMany.testnet.forEach((fixture) => {
        it(`should create 2-to-1 transaction on testnet`, () => {
          let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
          let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
          let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
          let txHash = fixture.txHash;
          let originalAmount = fixture.amounts[0] + fixture.amounts[1];
          transactionBuilder.addInput(txHash, 0);
          transactionBuilder.addInput(txHash, 1);
          let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
          let sendAmount = originalAmount - (byteCount * 15);
          transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
          let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
          let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
          let redeemScript;
          transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
          transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
          let tx = transactionBuilder.build();
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });
  });

    describe('#op_return', () => {
    describe('#Mainnet', () => {
      fixtures.nulldata.mainnet.forEach((fixture) => {
        it(`should create transaction w/ OP_RETURN output on mainnet`, () => {
          let node = BITBOX.HDNode.fromXPriv(fixture.xpriv);
          let transactionBuilder = new BITBOX.TransactionBuilder();
          let txHash = fixture.txHash;
          let originalAmount = fixture.amount;
          transactionBuilder.addInput(txHash, 0);
          let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 5 });
          let sendAmount = originalAmount - byteCount;
          transactionBuilder.addOutput(fixture.output, sendAmount);
          let data = fixture.data;
          let buf = BITBOX.Script.nullData.output.encode(Buffer.from(data, 'ascii'));
          transactionBuilder.addOutput(buf, 0);
          let keyPair = BITBOX.HDNode.toKeyPair(node);
          let redeemScript;
          transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amount);
          let tx = transactionBuilder.build();
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });

    describe('#Testnet', () => {
      fixtures.nulldata.testnet.forEach((fixture) => {
        it(`should create transaction w/ OP_RETURN output on testnet`, () => {
          let node = BITBOX.HDNode.fromXPriv(fixture.xpriv);
          let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
          let txHash = fixture.txHash;
          let originalAmount = fixture.amount;
          transactionBuilder.addInput(txHash, 0);
          let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 5 });
          let sendAmount = originalAmount - byteCount;
          transactionBuilder.addOutput(fixture.output, sendAmount);
          let data = fixture.data;
          let buf = BITBOX.Script.nullData.output.encode(Buffer.from(data, 'ascii'));
          transactionBuilder.addOutput(buf, 0);
          let keyPair = BITBOX.HDNode.toKeyPair(node);
          let redeemScript;
          transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amount);
          let tx = transactionBuilder.build();
          let hex = tx.toHex();
          assert.equal(hex, fixture.hex);
        });
      });
    });
  });
});
