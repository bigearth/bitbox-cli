/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

// Instantiate bitbox.
const BITBOX = require("../../../lib/BITBOX").BITBOX
const bitbox = new BITBOX({ restURL: "https://trest.bitcoin.com/v2/" })

const ADDR = `bchtest:qr45kxqda7yw8atztvkc4ckqnrlhmp0kvsep4p345q`

async function addressDetails() {
  try {
    // first get BCH balance
    const balance = await bitbox.Address.details(ADDR)

    console.log(`BCH Balance information:`)
    console.log(balance)
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    throw err
  }
}
addressDetails()
