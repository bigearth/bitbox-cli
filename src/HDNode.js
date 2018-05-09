import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';
// let bip32utils = require('bip32-utils')

class HDNode {
  fromSeed(rootSeedBuffer, network = 'bitcoincash') {
    if(network === 'bitcoincash') {
      network = 'bitcoin';
    }
    return Bitcoin.HDNode.fromSeedBuffer(rootSeedBuffer, Bitcoin.networks[network]);
  }

  toLegacyAddress(hdNode) {
    return hdNode.getAddress();
  }

  toCashAddress(hdNode) {
    return bchaddr.toCashAddress(hdNode.getAddress());
  }

  toWIF(hdNode) {
    return hdNode.keyPair.toWIF();
  }

  toXPub(hdNode) {
    return hdNode.neutered().toBase58();
  }

  toXPriv(hdNode) {
    return hdNode.toBase58();
  }

  toKeyPair(hdNode) {
    return hdNode.keyPair;
  }

  toPublicKey(hdNode) {
    return hdNode.getPublicKeyBuffer();
  }

  fromXPriv(xpriv) {
    let network;
    if(xpriv[0] === 'x') {
      network = 'bitcoin';
    } else if(xpriv[0] === 't') {
      network = 'testnet';
    }
    return Bitcoin.HDNode.fromBase58(xpriv, Bitcoin.networks[network]);
  }

  fromXPub(xpub) {
    let network;
    if(xpub[0] === 'x') {
      network = 'bitcoin';
    } else if(xpub[0] === 't') {
      network = 'testnet';
    }
    return Bitcoin.HDNode.fromBase58(xpub, Bitcoin.networks[network]);
  }
  //
  // createAccount(hdNodes) {
  //   let arr = hdNodes.map((item, index) => {
  //     return new bip32utils.Chain(item.neutered())
  //   });
  //   return new bip32utils.Account(arr);
  // }

  derivePath(hdnode, path) {
    return hdnode.derivePath(path);
  }

  derive(hdnode, path) {
    return hdnode.derive(path);
  }

  deriveHardened(hdnode, path) {
    return hdnode.deriveHardened(path);
  }

  sign(hdnode, buffer) {
    return hdnode.sign(buffer);
  }

  verify(hdnode, buffer, signature) {
    return hdnode.verify(buffer, signature);
  }

  isPublic(hdnode) {
    return hdnode.isNeutered();
  }

  isPrivate(hdnode) {
    return !hdnode.isNeutered();
  }

  toIdentifier(hdnode) {
    return hdnode.getIdentifier();
  }

  fromBase58(base58, network) {
    return Bitcoin.HDNode.fromBase58(base58, network);
  }

  //
  // createChain(hdNode) {
  //   return new bip32utils.Chain(hdNode);
  // }
}

export default HDNode;
