/*
  Check the outputs of a given transaction for messages in OP_Return
*/

// Instantiate bitbox.
const bitboxLib = "../../../lib/BITBOX"
const BITBOXSDK = require(bitboxLib).BITBOX
const bitbox = new BITBOXSDK()

// Choose a transaction to parse for OP_Return

// Long msg example (>20 char)
const txid = `5b81b332c8fa5a2b2e77bb928bd18072af4485f02a7325d346f1f28cf3d4a6bb`

// Short msg example (<20 char)
//const txid = `d887132e3408f8d10e9b82bec447ca12e485cb6160af88d9b14f22ba865f6793`

function parseOP_RETURN(txid) {
  console.log(`Parsing transaction ${txid} for messages in OP_RETURN...`)
  console.log(``)

  // Get transaction details from txid
  bitbox.Transaction.details(txid).then(
    tx => {
      // You may wish to log this tx info to the console to inspect and plan your parsing function
      // console.log(tx)
      
      // Begin parsing transaction

      // Initialize an array to store any OP_Return messages
      let messages = []

      // Iterate over outputs looking for OP_Return outputs
    
      for (let i=0; i < tx.vout.length; i++) {        
        
        // If this is an OP_Return output        
        if (typeof tx.vout[i].scriptPubKey.addresses === 'undefined') {
          
          let message = ''          
          let fromAsm = ''
          let decoded = ''
          
          //Pretty print your raw transaction data to the console
          //console.log(JSON.stringify(tx, null, 2))

          try {
            // Decode the OP_Return message
            message = tx.vout[i].scriptPubKey.asm

            // If length is <= 20 characters, translate from hex            
            if (message.length <= 20) {
              message = tx.vout[i].scriptPubKey.hex
              message = message.substring(4)
              message = "OP_RETURN " + message              
            }

            fromAsm = bitbox.Script.fromASM(message)
            decoded = bitbox.Script.decode(fromAsm)
            console.log(`Decoded:`)
            console.log(decoded)
            message = decoded[1].toString('ascii')

            // Add this decoded OP_Return message to an array, in case multiple outputs have OP_Return messages
            messages.push(message)
          }
          catch(err) {
            console.log(`Error in parsing OP_RETURN:`)
            console.log(err)
          }          
        }
      }
      
      if (messages.length === 1) {
        console.log(`Message found!`)
        console.log(``)
        console.log(`Message: ${messages[0]}`)
      }
      else {
        console.log(`${messages.length} messages found!`)
        console.log(``)
        for (let j=0; j < messages.length; j++) {
          console.log(`Message ${j+1} of ${messages.length+1}: ${messages[j]}`)
        }
      }
    },
    err => {
      console.log('Error in bitbox.Transaction.details(${txid}):')
      console.log(err)
    }
  ) 
}

parseOP_RETURN(txid)