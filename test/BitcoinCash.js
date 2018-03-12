let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();


describe('price conversion', () => {
  it('should convert Bitcoin Cash to Satoshis', () => {
    let bitcoinCash = 12.5;
    let satoshis = BITBOX.BitcoinCash.toSatoshi(bitcoinCash);
    assert.equal(satoshis, 1250000000);
  });

  it('should convert Satoshis to Bitcoin Cash', () => {
    let satoshis = 1250000000;
    let bitcoinCash = BITBOX.BitcoinCash.toBitcoinCash(satoshis);
    assert.equal(bitcoinCash, 12.5);
  });
});

describe('address conversion', () => {
  it('should convert base58Check address to cashaddr', () => {
    let base58Check = fixtures.base58check;
    let cashaddr = BITBOX.BitcoinCash.toCashAddress(base58Check);
    assert.equal(cashaddr, fixtures.cashaddr);
  });

  it('should convert cashaddr address to base58Check', () => {
    let cashaddr = fixtures.cashaddr;
    let base58Check = BITBOX.BitcoinCash.toLegacyAddress(cashaddr);
    assert.equal(base58Check, fixtures.base58check);
  });
});

describe('address format detection', () => {
  it('should detect base58Check address', () => {
    let base58Check = fixtures.base58check;
    let isBase58Check = BITBOX.BitcoinCash.isLegacyAddress(base58Check);
    assert.equal(isBase58Check, true);
  });

  it('should detect cashaddr address', () => {
    let cashaddr = fixtures.cashaddr;
    let isCashaddr = BITBOX.BitcoinCash.isCashAddress(cashaddr);
    assert.equal(isCashaddr, true);
  });
});

describe('network detection', () => {
  it('should detect mainnet address', () => {
    let mainnet = fixtures.base58check;
    let isMainnet = BITBOX.BitcoinCash.isMainnetAddress(mainnet);
    assert.equal(isMainnet, true);
  });

  it('should detect testnet address', () => {
    let testnet = fixtures.testnet;
    let isTestnet = BITBOX.BitcoinCash.isTestnetAddress(testnet);
    assert.equal(isTestnet, true);
  });
});

describe('address type detection', () => {
  it('should detect P2PKH address', () => {
    let P2PKH = fixtures.base58check;
    let isP2PKH = BITBOX.BitcoinCash.isP2PKHAddress(P2PKH);
    assert.equal(isP2PKH, true);
  });

  it('should detect P2SH address', () => {
    let P2SH = fixtures.P2SH;
    let isP2SH = BITBOX.BitcoinCash.isP2SHAddress(P2SH);
    assert.equal(isP2SH, true);
  });
});

describe('return address format', () => {
  it('should return base58Check address', () => {
    let base58Check = fixtures.base58check;
    let isBase58Check = BITBOX.BitcoinCash.detectAddressFormat(base58Check);
    assert.equal(isBase58Check, 'legacy');
  });

  it('should return cashaddr address', () => {
    let cashaddr = fixtures.cashaddr;
    let isCashaddr = BITBOX.BitcoinCash.detectAddressFormat(cashaddr);
    assert.equal(isCashaddr, 'cashaddr');
  });
});

describe('return address network', () => {
  it('should return mainnet', () => {
    let mainnet = fixtures.base58check;
    let isMainnet = BITBOX.BitcoinCash.detectAddressNetwork(mainnet);
    assert.equal(isMainnet, 'mainnet');
  });

  it('should return testnet', () => {
    let testnet = fixtures.testnet;
    let isTestnet = BITBOX.BitcoinCash.detectAddressNetwork(testnet);
    assert.equal(isTestnet, 'testnet');
  });
});

describe('return address type', () => {
  it('should return P2PKH', () => {
    let P2PKH = fixtures.base58check;
    let isP2PKH = BITBOX.BitcoinCash.detectAddressType(P2PKH);
    assert.equal(isP2PKH, 'p2pkh');
  });

  it('should return P2SH', () => {
    let P2SH = fixtures.P2SH;
    let isP2SH = BITBOX.BitcoinCash.detectAddressType(P2SH);
    assert.equal(isP2SH, 'p2sh');
  });
});

describe('generate specific length mnemonic', () => {
  it('should generate a 12 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(16);
    assert.lengthOf(mnemonic.split(' '), 12);
  });

  it('should generate a 15 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(20);
    assert.lengthOf(mnemonic.split(' '), 15);
  });

  it('should generate an 18 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(24);
    assert.lengthOf(mnemonic.split(' '), 18);
  });

  it('should generate an 21 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(28);
    assert.lengthOf(mnemonic.split(' '), 21);
  });

  it('should generate an 24 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.entropyToMnemonic(32);
    assert.lengthOf(mnemonic.split(' '), 24);
  });
});

describe('create 512 bit HMAC-SHA512 root seed', () => {
  let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(BITBOX.BitcoinCash.entropyToMnemonic(32), 'password');
  it('should create 64 byte root seed', () => {
    assert.equal(rootSeed.byteLength, 64);
  });

  it('should create root seed hex encoded', () => {
    assert.lengthOf(rootSeed.toString('hex'), 128);
  });
});

describe('create master private key', () => {
  it('should create 32 byte chain code', () => {
    let rootSeed = BITBOX.BitcoinCash.mnemonicToSeed(BITBOX.BitcoinCash.entropyToMnemonic(32), 'password');
    let masterkey = BITBOX.BitcoinCash.fromSeedBuffer(rootSeed);
    assert.equal(masterkey.chainCode.byteLength, 32);
  });
});

describe('sign and verify messages', () => {
  it('should sign a message and produce an 88 character signature in base64 encoding', () => {

    let privateKeyWIF = '5KYZdUEo39z3FPrtuX2QbbwGnNP5zTd7yyr2SC1j299sBCnWjss'
    let message = 'This is an example of a signed message.'

    let signature = BITBOX.BitcoinCash.signMessageWithPrivKey(privateKeyWIF, message)
    assert.equal(signature.length, 88);
  });

  it('should verify a valid signed message', () => {

    let address = '1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN'
    let signature = 'HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE'
    let message = 'This is an example of a signed message.'

    assert.equal(BITBOX.BitcoinCash.verifyMessage(address, signature, message), true);
  });

  it('should not verify a invalid signed message', () => {

    let address = '1HZwkjkeaoZfTSaJxDw6aKkxp45agDiEzN'
    let signature = 'HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE'
    let message = 'This is an example of an invalid message.'

    assert.equal(BITBOX.BitcoinCash.verifyMessage(address, signature, message), false);
  });
});
