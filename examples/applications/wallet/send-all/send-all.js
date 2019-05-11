/*
  Send all BCH from one address to another. Similar to consolidating UTXOs.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Set the address below to the address that should recieve the BCH.
const RECV_ADDR = `bchtest:qqmd9unmhkpx4pkmr6fkrr8rm6y77vckjvqe8aey35`

// Instantiate bitbox.
const bitboxLib = "../../../../lib/BITBOX"
const BITBOXSDK = require(bitboxLib)

// Instantiate SLP based on the network.
let BITBOX
if (NETWORK === `mainnet`)
  BITBOX = new BITBOXSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else BITBOX = new BITBOXSDK({ restURL: `https://trest.bitcoin.com/v2/` })

// Open the wallet generated with create-wallet.
try {
  var walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

const SEND_ADDR = walletInfo.cashAddress
const SEND_MNEMONIC = walletInfo.mnemonic

async function consolidateDust() {
  try {
    // instance of transaction builder
    if (NETWORK === `mainnet`)
      var transactionBuilder = new bitbox.TransactionBuilder()
    else var transactionBuilder = new bitbox.TransactionBuilder("testnet")

    let sendAmount = 0
    const inputs = []

    const u = await bitbox.Address.utxo(SEND_ADDR)

    // Loop through each UTXO assigned to this address.
    for (let i = 0; i < u.utxos.length; i++) {
      const thisUtxo = u.utxos[i]

      inputs.push(thisUtxo)

      sendAmount += thisUtxo.satoshis

      // ..Add the utxo as an input to the transaction.
      transactionBuilder.addInput(thisUtxo.txid, thisUtxo.vout)
    }

    // get byte count to calculate fee. paying 1.2 sat/byte
    const byteCount = bitbox.BitcoinCash.getByteCount(
      { P2PKH: inputs.length },
      { P2PKH: 1 }
    )
    console.log(`byteCount: ${byteCount}`)

    const satoshisPerByte = 1.0
    const txFee = Math.ceil(satoshisPerByte * byteCount)
    console.log(`txFee: ${txFee}`)

    // Exit if the transaction costs too much to send.
    if (sendAmount - txFee < 0) {
      console.log(
        `Transaction fee costs more combined UTXOs. Can't send transaction.`
      )
      return
    }

    // add output w/ address and amount to send
    transactionBuilder.addOutput(RECV_ADDR, sendAmount - txFee)

    // Generate a change address from a Mnemonic of a private key.
    const change = changeAddrFromMnemonic(SEND_MNEMONIC)

    // Generate a keypair from the change address.
    const keyPair = bitbox.HDNode.toKeyPair(change)

    // sign w/ HDNode
    let redeemScript
    inputs.forEach((input, index) => {
      transactionBuilder.sign(
        index,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        input.satoshis
      )
    })

    // build tx
    const tx = transactionBuilder.build()
    // output rawhex
    const hex = tx.toHex()
    //console.log(`TX hex: ${hex}`)
    console.log(` `)

    // Broadcast transation to the network
    const txid = await bitbox.RawTransactions.sendRawTransaction([hex])
    console.log(`Transaction ID: ${txid}`)
    console.log(`Check the status of your transaction on this block explorer:`)
    console.log(`https://explorer.bitcoin.com/tbch/tx/${txid}`)
  } catch (err) {
    console.log(`error: `, err)
  }
}
consolidateDust()

// Generate a change address from a Mnemonic of a private key.
function changeAddrFromMnemonic(mnemonic) {
  // root seed buffer
  const rootSeed = bitbox.Mnemonic.toSeed(mnemonic)

  // master HDNode
  let masterHDNode
  if (NETWORK === `mainnet`) masterHDNode = bitbox.HDNode.fromSeed(rootSeed)
  else masterHDNode = bitbox.HDNode.fromSeed(rootSeed, "testnet")

  // HDNode of BIP44 account
  const account = bitbox.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

  // derive the first external change address HDNode which is going to spend utxo
  const change = bitbox.HDNode.derivePath(account, "0/0")

  return change
}
