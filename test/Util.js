// let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = require('assert');
let axios = require('axios');
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let sinon = require('sinon');

describe('#Util', () => {
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
});
