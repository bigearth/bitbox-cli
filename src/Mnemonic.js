import Crypto from './Crypto';

import BIP39 from 'bip39';
import randomBytes from 'randombytes';
import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';

class Mnemonic {
  generateMnemonic(bits = 128, wordlist) {
    return BIP39.generateMnemonic(bits, randomBytes, wordlist);
  }

  entropyToMnemonic(bytes = 16, wordlist) {
    // Generate cryptographically strong pseudo-random data.
    // The bytes argument is a number indicating the number of bytes to generate.
    // Uses the NodeJS crypto lib. More info: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    let randomBytes;
    if(typeof bytes === 'number') {
      randomBytes = Crypto.randomBytes(bytes);
    } else if(typeof bytes === 'string') {
      randomBytes = bytes;
    }
    // Create BIP 39 compliant mnemonic w/ entropy
    // Entropy (bits/bytes)	Checksum (bits)	Entropy + checksum (bits)	Mnemonic length (words)
    // 128/16               4               132                       12
    //
    // 160/20               5               165                       15
    //
    // 192/24               6               198                       18
    //
    // 224/28               7               231                       21
    //
    // 256/32               8               264                       24

    return BIP39.entropyToMnemonic(randomBytes, wordlist);
  }

  mnemonicToEntropy(mnemonic, wordlist) {
    return BIP39.mnemonicToEntropy(mnemonic, wordlist);
  }

  validateMnemonic(mnemonic, wordlist) {
    return BIP39.validateMnemonic(mnemonic, wordlist);
  }

  mnemonicToSeedHex(mnemonic, password = '') {
    return BIP39.mnemonicToSeedHex(mnemonic, password);
  }

  mnemonicToSeedBuffer(mnemonic, password = '') {
    return BIP39.mnemonicToSeed(mnemonic, password);
  }

  translateMnemonic(mnemonic, from = 'english', to = 'english') {
    let fromWordlist = this.mnemonicWordLists()[from.toLowerCase()];
    let toWordlist = this.mnemonicWordLists()[to.toLowerCase()];
    let entropy = this.mnemonicToEntropy(mnemonic, fromWordlist);
    return this.entropyToMnemonic(entropy, toWordlist);
  }

  mnemonicWordLists() {
    return BIP39.wordlists;
  }

  keypairsFromMnemonic(mnemonic, numberOfKeypairs = 1) {
    let rootSeedBuffer = this.mnemonicToSeedBuffer(mnemonic, '');
    let hdNode = Bitcoin.HDNode.fromSeedBuffer(rootSeedBuffer);
    let HDPath = `44'/145'/0'/0/`

    let accounts = [];

    for (let i = 0; i < numberOfKeypairs; i++) {
      let childHDNode = hdNode.derivePath(`${HDPath}${i}`);
      accounts.push(
        {
          privateKeyWIF: childHDNode.keyPair.toWIF(),
          address: bchaddr.toCashAddress(childHDNode.getAddress())
        }
      )
    };
    return accounts;
  }
}

export default Mnemonic;
