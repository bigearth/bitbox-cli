// let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = require('assert');
let axios = require('axios');
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let sinon = require('sinon');

describe('#Generating', () => {
  describe('#generateToAddress', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should generate', (done) => {
      let data = [];
      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Generating.generateToAddress(1, 'bitcoincash:qrdka2205f4hyukutc2g0s6lykperc8nsu5u2ddpqf')
        .then((result) => {
          assert.deepEqual(
            data,
            result
          );
        })
        .then(done, done);
    });
  });
});
