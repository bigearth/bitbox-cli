'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BITBOXCli = function () {
  function BITBOXCli(config) {
    _classCallCheck(this, BITBOXCli);

    this.BitboxHTTP = _axios2.default.create({
      baseURL: config.networks.development.protocol + '://' + config.networks.development.host + ':' + config.networks.development.port + '/'
    });
  }

  _createClass(BITBOXCli, [{
    key: 'addmultisigaddress',
    value: function addmultisigaddress(required, keys, account) {
      var _this = this;

      // Adds a P2SH multisig address to the wallet.

      // Parameter #1—the number of signatures required
      // The minimum (m) number of signatures required to spend this m-of-n multisig script

      // Parameter #2—the full public keys, or addresses for known public keys
      // An array of strings with each string being a public key or address
      // or
      // A public key against which signatures will be checked. Alternatively, this may be a P2PKH address belonging to the wallet—the corresponding public key will be substituted.
      // There must be at least as many keys as specified by the Required parameter, and there may be more keys

      // Parameter #3—the account name
      // The account name in which the address should be stored. Default is the default account, “” (an empty string)
      return new Promise(function (resolve, reject) {
        _this.BitboxHTTP.get('addmultisigaddress', {
          params: {
            required: required,
            keys: keys
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'addnode',
    value: function addnode(node, command) {
      var _this2 = this;

      // Attempts to add or remove a node from the addnode list, or to try a connection to a node once.

      // Parameter #1—hostname/IP address and port of node to add or remove
      // The node to add as a string in the form of <IP address>:<port>. The IP address may be a hostname resolvable through DNS, an IPv4 address, an IPv4-as-IPv6 address, or an IPv6 address

      // Parameter #2—whether to add or remove the node, or to try only once to connect

      // What to do with the IP address above. Options are:
      // • add to add a node to the addnode list. Up to 8 nodes can be added additional to the default 8 nodes. Not limited by -maxconnections
      // • remove to remove a node from the list. If currently connected, this will disconnect immediately
      // • onetry to immediately attempt connection to the node even if the outgoing connection slots are full; this will only attempt the connection once

      // Result—null plus error on failed remove
      // Always JSON null whether the node was added, removed, tried-and-connected, or tried-and-not-connected.
      // The JSON-RPC error field will be set only if you try removing a node that is not on the addnodes list

      return new Promise(function (resolve, reject) {
        _this2.BitboxHTTP.get('addnode', {
          params: {
            node: node,
            command: command
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'backupwallet',
    value: function backupwallet(destination) {
      var _this3 = this;

      // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

      // Parameter #1—destination directory or filename
      // A filename or directory name. If a filename, it will be created or overwritten.
      // If a directory name, the file wallet.dat will be created or overwritten within that directory

      // Result—null or error
      // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

      return new Promise(function (resolve, reject) {
        _this3.BitboxHTTP.get('backupWallet', {
          params: {
            destination: destination
          }
        }).then(function (response) {
          var fs = require('fs');

          fs.appendFile("wallet.txt", response.data, function (error) {
            if (error) {
              reject(Error(error));
            } else {
              resolve(response.data);
            }
          });
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'clearbanned',
    value: function clearbanned() {
      var _this4 = this;

      //The clearbanned RPC clears list of banned nodes.

      // Parameters: none

      // Result—null on success
      // JSON null when the list was cleared

      return new Promise(function (resolve, reject) {
        _this4.BitboxHTTP.get('clearbanned').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'createmultisig',
    value: function createmultisig(required, address) {
      var _this5 = this;

      // The createmultisig RPC creates a P2SH multi-signature address.

      // Parameter #1—the number of signatures required
      // The minimum (m) number of signatures required to spend this m-of-n multisig script

      // Parameter #2—the full public keys, or addresses for known public keys

      // An array of strings with each string being a public key or address
      // or
      // A public key against which signatures will be checked. If wallet support is enabled, this may be a P2PKH address belonging to the wallet—the corresponding public key will be substituted.
      // There must be at least as many keys as specified by the Required parameter, and there may be more keys

      // Result—P2SH address and hex-encoded redeem script

      return new Promise(function (resolve, reject) {
        _this5.BitboxHTTP.get('createmultisig', {
          params: {
            required: required,
            address: address
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'createrawtransaction',
    value: function createrawtransaction() {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.BitboxHTTP.get('createrawtransaction').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'decoderawtransaction',
    value: function decoderawtransaction(rawHex) {
      var _this7 = this;

      // decodes a serialized transaction hex string into a JSON object describing the transaction.

      // Parameter #1—serialized transaction in hex

      // Result—the decoded transaction
      return new Promise(function (resolve, reject) {
        _this7.BitboxHTTP.get('decoderawtransaction', {
          params: {
            rawHex: rawHex
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'decodescript',
    value: function decodescript(redeemScript) {
      var _this8 = this;

      // decodes a hex-encoded P2SH redeem script.

      // Parameter #1—a hex-encoded redeem script

      // Result—the decoded script

      return new Promise(function (resolve, reject) {
        _this8.BitboxHTTP.get('decodescript', {
          params: {
            redeemScript: redeemScript
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'disconnectnode',
    value: function disconnectnode(address) {
      var _this9 = this;

      // immediately disconnects from a specified node.

      // Parameter #1—hostname/IP address and port of node to disconnect

      // Result—null on success or error on failed disconnect

      return new Promise(function (resolve, reject) {
        _this9.BitboxHTTP.get('disconnectnode', {
          params: {
            address: address
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'dumpprivkey',
    value: function dumpprivkey(address) {
      var _this10 = this;

      // returns the wallet-import-format (WIP) private key corresponding to an address. (But does not remove it from the wallet.)

      // Parameter #1—the address corresponding to the private key to get

      // Result—the private key

      return new Promise(function (resolve, reject) {
        _this10.BitboxHTTP.get('dumpprivkey', {
          params: {
            address: address
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'dumpwallet',
    value: function dumpwallet() {
      var _this11 = this;

      // creates or overwrites a file with all wallet keys in a human-readable format.

      // Parameter #1—a filename

      // Result—null or error

      return new Promise(function (resolve, reject) {
        _this11.BitboxHTTP.get('dumpwallet').then(function (response) {
          var fs = require('fs');

          fs.appendFile("wallet.txt", response.data, function (error) {
            if (error) {
              reject(Error(error));
            } else {
              resolve(response.data);
            }
          });
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'encryptwallet',
    value: function encryptwallet(passphrase) {
      var _this12 = this;

      // encrypts the wallet with a passphrase. This is only to enable encryption for the first time. After encryption is enabled, you will need to enter the passphrase to use private keys.
      // if using this RPC on the command line, remember that your shell probably saves your command lines (including the value of the passphrase parameter). In addition, there is no RPC to completely disable encryption. If you want to return to an unencrypted wallet, you must create a new wallet and restore your data from a backup made with the dumpwallet RPC.

      // Parameter #1—a passphrase

      // Result—a notice (with program shutdown)

      return new Promise(function (resolve, reject) {
        _this12.BitboxHTTP.get('encryptwallet', {
          params: {
            passphrase: passphrase
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'estimatefee',
    value: function estimatefee(blocks) {
      var _this13 = this;

      return new Promise(function (resolve, reject) {
        _this13.BitboxHTTP.get('estimatefee', {
          params: {
            blocks: blocks
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'estimatepriority',
    value: function estimatepriority(blocks) {
      var _this14 = this;

      return new Promise(function (resolve, reject) {
        _this14.BitboxHTTP.get('estimatepriority', {
          params: {
            blocks: blocks
          }
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'fundrawtransaction',
    value: function fundrawtransaction(hexstring, options) {
      var _this15 = this;

      return new Promise(function (resolve, reject) {
        _this15.BitboxHTTP.get('fundrawtransaction', {
          params: _defineProperty({
            hexstring: hexstring,
            options: options }, 'options', options)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'generate',
    value: function generate(blocks, maxtries) {
      var _this16 = this;

      return new Promise(function (resolve, reject) {
        _this16.BitboxHTTP.get('generate', {
          params: _defineProperty({
            blocks: blocks,
            maxtries: maxtries }, 'maxtries', maxtries)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'generatetoaddress',
    value: function generatetoaddress(blocks, address, maxtries) {
      var _this17 = this;

      return new Promise(function (resolve, reject) {
        _this17.BitboxHTTP.get('generatetoaddress', {
          params: _defineProperty({
            blocks: blocks,
            address: address,
            maxtries: maxtries }, 'maxtries', maxtries)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getaccountaddress',
    value: function getaccountaddress(account) {
      var _this18 = this;

      // eturns the current Bitcoin address for receiving payments to this account. If the account doesn’t exist, it creates both the account and a new address for receiving payment. Once a payment has been received to an address, future calls to this RPC for the same account will return a different address.

      // Parameter #1—an account name

      // Result—a bitcoin address

      return new Promise(function (resolve, reject) {
        _this18.BitboxHTTP.get('getaccountaddress', {
          params: _defineProperty({
            account: account }, 'account', account)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getaccount',
    value: function getaccount(address) {
      var _this19 = this;

      // returns the name of the account associated with the given address.

      // Parameter #1—a Bitcoin address

      // Result—an account name

      return new Promise(function (resolve, reject) {
        _this19.BitboxHTTP.get('getaccount', {
          params: _defineProperty({
            address: address }, 'address', address)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getaddednodeinfo',
    value: function getaddednodeinfo(details, node) {
      var _this20 = this;

      // returns information about the given added node, or all added nodes (except onetry nodes). Only nodes which have been manually added using the addnode RPC will have their information displayed.

      // Parameter #1—whether to display connection information

      // Parameter #2—what node to display information about

      // Result—a list of added nodes

      return new Promise(function (resolve, reject) {
        var _params6;

        _this20.BitboxHTTP.get('getaddednodeinfo', {
          params: (_params6 = {
            details: details }, _defineProperty(_params6, 'details', details), _defineProperty(_params6, 'node', node), _params6)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getaddressesbyaccount',
    value: function getaddressesbyaccount(account) {
      var _this21 = this;

      // returns a list of every address assigned to a particular account.

      // Parameter #1—the account name

      // Result—a list of addresses

      return new Promise(function (resolve, reject) {
        _this21.BitboxHTTP.get('getaddressesbyaccount', {
          params: _defineProperty({
            account: account }, 'account', account)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getbalance',
    value: function getbalance(account) {
      var _this22 = this;

      // gets the balance in decimal bitcoins across all accounts or for a particular account.

      // Parameter #1—an account name

      // Parameter #2—the minimum number of confirmations

      // Parameter #3—whether to include watch-only addresses

      // Result—the balance in bitcoins

      return new Promise(function (resolve, reject) {
        _this22.BitboxHTTP.get('getbalance', {
          params: _defineProperty({
            account: account }, 'account', account)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getbestblockhash',
    value: function getbestblockhash() {
      var _this23 = this;

      // returns the header hash of the most recent block on the best block chain.

      // Parameters: none

      // Result—hash of the tip from the best block chain

      return new Promise(function (resolve, reject) {
        _this23.BitboxHTTP.get('getbestblockhash').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getblock',
    value: function getblock() {
      var _this24 = this;

      return new Promise(function (resolve, reject) {
        _this24.BitboxHTTP.get('getblock').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getblockchaininfo',
    value: function getblockchaininfo() {
      var _this25 = this;

      return new Promise(function (resolve, reject) {
        _this25.BitboxHTTP.get('getblockchaininfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getblockcount',
    value: function getblockcount() {
      var _this26 = this;

      return new Promise(function (resolve, reject) {
        _this26.BitboxHTTP.get('getblockcount').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getblockhash',
    value: function getblockhash() {
      var _this27 = this;

      return new Promise(function (resolve, reject) {
        _this27.BitboxHTTP.get('getblockhash').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getblockheader',
    value: function getblockheader() {
      var _this28 = this;

      return new Promise(function (resolve, reject) {
        _this28.BitboxHTTP.get('getblockheader').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getblocktemplate',
    value: function getblocktemplate() {

      return new Promise(function (resolve, reject) {});
      this.BitboxHTTP.get('getblocktemplate').then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        reject(Error(error));
      });
    }
  }, {
    key: 'getchaintips',
    value: function getchaintips() {
      var _this29 = this;

      return new Promise(function (resolve, reject) {
        _this29.BitboxHTTP.get('getchaintips').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getconnectioncount',
    value: function getconnectioncount() {
      var _this30 = this;

      return new Promise(function (resolve, reject) {
        _this30.BitboxHTTP.get('getconnectioncount').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getdifficulty',
    value: function getdifficulty() {
      var _this31 = this;

      return new Promise(function (resolve, reject) {
        _this31.BitboxHTTP.get('getdifficulty').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getgenerate',
    value: function getgenerate() {
      var _this32 = this;

      return new Promise(function (resolve, reject) {
        _this32.BitboxHTTP.get('getgenerate').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'gethashespersec',
    value: function gethashespersec() {
      var _this33 = this;

      return new Promise(function (resolve, reject) {
        _this33.BitboxHTTP.get('gethashespersec').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getinfo',
    value: function getinfo() {
      var _this34 = this;

      return new Promise(function (resolve, reject) {
        _this34.BitboxHTTP.get('getinfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getmemoryinfo',
    value: function getmemoryinfo() {
      var _this35 = this;

      return new Promise(function (resolve, reject) {
        _this35.BitboxHTTP.get('getmemoryinfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getmempoolancestors',
    value: function getmempoolancestors() {
      var _this36 = this;

      return new Promise(function (resolve, reject) {
        _this36.BitboxHTTP.get('getmempoolancestors').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getmempooldescendants',
    value: function getmempooldescendants() {
      var _this37 = this;

      return new Promise(function (resolve, reject) {
        _this37.BitboxHTTP.get('getmempooldescendants').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getmempoolentry',
    value: function getmempoolentry() {
      var _this38 = this;

      return new Promise(function (resolve, reject) {
        _this38.BitboxHTTP.get('getmempoolentry').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getmempoolinfo',
    value: function getmempoolinfo() {
      var _this39 = this;

      return new Promise(function (resolve, reject) {
        _this39.BitboxHTTP.get('getmempoolinfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getmininginfo',
    value: function getmininginfo() {
      var _this40 = this;

      return new Promise(function (resolve, reject) {
        _this40.BitboxHTTP.get('getmininginfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getnettotals',
    value: function getnettotals() {
      var _this41 = this;

      return new Promise(function (resolve, reject) {
        _this41.BitboxHTTP.get('getnettotals').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getnetworkhashps',
    value: function getnetworkhashps() {
      var _this42 = this;

      return new Promise(function (resolve, reject) {
        _this42.BitboxHTTP.get('getnetworkhashps').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getnetworkinfo',
    value: function getnetworkinfo() {
      var _this43 = this;

      return new Promise(function (resolve, reject) {
        _this43.BitboxHTTP.get('getnetworkinfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getnewaddress',
    value: function getnewaddress() {
      var _this44 = this;

      return new Promise(function (resolve, reject) {
        _this44.BitboxHTTP.get('getnewaddress').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getpeerinfo',
    value: function getpeerinfo() {
      var _this45 = this;

      return new Promise(function (resolve, reject) {
        _this45.BitboxHTTP.get('getpeerinfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getrawchangeaddress',
    value: function getrawchangeaddress() {
      var _this46 = this;

      return new Promise(function (resolve, reject) {
        _this46.BitboxHTTP.get('getrawchangeaddress').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getrawmempool',
    value: function getrawmempool() {
      var _this47 = this;

      return new Promise(function (resolve, reject) {
        _this47.BitboxHTTP.get('getrawmempool').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getrawtransaction',
    value: function getrawtransaction() {
      var _this48 = this;

      return new Promise(function (resolve, reject) {
        _this48.BitboxHTTP.get('getrawtransaction').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getreceivedbyaccount',
    value: function getreceivedbyaccount() {
      var _this49 = this;

      return new Promise(function (resolve, reject) {
        _this49.BitboxHTTP.get('getreceivedbyaccount').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getreceivedbyaddress',
    value: function getreceivedbyaddress() {
      var _this50 = this;

      return new Promise(function (resolve, reject) {
        _this50.BitboxHTTP.get('getreceivedbyaddress').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'gettransaction',
    value: function gettransaction() {
      var _this51 = this;

      return new Promise(function (resolve, reject) {
        _this51.BitboxHTTP.get('gettransaction').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'gettxout',
    value: function gettxout() {
      var _this52 = this;

      return new Promise(function (resolve, reject) {
        _this52.BitboxHTTP.get('gettxout').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'gettxoutproof',
    value: function gettxoutproof() {
      var _this53 = this;

      return new Promise(function (resolve, reject) {
        _this53.BitboxHTTP.get('gettxoutproof').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'gettxoutsetinfo',
    value: function gettxoutsetinfo() {
      var _this54 = this;

      return new Promise(function (resolve, reject) {
        _this54.BitboxHTTP.get('gettxoutsetinfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getunconfirmedbalance',
    value: function getunconfirmedbalance() {
      var _this55 = this;

      return new Promise(function (resolve, reject) {
        _this55.BitboxHTTP.get('getunconfirmedbalance').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getwalletinfo',
    value: function getwalletinfo() {
      var _this56 = this;

      return new Promise(function (resolve, reject) {
        _this56.BitboxHTTP.get('getwalletinfo').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'getwork',
    value: function getwork() {
      var _this57 = this;

      return new Promise(function (resolve, reject) {
        _this57.BitboxHTTP.get('getwork').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'help',
    value: function help() {
      var _this58 = this;

      return new Promise(function (resolve, reject) {
        _this58.BitboxHTTP.get('help').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'importaddress',
    value: function importaddress() {
      var _this59 = this;

      return new Promise(function (resolve, reject) {
        _this59.BitboxHTTP.get('importaddress').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'importmulti',
    value: function importmulti() {
      var _this60 = this;

      return new Promise(function (resolve, reject) {
        _this60.BitboxHTTP.get('importmulti').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'importprivkey',
    value: function importprivkey() {
      var _this61 = this;

      return new Promise(function (resolve, reject) {
        _this61.BitboxHTTP.get('importprivkey').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'importprunedfunds',
    value: function importprunedfunds() {
      var _this62 = this;

      return new Promise(function (resolve, reject) {
        _this62.BitboxHTTP.get('importprunedfunds').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'importwallet',
    value: function importwallet() {
      var _this63 = this;

      return new Promise(function (resolve, reject) {
        _this63.BitboxHTTP.get('importwallet').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'keypoolrefill',
    value: function keypoolrefill() {
      var _this64 = this;

      return new Promise(function (resolve, reject) {
        _this64.BitboxHTTP.get('keypoolrefill').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listaccounts',
    value: function listaccounts() {
      var _this65 = this;

      return new Promise(function (resolve, reject) {
        _this65.BitboxHTTP.get('listaccounts').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listaddressgroupings',
    value: function listaddressgroupings() {
      var _this66 = this;

      return new Promise(function (resolve, reject) {
        _this66.BitboxHTTP.get('listaddressgroupings').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listbanned',
    value: function listbanned() {
      var _this67 = this;

      return new Promise(function (resolve, reject) {
        _this67.BitboxHTTP.get('listbanned').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listlockunspent',
    value: function listlockunspent() {
      var _this68 = this;

      return new Promise(function (resolve, reject) {
        _this68.BitboxHTTP.get('listlockunspent').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listreceivedbyaccount',
    value: function listreceivedbyaccount() {
      var _this69 = this;

      return new Promise(function (resolve, reject) {
        _this69.BitboxHTTP.get('listreceivedbyaccount').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listreceivedbyaddress',
    value: function listreceivedbyaddress() {
      var _this70 = this;

      return new Promise(function (resolve, reject) {
        _this70.BitboxHTTP.get('listreceivedbyaddress').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listsinceblock',
    value: function listsinceblock() {
      var _this71 = this;

      return new Promise(function (resolve, reject) {
        _this71.BitboxHTTP.get('listsinceblock').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listtransactions',
    value: function listtransactions() {
      var _this72 = this;

      return new Promise(function (resolve, reject) {
        _this72.BitboxHTTP.get('listtransactions').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'listunspent',
    value: function listunspent() {
      var _this73 = this;

      return new Promise(function (resolve, reject) {
        _this73.BitboxHTTP.get('listunspent').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'lockunspent',
    value: function lockunspent() {
      var _this74 = this;

      return new Promise(function (resolve, reject) {
        _this74.BitboxHTTP.get('lockunspent').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'move',
    value: function move() {
      var _this75 = this;

      return new Promise(function (resolve, reject) {
        _this75.BitboxHTTP.get('move').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'pingRpc',
    value: function pingRpc() {
      var _this76 = this;

      return new Promise(function (resolve, reject) {
        _this76.BitboxHTTP.get('pingRpc').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'preciousblock',
    value: function preciousblock() {
      var _this77 = this;

      return new Promise(function (resolve, reject) {
        _this77.BitboxHTTP.get('preciousblock').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'prioritisetransaction',
    value: function prioritisetransaction() {
      var _this78 = this;

      return new Promise(function (resolve, reject) {
        _this78.BitboxHTTP.get('prioritisetransaction').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'pruneblockchain',
    value: function pruneblockchain() {
      var _this79 = this;

      return new Promise(function (resolve, reject) {
        _this79.BitboxHTTP.get('pruneblockchain').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'removeprunedfunds',
    value: function removeprunedfunds() {
      var _this80 = this;

      return new Promise(function (resolve, reject) {
        _this80.BitboxHTTP.get('removeprunedfunds').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'sendfrom',
    value: function sendfrom() {
      var _this81 = this;

      return new Promise(function (resolve, reject) {
        _this81.BitboxHTTP.get('sendfrom').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'sendmany',
    value: function sendmany() {
      var _this82 = this;

      return new Promise(function (resolve, reject) {
        _this82.BitboxHTTP.get('sendmany').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'sendrawtransaction',
    value: function sendrawtransaction() {
      var _this83 = this;

      return new Promise(function (resolve, reject) {
        _this83.BitboxHTTP.get('sendrawtransaction').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'sendtoaddress',
    value: function sendtoaddress() {
      var _this84 = this;

      return new Promise(function (resolve, reject) {
        _this84.BitboxHTTP.get('sendtoaddress').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'setaccount',
    value: function setaccount() {
      var _this85 = this;

      return new Promise(function (resolve, reject) {
        _this85.BitboxHTTP.get('setaccount').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'setban',
    value: function setban() {
      var _this86 = this;

      return new Promise(function (resolve, reject) {
        _this86.BitboxHTTP.get('setban').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'setgenerate',
    value: function setgenerate() {
      var _this87 = this;

      return new Promise(function (resolve, reject) {
        _this87.BitboxHTTP.get('setgenerate').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'setnetworkactive',
    value: function setnetworkactive() {
      var _this88 = this;

      return new Promise(function (resolve, reject) {
        _this88.BitboxHTTP.get('setnetworkactive').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'settxfee',
    value: function settxfee() {
      var _this89 = this;

      return new Promise(function (resolve, reject) {
        _this89.BitboxHTTP.get('settxfee').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'signmessage',
    value: function signmessage(address, message) {
      var _this90 = this;

      // Sign a message with the private key of an address

      // Arguments:
      // 1. "address"         (string, required) The bitcoin address to use for the private key.
      // 2. "message"         (string, required) The message to create a signature of.

      // Result:
      // "signature"          (string) The signature of the message encoded in base 64

      return new Promise(function (resolve, reject) {
        var _params9;

        _this90.BitboxHTTP.get('signmessage', {
          params: (_params9 = {
            address: address }, _defineProperty(_params9, 'address', address), _defineProperty(_params9, 'message', message), _params9)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'signmessagewithprivkey',
    value: function signmessagewithprivkey(privkey, message) {
      var _this91 = this;

      // Sign a message with the private key of an address

      // Arguments:
      // 1. "privkey"         (string, required) The private key to sign the message with.
      // 2. "message"         (string, required) The message to create a signature of.

      // Result:
      // "signature"          (string) The signature of the message encoded in base 64

      return new Promise(function (resolve, reject) {
        var _params10;

        _this91.BitboxHTTP.get('signmessagewithprivkey', {
          params: (_params10 = {
            privkey: privkey }, _defineProperty(_params10, 'privkey', privkey), _defineProperty(_params10, 'message', message), _params10)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'signrawtransaction',
    value: function signrawtransaction() {
      var _this92 = this;

      return new Promise(function (resolve, reject) {
        _this92.BitboxHTTP.get('signrawtransaction').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this93 = this;

      return new Promise(function (resolve, reject) {
        _this93.BitboxHTTP.get('stop').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'submitblock',
    value: function submitblock() {
      var _this94 = this;

      return new Promise(function (resolve, reject) {
        _this94.BitboxHTTP.get('submitblock').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'validateaddress',
    value: function validateaddress() {
      var _this95 = this;

      return new Promise(function (resolve, reject) {
        _this95.BitboxHTTP.get('validateaddress').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'verifychain',
    value: function verifychain() {
      var _this96 = this;

      return new Promise(function (resolve, reject) {
        _this96.BitboxHTTP.get('verifychain').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'verifymessage',
    value: function verifymessage(address, signature, message) {
      var _this97 = this;

      // Verify a signed message

      // Arguments:
      // 1. "address"         (string, required) The bitcoin address to use for the signature.
      // 2. "signature"       (string, required) The signature provided by the signer in base 64 encoding (see signmessage).
      // 3. "message"         (string, required) The message that was signed.

      // Result:
      // true|false   (boolean) If the signature is verified or not.

      return new Promise(function (resolve, reject) {
        var _params11;

        _this97.BitboxHTTP.get('verifymessage', {
          params: (_params11 = {
            address: address }, _defineProperty(_params11, 'address', address), _defineProperty(_params11, 'signature', signature), _defineProperty(_params11, 'message', message), _params11)
        }).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'verifytxoutproof',
    value: function verifytxoutproof() {
      var _this98 = this;

      return new Promise(function (resolve, reject) {
        _this98.BitboxHTTP.get('verifytxoutproof').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'walletlock',
    value: function walletlock() {
      var _this99 = this;

      return new Promise(function (resolve, reject) {
        _this99.BitboxHTTP.get('walletlock').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'walletpassphrase',
    value: function walletpassphrase() {
      var _this100 = this;

      return new Promise(function (resolve, reject) {
        _this100.BitboxHTTP.get('walletpassphrase').then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }, {
    key: 'walletpassphrasechange',
    value: function walletpassphrasechange() {
      var _this101 = this;

      return new Promise(function (resolve, reject) {
        _this101.BitboxHTTP.get('walletpassphrasechange').then(function (response) {}).catch(function (error) {
          reject(Error(error));
        });
      });
    }
  }]);

  return BITBOXCli;
}();

exports.default = BITBOXCli;