let fixtures = require('./fixtures/TransactionBuilder.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#TransactionBuilder', () => {
  describe('#toOne', () => {
    fixtures.toOne.forEach((fixture) => {
      it(`should create 1-to-1 transaction`, () => {
        let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
        let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
        let keyPair = hdnode.keyPair;
        let txid = fixture.txid;
        // original amount of satoshis in vin
        let originalAmount = fixture.amount;
        transactionBuilder.addInput(txid, fixture.vin, originalAmount);
        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let sendAmount = originalAmount - byteCount;
        // add output w/ address and amount to send
        transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
        transactionBuilder.sign(0, keyPair);
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
        let keyPair = hdnode.keyPair;
        let txid = fixture.txid;
        // original amount of satoshis in vin
        let originalAmount = fixture.amount;
        transactionBuilder.addInput(txid, fixture.vin, originalAmount);
        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let sendAmount = originalAmount - byteCount;
        // add output w/ address and amount to send
        transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
        transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
        transactionBuilder.sign(0, keyPair);
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
        let txid = fixture.txid;
        // original amount of satoshis in vin
        let originalAmount = fixture.amount;
        transactionBuilder.addInput(txid, 0, originalAmount / 2);
        transactionBuilder.addInput(txid, 1, originalAmount / 2);
        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 2 });
        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let sendAmount = originalAmount - byteCount;
        // add output w/ address and amount to send
        transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
        transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
        transactionBuilder.sign(0, key1);
        transactionBuilder.sign(1, key2);
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
        let txid = fixture.txid;
        let hdnode0 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
        let keyPair0 = hdnode0.keyPair;
        // original amount of satoshis in vin
        let originalAmount = fixture.amount;
        transactionBuilder.addInput(txid, 0, originalAmount / 2);

        let hdnode1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
        let keyPair1 = hdnode1.keyPair;
        transactionBuilder.addInput(txid, 1, originalAmount / 2);
        // get byte count to calculate fee. paying 1 sat/byte
        let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
        // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
        let sendAmount = originalAmount - byteCount;
        // add output w/ address and amount to send
        transactionBuilder.addOutput(fixture.outputs[0], sendAmount);

        transactionBuilder.sign(0, keyPair0);
        transactionBuilder.sign(1, keyPair1);
        // build tx
        let tx = transactionBuilder.build();
        // output rawhex
        let hex = tx.toHex();
        assert.equal(hex, fixture.hex);
      });
    });
  });

  describe('#op_return', () => {
    it(`should transaction w/ OP_RETURN output`, () => {

      let buf = new Buffer('#BCHForEveryone');
      let transactionBuilder = new BITBOX.TransactionBuilder()
      let originalAmount = 7696;

      transactionBuilder.addInput("2169dfc071306d38ec263490284647eea890f3eae0bde345b692558530e49653", 1, originalAmount)
      let data = BITBOX.Script.compile([
        BITBOX.Script.opcodes.OP_RETURN,
        buf
      ])

      let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
      let sendAmount = originalAmount - byteCount;

      transactionBuilder.addOutput("bitcoincash:qpuax2tarq33f86wccwlx8ge7tad2wgvqgjqlwshpw", sendAmount)
      transactionBuilder.addOutput(data, 0)
      let key = BITBOX.ECPair.fromWIF("L4FRb7RotDtW4ssxVvL1NQK9SNxdL2FgE7wJALooUJjMhUqFzE5S")

      transactionBuilder.sign(0, key)
      let hex = transactionBuilder.build().toHex()
      assert.equal(hex, '02000000015396e430855592b645e3bde0eaf390a8ee474628903426ec386d3071c0df6921010000006b483045022100da538df3b82465ca9d99049e28de31d0ef28b630d4285edb73b397aae4146bdb0220380771a81d98653b324e4bcf47be98e701b8fe70f3a67679da32d9a2d4562f6d4121039e4c54227380d3eba02121a6611472c26953216da69d8bc831f25c1d2636af40ffffffff022e1d0000000000001976a91479d3297d1823149f4ec61df31d19f2fad5390c0288ac0000000000000000116a0f23424348466f7245766572796f6e6500000000');
    });

    it(`should decompile data to #BCHForEveryone`, () => {

      let b = BITBOX.Script.fromASM("OP_RETURN 23424348466f7245766572796f6e65")
      let a = BITBOX.Script.decompile(b)

      assert.equal(a[1].toString('ascii'), '#BCHForEveryone');
    });
  });
});
