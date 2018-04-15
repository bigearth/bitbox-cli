import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';

class TransactionBuilder {
  constructor(network = 'bitcoincash') {
    if(network === 'bitcoincash') {
      network = 'bitcoin';
    }
    this.transaction = new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
    this.DEFAULT_SEQUENCE = 0xffffffff;
    this.hashTypes = {
      SIGHASH_ALL: 0x01,
      SIGHASH_NONE: 0x02,
      SIGHASH_SINGLE: 0x03,
      SIGHASH_ANYONECANPAY: 0x80,
      SIGHASH_BITCOINCASH_BIP143: 0x40,
      ADVANCED_TRANSACTION_MARKER: 0x00,
      ADVANCED_TRANSACTION_FLAG: 0x01
    }
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

  sign(vin, keyPair, redeemScript, hashType = this.hashTypes.SIGHASH_ALL, witnessValue, witnessScript) {
    this.transaction.enableBitcoinCash(true);

    this.transaction.setVersion(2);

    let ht = hashType | this.hashTypes.SIGHASH_BITCOINCASH_BIP143;

    this.transaction.sign(vin, keyPair, redeemScript, ht, witnessValue, witnessScript);
  }

  build() {
    return this.transaction.build();
  }

  static createMultisigAddress(required, pubKeys) {
    let pks = [];
    pubKeys.forEach((pk) => {
      pks.push(pk);
    });

    let redeemScript = Bitcoin.script.multisig.output.encode(required, pks.map(function (hex) { return Buffer.from(hex, 'hex') }));
    let scriptPubKey = Bitcoin.script.scriptHash.output.encode(Bitcoin.crypto.hash160(redeemScript));
    return bchaddr.toCashAddress(Bitcoin.address.fromOutputScript(scriptPubKey));
  }
}

export default TransactionBuilder;
