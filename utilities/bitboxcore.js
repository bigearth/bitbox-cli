// @flow
class BITBOXCore {

  static abandonTransaction(txid: string): string {
    // Marks an in-wallet transaction and all its in-wallet descendants as abandoned. This allows their inputs to be respent.

    // Parameter #1—a transaction identifier (TXID)
    // txid: The TXID of the transaction that you want to abandon. The TXID must be encoded as hex in RPC byte order

    // Result—null on success
    // JSON null when the transaction and all descendants were abandoned

    return `abandontransaction called with ${txid}`;
  }

  static addmultisigaddress(required: number, name: Array<string>|string, account: ?string): string{
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

    return `addmultisigaddress called with ${required}, ${name} and ${account}`;
  }

  static addnode(node: string, command: string): string{
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

    return `addnode called with ${node} and ${command}`;
  }

  static addwitnessaddress(address: string): string {

    // Adds a witness address for a script (with pubkey or redeem script known).

    // Parameter #1—the witness address
    // A witness address that gets added to a script. Needs to be in the wallet and uncompressed

    // Result—the witness script
    // The value of the new address (P2SH of witness script)

    return `addwitnessaddress called with ${address}`;
  }

  static backupwallet(destination: string): string {
    // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

    // Parameter #1—destination directory or filename
    // A filename or directory name. If a filename, it will be created or overwritten.
    // If a directory name, the file wallet.dat will be created or overwritten within that directory

    // Result—null or error
    // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

    return `backupwallet called with ${destination}`;
  }

  static bumpfee(): string {
    return `bumpfee called with`;
  }

  static clearbanned(): string {
    //The clearbanned RPC clears list of banned nodes.

    // Parameters: none

    // Result—null on success
    // JSON null when the list was cleared

    return `clearbanned called`;
  }

  static createmultisig(): string {
    return `createmultisig called with`;
  }


  static createrawtransaction(): string {
    return `createrawtransaction called with`;
  }

  static decoderawtransaction(): string {
    return `decoderawtransaction called with`;
  }

  static decodescript(): string {
    return `decodescript called with`;
  }

  static disconnectnode(): string {
    return `disconnectnode called with`;
  }

  static dumpprivkey(): string {
    return `dumpprivkey called with`;
  }

  static dumpwallet(): string {
    return `dumpwallet called with`;
  }

  static encryptwallet(): string {
    return `encryptwallet called with`;
  }

  static estimatefee(): string {
    return `estimatefee called with`;
  }

  static estimatepriority(): string {
    return `estimatepriority called with`;
  }

  static fundrawtransaction(): string {
    return `fundrawtransaction called with`;
  }

  static generate(): string {
    return `generate called with`;
  }

  static generatetoaddress(): string {
    return `generatetoaddress called with`;
  }

  static getaccountaddress(): string {
    return `getaccountaddress called with`;
  }

  static getaccount(): string {
    return `getaccount called with`;
  }

  static getaddednodeinfo(): string {
    return `getaddednodeinfo called with`;
  }

  static getaddressesbyaccount(): string {
    return `getaddressesbyaccount called with`;
  }

  static getbalance(): string {
    return `getbalance called with`;
  }

  static getbestblockhash(): string {
    return `getbestblockhash called with`;
  }

  static getblock(): string {
    return `getblock called with`;
  }

  static getblockchaininfo(): string {
    return `getblockchaininfo called with`;
  }

  static getblockcount(): string {
    return `getblockcount called with`;
  }

  static getblockhash(): string {
    return `getblockhash called with`;
  }

  static getblockheader(): string {
    return `getblockheader called with`;
  }

  static getblocktemplate(): string {
    return `getblocktemplate called with`;
  }

  static getchaintips(): string {
    return `getchaintips called with`;
  }

  static getconnectioncount(): string {
    return `getconnectioncount called with`;
  }

  static getdifficulty(): string {
    return `getdifficulty called with`;
  }

  static getgenerate(): string {
    return `getgenerate called with`;
  }

  static gethashespersec(): string {
    return `gethashespersec called with`;
  }

  static getinfo(): string {
    return `getinfo called with`;
  }

  static getmemoryinfo(): string {
    return `getmemoryinfo called with`;
  }

  static getmempoolancestors(): string {
    return `getmempoolancestors called with`;
  }

  static getmempooldescendants(): string {
    return `getmempooldescendants called with`;
  }

  static getmempoolentry(): string {
    return `getmempoolentry called with`;
  }

  static getmempoolinfo(): string {
    return `getmempoolinfo called with`;
  }

  static getmininginfo(): string {
    return `getmininginfo called with`;
  }

  static getnettotals(): string {
    return `getnettotals called with`;
  }

  static getnetworkhashps(): string {
    return `getnetworkhashps called with`;
  }

  static getnetworkinfo(): string {
    return `getnetworkinfo called with`;
  }

  static getnewaddress(): string {
    return `getnewaddress called with`;
  }

  static getpeerinfo(): string {
    return `getpeerinfo called with`;
  }

  static getrawchangeaddress(): string {
    return `getrawchangeaddress called with`;
  }

  static getrawmempool(): string {
    return `getrawmempool called with`;
  }

  static getrawtransaction(): string {
    return `getrawtransaction called with`;
  }

  static getreceivedbyaccount(): string {
    return `getreceivedbyaccount called with`;
  }

  static getreceivedbyaddress(): string {
    return `getreceivedbyaddress called with`;
  }

  static gettransaction(): string {
    return `gettransaction called with`;
  }

  static gettxout(): string {
    return `gettxout called with`;
  }

  static gettxoutproof(): string {
    return `gettxoutproof called with`;
  }

  static gettxoutsetinfo(): string {
    return `gettxoutsetinfo called with`;
  }

  static getunconfirmedbalance(): string {
    return `getunconfirmedbalance called with`;
  }

  static getwalletinfo(): string {
    return `getwalletinfo called with`;
  }

  static getwork(): string {
    return `getwork called with`;
  }

  static help(): string {
    return `help called with`;
  }

  static importaddress(): string {
    return `importaddress called with`;
  }

  static importmulti(): string {
    return `importmulti called with`;
  }

  static importprivkey(): string {
    return `importprivkey called with`;
  }

  static importprunedfunds(): string {
    return `importprunedfunds called with`;
  }

  static importwallet(): string {
    return `importwallet called with`;
  }

  static keypoolrefill(): string {
    return `keypoolrefill called with`;
  }

  static listaccounts(): string {
    return `listaccounts called with`;
  }

  static listaddressgroupings(): string {
    return `listaddressgroupings called with`;
  }

  static listbanned(): string {
    return `listbanned called with`;
  }

  static listlockunspent(): string {
    return `listlockunspent called with`;
  }

  static listreceivedbyaccount(): string {
    return `listreceivedbyaccount called with`;
  }

  static listreceivedbyaddress(): string {
    return `listreceivedbyaddress called with`;
  }

  static listsinceblock(): string {
    return `listsinceblock called with`;
  }

  static listtransactions(): string {
    return `listtransactions called with`;
  }

  static listunspent(): string {
    return `listunspent called with`;
  }

  static lockunspent(): string {
    return `lockunspent called with`;
  }

  static move(): string {
    return `move called with`;
  }

  static pingRpc(): string {
    return `ping-rpc called with`;
  }

  static preciousblock(): string {
    return `preciousblock called with`;
  }

  static prioritisetransaction(): string {
    return `prioritisetransaction called with`;
  }

  static pruneblockchain(): string {
    return `pruneblockchain called with`;
  }

  static removeprunedfunds(): string {
    return `removeprunedfunds called with`;
  }

  static sendfrom(): string {
    return `sendfrom called with`;
  }

  static sendmany(): string {
    return `sendmany called with`;
  }

  static sendrawtransaction(): string {
    return `sendrawtransaction called with`;
  }

  static sendtoaddress(): string {
    return `sendtoaddress called with`;
  }

  static setaccount(): string {
    return `setaccount called with`;
  }

  static setban(): string {
    return `setban called with`;
  }

  static setgenerate(): string {
    return `setgenerate called with`;
  }

  static setnetworkactive(): string {
    return `setnetworkactive called with`;
  }

  static settxfee(): string {
    return `settxfee called with`;
  }

  static signmessage(): string {
    return `signmessage called with`;
  }

  static signmessagewithprivkey(): string {
    return `signmessagewithprivkey called with`;
  }

  static signrawtransaction(): string {
    return `signrawtransaction called with`;
  }

  static stop(): string {
    return `stop called with`;
  }

  static submitblock(): string {
    return `submitblock called with`;
  }

  static validateaddress(): string {
    return `validateaddress called with`;
  }

  static verifychain(): string {
    return `verifychain called with`;
  }

  static verifymessage(): string {
    return `verifymessage called with`;
  }

  static verifytxoutproof(): string {
    return `verifytxoutproof called with`;
  }

  static walletlock(): string {
    return `walletlock called with`;
  }

  static walletpassphrase(): string {
    return `walletpassphrase called with`;
  }

  static walletpassphrasechange(): string {
    return `walletpassphrasechange called with`;
  }
}

module.exports = BITBOXCore;
