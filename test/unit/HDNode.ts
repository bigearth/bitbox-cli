// imports
import * as assert from "assert";
import { BITBOX } from "../../lib/BITBOX"
import { HDNode } from "../../lib/HDNode"
import * as bcl from "bitcoincashjs-lib"

// consts
const bitbox: BITBOX = new BITBOX()

// TODO: port from require to import syntax
const fixtures = require("./fixtures/HDNode.json")

describe("#HDNode", (): void => {
  describe("#HDNodeConstructor", (): void => {
    it("should create instance of HDNode", (): void => {
      const hdnode: HDNode = new HDNode()
      assert.equal(hdnode instanceof HDNode, true)
    })
  })

  describe("#fromSeed", (): void => {
    fixtures.fromSeed.forEach((mnemonic: string): void => {
      it(`should create an HDNode from root seed buffer`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        assert.notEqual(hdNode, null)
      })
    })
  })

  describe("#derive", (): void => {
    fixtures.derive.forEach((derive: any): void => {
      it(`should derive non hardened child HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(derive.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode: bcl.HDNode = bitbox.HDNode.derive(hdNode, 0)
        assert.equal(bitbox.HDNode.toXPub(childHDNode), derive.xpub)
        assert.equal(bitbox.HDNode.toXPriv(childHDNode), derive.xpriv)
      })
    })
  })

  describe("#deriveHardened", (): void => {
    fixtures.deriveHardened.forEach((derive: any): void => {
      it(`should derive hardened child HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(derive.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode: bcl.HDNode = bitbox.HDNode.deriveHardened(hdNode, 0)
        assert.equal(bitbox.HDNode.toXPub(childHDNode), derive.xpub)
        assert.equal(bitbox.HDNode.toXPriv(childHDNode), derive.xpriv)
      })
    })

    describe("derive BIP44 $BCH account", (): void => {
      fixtures.deriveBIP44.forEach((derive: any): void => {
        it(`should derive BIP44 $BCH account`, (): void => {
          const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(derive.mnemonic)
          const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
          const purpose: bcl.HDNode = bitbox.HDNode.deriveHardened(hdNode, 44)
          const coin: bcl.HDNode = bitbox.HDNode.deriveHardened(purpose, 145)
          const childHDNode: bcl.HDNode = bitbox.HDNode.deriveHardened(coin, 0)
          assert.equal(bitbox.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(bitbox.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })
  })

  describe("#derivePath", (): void => {
    describe("derive non hardened Path", (): void => {
      fixtures.derivePath.forEach((derive: any): void => {
        it(`should derive non hardened child HDNode from path`, (): void => {
          const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(derive.mnemonic)
          const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode: bcl.HDNode = bitbox.HDNode.derivePath(hdNode, "0")
          assert.equal(bitbox.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(bitbox.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })

    describe("derive hardened Path", (): any => {
      fixtures.deriveHardenedPath.forEach((derive: any): any => {
        it(`should derive hardened child HDNode from path`, (): any => {
          const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(derive.mnemonic)
          const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode: bcl.HDNode = bitbox.HDNode.derivePath(hdNode, "0'")
          assert.equal(bitbox.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(bitbox.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })

    describe("derive BIP44 $BCH account", (): void => {
      fixtures.deriveBIP44.forEach((derive: any): void => {
        it(`should derive BIP44 $BCH account`, (): void => {
          const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(derive.mnemonic)
          const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
          const childHDNode: bcl.HDNode = bitbox.HDNode.derivePath(hdNode, "44'/145'/0'")
          assert.equal(bitbox.HDNode.toXPub(childHDNode), derive.xpub)
          assert.equal(bitbox.HDNode.toXPriv(childHDNode), derive.xpriv)
        })
      })
    })
  })

  describe("#toLegacyAddress", (): void => {
    fixtures.toLegacyAddress.forEach((fixture: any): void => {
      it(`should get address ${fixture.address} from HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode: bcl.HDNode = bitbox.HDNode.derivePath(hdNode, "0")
        const addy: string = bitbox.HDNode.toLegacyAddress(childHDNode)
        assert.equal(addy, fixture.address)
      })
    })
  })

  describe("#toCashAddress", (): void => {
    fixtures.toCashAddress.forEach((fixture: any): void => {
      it(`should get address ${fixture.address} from HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode: bcl.HDNode = bitbox.HDNode.derivePath(hdNode, "0")
        const addy: string = bitbox.HDNode.toCashAddress(childHDNode)
        assert.equal(addy, fixture.address)
      })

      it(`should get address ${fixture.regtestAddress} from HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const childHDNode: bcl.HDNode = bitbox.HDNode.derivePath(hdNode, "0")
        const addr: string = bitbox.HDNode.toCashAddress(childHDNode, true)
        assert.equal(addr, fixture.regtestAddress)
      })
    })
  })

  describe("#toWIF", (): void => {
    fixtures.toWIF.forEach((fixture: any): void => {
      it(`should get privateKeyWIF ${
        fixture.privateKeyWIF
        } from HDNode`, (): void => {
          const hdNode: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.xpriv)
          assert.equal(bitbox.HDNode.toWIF(hdNode), fixture.privateKeyWIF)
        })
    })
  })

  describe("#toXPub", (): void => {
    fixtures.toXPub.forEach((fixture: any): void => {
      it(`should create xpub ${fixture.xpub} from an HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const xpub: string = bitbox.HDNode.toXPub(hdNode)
        assert.equal(xpub, fixture.xpub)
      })
    })
  })

  describe("#toXPriv", (): void => {
    fixtures.toXPriv.forEach((fixture: any): void => {
      it(`should create xpriv ${fixture.xpriv} from an HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const xpriv: string = bitbox.HDNode.toXPriv(hdNode)
        assert.equal(xpriv, fixture.xpriv)
      })
    })
  })

  describe("#toKeyPair", (): void => {
    fixtures.toKeyPair.forEach((fixture: any): void => {
      it(`should get ECPair from an HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const keyPair: bcl.ECPair = bitbox.HDNode.toKeyPair(hdNode)
        assert.equal(typeof keyPair, "object")
      })
    })
  })

  describe("#toPublicKey", (): void => {
    fixtures.toPublicKey.forEach((fixture: any): void => {
      it(`should create public key buffer from an HDNode`, (): void => {
        const rootSeedBuffer: any = bitbox.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(rootSeedBuffer)
        const publicKeyBuffer: any = bitbox.HDNode.toPublicKey(hdNode)
        assert.equal(typeof publicKeyBuffer, "object")
      })
    })
  })

  describe("#fromXPriv", (): any => {
    fixtures.fromXPriv.forEach((fixture: any): any => {
      const hdNode: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.xpriv)
      it(`should create HDNode from xpriv ${fixture.xpriv}`, (): any => {
        assert.notEqual(hdNode, null)
      })

      it(`should export xpriv ${fixture.xpriv}`, (): any => {
        assert.equal(bitbox.HDNode.toXPriv(hdNode), fixture.xpriv)
      })

      it(`should export xpub ${fixture.xpub}`, (): any => {
        assert.equal(bitbox.HDNode.toXPub(hdNode), fixture.xpub)
      })

      it(`should export legacy address ${fixture.legacy}`, (): any => {
        assert.equal(bitbox.HDNode.toLegacyAddress(hdNode), fixture.legacy)
      })

      it(`should export cashaddress ${fixture.cashaddress}`, (): any => {
        assert.equal(bitbox.HDNode.toCashAddress(hdNode), fixture.cashaddress)
      })

      it(`should export regtest cashaddress ${fixture.regtestaddress}`, (): any => {
        assert.equal(
          bitbox.HDNode.toCashAddress(hdNode, true),
          fixture.regtestaddress
        )
      })

      it(`should export privateKeyWIF ${fixture.privateKeyWIF}`, (): any => {
        assert.equal(bitbox.HDNode.toWIF(hdNode), fixture.privateKeyWIF)
      })
    })
  })

  describe("#fromXPub", (): any => {
    fixtures.fromXPub.forEach((fixture: any): any => {
      const hdNode: bcl.HDNode = bitbox.HDNode.fromXPub(fixture.xpub)
      it(`should create HDNode from xpub ${fixture.xpub}`, (): any => {
        assert.notEqual(hdNode, null)
      })

      it(`should export xpub ${fixture.xpub}`, (): any => {
        assert.equal(bitbox.HDNode.toXPub(hdNode), fixture.xpub)
      })

      it(`should export legacy address ${fixture.legacy}`, (): any => {
        assert.equal(bitbox.HDNode.toLegacyAddress(hdNode), fixture.legacy)
      })

      it(`should export cashaddress ${fixture.cashaddress}`, (): any => {
        assert.equal(bitbox.HDNode.toCashAddress(hdNode), fixture.cashaddress)
      })

      it(`should export regtest cashaddress ${fixture.regtestaddress}`, (): any => {
        assert.equal(
          bitbox.HDNode.toCashAddress(hdNode, true),
          fixture.regtestaddress
        )
      })
    })
  })

  describe("#bip32", (): any => {
    describe("create accounts and addresses", (): any => {
      fixtures.accounts.forEach((fixture: any): any => {
        const seedBuffer: any = bitbox.Mnemonic.toSeed(fixture.mnemonic)
        const hdNode: bcl.HDNode = bitbox.HDNode.fromSeed(seedBuffer)
        const a: bcl.HDNode = bitbox.HDNode.derivePath(hdNode, "0'")
        const external: bcl.HDNode = bitbox.HDNode.derivePath(a, "0")
        const account: any = bitbox.HDNode.createAccount([external])

        it(`#createAccount`, (): void => {
          assert.notEqual(account, null)
        })

        describe("#getChainAddress", (): void => {
          const external1 = bitbox.Address.toCashAddress(
            account.getChainAddress(0)
          )
          it(`should create external change address ${external1}`, (): void => {
            assert.equal(external1, fixture.externals[0])
          })
        })

        describe("#nextChainAddress", (): void => {
          for (let i: number = 0; i < 4; i++) {
            const ex: string = bitbox.Address.toCashAddress(account.nextChainAddress(0))
            it(`should create external change address ${ex}`, (): void => {
              assert.equal(ex, fixture.externals[i + 1])
            })
          }
        })
      })
    })
  })

  describe("#sign", (): void => {
    fixtures.sign.forEach((fixture: any): void => {
      it(`should sign 32 byte hash buffer`, (): void => {
        const hdnode: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.privateKeyWIF)
        const buf: Buffer = Buffer.from(bitbox.Crypto.sha256(Buffer.from(fixture.data, "hex")))
        const signatureBuf: any = bitbox.HDNode.sign(hdnode, buf)
        assert.equal(typeof signatureBuf, "object")
      })
    })
  })

  describe("#verify", (): void => {
    fixtures.verify.forEach((fixture: any): void => {
      it(`should verify signed 32 byte hash buffer`, (): void => {
        const hdnode1: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.privateKeyWIF1)
        const buf: Buffer = Buffer.from(bitbox.Crypto.sha256(Buffer.from(fixture.data, "hex")))
        const signature: Buffer = bitbox.HDNode.sign(hdnode1, buf)
        const verify: boolean = bitbox.HDNode.verify(hdnode1, buf, signature)
        assert.equal(verify, true)
      })
    })
  })

  describe("#isPublic", (): void => {
    fixtures.isPublic.forEach((fixture: any): void => {
      it(`should verify hdnode is public`, (): void => {
        const node: bcl.HDNode = bitbox.HDNode.fromXPub(fixture.xpub)
        assert.equal(bitbox.HDNode.isPublic(node), true)
      })
    })

    fixtures.isPublic.forEach((fixture: any): void => {
      it(`should verify hdnode is not public`, (): void => {
        const node: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.xpriv)
        assert.equal(bitbox.HDNode.isPublic(node), false)
      })
    })
  })

  describe("#isPrivate", (): void => {
    fixtures.isPrivate.forEach((fixture: any): void => {
      it(`should verify hdnode is not private`, (): void => {
        const node: bcl.HDNode = bitbox.HDNode.fromXPub(fixture.xpub)
        assert.equal(bitbox.HDNode.isPrivate(node), false)
      })
    })

    fixtures.isPrivate.forEach((fixture: any): void => {
      it(`should verify hdnode is private`, (): void => {
        const node: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.xpriv)
        assert.equal(bitbox.HDNode.isPrivate(node), true)
      })
    })
  })

  describe("#toIdentifier", (): void => {
    fixtures.toIdentifier.forEach((fixture: any): void => {
      it(`should get identifier of hdnode`, (): void => {
        const node: bcl.HDNode = bitbox.HDNode.fromXPriv(fixture.xpriv)
        const publicKeyBuffer: any = bitbox.HDNode.toPublicKey(node)
        const hash160: Buffer = bitbox.Crypto.hash160(publicKeyBuffer)
        const identifier: string = bitbox.HDNode.toIdentifier(node)
        assert.equal(identifier, hash160.toString("hex"))
      })
    })
  })
})
