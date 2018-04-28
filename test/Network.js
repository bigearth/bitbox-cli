// let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = chai.assert;
let axios = require('axios');
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let sinon = require('sinon');

describe('#Network', () => {
  describe('#addNode', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get block template', (done) => {
      let data = {
        result: {
          data: '01000000017f6305e3b0b05f5b57a82f4e6d4187e148bbe56a947208390e488bad36472368000000006a47304402203b0079ff5b896187feb02e2679c87ac2fb8d483b60e0721ed33601e2c0eecc700220590f8a0e1a51b53b368294861fd5fc99db3a6607d0f4e543f6217108e208c1834121024c93c841d7f576584ffbf513b7abd8283e6562669905f6554f788fce4cc67a34ffffffff0228100000000000001976a914af78709a76abc8a28e568c9210c8247dd10cff2c88ac22020000000000001976a914f339927678803f451b41400737e7dc83c6a8682188ac00000000',
          txid: '7f462d71c649a0d8cfbaa2d20d8ff86677966b308f0ac9906ee015bf4453f97a',
          hash: '7f462d71c649a0d8cfbaa2d20d8ff86677966b308f0ac9906ee015bf4453f97a',
          depends: [],
          fee: 226,
          sigops: 2
        }
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Network.addNode('')
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

// BITBOX.Network.addNode('192.168.0.6:8333', 'onetry').then((result) => { console.log(result); }, (err) => { console.log(err); });
