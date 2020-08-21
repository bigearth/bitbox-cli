# Transaction

## Transaction

### `details`

Return details about a Transaction.

#### Arguments

- txids `string | string[]`: transaction ID

#### Result

details `Promise<TxnDetails | TxnDetails[]>`

#### Examples

    // single txid
    (async () => {
      try {
        let details = await bitbox.Transaction.details('a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8');
        console.log(details);
      } catch(error) {
       console.error(error)
      }
    })()

    // {
    //   "txid": "a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8",
    //   "version": 1,
    //   "locktime": 0,
    //   "vin": [
    //     {
    //       "coinbase": "04ffff001d029804",
    //       "sequence": 4294967295,
    //       "n": 0
    //     }
    //   ],
    //   "vout": [
    //     {
    //       "value": "50.00000000",
    //       "n": 0,
    //       "scriptPubKey": {
    //         "hex": "41047737b5d3036fcc149960d41ce31d47c5a47d3a843b23898d28a5e24d1482616860ba5bc61f060586c7ac2b0e7e3ec76e4763cf897d5b8b1110691832c9368f8cac",
    //         "asm": "047737b5d3036fcc149960d41ce31d47c5a47d3a843b23898d28a5e24d1482616860ba5bc61f060586c7ac2b0e7e3ec76e4763cf897d5b8b1110691832c9368f8c OP_CHECKSIG",
    //         "addresses": [
    //           "1QEHawPyyALtoDcXTpQsMNtQCoUswtWRJu"
    //         ],
    //         "type": "pubkeyhash"
    //       },
    //       "spentTxId": null,
    //       "spentIndex": null,
    //       "spentHeight": null
    //     }
    //   ],
    //   "blockhash": "000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0",
    //   "blockheight": 507,
    //   "confirmations": 528404,
    //   "time": 1231973656,
    //   "blocktime": 1231973656,
    //   "isCoinBase": true,
    //   "valueOut": 50,
    //   "size": 135
    // }

    // array of txids
    (async () => {
      try {
        let details = await bitbox.Transaction.details(["a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8", "113f1fe1c454a56436d4f93c7c6e315d1ed985d111299e9c2a3e2d3d1e9f177f"]);
        console.log(details);
      } catch(error) {
       console.error(error)
      }
    })()

    // [ { txid: 'a85fa3d831ab6b0305e7ff88d2d4941e25a810d4461635df51490653822071a8',
    //   version: 1,
    //   locktime: 0,
    //   vin: [ [Object] ],
    //   vout: [ [Object] ],
    //   blockhash: '000000001c6aeec19265e9cc3ded8ba5ef5e63fae7747f30bf9c02c7bc8883f0',
    //   blockheight: 507,
    //   confirmations: 528728,
    //   time: 1231973656,
    //   blocktime: 1231973656,
    //   isCoinBase: true,
    //   valueOut: 50,
    //   size: 135 },
    // { txid: '113f1fe1c454a56436d4f93c7c6e315d1ed985d111299e9c2a3e2d3d1e9f177f',
    //   version: 1,
    //   locktime: 0,
    //   vin: [ [Object], [Object] ],
    //   vout: [ [Object], [Object] ],
    //   blockhash: '000000000000000001da2a49a63fb7d0d0893ebcb892aee3fbbfa47c803f9cf0',
    //   blockheight: 418195,
    //   confirmations: 111040,
    //   time: 1467019582,
    //   blocktime: 1467019582,
    //   valueOut: 2.09965689,
    //   size: 372,
    //   valueIn: 2.0997689,
    //   fees: 0.00011201 } ]

## Interfaces

### TxnDetails

    {
      txid: string
      version: number
      locktime: number
      vin: object[]
      vout: object[]
      blockhash: string
      blockheight: number
      confirmations: number
      time: number
      blocktime: number
      isCoinBase: boolean
      valueOut: number
      size: number
    }
