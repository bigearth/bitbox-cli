'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BitboxHTTP = require('./BitboxHTTP');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BITBOXCli = function () {
  function BITBOXCli() {
    _classCallCheck(this, BITBOXCli);
  }

  _createClass(BITBOXCli, null, [{
    key: 'abandonTransaction',
    value: function abandonTransaction(txid) {
      // Marks an in-wallet transaction and all its in-wallet descendants as abandoned. This allows their inputs to be respent.

      // Parameter #1—a transaction identifier (TXID)
      // txid: The TXID of the transaction that you want to abandon. The TXID must be encoded as hex in RPC byte order

      // Result—null on success
      // JSON null when the transaction and all descendants were abandoned

      var request = _BitboxHTTP.BitboxHTTP.get('abandontransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'addmultisigaddress',
    value: function addmultisigaddress(required, name, account) {
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

      var request = _BitboxHTTP.BitboxHTTP.get('addmultisigaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
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

      var request = _BitboxHTTP.BitboxHTTP.get('addnode').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'addwitnessaddress',
    value: function addwitnessaddress(address) {

      // Adds a witness address for a script (with pubkey or redeem script known).

      // Parameter #1—the witness address
      // A witness address that gets added to a script. Needs to be in the wallet and uncompressed

      // Result—the witness script
      // The value of the new address (P2SH of witness script)

      var request = _BitboxHTTP.BitboxHTTP.get('addnode').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'backupWallet',
    value: function backupWallet(destination) {
      // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

      // Parameter #1—destination directory or filename
      // A filename or directory name. If a filename, it will be created or overwritten.
      // If a directory name, the file wallet.dat will be created or overwritten within that directory

      // Result—null or error
      // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

      var request = _BitboxHTTP.BitboxHTTP.get('backupWallet').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'bumpfee',
    value: function bumpfee() {

      var request = _BitboxHTTP.BitboxHTTP.get('bumpfee').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'clearbanned',
    value: function clearbanned() {
      //The clearbanned RPC clears list of banned nodes.

      // Parameters: none

      // Result—null on success
      // JSON null when the list was cleared

      var request = _BitboxHTTP.BitboxHTTP.get('clearbanned').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
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

      var request = _BitboxHTTP.BitboxHTTP.get('createmultisig').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'createrawtransaction',
    value: function createrawtransaction() {

      var request = _BitboxHTTP.BitboxHTTP.get('createrawtransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'decoderawtransaction',
    value: function decoderawtransaction() {

      var request = _BitboxHTTP.BitboxHTTP.get('decoderawtransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'decodescript',
    value: function decodescript() {

      var request = _BitboxHTTP.BitboxHTTP.get('decodescript').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'disconnectnode',
    value: function disconnectnode() {

      var request = _BitboxHTTP.BitboxHTTP.get('disconnectnode').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'dumpprivkey',
    value: function dumpprivkey() {

      var request = _BitboxHTTP.BitboxHTTP.get('dumpprivkey').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'dumpwallet',
    value: function dumpwallet() {

      var request = _BitboxHTTP.BitboxHTTP.get('dumpwallet').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'encryptwallet',
    value: function encryptwallet() {

      var request = _BitboxHTTP.BitboxHTTP.get('encryptwallet').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'estimatefee',
    value: function estimatefee() {

      var request = _BitboxHTTP.BitboxHTTP.get('estimatefee').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'estimatepriority',
    value: function estimatepriority() {

      var request = _BitboxHTTP.BitboxHTTP.get('estimatepriority').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'fundrawtransaction',
    value: function fundrawtransaction() {

      var request = _BitboxHTTP.BitboxHTTP.get('fundrawtransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'generate',
    value: function generate() {

      var request = _BitboxHTTP.BitboxHTTP.get('generate').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'generatetoaddress',
    value: function generatetoaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('generatetoaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getaccountaddress',
    value: function getaccountaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('getaccountaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getaccount',
    value: function getaccount() {

      var request = _BitboxHTTP.BitboxHTTP.get('getaccount').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getaddednodeinfo',
    value: function getaddednodeinfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getaddednodeinfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getaddressesbyaccount',
    value: function getaddressesbyaccount() {

      var request = _BitboxHTTP.BitboxHTTP.get('getaddressesbyaccount').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getbalance',
    value: function getbalance() {

      var request = _BitboxHTTP.BitboxHTTP.get('getbalance').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getbestblockhash',
    value: function getbestblockhash() {

      var request = _BitboxHTTP.BitboxHTTP.get('getbestblockhash').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getblock',
    value: function getblock() {

      var request = _BitboxHTTP.BitboxHTTP.get('getblock').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getblockchaininfo',
    value: function getblockchaininfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getblockchaininfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getblockcount',
    value: function getblockcount() {

      var request = _BitboxHTTP.BitboxHTTP.get('getblockcount').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getblockhash',
    value: function getblockhash() {

      var request = _BitboxHTTP.BitboxHTTP.get('getblockhash').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getblockheader',
    value: function getblockheader() {

      var request = _BitboxHTTP.BitboxHTTP.get('getblockheader').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getblocktemplate',
    value: function getblocktemplate() {

      var request = _BitboxHTTP.BitboxHTTP.get('getblocktemplate').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getchaintips',
    value: function getchaintips() {

      var request = _BitboxHTTP.BitboxHTTP.get('getchaintips').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getconnectioncount',
    value: function getconnectioncount() {

      var request = _BitboxHTTP.BitboxHTTP.get('getconnectioncount').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getdifficulty',
    value: function getdifficulty() {

      var request = _BitboxHTTP.BitboxHTTP.get('getdifficulty').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getgenerate',
    value: function getgenerate() {

      var request = _BitboxHTTP.BitboxHTTP.get('getgenerate').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'gethashespersec',
    value: function gethashespersec() {

      var request = _BitboxHTTP.BitboxHTTP.get('gethashespersec').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getinfo',
    value: function getinfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getinfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getmemoryinfo',
    value: function getmemoryinfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getmemoryinfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getmempoolancestors',
    value: function getmempoolancestors() {

      var request = _BitboxHTTP.BitboxHTTP.get('getmempoolancestors').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getmempooldescendants',
    value: function getmempooldescendants() {

      var request = _BitboxHTTP.BitboxHTTP.get('getmempooldescendants').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getmempoolentry',
    value: function getmempoolentry() {

      var request = _BitboxHTTP.BitboxHTTP.get('getmempoolentry').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getmempoolinfo',
    value: function getmempoolinfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getmempoolinfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getmininginfo',
    value: function getmininginfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getmininginfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getnettotals',
    value: function getnettotals() {

      var request = _BitboxHTTP.BitboxHTTP.get('getnettotals').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getnetworkhashps',
    value: function getnetworkhashps() {

      var request = _BitboxHTTP.BitboxHTTP.get('getnetworkhashps').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getnetworkinfo',
    value: function getnetworkinfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getnetworkinfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getnewaddress',
    value: function getnewaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('getnewaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getpeerinfo',
    value: function getpeerinfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getpeerinfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getrawchangeaddress',
    value: function getrawchangeaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('getrawchangeaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getrawmempool',
    value: function getrawmempool() {

      var request = _BitboxHTTP.BitboxHTTP.get('getrawmempool').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getrawtransaction',
    value: function getrawtransaction() {

      var request = _BitboxHTTP.BitboxHTTP.get('getrawtransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getreceivedbyaccount',
    value: function getreceivedbyaccount() {

      var request = _BitboxHTTP.BitboxHTTP.get('getreceivedbyaccount').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getreceivedbyaddress',
    value: function getreceivedbyaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('getreceivedbyaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'gettransaction',
    value: function gettransaction() {

      var request = _BitboxHTTP.BitboxHTTP.get('gettransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'gettxout',
    value: function gettxout() {

      var request = _BitboxHTTP.BitboxHTTP.get('gettxout').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'gettxoutproof',
    value: function gettxoutproof() {

      var request = _BitboxHTTP.BitboxHTTP.get('gettxoutproof').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'gettxoutsetinfo',
    value: function gettxoutsetinfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('gettxoutsetinfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getunconfirmedbalance',
    value: function getunconfirmedbalance() {

      var request = _BitboxHTTP.BitboxHTTP.get('getunconfirmedbalance').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getwalletinfo',
    value: function getwalletinfo() {

      var request = _BitboxHTTP.BitboxHTTP.get('getwalletinfo').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'getwork',
    value: function getwork() {

      var request = _BitboxHTTP.BitboxHTTP.get('getwork').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'help',
    value: function help() {

      var request = _BitboxHTTP.BitboxHTTP.get('help').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'importaddress',
    value: function importaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('importaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'importmulti',
    value: function importmulti() {

      var request = _BitboxHTTP.BitboxHTTP.get('importmulti').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'importprivkey',
    value: function importprivkey() {

      var request = _BitboxHTTP.BitboxHTTP.get('importprivkey').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'importprunedfunds',
    value: function importprunedfunds() {

      var request = _BitboxHTTP.BitboxHTTP.get('importprunedfunds').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'importwallet',
    value: function importwallet() {

      var request = _BitboxHTTP.BitboxHTTP.get('importwallet').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'keypoolrefill',
    value: function keypoolrefill() {

      var request = _BitboxHTTP.BitboxHTTP.get('keypoolrefill').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listaccounts',
    value: function listaccounts() {

      var request = _BitboxHTTP.BitboxHTTP.get('listaccounts').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listaddressgroupings',
    value: function listaddressgroupings() {

      var request = _BitboxHTTP.BitboxHTTP.get('listaddressgroupings').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listbanned',
    value: function listbanned() {

      var request = _BitboxHTTP.BitboxHTTP.get('listbanned').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listlockunspent',
    value: function listlockunspent() {

      var request = _BitboxHTTP.BitboxHTTP.get('listlockunspent').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listreceivedbyaccount',
    value: function listreceivedbyaccount() {

      var request = _BitboxHTTP.BitboxHTTP.get('listreceivedbyaccount').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listreceivedbyaddress',
    value: function listreceivedbyaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('listreceivedbyaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listsinceblock',
    value: function listsinceblock() {

      var request = _BitboxHTTP.BitboxHTTP.get('listsinceblock').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listtransactions',
    value: function listtransactions() {

      var request = _BitboxHTTP.BitboxHTTP.get('listtransactions').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'listunspent',
    value: function listunspent() {

      var request = _BitboxHTTP.BitboxHTTP.get('listunspent').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'lockunspent',
    value: function lockunspent() {

      var request = _BitboxHTTP.BitboxHTTP.get('lockunspent').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'move',
    value: function move() {

      var request = _BitboxHTTP.BitboxHTTP.get('move').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'pingRpc',
    value: function pingRpc() {

      var request = _BitboxHTTP.BitboxHTTP.get('pingRpc').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'preciousblock',
    value: function preciousblock() {

      var request = _BitboxHTTP.BitboxHTTP.get('preciousblock').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'prioritisetransaction',
    value: function prioritisetransaction() {

      var request = _BitboxHTTP.BitboxHTTP.get('prioritisetransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'pruneblockchain',
    value: function pruneblockchain() {

      var request = _BitboxHTTP.BitboxHTTP.get('pruneblockchain').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'removeprunedfunds',
    value: function removeprunedfunds() {

      var request = _BitboxHTTP.BitboxHTTP.get('removeprunedfunds').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'sendfrom',
    value: function sendfrom() {

      var request = _BitboxHTTP.BitboxHTTP.get('sendfrom').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'sendmany',
    value: function sendmany() {

      var request = _BitboxHTTP.BitboxHTTP.get('sendmany').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'sendrawtransaction',
    value: function sendrawtransaction() {

      var request = _BitboxHTTP.BitboxHTTP.get('sendrawtransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'sendtoaddress',
    value: function sendtoaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('sendtoaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'setaccount',
    value: function setaccount() {

      var request = _BitboxHTTP.BitboxHTTP.get('setaccount').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'setban',
    value: function setban() {

      var request = _BitboxHTTP.BitboxHTTP.get('setban').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'setgenerate',
    value: function setgenerate() {

      var request = _BitboxHTTP.BitboxHTTP.get('setgenerate').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'setnetworkactive',
    value: function setnetworkactive() {

      var request = _BitboxHTTP.BitboxHTTP.get('setnetworkactive').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'settxfee',
    value: function settxfee() {

      var request = _BitboxHTTP.BitboxHTTP.get('settxfee').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'signmessage',
    value: function signmessage() {

      var request = _BitboxHTTP.BitboxHTTP.get('signmessage').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'signmessagewithprivkey',
    value: function signmessagewithprivkey() {

      var request = _BitboxHTTP.BitboxHTTP.get('signmessagewithprivkey').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'signrawtransaction',
    value: function signrawtransaction() {

      var request = _BitboxHTTP.BitboxHTTP.get('signrawtransaction').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'stop',
    value: function stop() {

      var request = _BitboxHTTP.BitboxHTTP.get('stop').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'submitblock',
    value: function submitblock() {

      var request = _BitboxHTTP.BitboxHTTP.get('submitblock').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'validateaddress',
    value: function validateaddress() {

      var request = _BitboxHTTP.BitboxHTTP.get('validateaddress').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'verifychain',
    value: function verifychain() {

      var request = _BitboxHTTP.BitboxHTTP.get('verifychain').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'verifymessage',
    value: function verifymessage() {

      var request = _BitboxHTTP.BitboxHTTP.get('verifymessage').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'verifytxoutproof',
    value: function verifytxoutproof() {

      var request = _BitboxHTTP.BitboxHTTP.get('verifytxoutproof').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'walletlock',
    value: function walletlock() {

      var request = _BitboxHTTP.BitboxHTTP.get('walletlock').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'walletpassphrase',
    value: function walletpassphrase() {

      var request = _BitboxHTTP.BitboxHTTP.get('walletpassphrase').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }, {
    key: 'walletpassphrasechange',
    value: function walletpassphrasechange() {

      var request = _BitboxHTTP.BitboxHTTP.get('walletpassphrasechange').then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        // console.log('error', error);
      });
      return request;
    }
  }]);

  return BITBOXCli;
}();

module.exports = BITBOXCli;