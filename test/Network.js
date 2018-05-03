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

    it('should add node', (done) => {
      let data = {
        result: null
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Network.addNode('192.168.0.6:8333', 'onetry')
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#clearBanned', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should clear banned', (done) => {
      let data = {
        result: null
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Network.clearBanned()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#disconnectNode', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should TODO', (done) => {
      // TODO fix this test
      let data = {
        result: null
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Network.disconnectNode()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#getAddedNodeInfo', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get added node info', (done) => {
      // TODO fix this test
      let data = {
        result: "Error: Node has not been added."
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Network.getAddedNodeInfo()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#getConnectionCount', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get connection count', (done) => {
      let data = {
        result: 13
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.getConnectionCount()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#getNetTotals', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get net totals', (done) => {
      let data = {
        result: {
          totalbytesrecv: 9348169,
          totalbytessent: 246903958,
          timemillis: 1524922367067,
          uploadtarget:
           { timeframe: 86400,
             target: 0,
             target_reached: false,
             serve_historical_blocks: true,
             bytes_left_in_cycle: 0,
             time_left_in_cycle: 0
           }
        }
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.getNetTotals()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#getNetworkInfo', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get network info', (done) => {
      let data = {
        result: {
          version: 170000,
          subversion: '/Bitcoin ABC:0.17.0(EB32.0)/',
          protocolversion: 70015,
          localservices: '0000000000000025',
          localrelay: true,
          timeoffset: 0,
          networkactive: true,
          connections: 11,
          networks:
           [ { name: 'ipv4',
               limited: false,
               reachable: true,
               proxy: '',
               proxy_randomize_credentials: false },
             { name: 'ipv6',
               limited: false,
               reachable: true,
               proxy: '',
               proxy_randomize_credentials: false },
             { name: 'onion',
               limited: true,
               reachable: false,
               proxy: '',
               proxy_randomize_credentials: false } ],
          relayfee: 0.00001,
          incrementalfee: 0.00001,
          localaddresses: [ { address: '138.68.54.100', port: 8333, score: 584 } ],
          warnings: ''
        }
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.getNetworkInfo()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#getPeerInfo', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get peer info', (done) => {
      let data = {
        result: [
          { id: 99,
          addr: '54.39.17.74:47990',
          addrlocal: '138.68.54.100:8333',
          services: '0000000000000000',
          relaytxes: true,
          lastsend: 1524922628,
          lastrecv: 1524922616,
          bytessent: 310482,
          bytesrecv: 10637,
          conntime: 1524890802,
          timeoffset: 0,
          pingtime: 0.066598,
          minping: 0.066502,
          version: 70015,
          subver: '/bitnodes.ping.com:0.1/',
          inbound: true,
          addnode: false,
          startingheight: 527808,
          banscore: 0,
          synced_headers: 527872,
          synced_blocks: -1,
          inflight: [],
          whitelisted: false,
          bytessent_per_msg:
           { addr: 14975,
             feefilter: 32,
             inv: 286552,
             ping: 8512,
             pong: 192,
             sendcmpct: 33,
             sendheaders: 24,
             verack: 24,
             version: 138 },
          bytesrecv_per_msg:
           { addr: 1410,
             inv: 366,
             ping: 192,
             pong: 8512,
             verack: 24,
             version: 133 } }
           ]
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.getPeerInfo()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#listBanned', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should list banned', (done) => {
      let data = {
        result: [ {
          address: '18.196.84.227/32',
          banned_until: 1525008688,
          ban_created: 1524922288,
          ban_reason: 'node misbehaving' },
        { address: '23.92.36.2/32',
          banned_until: 1525008144,
          ban_created: 1524921744,
          ban_reason: 'node misbehaving' },
        { address: '23.92.36.54/32',
          banned_until: 1525008142,
          ban_created: 1524921742,
          ban_reason: 'node misbehaving' },
        { address: '23.92.36.61/32',
          banned_until: 1525008142,
          ban_created: 1524921742,
          ban_reason: 'node misbehaving' },
        { address: '138.68.233.165/32',
          banned_until: 1525009173,
          ban_created: 1524922773,
          ban_reason: 'node misbehaving' }
        ]
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.listBanned()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#ping', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should ping', (done) => {
      let data = {
        result: null
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.ping()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#setBan', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should set ban', (done) => {
      let data = {
        result: "Error: Invalid IP/Subnet"
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Network.setBan()
        .then((result) => {
          assert.deepEqual(
            data.result,
            result
          );
        })
        .then(done, done);
    });
  });

  describe('#setNetworkActive', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should set network active', (done) => {
      let data = {
        result: true
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'post').returns(resolved);

      BITBOX.Network.setNetworkActive()
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
