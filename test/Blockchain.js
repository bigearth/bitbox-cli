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
  it('should display a blankslate', (done) => {
    BITBOX.Blockchain.getBestBlockHash()
      .then((result) => {
        console.log(result);
      })
      .then(done, done);
    setTimeout(() => server.respond([
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify({data: '241decef88889efac8e6ce428a8ac696fdde5972eceed97e1fb58d6106af31d5'})
    ]), 0);
  });
});
