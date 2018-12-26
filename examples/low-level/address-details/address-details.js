/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

"use strict"

// Instantiate BITBOX.
const bitboxLib = "../../../lib/bitbox-sdk"
const BITBOXSDK = require(bitboxLib).default
const BITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })

const ADDR = `bchtest:qr45kxqda7yw8atztvkc4ckqnrlhmp0kvsep4p345q`

async function addressDetails() {
  try {
    // first get BCH balance
    const balance = await BITBOX.Address.details(ADDR)

    console.log(`BCH Balance information:`)
    console.log(balance)
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    throw err
  }
}
addressDetails()
