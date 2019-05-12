/*
  Integration tests for the bitbox. Only covers calls made to
  rest.bitcoin.com.
*/

const chai = require("chai")
const assert = chai.assert
const BITBOX = require("../../lib/BITBOX").BITBOX
const bitbox = new BITBOX()

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 3
}

describe(`#util`, () => {})
