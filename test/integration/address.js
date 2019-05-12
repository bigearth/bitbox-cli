/*
  Integration tests for the bitbox.Address library. Only covers calls made to
  rest.bitcoin.com.

  TODO:
  -Address.unconfirmed:
  --Retrieves transient 0-conf UTXOs. Needs an E2E test to be effectively tested.
*/

const chai = require("chai")
const assert = chai.assert
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()
//const axios = require("axios")

// Inspect utility used for debugging.
