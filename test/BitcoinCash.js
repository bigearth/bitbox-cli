let fixtures = require('./fixtures/BitcoinCash.json')
let addressFixtures = require('./fixtures/Address.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

// TODO
// 1. generate testnet p2sh
// 2. generate cashaddr mainnet p2sh
// 3. generate cashaddr testnet p2sh
// 4. create BITBOX fromBase58 method
//   * confirm xpub cannot generate WIF
//   * confirm xpriv can generate WIF
// 5. create fromXPriv method w/ tests and docs
    // 1. mainnet
    //   * confirm xpriv generates address
    //   * confirm xpriv generates WIF
    // 2. testnet
    //   * confirm xpriv generates address
    //   * confirm xpriv generates WIF
// 6. More error test cases.

function flatten (arrays) {
  return [].concat.apply([], arrays)
}

let XPUBS = flatten([
  addressFixtures.mainnetXPub,
  addressFixtures.testnetXPub
])

describe('price conversion', () => {
  describe('#toBitcoinCash', () => {
    fixtures.conversion.toBCH.satoshis.forEach((satoshi) => {
      it(`should convert ${satoshi[0]} Satoshis to ${satoshi[1]} $BCH`, () => {
        assert.equal(BITBOX.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1]);
      });
    });

    fixtures.conversion.toBCH.strings.forEach((satoshi) => {
      it(`should convert "${satoshi[0]}" Satoshis as a string to ${satoshi[1]} $BCH`, () => {
        assert.equal(BITBOX.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1]);
      });
    });

    fixtures.conversion.toBCH.not.forEach((bch) => {
      it(`converts ${bch[0]} to Bitcoin Cash, not to ${bch[1]} Satoshi`, () => {
        assert.notEqual(BITBOX.BitcoinCash.toBitcoinCash(bch[0]), bch[1]);
      });
    });

    fixtures.conversion.toBCH.rounding.forEach((satoshi) => {
      it(`rounding ${satoshi[0]} to ${satoshi[1]} $BCH`, () => {
        assert.equal(BITBOX.BitcoinCash.toBitcoinCash(satoshi[0]), satoshi[1]);
      });
    });
  });

  describe('#toSatoshi', () => {
    fixtures.conversion.toSatoshi.bch.forEach((bch) => {
      it(`should convert ${bch[0]} $BCH to ${bch[1]} Satoshis`, () => {
        assert.equal(BITBOX.BitcoinCash.toSatoshi(bch[0]), bch[1]);
      });
    });

    fixtures.conversion.toSatoshi.strings.forEach((bch) => {
      it(`should convert "${bch[0]}" $BCH as a string to ${bch[1]} Satoshis`, () => {
        assert.equal(BITBOX.BitcoinCash.toSatoshi(bch[0]), bch[1]);
      });
    });

    fixtures.conversion.toSatoshi.not.forEach((satoshi) => {
      it(`converts ${satoshi[0]} to Satoshi, not to ${satoshi[1]} Bitcoin Cash`, () => {
        assert.notEqual(BITBOX.BitcoinCash.toSatoshi(satoshi[0]), satoshi[1]);
      });
    });

    fixtures.conversion.toSatoshi.rounding.forEach((bch) => {
      it(`rounding ${bch[0]} to ${bch[1]} Satoshi`, () => {
        assert.equal(BITBOX.BitcoinCash.toSatoshi(bch[0]), bch[1]);
      });
    });
  });
});

describe('sign and verify messages', () => {
  describe('#signMessageWithPrivKey', () => {
    fixtures.signatures.sign.forEach((sign) => {
      it(`should sign a message w/ ${sign.network} ${sign.privateKeyWIF}`, () => {
        let privateKeyWIF = sign.privateKeyWIF;
        let message = sign.message;
        let signature = BITBOX.BitcoinCash.signMessageWithPrivKey(privateKeyWIF, message)
        assert.equal(signature, sign.signature);
      });
    });
  });

  describe('#verifyMessage', () => {
    fixtures.signatures.verify.forEach((sign) => {
      it(`should verify a valid signed message from ${sign.network} cashaddr address ${sign.address}`, () => {
        assert.equal(BITBOX.BitcoinCash.verifyMessage(sign.address, sign.signature, sign.message), true);
      });
    });

    fixtures.signatures.verify.forEach((sign) => {
      let legacyAddress = BITBOX.BitcoinCash.Address.toLegacyAddress(sign.address);
      it(`should verify a valid signed message from ${sign.network} legacy address ${legacyAddress}`, () => {
        assert.equal(BITBOX.BitcoinCash.verifyMessage(legacyAddress, sign.signature, sign.message), true);
      });
    });

    fixtures.signatures.verify.forEach((sign) => {
      let legacyAddress = BITBOX.BitcoinCash.Address.toLegacyAddress(sign.address);
      it(`should not verify an invalid signed message from ${sign.network} cashaddr address ${sign.address}`, () => {
        assert.equal(BITBOX.BitcoinCash.verifyMessage(sign.address, sign.signature, 'nope'), false);
      });
    });
  });
});

describe('#fromXPub', () => {
  XPUBS.forEach((xpub, i) => {
    xpub.addresses.forEach((address, j) => {
      it(`generate public external change address ${j} for ${xpub.xpub}`, () => {
        assert.equal(BITBOX.BitcoinCash.fromXPub(xpub.xpub, j), address);
      });
    });
  });
});

describe('encode and decode to base58Check', () => {
  describe('#encodeBase58Check', () => {
    fixtures.encodeBase58Check.forEach((base58Check, i) => {
      it(`encode ${base58Check.hex} as base58Check ${base58Check.base58Check}`, () => {
        assert.equal(BITBOX.BitcoinCash.encodeBase58Check(base58Check.hex), base58Check.base58Check);
      });
    });
  });

  describe('#decodeBase58Check', () => {
    fixtures.encodeBase58Check.forEach((base58Check, i) => {
      it(`decode ${base58Check.base58Check} as ${base58Check.hex}`, () => {
        assert.equal(BITBOX.BitcoinCash.decodeBase58Check(base58Check.base58Check), base58Check.hex);
      });
    });
  });
});

describe('encode and decode BIP21 urls', () => {
  describe('#encodeBIP21', () => {
    fixtures.bip21.valid.forEach((bip21, i) => {
      it(`encode ${bip21.address} as url`, () => {
        let url = BITBOX.BitcoinCash.encodeBIP21(bip21.address, bip21.options)
        assert.equal(url, bip21.url);
      });
    });
  });

  describe('#decodeBIP21', () => {
    fixtures.bip21.valid.forEach((bip21, i) => {
      it(`decodes ${bip21.url}`, () => {
        let decoded = BITBOX.BitcoinCash.decodeBIP21(bip21.url);
        assert.equal(decoded.options.amount, bip21.options.amount);
        assert.equal(decoded.options.label, bip21.options.label);
        assert.equal(BITBOX.BitcoinCash.Address.toCashAddress(decoded.address), BITBOX.BitcoinCash.Address.toCashAddress(bip21.address));
      });
    });
  });
});
