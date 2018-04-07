import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';

class ECPair {
  static fromWIF(privateKeyWIF) {
    let network;
    if(privateKeyWIF[0] === 'L' || privateKeyWIF[0] === 'K') {
      network = 'bitcoin';
    } else if(privateKeyWIF[0] === 'c') {
      network = 'testnet';
    }
    return Bitcoin.ECPair.fromWIF(privateKeyWIF, Bitcoin.networks[network]);
  }

  static toWIF(ecpair) {
    return ecpair.toWIF();
  }

  static sign(ecpair, buffer) {
    return ecpair.sign(buffer);
  }

  static verify(ecpair, buffer, signature) {
    return ecpair.verify(buffer, signature);
  }

  static fromPublicKey(pubkeyBuffer) {
    return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer);
  }

  static toPublicKey(ecpair) {
    return ecpair.getPublicKeyBuffer();
  }

  static toLegacyAddress(ecpair) {
    return ecpair.getAddress();
  }

  static toCashAddress(ecpair) {
    return bchaddr.toCashAddress(ecpair.getAddress());
  }
}

export default ECPair;
