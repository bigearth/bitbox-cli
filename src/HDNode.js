import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';
let bip32utils = require('bip32-utils')

class HDNode {
  fromSeedBuffer(rootSeedBuffer, network = 'bitcoin') {
    return Bitcoin.HDNode.fromSeedBuffer(rootSeedBuffer, Bitcoin.networks[network]);
  }

  fromSeedHex(rootSeedHex, network = 'bitcoin') {
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

  fromWIF(privateKeyWIF) {
    let network;
    if(privateKeyWIF[0] === 'L' || privateKeyWIF[0] === 'K') {
      network = 'bitcoin';
    } else if(privateKeyWIF[0] === 'c') {
      network = 'testnet';
    }
    return Bitcoin.ECPair.fromWIF(privateKeyWIF, Bitcoin.networks[network]);
  }

  createAccount(hdNodes) {
    let arr = hdNodes.map((item, index) => {
      return new bip32utils.Chain(item.neutered())
    });
    return new bip32utils.Account(arr);
  }
  //
  // createChain(hdNode) {
  //   return new bip32utils.Chain(hdNode);
  // }
}

export default HDNode;
