/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

"use strict"

// Instantiate BITBOX.
const bitboxLib = "../../../lib/bitbox-sdk"
const BITBOXCli = require(bitboxLib).default
//const BITBOX = new BITBOXCli({ restURL: "https://trest.bitcoin.com/v1/" })
const BITBOX = new BITBOXCli({ restURL: "htts://localhost:3000/v1/" })

const ADDR = `mqKgHerAkpvKpSyFawhEKVWZpDPmxHZuLG`

async function getUtxos() {
  try {
    // first get BCH balance
    const utxos = await BITBOX.Address.utxo([ADDR])

    console.log(`UTXO information for address ${ADDR}:`)
    console.log(utxos)
  } catch (err) {
    console.error(`Error in getUtxos: `, err)
    throw err
  }
}
getUtxos()
