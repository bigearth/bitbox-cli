/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Instantiate bitbox.
const bitboxLib = "../../../lib/BITBOX"
const BITBOX = require(bitboxLib).BITBOX

// Instantiate SLP based on the network.
let bitbox
if (NETWORK === `mainnet`)
  bitbox = new BITBOX({ restURL: `https://rest.bitcoin.com/v2/` })
else bitbox = new BITBOX({ restURL: `https://trest.bitcoin.com/v2/` })

// Open the wallet generated with create-wallet.
try {
  var walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

// Get the balance of the wallet.
async function getBalance() {
  try {
    // first get BCH balance
    const balance = await bitbox.Address.details(walletInfo.cashAddress)

    console.log(`BCH Balance information:`)
    console.log(balance)
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    throw err
  }
}
getBalance()
