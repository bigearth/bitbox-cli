// import Address from '../models/Address';
import Crypto from './Crypto';
import HDNode from './HDNode';
import Mnemonic from './Mnemonic';

import Bitcoin from 'bitcoinjs-lib';
import bchaddr from 'bchaddrjs';
import sb from 'satoshi-bitcoin';
import bitcoinMessage from 'bitcoinjs-message';
import randomBytes from 'randombytes';
import bs58 from 'bs58';
import bip21 from 'bip21';

class BitcoinCash {
  constructor() {
    this.HDNode = HDNode;
    this.Mnemonic = new Mnemonic();
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
    let rootSeedBuffer = this.mnemonicToSeedBuffer(mnemonic, config.password);

    // create master private key
    let masterHDNode = this.HDNode.fromSeedBuffer(rootSeedBuffer, config.network);

    let HDPath = `m/${config.HDPath.purpose}/${config.HDPath.coinCode}`

    let accounts = [];

    for (let i = 0; i < config.totalAccounts; i++) {
      // create accounts
      // follow BIP 44 account discovery algo https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#account-discovery
      let account = masterHDNode.derivePath(`${HDPath.replace(/\/$/, "")}/${i}'`);
      let xpriv = this.HDNode.toXPriv(account);
      let xpub = this.HDNode.toXPub(account);
      let address = masterHDNode.derivePath(`${HDPath.replace(/\/$/, "")}/${i}'/${config.HDPath.change}/${config.HDPath.address_index}`);

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

    return [rootSeedBuffer, masterHDNode, mnemonic, config.HDPath, accounts];
  }

  fromXPub(xpub, index = 0) {
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
