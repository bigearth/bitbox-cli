import Bitcoin from 'bitcoinjs-lib';
import BitcoinCash from './BitcoinCash';
import bchaddr from 'bchaddrjs';

class HDNode extends Bitcoin.HDNode {
  static fromSeedBuffer(rootSeedBuffer, network = 'bitcoin') {
    return super.fromSeedBuffer(rootSeedBuffer, Bitcoin.networks[network]);
  }

  static fromSeedHex(rootSeedHex, network = 'bitcoin') {
    return super.fromSeedBuffer(Buffer.from(rootSeedHex, 'hex'), Bitcoin.networks[network]);
  }

  static getLegacyAddress(hdNode) {
    return hdNode.getAddress();
  }

  static getCashAddress(hdNode) {
    return bchaddr.toCashAddress(hdNode.getAddress());
  }

  static toXPub(hdNode) {
    return hdNode.neutered().toBase58();
  }

  static toXPriv(hdNode) {
    return hdNode.toBase58();
  }
}

export default HDNode;
