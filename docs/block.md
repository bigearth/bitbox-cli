# Block

### `detailsByHeight`

Return details about a Block. Lookup the block with a block height.

#### Arguments

- blocks (required):
  - `number`: block height
  - `number[]` of Numbers: block heights

#### Result

- details
  - `Promise<BlockDetails>`
  - `Promise<BlockDetails[]>`

#### Examples

    (async () => {
      try {
        let details = await bitbox.Block.detailsByHeight(500000);
        console.log(details);
      } catch(error) {
       console.error(error)
      }
    })()

    // {
    //   "hash": "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
    //   "size": 216,
    //   "height": 507,
    //   "version": 1,
    //   "merkleroot": "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
    //   "tx": [
    //     "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
    //   ],
    //   "time": 1231973656,
    //   "nonce": 330467862,
    //   "bits": "1d00ffff",
    //   "difficulty": 1,
    //   "chainwork": "000000000000000000000000000000000000000000000000000001fc01fc01fc",
    //   "confirmations": 528404,
    //   "previousblockhash": "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
    //   "nextblockhash": "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
    //   "reward": 50,
    //   "isMainChain": true,
    //   "poolInfo": {
    //      "poolName": "ViaBTC",
    //      "url": "https://viabtc.com/"
    //    }
    // }


    (async () => {
      try {
        let details = await bitbox.Block.detailsByHeight([500000, 500001]);
        console.log(details);
      } catch(error) {
       console.error(error)
      }
    })()

    // [{
    //   "hash": "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
    //   "size": 216,
    //   "height": 507,
    //   "version": 1,
    //   "merkleroot": "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
    //   "tx": [
    //     "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
    //   ],
    //   "time": 1231973656,
    //   "nonce": 330467862,
    //   "bits": "1d00ffff",
    //   "difficulty": 1,
    //   "chainwork": "000000000000000000000000000000000000000000000000000001fc01fc01fc",
    //   "confirmations": 528404,
    //   "previousblockhash": "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
    //   "nextblockhash": "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
    //   "reward": 50,
    //   "isMainChain": true,
    //   "poolInfo": {
    //      "poolName": "ViaBTC",
    //      "url": "https://viabtc.com/"
    //    }
    // },
    // {
    //   "hash": "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
    //   "size": 216,
    //   "height": 507,
    //   "version": 1,
    //   "merkleroot": "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
    //   "tx": [
    //     "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
    //   ],
    //   "time": 1231973656,
    //   "nonce": 330467862,
    //   "bits": "1d00ffff",
    //   "difficulty": 1,
    //   "chainwork": "000000000000000000000000000000000000000000000000000001fc01fc01fc",
    //   "confirmations": 528404,
    //   "previousblockhash": "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
    //   "nextblockhash": "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
    //   "reward": 50,
    //   "isMainChain": true,
    //   "poolInfo": {}
    // }]

### `detailsByHash`

Return details about a Block. Lookup the block with a block hash.

#### Arguments

- hashes (required):
  - `string`: block hash
  - `string[]` of Strings: block hashes

#### Result

- details
  - `Promise<BlockDetails>`
  - `Promise<BlockDetails[]>`

#### Examples

    (async () => {
      try {
        let details = await bitbox.Block.hash("000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201");
        console.log(details);
      } catch(error) {
       console.error(error)
      }
    })()

    // {
    //   "hash": "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
    //   "size": 216,
    //   "height": 507,
    //   "version": 1,
    //   "merkleroot": "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
    //   "tx": [
    //     "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
    //   ],
    //   "time": 1231973656,
    //   "nonce": 330467862,
    //   "bits": "1d00ffff",
    //   "difficulty": 1,
    //   "chainwork": "000000000000000000000000000000000000000000000000000001fc01fc01fc",
    //   "confirmations": 528404,
    //   "previousblockhash": "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
    //   "nextblockhash": "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
    //   "reward": 50,
    //   "isMainChain": true,
    //   "poolInfo": {
    //      "poolName": "ViaBTC",
    //      "url": "https://viabtc.com/"
    //    }
    // }

    (async () => {
      try {
        let details = await bitbox.Block.detailsByHeight([
          "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201",
          "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201"
        ]);
        console.log(details);
      } catch(error) {
       console.error(error)
      }
    })()

    // [{
    //   "hash": "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
    //   "size": 216,
    //   "height": 507,
    //   "version": 1,
    //   "merkleroot": "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
    //   "tx": [
    //     "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
    //   ],
    //   "time": 1231973656,
    //   "nonce": 330467862,
    //   "bits": "1d00ffff",
    //   "difficulty": 1,
    //   "chainwork": "000000000000000000000000000000000000000000000000000001fc01fc01fc",
    //   "confirmations": 528404,
    //   "previousblockhash": "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
    //   "nextblockhash": "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
    //   "reward": 50,
    //   "isMainChain": true,
    //   "poolInfo": {
    //      "poolName": "ViaBTC",
    //      "url": "https://viabtc.com/"
    //    }
    // },
    // {
    //   "hash": "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
    //   "size": 216,
    //   "height": 507,
    //   "version": 1,
    //   "merkleroot": "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
    //   "tx": [
    //     "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8"
    //   ],
    //   "time": 1231973656,
    //   "nonce": 330467862,
    //   "bits": "1d00ffff",
    //   "difficulty": 1,
    //   "chainwork": "000000000000000000000000000000000000000000000000000001fc01fc01fc",
    //   "confirmations": 528404,
    //   "previousblockhash": "00000000a99525c043fd7e323414b60add43c254c44860094048f9c01e9a5fdd",
    //   "nextblockhash": "000000000d550f4161f2702165fdd782ec72ff9c541f864ebb8256b662b7e51a",
    //   "reward": 50,
    //   "isMainChain": true,
    //   "poolInfo": {}
    // }]

## Interfaces

### BlockDetails

    {
      hash: string
      size: number
      height: number
      version: number
      merkleroot: string
      tx: string[]
      time: number
      mediantime?: number
      nonce: number
      bits: string
      difficulty: number
      chainwork: string
      confirmations: number
      previousblockhash: string
      nextblockhash: string
      reward: number
      isMainChain: boolean
      poolInfo: object
    }
