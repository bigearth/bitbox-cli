// let fixtures = require('./fixtures/BitcoinCash.json')
let chai = require('chai');
let assert = require('assert');
let axios = require('axios');
let BITBOXCli = require('./../lib/bitboxcli').default;
let BITBOX = new BITBOXCli();
let sinon = require('sinon');

describe('#Network', () => {
  describe('#getConnectionCount', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    it('should get connection count', (done) => {
      let data = 13;

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.getConnectionCount()
        .then((result) => {
          assert.deepEqual(
            data,
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
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.getNetTotals()
        .then((result) => {
          assert.deepEqual(
            data,
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
      };

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.getNetworkInfo()
        .then((result) => {
          assert.deepEqual(
            data,
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
      let data = [
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
      ];

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.getPeerInfo()
        .then((result) => {
          assert.deepEqual(
            data,
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
      let data = null;

      const resolved = new Promise((r) => r({ data: data }));
      sandbox.stub(axios, 'get').returns(resolved);

      BITBOX.Network.ping()
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
