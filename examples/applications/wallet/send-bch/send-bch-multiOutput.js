/*
 * This example builds a multi-output transaction where the sender sends BCH to 3 other recipients
 * in the same transaction.
 */ 
const senderAddress = '...'; // e.g. bchtest:qp4rhw2w8l...
const senderMnemonic = '...'; // "what does the fox say..."

const recipient1 = '...'; // e.g. bchtest:qp4rhw2w8l...
const recipient2 = '...'; // e.g. bchtest:qasdf28l...
const recipient3 = '...'; // e.g. bchtest:q3hasd2w8l...

const network = 'testnet';

// Initialise BITBOX based on chosen network
const { BITBOX } = require('bitbox-sdk');
if (network === 'mainnet')
	bitbox = new BITBOX({ restURL: 'https://rest.bitcoin.com/v2/' })
else bitbox = new BITBOX({ restURL: 'https://trest.bitcoin.com/v2/' });

run();
async function run() {

	try {
	    // convert cash addresses into legacy addresses
	    const SEND_ADDR_LEGACY = bitbox.Address.toLegacyAddress(senderAddress);
	    const RECV_ADDR_LEGACY1 = bitbox.Address.toLegacyAddress(recipient1);
	    const RECV_ADDR_LEGACY2 = bitbox.Address.toLegacyAddress(recipient2);
	    const RECV_ADDR_LEGACY3 = bitbox.Address.toLegacyAddress(recipient3);
	
		// set the BCH to send for each recipient
		var rec1Amt = bitbox.BitcoinCash.toSatoshi(0.01);
		var rec2Amt = bitbox.BitcoinCash.toSatoshi(0.01);
		var rec3Amt = bitbox.BitcoinCash.toSatoshi(0.01);
		var totalAmt = rec1Amt+rec2Amt+rec3Amt;
	
		// retrieve utxos of the sender's address
	    const u = await bitbox.Address.utxo(senderAddress);
	    const utxo = findBiggestUtxo(u.utxos);
	
		// initiates transaction builder based on the selected network
	    const transactionBuilder = new bitbox.TransactionBuilder(network);
	
		// since satoshi's can't be fractional at time of code
	    const satoshisToSend = Math.floor(totalAmt);
	    const originalAmount = utxo.satoshis;
	    const vout = utxo.vout;
	    const txid = utxo.txid;
	
	    // add input with txid and index of vout
	    transactionBuilder.addInput(txid, vout)
	    
	    const outputTx = 4; // # of output transactions i.e. 3 recipients + change address
	    const byteCount = 300 * outputTx; // 300 bytes per TX output
	    console.log(`byteCount: ${byteCount}`);
	    const satoshisPerByte = 1.2;
	    const txFee = Math.floor(satoshisPerByte * byteCount);
	    console.log(`txFee: ${txFee}`);
	
	    // amount to send back to the sending address.
	    // It's the original amount - 1.2 sat/byte for tx size
	    const remainder = originalAmount - satoshisToSend - txFee;
	
	    // add output w/ address and amount to send
	    transactionBuilder.addOutput(recipient1, rec1Amt);
	    transactionBuilder.addOutput(recipient2, rec2Amt);
	    transactionBuilder.addOutput(recipient3, rec3Amt);
	    transactionBuilder.addOutput(senderAddress, remainder);
	
	    // Generate a change address from a Mnemonic of a private key.
	    const change = changeAddrFromMnemonic(senderMnemonic);
	
	    // Generate a keypair from the change address.
	    const keyPair = bitbox.HDNode.toKeyPair(change);
	
	    // Sign the transaction with the HD node.
	    let redeemScript
	    transactionBuilder.sign(
	      0,
	      keyPair,
	      redeemScript,
	      transactionBuilder.hashTypes.SIGHASH_ALL,
	      originalAmount
	    );
	
	    // build tx
	    const tx = transactionBuilder.build();
	    // output rawhex
	    const hex = tx.toHex();
	
	    // Broadcast transation to the network
	    const txidStr = await bitbox.RawTransactions.sendRawTransaction([hex]);
	    console.log(`Transaction ID: ${txidStr}`);
	  } catch (err) {
	    console.log(`error: `, err);
	  }
}
 
// Generate a change address from a Mnemonic of a private key.
function changeAddrFromMnemonic(mnemonic, network) {
  const rootSeed = bitbox.Mnemonic.toSeed(mnemonic)
  const masterHDNode = bitbox.HDNode.fromSeed(rootSeed, network)
  const account = bitbox.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

  // derive the first external change address HDNode which is going to spend utxo
  const change = bitbox.HDNode.derivePath(account, "0/0")
  return change
}

// Get the balance in BCH of a BCH address.
async function getBCHBalance(addr, verbose) {
  try {
    const bchBalance = await bitbox.Address.details(addr)

    if (verbose) console.log(bchBalance)

    return bchBalance.balance
  } catch (err) {
    console.error(`Error in getBCHBalance: `, err)
    console.log(`addr: ${addr}`)
    throw err
  }
}

// Returns the utxo with the biggest balance from an array of utxos.
function findBiggestUtxo(utxos) {
  let largestAmount = 0
  let largestIndex = 0

  for (let i = 0; i < utxos.length; i++) {
    const thisUtxo = utxos[i]

    if (thisUtxo.satoshis > largestAmount) {
      largestAmount = thisUtxo.satoshis
      largestIndex = i
    }
  }

  return utxos[largestIndex]
}
  
  
module.exports = {
  run,
};
