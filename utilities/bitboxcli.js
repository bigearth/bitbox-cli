// @flow
import axios from 'axios';

class BITBOXCli {
  constructor(config) {
    this.BitboxHTTP = axios.create({
      baseURL: `${config.networks.development.protocol}://${config.networks.development.host}:${config.networks.development.port}/`
    });
  }

  addmultisigaddress(required: number, keys: Array<string>|string, account: ?string): string{
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
      .get(`addmultisigaddress`, {
        params: {
          required: required,
          keys: keys
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
      .get(`addnode`, {
        params: {
          node: node,
          command: command
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

  backupwallet(destination: string): string {
    // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

    // Parameter #1—destination directory or filename
    // A filename or directory name. If a filename, it will be created or overwritten.
    // If a directory name, the file wallet.dat will be created or overwritten within that directory

    // Result—null or error
    // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

    let request = this.BitboxHTTP
      .get(`backupWallet`, {
        params: {
          destination: destination
        }
      })
      .then((response) => {
        let fs = require('fs');

        fs.appendFile("wallet.txt", response.data, (err) => {
          if (err) throw err;
        });
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
      .get(`createmultisig`, {
        params: {
          required: required,
          address: address
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

  decoderawtransaction(rawHex: string): string {
    // decodes a serialized transaction hex string into a JSON object describing the transaction.

    // Parameter #1—serialized transaction in hex

    // Result—the decoded transaction
    let request = this.BitboxHTTP
      .get(`decoderawtransaction`, {
        params: {
          rawHex: rawHex
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

  decodescript(redeemScript: string): string {
    // decodes a hex-encoded P2SH redeem script.

    // Parameter #1—a hex-encoded redeem script

    // Result—the decoded script

    let request = this.BitboxHTTP
      .get(`decodescript`, {
        params: {
          redeemScript: redeemScript
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

  disconnectnode(address: string): string {
    // immediately disconnects from a specified node.

    // Parameter #1—hostname/IP address and port of node to disconnect

    // Result—null on success or error on failed disconnect

    let request = this.BitboxHTTP
      .get(`disconnectnode`, {
        params: {
          address: address
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

  dumpprivkey(address: string): string {
    // returns the wallet-import-format (WIP) private key corresponding to an address. (But does not remove it from the wallet.)

    // Parameter #1—the address corresponding to the private key to get

    // Result—the private key

    let request = this.BitboxHTTP
      .get(`dumpprivkey`, {
          params: {
            address: address
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
    // creates or overwrites a file with all wallet keys in a human-readable format.

    // Parameter #1—a filename

    // Result—null or error

    let request = this.BitboxHTTP
      .get(`dumpwallet`)
      .then((response) => {
        let fs = require('fs');

        fs.appendFile("wallet.txt", response.data, (err) => {
          if (err) throw err;
        });
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  encryptwallet(passphrase: string): string {
    // encrypts the wallet with a passphrase. This is only to enable encryption for the first time. After encryption is enabled, you will need to enter the passphrase to use private keys.
    // if using this RPC on the command line, remember that your shell probably saves your command lines (including the value of the passphrase parameter). In addition, there is no RPC to completely disable encryption. If you want to return to an unencrypted wallet, you must create a new wallet and restore your data from a backup made with the dumpwallet RPC.

    // Parameter #1—a passphrase

    // Result—a notice (with program shutdown)

    let request = this.BitboxHTTP
      .get(`encryptwallet`, {
        params: {
          passphrase: passphrase
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

  estimatefee(blocks: number): string {

    let request = this.BitboxHTTP
      .get(`estimatefee`, {
        params: {
          blocks: blocks
        }
      })
      .then((response) => {
        console.log('called', response.data);
      })
      .catch(error => {
        // console.log('error', error);
      });
    return request;
  }

  estimatepriority(blocks: number): string {

    let request = this.BitboxHTTP
      .get(`estimatepriority`, {
        params: {
          blocks: blocks
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

  fundrawtransaction(hexstring: string, options: any): string {

    let request = this.BitboxHTTP
      .get(`fundrawtransaction`, {
        params: {
          hexstring: hexstring,
          options, options
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

  generate(blocks: number, maxtries: number): string {

    let request = this.BitboxHTTP
      .get(`generate`, {
        params: {
          blocks: blocks,
          maxtries, maxtries
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

  generatetoaddress(blocks: number, address: string, maxtries: number): string {

    let request = this.BitboxHTTP
      .get(`generatetoaddress`, {
        params: {
          blocks: blocks,
          address: address,
          maxtries, maxtries
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

  getaccountaddress(account: string): string {
    // eturns the current Bitcoin address for receiving payments to this account. If the account doesn’t exist, it creates both the account and a new address for receiving payment. Once a payment has been received to an address, future calls to this RPC for the same account will return a different address.

    // Parameter #1—an account name

    // Result—a bitcoin address

    let request = this.BitboxHTTP
      .get(`getaccountaddress`, {
        params: {
          account, account
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

  getaccount(address: string): string {
    // returns the name of the account associated with the given address.

    // Parameter #1—a Bitcoin address

    // Result—an account name

    let request = this.BitboxHTTP
      .get(`getaccount`, {
        params: {
          address, address
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

  getaddednodeinfo(details: boolean, node: ?string): string {
    // returns information about the given added node, or all added nodes (except onetry nodes). Only nodes which have been manually added using the addnode RPC will have their information displayed.

    // Parameter #1—whether to display connection information

    // Parameter #2—what node to display information about

    // Result—a list of added nodes

    let request = this.BitboxHTTP
      .get(`getaddednodeinfo`, {
        params: {
          details, details,
          node: node
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

  getaddressesbyaccount(account: string): string {
    // returns a list of every address assigned to a particular account.

    // Parameter #1—the account name

    // Result—a list of addresses

    let request = this.BitboxHTTP
      .get(`getaddressesbyaccount`, {
        params: {
          account, account
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

  getbalance(account: string): string {
    // gets the balance in decimal bitcoins across all accounts or for a particular account.

    // Parameter #1—an account name

    // Parameter #2—the minimum number of confirmations

    // Parameter #3—whether to include watch-only addresses

    // Result—the balance in bitcoins

    let request = this.BitboxHTTP
      .get(`getbalance`, {
        params: {
          account, account
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

  getbestblockhash(): string {
    // returns the header hash of the most recent block on the best block chain.

    // Parameters: none

    // Result—hash of the tip from the best block chain

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
