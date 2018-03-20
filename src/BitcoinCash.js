import Crypto from './Crypto';
import HDNode from './HDNode';
import Address from './Address';
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
    this.Address = new Address();
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

  // Translate coins to satoshi value
  toSatoshi(coins) {
    return sb.toSatoshi(coins);
  }

  // Translate satoshi to coin value
  toBitcoinCash(satoshis) {
    return sb.toBitcoin(satoshis);
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
    return bitcoinMessage.verify(message, this.Address.toLegacyAddress(address), signature);
  }

  // encode base58Check
  encodeBase58Check(hex) {
    return bs58.encode(Buffer.from(hex, 'hex'));
  }

  // decode base58Check
  decodeBase58Check(address) {
    return bs58.decode(address).toString('hex');
  }

  // encode bip21 url
  encodeBIP21(address, options) {
    return bip21.encode(this.Address.toCashAddress(address), options);
  }

  // decode bip21 url
  decodeBIP21(url) {
    return bip21.decode(url);
  }
}

export default BitcoinCash;
