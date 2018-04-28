// let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = chai.assert;
let axios = require('axios');
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let sinon = require('sinon');

describe('#Control', () => {
  describe('#getInfo', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get info', (done) => {
      let data = {
        result: {
          version: 170000,
          protocolversion: 70015,
          blocks: 527813,
          timeoffset: 0,
          connections: 21,
          proxy: '',
          difficulty: 581086703759.5878,
          testnet: false,
          paytxfee: 0,
          relayfee: 0.00001,
          errors: ''
        }
      };
      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Control.getInfo()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#getMemoryInfo', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get memory info', (done) => {
      let data = {
        result: { locked:
         { used: 0,
           free: 65536,
           total: 65536,
           locked: 65536,
           chunks_used: 0,
           chunks_free: 1 }
        }
      };
      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Control.getMemoryInfo()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#help', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get help', (done) => {
      let data = {
        result: {}
      };
      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Control.help()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#stop', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should stop bitcoind', (done) => {
      let data = {
        result: 'Bitcoin server stopping'
      };
      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Control.stop()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });
});
