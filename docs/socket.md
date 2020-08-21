# Socket

### `constructor`

Create new Socket.

#### Arguments

1.  config `Object`: with properties:
    1.  wsURL `string`: optional, Defaults to `wss://ws.bitcoin.com`
    2.  bitsocketURL `string`: optional
    3.  restURL `string`: optional
    4.  callback `Function`: optional

#### Result

Socket `Socket`

#### Examples

      // instance of Socket
      let socket = new bitbox.Socket({callback: () => {console.log('connected')}, wsURL: 'wss://ws.bitcoin.com'})

### `listen`

Listen on a websocket to get real\-time data.

#### Arguments

1.  query `string | object`: type of data to return in real time. `transactions` or `blocks` are valid `string`s. Any BitSocket `query` object is also valid
2.  callback `function`: function to be called which gets passed back `message` in real time.

#### Result

data `Object`: data returned in real\-time over a websocket

#### Examples

      // raw websocket data example

      let socket = new bitbox.Socket({callback: () => {console.log('connected')}, wsURL: 'wss://ws.bitcoin.com'})
      socket.listen('transactions', (message) => {
        console.log(message)
      })
      // returns the following
      {
        "format": {
          "txid": "edbfdc5a149741009df15f8b518bdebc54261854fcdfefd7d8aa8a78b5e14250",
          "version": 2,
          "locktime": 0,
          "size": 225,
          "vsize": 225
        },
        "inputs": [
          {
            "txid": "92923f5048703bbf4cb78344d200935b37b88cfaa767635cf0c4275942c9b382",
            "n": 3,
            "script": "304502210099b59aaf9238612ad9ab706cb469dbd13662177e44cfdc5f29101e9e142ceb10022018061daf1127544f1b97817f2430b9f9c78efe54b51303c91c723807834e4ece41 025cc1f660956d4b924a0792b222ddd9b1742280c5e283281364a9b63123fe23e2",
            "sequence": 4294967295
          }
        ],
        "outputs": [
          {
            "satoshi": 6526,
            "value": "0.00006526",
            "n": 0,
            "scriptPubKey": {
              "asm": "OP_DUP OP_HASH160 670180972852c974359232baa64f4019f205bfbc OP_EQUALVERIFY OP_CHECKSIG",
              "hex": "76a914670180972852c974359232baa64f4019f205bfbc88ac",
              "type": "pubkeyhash",
              "addresses": [
                "1APeQ9A39esuwsPDogNZYpGS5CxC54m5CL"
              ]
            }
          },
          {
            "satoshi": 0,
            "value": "0.00000000",
            "n": 1,
            "scriptPubKey": {
              "asm": "OP_RETURN 73747265737374657374626974636f696e2e63617368",
              "hex": "6a1673747265737374657374626974636f696e2e63617368",
              "type": "nulldata",
              "addresses": []
            }
          }
        ]
      }


      let socket = new bitbox.Socket({callback: () => {console.log('connected')}, wsURL: 'https://ws.bitcoin.com'})
      socket.listen('blocks', (message) => {
        console.log(message)
      })
      // returns the following
      {
        "transactions": 183,
        "totalBCHSent": 1057662477171,
        "reward": 1250000000,
        "prevHash": "cfac607ebae85629ede7d34f36064d24974f95c90b89c5000000000000000000",
        "id": "0d2d939b3793ff8b2e130fe1f5257abd7784bfe147009f000000000000000000",
        "hash": "0000000000000000009f0047e1bf8477bd7a25f5e10f132e8bff93379b932d0d",
        "merkleRoot": "ac040e9130a71647f29dc55355fbe8db8bb1a5f1ac86b7ee1be0ae8488dc407e",
        "version": 549453824,
        "time": 1558667998,
        "bits": 402882446,
        "nonce": 2478895818
      }

      // BitSocket query example
      let socket = new bitbox.Socket({
        callback: () => {
          console.log("connected")
        },
        wsURL: "wss://ws.bitcoin.com"
      })
      socket.listen(
        {
          v: 3,
          q: { find: {} }
        },
        msg => {
          setTimeout(function() {
            socket.close(() => {
              console.log("closed")
            })
          }, 5000)
        }
      )
      // returns
      // {"type":"mempool","data":[{"tx":{"h":"09ff3049857875089519407e6d00634c901ca3e42b79c2357f07ca0806255abd"},"in":[{"i":0,"b0":"MEUCIQD1aIxxL/QsWBU+yaRTWi8CPtF22Lgj9FyFgs/Tk0MzTAIgTrw3P06CszZYN3hE6AzRSntvutzpgb5YM5ydgQJrWhJB","b1":"BGf/LfIPKLxirRiFJYaPQdRh99qzweUAMUzbUhjlY3v9D5wC61s/OD9pjSj/E1R+rwXdkhYTCGHdAhaCTp1zN+M=","str":"3045022100f5688c712ff42c58153ec9a4535a2f023ed176d8b823f45c8582cfd39343334c02204ebc373f4e82b33658377844e80cd14a7b6fbadce981be58339c9d81026b5a1241 0467ff2df20f28bc62ad188525868f41d461f7dab3c1e500314cdb5218e5637bfd0f9c02eb5b3f383f698d28ff13547eaf05dd9216130861dd0216824e9d7337e3","e":{"h":"6749fdb788c89abcbd28008470b7823e6658ce82b6939135ea52dd6df3d529bd","i":1,"a":"qqrxa0h9jqnc7v4wmj9ysetsp3y7w9l36u8gnnjulq"},"h0":"3045022100f5688c712ff42c58153ec9a4535a2f023ed176d8b823f45c8582cfd39343334c02204ebc373f4e82b33658377844e80cd14a7b6fbadce981be58339c9d81026b5a1241","h1":"0467ff2df20f28bc62ad188525868f41d461f7dab3c1e500314cdb5218e5637bfd0f9c02eb5b3f383f698d28ff13547eaf05dd9216130861dd0216824e9d7337e3"}],"out":[{"i":0,"b0":{"op":106},"b1":"XUh5xw==","s1":"]Hy�","b2":"Rjj8ADakaq4888s+Ock4xDyiM5w8CFCcNgQ0WDfncRM=","s2":"F8�\u00006�j�<��>9�8�<�3�<\bP�6\u00044X7�q\u0013","str":"OP_RETURN 5d4879c7 4638fc0036a46aae3cf3cb3e39c938c43ca2339c3c08509c3604345837e77113","e":{"v":0,"i":0},"h1":"5d4879c7","h2":"4638fc0036a46aae3cf3cb3e39c938c43ca2339c3c08509c3604345837e77113"},{"i":1,"b0":{"op":118},"b1":{"op":169},"b2":"Bm6+5ZAnjzKu3IpIZXAMSecX8dc=","s2":"\u0006n��'�2�܊Hep\fI�\u0017��","b3":{"op":136},"b4":{"op":172},"str":"OP_DUP OP_HASH160 066ebee590278f32aedc8a4865700c49e717f1d7 OP_EQUALVERIFY OP_CHECKSIG","e":{"v":2020,"i":1,"a":"qqrxa0h9jqnc7v4wmj9ysetsp3y7w9l36u8gnnjulq"},"h2":"066ebee590278f32aedc8a4865700c49e717f1d7"}],"_id":"5d4879c8a236c608b89c551e"}]}
      // closed

### `close`

Close websocket connection

#### Arguments

1.  callback `function` (optional): function to be called.

#### Examples

      let socket = new bitbox.Socket({callback: () => {console.log('connected')}, wsURL: 'wss://ws.bitcoin.com'})
      socket.listen('transactions', (message) => {
        socket.close(() => {
          console.log("closed")
        })
      })
      // returns the following
      // closed
