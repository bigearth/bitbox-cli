'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Address from '../models/Address';


var _Crypto = require('./Crypto');

var _Crypto2 = _interopRequireDefault(_Crypto);

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _bip = require('bip39');

var _bip2 = _interopRequireDefault(_bip);

var _bchaddrjs = require('bchaddrjs');

var _bchaddrjs2 = _interopRequireDefault(_bchaddrjs);

var _satoshiBitcoin = require('satoshi-bitcoin');

var _satoshiBitcoin2 = _interopRequireDefault(_satoshiBitcoin);

var _bitcoinjsMessage = require('bitcoinjs-message');

var _bitcoinjsMessage2 = _interopRequireDefault(_bitcoinjsMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// let bitcore = require('bitcore-lib');


var BitcoinCash = function () {
  function BitcoinCash() {
    _classCallCheck(this, BitcoinCash);
  }

  _createClass(BitcoinCash, null, [{
    key: 'entropyToMnemonic',
    value: function entropyToMnemonic() {
      var bytes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;

      // Generate cryptographically strong pseudo-random data.
      // The bytes argument is a number indicating the number of bytes to generate.
      // Uses the NodeJS crypto lib. More info: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
      var randomBytes = _Crypto2.default.randomBytes(bytes);

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

      return _bip2.default.entropyToMnemonic(randomBytes);
    }
  }, {
    key: 'mnemonicToSeed',
    value: function mnemonicToSeed(mnemonic) {
      var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      return _bip2.default.mnemonicToSeed(mnemonic, password);
    }

    // Translate coins to satoshi value

  }, {
    key: 'toSatoshi',
    value: function toSatoshi(coins) {
      return _satoshiBitcoin2.default.toSatoshi(coins);
    }

    // Translate satoshi to coin value

  }, {
    key: 'toBitcoinCash',
    value: function toBitcoinCash(satoshis) {
      return _satoshiBitcoin2.default.toBitcoin(satoshis);
    }

    // Translate address from any address format into a specific format.

  }, {
    key: 'toLegacyAddress',
    value: function toLegacyAddress(address) {
      return _bchaddrjs2.default.toLegacyAddress(address);
    }
  }, {
    key: 'toCashAddress',
    value: function toCashAddress(address) {
      return _bchaddrjs2.default.toCashAddress(address);
    }

    // Test for address format.

  }, {
    key: 'isLegacyAddress',
    value: function isLegacyAddress(address) {
      return _bchaddrjs2.default.isLegacyAddress(address);
    }
  }, {
    key: 'isCashAddress',
    value: function isCashAddress(address) {
      return _bchaddrjs2.default.isCashAddress(address);
    }

    // Test for address network.

  }, {
    key: 'isMainnetAddress',
    value: function isMainnetAddress(address) {
      return _bchaddrjs2.default.isMainnetAddress(address);
    }
  }, {
    key: 'isTestnetAddress',
    value: function isTestnetAddress(address) {
      return _bchaddrjs2.default.isTestnetAddress(address);
    }

    // Test for address type.

  }, {
    key: 'isP2PKHAddress',
    value: function isP2PKHAddress(address) {
      return _bchaddrjs2.default.isP2PKHAddress(address);
    }
  }, {
    key: 'isP2SHAddress',
    value: function isP2SHAddress(address) {
      return _bchaddrjs2.default.isP2SHAddress(address);
    }

    // Detect address format.

  }, {
    key: 'detectAddressFormat',
    value: function detectAddressFormat(address) {
      return _bchaddrjs2.default.detectAddressFormat(address);
    }

    // Detect address network.

  }, {
    key: 'detectAddressNetwork',
    value: function detectAddressNetwork(address) {
      return _bchaddrjs2.default.detectAddressNetwork(address);
    }

    // Detect address type.

  }, {
    key: 'detectAddressType',
    value: function detectAddressType(address) {
      return _bchaddrjs2.default.detectAddressType(address);
    }

    // sign message

  }, {
    key: 'signMessageWithPrivKey',
    value: function signMessageWithPrivKey(privateKeyWIF, message) {
      var keyPair = _bitcoinjsLib2.default.ECPair.fromWIF(privateKeyWIF);
      var privateKey = keyPair.d.toBuffer(32);
      return _bitcoinjsMessage2.default.sign(message, privateKey, keyPair.compressed).toString('base64');
    }

    // verify message

  }, {
    key: 'verifyMessage',
    value: function verifyMessage(address, signature, message) {
      return _bitcoinjsMessage2.default.verify(message, BitcoinCash.toLegacyAddress(address), signature);
    }

    //
    // static entropyToMnemonic(bytes = 16) {
    //   // Generate cryptographically strong pseudo-random data.
    //   // The bytes argument is a number indicating the number of bytes to generate.
    //   // Uses the NodeJS crypto lib. More info: https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    //   let randomBytes = Crypto.randomBytes(bytes);
    //
    //   // Create BIP 39 compliant mnemonic w/ entropy
    //   // Entropy (bits/bytes)	Checksum (bits)	Entropy + checksum (bits)	Mnemonic length (words)
    //   // 128/16               4               132                       12
    //   //
    //   // 160/20               5               165                       15
    //   //
    //   // 192/24               6               198                       18
    //   //
    //   // 224/28               7               231                       21
    //   //
    //   // 256/32               8               264                       24
    //
    //   return BIP39.entropyToMnemonic(randomBytes);
    // }
    //
    // static mnemonicToSeed(mnemonic, password = '') {
    //   // create BIP 39 compliant
    //   return BIP39.mnemonicToSeed(mnemonic, password);
    // }
    //
    // static fromSeedBuffer(rootSeed, network = 'bitcoin') {
    //   return Bitcoin.HDNode.fromSeedBuffer(rootSeed, Bitcoin.networks[network]);
    // }
    //
    // static fromWIF(privateKeyWIF, network = 'bitcoin') {
    //   return Bitcoin.ECPair.fromWIF(privateKeyWIF, Bitcoin.networks[network]);
    // }
    //
    // static ECPair() {
    //   return Bitcoin.ECPair;
    // }
    //
    // static address() {
    //   return Bitcoin.address;
    // }
    //
    // static script() {
    //   return Bitcoin.script;
    // }
    //
    // static transaction() {
    //   return Bitcoin.Transaction;
    // }
    //
    // static transactionBuilder(network = 'bitcoin') {
    //   return new Bitcoin.TransactionBuilder(Bitcoin.networks[network]);
    // }
    //
    // static fromTransaction() {
    //   return Bitcoin.TransactionBuilder;
    // }
    //
    //
    // static createHDWallet(config) {
    //   // nore info: https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch05.asciidoc
    //
    //   let mnemonic = config.mnemonic;
    //   if(config.autogenerateHDMnemonic) {
    //     // create a random mnemonic w/ user provided entropy size
    //     mnemonic = BitcoinCash.entropyToMnemonic(config.entropy);
    //   }
    //
    //   // create 512 bit HMAC-SHA512 root seed
    //   let rootSeed = BitcoinCash.mnemonicToSeed(mnemonic, config.password);
    //
    //   // create master private key
    //   let masterPrivateKey = BitcoinCash.fromSeedBuffer(rootSeed, config.network);
    //
    //   let HDPath = `m/${config.HDPath.purpose}/${config.HDPath.coinCode}`
    //
    //   let accounts = [];
    //
    //   for (let i = 0; i < config.totalAccounts; i++) {
    //     // create accounts
    //     // follow BIP 44 account discovery algo https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki#account-discovery
    //     let account = masterPrivateKey.derivePath(`${HDPath.replace(/\/$/, "")}/${i}'`);
    //     // console.log('account', account);
    //     let xpriv = account.toBase58();
    //     let xpub = account.neutered().toBase58();
    //     let address = masterPrivateKey.derivePath(`${HDPath.replace(/\/$/, "")}/${i}'/${config.HDPath.change}/${config.HDPath.address_index}`);
    //     // let xPubNode = Bitcoin.HDNode.fromBase58(xpub);
    //
    //     var HdPublicKey = new bitcore.HDPublicKey.fromString(xpub);
    //     for (let j = 0; j < 1; j++) {
    //       // console.log('asdasfd', j)
    //       var derivedPublicKey = HdPublicKey.derive("m/0/"+j).publicKey;
    //       var addy = derivedPublicKey.toAddress();
    //       console.log('bitcore addy', BitcoinCash.toCashAddress(addy.toString()));
    //     }
    //     // console.log('xPubNode', xPubNode);
    //     // console.log('yay', xPubNode.derive(xPubNode.chainCode));
    //     console.log('---------')
    //     accounts.push({
    //       title: '',
    //       privateKeyWIF: address.keyPair.toWIF(),
    //       xpriv: xpriv,
    //       xpub: xpub,
    //       index: i
    //     });
    //     // addresses.push(new Address(BitcoinCash.toCashAddress(account.derive(i).getAddress()), account.derive(i).keyPair.toWIF()));
    //   };
    //
    //   return [rootSeed, masterPrivateKey, mnemonic, config.HDPath, accounts];
    // }
    //
    // static signMessage(message, privateKeyWIF) {
    //
    //   let keyPair;
    //   let errorMsg = '';
    //   try {
    //     keyPair = BitcoinCash.fromWIF(privateKeyWIF);
    //   } catch (e) {
    //     errorMsg = e.message;
    //   }
    //
    //   if(errorMsg !== '') {
    //     return errorMsg;
    //   }
    //
    //   let privateKey = keyPair.d.toBuffer(32);
    //   let signature = BitcoinCash.sign(message, privateKey, keyPair);
    //   let signature1 = signature.toString('base64')
    //   return signature1;
    // }
    // static returnPrivateKeyWIF(pubAddress, addresses) {
    //   let privateKeyWIF;
    //   let errorMsg = '';
    //   try {
    //     addresses.forEach((address, index) => {
    //       if(BitcoinCash.toLegacyAddress(pubAddress) === BitcoinCash.fromWIF(address.privateKeyWIF).getAddress()) {
    //         privateKeyWIF = address.privateKeyWIF;
    //       }
    //     });
    //   } catch (e) {
    //     errorMsg = e.message;
    //   }
    //
    //   if(errorMsg !== '') {
    //     return errorMsg;
    //   } else {
    //     return privateKeyWIF;
    //   }
    // }
    //
    // static createMultiSig(nrequired, keys, addresses, wallet) {
    //   let keyPairs = [];
    //   let pubKeys = [];
    //   keys.forEach((key, index) => {
    //     if(key.toString('hex').length === 66) {
    //       pubKeys.push(key);
    //     } else {
    //       let privkeyWIF = BitcoinCash.returnPrivateKeyWIF(key, addresses);
    //       keyPairs.push(BitcoinCash.fromWIF(privkeyWIF, wallet.network))
    //     }
    //   })
    //
    //   keyPairs.forEach((key, index) => {
    //     pubKeys.push(key.getPublicKeyBuffer());
    //   })
    //   pubKeys.map((hex) => { return Buffer.from(hex, 'hex') })
    //
    //   let redeemScript = Bitcoin.script.multisig.output.encode(nrequired, pubKeys)
    //   let scriptPubKey = Bitcoin.script.scriptHash.output.encode(Bitcoin.crypto.hash160(redeemScript))
    //   let address = Bitcoin.address.fromOutputScript(scriptPubKey)
    //
    //   return {
    //     address: address,
    //     redeemScript: redeemScript
    //   };
    // }

  }]);

  return BitcoinCash;
}();

exports.default = BitcoinCash;