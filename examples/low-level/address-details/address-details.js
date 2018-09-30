/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

"use strict"

// Instantiate BITBOX.
const bitboxLib = "../../../lib/bitbox-cli"
const BITBOXCli = require(bitboxLib).default
//const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" })
const BITBOX = new BITBOXCli({ restURL: "htts://localhost:3000/v1/" })

const ADDR = `mqKgHerAkpvKpSyFawhEKVWZpDPmxHZuLG`

async function addressDetails() {
  try {
    // first get BCH balance
    const balance = await BITBOX.Address.details([ADDR])

    console.log(`BCH Balance information:`)
    console.log(balance)
  } catch (err) {
    console.error(`Error in getBalance: `, err)
    throw err
  }
}
addressDetails()
