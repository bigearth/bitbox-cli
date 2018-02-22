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
    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`addmultisigaddress`, {
        params: {
          required: required,
          keys: keys
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(Error(error));
      });
    });
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

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`addnode`, {
        params: {
          node: node,
          command: command
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(Error(error));
      });
    });
  }

  backupwallet(destination: string): string {
    // The backupwallet RPC safely copies wallet.dat to the specified file, which can be a directory or a path with filename.

    // Parameter #1—destination directory or filename
    // A filename or directory name. If a filename, it will be created or overwritten.
    // If a directory name, the file wallet.dat will be created or overwritten within that directory

    // Result—null or error
    // Always null whether success or failure. The JSON-RPC error and message fields will be set if a failure occurred

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`backupWallet`, {
        params: {
          destination: destination
        }
      })
      .then((response) => {
        let fs = require('fs');

        fs.appendFile("wallet.txt", response.data, (error) => {
          if (error) {
            reject(Error(error));
          } else {
            resolve(response.data);
          }
        });
      })
      .catch((error) => {
        reject(Error(error));
      });
    });
  }

  clearbanned(): string {
    //The clearbanned RPC clears list of banned nodes.

    // Parameters: none

    // Result—null on success
    // JSON null when the list was cleared

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`clearbanned`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
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

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`createmultisig`, {
        params: {
          required: required,
          address: address
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  createrawtransaction(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`createrawtransaction`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  decoderawtransaction(rawHex: string): string {
    // decodes a serialized transaction hex string into a JSON object describing the transaction.

    // Parameter #1—serialized transaction in hex

    // Result—the decoded transaction
    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`decoderawtransaction`, {
        params: {
          rawHex: rawHex
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  decodescript(redeemScript: string): string {
    // decodes a hex-encoded P2SH redeem script.

    // Parameter #1—a hex-encoded redeem script

    // Result—the decoded script

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`decodescript`, {
        params: {
          redeemScript: redeemScript
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  disconnectnode(address: string): string {
    // immediately disconnects from a specified node.

    // Parameter #1—hostname/IP address and port of node to disconnect

    // Result—null on success or error on failed disconnect

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`disconnectnode`, {
        params: {
          address: address
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  dumpprivkey(address: string): string {
    // returns the wallet-import-format (WIP) private key corresponding to an address. (But does not remove it from the wallet.)

    // Parameter #1—the address corresponding to the private key to get

    // Result—the private key

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`dumpprivkey`, {
          params: {
            address: address
          }
        })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  dumpwallet(): string {
    // creates or overwrites a file with all wallet keys in a human-readable format.

    // Parameter #1—a filename

    // Result—null or error

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`dumpwallet`)
      .then((response) => {
        let fs = require('fs');

        fs.appendFile("wallet.txt", response.data, (error) => {
          if (error) {
            reject(Error(error));
          }  else {
            resolve(response.data);
          }
        });
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  encryptwallet(passphrase: string): string {
    // encrypts the wallet with a passphrase. This is only to enable encryption for the first time. After encryption is enabled, you will need to enter the passphrase to use private keys.
    // if using this RPC on the command line, remember that your shell probably saves your command lines (including the value of the passphrase parameter). In addition, there is no RPC to completely disable encryption. If you want to return to an unencrypted wallet, you must create a new wallet and restore your data from a backup made with the dumpwallet RPC.

    // Parameter #1—a passphrase

    // Result—a notice (with program shutdown)

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`encryptwallet`, {
        params: {
          passphrase: passphrase
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  estimatefee(blocks: number): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`estimatefee`, {
        params: {
          blocks: blocks
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  estimatepriority(blocks: number): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`estimatepriority`, {
        params: {
          blocks: blocks
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  fundrawtransaction(hexstring: string, options: any): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`fundrawtransaction`, {
        params: {
          hexstring: hexstring,
          options, options
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  generate(blocks: number, maxtries: number): string {
    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`generate`, {
        params: {
          blocks: blocks,
          maxtries, maxtries
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  generatetoaddress(blocks: number, address: string, maxtries: number): string {
    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`generatetoaddress`, {
        params: {
          blocks: blocks,
          address: address,
          maxtries, maxtries
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getaccountaddress(account: string): string {
    // eturns the current Bitcoin address for receiving payments to this account. If the account doesn’t exist, it creates both the account and a new address for receiving payment. Once a payment has been received to an address, future calls to this RPC for the same account will return a different address.

    // Parameter #1—an account name

    // Result—a bitcoin address

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getaccountaddress`, {
        params: {
          account, account
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getaccount(address: string): string {
    // returns the name of the account associated with the given address.

    // Parameter #1—a Bitcoin address

    // Result—an account name

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getaccount`, {
        params: {
          address, address
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getaddednodeinfo(details: boolean, node: ?string): string {
    // returns information about the given added node, or all added nodes (except onetry nodes). Only nodes which have been manually added using the addnode RPC will have their information displayed.

    // Parameter #1—whether to display connection information

    // Parameter #2—what node to display information about

    // Result—a list of added nodes

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getaddednodeinfo`, {
        params: {
          details, details,
          node: node
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getaddressesbyaccount(account: string): string {
    // returns a list of every address assigned to a particular account.

    // Parameter #1—the account name

    // Result—a list of addresses

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getaddressesbyaccount`, {
        params: {
          account, account
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getbalance(account: string): string {
    // gets the balance in decimal bitcoins across all accounts or for a particular account.

    // Parameter #1—an account name

    // Parameter #2—the minimum number of confirmations

    // Parameter #3—whether to include watch-only addresses

    // Result—the balance in bitcoins

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getbalance`, {
        params: {
          account, account
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getbestblockhash(): string {
    // returns the header hash of the most recent block on the best block chain.

    // Parameters: none

    // Result—hash of the tip from the best block chain

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getbestblockhash`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getblock(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getblock`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getblockchaininfo(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getblockchaininfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getblockcount(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getblockcount`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getblockhash(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getblockhash`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getblockheader(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getblockheader`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getblocktemplate(): string {

    return new Promise((resolve, reject) => {
    });
     this.BitboxHTTP
      .get(`getblocktemplate`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
  }

  getchaintips(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getchaintips`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getconnectioncount(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getconnectioncount`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getdifficulty(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getdifficulty`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getgenerate(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getgenerate`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  gethashespersec(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`gethashespersec`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getinfo(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getinfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getmemoryinfo(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`getmemoryinfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getmempoolancestors(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getmempoolancestors`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getmempooldescendants(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getmempooldescendants`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getmempoolentry(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getmempoolentry`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getmempoolinfo(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getmempoolinfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getmininginfo(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getmininginfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getnettotals(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getnettotals`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getnetworkhashps(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getnetworkhashps`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getnetworkinfo(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getnetworkinfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getnewaddress(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getnewaddress`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getpeerinfo(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getpeerinfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getrawchangeaddress(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getrawchangeaddress`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getrawmempool(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getrawmempool`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getrawtransaction(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getrawtransaction`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getreceivedbyaccount(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getreceivedbyaccount`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getreceivedbyaddress(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getreceivedbyaddress`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  gettransaction(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`gettransaction`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  gettxout(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`gettxout`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  gettxoutproof(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`gettxoutproof`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  gettxoutsetinfo(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`gettxoutsetinfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getunconfirmedbalance(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getunconfirmedbalance`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getwalletinfo(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getwalletinfo`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  getwork(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`getwork`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  help(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`help`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  importaddress(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`importaddress`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  importmulti(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`importmulti`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  importprivkey(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`importprivkey`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  importprunedfunds(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`importprunedfunds`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  importwallet(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`importwallet`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  keypoolrefill(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`keypoolrefill`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listaccounts(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listaccounts`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listaddressgroupings(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listaddressgroupings`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listbanned(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listbanned`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listlockunspent(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listlockunspent`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listreceivedbyaccount(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listreceivedbyaccount`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listreceivedbyaddress(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listreceivedbyaddress`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listsinceblock(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listsinceblock`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listtransactions(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listtransactions`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  listunspent(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`listunspent`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  lockunspent(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`lockunspent`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  move(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`move`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  pingRpc(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`pingRpc`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  preciousblock(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`preciousblock`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  prioritisetransaction(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`prioritisetransaction`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  pruneblockchain(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`pruneblockchain`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  removeprunedfunds(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`removeprunedfunds`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  sendfrom(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`sendfrom`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  sendmany(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`sendmany`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  sendrawtransaction(): string {
    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`sendrawtransaction`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  sendtoaddress(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`sendtoaddress`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  setaccount(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`setaccount`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  setban(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`setban`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  setgenerate(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`setgenerate`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  setnetworkactive(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`setnetworkactive`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  settxfee(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`settxfee`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  signmessage(address: string, message: string): string {

    // Sign a message with the private key of an address

    // Arguments:
    // 1. "address"         (string, required) The bitcoin address to use for the private key.
    // 2. "message"         (string, required) The message to create a signature of.

    // Result:
    // "signature"          (string) The signature of the message encoded in base 64

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`signmessage`, {
        params: {
          address, address,
          message: message
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  signmessagewithprivkey(privkey: string, message: string): string {

    // Sign a message with the private key of an address

    // Arguments:
    // 1. "privkey"         (string, required) The private key to sign the message with.
    // 2. "message"         (string, required) The message to create a signature of.

    // Result:
    // "signature"          (string) The signature of the message encoded in base 64

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`signmessagewithprivkey`, {
        params: {
          privkey, privkey,
          message: message
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  signrawtransaction(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`signrawtransaction`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  stop(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`stop`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  submitblock(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`submitblock`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  validateaddress(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`validateaddress`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  verifychain(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`verifychain`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  verifymessage(address: string, signature: string, message: string): string {
    // Verify a signed message

    // Arguments:
    // 1. "address"         (string, required) The bitcoin address to use for the signature.
    // 2. "signature"       (string, required) The signature provided by the signer in base 64 encoding (see signmessage).
    // 3. "message"         (string, required) The message that was signed.

    // Result:
    // true|false   (boolean) If the signature is verified or not.

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`verifymessage`, {
        params: {
          address, address,
          signature: signature,
          message: message
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  verifytxoutproof(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`verifytxoutproof`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  walletlock(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`walletlock`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  walletpassphrase(): string {

    return new Promise((resolve, reject) => {
     this.BitboxHTTP
      .get(`walletpassphrase`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }

  walletpassphrasechange(): string {

    return new Promise((resolve, reject) => {
      this.BitboxHTTP
      .get(`walletpassphrasechange`)
      .then((response) => {
      })
      .catch(error => {
        reject(Error(error));
      });
    });
  }
}

export default BITBOXCli;
