/*
  Create an HDNode wallet using bitbox. The mnemonic from this wallet
  will be used in future examples.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Instantiate bitbox.
const bitboxLib = "../../../../lib/BITBOX"
const BITBOXSDK = require(bitboxLib)

// Instantiate SLP based on the network.
let BITBOX
if (NETWORK === `mainnet`)
  BITBOX = new BITBOXSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else BITBOX = new BITBOXSDK({ restURL: `https://trest.bitcoin.com/v2/` })

const fs = require("fs")

const lang = "english" // Set the language of the wallet.

// These objects used for writing wallet information out to a file.
let outStr = ""
const outObj = {}

// create 256 bit BIP39 mnemonic
const mnemonic = bitbox.Mnemonic.generate(
  128,
  bitbox.Mnemonic.wordLists()[lang]
)
console.log("BIP44 $BCH Wallet")
outStr += "BIP44 $BCH Wallet\n"
console.log(`128 bit ${lang} BIP39 Mnemonic: `, mnemonic)
outStr += `\n128 bit ${lang} BIP32 Mnemonic:\n${mnemonic}\n\n`
outObj.mnemonic = mnemonic

// root seed buffer
const rootSeed = bitbox.Mnemonic.toSeed(mnemonic)

// master HDNode
let masterHDNode
if (NETWORK === `mainnet`) masterHDNode = bitbox.HDNode.fromSeed(rootSeed)
else masterHDNode = bitbox.HDNode.fromSeed(rootSeed, "testnet") // Testnet

// HDNode of BIP44 account
console.log(`BIP44 Account: "m/44'/145'/0'"`)
outStr += `BIP44 Account: "m/44'/145'/0'"\n`

// Generate the first 10 seed addresses.
for (let i = 0; i < 10; i++) {
  const childNode = masterHDNode.derivePath(`m/44'/145'/0'/0/${i}`)
  console.log(`m/44'/145'/0'/0/${i}: ${bitbox.HDNode.toCashAddress(childNode)}`)
  outStr += `m/44'/145'/0'/0/${i}: ${bitbox.HDNode.toCashAddress(childNode)}\n`

  // Save the first seed address for use in the .json output file.
  if (i === 0) {
    outObj.cashAddress = bitbox.HDNode.toCashAddress(childNode)
    outObj.legacyAddress = bitbox.HDNode.toLegacyAddress(childNode)
    outObj.WIF = bitbox.HDNode.toWIF(childNode)
  }
}

// Write the extended wallet information into a text file.
fs.writeFile("wallet-info.txt", outStr, function(err) {
  if (err) return console.error(err)

  console.log(`wallet-info.txt written successfully.`)
})

// Write out the basic information into a json file for other example apps to use.
fs.writeFile("wallet.json", JSON.stringify(outObj, null, 2), function(err) {
  if (err) return console.error(err)
  console.log(`wallet.json written successfully.`)
})
