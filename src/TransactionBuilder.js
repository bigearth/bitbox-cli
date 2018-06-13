import Bitcoin from 'bitcoincashjs-lib';
import bchaddr from 'bchaddrjs';
import coininfo from'coininfo';
import bip68 from 'bip68';

class TransactionBuilder {
  constructor(network = 'bitcoincash') {
    let bitcoincash;
    if(network === 'bitcoincash') {
      bitcoincash = coininfo.bitcoincash.main;
    } else {
      bitcoincash = coininfo.bitcoincash.test;
    }
    let bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS();
    this.transaction = new Bitcoin.TransactionBuilder(bitcoincashBitcoinJSLib);
    this.DEFAULT_SEQUENCE = 0xffffffff;
    this.hashTypes = {
      SIGHASH_ALL: 0x01,
      SIGHASH_NONE: 0x02,
      SIGHASH_SINGLE: 0x03,
      SIGHASH_ANYONECANPAY: 0x80,
      SIGHASH_BITCOINCASH_BIP143: 0x40,
      ADVANCED_TRANSACTION_MARKER: 0x00,
      ADVANCED_TRANSACTION_FLAG: 0x01
    };
    this.bip68 = bip68;
  }

  addInput(txHash, vout, sequence = this.DEFAULT_SEQUENCE, prevOutScript) {
    this.transaction.addInput(
      txHash,
      vout,
      sequence,
      prevOutScript
    );
  }

  addOutput(scriptPubKey, amount) {
    try {
      this.transaction.addOutput(bchaddr.toLegacyAddress(scriptPubKey), amount);
    }
    catch(error) {
      this.transaction.addOutput(scriptPubKey, amount);
    }
  }

  sign(vin, keyPair, redeemScript, hashType = this.hashTypes.SIGHASH_ALL, value) {
    let witnessScript;

    this.transaction.sign(vin, keyPair, redeemScript, hashType, value, witnessScript);
  }

  build() {
    return this.transaction.build();
  }
}

export default TransactionBuilder;
