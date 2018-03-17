let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

function flatten (arrays) {
  return [].concat.apply([], arrays)
}

describe('#generateMnemonic', () => {
  it('should generate a 12 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(128);
    assert.lengthOf(mnemonic.split(' '), 12);
  });

  it('should generate a 15 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(160);
    assert.lengthOf(mnemonic.split(' '), 15);
  });

  it('should generate a 18 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(192);
    assert.lengthOf(mnemonic.split(' '), 18);
  });

  it('should generate an 21 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(224);
    assert.lengthOf(mnemonic.split(' '), 21);
  });

  it('should generate an 24 word mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    assert.lengthOf(mnemonic.split(' '), 24);
  });

  it('should generate an 24 word italian mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256, BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().italian);
    assert.lengthOf(mnemonic.split(' '), 24);
  });
});

describe('#entropyToMnemonic', () => {
  it('should generate a 12 word mnemonic from 16 bytes of entropy', () => {
    let rand = BITBOX.Crypto.randomBytes(16);
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 12);
  });

  it('should generate a 15 word mnemonic from 20 bytes of entropy', () => {
    let rand = BITBOX.Crypto.randomBytes(20);
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 15);
  });

  it('should generate an 18 word mnemonic from 24 bytes of entropy', () => {
    let rand = BITBOX.Crypto.randomBytes(24);
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 18);
  });

  it('should generate an 21 word mnemonic from 28 bytes of entropy', () => {
    let rand = BITBOX.Crypto.randomBytes(28);
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 21);
  });

  it('should generate an 24 word mnemonic from 32 bytes of entropy', () => {
    let rand = BITBOX.Crypto.randomBytes(32);
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic(rand);
    assert.lengthOf(mnemonic.split(' '), 24);
  });

  it('should generate an 24 french word mnemonic 32 bytes of entropy', () => {
    let rand = BITBOX.Crypto.randomBytes(32);
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic(rand, BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().french);
    assert.lengthOf(mnemonic.split(' '), 24);
  });

  fixtures.entropyToMnemonic.forEach((entropy) => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.entropyToMnemonic(entropy.entropy);
    it(`should convert ${entropy.entropy} to ${entropy.mnemonic}`, () => {
      assert.equal(mnemonic, entropy.mnemonic);
    });
  });
});

describe('#mnemonicToEntropy', () => {
  it('should turn a 12 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(128);
    let entropy = BITBOX.BitcoinCash.Mnemonic.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 32);
  });

  it('should turn a 15 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(160);
    let entropy = BITBOX.BitcoinCash.Mnemonic.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 40);
  });

  it('should turn a 18 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(192);
    let entropy = BITBOX.BitcoinCash.Mnemonic.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 48);
  });

  it('should turn a 21 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(224);
    let entropy = BITBOX.BitcoinCash.Mnemonic.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 56);
  });

  it('should turn a 24 word mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let entropy = BITBOX.BitcoinCash.Mnemonic.mnemonicToEntropy(mnemonic);
    assert.lengthOf(entropy, 64);
  });

  it('should turn a 24 word spanish mnemonic to entropy', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256, BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().spanish);
    let entropy = BITBOX.BitcoinCash.Mnemonic.mnemonicToEntropy(mnemonic, BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().spanish);
    assert.lengthOf(entropy, 64);
  });

  fixtures.entropyToMnemonic.forEach((entropy) => {
    let rand = BITBOX.BitcoinCash.Mnemonic.mnemonicToEntropy(entropy.mnemonic);
    it(`should convert ${entropy.mnemonic} to ${entropy.entropy}`, () => {
      assert.equal(rand, entropy.entropy);
    });
  });
});

describe('#validateMnemonic', () => {
  it('fails for a mnemonic that is too short', () => {
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic('mixed winner'), false);
  });

  it('fails for a mnemonic that is too long', () => {
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic('mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cakemixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake'), false);
  });

  it('fails if mnemonic words are not in the word list', () => {
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic('failsauce one two three four five six seven eight nine ten eleven'), false);
  });

  it('validate a 128 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(128);
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic(mnemonic), true);
  });

  it('validate a 160 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(160);
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic(mnemonic), true);
  });

  it('validate a 192 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(192);
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic(mnemonic), true);
  });

  it('validate a 224 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(224);
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic(mnemonic), true);
  });

  it('validate a 256 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic(mnemonic), true);
  });

  it('validate a 256 bit chinese simplified mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256, BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().chinese_simplified);
    assert.equal(BITBOX.BitcoinCash.Mnemonic.validateMnemonic(mnemonic, BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().chinese_simplified), true);
  });
});

describe('#mnemonicToSeedHex', () => {
  it('should create 128 character hex encoded root seed from 128 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(128);
    let seedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });

  it('should create 128 character hex encoded root seed from 160 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(160);
    let seedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });

  it('should create 128 character hex encoded root seed from 192 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(192);
    let seedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });

  it('should create 128 character hex encoded root seed from 224 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(224);
    let seedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });

  it('should create 128 character hex encoded root seed from 256 bit mnemonic ', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let seedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(seedHex, 128);
  });
});

describe('#mnemonicToSeedBuffer', () => {
  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 128 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(128);
    let rootSeedBuffer = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedBuffer(mnemonic, '');
    assert.equal(rootSeedBuffer.byteLength, 64);
  });

  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 160 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(160);
    let rootSeedBuffer = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedBuffer(mnemonic, '');
    assert.equal(rootSeedBuffer.byteLength, 64);
  });

  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 192 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(192);
    let rootSeedBuffer = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedBuffer(mnemonic, '');
    assert.equal(rootSeedBuffer.byteLength, 64);
  });

  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 224 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(224);
    let rootSeedBuffer = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedBuffer(mnemonic, '');
    assert.equal(rootSeedBuffer.byteLength, 64);
  });

  it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 256 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let rootSeedBuffer = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedBuffer(mnemonic, '');
    assert.equal(rootSeedBuffer.byteLength, 64);
  });
});

describe('#mnemonicToSeedHex', () => {
  it('should create a 128 character hex encoded root seed from a 128 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(128);
    let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(rootSeedHex.toString('hex'), 128);
  });

  it('should create a 128 character hex encoded root seed from a 160 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(160);
    let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(rootSeedHex.toString('hex'), 128);
  });

  it('should create a 128 character hex encoded root seed from a 192 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(192);
    let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(rootSeedHex.toString('hex'), 128);
  });

  it('should create a 128 character hex encoded root seed from a 224 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(224);
    let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(rootSeedHex.toString('hex'), 128);
  });

  it('should create a 128 character hex encoded root seed from a 256 bit mnemonic', () => {
    let mnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let rootSeedHex = BITBOX.BitcoinCash.Mnemonic.mnemonicToSeedHex(mnemonic, '');
    assert.lengthOf(rootSeedHex.toString('hex'), 128);
  });
});

describe('#mnemonicWordLists', () => {
  it('return a list of 2048 english words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().english, 2048);
  });

  it('return a list of 2048 japanese words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().japanese, 2048);
  });

  it('return a list of 2048 chinese simplified words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().chinese_simplified, 2048);
  });

  it('return a list of 2048 chinese traditional words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().chinese_traditional, 2048);
  });

  it('return a list of 2048 french words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().french, 2048);
  });

  it('return a list of 2048 italian words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().italian, 2048);
  });

  it('return a list of 2048 korean words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().korean, 2048);
  });

  it('return a list of 2048 spanish words', () => {
    assert.lengthOf(BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().spanish, 2048);
  });
});

describe('#translateMnemonic', () => {
  it('should translate mnemonic from english to chinese_simplified', () => {
    let englishMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let chineseMnemonic = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(englishMnemonic, 'english', 'chinese_simplified')
    let englishMnemonic2 = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(chineseMnemonic, 'chinese_simplified', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to chinese_traditional', () => {
    let englishMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let chineseMnemonic = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(englishMnemonic, 'english', 'chinese_traditional')
    let englishMnemonic2 = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(chineseMnemonic, 'chinese_traditional', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to french', () => {
    let englishMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let frenchMnemonic = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(englishMnemonic, 'english', 'french')
    let englishMnemonic2 = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(frenchMnemonic, 'french', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to italian', () => {
    let englishMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let italianMnemonic = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(englishMnemonic, 'english', 'italian')
    let englishMnemonic2 = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(italianMnemonic, 'italian', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to japanese', () => {
    let englishMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let japaneseMnemonic = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(englishMnemonic, 'english', 'japanese')
    let englishMnemonic2 = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(japaneseMnemonic, 'japanese', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to korean', () => {
    let englishMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let koreanMnemonic = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(englishMnemonic, 'english', 'korean')
    let englishMnemonic2 = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(koreanMnemonic, 'korean', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from english to spanish', () => {
    let englishMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256);
    let spanishMnemonic = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(englishMnemonic, 'english', 'spanish')
    let englishMnemonic2 = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(spanishMnemonic, 'spanish', 'english')
    assert.equal(englishMnemonic, englishMnemonic2);
  });

  it('should translate mnemonic from korean to spanish', () => {
    let koreanWordlist = BITBOX.BitcoinCash.Mnemonic.mnemonicWordLists().korean;
    let koreanMnemonic = BITBOX.BitcoinCash.Mnemonic.generateMnemonic(256, koreanWordlist);
    let spanishMnemonic = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(koreanMnemonic, 'korean', 'spanish')
    let koreanMnemonic2 = BITBOX.BitcoinCash.Mnemonic.translateMnemonic(spanishMnemonic, 'spanish', 'korean')
    assert.equal(koreanMnemonic, koreanMnemonic2);
  });
});

describe('#keypairsFromMnemonic', () => {
  fixtures.keypairsFromMnemonic.forEach((fixture, i) => {
    let keypairs = BITBOX.BitcoinCash.Mnemonic.keypairsFromMnemonic(fixture.mnemonic, 5);
    keypairs.forEach((keypair, j) => {
      it(`Generate keypair from mnemonic`, () => {
        assert.equal(keypair.privateKeyWIF, fixtures.keypairsFromMnemonic[i].output[j].privateKeyWIF);
      });
    });
  });
});
