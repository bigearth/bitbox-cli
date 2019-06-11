/*
  Mock data used for unit testing.
*/

module.exports = {
  details: {
    legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
    cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
    balance: 300.0828874,
    balanceSat: 30008288740,
    totalReceived: 12945.45174649,
    totalReceivedSat: 1294545174649,
    totalSent: 12645.36885909,
    totalSentSat: 1264536885909,
    unconfirmedBalance: 0,
    unconfirmedBalanceSat: 0,
    unconfirmedTxApperances: 0,
    txApperances: 1042,
    transactions: [
      "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309"
    ],
    currentPage: 0,
    pagesTotal: 1,
    slpAddress: "simpleledger:qrdka2205f4hyukutc2g0s6lykperc8nsuc8pkcp7h"
  },

  // An example of address with multiple utxos.
  utxos1: {
    utxos: [
      {
        txid:
          "27ec8512c1a9ee9e9ae9b98eb60375f1d2bd60e2e76a1eff5a45afdbc517cf9c",
        vout: 0,
        amount: 0.001,
        satoshis: 100000,
        height: 560430,
        confirmations: 25161
      },
      {
        txid:
          "6e1ae1bf7db6de799ec1c05ab2816ac65549bd80141567af088e6f291385b07d",
        vout: 0,
        amount: 0.0013,
        satoshis: 130000,
        height: 560039,
        confirmations: 25552
      }
    ],
    legacyAddress: "1M1FYu4zuVaxRPWLZG5CnP8qQrZaqu6c2L",
    cashAddress: "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
    slpAddress: "simpleledger:qrdka2205f4hyukutc2g0s6lykperc8nsuc8pkcp7h",
    scriptPubKey: "76a914db6ea94fa26b7272dc5e1487c35f258391e0f38788ac"
  },

  // An example of an address with no utxos.
  utxos2: {
    utxos: [],
    legacyAddress: "19LXyLnux1tbTdHnMuYAgDZ81ZQDWEi12g",
    cashAddress: "bitcoincash:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4qa7nwqa5v",
    slpAddress: "simpleledger:qpdh9s677ya8tnx7zdhfrn8qfyvy22wj4q39c44a2j",
    scriptPubKey: ""
  },

  // Example of an address with an unconfirmed UTXO
  unconfirmed1: {
    utxos: [
      {
        txid:
          "3904ffe6f8fba4ceda5e887130f60fcb18bdc7dcee10392a57f89475c5c108f1",
        vout: 0,
        amount: 0.03608203,
        satoshis: 3608203,
        confirmations: 0,
        ts: 1559670801
      }
    ],
    legacyAddress: "1AyWs8U4HUnTLmxxFiGoJbsXauRsvBrcKW",
    cashAddress: "bitcoincash:qpkkjkhe29mqhqmu3evtq3dsnruuzl3rku6usknlh5",
    slpAddress: "simpleledger:qpkkjkhe29mqhqmu3evtq3dsnruuzl3rkuk8mdxlf2",
    scriptPubKey: "76a9146d695af951760b837c8e58b045b098f9c17e23b788ac"
  },

  // Example of an address without any unconfirmed utxos.
  unconfirmed2: {
    utxos: [],
    legacyAddress: "1M1FYu4zuVaxRPWLZG5CnP8qQrZaqu6c2L",
    cashAddress: "bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf",
    slpAddress: "simpleledger:qrdka2205f4hyukutc2g0s6lykperc8nsuc8pkcp7h",
    scriptPubKey: "76a914db6ea94fa26b7272dc5e1487c35f258391e0f38788ac"
  },

  transactions: {
    pagesTotal: 1,
    txs: [
      {
        txid:
          "ec7bc8349386e3e1939bbdc4f8092fdbdd6a380734e68486b558cd594c451d5b",
        version: 2,
        locktime: 0,
        vin: [
          {
            txid:
              "4f1fc57c33659628938db740449bf92fb75799e1d5750a4aeef80eb52d6df1e0",
            vout: 0,
            sequence: 4294967295,
            n: 0,
            scriptSig: {
              hex:
                "483045022100a3662a19ae384a1ceddea57765e425e61b04823e976d574da3911ac6b55d7f9b02200e571d985bce987675a2d58587a346fa40c39f4df13dc88548a92c52d5b24422412103f953f7630acc15bd3f5078c698f3af777286ae955b57e4857c158f75d87adb5f",
              asm:
                "3045022100a3662a19ae384a1ceddea57765e425e61b04823e976d574da3911ac6b55d7f9b02200e571d985bce987675a2d58587a346fa40c39f4df13dc88548a92c52d5b24422[ALL|FORKID] 03f953f7630acc15bd3f5078c698f3af777286ae955b57e4857c158f75d87adb5f"
            },
            addr: "17HPz8RQ4XM6mjre6aspvqyj1j648CZidM",
            valueSat: 1111,
            value: 0.00001111,
            doubleSpentTxID: null
          },
          {
            txid:
              "126d62c299e7e14c66fe0b485d13082c23641f003690462046bc24ad2d1180c1",
            vout: 0,
            sequence: 4294967295,
            n: 1,
            scriptSig: {
              hex:
                "47304402203e3f923207111ff9bbd2fb5ab1a49a9145ad809ee0cad0e0ddaed64bfe38dc16022012ee288fb413bd500c63f8bb95e46b6b57d34762decd46b7188478a1c398eeda412103f953f7630acc15bd3f5078c698f3af777286ae955b57e4857c158f75d87adb5f",
              asm:
                "304402203e3f923207111ff9bbd2fb5ab1a49a9145ad809ee0cad0e0ddaed64bfe38dc16022012ee288fb413bd500c63f8bb95e46b6b57d34762decd46b7188478a1c398eeda[ALL|FORKID] 03f953f7630acc15bd3f5078c698f3af777286ae955b57e4857c158f75d87adb5f"
            },
            addr: "17HPz8RQ4XM6mjre6aspvqyj1j648CZidM",
            valueSat: 1000,
            value: 0.00001,
            doubleSpentTxID: null
          }
        ],
        vout: [
          {
            value: "0.00001736",
            n: 0,
            scriptPubKey: {
              hex: "76a914d96ac75ca8df9729d278da50ccd7355c5785444e88ac",
              asm:
                "OP_DUP OP_HASH160 d96ac75ca8df9729d278da50ccd7355c5785444e OP_EQUALVERIFY OP_CHECKSIG",
              addresses: ["1LpbYkEM5cryfhs58tH8c93p4SGzit7UrP"],
              type: "pubkeyhash"
            },
            spentTxId: null,
            spentIndex: null,
            spentHeight: null
          }
        ],
        blockheight: -1,
        confirmations: 0,
        time: 1559673337,
        valueOut: 0.00001736,
        size: 339,
        valueIn: 0.00002111,
        fees: 0.00000375
      }
    ],
    legacyAddress: "1LpbYkEM5cryfhs58tH8c93p4SGzit7UrP",
    cashAddress: "bitcoincash:qrvk436u4r0ew2wj0rd9pnxhx4w90p2yfc29ta0d2n",
    currentPage: 0
  }
}
