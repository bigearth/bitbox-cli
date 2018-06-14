import Bitcoin from 'bitcoincashjs-lib';
import bchaddr from 'bchaddrjs';
import sb from 'satoshi-bitcoin';
import bitcoinMessage from 'bitcoinjs-message';
import bs58 from 'bs58';
import bip21 from 'bip21';
import coininfo from'coininfo';
import bip38 from 'bip38';
import wif from 'wif';

let Buffer = require('safe-buffer').Buffer

class BitcoinCash {
  // Translate coins to satoshi value
  toSatoshi(coins) {
    return sb.toSatoshi(coins);
  }

  // Translate satoshi to coin value
  toBitcoinCash(satoshis) {
    return sb.toBitcoin(satoshis);
  }

  // Translate satoshi to bits denomination
  toBits(satoshis) {
    return parseFloat(satoshis) / 100000;
  }

  // Translate bits to satoshi denomination
  fromBits(bits) {
    return Math.ceil(bits * 100000);
  }

  // sign message
  signMessageWithPrivKey(privateKeyWIF, message) {
    let network = privateKeyWIF.charAt(0) === 'c' ? 'testnet' : 'bitcoincash';
    let bitcoincash;
    if(network === 'bitcoincash') {
      bitcoincash = coininfo.bitcoincash.main;
    } else {
      bitcoincash = coininfo.bitcoincash.test;
    }
    let bitcoincashBitcoinJSLib = bitcoincash.toBitcoinJS();
    let keyPair = Bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoincashBitcoinJSLib)
    let privateKey = keyPair.d.toBuffer(32)
    return bitcoinMessage.sign(message, privateKey, keyPair.compressed).toString('base64');
  }

  // verify message
  verifyMessage(address, signature, message) {
    return bitcoinMessage.verify(message, bchaddr.toLegacyAddress(address), signature);
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
    return bip21.encode(bchaddr.toCashAddress(address), options);
  }

  // decode bip21 url
  decodeBIP21(url) {
    return bip21.decode(url);
  }

  getByteCount(inputs, outputs) {
    // from https://github.com/bitcoinjs/bitcoinjs-lib/issues/921#issuecomment-354394004
    let totalWeight = 0
    let hasWitness = false
    // assumes compressed pubkeys in all cases.
    let types = {
      'inputs': {
        'MULTISIG-P2SH': 49 * 4,
        'MULTISIG-P2WSH': 6 + (41 * 4),
        'MULTISIG-P2SH-P2WSH': 6 + (76 * 4),
        'P2PKH': 148 * 4,
        'P2WPKH': 108 + (41 * 4),
        'P2SH-P2WPKH': 108 + (64 * 4)
      },
      'outputs': {
        'P2SH': 32 * 4,
        'P2PKH': 34 * 4,
        'P2WPKH': 31 * 4,
        'P2WSH': 43 * 4
      }
    }

    Object.keys(inputs).forEach(function(key) {
      if (key.slice(0,8) === 'MULTISIG') {
        // ex. "MULTISIG-P2SH:2-3" would mean 2 of 3 P2SH MULTISIG
        let keyParts = key.split(':')
        if (keyParts.length !== 2) throw new Error('invalid input: ' + key)
        let newKey = keyParts[0]
        let mAndN = keyParts[1].split('-').map(function (item) { return parseInt(item) })

        totalWeight += types.inputs[newKey] * inputs[key]
        let multiplyer = (newKey === 'MULTISIG-P2SH') ? 4 : 1
        totalWeight += ((73 * mAndN[0]) + (34 * mAndN[1])) * multiplyer
      } else {
        totalWeight += types.inputs[key] * inputs[key]
      }
      if (key.indexOf('W') >= 0) hasWitness = true
    })

    Object.keys(outputs).forEach(function(key) {
      totalWeight += types.outputs[key] * outputs[key]
    })

    if (hasWitness) totalWeight += 2

    totalWeight += 10 * 4

    return Math.ceil(totalWeight / 4)
  }

  encryptBIP38(privKeyWIF, passphrase) {
    let decoded = wif.decode(privKeyWIF);

    return bip38.encrypt(decoded.privateKey, decoded.compressed, passphrase);
  }

  decryptBIP38(encryptedKey, passphrase, network = 'mainnet') {
    let decryptedKey = bip38.decrypt(encryptedKey, passphrase);
    let prefix;
    if(network === 'testnet') {
      prefix = 0xEF;
    } else {
      prefix = 0x80;
    }
    return wif.encode(prefix, decryptedKey.privateKey, decryptedKey.compressed) ;
  }
}

export default BitcoinCash;
