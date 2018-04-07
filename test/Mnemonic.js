let fixtures = require('./fixtures/Mnemonic.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

describe('#Mnemonic', () => {
  describe('#generateMnemonic', () => {
    it('should generate a 12 word mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(128);
      assert.lengthOf(mnemonic.split(' '), 12);
    });

    it('should generate a 15 word mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(160);
      assert.lengthOf(mnemonic.split(' '), 15);
    });

    it('should generate a 18 word mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(192);
      assert.lengthOf(mnemonic.split(' '), 18);
    });

    it('should generate an 21 word mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(224);
      assert.lengthOf(mnemonic.split(' '), 21);
    });

    it('should generate an 24 word mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(256);
      assert.lengthOf(mnemonic.split(' '), 24);
    });

    it('should generate an 24 word italian mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(256, BITBOX.Mnemonic.mnemonicWordLists().italian);
      assert.lengthOf(mnemonic.split(' '), 24);
    });
  });

  describe('#entropyToMnemonic', () => {
    it('should generate a 12 word mnemonic from 16 bytes of entropy', () => {
      let rand = BITBOX.Crypto.randomBytes(16);
      let mnemonic = BITBOX.Mnemonic.entropyToMnemonic(rand.toString('hex'));
      assert.lengthOf(mnemonic.split(' '), 12);
    });

    it('should generate a 15 word mnemonic from 20 bytes of entropy', () => {
      let rand = BITBOX.Crypto.randomBytes(20);
      let mnemonic = BITBOX.Mnemonic.entropyToMnemonic(rand.toString('hex'));
      assert.lengthOf(mnemonic.split(' '), 15);
    });

    it('should generate an 18 word mnemonic from 24 bytes of entropy', () => {
      let rand = BITBOX.Crypto.randomBytes(24);
      let mnemonic = BITBOX.Mnemonic.entropyToMnemonic(rand.toString('hex'));
      assert.lengthOf(mnemonic.split(' '), 18);
    });

    it('should generate an 21 word mnemonic from 28 bytes of entropy', () => {
      let rand = BITBOX.Crypto.randomBytes(28);
      let mnemonic = BITBOX.Mnemonic.entropyToMnemonic(rand.toString('hex'));
      assert.lengthOf(mnemonic.split(' '), 21);
    });

    it('should generate an 24 word mnemonic from 32 bytes of entropy', () => {
      let rand = BITBOX.Crypto.randomBytes(32);
      let mnemonic = BITBOX.Mnemonic.entropyToMnemonic(rand.toString('hex'));
      assert.lengthOf(mnemonic.split(' '), 24);
    });

    it('should generate an 24 french word mnemonic 32 bytes of entropy', () => {
      let rand = BITBOX.Crypto.randomBytes(32);
      let mnemonic = BITBOX.Mnemonic.entropyToMnemonic(rand.toString('hex'), BITBOX.Mnemonic.mnemonicWordLists().french);
      assert.lengthOf(mnemonic.split(' '), 24);
    });

    fixtures.entropyToMnemonic.forEach((entropy) => {
      let mnemonic = BITBOX.Mnemonic.entropyToMnemonic(entropy.entropy);
      it(`should convert ${entropy.entropy} to ${entropy.mnemonic}`, () => {
        assert.equal(mnemonic, entropy.mnemonic);
      });
    });
  });

  describe('#mnemonicToEntropy', () => {
    it('should turn a 12 word mnemonic to entropy', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(128);
      let entropy = BITBOX.Mnemonic.mnemonicToEntropy(mnemonic);
      assert.lengthOf(entropy, 16);
    });

    it('should turn a 15 word mnemonic to entropy', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(160);
      let entropy = BITBOX.Mnemonic.mnemonicToEntropy(mnemonic);
      assert.lengthOf(entropy, 20);
    });

    it('should turn a 18 word mnemonic to entropy', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(192);
      let entropy = BITBOX.Mnemonic.mnemonicToEntropy(mnemonic);
      assert.lengthOf(entropy, 24);
    });

    it('should turn a 21 word mnemonic to entropy', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(224);
      let entropy = BITBOX.Mnemonic.mnemonicToEntropy(mnemonic);
      assert.lengthOf(entropy, 28);
    });

    it('should turn a 24 word mnemonic to entropy', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(256);
      let entropy = BITBOX.Mnemonic.mnemonicToEntropy(mnemonic);
      assert.lengthOf(entropy, 32);
    });

    it('should turn a 24 word spanish mnemonic to entropy', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(256, BITBOX.Mnemonic.mnemonicWordLists().spanish);
      let entropy = BITBOX.Mnemonic.mnemonicToEntropy(mnemonic, BITBOX.Mnemonic.mnemonicWordLists().spanish);
      assert.lengthOf(entropy, 32);
    });

    fixtures.entropyToMnemonic.forEach((fixture) => {
      let entropy = BITBOX.Mnemonic.mnemonicToEntropy(fixture.mnemonic);
      it(`should convert ${fixture.mnemonic} to ${fixture.entropy}`, () => {
        assert.equal(entropy.toString('hex'), fixture.entropy);
      });
    });
  });

  describe('#validateMnemonic', () => {
    it('fails for a mnemonic that is too short', () => {
      assert.equal(BITBOX.Mnemonic.validateMnemonic('mixed winner', BITBOX.Mnemonic.mnemonicWordLists().english), 'Invalid mnemonic');
    });

      it('fails for a mnemonic that is too long', () => {
      assert.equal(BITBOX.Mnemonic.validateMnemonic('mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake', BITBOX.Mnemonic.mnemonicWordLists().english), 'Invalid mnemonic');
    });

    it('fails if mnemonic words are not in the word list', () => {
      assert.equal(BITBOX.Mnemonic.validateMnemonic('failsauce one two three four five six seven eight nine ten eleven', BITBOX.Mnemonic.mnemonicWordLists().english), 'failsauce is not in wordlist, did you mean balance?');
    });

    it('validate a 128 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(128);
      assert.equal(BITBOX.Mnemonic.validateMnemonic(mnemonic, BITBOX.Mnemonic.mnemonicWordLists().english), 'Valid mnemonic');
    });

    it('validate a 160 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(160);
      assert.equal(BITBOX.Mnemonic.validateMnemonic(mnemonic, BITBOX.Mnemonic.mnemonicWordLists().english), 'Valid mnemonic');
    });

    it('validate a 192 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(192);
      assert.equal(BITBOX.Mnemonic.validateMnemonic(mnemonic, BITBOX.Mnemonic.mnemonicWordLists().english), 'Valid mnemonic');
    });

    it('validate a 224 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(224);
      assert.equal(BITBOX.Mnemonic.validateMnemonic(mnemonic, BITBOX.Mnemonic.mnemonicWordLists().english), 'Valid mnemonic');
    });

    it('validate a 256 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(256);
      assert.equal(BITBOX.Mnemonic.validateMnemonic(mnemonic, BITBOX.Mnemonic.mnemonicWordLists().english), 'Valid mnemonic');
    });

    it('validate a 256 bit chinese simplified mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(256, BITBOX.Mnemonic.mnemonicWordLists().chinese_simplified);
      assert.equal(BITBOX.Mnemonic.validateMnemonic(mnemonic, BITBOX.Mnemonic.mnemonicWordLists().chinese_simplified), 'Valid mnemonic');
    });
  });

  describe('#mnemonicToSeed', () => {
    it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 128 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(128);
      let rootSeedBuffer = BITBOX.Mnemonic.mnemonicToSeed(mnemonic, '');
      assert.equal(rootSeedBuffer.byteLength, 64);
    });

    it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 160 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(160);
      let rootSeedBuffer = BITBOX.Mnemonic.mnemonicToSeed(mnemonic, '');
      assert.equal(rootSeedBuffer.byteLength, 64);
    });

    it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 192 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(192);
      let rootSeedBuffer = BITBOX.Mnemonic.mnemonicToSeed(mnemonic, '');
      assert.equal(rootSeedBuffer.byteLength, 64);
    });

    it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 224 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(224);
      let rootSeedBuffer = BITBOX.Mnemonic.mnemonicToSeed(mnemonic, '');
      assert.equal(rootSeedBuffer.byteLength, 64);
    });

    it('should create 512 bit / 64 byte HMAC-SHA512 root seed from a 256 bit mnemonic', () => {
      let mnemonic = BITBOX.Mnemonic.generateMnemonic(256);
      let rootSeedBuffer = BITBOX.Mnemonic.mnemonicToSeed(mnemonic, '');
      assert.equal(rootSeedBuffer.byteLength, 64);
    });
  });

  describe('#mnemonicWordLists', () => {
    it('return a list of 2048 english words', () => {
      assert.lengthOf(BITBOX.Mnemonic.mnemonicWordLists().english, 2048);
    });

    it('return a list of 2048 japanese words', () => {
      assert.lengthOf(BITBOX.Mnemonic.mnemonicWordLists().japanese, 2048);
    });

    it('return a list of 2048 chinese simplified words', () => {
      assert.lengthOf(BITBOX.Mnemonic.mnemonicWordLists().chinese_simplified, 2048);
    });

    it('return a list of 2048 chinese traditional words', () => {
      assert.lengthOf(BITBOX.Mnemonic.mnemonicWordLists().chinese_traditional, 2048);
    });

    it('return a list of 2048 french words', () => {
      assert.lengthOf(BITBOX.Mnemonic.mnemonicWordLists().french, 2048);
    });

    it('return a list of 2048 italian words', () => {
      assert.lengthOf(BITBOX.Mnemonic.mnemonicWordLists().italian, 2048);
    });

    it('return a list of 2048 korean words', () => {
      assert.lengthOf(BITBOX.Mnemonic.mnemonicWordLists().korean, 2048);
    });

    it('return a list of 2048 spanish words', () => {
      assert.lengthOf(BITBOX.Mnemonic.mnemonicWordLists().spanish, 2048);
    });
  });

  describe('#keypairsFromMnemonic', () => {
    fixtures.keypairsFromMnemonic.forEach((fixture, i) => {
      let keypairs = BITBOX.Mnemonic.keypairsFromMnemonic(fixture.mnemonic, 5);
      keypairs.forEach((keypair, j) => {
        it(`Generate keypair from mnemonic`, () => {
          assert.equal(keypair.privateKeyWIF, fixtures.keypairsFromMnemonic[i].output[j].privateKeyWIF);
        });
      });
    });
  });

  describe('#findNearestWord', () => {
    fixtures.findNearestWord.forEach((fixture, i) => {
      let word = BITBOX.Mnemonic.findNearestWord(fixture.word, BITBOX.Mnemonic.mnemonicWordLists()[fixture.language]);
      it(`find word ${fixture.foundWord} near ${fixture.word} in ${fixture.language}`, () => {
        assert.equal(word, fixture.foundWord);
      });
    });
  });
});
