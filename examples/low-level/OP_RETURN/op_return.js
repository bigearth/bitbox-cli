/*
  Check the balance of the root address of an HD node wallet generated
  with the create-wallet example.
*/

// Instantiate BITBOX.
const bitboxLib = "../../../lib/BITBOX"
const BITBOXSDK = require(bitboxLib)
const BITBOX = new BITBOXSDK()

// Choose a transaction to parse for OP_Return

const txid = `5b81b332c8fa5a2b2e77bb928bd18072af4485f02a7325d346f1f28cf3d4a6bb`

function parseOP_RETURN(txid) {
  console.log(`Parsing OP_Return value of transaction ${txid}`)

  // Get transaction details
  BITBOX.Transaction.details(txid).then(
    tx => {
      console.log(tx)
      // Begin parsing transaction

      // Construct object to hold info for one transaction
      let parsedTx = {}

      // Initialize the amount
      parsedTx.amount = 0

      // Initialize the OP_Return message
      let message = ''

      // Get txid
      parsedTx.txid = tx.txid

    },
    err => {
      console.log('Error in BITBOX.Transaction.details(${txid}):')
      console.log(err)
    }
  ) 
}

parseOP_RETURN(txid)


    /*

    // Get sending address
    // Note this would be txs[i].vin[0].addr from address bulk tx API endpoint
    parsedTx.sendingAddress = tx.vin[0].legacyAddress

    // From tx
    parsedTx.fromTxid = tx.vin[0].txid

    // Iterate over outputs
    if (tx.vout[0]) {      
      for (let j=0; j< tx.vout.length; j++) {        
        // If this is an OP_Return output        
        if (!tx.vout[j].scriptPubKey.addresses[0]) {
          
          // Decode the OP_Return message
          message = tx.vout[j].scriptPubKey.asm            
          let fromAsm = BITBOX.Script.fromASM(message)
          let decoded = BITBOX.Script.decode(fromAsm)

          message = decoded[1].toString('ascii')

          // Keep iterating through outputs
          continue
        }
        // If this transaction was asked to Satoshi, i.e. sent from a user to the game
        else if (tx.vout[j].scriptPubKey.addresses[0] === this.props.address) {
          // Calculate parsedTx.amount for a question
          parsedTx.amount += parseInt(tx.vout[j].value*1e8)
        }
        else {
          continue
        }        
      }
    }

    // If this tx was sent by Satoshi, i.e. sent from the game to a user
    if (parsedTx.sendingAddress === this.props.address) {

      // Amount is amount sent
      parsedTx.amount = tx.valueIn*1e8
      
      // parsed OP_Return message is what Satoshi Said
      parsedTx.satoshiSaid = message
        
      // This tx is an answer from Satoshi
      // parsedTX: {txid, amount, sendingAddress, fromTxid, satoshiSaid}

      // BEGIN
      // Find the asking question by checking the state for questions with no answer
      // Get an array of the last 5 entries into the answers state
      let potentialQuestions = this.state.answers.slice(0,5)
      console.log(`potentialQuestions:`)
      console.log(potentialQuestions)

      // Iterate over array for a question and check if it belongs to this answer      
      
      for (let a=0; a < 5; a++) {
        // If this entry is a question and belongs to this answer
        console.log(potentialQuestions[a].userAsked)
        console.log(potentialQuestions[a].txid)
        console.log(parsedTx.fromTxid)
        if (potentialQuestions[a].userAsked && potentialQuestions[a].txid === parsedTx.fromTxid) {
          // Add the userAsked field to parsedTX          
          parsedTx.userAsked = potentialQuestions[a].userAsked

          console.log(`parsedTx, (answer, ${parsedTx.txid}):`)
          console.log(parsedTx)
          
          //TODO make this more robust
          // Either have a bail out function to reset display table by refreshing for all tx if this doesn't work
          // Or be more specific than handling only one tx back
          return this.setState({      
            latestTxId: parsedTx.txid,
            answers: [parsedTx, ...this.state.answers.slice(1)]
          })
        }        
      }
      // If you didn't find a question, handle it here
      console.log(`No question found for answer ${parsedTx.txid}`)
      console.log(parsedTx)
      
      
         
    }
    else {
      // If the asking transaction did not include an OP_Return message
      if (message === '') {
        // Display a default placeholder
        parsedTx.userAsked = 'Known Unto You'        
      }
      // If the asking transaction did include an OP_Return message
      else {
        // Assign the OP_Return value parsed earlier in the loop as a question
        parsedTx.userAsked = message        
        console.log(`Someone asked, ${parsedTx.userAsked}`)
      }

      console.log(`parsedTx (question, ${parsedTx.txid}):`)
      console.log(parsedTx)

      // Add question to state to render for user      
      return this.setState({      
        latestTxId: parsedTx.txid,
        answers: [parsedTx ,...this.state.answers],
        questions: [parsedTx, ...this.state.questions]
      })    
    }    
  }
addressDetails()
*/