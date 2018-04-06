import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';
let bip32utils = require('bip32-utils')

class HDNode {
  fromSeedBuffer(rootSeedBuffer, network = 'bitcoincash') {
    if(network === 'bitcoincash') {
      network = 'bitcoin';
    }
    return Bitcoin.HDNode.fromSeedBuffer(rootSeedBuffer, Bitcoin.networks[network]);
  }

  fromSeedHex(rootSeedHex, network = 'bitcoincash') {
    if(network === 'bitcoincash') {
      network = 'bitcoin';
    }
    return Bitcoin.HDNode.fromSeedBuffer(Buffer.from(rootSeedHex, 'hex'), Bitcoin.networks[network]);
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

  toPublicKeyBuffer(hdNode) {
    return hdNode.getPublicKeyBuffer();
  }

  toPublicKeyHex(hdNode) {
    return hdNode.getPublicKeyBuffer().toString('hex');
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

  createAccount(hdNodes) {
    let arr = hdNodes.map((item, index) => {
      return new bip32utils.Chain(item.neutered())
    });
    return new bip32utils.Account(arr);
  }

  signHex(hdnode, hex) {
    return hdnode.sign(Buffer.from(hex, 'hex'));
  }

  signBuffer(hdnode, buffer) {
    return hdnode.sign(buffer);
  }

  verifyHex(hdnode, hex, signature) {
    return hdnode.verify(Buffer.from(hex, 'hex'), signature);
  }

  verifyBuffer(hdnode, buffer, signature) {
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

  //
  // createChain(hdNode) {
  //   return new bip32utils.Chain(hdNode);
  // }
}

export default HDNode;
