let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = chai.assert;
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli({
  protocol: 'http',
  host: '127.0.0.1',
  port: 8332,
  username: '',
  password: '',
  corsproxy: false
});
let expect = chai.expect;
let sinon = require('sinon');

describe('#axios', () => {
  let sandbox;
  let server;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = sandbox.useFakeServer();
  });
  afterEach(() => {
    server.restore();
    sandbox.restore();
  });
  it('should display', (done) => {
    BITBOX.Blockchain.getBestBlockHash()
      .then((result) => {
        console.log(result);
      })
      .then(done, done);
    setTimeout(() => server.respond([
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({
        "version": 170000,
        "protocolversion": 70015,
        "blocks": 527634,
        "timeoffset": 0,
        "connections": 14,
        "proxy": "",
        "difficulty": 541745568133.4969,
        "testnet": false,
        "paytxfee": 0,
        "relayfee": 0.00001,
        "errors": ""
      })
    ]), 0);
  });
});
