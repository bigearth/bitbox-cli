/*
  Mock data used for unit testing.
*/

module.exports = {
  decodedTx: {
    txid: "a332237d82a2543af1b0e1ae3c8cea1610c290ebcaf084a7e9894a61de0be988",
    hash: "a332237d82a2543af1b0e1ae3c8cea1610c290ebcaf084a7e9894a61de0be988",
    version: 2,
    size: 226,
    locktime: 0,
    vin: [
      {
        txid:
          "21cced645eab150585ed7ca7c96edebab5793cc0a3b3b286c42fd7d6d798b5b9",
        vout: 1,
        scriptSig: {
          asm:
            "3045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd41390[ALL|FORKID] 0360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413d",
          hex:
            "483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413d"
        },
        sequence: 4294967295
      }
    ],
    vout: [
      {
        value: 0.0001,
        n: 0,
        scriptPubKey: {
          asm:
            "OP_DUP OP_HASH160 eb4b180def88e3f5625b2d8ae2c098ff7d85f664 OP_EQUALVERIFY OP_CHECKSIG",
          hex: "76a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac",
          reqSigs: 1,
          type: "pubkeyhash",
          addresses: ["bitcoincash:qr45kxqda7yw8atztvkc4ckqnrlhmp0kvsan3xnznu"]
        }
      },
      {
        value: 0.09989752,
        n: 1,
        scriptPubKey: {
          asm:
            "OP_DUP OP_HASH160 eb4b180def88e3f5625b2d8ae2c098ff7d85f664 OP_EQUALVERIFY OP_CHECKSIG",
          hex: "76a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac",
          reqSigs: 1,
          type: "pubkeyhash",
          addresses: ["bitcoincash:qr45kxqda7yw8atztvkc4ckqnrlhmp0kvsan3xnznu"]
        }
      }
    ]
  },

  rawTx:
    "010000000186db5c732438733e305e2e6fb6f15cab898e61202e3d8708c8cf9db90d20a862000000006a47304402202578ad648a8bab3065295155a07337d9d01c165f506e20faeaf582a9feca188602207aac7cab6e6ff9c63ff1b95543f1f2f0b866a2494d98b1bf58055094c0989e80412102b84cc40b16cf6f76ac47fff353a301f8394d9a8f0199c56269897ae3e11559eeffffffff029aa7ce06000000001976a914270f290bf8f4eba093063330b9a9e8202b66217b88acb06b3c00000000001976a9148b55a3985e74ea4137f0f1749439f161b52b861c88ac00000000",

  decodedTx: {
    txid: "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1",
    hash: "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1",
    version: 1,
    size: 225,
    locktime: 0,
    vin: [
      {
        txid:
          "62a8200db99dcfc808873d2e20618e89ab5cf1b66f2e5e303e733824735cdb86",
        vout: 0,
        scriptSig: {
          asm:
            "304402202578ad648a8bab3065295155a07337d9d01c165f506e20faeaf582a9feca188602207aac7cab6e6ff9c63ff1b95543f1f2f0b866a2494d98b1bf58055094c0989e80[ALL|FORKID] 02b84cc40b16cf6f76ac47fff353a301f8394d9a8f0199c56269897ae3e11559ee",
          hex:
            "47304402202578ad648a8bab3065295155a07337d9d01c165f506e20faeaf582a9feca188602207aac7cab6e6ff9c63ff1b95543f1f2f0b866a2494d98b1bf58055094c0989e80412102b84cc40b16cf6f76ac47fff353a301f8394d9a8f0199c56269897ae3e11559ee"
        },
        sequence: 4294967295
      }
    ],
    vout: [
      {
        value: 1.14206618,
        n: 0,
        scriptPubKey: {
          asm:
            "OP_DUP OP_HASH160 270f290bf8f4eba093063330b9a9e8202b66217b OP_EQUALVERIFY OP_CHECKSIG",
          hex: "76a914270f290bf8f4eba093063330b9a9e8202b66217b88ac",
          reqSigs: 1,
          type: "pubkeyhash",
          addresses: ["bitcoincash:qqns72gtlr6whgynqcenpwdfaqszke3p0vntl8lvhz"]
        }
      },
      {
        value: 0.03959728,
        n: 1,
        scriptPubKey: {
          asm:
            "OP_DUP OP_HASH160 8b55a3985e74ea4137f0f1749439f161b52b861c OP_EQUALVERIFY OP_CHECKSIG",
          hex: "76a9148b55a3985e74ea4137f0f1749439f161b52b861c88ac",
          reqSigs: 1,
          type: "pubkeyhash",
          addresses: ["bitcoincash:qz94tgucte6w5sfh7rchf9pe79sm22uxrsn6dh8smf"]
        }
      }
    ],
    hex:
      "010000000186db5c732438733e305e2e6fb6f15cab898e61202e3d8708c8cf9db90d20a862000000006a47304402202578ad648a8bab3065295155a07337d9d01c165f506e20faeaf582a9feca188602207aac7cab6e6ff9c63ff1b95543f1f2f0b866a2494d98b1bf58055094c0989e80412102b84cc40b16cf6f76ac47fff353a301f8394d9a8f0199c56269897ae3e11559eeffffffff029aa7ce06000000001976a914270f290bf8f4eba093063330b9a9e8202b66217b88acb06b3c00000000001976a9148b55a3985e74ea4137f0f1749439f161b52b861c88ac00000000",
    blockhash:
      "000000000000000003a09a7d68a0d62fd0ab51c368372e46bac84277e2df47e2",
    confirmations: 20168,
    time: 1547752564,
    blocktime: 1547752564
  }
}
