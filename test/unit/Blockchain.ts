// imports
import * as chai from "chai"
import axios from "axios";
import * as sinon from "sinon";
import { BITBOX } from "../../lib/BITBOX"
import { Blockchain } from "../../lib/Blockchain"
import { resturl } from "../../lib/BITBOX"
import * as util from "util"
import { BlockHeaderResult } from "bitcoin-com-rest";

// consts
const bitbox: BITBOX = new BITBOX()
const assert: Chai.AssertStatic = chai.assert

util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe("#Blockchain", (): void => {
  describe("#BlockchainConstructor", (): void => {
    it("should create instance of Blockchain", (): void => {
      const blockchain: Blockchain = new Blockchain()
      assert.equal(blockchain instanceof Blockchain, true)
    })

    it("should have a restURL property", (): void => {
      const blockchain: Blockchain = new Blockchain()
      assert.equal(blockchain.restURL, resturl)
    })
  })

  // describe("#getBlock", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     hash: "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
  //     confirmations: 526807,
  //     size: 216,
  //     height: 1000,
  //     version: 1,
  //     versionHex: "00000001",
  //     merkleroot:
  //       "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
  //     tx: ["fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"],
  //     time: 1232346882,
  //     mediantime: 1232344831,
  //     nonce: 2595206198,
  //     bits: "1d00ffff",
  //     difficulty: 1,
  //     chainwork:
  //       "000000000000000000000000000000000000000000000000000003e903e903e9",
  //     previousblockhash:
  //       "0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d",
  //     nextblockhash:
  //       "00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6"
  //   }

  //   it("should get block by hash", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getBlock(
  //       "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"
  //     )
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getBlockchainInfo", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     chain: "main",
  //     blocks: 527810,
  //     headers: 527810,
  //     bestblockhash:
  //       "000000000000000001d127592d091d4c45062504663c9acab27a1b16c028e3c0",
  //     difficulty: 576023394804.6666,
  //     mediantime: 1524878499,
  //     verificationprogress: 0.9999990106793685,
  //     chainwork:
  //       "00000000000000000000000000000000000000000096da5b040913fa09249b4e",
  //     pruned: false,
  //     softforks: [
  //       { id: "bip34", version: 2, reject: [Object] },
  //       { id: "bip66", version: 3, reject: [Object] },
  //       { id: "bip65", version: 4, reject: [Object] }
  //     ],
  //     bip9_softforks: {
  //       csv: {
  //         status: "active",
  //         startTime: 1462060800,
  //         timeout: 1493596800,
  //         since: 419328
  //       }
  //     }
  //   }

  //   it("should get blockchain info", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getBlockchainInfo()
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getBlockCount", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = 527810

  //   it("should get block count", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getBlockCount()
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getBlockHash", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data: string =
  //     "000000000000000001d127592d091d4c45062504663c9acab27a1b16c028e3c0"

  //   it("should get block hash by height", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getBlockHash(527810)
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getBlockHeader", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     hash: "000000000000000001d127592d091d4c45062504663c9acab27a1b16c028e3c0",
  //     confirmations: 1,
  //     height: 527810,
  //     version: 536870912,
  //     versionHex: "20000000",
  //     merkleroot:
  //       "9298432bbebe4638456aa19cb7ef91639da87668a285d88d0ecd6080424d223b",
  //     time: 1524881438,
  //     mediantime: 1524878499,
  //     nonce: 3326843941,
  //     bits: "1801e8a5",
  //     difficulty: 576023394804.6666,
  //     chainwork:
  //       "00000000000000000000000000000000000000000096da5b040913fa09249b4e",
  //     previousblockhash:
  //       "000000000000000000b33251708bc7a7b4540e61880d8c376e8e2db6a19a4789"
  //   }

  //   it("should get block header by hash", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getBlockHeader(
  //       "000000000000000001d127592d091d4c45062504663c9acab27a1b16c028e3c0",
  //       true
  //     )
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getDifficulty", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = "577528469277.1339"

  //   it("should get difficulty", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getDifficulty()
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getMempoolAncestors", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = "Transaction not in mempool"

  //   it("should get mempool ancestors", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getMempoolAncestors(
  //       "daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88",
  //       true
  //     )
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getMempoolDescendants", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     result: "Transaction not in mempool"
  //   }

  //   it("should get mempool descendants", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getMempoolDescendants(
  //       "daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88",
  //       true
  //     )
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getMempoolEntry", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     result: "Transaction not in mempool"
  //   }

  //   it("should get mempool entry", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getMempoolEntry(
  //       "daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88"
  //     )
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getMempoolInfo", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     result: {
  //       size: 317,
  //       bytes: 208583,
  //       usage: 554944,
  //       maxmempool: 300000000,
  //       mempoolminfee: 0
  //     }
  //   }

  //   it("should get mempool info", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getMempoolInfo()
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getRawMempool", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     result: {
  //       transactions: [
  //         {
  //           txid:
  //             "ab36d68dd0a618592fe34e4a898e8beeeb4049133547dbb16f9338384084af96",
  //           size: 191,
  //           fee: 0.00047703,
  //           modifiedfee: 0.00047703,
  //           time: 1524883317,
  //           height: 527811,
  //           startingpriority: 5287822727.272727,
  //           currentpriority: 5287822727.272727,
  //           descendantcount: 1,
  //           descendantsize: 191,
  //           descendantfees: 47703,
  //           ancestorcount: 1,
  //           ancestorsize: 191,
  //           ancestorfees: 47703,
  //           depends: []
  //         }
  //       ]
  //     }
  //   }

  //   it("should get mempool info", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getRawMempool()
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#getTxOut", (): void => {
  //   // TODO finish this test
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     result: {}
  //   }

  //   it("should get TODO", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.getTxOut(
  //       "daf58932cb91619304dd4cbd03c7202e89ad7d6cbd6e2209e5f64ce3b6ed7c88",
  //       0,
  //       true
  //     )
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#preciousBlock", (): void => {
  //   // TODO finish this test
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = {
  //     result: {}
  //   }

  //   it("should get TODO", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     // @ts-ignore
  //     bitbox.Blockchain.preciousBlock()
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#pruneBlockchain", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = "Cannot prune blocks because node is not in prune mode."

  //   it("should prune blockchain", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "post").returns(resolved)

  //     bitbox.Blockchain.pruneBlockchain(507)
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#verifyChain", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = true

  //   it("should verify blockchain", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.verifyChain(3, 6)
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe("#verifyTxOutProof", (): void => {
  //   let sandbox: any
  //   beforeEach(() => (sandbox = sinon.sandbox.create()))
  //   afterEach(() => sandbox.restore())
  //   const data = "proof must be hexadecimal string (not '')"

  //   it("should verify utxo proof", done => {
  //     const resolved = new Promise(r => r({ data: data }))
  //     sandbox.stub(axios, "get").returns(resolved)

  //     bitbox.Blockchain.verifyTxOutProof("3")
  //       .then((result: any) => {
  //         assert.deepEqual(data, result)
  //       })
  //       .then(done, done)
  //   })
  // })

  // describe(`#getBestBlockHash`, (): void => {
  //   it(`should GET best block hash`, async () => {
  //     const result: string = await bitbox.Blockchain.getBestBlockHash()

  //     assert.isString(result)
  //     assert.equal(result.length, 64, "Specific hash length")
  //   })
  // })

  // describe("#getBlockHeader", (): void => {
  //   it(`should GET block header for a single hash`, async () => {
  //     const hash: string =
  //       "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"

  //     const result: BlockHeaderResult | BlockHeaderResult[] = await bitbox.Blockchain.getBlockHeader(hash)

  //     assert.hasAllKeys(result, [
  //       "hash",
  //       "confirmations",
  //       "height",
  //       "version",
  //       "versionHex",
  //       "merkleroot",
  //       "time",
  //       "mediantime",
  //       "nonce",
  //       "bits",
  //       "difficulty",
  //       "chainwork",
  //       "previousblockhash",
  //       "nextblockhash"
  //     ])
  //   })

  //   it(`should GET block headers for an array of hashes`, async () => {
  //     const hash: string[] = [
  //       "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201",
  //       "00000000000000000568f0a96bf4348847bc84e455cbfec389f27311037a20f3"
  //     ]

  //     const result: BlockHeaderResult | BlockHeaderResult[] = await bitbox.Blockchain.getBlockHeader(hash)

  //     assert.isArray(result)
  //     if (Array.isArray(result)) {
  //       assert.hasAllKeys(result[0], [
  //         "hash",
  //         "confirmations",
  //         "height",
  //         "version",
  //         "versionHex",
  //         "merkleroot",
  //         "time",
  //         "mediantime",
  //         "nonce",
  //         "bits",
  //         "difficulty",
  //         "chainwork",
  //         "previousblockhash",
  //         "nextblockhash"
  //       ])

  //     }
  //   })

  //   it(`should throw an error for improper input`, async () => {
  //     try {
  //       const hash: any = 12345

  //       await bitbox.Blockchain.getBlockHeader(hash)
  //       assert.equal(true, false, "Unexpected result!")
  //     } catch (err) {
  //       assert.include(
  //         err.message,
  //         `Input hash must be a string or array of strings`
  //       )
  //     }
  //   })

  //   it(`should throw error on array size rate limit`, async () => {
  //     try {
  //       const data: string[] = []
  //       for (let i: number = 0; i < 25; i++) {
  //         data.push(
  //           "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"
  //         )
  //       }

  //       const result: BlockHeaderResult | BlockHeaderResult[] = await bitbox.Blockchain.getBlockHeader(data)
  //       assert.equal(true, false, "Unexpected result!")
  //     } catch (err) {
  //       assert.hasAnyKeys(err, ["error"])
  //       assert.include(err.error, "Array too large")
  //     }
  //   })
  // })

  // describe("#getMempoolEntry", (): void => {
  //   /*
  //   // To run this test, the txid must be unconfirmed.
  //   const txid =
  //     "defea04c38ee00cf73ad402984714ed22dc0dd99b2ae5cb50d791d94343ba79b"

  //   it(`should GET single mempool entry`, async () => {
  //     const result = await bitbox.Blockchain.getMempoolEntry(txid)
  //     //console.log(`result: ${JSON.stringify(result, null, 2)}`)

  //     assert.hasAnyKeys(result, [
  //       "size",
  //       "fee",
  //       "modifiedfee",
  //       "time",
  //       "height",
  //       "startingpriority",
  //       "currentpriority",
  //       "descendantcount",
  //       "descendantsize",
  //       "descendantfees",
  //       "ancestorcount",
  //       "ancestorsize",
  //       "ancestorfees",
  //       "depends"
  //     ])
  //   })

  //   it(`should get an array of mempool entries`, async () => {
  //     const result = await bitbox.Blockchain.getMempoolEntry([txid, txid])
  //     console.log(`result: ${JSON.stringify(result, null, 2)}`)

  //     assert.isArray(result)
  //     assert.hasAnyKeys(result[0], [
  //       "size",
  //       "fee",
  //       "modifiedfee",
  //       "time",
  //       "height",
  //       "startingpriority",
  //       "currentpriority",
  //       "descendantcount",
  //       "descendantsize",
  //       "descendantfees",
  //       "ancestorcount",
  //       "ancestorsize",
  //       "ancestorfees",
  //       "depends"
  //     ])
  //   })
  //   */

  //   it(`should throw an error if txid is not in mempool`, async (): Promise<any> => {
  //     try {
  //       const txid: string =
  //         "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"

  //       await bitbox.Blockchain.getMempoolEntry(txid)

  //       assert.equal(true, false, "Unexpected result!")
  //     } catch (err) {
  //       //console.log(`err: ${util.inspect(err)}`)
  //       assert.hasAnyKeys(err, ["error"])
  //       assert.include(err.error, `Transaction not in mempool`)
  //     }
  //   })

  //   it(`should throw an error for improper single input`, async (): Promise<any> => {
  //     try {
  //       const txid: any = 12345

  //       await bitbox.Blockchain.getMempoolEntry(txid)
  //       assert.equal(true, false, "Unexpected result!")
  //     } catch (err) {
  //       assert.include(
  //         err.message,
  //         `Input must be a string or array of strings`
  //       )
  //     }
  //   })
  // })

  // describe(`#getTxOutProof`, (): void => {
  //   it(`should get single tx out proof`, async (): Promise<any> => {
  //     const txid: string =
  //       "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"

  //     const result = await bitbox.Blockchain.getTxOutProof(txid)

  //     assert.isString(result)
  //   })

  //   it(`should get an array of tx out proofs`, async (): Promise<any> => {
  //     const txid: string[] = [
  //       "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7",
  //       "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33"
  //     ]

  //     const result = await bitbox.Blockchain.getTxOutProof(txid)

  //     assert.isArray(result)
  //     assert.isString(result[0])
  //   })

  //   it(`should throw an error for improper single input`, async (): Promise<any> => {
  //     try {
  //       const txid: any = 12345

  //       await bitbox.Blockchain.getTxOutProof(txid)
  //       assert.equal(true, false, "Unexpected result!")
  //     } catch (err) {
  //       assert.include(
  //         err.message,
  //         `Input must be a string or array of strings`
  //       )
  //     }
  //   })
  // })

  // describe(`#verifyTxOutProof`, (): void => {
  //   const mockTxOutProof: string =
  //     "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"

  //   it(`should verify a single proof`, async (): Promise<any> => {
  //     const result = await bitbox.Blockchain.verifyTxOutProof(mockTxOutProof)

  //     assert.isArray(result)
  //     assert.isString(result[0])
  //     assert.equal(
  //       result[0],
  //       "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
  //     )
  //   })

  //   it(`should verify an array of proofs`, async (): Promise<any> => {
  //     const proofs: string[] = [mockTxOutProof, mockTxOutProof]
  //     const result = await bitbox.Blockchain.verifyTxOutProof(proofs)

  //     assert.isArray(result)
  //     assert.isString(result[0])
  //     assert.equal(
  //       result[0],
  //       "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
  //     )
  //   })

  //   it(`should throw an error for improper single input`, async (): Promise<any> => {
  //     try {
  //       const txid: any = 12345

  //       await bitbox.Blockchain.verifyTxOutProof(txid)
  //       assert.equal(true, false, "Unexpected result!")
  //     } catch (err) {
  //       assert.include(
  //         err.message,
  //         `Input must be a string or array of strings`
  //       )
  //     }
  //   })

  //   it(`should throw error on array size rate limit`, async (): Promise<any> => {
  //     try {
  //       const data: string[] = []
  //       for (let i: number = 0; i < 25; i++) data.push(mockTxOutProof)

  //       const result = await bitbox.Blockchain.verifyTxOutProof(data)

  //       console.log(`result: ${util.inspect(result)}`)
  //       assert.equal(true, false, "Unexpected result!")
  //     } catch (err) {
  //       assert.hasAnyKeys(err, ["error"])
  //       assert.include(err.error, "Array too large")
  //     }
  //   })
  // })
})
