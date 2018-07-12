import Bitcoin from 'bitcoincashjs-lib';
import bchaddr from 'bchaddrjs';
import coininfo from'coininfo';
import bip66 from 'bip66';
import bip68 from 'bip68';

export default class TransactionBuilder {
  
  bitcoincash: coininfo.bitcoincash.main;
  bitcoincashBitcoinJSLib: bintcoincash.toBitcoinJS;
  transaction: Bitcoin.Transaction;
  DEFAULT_SEQUENCE = 0xfffffff;
  hashTypes:Enumerator;
  bip66 = new bip66();
  bip68 = new bip68();

  constructor(network:string);
  
  addInput(txHash, vout, sequence=string, prevOutScript) {
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