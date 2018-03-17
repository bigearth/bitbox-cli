// import Address from '../models/Address';
import Crypto from './Crypto';
import HDNode from './HDNode';

import Bitcoin from 'bitcoinjs-lib';
import BIP39 from 'bip39';
import bchaddr from 'bchaddrjs';
import sb from 'satoshi-bitcoin';
import bitcoinMessage from 'bitcoinjs-message';
import randomBytes from 'randombytes';
import bs58 from 'bs58';
import bip21 from 'bip21';

class BitcoinCash {
  constructor() {
    this.HDNode = HDNode;
  }

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

  fromWIF(privateKeyWIF, network = 'bitcoin') {
    return Bitcoin.ECPair.fromWIF(privateKeyWIF, Bitcoin.networks[network]);
  }

  ECPair() {
    return Bitcoin.ECPair;
  }

  address() {
    return Bitcoin.address;
  }

  script() {
    return Bitcoin.script;
  }

  transaction() {
    return Bitcoin.Transaction;
  }

  transactionBuilder(network = 'bitcoin') {
    return new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
  }

  fromTransaction() {
    return Bitcoin.TransactionBuilder;
  }

  createHDWallet(config) {
    // nore info: https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch05.asciidoc
    let language = config.language;

    if(!language || (language !== 'chinese_simplified' && language !== 'chinese_traditional' && language !== 'english' && language !== 'french' && language !== 'italian' && language !== 'japanese' && language !== 'korean' && language !== 'spanish')) {
      config.language = 'english';
    }

    let mnemonic = config.mnemonic;
    if(config.autogenerateHDMnemonic) {
      // create a random mnemonic w/ user provided entropy size
      let randomBytes = Crypto.randomBytes(config.entropy);
      mnemonic = this.entropyToMnemonic(randomBytes, this.mnemonicWordLists()[config.language]);
    }

    // create 512 bit HMAC-SHA512 root seed
    let rootSeed = BitcoinCash.mnemonicToSeedBuffer(mnemonic, config.password);

    // create master private key
    let masterPrivateKey = BitcoinCash.hdNodeFromSeedBuffer(rootSeed, config.network);

    let HDPath = `m/${config.HDPath.purpose}/${config.HDPath.coinCode}`

    let accounts = [];

    for (let i = 0; i < config.totalAccounts; i++) {
      // create accounts
      // follow BIP 44 account discovery algo https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#account-discovery
      let account = masterPrivateKey.derivePath(`${HDPath.replace(/\/$/, "")}/${i}'`);
      let xpriv = account.toBase58();
      let xpub = account.neutered().toBase58();
      let address = masterPrivateKey.derivePath(`${HDPath.replace(/\/$/, "")}/${i}'/${config.HDPath.change}/${config.HDPath.address_index}`);

      // TODO: Is this the right privkey?
      accounts.push({
        title: '',
        privateKeyWIF: address.keyPair.toWIF(),
        xpriv: xpriv,
        xpub: xpub,
        index: i
      });
      // addresses.push(new Address(this.mnemonicWordLists(account.derive(i).getAddress()), account.derive(i).keyPair.toWIF()));
    };

    return [rootSeed, masterPrivateKey, mnemonic, config.HDPath, accounts];
  }

  fromXPub(xpub, index = 0) {
    console.log(xpub, index)
    let network;
    if(xpub[0] === 'x') {
      network = 'bitcoin'
    } else {
      network = 'testnet'
    }
    let HDNode = Bitcoin.HDNode.fromBase58(xpub, Bitcoin.networks[network]);
    let address = HDNode.derivePath(`0/${index}`);
    return this.toCashAddress(address.getAddress());
  }

  keypairsFromMnemonic(mnemonic, numberOfKeypairs = 1) {
    let rootSeed = BitcoinCash.mnemonicToSeedBuffer(mnemonic, '');
    let masterPrivateKey = BitcoinCash.hdNodeFromSeedBuffer(rootSeed);
    let HDPath = `m/44'/145'/0'/0/`

    let accounts = [];

    for (let i = 0; i < numberOfKeypairs; i++) {
      let keyPair = masterPrivateKey.derivePath(`${HDPath}${i}`);
      // TODO: confirm HD paths are correct here.
      let address = BitcoinCash.fromWIF(keyPair.keyPair.toWIF()).getAddress();

      accounts.push(
        {
          privateKeyWIF: keyPair.keyPair.toWIF(),
          address: this.mnemonicWordLists(address)
        }
      )
    };
    return accounts;
  }

  // Translate coins to satoshi value
  toSatoshi(coins) {
    return sb.toSatoshi(coins);
  }

  // Translate satoshi to coin value
  toBitcoinCash(satoshis) {
    return sb.toBitcoin(satoshis);
  }

  // Translate address from any address format into a specific format.
  toLegacyAddress(address) {
    return bchaddr.toLegacyAddress(address);
  }

  toCashAddress(address) {
    return bchaddr.toCashAddress(address);
  }

  // Test for address format.
  isLegacyAddress(address) {
    return bchaddr.isLegacyAddress(address);
  }

  isCashAddress(address) {
    return bchaddr.isCashAddress(address);
  }

  // Test for address network.
  isMainnetAddress(address) {
    if(address[0] === 'x') {
      return true
    } else if(address[0] === 't') {
      return false
    } else {
      return bchaddr.isMainnetAddress(address);
    }
  }

  isTestnetAddress(address) {
    if(address[0] === 'x') {
      return false
    } else if(address[0] === 't') {
      return true
    } else {
      return bchaddr.isTestnetAddress(address);
    }
  }

  // Test for address type.
  isP2PKHAddress(address) {
    return bchaddr.isP2PKHAddress(address);
  }

  isP2SHAddress(address) {
    return bchaddr.isP2SHAddress(address);
  }

  // Detect address format.
  detectAddressFormat(address) {
    return bchaddr.detectAddressFormat(address);
  }

  // Detect address network.
  detectAddressNetwork(address) {
    if(address[0] === 'x') {
      return 'mainnet'
    } else if(address[0] === 't') {
      return 'testnet'
    } else {
      return bchaddr.detectAddressNetwork(address);
    }
  }

  // Detect address type.
  detectAddressType(address) {
    return bchaddr.detectAddressType(address);
  }

  // sign message
  signMessageWithPrivKey(privateKeyWIF, message) {
    let network = privateKeyWIF.charAt(0) === 'c' ? 'testnet' : 'bitcoin';
    let keyPair = Bitcoin.ECPair.fromWIF(privateKeyWIF, Bitcoin.networks[network])
    let privateKey = keyPair.d.toBuffer(32)
    return bitcoinMessage.sign(message, privateKey, keyPair.compressed).toString('base64');
  }

  // verify message
  verifyMessage(address, signature, message) {
    return bitcoinMessage.verify(message, this.toLegacyAddress(address), signature);
  }

  // encode base58Check
  encodeBase58Check(bytes) {
    return bs58.encode(bytes);
  }

  // decode base58Check
  decodeBase58Check(address) {
    return bs58.decode(address).toString('hex');
  }

  // encode bip21 url
  encodeBIP21(address, options) {
    return bip21.encode(this.toCashAddress(address), options);
  }

  // decode bip21 url
  decodeBIP21(url) {
    return bip21.decode(url);
  }
}

export default BitcoinCash;
