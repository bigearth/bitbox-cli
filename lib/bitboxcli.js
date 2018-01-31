"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BITBOXCli = function () {
  function BITBOXCli() {
    _classCallCheck(this, BITBOXCli);
  }

  _createClass(BITBOXCli, null, [{
    key: "abandonTransaction",
    value: function abandonTransaction(txid) {
      // Marks an in-wallet transaction and all its in-wallet descendants as abandoned. This allows their inputs to be respent.

      // Parameter #1—a transaction identifier (TXID)
      // txid: The TXID of the transaction that you want to abandon. The TXID must be encoded as hex in RPC byte order

      // Result—null on success
      // JSON null when the transaction and all descendants were abandoned

      return "abandontransaction called with " + txid;
    }
  }, {
    key: "addmultisigaddress",
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

      return "addmultisigaddress called with " + required + ", " + name + " and " + account;
    }
  }, {
    key: "addnode",
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

      return "addnode called with " + node + " and " + command;
    }
  }, {
    key: "addwitnessaddress",
    value: function addwitnessaddress(address) {

      // Adds a witness address for a script (with pubkey or redeem script known).

      // Parameter #1—the witness address
      // A witness address that gets added to a script. Needs to be in the wallet and uncompressed

      // Result—the witness script
      // The value of the new address (P2SH of witness script)

      return "addwitnessaddress called with " + address;
    }
  }, {
    key: "backupWallet",
    value: function backupWallet(destination) {
      // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

      // Parameter #1—destination directory or filename
      // A filename or directory name. If a filename, it will be created or overwritten.
      // If a directory name, the file wallet.dat will be created or overwritten within that directory

      // Result—null or error
      // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

      return "backupwallet called with " + destination;
    }
  }, {
    key: "bumpfee",
    value: function bumpfee() {
      return "bumpfee called with";
    }
  }, {
    key: "clearbanned",
    value: function clearbanned() {
      //The clearbanned RPC clears list of banned nodes.

      // Parameters: none

      // Result—null on success
      // JSON null when the list was cleared

      return "clearbanned called";
    }
  }, {
    key: "createmultisig",
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

      return "createmultisig called with " + required + " and " + address;
    }
  }, {
    key: "createrawtransaction",
    value: function createrawtransaction() {
      return "createrawtransaction called with";
    }
  }, {
    key: "decoderawtransaction",
    value: function decoderawtransaction() {
      return "decoderawtransaction called with";
    }
  }, {
    key: "decodescript",
    value: function decodescript() {
      return "decodescript called with";
    }
  }, {
    key: "disconnectnode",
    value: function disconnectnode() {
      return "disconnectnode called with";
    }
  }, {
    key: "dumpprivkey",
    value: function dumpprivkey() {
      return "dumpprivkey called with";
    }
  }, {
    key: "dumpwallet",
    value: function dumpwallet() {
      return "dumpwallet called with";
    }
  }, {
    key: "encryptwallet",
    value: function encryptwallet() {
      return "encryptwallet called with";
    }
  }, {
    key: "estimatefee",
    value: function estimatefee() {
      return "estimatefee called with";
    }
  }, {
    key: "estimatepriority",
    value: function estimatepriority() {
      return "estimatepriority called with";
    }
  }, {
    key: "fundrawtransaction",
    value: function fundrawtransaction() {
      return "fundrawtransaction called with";
    }
  }, {
    key: "generate",
    value: function generate() {
      return "generate called with";
    }
  }, {
    key: "generatetoaddress",
    value: function generatetoaddress() {
      return "generatetoaddress called with";
    }
  }, {
    key: "getaccountaddress",
    value: function getaccountaddress() {
      return "getaccountaddress called with";
    }
  }, {
    key: "getaccount",
    value: function getaccount() {
      return "getaccount called with";
    }
  }, {
    key: "getaddednodeinfo",
    value: function getaddednodeinfo() {
      return "getaddednodeinfo called with";
    }
  }, {
    key: "getaddressesbyaccount",
    value: function getaddressesbyaccount() {
      return "getaddressesbyaccount called with";
    }
  }, {
    key: "getbalance",
    value: function getbalance() {
      return "getbalance called with";
    }
  }, {
    key: "getbestblockhash",
    value: function getbestblockhash() {
      return "getbestblockhash called with";
    }
  }, {
    key: "getblock",
    value: function getblock() {
      return "getblock called with";
    }
  }, {
    key: "getblockchaininfo",
    value: function getblockchaininfo() {
      return "getblockchaininfo called with";
    }
  }, {
    key: "getblockcount",
    value: function getblockcount() {
      return "getblockcount called with";
    }
  }, {
    key: "getblockhash",
    value: function getblockhash() {
      return "getblockhash called with";
    }
  }, {
    key: "getblockheader",
    value: function getblockheader() {
      return "getblockheader called with";
    }
  }, {
    key: "getblocktemplate",
    value: function getblocktemplate() {
      return "getblocktemplate called with";
    }
  }, {
    key: "getchaintips",
    value: function getchaintips() {
      return "getchaintips called with";
    }
  }, {
    key: "getconnectioncount",
    value: function getconnectioncount() {
      return "getconnectioncount called with";
    }
  }, {
    key: "getdifficulty",
    value: function getdifficulty() {
      return "getdifficulty called with";
    }
  }, {
    key: "getgenerate",
    value: function getgenerate() {
      return "getgenerate called with";
    }
  }, {
    key: "gethashespersec",
    value: function gethashespersec() {
      return "gethashespersec called with";
    }
  }, {
    key: "getinfo",
    value: function getinfo() {
      return "getinfo called with";
    }
  }, {
    key: "getmemoryinfo",
    value: function getmemoryinfo() {
      return "getmemoryinfo called with";
    }
  }, {
    key: "getmempoolancestors",
    value: function getmempoolancestors() {
      return "getmempoolancestors called with";
    }
  }, {
    key: "getmempooldescendants",
    value: function getmempooldescendants() {
      return "getmempooldescendants called with";
    }
  }, {
    key: "getmempoolentry",
    value: function getmempoolentry() {
      return "getmempoolentry called with";
    }
  }, {
    key: "getmempoolinfo",
    value: function getmempoolinfo() {
      return "getmempoolinfo called with";
    }
  }, {
    key: "getmininginfo",
    value: function getmininginfo() {
      return "getmininginfo called with";
    }
  }, {
    key: "getnettotals",
    value: function getnettotals() {
      return "getnettotals called with";
    }
  }, {
    key: "getnetworkhashps",
    value: function getnetworkhashps() {
      return "getnetworkhashps called with";
    }
  }, {
    key: "getnetworkinfo",
    value: function getnetworkinfo() {
      return "getnetworkinfo called with";
    }
  }, {
    key: "getnewaddress",
    value: function getnewaddress() {
      return "getnewaddress called with";
    }
  }, {
    key: "getpeerinfo",
    value: function getpeerinfo() {
      return "getpeerinfo called with";
    }
  }, {
    key: "getrawchangeaddress",
    value: function getrawchangeaddress() {
      return "getrawchangeaddress called with";
    }
  }, {
    key: "getrawmempool",
    value: function getrawmempool() {
      return "getrawmempool called with";
    }
  }, {
    key: "getrawtransaction",
    value: function getrawtransaction() {
      return "getrawtransaction called with";
    }
  }, {
    key: "getreceivedbyaccount",
    value: function getreceivedbyaccount() {
      return "getreceivedbyaccount called with";
    }
  }, {
    key: "getreceivedbyaddress",
    value: function getreceivedbyaddress() {
      return "getreceivedbyaddress called with";
    }
  }, {
    key: "gettransaction",
    value: function gettransaction() {
      return "gettransaction called with";
    }
  }, {
    key: "gettxout",
    value: function gettxout() {
      return "gettxout called with";
    }
  }, {
    key: "gettxoutproof",
    value: function gettxoutproof() {
      return "gettxoutproof called with";
    }
  }, {
    key: "gettxoutsetinfo",
    value: function gettxoutsetinfo() {
      return "gettxoutsetinfo called with";
    }
  }, {
    key: "getunconfirmedbalance",
    value: function getunconfirmedbalance() {
      return "getunconfirmedbalance called with";
    }
  }, {
    key: "getwalletinfo",
    value: function getwalletinfo() {
      return "getwalletinfo called with";
    }
  }, {
    key: "getwork",
    value: function getwork() {
      return "getwork called with";
    }
  }, {
    key: "help",
    value: function help() {
      return "help called with";
    }
  }, {
    key: "importaddress",
    value: function importaddress() {
      return "importaddress called with";
    }
  }, {
    key: "importmulti",
    value: function importmulti() {
      return "importmulti called with";
    }
  }, {
    key: "importprivkey",
    value: function importprivkey() {
      return "importprivkey called with";
    }
  }, {
    key: "importprunedfunds",
    value: function importprunedfunds() {
      return "importprunedfunds called with";
    }
  }, {
    key: "importwallet",
    value: function importwallet() {
      return "importwallet called with";
    }
  }, {
    key: "keypoolrefill",
    value: function keypoolrefill() {
      return "keypoolrefill called with";
    }
  }, {
    key: "listaccounts",
    value: function listaccounts() {
      return "listaccounts called with";
    }
  }, {
    key: "listaddressgroupings",
    value: function listaddressgroupings() {
      return "listaddressgroupings called with";
    }
  }, {
    key: "listbanned",
    value: function listbanned() {
      return "listbanned called with";
    }
  }, {
    key: "listlockunspent",
    value: function listlockunspent() {
      return "listlockunspent called with";
    }
  }, {
    key: "listreceivedbyaccount",
    value: function listreceivedbyaccount() {
      return "listreceivedbyaccount called with";
    }
  }, {
    key: "listreceivedbyaddress",
    value: function listreceivedbyaddress() {
      return "listreceivedbyaddress called with";
    }
  }, {
    key: "listsinceblock",
    value: function listsinceblock() {
      return "listsinceblock called with";
    }
  }, {
    key: "listtransactions",
    value: function listtransactions() {
      return "listtransactions called with";
    }
  }, {
    key: "listunspent",
    value: function listunspent() {
      return "listunspent called with";
    }
  }, {
    key: "lockunspent",
    value: function lockunspent() {
      return "lockunspent called with";
    }
  }, {
    key: "move",
    value: function move() {
      return "move called with";
    }
  }, {
    key: "pingRpc",
    value: function pingRpc() {
      return "ping-rpc called with";
    }
  }, {
    key: "preciousblock",
    value: function preciousblock() {
      return "preciousblock called with";
    }
  }, {
    key: "prioritisetransaction",
    value: function prioritisetransaction() {
      return "prioritisetransaction called with";
    }
  }, {
    key: "pruneblockchain",
    value: function pruneblockchain() {
      return "pruneblockchain called with";
    }
  }, {
    key: "removeprunedfunds",
    value: function removeprunedfunds() {
      return "removeprunedfunds called with";
    }
  }, {
    key: "sendfrom",
    value: function sendfrom() {
      return "sendfrom called with";
    }
  }, {
    key: "sendmany",
    value: function sendmany() {
      return "sendmany called with";
    }
  }, {
    key: "sendrawtransaction",
    value: function sendrawtransaction() {
      return "sendrawtransaction called with";
    }
  }, {
    key: "sendtoaddress",
    value: function sendtoaddress() {
      return "sendtoaddress called with";
    }
  }, {
    key: "setaccount",
    value: function setaccount() {
      return "setaccount called with";
    }
  }, {
    key: "setban",
    value: function setban() {
      return "setban called with";
    }
  }, {
    key: "setgenerate",
    value: function setgenerate() {
      return "setgenerate called with";
    }
  }, {
    key: "setnetworkactive",
    value: function setnetworkactive() {
      return "setnetworkactive called with";
    }
  }, {
    key: "settxfee",
    value: function settxfee() {
      return "settxfee called with";
    }
  }, {
    key: "signmessage",
    value: function signmessage() {
      return "signmessage called with";
    }
  }, {
    key: "signmessagewithprivkey",
    value: function signmessagewithprivkey() {
      return "signmessagewithprivkey called with";
    }
  }, {
    key: "signrawtransaction",
    value: function signrawtransaction() {
      return "signrawtransaction called with";
    }
  }, {
    key: "stop",
    value: function stop() {
      return "stop called with";
    }
  }, {
    key: "submitblock",
    value: function submitblock() {
      return "submitblock called with";
    }
  }, {
    key: "validateaddress",
    value: function validateaddress() {
      return "validateaddress called with";
    }
  }, {
    key: "verifychain",
    value: function verifychain() {
      return "verifychain called with";
    }
  }, {
    key: "verifymessage",
    value: function verifymessage() {
      return "verifymessage called with";
    }
  }, {
    key: "verifytxoutproof",
    value: function verifytxoutproof() {
      return "verifytxoutproof called with";
    }
  }, {
    key: "walletlock",
    value: function walletlock() {
      return "walletlock called with";
    }
  }, {
    key: "walletpassphrase",
    value: function walletpassphrase() {
      return "walletpassphrase called with";
    }
  }, {
    key: "walletpassphrasechange",
    value: function walletpassphrasechange() {
      return "walletpassphrasechange called with";
    }
  }]);

  return BITBOXCli;
}();

module.exports = BITBOXCli;