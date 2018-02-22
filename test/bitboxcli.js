import BITBOXCli from '../utilities/bitboxcli';
import chai from 'chai';
let assert = chai.assert;


let BITBOX = new BITBOXCli({
  networks: {
    development: {
      protocol: 'http',
      host: 'localhost',
      port: 8332
    }
  }
});

describe('BITBOX', function() {
  describe('addmultisigaddress', function() {
    let required = 2;
    let keys = [
      'asdf',
      'foo',
      'bar'
    ];
    it('should resolve w/ a status of 200', function() {
      return BITBOX.addmultisigaddress(required, keys)
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.addmultisigaddress(required, keys)
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should return a new multisig address', function() {
      return BITBOX.addmultisigaddress(required, keys)
      .then(function(response) {
        assert.equal(response.data, '12NvpkCn6kSGbUnxSQnjY56pxboPGQKoJK');
      });
    });
  });

  describe('addnode', function() {
    let node = 'localhost';
    let command = 'add';
    it('should resolve w/ a status of 200', function() {
      return BITBOX.addnode(node, command)
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.addnode(node, command)
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should return a new multisig address', function() {
      return BITBOX.addnode(node, command)
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('backupwallet', function() {
    let destination = './';
    it('should resolve w/ a status of 200', function() {
      return BITBOX.backupwallet(destination)
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.backupwallet(destination)
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should return a wallet.dat file', function() {
      return BITBOX.backupwallet(destination)
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('clearbanned', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.clearbanned()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.clearbanned()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.clearbanned()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('createmultisig', function() {
    let required = 2;
    let keys = [
      'asdf',
      'foo',
      'bar'
    ];
    it('should resolve w/ a status of 200', function() {
      return BITBOX.createmultisig(required, keys)
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.createmultisig(required, keys)
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.createmultisig(required, keys)
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('createrawtransaction', function() {
    let inputs = [];
    let outputs = {};
    let locktime = 0;
    it('should resolve w/ a status of 200', function() {
      return BITBOX.createrawtransaction(inputs, outputs, locktime)
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.createrawtransaction(inputs, outputs, locktime)
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.createrawtransaction(inputs, outputs, locktime)
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('decoderawtransaction', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.decoderawtransaction()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.decoderawtransaction()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.decoderawtransaction()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('decodescript', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.decodescript()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.decodescript()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.decodescript()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('disconnectnode', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.disconnectnode()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.disconnectnode()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.disconnectnode()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('dumpprivkey', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.dumpprivkey()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.dumpprivkey()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.dumpprivkey()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('dumpwallet', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.dumpwallet()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.dumpwallet()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.dumpwallet()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('encryptwallet', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.encryptwallet()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.encryptwallet()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.encryptwallet()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('estimatefee', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.estimatefee()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.estimatefee()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.estimatefee()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('estimatepriority', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.estimatepriority()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.estimatepriority()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.estimatepriority()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('fundrawtransaction', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.fundrawtransaction()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.fundrawtransaction()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.fundrawtransaction()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('generate', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.generate()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.generate()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.generate()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('generatetoaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.generatetoaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.generatetoaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.generatetoaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getaccountaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getaccountaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getaccountaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getaccountaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getaccount', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getaccount()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getaccount()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getaccount()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getaddednodeinfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getaddednodeinfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getaddednodeinfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getaddednodeinfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getaddressesbyaccount', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getaddressesbyaccount()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getaddressesbyaccount()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getaddressesbyaccount()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getbalance', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getbalance()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getbalance()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getbalance()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getbestblockhash', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getbestblockhash()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getbestblockhash()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getbestblockhash()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getblock', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getblock()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getblock()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getblock()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getblockchaininfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getblockchaininfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getblockchaininfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getblockchaininfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getblockcount', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getblockcount()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getblockcount()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getblockcount()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getblockhash', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getblockhash()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getblockhash()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getblockhash()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getblockheader', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getblockheader()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getblockheader()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getblockheader()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getblocktemplate', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getblocktemplate()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getblocktemplate()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getblocktemplate()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getchaintips', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getchaintips()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getchaintips()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getchaintips()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getconnectioncount', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getconnectioncount()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getconnectioncount()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getconnectioncount()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getdifficulty', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getdifficulty()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getdifficulty()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getdifficulty()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getgenerate', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getgenerate()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getgenerate()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getgenerate()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('gethashespersec', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.gethashespersec()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.gethashespersec()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.gethashespersec()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getinfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getinfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getinfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getinfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getmemoryinfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getmemoryinfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getmemoryinfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getmemoryinfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getmempoolancestors', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getmempoolancestors()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getmempoolancestors()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getmempoolancestors()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getmempooldescendants', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getmempooldescendants()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getmempooldescendants()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getmempooldescendants()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getmempoolentry', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getmempoolentry()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getmempoolentry()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getmempoolentry()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getmempoolinfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getmempoolinfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getmempoolinfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getmempoolinfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getmininginfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getmininginfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getmininginfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getmininginfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getnettotals', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getnettotals()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getnettotals()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getnettotals()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getnetworkhashps', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getnetworkhashps()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getnetworkhashps()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getnetworkhashps()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getnetworkinfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getnetworkinfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getnetworkinfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getnetworkinfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getnewaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getnewaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getnewaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getnewaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getpeerinfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getpeerinfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getpeerinfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getpeerinfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getrawchangeaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getrawchangeaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getrawchangeaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getrawchangeaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getrawmempool', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getrawmempool()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getrawmempool()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getrawmempool()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getrawtransaction', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getrawtransaction()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getrawtransaction()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getrawtransaction()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getreceivedbyaccount', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getreceivedbyaccount()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getreceivedbyaccount()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getreceivedbyaccount()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getreceivedbyaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getreceivedbyaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getreceivedbyaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getreceivedbyaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('gettransaction', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.gettransaction()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.gettransaction()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.gettransaction()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('gettxout', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.gettxout()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.gettxout()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.gettxout()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('gettxoutproof', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.gettxoutproof()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.gettxoutproof()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.gettxoutproof()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('gettxoutsetinfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.gettxoutsetinfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.gettxoutsetinfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.gettxoutsetinfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getunconfirmedbalance', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getunconfirmedbalance()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getunconfirmedbalance()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getunconfirmedbalance()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getwalletinfo', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getwalletinfo()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getwalletinfo()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getwalletinfo()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('getwork', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.getwork()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.getwork()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.getwork()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('help', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.help()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.help()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.help()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('importaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.importaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.importaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.importaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('importmulti', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.importmulti()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.importmulti()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.importmulti()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('importprivkey', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.importprivkey()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.importprivkey()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.importprivkey()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('importprunedfunds', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.importprunedfunds()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.importprunedfunds()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.importprunedfunds()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('importwallet', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.importwallet()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.importwallet()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.importwallet()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('keypoolrefill', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.keypoolrefill()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.keypoolrefill()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.keypoolrefill()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listaccounts', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listaccounts()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listaccounts()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listaccounts()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listaddressgroupings', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listaddressgroupings()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listaddressgroupings()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listaddressgroupings()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listbanned', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listbanned()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listbanned()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listbanned()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listlockunspent', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listlockunspent()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listlockunspent()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listlockunspent()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listreceivedbyaccount', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listreceivedbyaccount()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listreceivedbyaccount()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listreceivedbyaccount()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listreceivedbyaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listreceivedbyaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listreceivedbyaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listreceivedbyaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listsinceblock', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listsinceblock()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listsinceblock()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listsinceblock()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listtransactions', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listtransactions()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listtransactions()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listtransactions()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('listunspent', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.listunspent()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.listunspent()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.listunspent()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('lockunspent', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.lockunspent()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.lockunspent()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.lockunspent()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('move', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.move()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.move()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.move()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('pingRpc', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.pingRpc()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.pingRpc()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.pingRpc()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('preciousblock', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.preciousblock()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.preciousblock()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.preciousblock()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('prioritisetransaction', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.prioritisetransaction()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.prioritisetransaction()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.prioritisetransaction()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('pruneblockchain', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.pruneblockchain()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.pruneblockchain()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.pruneblockchain()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('removeprunedfunds', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.removeprunedfunds()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.removeprunedfunds()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.removeprunedfunds()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('sendfrom', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.sendfrom()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.sendfrom()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.sendfrom()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('sendmany', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.sendmany()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.sendmany()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.sendmany()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('sendrawtransaction', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.sendrawtransaction()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.sendrawtransaction()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.sendrawtransaction()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('sendtoaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.sendtoaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.sendtoaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.sendtoaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('setaccount', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.setaccount()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.setaccount()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.setaccount()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('setban', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.setban()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.setban()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.setban()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('setgenerate', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.setgenerate()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.setgenerate()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.setgenerate()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('setnetworkactive', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.setnetworkactive()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.setnetworkactive()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.setnetworkactive()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('settxfee', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.settxfee()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.settxfee()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.settxfee()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('signmessage', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.signmessage()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.signmessage()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.signmessage()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('signmessagewithprivkey', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.signmessagewithprivkey()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.signmessagewithprivkey()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.signmessagewithprivkey()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('signrawtransaction', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.signrawtransaction()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.signrawtransaction()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.signrawtransaction()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('stop', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.stop()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.stop()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.stop()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('submitblock', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.submitblock()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.submitblock()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.submitblock()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('validateaddress', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.validateaddress()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.validateaddress()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.validateaddress()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('verifychain', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.verifychain()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.verifychain()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.verifychain()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('verifymessage', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.verifymessage()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.verifymessage()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.verifymessage()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('verifytxoutproof', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.verifytxoutproof()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.verifytxoutproof()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.verifytxoutproof()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('walletlock', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.walletlock()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.walletlock()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.walletlock()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('walletpassphrase', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.walletpassphrase()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.walletpassphrase()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.walletpassphrase()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });

  describe('walletpassphrasechange', function() {
    it('should resolve w/ a status of 200', function() {
      return BITBOX.walletpassphrasechange()
      .then(function(response) {
        assert.equal(response.status, 200);
      });
    });

    it('should resolve w/ a statusText of "OK"', function() {
      return BITBOX.walletpassphrasechange()
      .then(function(response) {
        assert.equal(response.statusText, 'OK');
      });
    });

    it('should clear list of banned nodes', function() {
      return BITBOX.walletpassphrasechange()
      .then(function(response) {
        assert.equal(response.data.result, null);
      });
    });
  });
});
