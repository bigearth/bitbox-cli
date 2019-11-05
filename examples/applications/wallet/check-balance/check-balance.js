/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

const BITBOX = require("../../../../lib/BITBOX").BITBOX

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Instantiate BITBOX based on the network.
const bitbox =
  NETWORK === `mainnet`
    ? new BITBOX({ restURL: `https://rest.bitcoin.com/v2/` })
    : new BITBOX({ restURL: `https://trest.bitcoin.com/v2/` })

// Open the wallet generated with create-wallet.
let walletInfo
try {
  walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(1)
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
    process.exit(1)
  }
}
getBalance()
