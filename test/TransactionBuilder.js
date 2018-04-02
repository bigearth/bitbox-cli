let fixtures = require('./fixtures/TransactionBuilder.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#TransactionBuilder', () => {
  fixtures.toOne.forEach((fixture) => {
    it(`should create 1-to-1 transaction`, () => {
      let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
      let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
      let keyPair = hdnode.keyPair;
      let txid = fixture.txid;
      transactionBuilder.addInput(txid, fixture.vin, keyPair);
      // get byte count to calculate fee. paying 1 sat/byte
      let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 });
      // original amount of satoshis in vin
      let originalAmount = fixture.amount;
      // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      let sendAmount = originalAmount - byteCount;
      // add output w/ address and amount to send
      transactionBuilder.addOutput(fixture.outputs[0], sendAmount);
      transactionBuilder.sign(0, originalAmount);
      // build tx
      let tx = transactionBuilder.build();
      // output rawhex
      let hex = tx.toHex();
      assert.equal(hex, fixture.hex);
    });
  });

  fixtures.toMany.forEach((fixture) => {
    it(`should create 1-to-2 transaction`, () => {
      let hdnode = BITBOX.HDNode.fromXPriv(fixture.xpriv);
      let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
      let keyPair = hdnode.keyPair;
      let txid = fixture.txid;
      transactionBuilder.addInput(txid, fixture.vin, keyPair);
      // get byte count to calculate fee. paying 1 sat/byte
      let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 });
      // original amount of satoshis in vin
      let originalAmount = fixture.amount;
      // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      let sendAmount = originalAmount - byteCount;
      // add output w/ address and amount to send
      transactionBuilder.addOutput(fixture.outputs[0], Math.floor(sendAmount / 2));
      transactionBuilder.addOutput(fixture.outputs[1], Math.floor(sendAmount / 2));
      transactionBuilder.sign(0, originalAmount);
      // build tx
      let tx = transactionBuilder.build();
      // output rawhex
      let hex = tx.toHex();
      assert.equal(hex, fixture.hex);
    });
  });

  fixtures.fromMany.forEach((fixture) => {
    it(`should create 2-to-1 transaction`, () => {
      let transactionBuilder = new BITBOX.TransactionBuilder('bitcoincash');
      let txid = fixture.txid;
      let hdnode0 = BITBOX.HDNode.fromXPriv(fixture.xprivs[0]);
      let keyPair0 = hdnode0.keyPair;
      transactionBuilder.addInput(txid, 0, keyPair0);

      let hdnode1 = BITBOX.HDNode.fromXPriv(fixture.xprivs[1]);
      let keyPair1 = hdnode1.keyPair;
      transactionBuilder.addInput(txid, 1, keyPair1);
      // get byte count to calculate fee. paying 1 sat/byte
      let byteCount = BITBOX.BitcoinCash.getByteCount({ P2PKH: 2 }, { P2PKH: 1 });
      // original amount of satoshis in vin
      let originalAmount = fixture.amount;
      // amount to send to receiver. It's the original amount - 1 sat/byte for tx size
      let sendAmount = originalAmount - byteCount;
      // add output w/ address and amount to send
      transactionBuilder.addOutput(fixture.outputs[0], sendAmount);

      transactionBuilder.sign(0, originalAmount / 2);
      transactionBuilder.sign(1, originalAmount / 2);
      // build tx
      let tx = transactionBuilder.build();
      // output rawhex
      let hex = tx.toHex();
      assert.equal(hex, fixture.hex);
    });
  });
});
