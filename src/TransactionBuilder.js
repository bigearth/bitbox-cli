import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';

class TransactionBuilder {
  constructor(network = 'bitcoincash') {
    if(network === 'bitcoincash') {
      network = 'bitcoin';
    }
    this.amounts = [];
    this.transaction = new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
  }

  addInput(txid, vin, amount) {
    let defaultSequence = 0xffffffff;
    this.amounts.push(amount)

    this.transaction.addInput(
      txid,
      vin,
      defaultSequence
    );
  }

  addOutput(address, amount) {
    try {
      this.transaction.addOutput(bchaddr.toLegacyAddress(address), amount);
    }
    catch(error) {
      this.transaction.addOutput(address, amount);
    }
  }

  sign(vin, keyPair) {
    this.transaction.enableBitcoinCash(true);

    this.transaction.setVersion(2);

    let sighashAll = 0x01;
    let sighashBitcoinCashBIP143 = 0x40;

    let hashType = sighashAll | sighashBitcoinCashBIP143;

    this.transaction.sign(vin, keyPair, null, hashType, this.amounts[vin]);
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
