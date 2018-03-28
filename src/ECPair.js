import Bitcoin from 'bitcoinjs-lib';

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

  static toPublicKeyBuffer(ecpair) {
    return ecpair.getPublicKeyBuffer();
  }

  static toPublicKeyHex(ecpair) {
    return ecpair.getPublicKeyBuffer().toString('hex');
  }

  static fromPublicKeyBuffer(pubkeyBuffer) {
    return Bitcoin.ECPair.fromPublicKeyBuffer(pubkeyBuffer);
  }

  static fromPublicKeyHex(pubkeyHex) {
    return Bitcoin.ECPair.fromPublicKeyBuffer(Buffer.from(pubkeyHex, 'hex'));
  }
}

export default ECPair;
