// imports
import * as assert from "assert";
import { BITBOX } from "../../lib/BITBOX"
import { Mnemonic } from "../../lib/Mnemonic"

// consts
const bitbox: BITBOX = new BITBOX()

// TODO: port from require to import syntax
const fixtures = require("./fixtures/Mnemonic.json")

describe("#Mnemonic", (): void => {
  describe("#MnemonicConstructor", (): void => {
    it("should create instance of Mnemonic", (): void => {
      const mnemonic: Mnemonic = new Mnemonic()
      assert.equal(mnemonic instanceof Mnemonic, true)
    })
  })

  describe("#generate", (): void => {
    it("should generate a 12 word mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(128)
      assert.equal(mnemonic.split(" ").length, 12)
    })

    it("should generate a 15 word mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(160)
      assert.equal(mnemonic.split(" ").length, 15)
    })

    it("should generate a 18 word mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(192)
      assert.equal(mnemonic.split(" ").length, 18)
    })

    it("should generate an 21 word mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(224)
      assert.equal(mnemonic.split(" ").length, 21)
    })

    it("should generate an 24 word mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(256)
      assert.equal(mnemonic.split(" ").length, 24)
    })

    it("should generate an 24 word italian mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(
        256,
        bitbox.Mnemonic.wordLists().italian
      )
      assert.equal(mnemonic.split(" ").length, 24)
    })
  })

  describe("#fromEntropy", (): void => {
    it("should generate a 12 word mnemonic from 16 bytes of entropy", (): void => {
      const rand: Buffer = bitbox.Crypto.randomBytes(16)
      const mnemonic: string = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 12)
    })

    it("should generate a 15 word mnemonic from 20 bytes of entropy", (): void => {
      const rand: Buffer = bitbox.Crypto.randomBytes(20)
      const mnemonic: string = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 15)
    })

    it("should generate an 18 word mnemonic from 24 bytes of entropy", (): void => {
      const rand: Buffer = bitbox.Crypto.randomBytes(24)
      const mnemonic: string = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 18)
    })

    it("should generate an 21 word mnemonic from 28 bytes of entropy", (): void => {
      const rand: Buffer = bitbox.Crypto.randomBytes(28)
      const mnemonic: string = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 21)
    })

    it("should generate an 24 word mnemonic from 32 bytes of entropy", (): void => {
      const rand: Buffer = bitbox.Crypto.randomBytes(32)
      const mnemonic: string = bitbox.Mnemonic.fromEntropy(rand.toString("hex"))
      assert.equal(mnemonic.split(" ").length, 24)
    })

    it("should generate an 24 french word mnemonic 32 bytes of entropy", (): void => {
      const rand: Buffer = bitbox.Crypto.randomBytes(32)
      const mnemonic: string = bitbox.Mnemonic.fromEntropy(
        rand.toString("hex"),
        bitbox.Mnemonic.wordLists().french
      )
      assert.equal(mnemonic.split(" ").length, 24)
    })

    fixtures.fromEntropy.forEach((entropy: any): void => {
      const mnemonic: string = bitbox.Mnemonic.fromEntropy(entropy.entropy)
      it(`should convert ${entropy.entropy} to ${entropy.mnemonic}`, (): void => {
        assert.equal(mnemonic, entropy.mnemonic)
      })
    })
  })

  describe("#toEntropy", (): void => {
    it("should turn a 12 word mnemonic to entropy", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(128)
      const entropy: Buffer = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 16)
    })

    it("should turn a 15 word mnemonic to entropy", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(160)
      const entropy: Buffer = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 20)
    })

    it("should turn a 18 word mnemonic to entropy", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(192)
      const entropy: Buffer = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 24)
    })

    it("should turn a 21 word mnemonic to entropy", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(224)
      const entropy: Buffer = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 28)
    })

    it("should turn a 24 word mnemonic to entropy", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(256)
      const entropy: Buffer = bitbox.Mnemonic.toEntropy(mnemonic)
      assert.equal(entropy.length, 32)
    })

    it("should turn a 24 word spanish mnemonic to entropy", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(
        256,
        bitbox.Mnemonic.wordLists().spanish
      )
      const entropy: Buffer = bitbox.Mnemonic.toEntropy(
        mnemonic,
        bitbox.Mnemonic.wordLists().spanish
      )
      assert.equal(entropy.length, 32)
    })

    fixtures.fromEntropy.forEach((fixture: any): void => {
      const entropy: Buffer = bitbox.Mnemonic.toEntropy(fixture.mnemonic)
      it(`should convert ${fixture.mnemonic} to ${fixture.entropy}`, (): void => {
        assert.equal(entropy.toString("hex"), fixture.entropy)
      })
    })
  })

  describe("#validate", (): void => {
    it("fails for a mnemonic that is too short", (): void => {
      assert.equal(
        bitbox.Mnemonic.validate(
          "mixed winner",
          bitbox.Mnemonic.wordLists().english
        ),
        "Invalid mnemonic"
      )
    })

    it("fails for a mnemonic that is too long", (): void => {
      assert.equal(
        bitbox.Mnemonic.validate(
          "mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake mixed winner decide drift danger together twice planet impose asthma catch require select mask awkward spy relief front work solar pitch economy render cake",
          bitbox.Mnemonic.wordLists().english
        ),
        "Invalid mnemonic"
      )
    })

    it("fails if mnemonic words are not in the word list", (): void => {
      assert.equal(
        bitbox.Mnemonic.validate(
          "failsauce one two three four five six seven eight nine ten eleven",
          bitbox.Mnemonic.wordLists().english
        ),
        "failsauce is not in wordlist, did you mean balance?"
      )
    })

    it("validate a 128 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(128)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 160 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(160)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 192 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(192)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 224 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(224)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 256 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(256)
      assert.equal(
        bitbox.Mnemonic.validate(mnemonic, bitbox.Mnemonic.wordLists().english),
        "Valid mnemonic"
      )
    })

    it("validate a 256 bit chinese simplified mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(
        256,
        bitbox.Mnemonic.wordLists().chinese_simplified
      )
      assert.equal(
        bitbox.Mnemonic.validate(
          mnemonic,
          bitbox.Mnemonic.wordLists().chinese_simplified
        ),
        "Valid mnemonic"
      )
    })
  })

  describe("#toSeed", (): void => {
    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 128 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(128)
      const rootSeedBuffer: Buffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })

    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 160 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(160)
      const rootSeedBuffer: Buffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })

    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 192 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(192)
      const rootSeedBuffer: Buffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })

    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 224 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(224)
      const rootSeedBuffer: Buffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })

    it("should create 512 bit / 64 byte HMAC-SHA512 root seed from a 256 bit mnemonic", (): void => {
      const mnemonic: string = bitbox.Mnemonic.generate(256)
      const rootSeedBuffer: Buffer = bitbox.Mnemonic.toSeed(mnemonic, "")
      assert.equal(rootSeedBuffer.byteLength, 64)
    })
  })

  describe("#wordLists", (): void => {
    it("return a list of 2048 english words", (): void => {
      assert.equal(bitbox.Mnemonic.wordLists().english.length, 2048)
    })

    it("return a list of 2048 japanese words", (): void => {
      assert.equal(bitbox.Mnemonic.wordLists().japanese.length, 2048)
    })

    it("return a list of 2048 chinese simplified words", (): void => {
      assert.equal(bitbox.Mnemonic.wordLists().chinese_simplified.length, 2048)
    })

    it("return a list of 2048 chinese traditional words", (): void => {
      assert.equal(bitbox.Mnemonic.wordLists().chinese_traditional.length, 2048)
    })

    it("return a list of 2048 french words", (): void => {
      assert.equal(bitbox.Mnemonic.wordLists().french.length, 2048)
    })

    it("return a list of 2048 italian words", (): void => {
      assert.equal(bitbox.Mnemonic.wordLists().italian.length, 2048)
    })

    it("return a list of 2048 korean words", (): void => {
      assert.equal(bitbox.Mnemonic.wordLists().korean.length, 2048)
    })

    it("return a list of 2048 spanish words", (): void => {
      assert.equal(bitbox.Mnemonic.wordLists().spanish.length, 2048)
    })
  })

  describe("#toKeypairs", (): void => {
    fixtures.toKeypairs.forEach((fixture: any, i: number): void => {
      const keypairs: any = bitbox.Mnemonic.toKeypairs(fixture.mnemonic, 5)
      keypairs.forEach((keypair: any, j: number): void => {
        it(`Generate keypair from mnemonic`, (): void => {
          assert.equal(
            keypair.privateKeyWIF,
            fixtures.toKeypairs[i].output[j].privateKeyWIF
          )
          // assert.equal(
          //   keypair.address,
          //   fixtures.toKeypairs[i].output[j].address
          // )
        })
      })

      const regtestKeypairs: any = bitbox.Mnemonic.toKeypairs(
        fixture.mnemonic,
        5,
        true
      )
      regtestKeypairs.forEach((keypair: any, j: number): void => {
        it(`Generate keypair from mnemonic`, (): void => {
          assert.equal(
            keypair.privateKeyWIF,
            fixtures.toKeypairs[i].output[j].privateKeyWIFRegTest
          )
          // assert.equal(
          //   keypair.address,
          //   fixtures.toKeypairs[i].output[j].regtestAddress
          // )
        })
      })
    })
  })

  describe("#findNearestWord", (): void => {
    fixtures.findNearestWord.forEach((fixture: any): void => {
      const word: string = bitbox.Mnemonic.findNearestWord(
        fixture.word,
        bitbox.Mnemonic.wordLists()[fixture.language]
      )
      it(`find word ${fixture.foundWord} near ${fixture.word} in ${
        fixture.language
        }`, (): void => {
          assert.equal(word, fixture.foundWord)
        })
    })
  })
})
