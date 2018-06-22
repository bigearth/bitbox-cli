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

  describe('#P2PK', () => {
    describe('#toOne', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pk.toOne.mainnet.forEach((fixture) => {
          it(`should create 1-to-1 P2PK transaction on mainnet`, () => {
            let node = BITBOX.HDNode.fromXPriv(fixture.xpriv);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let originalAmount = fixture.amount;
            let txid = fixture.txHash;
            let pubKey = BITBOX.HDNode.toPublicKey(node);
            let buf = BITBOX.Script.pubKey.output.encode(pubKey);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf, sendAmount);
            let keyPair = BITBOX.HDNode.toKeyPair(node);
            let redeemScript;
            transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

      describe('#Testnet', () => {
        fixtures.scripts.p2pk.toOne.testnet.forEach((fixture) => {
          it(`should create 1-to-1 P2PK transaction on testnet`, () => {
            let node = BITBOX.HDNode.fromXPriv(fixture.xpriv);
            let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
            let originalAmount = fixture.amount;
            let txid = fixture.txHash;
            let pubKey = BITBOX.HDNode.toPublicKey(node);
            let buf = BITBOX.Script.pubKey.output.encode(pubKey);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf, sendAmount);
            let keyPair = BITBOX.HDNode.toKeyPair(node);
            let redeemScript;
            transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });
    });

    describe('#toMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pk.toMany.mainnet.forEach((fixture) => {
          it(`should create 1-to-many P2PK transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let originalAmount = fixture.amount;
            let txid = fixture.txHash;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let buf1 = BITBOX.Script.pubKey.output.encode(pubKey1);
            let buf2 = BITBOX.Script.pubKey.output.encode(pubKey2);
            let buf3 = BITBOX.Script.pubKey.output.encode(pubKey3);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf2, Math.floor(sendAmount / 2));
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2));
            let keyPair = BITBOX.HDNode.toKeyPair(node1);
            let redeemScript;
            transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

      describe('#Testnet', () => {
        fixtures.scripts.p2pk.toMany.testnet.forEach((fixture) => {
          it(`should create 1-to-many P2PK transaction on testnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
            let originalAmount = fixture.amount;
            let txid = fixture.txHash;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let buf1 = BITBOX.Script.pubKey.output.encode(pubKey1);
            let buf2 = BITBOX.Script.pubKey.output.encode(pubKey2);
            let buf3 = BITBOX.Script.pubKey.output.encode(pubKey3);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf2, Math.floor(sendAmount / 2));
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2));
            let keyPair = BITBOX.HDNode.toKeyPair(node1);
            let redeemScript;
            transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });
    });

    describe('#manyToMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pk.manyToMany.mainnet.forEach((fixture) => {
          it(`should create many-to-many P2PK transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let node4 = BITBOX.HDNode.fromXPriv(fixture.xprivs[3]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let originalAmount = fixture.amount;
            let txid = fixture.txHash;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let pubKey4 = BITBOX.HDNode.toPublicKey(node4);
            let buf1 = BITBOX.Script.pubKey.output.encode(pubKey1);
            let buf2 = BITBOX.Script.pubKey.output.encode(pubKey2);
            let buf3 = BITBOX.Script.pubKey.output.encode(pubKey3);
            let buf4 = BITBOX.Script.pubKey.output.encode(pubKey4);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            transactionBuilder.addInput(txid, 1, transactionBuilder.DEFAULT_SEQUENCE, buf2);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2));
            transactionBuilder.addOutput(buf4, Math.floor(sendAmount / 2));
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
            let redeemScript;
            transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

      describe('#Testnet', () => {
        fixtures.scripts.p2pk.manyToMany.testnet.forEach((fixture) => {
          it(`should create many-to-many P2PK transaction on testnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let node4 = BITBOX.HDNode.fromXPriv(fixture.xprivs[3]);
            let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
            let originalAmount = fixture.amount;
            let txid = fixture.txHash;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let pubKey4 = BITBOX.HDNode.toPublicKey(node4);
            let buf1 = BITBOX.Script.pubKey.output.encode(pubKey1);
            let buf2 = BITBOX.Script.pubKey.output.encode(pubKey2);
            let buf3 = BITBOX.Script.pubKey.output.encode(pubKey3);
            let buf4 = BITBOX.Script.pubKey.output.encode(pubKey4);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            transactionBuilder.addInput(txid, 1, transactionBuilder.DEFAULT_SEQUENCE, buf2);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2));
            transactionBuilder.addOutput(buf4, Math.floor(sendAmount / 2));
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
            let redeemScript;
            transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });
    });

    describe('#fromMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pk.fromMany.mainnet.forEach((fixture) => {
          it(`should create many-to-1 P2PK transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let originalAmount = fixture.amount;
            let txid = fixture.txHash;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let buf1 = BITBOX.Script.pubKey.output.encode(pubKey1);
            let buf2 = BITBOX.Script.pubKey.output.encode(pubKey2);
            let buf3 = BITBOX.Script.pubKey.output.encode(pubKey3);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            transactionBuilder.addInput(txid, 1, transactionBuilder.DEFAULT_SEQUENCE, buf2);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf3, sendAmount);
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
            let redeemScript;
            transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

      describe('#Testnet', () => {
        fixtures.scripts.p2pk.fromMany.testnet.forEach((fixture) => {
          it(`should create many-to-1 P2PK transaction on testnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
            let originalAmount = fixture.amount;
            let txid = fixture.txHash;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let buf1 = BITBOX.Script.pubKey.output.encode(pubKey1);
            let buf2 = BITBOX.Script.pubKey.output.encode(pubKey2);
            let buf3 = BITBOX.Script.pubKey.output.encode(pubKey3);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            transactionBuilder.addInput(txid, 1, transactionBuilder.DEFAULT_SEQUENCE, buf2);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf3, sendAmount);
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
            let redeemScript;
            transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });
    });
  });

  describe('#P2PKH', () => {
    describe('#toOne', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2pkh.toOne.mainnet.forEach((fixture) => {
          it(`should create 1-to-1 P2PKH transaction on mainnet`, () => {
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
        fixtures.scripts.p2pkh.toOne.testnet.forEach((fixture) => {
          it(`should create 1-to-1 P2PKH transaction on testnet`, () => {
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
        fixtures.scripts.p2pkh.toMany.mainnet.forEach((fixture) => {
          it(`should create 1-to-2 P2PKH transaction on mainnet`, () => {
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
        fixtures.scripts.p2pkh.toMany.testnet.forEach((fixture) => {
          // TODO pass in tesnet network config
          it(`should create 1-to-2 P2PKH transaction on testnet`, () => {
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
        fixtures.scripts.p2pkh.manyToMany.mainnet.forEach((fixture) => {
          it(`should create 2-to-2 P2PKH transaction on mainnet`, () => {
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
        fixtures.scripts.p2pkh.manyToMany.testnet.forEach((fixture) => {
          it(`should create 2-to-2 P2PKH transaction on testnet`, () => {
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
        fixtures.scripts.p2pkh.fromMany.mainnet.forEach((fixture) => {
          it(`should create 2-to-1 P2PKH transaction on mainnet`, () => {
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
        fixtures.scripts.p2pkh.fromMany.testnet.forEach((fixture) => {
          it(`should create 2-to-1 P2PKH transaction on testnet`, () => {
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

  describe('#P2PMS', () => {
    describe('#toOne', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2ms.toOne.mainnet.forEach((fixture) => {
          it(`should create 1-to-1 1-of-2 P2MS transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let node4 = BITBOX.HDNode.fromXPriv(fixture.xprivs[3]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let txid = fixture.txHash;
            let originalAmount = fixture.amount;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let buf1 = BITBOX.Script.multisig.output.encode(1, [pubKey1, pubKey2]);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let pubKey4 = BITBOX.HDNode.toPublicKey(node4);
            let buf2 = BITBOX.Script.multisig.output.encode(1, [pubKey3, pubKey4]);
            let sendAmount = originalAmount - byteCount;
            transactionBuilder.addOutput(buf2, sendAmount);
            let redeemScript
            let keyPair = BITBOX.HDNode.toKeyPair(node1);
            transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

      // describe('#Testnet', () => {
      //   fixtures.scripts.p2ms.toOne.testnet.forEach((fixture) => {
      //     it(`should create 1-to-1 P2MS transaction on testnet`, () => {
      //       let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv, 'testnet');
      //       let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
      //       let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
      //       let txHash = fixture.txHash;
      //       // original amount of satoshis in vin
      //       let originalAmount = fixture.amount;
      //       transactionBuilder.addInput(txHash, fixture.vout);
      //       // get byte count to calculate fee. paying 1 sat/byte
      //       let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
      //       // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      //       let sendAmount = originalAmount - (byteCount * 15);
      //       // add output w/ address and amount to send
      //       let redeemScript
      //       transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
      //       transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
      //
      //       // build tx
      //       let tx = transactionBuilder.build();
      //       // output rawhex
      //       let hex = tx.toHex();
      //       assert.equal(hex, fixture.hex);
      //     });
      //   });
      // });
    });

    describe('#toMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2ms.toMany.mainnet.forEach((fixture) => {
          it(`should create 1-to-2 P2MS transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let node4 = BITBOX.HDNode.fromXPriv(fixture.xprivs[3]);
            let node5 = BITBOX.HDNode.fromXPriv(fixture.xprivs[4]);
            let node6 = BITBOX.HDNode.fromXPriv(fixture.xprivs[5]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let txid = fixture.txHash;
            let originalAmount = fixture.amount;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let buf1 = BITBOX.Script.multisig.output.encode(1, [pubKey1, pubKey2]);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let pubKey4 = BITBOX.HDNode.toPublicKey(node4);
            let buf2 = BITBOX.Script.multisig.output.encode(1, [pubKey3, pubKey4]);
            transactionBuilder.addOutput(buf2, Math.floor(sendAmount / 2));
            let pubKey5 = BITBOX.HDNode.toPublicKey(node5);
            let pubKey6 = BITBOX.HDNode.toPublicKey(node6);
            let buf3 = BITBOX.Script.multisig.output.encode(1, [pubKey5, pubKey6]);
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2));
            let redeemScript
            let keyPair = BITBOX.HDNode.toKeyPair(node1);
            transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

    //   describe('#Testnet', () => {
    //     fixtures.scripts.p2ms.toMany.testnet.forEach((fixture) => {
    //       // TODO pass in tesnet network config
    //       it(`should create 1-to-2 P2MS transaction on testnet`, () => {
    //         let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
    //         let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
    //         let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
    //         let txHash = fixture.txHash;
    //         // original amount of satoshis in vin
    //         let originalAmount = fixture.amount;
    //         transactionBuilder.addInput(txHash, fixture.vout);
    //         // get byte count to calculate fee. paying 1 sat/byte
    //         let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
    //         // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
    //         let sendAmount = originalAmount - (byteCount * 15);
    //         // add output w/ address and amount to send
    //         transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
    //         transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
    //         let redeemScript
    //         transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
    //         // build tx
    //         let tx = transactionBuilder.build();
    //         // output rawhex
    //         let hex = tx.toHex();
    //         assert.equal(hex, fixture.hex);
    //       });
    //     });
    //   });
    });

    describe('#manyToMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2ms.manyToMany.mainnet.forEach((fixture) => {
          it(`should create 2-to-2 P2MS transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let node4 = BITBOX.HDNode.fromXPriv(fixture.xprivs[3]);
            let node5 = BITBOX.HDNode.fromXPriv(fixture.xprivs[4]);
            let node6 = BITBOX.HDNode.fromXPriv(fixture.xprivs[5]);
            let node7 = BITBOX.HDNode.fromXPriv(fixture.xprivs[6]);
            let node8 = BITBOX.HDNode.fromXPriv(fixture.xprivs[7]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let txid = fixture.txHash;
            let originalAmount = fixture.amount;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let buf1 = BITBOX.Script.multisig.output.encode(1, [pubKey1, pubKey2]);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let pubKey4 = BITBOX.HDNode.toPublicKey(node4);
            let buf2 = BITBOX.Script.multisig.output.encode(1, [pubKey3, pubKey4]);
            transactionBuilder.addInput(txid, 1, transactionBuilder.DEFAULT_SEQUENCE, buf2);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            let pubKey5 = BITBOX.HDNode.toPublicKey(node5);
            let pubKey6 = BITBOX.HDNode.toPublicKey(node6);
            let buf3 = BITBOX.Script.multisig.output.encode(1, [pubKey5, pubKey6]);
            transactionBuilder.addOutput(buf3, Math.floor(sendAmount / 2));
            let pubKey7 = BITBOX.HDNode.toPublicKey(node7);
            let pubKey8 = BITBOX.HDNode.toPublicKey(node8);
            let buf4 = BITBOX.Script.multisig.output.encode(1, [pubKey7, pubKey8]);
            transactionBuilder.addOutput(buf4, Math.floor(sendAmount / 2));
            let redeemScript
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            let keyPair2 = BITBOX.HDNode.toKeyPair(node3);
            transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

    //   describe('#Testnet', () => {
    //     fixtures.scripts.p2ms.manyToMany.testnet.forEach((fixture) => {
    //       it(`should create 2-to-2 P2MS transaction on testnet`, () => {
    //         let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
    //         let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
    //         let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
    //         let txHash = fixture.txHash;
    //         let originalAmount = fixture.amounts[0] + fixture.amounts[1];
    //         transactionBuilder.addInput(txHash, 0);
    //         transactionBuilder.addInput(txHash, 1);
    //         let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 2 });
    //         let sendAmount = originalAmount - (byteCount * 15);
    //         transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
    //         transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
    //         let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
    //         let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
    //         let redeemScript;
    //         transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
    //         transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
    //         let tx = transactionBuilder.build();
    //         let hex = tx.toHex();
    //         assert.equal(hex, fixture.hex);
    //       });
    //     });
    //   });
    });

    describe('#fromMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2ms.fromMany.mainnet.forEach((fixture) => {
          it(`should create 2-to-1 P2MS transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let node4 = BITBOX.HDNode.fromXPriv(fixture.xprivs[3]);
            let node5 = BITBOX.HDNode.fromXPriv(fixture.xprivs[4]);
            let node6 = BITBOX.HDNode.fromXPriv(fixture.xprivs[5]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let txid = fixture.txHash;
            let originalAmount = fixture.amount;
            let pubKey1 = BITBOX.HDNode.toPublicKey(node1);
            let pubKey2 = BITBOX.HDNode.toPublicKey(node2);
            let buf1 = BITBOX.Script.multisig.output.encode(1, [pubKey1, pubKey2]);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, buf1);
            let pubKey3 = BITBOX.HDNode.toPublicKey(node3);
            let pubKey4 = BITBOX.HDNode.toPublicKey(node4);
            let buf2 = BITBOX.Script.multisig.output.encode(1, [pubKey3, pubKey4]);
            transactionBuilder.addInput(txid, 1, transactionBuilder.DEFAULT_SEQUENCE, buf2);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 3 });
            let sendAmount = originalAmount - byteCount;
            let pubKey5 = BITBOX.HDNode.toPublicKey(node5);
            let pubKey6 = BITBOX.HDNode.toPublicKey(node6);
            let buf3 = BITBOX.Script.multisig.output.encode(1, [pubKey5, pubKey6]);
            transactionBuilder.addOutput(buf3, sendAmount);
            let redeemScript
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            let keyPair2 = BITBOX.HDNode.toKeyPair(node3);
            transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

    //   describe('#Testnet', () => {
    //     fixtures.scripts.p2ms.fromMany.testnet.forEach((fixture) => {
    //       it(`should create 2-to-1 P2MS transaction on testnet`, () => {
    //         let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
    //         let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
    //         let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
    //         let txHash = fixture.txHash;
    //         let originalAmount = fixture.amounts[0] + fixture.amounts[1];
    //         transactionBuilder.addInput(txHash, 0);
    //         transactionBuilder.addInput(txHash, 1);
    //         let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
    //         let sendAmount = originalAmount - (byteCount * 15);
    //         transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
    //         let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
    //         let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
    //         let redeemScript;
    //         transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
    //         transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
    //         let tx = transactionBuilder.build();
    //         let hex = tx.toHex();
    //         assert.equal(hex, fixture.hex);
    //       });
    //     });
    //   });
    });
  });

  describe('#P2SH', () => {
    describe('#toOne', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2sh.toOne.mainnet.forEach((fixture) => {
          it(`should create 1-to-1 P2SH transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let txid = fixture.txHash;
            let originalAmount = fixture.amount;
            let identifier1 = BITBOX.HDNode.toIdentifier(node1);
            let buf1 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier1,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ]);
            let scriptHash1 = BITBOX.Crypto.hash160(buf1);
            let data1 = BITBOX.Script.scriptHash.output.encode(scriptHash1);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, data1);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
            let sendAmount = originalAmount - byteCount;
            let identifier2 = BITBOX.HDNode.toIdentifier(node2);
            let buf2 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier2,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ])

            let scriptHash2 = BITBOX.Crypto.hash160(buf2);
            let data2 = BITBOX.Script.scriptHash.output.encode(scriptHash2);
            transactionBuilder.addOutput(data2, sendAmount);
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            transactionBuilder.sign(0, keyPair1, buf1, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

      // describe('#Testnet', () => {
      //   fixtures.scripts.p2sh.toOne.testnet.forEach((fixture) => {
      //     it(`should create 1-to-1 P2SH transaction on testnet`, () => {
      //       let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv, 'testnet');
      //       let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
      //       let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
      //       let txHash = fixture.txHash;
      //       // original amount of satoshis in vin
      //       let originalAmount = fixture.amount;
      //       transactionBuilder.addInput(txHash, fixture.vout);
      //       // get byte count to calculate fee. paying 1 sat/byte
      //       let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
      //       // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      //       let sendAmount = originalAmount - (byteCount * 15);
      //       // add output w/ address and amount to send
      //       let redeemScript
      //       transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
      //       transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
      //
      //       // build tx
      //       let tx = transactionBuilder.build();
      //       // output rawhex
      //       let hex = tx.toHex();
      //       assert.equal(hex, fixture.hex);
      //     });
      //   });
      // });
    });

    describe('#toMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2sh.toMany.mainnet.forEach((fixture) => {
          it(`should create 1-to-2 P2SH transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let txid = fixture.txHash;
            let originalAmount = fixture.amount;
            let identifier1 = BITBOX.HDNode.toIdentifier(node1);
            let buf1 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier1,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ]);
            let scriptHash1 = BITBOX.Crypto.hash160(buf1);
            let data1 = BITBOX.Script.scriptHash.output.encode(scriptHash1);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, data1);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 2 });
            let sendAmount = originalAmount - byteCount;
            let identifier2 = BITBOX.HDNode.toIdentifier(node2);
            let buf2 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier2,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ])
            let scriptHash2 = BITBOX.Crypto.hash160(buf2);
            let data2 = BITBOX.Script.scriptHash.output.encode(scriptHash2);
            transactionBuilder.addOutput(data2, Math.floor(sendAmount / 2));
            let identifier3 = BITBOX.HDNode.toIdentifier(node3);
            let buf3 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier3,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ])
            let scriptHash3 = BITBOX.Crypto.hash160(buf3);
            let data3 = BITBOX.Script.scriptHash.output.encode(scriptHash3);
            transactionBuilder.addOutput(data3, Math.floor(sendAmount / 2));
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            transactionBuilder.sign(0, keyPair1, buf1, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

    //   describe('#Testnet', () => {
    //     fixtures.scripts.p2sh.toMany.testnet.forEach((fixture) => {
    //       // TODO pass in tesnet network config
    //       it(`should create 1-to-2 P2SH transaction on testnet`, () => {
    //         let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
    //         let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
    //         let keyPair = BITBOX.HDNode.toKeyPair(hdnode);
    //         let txHash = fixture.txHash;
    //         // original amount of satoshis in vin
    //         let originalAmount = fixture.amount;
    //         transactionBuilder.addInput(txHash, fixture.vout);
    //         // get byte count to calculate fee. paying 1 sat/byte
    //         let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
    //         // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
    //         let sendAmount = originalAmount - (byteCount * 15);
    //         // add output w/ address and amount to send
    //         transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
    //         transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
    //         let redeemScript
    //         transactionBuilder.sign(0, keyPair, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount);
    //         // build tx
    //         let tx = transactionBuilder.build();
    //         // output rawhex
    //         let hex = tx.toHex();
    //         assert.equal(hex, fixture.hex);
    //       });
    //     });
    //   });
    });

    describe('#manyToMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2sh.manyToMany.mainnet.forEach((fixture) => {
          it(`should create 2-to-2 P2SH transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let node4 = BITBOX.HDNode.fromXPriv(fixture.xprivs[3]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let txid = fixture.txHash;
            let originalAmount = fixture.amount;
            let identifier1 = BITBOX.HDNode.toIdentifier(node1);
            let buf1 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier1,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ]);
            let scriptHash1 = BITBOX.Crypto.hash160(buf1);
            let data1 = BITBOX.Script.scriptHash.output.encode(scriptHash1);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, data1);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 5 }, { P2PKH: 5 });
            let sendAmount = originalAmount - byteCount;
            let identifier2 = BITBOX.HDNode.toIdentifier(node2);
            let buf2 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier2,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ])
            let scriptHash2 = BITBOX.Crypto.hash160(buf2);
            let data2 = BITBOX.Script.scriptHash.output.encode(scriptHash2);
            transactionBuilder.addInput(txid, 1, transactionBuilder.DEFAULT_SEQUENCE, data2);
            let identifier3 = BITBOX.HDNode.toIdentifier(node3);
            let buf3 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier3,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ])
            let scriptHash3 = BITBOX.Crypto.hash160(buf3);
            let data3 = BITBOX.Script.scriptHash.output.encode(scriptHash3);
            transactionBuilder.addOutput(data3, Math.floor(sendAmount / 2));
            let identifier4 = BITBOX.HDNode.toIdentifier(node4);
            let buf4 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier4,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ])
            let scriptHash4 = BITBOX.Crypto.hash160(buf4);
            let data4 = BITBOX.Script.scriptHash.output.encode(scriptHash4);
            transactionBuilder.addOutput(data4, Math.floor(sendAmount / 2));
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
            transactionBuilder.sign(0, keyPair1, buf1, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            transactionBuilder.sign(1, keyPair2, buf2, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

    //   describe('#Testnet', () => {
    //     fixtures.scripts.p2sh.manyToMany.testnet.forEach((fixture) => {
    //       it(`should create 2-to-2 P2SH transaction on testnet`, () => {
    //         let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
    //         let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
    //         let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
    //         let txHash = fixture.txHash;
    //         let originalAmount = fixture.amounts[0] + fixture.amounts[1];
    //         transactionBuilder.addInput(txHash, 0);
    //         transactionBuilder.addInput(txHash, 1);
    //         let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 2 });
    //         let sendAmount = originalAmount - (byteCount * 15);
    //         transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
    //         transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
    //         let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
    //         let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
    //         let redeemScript;
    //         transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
    //         transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
    //         let tx = transactionBuilder.build();
    //         let hex = tx.toHex();
    //         assert.equal(hex, fixture.hex);
    //       });
    //     });
    //   });
    });

    describe('#fromMany', () => {
      describe('#Mainnet', () => {
        fixtures.scripts.p2sh.fromMany.mainnet.forEach((fixture) => {
          it(`should create 2-to-1 P2SH transaction on mainnet`, () => {
            let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
            let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
            let node3 = BITBOX.HDNode.fromXPriv(fixture.xprivs[2]);
            let transactionBuilder = new BITBOX.TransactionBuilder();
            let txid = fixture.txHash;
            let originalAmount = fixture.amount;
            let identifier1 = BITBOX.HDNode.toIdentifier(node1);
            let buf1 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier1,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ]);
            let scriptHash1 = BITBOX.Crypto.hash160(buf1);
            let data1 = BITBOX.Script.scriptHash.output.encode(scriptHash1);
            transactionBuilder.addInput(txid, 0, transactionBuilder.DEFAULT_SEQUENCE, data1);
            let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 3 }, { P2PKH: 2 });
            let sendAmount = originalAmount - byteCount;
            let identifier2 = BITBOX.HDNode.toIdentifier(node2);
            let buf2 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier2,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ])
            let scriptHash2 = BITBOX.Crypto.hash160(buf2);
            let data2 = BITBOX.Script.scriptHash.output.encode(scriptHash2);
            transactionBuilder.addInput(txid, 1, transactionBuilder.DEFAULT_SEQUENCE, data2);
            let identifier3 = BITBOX.HDNode.toIdentifier(node3);
            let buf3 = BITBOX.Script.encode([
              BITBOX.Script.opcodes.OP_DUP,
              BITBOX.Script.opcodes.OP_HASH160,
              identifier3,
              BITBOX.Script.opcodes.OP_EQUALVERIFY,
              BITBOX.Script.opcodes.OP_CHECKSIG
            ])
            let scriptHash3 = BITBOX.Crypto.hash160(buf3);
            let data3 = BITBOX.Script.scriptHash.output.encode(scriptHash3);
            transactionBuilder.addOutput(data3, sendAmount);
            let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
            let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
            transactionBuilder.sign(0, keyPair1, buf1, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            transactionBuilder.sign(1, keyPair2, buf2, transactionBuilder.hashTypes.SIGHASH_ALL, originalAmount / 2);
            let tx = transactionBuilder.build();
            let hex = tx.toHex();
            assert.equal(hex, fixture.hex);
          });
        });
      });

    //   describe('#Testnet', () => {
    //     fixtures.scripts.p2sh.fromMany.testnet.forEach((fixture) => {
    //       it(`should create 2-to-1 P2SH transaction on testnet`, () => {
    //         let node1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
    //         let node2 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
    //         let transactionBuilder = new BITBOX.TransactionBuilder('testnet');
    //         let txHash = fixture.txHash;
    //         let originalAmount = fixture.amounts[0] + fixture.amounts[1];
    //         transactionBuilder.addInput(txHash, 0);
    //         transactionBuilder.addInput(txHash, 1);
    //         let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
    //         let sendAmount = originalAmount - (byteCount * 15);
    //         transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
    //         let keyPair1 = BITBOX.HDNode.toKeyPair(node1);
    //         let keyPair2 = BITBOX.HDNode.toKeyPair(node2);
    //         let redeemScript;
    //         transactionBuilder.sign(0, keyPair1, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[0]);
    //         transactionBuilder.sign(1, keyPair2, redeemScript, transactionBuilder.hashTypes.SIGHASH_ALL, fixture.amounts[1]);
    //         let tx = transactionBuilder.build();
    //         let hex = tx.toHex();
    //         assert.equal(hex, fixture.hex);
    //       });
    //     });
    //   });
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

  describe('#bip66', () => {
    fixtures.bip66.forEach((fixture) => {
      it(`should bip66 encode as ${fixture.DER}`, () => {
        let transactionBuilder = new BITBOX.TransactionBuilder();
        let r = Buffer.from(fixture.r, 'hex')
        let s = Buffer.from(fixture.s, 'hex')
        let DER = transactionBuilder.bip66.encode(r, s)
        assert.equal(DER.toString('hex'), fixture.DER);
      });
    });

    fixtures.bip66.forEach((fixture) => {
      it(`should bip66 decode ${fixture.DER}`, () => {
        let transactionBuilder = new BITBOX.TransactionBuilder();
        let buffer = Buffer.from(fixture.DER, 'hex')
        let signature = transactionBuilder.bip66.decode(buffer)
        assert.equal(signature.r.toString('hex'), fixture.r);
        assert.equal(signature.s.toString('hex'), fixture.s);
      });
    });

    fixtures.bip66.forEach((fixture) => {
      it(`should bip66 check ${fixture.DER}`, () => {
        let transactionBuilder = new BITBOX.TransactionBuilder();
        let buffer = Buffer.from(fixture.DER, 'hex')
        assert.equal(transactionBuilder.bip66.check(buffer), true);
      });
    });
  });

  describe('#bip68', () => {
    fixtures.bip68.encode.forEach((fixture) => {
      it(`should bip68 encode as ${fixture.result}`, () => {
        let transactionBuilder = new BITBOX.TransactionBuilder();
        let obj = {};
        obj[fixture.type] = fixture.value;
        let encode = transactionBuilder.bip68.encode(obj);
        assert.equal(encode, fixture.result);
      });
    });

    fixtures.bip68.decode.forEach((fixture) => {
      it(`should bip68 decode ${fixture.result}`, () => {
        let transactionBuilder = new BITBOX.TransactionBuilder();
        let obj = {};
        let decode = transactionBuilder.bip68.decode(fixture.result);
        assert.equal(Object.keys(decode)[0], fixture.type);
        assert.deepEqual(decode[Object.keys(decode)[0]], fixture.value);
      });
    });
  });
});
