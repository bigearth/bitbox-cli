/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Instantiate BITBOX.
const bitboxLib = "../../../lib/BITBOX"
const BITBOXSDK = require(bitboxLib)

// Instantiate SLP based on the network.
let BITBOX
if (NETWORK === `mainnet`)
  BITBOX = new BITBOXSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else BITBOX = new BITBOXSDK({ restURL: `https://trest.bitcoin.com/v2/` })

// Open the wallet generated with create-wallet.
try {
  var walletInfo = require(`../../applications/wallet/create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

async function getUtxos() {
  try {
    // first get BCH balance
    const utxos = await BITBOX.Address.utxo(walletInfo.cashAddress)

    console.log(`UTXO information for address ${walletInfo.cashAddress}:`)
    console.log(utxos)
  } catch (err) {
    console.error(`Error in getUtxos: `, err)
    throw err
  }
}
getUtxos()
