import Bitcoin from 'bitcoinjs-lib';
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

  static getPrivateKeyWIF(hdNode) {
    return hdNode.keyPair.toWIF();
  }

  static toXPub(hdNode) {
    return hdNode.neutered().toBase58();
  }

  static toXPriv(hdNode) {
    return hdNode.toBase58();
  }

  static fromXPriv(xpriv) {
    let network;
    if(xpriv[0] === 'x') {
      network = 'mainnet';
    } else if(xpriv[0] === 't') {
      network = 'testnet';
    }
    return Bitcoin.HDNode.fromBase58(xpriv, Bitcoin.networks[network]);
  }

  static fromXPub(xpub) {
    let network;
    if(xpub[0] === 'x') {
      network = 'mainnet';
    } else if(xpub[0] === 't') {
      network = 'testnet';
    }
    return Bitcoin.HDNode.fromBase58(xpub, Bitcoin.networks[network]);
  }
}

export default HDNode;
