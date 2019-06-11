/*
  Mock data used for unit testing.
*/

module.exports = {
  details: {
    txid: "fe28050b93faea61fa88c4c630f0e1f0a1c24d0082dd0e10d369e13212128f33",
    version: 1,
    locktime: 0,
    vin: [
      {
        coinbase: "04ffff001d02fd04",
        sequence: 4294967295,
        n: 0
      }
    ],
    vout: [
      {
        value: "50.00000000",
        n: 0,
        scriptPubKey: {
          hex:
            "4104f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446aac",
          asm:
            "04f5eeb2b10c944c6b9fbcfff94c35bdeecd93df977882babc7f3a2cf7f5c81d3b09a68db7f0e04f21de5d4230e75e6dbe7ad16eefe0d4325a62067dc6f369446a OP_CHECKSIG",
          addresses: ["1BW18n7MfpU35q4MTBSk8pse3XzQF8XvzT"],
          type: "pubkeyhash",
          cashAddrs: ["bitcoincash:qpej6mkrwca4tvy2snq4crhrf88v4ljspysx0ueetk"]
        },
        spentTxId: null,
        spentIndex: null,
        spentHeight: null
      }
    ],
    blockhash:
      "00000000c937983704a73af28acdec37b049d214adbda81d7e2a3dd146f6ed09",
    blockheight: 1000,
    confirmations: 585610,
    time: 1232346882,
    blocktime: 1232346882,
    isCoinBase: true,
    valueOut: 50,
    size: 135
  }
}
