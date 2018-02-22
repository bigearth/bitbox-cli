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
      return this.BitboxHTTP.get('addmultisigaddress', {
        params: {
          required: required,
          keys: keys
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'addnode',
    value: function addnode(node, command) {
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

      return this.BitboxHTTP.get('addnode', {
        params: {
          node: node,
          command: command
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'backupwallet',
    value: function backupwallet(destination) {
      // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

      // Parameter #1—destination directory or filename
      // A filename or directory name. If a filename, it will be created or overwritten.
      // If a directory name, the file wallet.dat will be created or overwritten within that directory

      // Result—null or error
      // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

      return this.BitboxHTTP.get('backupWallet', {
        params: {
          destination: destination
        }
      }).then(function (response) {
        var fs = require('fs');

        fs.appendFile("wallet.txt", response.data, function (error) {
          if (error) {
            return Error(error);
          } else {
            return response;
          }
        });
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'clearbanned',
    value: function clearbanned() {
      //The clearbanned RPC clears list of banned nodes.

      // Parameters: none

      // Result—null on success
      // JSON null when the list was cleared


      return this.BitboxHTTP.get('clearbanned').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'createmultisig',
    value: function createmultisig(required, address) {
      // The createmultisig RPC creates a P2SH multi-signature address.

      // Parameter #1—the number of signatures required
      // The minimum (m) number of signatures required to spend this m-of-n multisig script

      // Parameter #2—the full public keys, or addresses for known public keys

      // An array of strings with each string being a public key or address
      // or
      // A public key against which signatures will be checked. If wallet support is enabled, this may be a P2PKH address belonging to the wallet—the corresponding public key will be substituted.
      // There must be at least as many keys as specified by the Required parameter, and there may be more keys

      // Result—P2SH address and hex-encoded redeem script

      return this.BitboxHTTP.get('createmultisig', {
        params: {
          required: required,
          address: address
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'createrawtransaction',
    value: function createrawtransaction(inputs, outputs, locktime) {
      // creates an unsigned serialized transaction that spends a previous output to a new output with a P2PKH or P2SH address. The transaction is not stored in the wallet or transmitted to the network.

      // Parameter #1—Inputs

      // Parameter #2—P2PKH or P2SH addresses and amounts

      // Parameter #3—locktime

      // Result—the unsigned raw transaction in hex

      return this.BitboxHTTP.get('createrawtransaction', {
        params: _defineProperty({
          inputs: inputs,
          outputs: outputs,
          locktime: locktime }, 'locktime', locktime)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'decoderawtransaction',
    value: function decoderawtransaction(rawHex) {
      // decodes a serialized transaction hex string into a JSON object describing the transaction.

      // Parameter #1—serialized transaction in hex

      // Result—the decoded transaction

      return this.BitboxHTTP.get('decoderawtransaction', {
        params: {
          rawHex: rawHex
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'decodescript',
    value: function decodescript(redeemScript) {
      // decodes a hex-encoded P2SH redeem script.

      // Parameter #1—a hex-encoded redeem script

      // Result—the decoded script


      return this.BitboxHTTP.get('decodescript', {
        params: {
          redeemScript: redeemScript
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'disconnectnode',
    value: function disconnectnode(address) {
      // immediately disconnects from a specified node.

      // Parameter #1—hostname/IP address and port of node to disconnect

      // Result—null on success or error on failed disconnect


      return this.BitboxHTTP.get('disconnectnode', {
        params: {
          address: address
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'dumpprivkey',
    value: function dumpprivkey(address) {
      // returns the wallet-import-format (WIP) private key corresponding to an address. (But does not remove it from the wallet.)

      // Parameter #1—the address corresponding to the private key to get

      // Result—the private key


      return this.BitboxHTTP.get('dumpprivkey', {
        params: {
          address: address
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'dumpwallet',
    value: function dumpwallet() {
      // creates or overwrites a file with all wallet keys in a human-readable format.

      // Parameter #1—a filename

      // Result—null or error


      return this.BitboxHTTP.get('dumpwallet').then(function (response) {
        var fs = require('fs');

        fs.appendFile("wallet.txt", response.data, function (error) {
          if (error) {
            return Error(error);
          } else {
            return response;
          }
        });
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'encryptwallet',
    value: function encryptwallet(passphrase) {
      // encrypts the wallet with a passphrase. This is only to enable encryption for the first time. After encryption is enabled, you will need to enter the passphrase to use private keys.
      // if using this RPC on the command line, remember that your shell probably saves your command lines (including the value of the passphrase parameter). In addition, there is no RPC to completely disable encryption. If you want to return to an unencrypted wallet, you must create a new wallet and restore your data from a backup made with the dumpwallet RPC.

      // Parameter #1—a passphrase

      // Result—a notice (with program shutdown)


      return this.BitboxHTTP.get('encryptwallet', {
        params: {
          passphrase: passphrase
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'estimatefee',
    value: function estimatefee(blocks) {

      return this.BitboxHTTP.get('estimatefee', {
        params: {
          blocks: blocks
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'estimatepriority',
    value: function estimatepriority(blocks) {

      return this.BitboxHTTP.get('estimatepriority', {
        params: {
          blocks: blocks
        }
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'fundrawtransaction',
    value: function fundrawtransaction(hexstring, options) {

      return this.BitboxHTTP.get('fundrawtransaction', {
        params: _defineProperty({
          hexstring: hexstring,
          options: options }, 'options', options)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'generate',
    value: function generate(blocks, maxtries) {

      return this.BitboxHTTP.get('generate', {
        params: _defineProperty({
          blocks: blocks,
          maxtries: maxtries }, 'maxtries', maxtries)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'generatetoaddress',
    value: function generatetoaddress(blocks, address, maxtries) {

      return this.BitboxHTTP.get('generatetoaddress', {
        params: _defineProperty({
          blocks: blocks,
          address: address,
          maxtries: maxtries }, 'maxtries', maxtries)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getaccountaddress',
    value: function getaccountaddress(account) {
      // returns the current Bitcoin address for receiving payments to this account. If the account doesn’t exist, it creates both the account and a new address for receiving payment. Once a payment has been received to an address, future calls to this RPC for the same account will return a different address.

      // Parameter #1—an account name

      // Result—a bitcoin address


      return this.BitboxHTTP.get('getaccountaddress', {
        params: _defineProperty({
          account: account }, 'account', account)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getaccount',
    value: function getaccount(address) {
      // returns the name of the account associated with the given address.

      // Parameter #1—a Bitcoin address

      // Result—an account name


      return this.BitboxHTTP.get('getaccount', {
        params: _defineProperty({
          address: address }, 'address', address)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getaddednodeinfo',
    value: function getaddednodeinfo(details, node) {
      var _params7;

      // returns information about the given added node, or all added nodes (except onetry nodes). Only nodes which have been manually added using the addnode RPC will have their information displayed.

      // Parameter #1—whether to display connection information

      // Parameter #2—what node to display information about

      // Result—a list of added nodes


      return this.BitboxHTTP.get('getaddednodeinfo', {
        params: (_params7 = {
          details: details }, _defineProperty(_params7, 'details', details), _defineProperty(_params7, 'node', node), _params7)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getaddressesbyaccount',
    value: function getaddressesbyaccount(account) {
      // returns a list of every address assigned to a particular account.

      // Parameter #1—the account name

      // Result—a list of addresses


      return this.BitboxHTTP.get('getaddressesbyaccount', {
        params: _defineProperty({
          account: account }, 'account', account)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getbalance',
    value: function getbalance(account) {
      // gets the balance in decimal bitcoins across all accounts or for a particular account.

      // Parameter #1—an account name

      // Parameter #2—the minimum number of confirmations

      // Parameter #3—whether to include watch-only addresses

      // Result—the balance in bitcoins


      return this.BitboxHTTP.get('getbalance', {
        params: _defineProperty({
          account: account }, 'account', account)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getbestblockhash',
    value: function getbestblockhash() {
      // returns the header hash of the most recent block on the best block chain.

      // Parameters: none

      // Result—hash of the tip from the best block chain


      return this.BitboxHTTP.get('getbestblockhash').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getblock',
    value: function getblock() {

      return this.BitboxHTTP.get('getblock').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getblockchaininfo',
    value: function getblockchaininfo() {

      return this.BitboxHTTP.get('getblockchaininfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getblockcount',
    value: function getblockcount() {

      return this.BitboxHTTP.get('getblockcount').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getblockhash',
    value: function getblockhash() {

      return this.BitboxHTTP.get('getblockhash').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getblockheader',
    value: function getblockheader() {

      return this.BitboxHTTP.get('getblockheader').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getblocktemplate',
    value: function getblocktemplate() {

      return this.BitboxHTTP.get('getblocktemplate').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getchaintips',
    value: function getchaintips() {

      return this.BitboxHTTP.get('getchaintips').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getconnectioncount',
    value: function getconnectioncount() {

      return this.BitboxHTTP.get('getconnectioncount').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getdifficulty',
    value: function getdifficulty() {

      return this.BitboxHTTP.get('getdifficulty').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getgenerate',
    value: function getgenerate() {

      return this.BitboxHTTP.get('getgenerate').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'gethashespersec',
    value: function gethashespersec() {

      return this.BitboxHTTP.get('gethashespersec').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getinfo',
    value: function getinfo() {

      return this.BitboxHTTP.get('getinfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getmemoryinfo',
    value: function getmemoryinfo() {

      return this.BitboxHTTP.get('getmemoryinfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getmempoolancestors',
    value: function getmempoolancestors() {

      return this.BitboxHTTP.get('getmempoolancestors').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getmempooldescendants',
    value: function getmempooldescendants() {

      return this.BitboxHTTP.get('getmempooldescendants').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getmempoolentry',
    value: function getmempoolentry() {

      return this.BitboxHTTP.get('getmempoolentry').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getmempoolinfo',
    value: function getmempoolinfo() {

      return this.BitboxHTTP.get('getmempoolinfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getmininginfo',
    value: function getmininginfo() {

      return this.BitboxHTTP.get('getmininginfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getnettotals',
    value: function getnettotals() {

      return this.BitboxHTTP.get('getnettotals').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getnetworkhashps',
    value: function getnetworkhashps() {

      return this.BitboxHTTP.get('getnetworkhashps').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getnetworkinfo',
    value: function getnetworkinfo() {

      return this.BitboxHTTP.get('getnetworkinfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getnewaddress',
    value: function getnewaddress() {

      return this.BitboxHTTP.get('getnewaddress').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getpeerinfo',
    value: function getpeerinfo() {

      return this.BitboxHTTP.get('getpeerinfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getrawchangeaddress',
    value: function getrawchangeaddress() {

      return this.BitboxHTTP.get('getrawchangeaddress').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getrawmempool',
    value: function getrawmempool() {

      return this.BitboxHTTP.get('getrawmempool').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getrawtransaction',
    value: function getrawtransaction() {

      return this.BitboxHTTP.get('getrawtransaction').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getreceivedbyaccount',
    value: function getreceivedbyaccount() {

      return this.BitboxHTTP.get('getreceivedbyaccount').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getreceivedbyaddress',
    value: function getreceivedbyaddress() {

      return this.BitboxHTTP.get('getreceivedbyaddress').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'gettransaction',
    value: function gettransaction() {

      return this.BitboxHTTP.get('gettransaction').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'gettxout',
    value: function gettxout() {

      return this.BitboxHTTP.get('gettxout').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'gettxoutproof',
    value: function gettxoutproof() {

      return this.BitboxHTTP.get('gettxoutproof').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'gettxoutsetinfo',
    value: function gettxoutsetinfo() {

      return this.BitboxHTTP.get('gettxoutsetinfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getunconfirmedbalance',
    value: function getunconfirmedbalance() {

      return this.BitboxHTTP.get('getunconfirmedbalance').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getwalletinfo',
    value: function getwalletinfo() {

      return this.BitboxHTTP.get('getwalletinfo').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'getwork',
    value: function getwork() {

      return this.BitboxHTTP.get('getwork').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'help',
    value: function help() {

      return this.BitboxHTTP.get('help').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'importaddress',
    value: function importaddress() {

      return this.BitboxHTTP.get('importaddress').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'importmulti',
    value: function importmulti() {

      return this.BitboxHTTP.get('importmulti').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'importprivkey',
    value: function importprivkey() {

      return this.BitboxHTTP.get('importprivkey').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'importprunedfunds',
    value: function importprunedfunds() {

      return this.BitboxHTTP.get('importprunedfunds').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'importwallet',
    value: function importwallet() {

      return this.BitboxHTTP.get('importwallet').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'keypoolrefill',
    value: function keypoolrefill() {

      return this.BitboxHTTP.get('keypoolrefill').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listaccounts',
    value: function listaccounts() {

      return this.BitboxHTTP.get('listaccounts').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listaddressgroupings',
    value: function listaddressgroupings() {

      return this.BitboxHTTP.get('listaddressgroupings').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listbanned',
    value: function listbanned() {

      return this.BitboxHTTP.get('listbanned').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listlockunspent',
    value: function listlockunspent() {

      return this.BitboxHTTP.get('listlockunspent').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listreceivedbyaccount',
    value: function listreceivedbyaccount() {

      return this.BitboxHTTP.get('listreceivedbyaccount').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listreceivedbyaddress',
    value: function listreceivedbyaddress() {

      return this.BitboxHTTP.get('listreceivedbyaddress').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listsinceblock',
    value: function listsinceblock() {

      return this.BitboxHTTP.get('listsinceblock').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listtransactions',
    value: function listtransactions() {

      return this.BitboxHTTP.get('listtransactions').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'listunspent',
    value: function listunspent() {

      return this.BitboxHTTP.get('listunspent').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'lockunspent',
    value: function lockunspent() {

      return this.BitboxHTTP.get('lockunspent').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'move',
    value: function move() {

      return this.BitboxHTTP.get('move').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'pingRpc',
    value: function pingRpc() {

      return this.BitboxHTTP.get('pingRpc').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'preciousblock',
    value: function preciousblock() {

      return this.BitboxHTTP.get('preciousblock').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'prioritisetransaction',
    value: function prioritisetransaction() {

      return this.BitboxHTTP.get('prioritisetransaction').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'pruneblockchain',
    value: function pruneblockchain() {

      return this.BitboxHTTP.get('pruneblockchain').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'removeprunedfunds',
    value: function removeprunedfunds() {

      return this.BitboxHTTP.get('removeprunedfunds').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'sendfrom',
    value: function sendfrom() {

      return this.BitboxHTTP.get('sendfrom').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'sendmany',
    value: function sendmany() {

      return this.BitboxHTTP.get('sendmany').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'sendrawtransaction',
    value: function sendrawtransaction() {

      return this.BitboxHTTP.get('sendrawtransaction').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'sendtoaddress',
    value: function sendtoaddress() {

      return this.BitboxHTTP.get('sendtoaddress').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'setaccount',
    value: function setaccount() {

      return this.BitboxHTTP.get('setaccount').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'setban',
    value: function setban() {

      return this.BitboxHTTP.get('setban').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'setgenerate',
    value: function setgenerate() {

      return this.BitboxHTTP.get('setgenerate').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'setnetworkactive',
    value: function setnetworkactive() {

      return this.BitboxHTTP.get('setnetworkactive').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'settxfee',
    value: function settxfee() {

      return this.BitboxHTTP.get('settxfee').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'signmessage',
    value: function signmessage(address, message) {
      var _params10;

      // Sign a message with the private key of an address

      // Arguments:
      // 1. "address"         (string, required) The bitcoin address to use for the private key.
      // 2. "message"         (string, required) The message to create a signature of.

      // Result:
      // "signature"          (string) The signature of the message encoded in base 64


      return this.BitboxHTTP.get('signmessage', {
        params: (_params10 = {
          address: address }, _defineProperty(_params10, 'address', address), _defineProperty(_params10, 'message', message), _params10)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'signmessagewithprivkey',
    value: function signmessagewithprivkey(privkey, message) {
      var _params11;

      // Sign a message with the private key of an address

      // Arguments:
      // 1. "privkey"         (string, required) The private key to sign the message with.
      // 2. "message"         (string, required) The message to create a signature of.

      // Result:
      // "signature"          (string) The signature of the message encoded in base 64


      return this.BitboxHTTP.get('signmessagewithprivkey', {
        params: (_params11 = {
          privkey: privkey }, _defineProperty(_params11, 'privkey', privkey), _defineProperty(_params11, 'message', message), _params11)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'signrawtransaction',
    value: function signrawtransaction() {

      return this.BitboxHTTP.get('signrawtransaction').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'stop',
    value: function stop() {

      return this.BitboxHTTP.get('stop').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'submitblock',
    value: function submitblock() {

      return this.BitboxHTTP.get('submitblock').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'validateaddress',
    value: function validateaddress() {

      return this.BitboxHTTP.get('validateaddress').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'verifychain',
    value: function verifychain() {

      return this.BitboxHTTP.get('verifychain').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'verifymessage',
    value: function verifymessage(address, signature, message) {
      var _params12;

      // Verify a signed message

      // Arguments:
      // 1. "address"         (string, required) The bitcoin address to use for the signature.
      // 2. "signature"       (string, required) The signature provided by the signer in base 64 encoding (see signmessage).
      // 3. "message"         (string, required) The message that was signed.

      // Result:
      // true|false   (boolean) If the signature is verified or not.


      return this.BitboxHTTP.get('verifymessage', {
        params: (_params12 = {
          address: address }, _defineProperty(_params12, 'address', address), _defineProperty(_params12, 'signature', signature), _defineProperty(_params12, 'message', message), _params12)
      }).then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'verifytxoutproof',
    value: function verifytxoutproof() {

      return this.BitboxHTTP.get('verifytxoutproof').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'walletlock',
    value: function walletlock() {

      return this.BitboxHTTP.get('walletlock').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'walletpassphrase',
    value: function walletpassphrase() {

      return this.BitboxHTTP.get('walletpassphrase').then(function (response) {
        return response;
      }).catch(function (error) {
        return Error(error);
      });
    }
  }, {
    key: 'walletpassphrasechange',
    value: function walletpassphrasechange() {

      return this.BitboxHTTP.get('walletpassphrasechange').then(function (response) {}).catch(function (error) {
        return Error(error);
      });
    }
  }]);

  return BITBOXCli;
}();

exports.default = BITBOXCli;