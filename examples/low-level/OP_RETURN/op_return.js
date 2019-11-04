/*
  Check the outputs of a given transaction for messages in OP_Return
*/

// Instantiate bitbox.
const BITBOX = require("../../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()

// Choose a transaction to parse for OP_Return

// Long msg example (>20 char)
const txid = `5b81b332c8fa5a2b2e77bb928bd18072af4485f02a7325d346f1f28cf3d4a6bb`

// Short msg example (<20 char)
// const txid = `d887132e3408f8d10e9b82bec447ca12e485cb6160af88d9b14f22ba865f6793`

async function parseOP_RETURN(txid) {
  console.log(`Parsing transaction ${txid} for messages in OP_RETURN...`)
  console.log(``)

  // Get transaction details from txid
  let tx
  try {
    tx = await bitbox.Transaction.details(txid)
  } catch (err) {
    console.log(`Error in bitbox.Transaction.details(${txid}):`)
    console.log(err)
    process.exit(1)
  }

  // You may wish to log this tx info to the console to inspect and plan your parsing function
  // console.log(tx)

  // Initialize an array to store any OP_Return messages
  const messages = []

  // Iterate over outputs looking for OP_Return outputs
  tx.vout.forEach(vout => {
    // Skip if this is not an OP_Return output
    if (typeof vout.scriptPubKey.addresses !== `undefined`) return

    // Pretty print your raw transaction data to the console
    // console.log(JSON.stringify(tx, null, 2))

    try {
      // Decode the OP_Return message
      let message = vout.scriptPubKey.asm

      // If length is <= 20 characters, translate from hex
      if (message.length <= 20)
        message = `OP_RETURN ${vout.scriptPubKey.hex.substring(4)}`

      const fromAsm = bitbox.Script.fromASM(message)
      const decoded = bitbox.Script.decode(fromAsm)
      message = decoded[1].toString(`ascii`)

      // Add this decoded OP_Return message to an array, in case multiple outputs have OP_Return messages
      messages.push(message)
    } catch (err) {
      console.log(`Error in parsing OP_RETURN:`)
      console.log(err)
      process.exit(1)
    }
  })

  if (messages.length === 1) {
    console.log(`Message found!`)
    console.log()
    console.log(`Message: ${messages[0]}`)
  } else {
    console.log(`${messages.length} messages found!`)
    console.log()
    for (let j = 0; j < messages.length; j++)
      console.log(`Message ${j + 1} of ${messages.length + 1}: ${messages[j]}`)
  }
}

parseOP_RETURN(txid)
