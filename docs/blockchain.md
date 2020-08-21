# Blockchain

### `getBestBlockHash`

Returns the hash of the best (tip) block in the longest blockchain.

#### Result

hex `Promise<string>`: the block hash hex encoded

#### Examples

    (async () => {
      try {
        let getBestBlockHash = await bitbox.Blockchain.getBestBlockHash();
        console.log(getBestBlockHash);
      } catch(error) {
       console.error(error)
      }
    })()
    // 241decef88889efac8e6ce428a8ac696fdde5972eceed97e1fb58d6106af31d5

### `getBlock`

If verbose is false, returns a string that is serialized, hex-encoded data for block 'hash'. If verbose is true, returns an Object with information about block `hash`.

#### Arguments

1.  blockhash `string`: The block hash
2.  verbose `boolean` **optional**: true for a json object, false for the hex encoded data

#### Result

block `Promise<BlockDetails>`

#### Examples

    (async () => {
      try {
        let getBlock = await bitbox.Blockchain.getBlock("00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09");
        console.log(getBlock);
      } catch(error) {
       console.error(error)
      }
    })()

    // { hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
    // confirmations: 528236,
    // size: 216,
    // height: 1000,
    // version: 1,
    // versionHex: '00000001',
    // merkleroot: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
    // tx:
    //  [ 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33' ],
    // time: 1232346882,
    // mediantime: 1232344831,
    // nonce: 2595206198,
    // bits: '1d00ffff',
    // difficulty: 1,
    // chainwork: '000000000000000000000000000000000000000000000000000003e903e903e9',
    // previousblockhash: '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
    // nextblockhash: '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6' }

### `getBlockchainInfo`

Returns an object containing various state info regarding blockchain processing.

#### Result

block `Promise<BlockchainInfo>`

#### Examples

    (async () => {
      try {
        let getBlockchainInfo = await bitbox.Blockchain.getBlockchainInfo();
        console.log(getBlockchainInfo);
      } catch(error) {
       console.error(error)
      }
    })()

    // { chain: 'main',
    // blocks: 529235,
    // headers: 529235,
    // bestblockhash: '00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236',
    // difficulty: 702784497476.8376,
    // mediantime: 1525727823,
    // verificationprogress: 0.9999892037620548,
    // chainwork: '00000000000000000000000000000000000000000099f5e1cf7d4e462a493a51',
    // pruned: false,
    // softforks:
    //  [ { id: 'bip34', version: 2, reject: [Object] },
    //    { id: 'bip66', version: 3, reject: [Object] },
    //    { id: 'bip65', version: 4, reject: [Object] } ],
    // bip9_softforks:
    //  { csv:
    //     { status: 'active',
    //       startTime: 1462060800,
    //       timeout: 1493596800,
    //       since: 419328 } } }

### `getBlockCount`

Returns the number of blocks in the longest blockchain.

#### Result

n `Promise<number>`

#### Examples

    (async () => {
      try {
        let getBlockCount = await bitbox.Blockchain.getBlockCount();
        console.log(getBlockCount);
      } catch(error) {
       console.error(error)
      }
    })()
    // 529235

### `getBlockHash`

Returns hash of block in best-block-chain at height provided.

#### Arguments

1.  height `number` **optional**

#### Result

hash `Promise<string>` The block hash

#### Examples

    (async () => {
      try {
        let getBlockHash = await bitbox.Blockchain.getBlockHash([0]);
        console.log(getBlockHash);
      } catch(error) {
       console.error(error)
      }
    })()
    // [ '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f' ]

### `getBlockHeader`

If verbose is false, returns a string that is serialized, hex-encoded data for blockheader 'hash'. If verbose is true, returns an Object with information about blockheader `hash`.

#### Arguments

1.  hashes `string | string[]`
2.  verbose `boolean` **optional**: true for a json object, false for the hex encoded data.

#### Result

blockHeader `Promise<BlockHeader>` The block header

#### Examples

    (async () => {
      try {
        let getBlockHeader = await bitbox.Blockchain.getBlockHeader(["00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09"]);
        console.log(getBlockHeader);
      } catch(error) {
       console.error(error)
      }
    })()

    // [{ hash: '00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09',
    // confirmations: 528236,
    // height: 1000,
    // version: 1,
    // versionHex: '00000001',
    // merkleroot: 'fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33',
    // time: 1232346882,
    // mediantime: 1232344831,
    // nonce: 2595206198,
    // bits: '1d00ffff',
    // difficulty: 1,
    // chainwork: '000000000000000000000000000000000000000000000000000003e903e903e9',
    // previousblockhash: '0000000008e647742775a230787d66fdf92c46a48c896bfbc85cdc8acc67e87d',
    // nextblockhash: '00000000a2887344f8db859e372e7e4bc26b23b9de340f725afbf2edb265b4c6' }]

### `getChainTips`

Return information about all known tips in the block tree, including the main chain as well as orphaned branches.

#### Result

chainTips `Promise<ChainTip[]>`

#### Examples

    (async () => {
      try {
        let getChainTips = await bitbox.Blockchain.getChainTips();
        console.log(getChainTips);
      } catch(error) {
       console.error(error)
      }
    })()

    // [ { height: 529235,
    //   hash: '00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236',
    //   branchlen: 0,
    //   status: 'active' },
    // { height: 527442,
    //   hash: '0000000000000000014cbf7b7aa12e52dd97db4b1ba5f39dccae37773af9272e',
    //   branchlen: 1,
    //   status: 'invalid' },
    // { height: 526861,
    //   hash: '00000000000000000225b070818bbafd95842ecbd25edf39bff54a7aa5c8fd10',
    //   branchlen: 1,
    //   status: 'valid-headers' } ]

### `getDifficulty`

Returns the proof-of-work difficulty as a multiple of the minimum difficulty.

#### Result

n `Promise<number>`: the proof-of-work difficulty as a multiple of the minimum difficulty.

#### Examples

    (async () => {
      try {
        let getDifficulty = await bitbox.Blockchain.getDifficulty();
        console.log(getDifficulty);
      } catch(error) {
       console.error(error)
      }
    })()

    // 702784497476.8376

<!-- ### `getMempoolAncestors`

If txid is in the mempool, returns all in-mempool ancestors.

#### Arguments

1.  txid `string`
2.  verbose `boolean` **optional**: True for a json object, false for array of transaction ids

#### Result

ancestors `Promise<any>`

#### Examples

    (async () => {
      try {
        let getMempoolAncestors = await bitbox.Blockchain.getMempoolAncestors("fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33");
        console.log(getMempoolAncestors);
      } catch(error) {
       console.error(error)
      }
    })()

### `getMempoolDescendants`

If txid is in the mempool, returns all in-mempool descendants.

#### Arguments

1.  txid `string`
2.  verbose `boolean` **optional**: True for a json object, false for array of transaction ids

#### Result

descendants `Promise<any>`

#### Examples

    (async () => {
      try {
        let getMempoolDescendants = await bitbox.Blockchain.getMempoolDescendants("fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33");
        console.log(getMempoolDescendants);
      } catch(error) {
       console.error(error)
      }
    })() -->

### `getMempoolEntry`

Returns mempool data for given transaction

#### Arguments

- txids (required):
  - `string`: TXID currently in mempool
  - `string[]`: Array of TXIDs

#### Result

- entry:
  - `Promise<any>`: containing details about the single mempool entry.
  - `Promise<any[]>`: Array of Objects with details about mempool entries.

#### Examples

    (async () => {
      try {
        let getMempoolEntry = await bitbox.Blockchain.getMempoolEntry("fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33");
        console.log(getMempoolEntry);
      } catch(error) {
       console.error(error)
      }
    })()

    // {
    //   "size": 372,
    //   "fee": 0.00000374,
    //   "modifiedfee": 0.00000374,
    //   "time": 1547738850,
    //   "height": 565716,
    //   "startingpriority": 26524545.3974359,
    //   "currentpriority": 26524545.3974359,
    //   "descendantcount": 1,
    //   "descendantsize": 372,
    //   "descendantfees": 374,
    //   "ancestorcount": 1,
    //   "ancestorsize": 372,
    //   "ancestorfees": 374,
    //   "depends": []
    // }

    (async () => {
      try {
        let getMempoolEntry = await bitbox.Blockchain.getMempoolEntry([
          "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
          "defea04c38ee00cf73ad402984714ed22dc0dd99b2ae5cb50d791d94343ba79b"
          ]);
        console.log(getMempoolEntry);
      } catch(error) {
       console.error(error)
      }
    })()

    // [
    //   {
    //     "size": 372,
    //     "fee": 0.00000374,
    //     "modifiedfee": 0.00000374,
    //     "time": 1547738850,
    //     "height": 565716,
    //     "startingpriority": 26524545.3974359,
    //     "currentpriority": 26524545.3974359,
    //     "descendantcount": 1,
    //     "descendantsize": 372,
    //     "descendantfees": 374,
    //     "ancestorcount": 1,
    //     "ancestorsize": 372,
    //     "ancestorfees": 374,
    //     "depends": []
    //   },
    //   {
    //     "size": 372,
    //     "fee": 0.00000374,
    //     "modifiedfee": 0.00000374,
    //     "time": 1547738850,
    //     "height": 565716,
    //     "startingpriority": 26524545.3974359,
    //     "currentpriority": 26524545.3974359,
    //     "descendantcount": 1,
    //     "descendantsize": 372,
    //     "descendantfees": 374,
    //     "ancestorcount": 1,
    //     "ancestorsize": 372,
    //     "ancestorfees": 374,
    //     "depends": []
    //   }
    // ]

### `getMempoolInfo`

Returns details on the active state of the TX memory pool.

#### Result

entry `Promise<MempoolInfo>`

#### Examples

    (async () => {
      try {
        let getMempoolInfo = await bitbox.Blockchain.getMempoolInfo();
        console.log(getMempoolInfo);
      } catch(error) {
       console.error(error)
      }
    })()

    // { size: 257,
    // bytes: 98257,
    // usage: 365840,
    // maxmempool: 300000000,
    // mempoolminfee: 0 }

### `getRawMempool`

Returns all transaction ids in memory pool as a json array of string transaction ids.

#### Arguments

1.  verbose `boolean` **optional**: True for a json object, false for array of transaction ids

#### Result

rawMemPool `Promise<string[] | object[]>`

#### Examples

    (async () => {
      try {
        let getRawMempool = await bitbox.Blockchain.getRawMempool(true);
        console.log(getRawMempool);
      } catch(error) {
       console.error(error)
      }
    })()

    // [  {'2ae541af20db6f2b50410f418af56e349d08877d685f6cf54df54658e892db7a':
    //  { size: 237,
    //    fee: 0.00000238,
    //    modifiedfee: 0.00000238,
    //    time: 1525732015,
    //    height: 529235,
    //    startingpriority: 0,
    //    currentpriority: 0,
    //    descendantcount: 10,
    //    descendantsize: 2376,
    //    descendantfees: 2380,
    //    ancestorcount: 3,
    //    ancestorsize: 712,
    //    ancestorfees: 714,
    //    depends:
    //     [ 'e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e' ] },]

### `getTxOut`

Returns details about an unspent transaction output.

#### Arguments

1.  txid `string`: The transaction id
2.  n `number`: vout number
3.  include_mempool `boolean` **optional**: Whether to include the mempool

#### Result

txOut `Promise<TxOut | null>`

#### Examples

    (async () => {
      try {
        let getTxOut = await bitbox.Blockchain.getTxOut("e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e", 1);
        console.log(getTxOut);
      } catch(error) {
       console.error(error)
      }
    })()

    // null

### `getTxOutProof`

Returns a hex-encoded proof that "txid" was included in a block.

#### Arguments

- txids:
  - `string`: A single string containing a txid.
  - `string[]`

#### Result

- proof:
  - `Promise<string>`: A string that is a serialized, hex-encoded data for the proof.
  - `Promise<string[]>`: Array of strings that are a serialized, hex-encoded data for the proof.

#### Examples

    (async () => {
      try {
        let getTxOutProof = await bitbox.Blockchain.getTxOutProof("e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e");
        console.log(getTxOutProof);
      } catch(error) {
       console.error(error)
      }
    })()

    // "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"

    (async () => {
      try {
        let getTxOutProof = await bitbox.Blockchain.getTxOutProof([
          "e25682caafc7000645d59f4c11d8d594b2943979b9d8fafb9f946e2b35c21b7e",
          "d16662463fd98eb96c8f6898d58a4461ac3d0120f4d0aea601d72b37759f261c"
        ]);
        console.log(getTxOutProof);
      } catch(error) {
       console.error(error)
      }
    })()

    // [
    //   "010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e60800000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe021f7449ffff001d36b4af9a0100000001338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe0101",
    //   "010000007de867cc8adc5cc8fb6b898ca4462cf9fd667d7830a275277447e60800000000338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe021f7449ffff001d36b4af9a0100000001338f121232e169d3100edd82004dc2a1f0e1f030c6c488fa61eafa930b0528fe0101"
    // ]

<!-- ### `preciousBlock`

Treats a block as if it were received before others with the same work. A later preciousblock call can override the effect of an earlier one. The effects of preciousblock are not retained across restarts.

#### Arguments

1.  blockhash `string`: the hash of the block to mark as precious

#### Result

preciouBlock `Promise<any>`

#### Examples

    (async () => {
      try {
        let preciousBlock = await bitbox.Blockchain.preciousBlock("00000000000000000108641af52e01a447b1f9d801571f93a0f20a8cbf80c236");
        console.log(preciousBlock);
      } catch(error) {
       console.error(error)
      }
    })() -->

<!-- ### `pruneBlockchain`

#### Arguments

1.  height `number`: The block height to prune up to. May be set to a discrete height, or a unix timestamp to prune blocks whose block time is at least 2 hours older than the provided timestamp.

#### Result

n `Promise<number>`: Height of the last block pruned.

#### Examples

    (async () => {
      try {
        let pruneBlockchain = await bitbox.Blockchain.pruneBlockchain(1000);
        console.log(pruneBlockchain);
      } catch(error) {
       console.error(error)
      }
    })() -->

<!-- ### `verifyChain`

Verifies blockchain database.

#### Arguments

1.  checklevel `number` **optional**: How thorough the block verification is.
2.  nblocks `number` **optional**: The number of blocks to check.

#### Result

true|false `Promise<boolean>`: Verified or not

#### Examples

    (async () => {
      try {
        let verifyChain = await bitbox.Blockchain.verifyChain();
        console.log(verifyChain);
      } catch(error) {
       console.error(error)
      }
    })()
    // true -->

### `verifyTxOutProof`

Verifies that a proof points to a transaction in a block, returning the
transaction it commits to and throwing an RPC error if the block is not in our
best chain

#### Arguments

- proof (required):
  - `string`: The hex-encoded proof generated by gettxoutproof
  - `string[]`: The hex-encoded proof generated by gettxoutproof

#### Result

- txids `Promise<string[]>`: The txid(s) which the proof commits to, or empty array if the proof is invalid

#### Examples

    (async () => {
      try {
        const proof = "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
        let verifyTxOutProof = await bitbox.Blockchain.verifyTxOutProof(proof);
        console.log(verifyTxOutProof);
      } catch(error) {
       console.error(error)
      }
    })()

    // [
    //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
    // ]

    (async () => {
      try {
        const proof = "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01"
        let verifyTxOutProof = await bitbox.Blockchain.verifyTxOutProof([proof, proof]);
        console.log(verifyTxOutProof);
      } catch(error) {
       console.error(error)
      }
    })()

    // [
    //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7",
    //   "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7"
    // ]

## Interfaces

### MempoolInfo

    {
      size: number
      bytes: number
      usage: number
      maxmempool: number
      mempoolminfee: number
    }

### BlockchainInfo

    {
      chain: string
      blocks: number
      headers: number
      bestblockhash: string
      difficulty: number
      mediantime: number
      verificationprogress: number
      chainwork: string
      pruned: boolean
      softforks: object[]
      bip9_softforks: object
    }

### BlockHeader

    {
      hash: string
      confirmations: number
      height: number
      version: number
      versionHex: string
      merkleroot: string
      time: number
      mediantime: number
      nonce: number
      bits: string
      difficulty: number
      chainwork: string
      previousblockhash: string
      nextblockhash: string
    }

### ChainTip

    {
      height: number
      hash: string
      branchlen: number
      status: string
    }

### TxOut

    {
      bestblock: string
      confirmations: number
      value: number
      scriptPubKey: {
        asm: string
        hex: string
        reqSigs: number
        type: string
        addresses: string[]
      }
      version: number
      coinbase: boolean
    }
