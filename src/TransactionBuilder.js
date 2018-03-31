import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';

class TransactionBuilder {
  constructor(keyPair, network = 'bitcoincash') {
    this.keyPair = keyPair;
    if(network === 'bitcoincash') {
      network = 'bitcoin';
    }
    this.transaction = new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
  }

  addInput(txid, vin) {
    let defaultSequence = 0xffffffff;
    let pubkey = this.keyPair.getPublicKeyBuffer();
    let pubKeyHashBuffer = Bitcoin.crypto.hash160(pubkey);
    let scriptPubKey = Bitcoin.script.pubKeyHash.output.encode(pubKeyHashBuffer);

    this.transaction.addInput(
      txid,
      vin,
      defaultSequence,
      scriptPubKey
    );
  }

  addOutput(address, amount) {
    this.transaction.addOutput(bchaddr.toLegacyAddress(address), amount);
  }

  sign(vin, originalAmount) {
    this.transaction.enableBitcoinCash(true);

    this.transaction.setVersion(2);

    let sighashAll = 0x01;
    let sighashBitcoinCashBIP143 = 0x40;

    let hashType = sighashAll | sighashBitcoinCashBIP143;

    this.transaction.sign(vin, this.keyPair, null, hashType, originalAmount);
  }

  build() {
    return this.transaction.build();
  }
}

export default TransactionBuilder;
