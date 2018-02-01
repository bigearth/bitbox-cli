// @flow
import { BitboxHTTP } from './BitboxHTTP';

class BITBOXCli {

  static abandonTransaction(txid: string): Promise<any> {
    // Marks an in-wallet transaction and all its in-wallet descendants as abandoned. This allows their inputs to be respent.

    // Parameter #1—a transaction identifier (TXID)
    // txid: The TXID of the transaction that you want to abandon. The TXID must be encoded as hex in RPC byte order

    // Result—null on success
    // JSON null when the transaction and all descendants were abandoned

    let request = BitboxHTTP
      .get(`abandontransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
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

    let request = BitboxHTTP
      .get(`addmultisigaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;

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

    let request = BitboxHTTP
      .get(`addnode`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static addwitnessaddress(address: string): string {

    // Adds a witness address for a script (with pubkey or redeem script known).

    // Parameter #1—the witness address
    // A witness address that gets added to a script. Needs to be in the wallet and uncompressed

    // Result—the witness script
    // The value of the new address (P2SH of witness script)

    let request = BitboxHTTP
      .get(`addnode`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static backupWallet(destination: string): string {
    // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

    // Parameter #1—destination directory or filename
    // A filename or directory name. If a filename, it will be created or overwritten.
    // If a directory name, the file wallet.dat will be created or overwritten within that directory

    // Result—null or error
    // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

    let request = BitboxHTTP
      .get(`backupWallet`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static bumpfee(): string {

    let request = BitboxHTTP
      .get(`bumpfee`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static clearbanned(): string {
    //The clearbanned RPC clears list of banned nodes.

    // Parameters: none

    // Result—null on success
    // JSON null when the list was cleared

    let request = BitboxHTTP
      .get(`clearbanned`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static createmultisig(required: number, address: Array<string>|string): string {
    // The createmultisig RPC creates a P2SH multi-signature address.

    // Parameter #1—the number of signatures required
    // The minimum (m) number of signatures required to spend this m-of-n multisig script

    // Parameter #2—the full public keys, or addresses for known public keys

    // An array of strings with each string being a public key or address
    // or
    // A public key against which signatures will be checked. If wallet support is enabled, this may be a P2PKH address belonging to the wallet—the corresponding public key will be substituted.
    // There must be at least as many keys as specified by the Required parameter, and there may be more keys

    // Result—P2SH address and hex-encoded redeem script

    let request = BitboxHTTP
      .get(`createmultisig`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static createrawtransaction(): string {

    let request = BitboxHTTP
      .get(`createrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static decoderawtransaction(): string {

    let request = BitboxHTTP
      .get(`decoderawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static decodescript(): string {

    let request = BitboxHTTP
      .get(`decodescript`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static disconnectnode(): string {

    let request = BitboxHTTP
      .get(`disconnectnode`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static dumpprivkey(): string {

    let request = BitboxHTTP
      .get(`dumpprivkey`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static dumpwallet(): string {

    let request = BitboxHTTP
      .get(`dumpwallet`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static encryptwallet(): string {

    let request = BitboxHTTP
      .get(`encryptwallet`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static estimatefee(): string {

    let request = BitboxHTTP
      .get(`estimatefee`)
      .then((response) => {
        console.log('called', response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static estimatepriority(): string {

    let request = BitboxHTTP
      .get(`estimatepriority`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static fundrawtransaction(): string {

    let request = BitboxHTTP
      .get(`fundrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static generate(): string {

    let request = BitboxHTTP
      .get(`generate`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static generatetoaddress(): string {

    let request = BitboxHTTP
      .get(`generatetoaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getaccountaddress(): string {

    let request = BitboxHTTP
      .get(`getaccountaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getaccount(): string {

    let request = BitboxHTTP
      .get(`getaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getaddednodeinfo(): string {

    let request = BitboxHTTP
      .get(`getaddednodeinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getaddressesbyaccount(): string {

    let request = BitboxHTTP
      .get(`getaddressesbyaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getbalance(): string {

    let request = BitboxHTTP
      .get(`getbalance`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getbestblockhash(): string {

    let request = BitboxHTTP
      .get(`getbestblockhash`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getblock(): string {

    let request = BitboxHTTP
      .get(`getblock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getblockchaininfo(): string {

    let request = BitboxHTTP
      .get(`getblockchaininfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getblockcount(): string {

    let request = BitboxHTTP
      .get(`getblockcount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getblockhash(): string {

    let request = BitboxHTTP
      .get(`getblockhash`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getblockheader(): string {

    let request = BitboxHTTP
      .get(`getblockheader`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getblocktemplate(): string {

    let request = BitboxHTTP
      .get(`getblocktemplate`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getchaintips(): string {

    let request = BitboxHTTP
      .get(`getchaintips`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getconnectioncount(): string {

    let request = BitboxHTTP
      .get(`getconnectioncount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getdifficulty(): string {

    let request = BitboxHTTP
      .get(`getdifficulty`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getgenerate(): string {

    let request = BitboxHTTP
      .get(`getgenerate`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static gethashespersec(): string {

    let request = BitboxHTTP
      .get(`gethashespersec`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getinfo(): string {

    let request = BitboxHTTP
      .get(`getinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getmemoryinfo(): string {

    let request = BitboxHTTP
      .get(`getmemoryinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getmempoolancestors(): string {

    let request = BitboxHTTP
      .get(`getmempoolancestors`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getmempooldescendants(): string {

    let request = BitboxHTTP
      .get(`getmempooldescendants`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getmempoolentry(): string {

    let request = BitboxHTTP
      .get(`getmempoolentry`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getmempoolinfo(): string {

    let request = BitboxHTTP
      .get(`getmempoolinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getmininginfo(): string {

    let request = BitboxHTTP
      .get(`getmininginfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getnettotals(): string {

    let request = BitboxHTTP
      .get(`getnettotals`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getnetworkhashps(): string {

    let request = BitboxHTTP
      .get(`getnetworkhashps`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getnetworkinfo(): string {

    let request = BitboxHTTP
      .get(`getnetworkinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getnewaddress(): string {

    let request = BitboxHTTP
      .get(`getnewaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getpeerinfo(): string {

    let request = BitboxHTTP
      .get(`getpeerinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getrawchangeaddress(): string {

    let request = BitboxHTTP
      .get(`getrawchangeaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getrawmempool(): string {

    let request = BitboxHTTP
      .get(`getrawmempool`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getrawtransaction(): string {

    let request = BitboxHTTP
      .get(`getrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getreceivedbyaccount(): string {

    let request = BitboxHTTP
      .get(`getreceivedbyaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getreceivedbyaddress(): string {

    let request = BitboxHTTP
      .get(`getreceivedbyaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static gettransaction(): string {

    let request = BitboxHTTP
      .get(`gettransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static gettxout(): string {

    let request = BitboxHTTP
      .get(`gettxout`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static gettxoutproof(): string {

    let request = BitboxHTTP
      .get(`gettxoutproof`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static gettxoutsetinfo(): string {

    let request = BitboxHTTP
      .get(`gettxoutsetinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getunconfirmedbalance(): string {

    let request = BitboxHTTP
      .get(`getunconfirmedbalance`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getwalletinfo(): string {

    let request = BitboxHTTP
      .get(`getwalletinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static getwork(): string {

    let request = BitboxHTTP
      .get(`getwork`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static help(): string {

    let request = BitboxHTTP
      .get(`help`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static importaddress(): string {

    let request = BitboxHTTP
      .get(`importaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static importmulti(): string {

    let request = BitboxHTTP
      .get(`importmulti`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static importprivkey(): string {

    let request = BitboxHTTP
      .get(`importprivkey`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static importprunedfunds(): string {

    let request = BitboxHTTP
      .get(`importprunedfunds`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static importwallet(): string {

    let request = BitboxHTTP
      .get(`importwallet`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static keypoolrefill(): string {

    let request = BitboxHTTP
      .get(`keypoolrefill`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listaccounts(): string {

    let request = BitboxHTTP
      .get(`listaccounts`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listaddressgroupings(): string {

    let request = BitboxHTTP
      .get(`listaddressgroupings`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listbanned(): string {

    let request = BitboxHTTP
      .get(`listbanned`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listlockunspent(): string {

    let request = BitboxHTTP
      .get(`listlockunspent`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listreceivedbyaccount(): string {

    let request = BitboxHTTP
      .get(`listreceivedbyaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listreceivedbyaddress(): string {

    let request = BitboxHTTP
      .get(`listreceivedbyaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listsinceblock(): string {

    let request = BitboxHTTP
      .get(`listsinceblock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listtransactions(): string {

    let request = BitboxHTTP
      .get(`listtransactions`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static listunspent(): string {

    let request = BitboxHTTP
      .get(`listunspent`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static lockunspent(): string {

    let request = BitboxHTTP
      .get(`lockunspent`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static move(): string {

    let request = BitboxHTTP
      .get(`move`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static pingRpc(): string {

    let request = BitboxHTTP
      .get(`pingRpc`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static preciousblock(): string {

    let request = BitboxHTTP
      .get(`preciousblock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static prioritisetransaction(): string {

    let request = BitboxHTTP
      .get(`prioritisetransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static pruneblockchain(): string {

    let request = BitboxHTTP
      .get(`pruneblockchain`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static removeprunedfunds(): string {

    let request = BitboxHTTP
      .get(`removeprunedfunds`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static sendfrom(): string {

    let request = BitboxHTTP
      .get(`sendfrom`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static sendmany(): string {

    let request = BitboxHTTP
      .get(`sendmany`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static sendrawtransaction(): string {

    let request = BitboxHTTP
      .get(`sendrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static sendtoaddress(): string {

    let request = BitboxHTTP
      .get(`sendtoaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static setaccount(): string {

    let request = BitboxHTTP
      .get(`setaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static setban(): string {

    let request = BitboxHTTP
      .get(`setban`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static setgenerate(): string {

    let request = BitboxHTTP
      .get(`setgenerate`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static setnetworkactive(): string {

    let request = BitboxHTTP
      .get(`setnetworkactive`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static settxfee(): string {

    let request = BitboxHTTP
      .get(`settxfee`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static signmessage(): string {

    let request = BitboxHTTP
      .get(`signmessage`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static signmessagewithprivkey(): string {

    let request = BitboxHTTP
      .get(`signmessagewithprivkey`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static signrawtransaction(): string {

    let request = BitboxHTTP
      .get(`signrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static stop(): string {

    let request = BitboxHTTP
      .get(`stop`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static submitblock(): string {

    let request = BitboxHTTP
      .get(`submitblock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static validateaddress(): string {

    let request = BitboxHTTP
      .get(`validateaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static verifychain(): string {

    let request = BitboxHTTP
      .get(`verifychain`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static verifymessage(): string {

    let request = BitboxHTTP
      .get(`verifymessage`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static verifytxoutproof(): string {

    let request = BitboxHTTP
      .get(`verifytxoutproof`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static walletlock(): string {

    let request = BitboxHTTP
      .get(`walletlock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static walletpassphrase(): string {

    let request = BitboxHTTP
      .get(`walletpassphrase`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  static walletpassphrasechange(): string {

    let request = BitboxHTTP
      .get(`walletpassphrasechange`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }
}

module.exports = BITBOXCli;
