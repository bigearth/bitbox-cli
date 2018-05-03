// let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = chai.assert;
let axios = require('axios');
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let sinon = require('sinon');

describe('#Util', () => {
  describe('#createMultisig', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should create multisig', (done) => {
      let data = {
        result: {
          address: 'bitcoincash:pzgdursgu5k3qrx6k320crkxv30tq28n2q93yddha8',
          redeemScript: '51210216f220122e31c5228eff825020fa3b7ae2770385f0770a6a440f4453225e77ca2103070c2f8b9cfc347470849c46d2efc89747c14a4f62e55143a28f62914e9cd50352ae'
        }
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Util.createMultisig(1, ["0216f220122e31c5228eff825020fa3b7ae2770385f0770a6a440f4453225e77ca", "03070c2f8b9cfc347470849c46d2efc89747c14a4f62e55143a28f62914e9cd503"])
      .then((result) => {
        assert.deepEqual(
          data.result,
          result
        );
      })
      .then(done, done);
    });
  });

  describe('#signMessageWithPrivKey', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should sign message w/ privkey', (done) => {
      let data = {
        result: 'H8GjNeEdrj/p6waepyYXwlZPdBH4l69xQjyMBOR0m7lCYb2lNWDicp/M6qlZQlXVoJsz0m8/h87hpvI9F8oBVBY='
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Util.signMessageWithPrivKey('KzkYKDZw9PveUu3mn4nR5LKYqmY1A6yHFdY8YqQvd7Z2BT3Ssu4Y', 'BITBOX')
      .then((result) => {
        assert.deepEqual(
          data.result,
          result
        );
      })
      .then(done, done);
    });
  });

  describe('#validateAddress', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should validate address', (done) => {
      let data = {
        result: {
          isvalid: true,
          address: 'bitcoincash:qpz7qtkuyhrsz4qmnnrvf8gz9zd0u9v7eqsewyk4w5',
          scriptPubKey: '76a91445e02edc25c701541b9cc6c49d02289afe159ec888ac',
          ismine: false,
          iswatchonly: false,
          isscript: false
        }
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Util.validateAddress('bitcoincash:qpz7qtkuyhrsz4qmnnrvf8gz9zd0u9v7eqsewyk4w5')
      .then((result) => {
        assert.deepEqual(
          data.result,
          result
        );
      })
      .then(done, done);
    });
  });

  describe('#verifyMessage', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should verify message', (done) => {
      let data = {
        result: true
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Util.verifyMessage('bitcoincash:qqy7dlefcrknfsl0d2jfnf7pe0r2tt6vqy2pedtdfu', 'H8GjNeEdrj/p6waepyYXwlZPdBH4l69xQjyMBOR0m7lCYb2lNWDicp/M6qlZQlXVoJsz0m8/h87hpvI9F8oBVBY=', 'BITBOX')
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
