// @flow
import axios from 'axios';

class BITBOXCli {
  constructor(config) {
    this.BitboxHTTP = axios.create({
      baseURL: `${config.networks.development.protocol}://${config.networks.development.host}:${config.networks.development.port}/`
    });
  }

  abandonTransaction(txid: string): Promise<any> {
    // Marks an in-wallet transaction and all its in-wallet descendants as abandoned. This allows their inputs to be respent.

    // Parameter #1—a transaction identifier (TXID)
    // txid: The TXID of the transaction that you want to abandon. The TXID must be encoded as hex in RPC byte order

    // Result—null on success
    // JSON null when the transaction and all descendants were abandoned

    let request = this.BitboxHTTP
      .get(`abandontransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  addmultisigaddress(required: number, name: Array<string>|string, account: ?string): string{
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

    let request = this.BitboxHTTP
      .get(`addmultisigaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;

  }

  addnode(node: string, command: string): string{
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

    let request = this.BitboxHTTP
      .get(`addnode`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  addwitnessaddress(address: string): string {

    // Adds a witness address for a script (with pubkey or redeem script known).

    // Parameter #1—the witness address
    // A witness address that gets added to a script. Needs to be in the wallet and uncompressed

    // Result—the witness script
    // The value of the new address (P2SH of witness script)

    let request = this.BitboxHTTP
      .get(`addnode`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  backupWallet(destination: string): string {
    // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

    // Parameter #1—destination directory or filename
    // A filename or directory name. If a filename, it will be created or overwritten.
    // If a directory name, the file wallet.dat will be created or overwritten within that directory

    // Result—null or error
    // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

    let request = this.BitboxHTTP
      .get(`backupWallet`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  bumpfee(): string {

    let request = this.BitboxHTTP
      .get(`bumpfee`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  clearbanned(): string {
    //The clearbanned RPC clears list of banned nodes.

    // Parameters: none

    // Result—null on success
    // JSON null when the list was cleared

    let request = this.BitboxHTTP
      .get(`clearbanned`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  createmultisig(required: number, address: Array<string>|string): string {
    // The createmultisig RPC creates a P2SH multi-signature address.

    // Parameter #1—the number of signatures required
    // The minimum (m) number of signatures required to spend this m-of-n multisig script

    // Parameter #2—the full public keys, or addresses for known public keys

    // An array of strings with each string being a public key or address
    // or
    // A public key against which signatures will be checked. If wallet support is enabled, this may be a P2PKH address belonging to the wallet—the corresponding public key will be substituted.
    // There must be at least as many keys as specified by the Required parameter, and there may be more keys

    // Result—P2SH address and hex-encoded redeem script

    let request = this.BitboxHTTP
      .get(`createmultisig`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  createrawtransaction(): string {

    let request = this.BitboxHTTP
      .get(`createrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  decoderawtransaction(): string {

    let request = this.BitboxHTTP
      .get(`decoderawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  decodescript(): string {

    let request = this.BitboxHTTP
      .get(`decodescript`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  disconnectnode(): string {

    let request = this.BitboxHTTP
      .get(`disconnectnode`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  dumpprivkey(publicAddress: string): string {

    let request = this.BitboxHTTP
      .get(`dumpprivkey`, {
          params: {
            address: publicAddress
          }
        })
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  dumpwallet(): string {

    let request = this.BitboxHTTP
      .get(`dumpwallet`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  encryptwallet(): string {

    let request = this.BitboxHTTP
      .get(`encryptwallet`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  estimatefee(): string {

    let request = this.BitboxHTTP
      .get(`estimatefee`)
      .then((response) => {
        console.log('called', response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  estimatepriority(): string {

    let request = this.BitboxHTTP
      .get(`estimatepriority`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  fundrawtransaction(): string {

    let request = this.BitboxHTTP
      .get(`fundrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  generate(): string {

    let request = this.BitboxHTTP
      .get(`generate`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  generatetoaddress(): string {

    let request = this.BitboxHTTP
      .get(`generatetoaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getaccountaddress(): string {

    let request = this.BitboxHTTP
      .get(`getaccountaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getaccount(): string {

    let request = this.BitboxHTTP
      .get(`getaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getaddednodeinfo(): string {

    let request = this.BitboxHTTP
      .get(`getaddednodeinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getaddressesbyaccount(): string {

    let request = this.BitboxHTTP
      .get(`getaddressesbyaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getbalance(): string {

    let request = this.BitboxHTTP
      .get(`getbalance`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getbestblockhash(): string {

    let request = this.BitboxHTTP
      .get(`getbestblockhash`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getblock(): string {

    let request = this.BitboxHTTP
      .get(`getblock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getblockchaininfo(): string {

    let request = this.BitboxHTTP
      .get(`getblockchaininfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getblockcount(): string {

    let request = this.BitboxHTTP
      .get(`getblockcount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getblockhash(): string {

    let request = this.BitboxHTTP
      .get(`getblockhash`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getblockheader(): string {

    let request = this.BitboxHTTP
      .get(`getblockheader`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getblocktemplate(): string {

    let request = this.BitboxHTTP
      .get(`getblocktemplate`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getchaintips(): string {

    let request = this.BitboxHTTP
      .get(`getchaintips`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getconnectioncount(): string {

    let request = this.BitboxHTTP
      .get(`getconnectioncount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getdifficulty(): string {

    let request = this.BitboxHTTP
      .get(`getdifficulty`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getgenerate(): string {

    let request = this.BitboxHTTP
      .get(`getgenerate`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  gethashespersec(): string {

    let request = this.BitboxHTTP
      .get(`gethashespersec`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getinfo(): string {

    let request = this.BitboxHTTP
      .get(`getinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getmemoryinfo(): string {

    let request = this.BitboxHTTP
      .get(`getmemoryinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getmempoolancestors(): string {

    let request = this.BitboxHTTP
      .get(`getmempoolancestors`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getmempooldescendants(): string {

    let request = this.BitboxHTTP
      .get(`getmempooldescendants`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getmempoolentry(): string {

    let request = this.BitboxHTTP
      .get(`getmempoolentry`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getmempoolinfo(): string {

    let request = this.BitboxHTTP
      .get(`getmempoolinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getmininginfo(): string {

    let request = this.BitboxHTTP
      .get(`getmininginfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getnettotals(): string {

    let request = this.BitboxHTTP
      .get(`getnettotals`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getnetworkhashps(): string {

    let request = this.BitboxHTTP
      .get(`getnetworkhashps`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getnetworkinfo(): string {

    let request = this.BitboxHTTP
      .get(`getnetworkinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getnewaddress(): string {

    let request = this.BitboxHTTP
      .get(`getnewaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getpeerinfo(): string {

    let request = this.BitboxHTTP
      .get(`getpeerinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getrawchangeaddress(): string {

    let request = this.BitboxHTTP
      .get(`getrawchangeaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getrawmempool(): string {

    let request = this.BitboxHTTP
      .get(`getrawmempool`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getrawtransaction(): string {

    let request = this.BitboxHTTP
      .get(`getrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getreceivedbyaccount(): string {

    let request = this.BitboxHTTP
      .get(`getreceivedbyaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getreceivedbyaddress(): string {

    let request = this.BitboxHTTP
      .get(`getreceivedbyaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  gettransaction(): string {

    let request = this.BitboxHTTP
      .get(`gettransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  gettxout(): string {

    let request = this.BitboxHTTP
      .get(`gettxout`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  gettxoutproof(): string {

    let request = this.BitboxHTTP
      .get(`gettxoutproof`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  gettxoutsetinfo(): string {

    let request = this.BitboxHTTP
      .get(`gettxoutsetinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getunconfirmedbalance(): string {

    let request = this.BitboxHTTP
      .get(`getunconfirmedbalance`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getwalletinfo(): string {

    let request = this.BitboxHTTP
      .get(`getwalletinfo`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  getwork(): string {

    let request = this.BitboxHTTP
      .get(`getwork`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  help(): string {

    let request = this.BitboxHTTP
      .get(`help`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  importaddress(): string {

    let request = this.BitboxHTTP
      .get(`importaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  importmulti(): string {

    let request = this.BitboxHTTP
      .get(`importmulti`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  importprivkey(): string {

    let request = this.BitboxHTTP
      .get(`importprivkey`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  importprunedfunds(): string {

    let request = this.BitboxHTTP
      .get(`importprunedfunds`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  importwallet(): string {

    let request = this.BitboxHTTP
      .get(`importwallet`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  keypoolrefill(): string {

    let request = this.BitboxHTTP
      .get(`keypoolrefill`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listaccounts(): string {

    let request = this.BitboxHTTP
      .get(`listaccounts`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listaddressgroupings(): string {

    let request = this.BitboxHTTP
      .get(`listaddressgroupings`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listbanned(): string {

    let request = this.BitboxHTTP
      .get(`listbanned`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listlockunspent(): string {

    let request = this.BitboxHTTP
      .get(`listlockunspent`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listreceivedbyaccount(): string {

    let request = this.BitboxHTTP
      .get(`listreceivedbyaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listreceivedbyaddress(): string {

    let request = this.BitboxHTTP
      .get(`listreceivedbyaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listsinceblock(): string {

    let request = this.BitboxHTTP
      .get(`listsinceblock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listtransactions(): string {

    let request = this.BitboxHTTP
      .get(`listtransactions`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  listunspent(): string {

    let request = this.BitboxHTTP
      .get(`listunspent`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  lockunspent(): string {

    let request = this.BitboxHTTP
      .get(`lockunspent`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  move(): string {

    let request = this.BitboxHTTP
      .get(`move`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  pingRpc(): string {

    let request = this.BitboxHTTP
      .get(`pingRpc`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  preciousblock(): string {

    let request = this.BitboxHTTP
      .get(`preciousblock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  prioritisetransaction(): string {

    let request = this.BitboxHTTP
      .get(`prioritisetransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  pruneblockchain(): string {

    let request = this.BitboxHTTP
      .get(`pruneblockchain`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  removeprunedfunds(): string {

    let request = this.BitboxHTTP
      .get(`removeprunedfunds`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  sendfrom(): string {

    let request = this.BitboxHTTP
      .get(`sendfrom`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  sendmany(): string {

    let request = this.BitboxHTTP
      .get(`sendmany`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  sendrawtransaction(): string {

    let request = this.BitboxHTTP
      .get(`sendrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  sendtoaddress(): string {

    let request = this.BitboxHTTP
      .get(`sendtoaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  setaccount(): string {

    let request = this.BitboxHTTP
      .get(`setaccount`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  setban(): string {

    let request = this.BitboxHTTP
      .get(`setban`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  setgenerate(): string {

    let request = this.BitboxHTTP
      .get(`setgenerate`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  setnetworkactive(): string {

    let request = this.BitboxHTTP
      .get(`setnetworkactive`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  settxfee(): string {

    let request = this.BitboxHTTP
      .get(`settxfee`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  signmessage(): string {

    let request = this.BitboxHTTP
      .get(`signmessage`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  signmessagewithprivkey(): string {

    let request = this.BitboxHTTP
      .get(`signmessagewithprivkey`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  signrawtransaction(): string {

    let request = this.BitboxHTTP
      .get(`signrawtransaction`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  stop(): string {

    let request = this.BitboxHTTP
      .get(`stop`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  submitblock(): string {

    let request = this.BitboxHTTP
      .get(`submitblock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  validateaddress(): string {

    let request = this.BitboxHTTP
      .get(`validateaddress`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  verifychain(): string {

    let request = this.BitboxHTTP
      .get(`verifychain`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  verifymessage(): string {

    let request = this.BitboxHTTP
      .get(`verifymessage`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  verifytxoutproof(): string {

    let request = this.BitboxHTTP
      .get(`verifytxoutproof`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  walletlock(): string {

    let request = this.BitboxHTTP
      .get(`walletlock`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  walletpassphrase(): string {

    let request = this.BitboxHTTP
      .get(`walletpassphrase`)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  walletpassphrasechange(): string {

    let request = this.BitboxHTTP
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
