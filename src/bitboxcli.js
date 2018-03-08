import axios from 'axios';
import BitcoinCash from './BitcoinCash';
import Crypto from './Crypto';
import Util from './Util';
import Blockchain from './Blockchain';
import Control from './Control';

class BITBOXCli {
  constructor(config) {
    if(!config) {
      config = {
        username: '',
        password: '',
        protocol: '',
        host: '',
        port: ''
      };
    }

    this.config = config;
    this.BitboxHTTP = axios.create({
      baseURL: `${config.protocol}://${config.host}:${config.port}/`
    });
    this.BitcoinCash = BitcoinCash;
    this.Crypto = Crypto;
    this.Util = new Util(config, this.BitboxHTTP);
    this.Blockchain = new Blockchain(config, this.BitboxHTTP);
    this.Control = new Control(config, this.BitboxHTTP);
  }


  addmultisigaddress(nrequired, keys, account){
    // Add a nrequired-to-sign multisignature address to the wallet.
    // Each key is a Bitcoin address or hex-encoded public key.
    // If 'account' is specified (DEPRECATED), assign address to that account.
    //
    // Arguments:
    // 1. nrequired        (numeric, required) The number of required signatures out of the n keys or addresses.
    // 2. "keys"         (string, required) A json array of bitcoin addresses or hex-encoded public keys
    //      [
    //        "address"  (string) bitcoin address or hex-encoded public key
    //        ...,
    //      ]
    // 3. "account"      (string, optional) DEPRECATED. An account to assign the addresses to.
    //
    // Result:
    // "address"         (string) A bitcoin address associated with the keys.

    let params;
    if(!account) {
      params = [
        nrequired,
        keys
      ];
    } else {
      params = [
        nrequired,
        keys,
        account
      ];
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"addmultisigaddress",
        method: "addmultisigaddress",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return Error(error.response.data.error.message);
    });
  }

  addnode(node, command){
    // Attempts add or remove a node from the addnode list.
    // Or try a connection to a node once.
    //
    // Arguments:
    // 1. "node"     (string, required) The node (see getpeerinfo for nodes)
    // 2. "command"  (string, required) 'add' to add a node to the list, 'remove' to remove a node from the list, 'onetry' to try a connection to the node once
    //
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"addnode",
        method: "addnode",
        params: [
          node,
          command
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return Error(error.response.data.error.message);
    });
  }

  backupwallet(destination) {
    // Safely copies current wallet file to destination, which can be a directory or a path with filename.
    //
    // Arguments:
    // 1. "destination"   (string) The destination directory or file

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"backupWallet",
        method: "backupWallet",
        params: [
          destination
        ]
      }
    })
    .then((response) => {
      let fs = require('fs');

      fs.appendFile(destination, response.data, (error) => {
        if (error) {
          return Error(error.response.data.error.message);
        } else {
          return response.data.result;
        }
      });
    })
    .catch((error) => {
      return Error(error.response.data.error.message);
    });
  }

  clearbanned() {
    //The clearbanned RPC clears list of banned nodes.

    // Parameters: none

    // Result—null on success
    // JSON null when the list was cleared

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"clearbanned",
        method: "clearbanned",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  createrawtransaction(inputs, outputs, locktime) {
    // creates an unsigned serialized transaction that spends a previous output to a new output with a P2PKH or P2SH address. The transaction is not stored in the wallet or transmitted to the network.

    // Parameter #1—Inputs

    // Parameter #2—P2PKH or P2SH addresses and amounts

    // Parameter #3—locktime

    // Result—the unsigned raw transaction in hex
    let params;
    if(!locktime) {
      params = [
        inputs,
        outputs
      ];
    } else {
      params = [
        inputs,
        outputs,
        locktime
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"createrawtransaction",
        method: "createrawtransaction",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  decoderawtransaction(rawHex) {
    // decodes a serialized transaction hex string into a JSON object describing the transaction.

    // Parameter #1—serialized transaction in hex

    // Result—the decoded transaction

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"decoderawtransaction",
        method: "decoderawtransaction",
        params: [
          rawHex
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  decodescript(redeemScript) {
    // decodes a hex-encoded P2SH redeem script.

    // Parameter #1—a hex-encoded redeem script

    // Result—the decoded script
    // console.log('decode script called *****', redeemScript)

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"decodescript",
        method: "decodescript",
        params: [
          redeemScript
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  disconnectnode(configuration) {
    // Immediately disconnects from the specified peer node.
    //
    // Strictly one out of 'configuration.address' and 'configuration.nodeid' can be provided to identify the node.
    //
    // To disconnect by nodeid, either set 'address' to the empty string, or call using the named 'nodeid' argument only.
    //
    // Arguments:
    // 1. "configuration" (object, optional)
    // Properties
    // 1. "address"     (string, optional) The IP address/port of the node
    // 2. "nodeid"      (number, optional) The node ID (see getpeerinfo for node IDs)
    let params;
    if(configuration && configuration.address && configuration.address !== "") {
      params = [
        configuration.address
      ];
    } else if(configuration && configuration.nodeid) {
      params = [
        "",
        configuration.nodeid
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"disconnectnode",
        method: "disconnectnode",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  dumpprivkey(address) {
    // returns the wallet-import-format (WIP) private key corresponding to an address. (But does not remove it from the wallet.)

    // Parameter #1—the address corresponding to the private key to get

    // Result—the private key

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"dumpprivkey",
        method: "dumpprivkey",
        params: [
          address
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  dumpwallet(filename) {
    // creates or overwrites a file with all wallet keys in a human-readable format.

    // Parameter #1—a filename

    // Result—null or error

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"dumpwallet",
        method: "dumpwallet",
        params: [
          filename
        ]
      }
    })
    .then((response) => {
      return response.data.result;
      // let fs = require('fs');
      //
      // fs.appendFile("wallet.txt", response.data, (error) => {
      //   if (error) {
      //     return Error(error.response.data.error.message);
      //   }  else {
      //     return response.data.result;
      //   }
      // });
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  encryptwallet(passphrase) {
    // encrypts the wallet with a passphrase. This is only to enable encryption for the first time. After encryption is enabled, you will need to enter the passphrase to use private keys.
    // if using this RPC on the command line, remember that your shell probably saves your command lines (including the value of the passphrase parameter). In addition, there is no RPC to completely disable encryption. If you want to return to an unencrypted wallet, you must create a new wallet and restore your data from a backup made with the dumpwallet RPC.

    // Parameter #1—a passphrase

    // Result—a notice (with program shutdown)

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"encryptwallet",
        method: "encryptwallet",
        params: [
          passphrase
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  estimatesmartfee(nblocks) {
    // WARNING: This interface is unstable and may disappear or change!
    //
    // Estimates the approximate fee per kilobyte needed for a transaction to begin
    // confirmation within nblocks blocks if possible and return the number of blocks
    // for which the estimate is valid.
    //
    // Arguments:
    // 1. nblocks     (numeric)
    //
    // Result:
    // {
    //   "feerate" : x.x,     (numeric) estimate fee-per-kilobyte (in BCH)
    //   "blocks" : n         (numeric) block number where estimate was found
    // }
    //
    // A negative value is returned if not enough transactions and blocks
    // have been observed to make an estimate for any number of blocks.
    // However it will not return a value below the mempool reject fee.

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"estimatesmartfee",
        method: "estimatesmartfee",
        params: [
          nblocks
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  estimatesmartpriority(nblocks) {
    // DEPRECATED. WARNING: This interface is unstable and may disappear or change!
    //
    // Estimates the approximate priority a zero-fee transaction needs to begin
    // confirmation within nblocks blocks if possible and return the number of blocks
    // for which the estimate is valid.
    //
    // Arguments:
    // 1. nblocks     (numeric, required)
    //
    // Result:
    // {
    //   "priority" : x.x,    (numeric) estimated priority
    //   "blocks" : n         (numeric) block number where estimate was found
    // }
    //
    // A negative value is returned if not enough transactions and blocks
    // have been observed to make an estimate for any number of blocks.
    // However if the mempool reject fee is set it will return 1e9 * MAX_MONEY.
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"estimatesmartpriority",
        method: "estimatesmartpriority",
        params: [
          nblocks
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  fundrawtransaction(hexstring, options) {
    // Add inputs to a transaction until it has enough in value to meet its out value.
    // This will not modify existing inputs, and will add at most one change output to the outputs.
    // No existing outputs will be modified unless "subtractFeeFromOutputs" is specified.
    // Note that inputs which were signed may need to be resigned after completion since in/outputs have been added.
    // The inputs added will not be signed, use signrawtransaction for that.
    // Note that all existing inputs must have their previous output transaction be in the wallet.
    // Note that all inputs selected must be of standard form and P2SH scripts must be
    // in the wallet using importaddress or addmultisigaddress (to calculate fees).
    // You can see whether this is the case by checking the "solvable" field in the listunspent output.
    // Only pay-to-pubkey, multisig, and P2SH versions thereof are currently supported for watch-only
    //
    // Arguments:
    // 1. "hexstring"           (string, required) The hex string of the raw transaction
    // 2. options                 (object, optional)
    //    {
    //      "changeAddress"          (string, optional, default pool address) The bitcoin address to receive the change
    //      "changePosition"         (numeric, optional, default random) The index of the change output
    //      "includeWatching"        (boolean, optional, default false) Also select inputs which are watch only
    //      "lockUnspents"           (boolean, optional, default false) Lock selected unspent outputs
    //      "reserveChangeKey"       (boolean, optional, default true) Reserves the change output key from the keypool
    //      "feeRate"                (numeric, optional, default not set: makes wallet determine the fee) Set a specific feerate (BCH per KB)
    //      "subtractFeeFromOutputs" (array, optional) A json array of integers.
    //                               The fee will be equally deducted from the amount of each specified output.
    //                               The outputs are specified by their zero-based index, before any change output is added.
    //                               Those recipients will receive less bitcoins than you enter in their corresponding amount field.
    //                               If no outputs are specified here, the sender pays the fee.
    //                                   [vout_index,...]
    //    }
    //                          for backward compatibility: passing in a true instead of an object will result in {"includeWatching":true}
    //
    // Result:
    // {
    //   "hex":       "value", (string)  The resulting raw transaction (hex-encoded string)
    //   "fee":       n,         (numeric) Fee in BCH the resulting transaction pays
    //   "changepos": n          (numeric) The position of the added change output, or -1
    // }

    let params;
    if(!options) {
      params = [
        hexstring
      ];
    } else {
      params = [
        hexstring,
        options
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"fundrawtransaction",
        method: "fundrawtransaction",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  generate(blocks, maxtries) {
    // Mine up to nblocks blocks immediately (before the RPC call returns)
    //
    // Arguments:
    // 1. nblocks      (numeric, required) How many blocks are generated immediately.
    // 2. maxtries     (numeric, optional) How many iterations to try (default = 1000000).

    let params;
    if(!maxtries) {
      params = [
        blocks
      ];
    } else {
      params = [
        blocks,
        maxtries
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"generate",
        method: "generate",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  generatetoaddress(blocks, address, maxtries) {

    // Mine blocks immediately to a specified address (before the RPC call returns)
    //
    // Arguments:
    // 1. nblocks      (numeric, required) How many blocks are generated immediately.
    // 2. address      (string, required) The address to send the newly generated bitcoin to.
    // 3. maxtries     (numeric, optional) How many iterations to try (default = 1000000).
    //
    // Result:
    // [ blockhashes ]     (array) hashes of blocks generated
    //
    let params;
    if(!maxtries) {
      params = [
        blocks,
        address
      ];
    } else {
      params = [
        blocks,
        address,
        maxtries
      ];
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"generatetoaddress",
        method: "generatetoaddress",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getaccountaddress(account) {
    // DEPRECATED. Returns the current Bitcoin address for receiving payments to this account.
    //
    // Arguments:
    // 1. "account"       (string, required) The account name for the address. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created and a new address created  if there is no account by the given name.
    //
    // Result:
    // "address"          (string) The account bitcoin address
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getaccountaddress",
        method: "getaccountaddress",
        params: [
          account
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getaccount(address) {
    // DEPRECATED. Returns the account associated with the given address.
    //
    // Arguments:
    // 1. "address"         (string, required) The bitcoin address for account lookup.
    //
    // Result:
    // "accountname"        (string) the account address
    let params = [];
    if(address) {
      params.push(address);
    } else {
      params.push("");
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getaccount",
        method: "getaccount",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getaddednodeinfo(node) {
    // Returns information about the given added node, or all added nodes
    // (note that onetry addnodes are not listed here)
    //
    // Arguments:
    // 1. "node"   (string, optional) If provided, return information about this specific node, otherwise all nodes are returned.
    //
    // Result:
    // [
    //   {
    //     "addednode" : "192.168.0.201",   (string) The node ip address or name (as provided to addnode)
    //     "connected" : true|false,          (boolean) If connected
    //     "addresses" : [                    (list of objects) Only when connected = true
    //        {
    //          "address" : "192.168.0.201:8333",  (string) The bitcoin server IP and port we're connected to
    //          "connected" : "outbound"           (string) connection, inbound or outbound
    //        }
    //      ]
    //   }
    //   ,...
    // ]
    let params;
    if(!node) {
      params = [];
    } else {
      params = [
        node
      ];
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getaddednodeinfo",
        method: "getaddednodeinfo",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getaddressesbyaccount(account) {
  // DEPRECATED. Returns the list of addresses for the given account.
  //
  // Arguments:
  // 1. "account"        (string, required) The account name.
  //
  // Result:
  // [                     (json array of string)
  //   "address"         (string) a bitcoin address associated with the given account
  //   ,...
  // ]

    let params;
    if(!account) {
      params = [
        ""
      ];
    } else {
      params = [
        account
      ];
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getaddressesbyaccount",
        method: "getaddressesbyaccount",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getbalance(account, minconf, include_watchonly) {
    // If account is not specified, returns the server's total available balance.
    // If account is specified (DEPRECATED), returns the balance in the account.
    // Note that the account "" is not the same as leaving the parameter out.
    // The server total may be different to the balance in the default "" account.
    //
    // Arguments:
    // 1. "account"         (string, optional) DEPRECATED. The account string may be given as a
    //                      specific account name to find the balance associated with wallet keys in
    //                      a named account, or as the empty string ("") to find the balance
    //                      associated with wallet keys not in any named account, or as "*" to find
    //                      the balance associated with all wallet keys regardless of account.
    //                      When this option is specified, it calculates the balance in a different
    //                      way than when it is not specified, and which can count spends twice when
    //                      there are conflicting pending transactions temporarily resulting in low
    //                      or even negative balances.
    //                      In general, account balance calculation is not considered reliable and
    //                      has resulted in confusing outcomes, so it is recommended to avoid passing
    //                      this argument.
    // 2. minconf           (numeric, optional, default=1) Only include transactions confirmed at least this many times.
    // 3. include_watchonly (bool, optional, default=false) Also include balance in watch-only addresses (see 'importaddress')
    //
    // Result:
    // amount              (numeric) The total amount in BCH received for this account.
    let params = [];
    if(account) {
      params.push(account);
    } else {
      params.push("*");
    }

    if(minconf) {
      params.push(minconf);
    } else {
      params.push(0);
    }

    if(include_watchonly) {
      params.push(include_watchonly);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getbalance",
        method: "getbalance",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getblocktemplate(template_request) {

    // If the request parameters include a 'mode' key, that is used to explicitly select between the default 'template' request or a 'proposal'.
    // It returns data needed to construct a block to work on.
    // For full specification, see BIPs 22, 23, 9, and 145:
    //     https://github.com/bitcoin/bips/blob/master/bip-0022.mediawiki
    //     https://github.com/bitcoin/bips/blob/master/bip-0023.mediawiki
    //     https://github.com/bitcoin/bips/blob/master/bip-0009.mediawiki#getblocktemplate_changes
    //     https://github.com/bitcoin/bips/blob/master/bip-0145.mediawiki
    //
    // Arguments:
    // 1. template_request         (json object, optional) A json object in the following spec
    //      {
    //        "mode":"template"    (string, optional) This must be set to "template", "proposal" (see BIP 23), or omitted
    //        "capabilities":[     (array, optional) A list of strings
    //            "support"          (string) client side supported feature, 'longpoll', 'coinbasetxn', 'coinbasevalue', 'proposal', 'serverlist', 'workid'
    //            ,...
    //        ],
    //        "rules":[            (array, optional) A list of strings
    //            "support"          (string) client side supported softfork deployment
    //            ,...
    //        ]
    //      }

    let params;
    if(!template_request) {
      params = [];
    } else {
      params = [
        template_request
      ];
    }


    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getblocktemplate",
        method: "getblocktemplate",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getconnectioncount() {

    // Returns the number of connections to other nodes.
    //
    // Result:
    // n          (numeric) The connection count

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getconnectioncount",
        method: "getconnectioncount",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getmininginfo() {
    // Returns a json object containing mining-related information.
    // Result:
    // {
    //   "blocks": nnn,             (numeric) The current block
    //   "currentblocksize": nnn,   (numeric) The last block size
    //   "currentblocktx": nnn,     (numeric) The last block transaction
    //   "difficulty": xxx.xxxxx    (numeric) The current difficulty
    //   "errors": "..."            (string) Current errors
    //   "networkhashps": nnn,      (numeric) The network hashes per second
    //   "pooledtx": n              (numeric) The size of the mempool
    //   "chain": "xxxx",           (string) current network name as defined in BIP70 (main, test, regtest)
    // }


    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getmininginfo",
        method: "getmininginfo",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getnettotals() {
    // Returns information about network traffic, including bytes in, bytes out, and current time.
    //
    // Result:
    // {
    //   "totalbytesrecv": n,   (numeric) Total bytes received
    //   "totalbytessent": n,   (numeric) Total bytes sent
    //   "timemillis": t,       (numeric) Current UNIX time in milliseconds
    //   "uploadtarget":
    //   {
    //     "timeframe": n,                         (numeric) Length of the measuring timeframe in seconds
    //     "target": n,                            (numeric) Target in bytes
    //     "target_reached": true|false,           (boolean) True if target is reached
    //     "serve_historical_blocks": true|false,  (boolean) True if serving historical blocks
    //     "bytes_left_in_cycle": t,               (numeric) Bytes left in current time cycle
    //     "time_left_in_cycle": t                 (numeric) Seconds left in current time cycle
    //   }
    // }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getnettotals",
        method: "getnettotals",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getnetworkhashps(nblocks, height) {
    // Returns the estimated network hashes per second based on the last n blocks.
    // Pass in [blocks] to override # of blocks, -1 specifies since last difficulty change.
    // Pass in [height] to estimate the network speed at the time when a certain block was found.
    //
    // Arguments:
    // 1. nblocks     (numeric, optional, default=120) The number of blocks, or -1 for blocks since last difficulty change.
    // 2. height      (numeric, optional, default=-1) To estimate at the time of the given height.
    //
    // Result:
    // x             (numeric) Hashes per second estimated

    let params = [];
    if(nblocks) {
      params.push(nblocks);
    } else {
      params.push(0);
    }

    if(height) {
      params.push(height);
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getnetworkhashps",
        method: "getnetworkhashps",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getnetworkinfo() {
    // Returns an object containing various state info regarding P2P networking.
    //
    // Result:
    // {
    //   "version": xxxxx,                      (numeric) the server version
    //   "subversion": "/Satoshi:x.x.x/",     (string) the server subversion string
    //   "protocolversion": xxxxx,              (numeric) the protocol version
    //   "localservices": "xxxxxxxxxxxxxxxx", (string) the services we offer to the network
    //   "localrelay": true|false,              (bool) true if transaction relay is requested from peers
    //   "timeoffset": xxxxx,                   (numeric) the time offset
    //   "connections": xxxxx,                  (numeric) the number of connections
    //   "networkactive": true|false,           (bool) whether p2p networking is enabled
    //   "networks": [                          (array) information per network
    //   {
    //     "name": "xxx",                     (string) network (ipv4, ipv6 or onion)
    //     "limited": true|false,               (boolean) is the network limited using -onlynet?
    //     "reachable": true|false,             (boolean) is the network reachable?
    //     "proxy": "host:port"               (string) the proxy that is used for this network, or empty if none
    //     "proxy_randomize_credentials": true|false,  (string) Whether randomized credentials are used
    //   }
    //   ,...
    //   ],
    //   "relayfee": x.xxxxxxxx,                (numeric) minimum relay fee for non-free transactions in BCH/kB
    //   "incrementalfee": x.xxxxxxxx,          (numeric) minimum fee increment for mempool limiting or BIP 125 replacement in BCH/kB
    //   "localaddresses": [                    (array) list of local addresses
    //   {
    //     "address": "xxxx",                 (string) network address
    //     "port": xxx,                         (numeric) network port
    //     "score": xxx                         (numeric) relative score
    //   }
    //   ,...
    //   ]
    //   "warnings": "..."                    (string) any network warnings
    // }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getnetworkinfo",
        method: "getnetworkinfo",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getnewaddress(account) {
    // Returns a new Bitcoin address for receiving payments.
    // If 'account' is specified (DEPRECATED), it is added to the address book
    // so payments received with the address will be credited to 'account'.
    //
    // Arguments:
    // 1. "account"        (string, optional) DEPRECATED. The account name for the address to be linked to. If not provided, the default account "" is used. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created if there is no account by the given name.
    //
    // Result:
    // "address"    (string) The new bitcoin address

    let params = [];
    if(account) {
      params.push(account);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getnewaddress",
        method: "getnewaddress",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getpeerinfo() {
    // Returns data about each connected network node as a json array of objects.
    //
    // Result:
    // [
    //   {
    //     "id": n,                   (numeric) Peer index
    //     "addr":"host:port",      (string) The ip address and port of the peer
    //     "addrlocal":"ip:port",   (string) local address
    //     "services":"xxxxxxxxxxxxxxxx",   (string) The services offered
    //     "relaytxes":true|false,    (boolean) Whether peer has asked us to relay transactions to it
    //     "lastsend": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last send
    //     "lastrecv": ttt,           (numeric) The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
    //     "bytessent": n,            (numeric) The total bytes sent
    //     "bytesrecv": n,            (numeric) The total bytes received
    //     "conntime": ttt,           (numeric) The connection time in seconds since epoch (Jan 1 1970 GMT)
    //     "timeoffset": ttt,         (numeric) The time offset in seconds
    //     "pingtime": n,             (numeric) ping time (if available)
    //     "minping": n,              (numeric) minimum observed ping time (if any at all)
    //     "pingwait": n,             (numeric) ping wait (if non-zero)
    //     "version": v,              (numeric) The peer version, such as 7001
    //     "subver": "/Satoshi:0.8.5/",  (string) The string version
    //     "inbound": true|false,     (boolean) Inbound (true) or Outbound (false)
    //     "addnode": true|false,     (boolean) Whether connection was due to addnode and is using an addnode slot
    //     "startingheight": n,       (numeric) The starting height (block) of the peer
    //     "banscore": n,             (numeric) The ban score
    //     "synced_headers": n,       (numeric) The last header we have in common with this peer
    //     "synced_blocks": n,        (numeric) The last block we have in common with this peer
    //     "inflight": [
    //        n,                        (numeric) The heights of blocks we're currently asking from this peer
    //        ...
    //     ],
    //     "whitelisted": true|false, (boolean) Whether the peer is whitelisted
    //     "bytessent_per_msg": {
    //        "addr": n,              (numeric) The total bytes sent aggregated by message type
    //        ...
    //     },
    //     "bytesrecv_per_msg": {
    //        "addr": n,              (numeric) The total bytes received aggregated by message type
    //        ...
    //     }
    //   }
    //   ,...
    // ]

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getpeerinfo",
        method: "getpeerinfo",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getrawchangeaddress() {
    // Returns a new Bitcoin address, for receiving change.
    // This is for use with raw transactions, NOT normal use.
    //
    // Result:
    // "address"    (string) The address

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getrawchangeaddress",
        method: "getrawchangeaddress",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getrawtransaction(txid, verbose) {
    // NOTE: By default this function only works for mempool transactions. If the -txindex option is
    // enabled, it also works for blockchain transactions.
    // DEPRECATED: for now, it also works for transactions with unspent outputs.
    //
    // Return the raw transaction data.
    //
    // If verbose is 'true', returns an Object with information about 'txid'.
    // If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.
    //
    // Arguments:
    // 1. "txid"      (string, required) The transaction id
    // 2. verbose       (bool, optional, default=false) If false, return a string, otherwise return a json object
    //
    // Result (if verbose is not set or set to false):
    // "data"      (string) The serialized, hex-encoded data for 'txid'

    let params;
    if(!verbose) {
      params = [
        txid
      ];
    } else {
      params = [
        txid,
        verbose
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getrawtransaction",
        method: "getrawtransaction",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getreceivedbyaccount(account, minconf) {
    // DEPRECATED. Returns the total amount received by addresses with <account> in transactions with at least [minconf] confirmations.
    //
    // Arguments:
    // 1. "account"      (string, required) The selected account, may be the default account using "".
    // 2. minconf          (numeric, optional, default=1) Only include transactions confirmed at least this many times.
    //
    // Result:
    // amount              (numeric) The total amount in BCH received for this account.

    if(!account) {
      account = "";
    }

    let params;
    if(!minconf) {
      params = [
        account
      ];
    } else {
      params = [
        account,
        minconf
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getreceivedbyaccount",
        method: "getreceivedbyaccount",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getreceivedbyaddress(address, minconf) {
    // Returns the total amount received by the given address in transactions with at least minconf confirmations.
    //
    // Arguments:
    // 1. "address"         (string, required) The bitcoin address for transactions.
    // 2. minconf             (numeric, optional, default=1) Only include transactions confirmed at least this many times.
    //
    // Result:
    // amount   (numeric) The total amount in BCH received at this address.
    //

    let params;
    if(!minconf) {
      params = [
        address
      ];
    } else {
      params = [
        address,
        minconf
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getreceivedbyaddress",
        method: "getreceivedbyaddress",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  gettransaction(txid, include_watchonly) {
    // Get detailed information about in-wallet transaction <txid>
    //
    // Arguments:
    // 1. "txid"                  (string, required) The transaction id
    // 2. "include_watchonly"     (bool, optional, default=false) Whether to include watch-only addresses in balance calculation and details[]
    //
    // Result:
    // {
    //   "amount" : x.xxx,        (numeric) The transaction amount in BCH
    //   "fee": x.xxx,            (numeric) The amount of the fee in BCH. This is negative and only available for the
    //                               'send' category of transactions.
    //   "confirmations" : n,     (numeric) The number of confirmations
    //   "blockhash" : "hash",  (string) The block hash
    //   "blockindex" : xx,       (numeric) The index of the transaction in the block that includes it
    //   "blocktime" : ttt,       (numeric) The time in seconds since epoch (1 Jan 1970 GMT)
    //   "txid" : "transactionid",   (string) The transaction id.
    //   "time" : ttt,            (numeric) The transaction time in seconds since epoch (1 Jan 1970 GMT)
    //   "timereceived" : ttt,    (numeric) The time received in seconds since epoch (1 Jan 1970 GMT)
    //   "bip125-replaceable": "yes|no|unknown",  (string) Whether this transaction could be replaced due to BIP125 (replace-by-fee);
    //                                                    may be unknown for unconfirmed transactions not in the mempool
    //   "details" : [
    //     {
    //       "account" : "accountname",      (string) DEPRECATED. The account name involved in the transaction, can be "" for the default account.
    //       "address" : "address",          (string) The bitcoin address involved in the transaction
    //       "category" : "send|receive",    (string) The category, either 'send' or 'receive'
    //       "amount" : x.xxx,                 (numeric) The amount in BCH
    //       "label" : "label",              (string) A comment for the address/transaction, if any
    //       "vout" : n,                       (numeric) the vout value
    //       "fee": x.xxx,                     (numeric) The amount of the fee in BCH. This is negative and only available for the
    //                                            'send' category of transactions.
    //       "abandoned": xxx                  (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the
    //                                            'send' category of transactions.
    //     }
    //     ,...
    //   ],
    //   "hex" : "data"         (string) Raw data for transaction
    // }
    //
    let params;
    if(!include_watchonly) {
      params = [
        txid
      ];
    } else {
      params = [
        txid,
        include_watchonly
      ];
    }
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"gettransaction",
        method: "gettransaction",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getunconfirmedbalance() {
    // Returns the server's total unconfirmed balance

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getunconfirmedbalance",
        method: "getunconfirmedbalance",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  getwalletinfo() {
    // Returns an object containing various wallet state info.
    //
    // Result:
    // {
    //   "walletversion": xxxxx,       (numeric) the wallet version
    //   "balance": xxxxxxx,           (numeric) the total confirmed balance of the wallet in BCH
    //   "unconfirmed_balance": xxx,   (numeric) the total unconfirmed balance of the wallet in BCH
    //   "immature_balance": xxxxxx,   (numeric) the total immature balance of the wallet in BCH
    //   "txcount": xxxxxxx,           (numeric) the total number of transactions in the wallet
    //   "keypoololdest": xxxxxx,      (numeric) the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
    //   "keypoolsize": xxxx,          (numeric) how many new keys are pre-generated
    //   "unlocked_until": ttt,        (numeric) the timestamp in seconds since epoch (midnight Jan 1 1970 GMT) that the wallet is unlocked for transfers, or 0 if the wallet is locked
    //   "paytxfee": x.xxxx,           (numeric) the transaction fee configuration, set in BCH/kB
    //   "hdmasterkeyid": "<hash160>" (string) the Hash160 of the HD master pubkey
    // }
    //
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"getwalletinfo",
        method: "getwalletinfo",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  importaddress(script, label, rescan, p2sh) {
    // Adds a script (in hex) or address that can be watched as if it were in your wallet but cannot be used to spend.
    //
    // Arguments:
    // 1. "script"           (string, required) The hex-encoded script (or address)
    // 2. "label"            (string, optional, default="") An optional label
    // 3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions
    // 4. p2sh                 (boolean, optional, default=false) Add the P2SH version of the script as well
    //
    // Note: This call can take minutes to complete if rescan is true.
    // If you have the full public key, you should call importpubkey instead of this.
    //
    // Note: If you import a non-standard raw script in hex form, outputs sending to it will be treated
    // as change, and not show up in many RPCs.

    if(!script) {
      script = "";
    }

    let params = [
      script
    ];

    if(label) {
      params.push(label);
    } else {
      params.push("");
    }

    if(rescan) {
      params.push(rescan);
    } else {
      params.push(true);
    }

    if(p2sh) {
      params.push(p2sh);
    } else {
      params.push(false);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"importaddress",
        method: "importaddress",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  importmulti(requests, options) {
    // Import addresses/scripts (with private or public keys, redeem script (P2SH)), rescanning all addresses in one-shot-only (rescan can be disabled via options).
    //
    // Arguments:
    // 1. requests     (array, required) Data to be imported
    //   [     (array of json objects)
    //     {
    //       "scriptPubKey": "<script>" | { "address":"<address>" }, (string / json, required) Type of scriptPubKey (string for script, json for address)
    //       "timestamp": timestamp | "now"                        , (integer / string, required) Creation time of the key in seconds since epoch (Jan 1 1970 GMT),
    //                                                               or the string "now" to substitute the current synced blockchain time. The timestamp of the oldest
    //                                                               key will determine how far back blockchain rescans need to begin for missing wallet transactions.
    //                                                               "now" can be specified to bypass scanning, for keys which are known to never have been used, and
    //                                                               0 can be specified to scan the entire blockchain. Blocks up to 2 hours before the earliest key
    //                                                               creation time of all keys being imported by the importmulti call will be scanned.
    //       "redeemscript": "<script>"                            , (string, optional) Allowed only if the scriptPubKey is a P2SH address or a P2SH scriptPubKey
    //       "pubkeys": ["<pubKey>", ... ]                         , (array, optional) Array of strings giving pubkeys that must occur in the output or redeemscript
    //       "keys": ["<key>", ... ]                               , (array, optional) Array of strings giving private keys whose corresponding public keys must occur in the output or redeemscript
    //       "internal": <true>                                    , (boolean, optional, default: false) Stating whether matching outputs should be be treated as not incoming payments
    //       "watchonly": <true>                                   , (boolean, optional, default: false) Stating whether matching outputs should be considered watched even when they're not spendable, only allowed if keys are empty
    //       "label": <label>                                      , (string, optional, default: '') Label to assign to the address (aka account name, for now), only allowed with internal=false
    //     }
    //   ,...
    //   ]
    // 2. options                 (json, optional)
    //   {
    //      "rescan": <false>,         (boolean, optional, default: true) Stating if should rescan the blockchain after all imports
    //   }
    //
    if(!requests) {
      requests = [{}];
    }

    let params;
    if(!options) {
      params = [
        requests
      ];
    } else {
      params = [
        requests,
        options
      ];
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"importmulti",
        method: "importmulti",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  importprivkey(bitcoinprivkey, label, rescan) {
    // Adds a private key (as returned by dumpprivkey) to your wallet.
    //
    // Arguments:
    // 1. "bitcoinprivkey"   (string, required) The private key (see dumpprivkey)
    // 2. "label"            (string, optional, default="") An optional label
    // 3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions
    //
    // Note: This call can take minutes to complete if rescan is true.

    let params = [];

    if(bitcoinprivkey) {
      params.push(bitcoinprivkey);
    }

    if(label) {
      params.push(label);
    }

    if(rescan) {
      params.push(rescan);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"importprivkey",
        method: "importprivkey",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  importprunedfunds(rawtransaction, txoutproof) {
    // Imports funds without rescan. Corresponding address or script must previously be included in wallet. Aimed towards pruned wallets. The end-user is responsible to import additional transactions that subsequently spend the imported outputs or rescan after the point in the blockchain the transaction is included.
    //
    // Arguments:
    // 1. "rawtransaction" (string, required) A raw transaction in hex funding an already-existing address in wallet
    // 2. "txoutproof"     (string, required) The hex output from gettxoutproof that contains the transaction

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"importprunedfunds",
        method: "importprunedfunds",
        params: [
          rawtransaction,
          txoutproof
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  importwallet(filename) {
    // Imports keys from a wallet dump file (see dumpwallet).
    //
    // Arguments:
    // 1. "filename"    (string, required) The wallet file
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"importwallet",
        method: "importwallet",
        params: [
          filename
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  keypoolrefill(newsize) {

  // Fills the keypool.
  //
  // Arguments
  // 1. newsize     (numeric, optional, default=100) The new keypool size
    let params = [];
    if(newsize) {
      params.push(newsize);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"keypoolrefill",
        method: "keypoolrefill",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listaccounts(minconf, include_watchonly) {
    // DEPRECATED. Returns Object that has account names as keys, account balances as values.
    //
    // Arguments:
    // 1. minconf             (numeric, optional, default=1) Only include transactions with at least this many confirmations
    // 2. include_watchonly   (bool, optional, default=false) Include balances in watch-only addresses (see 'importaddress')
    //
    // Result:
    // {                      (json object where keys are account names, and values are numeric balances
    //   "account": x.xxx,  (numeric) The property name is the account name, and the value is the total balance for the account.
    //   ...

    if(minconf) {
      params.push(minconf);
    } else {
      params.push(1);
    }

    if(include_watchonly) {
      params.push(include_watchonly);
    } else {
      params.push(false);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listaccounts",
        method: "listaccounts",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listaddressgroupings() {
    // Lists groups of addresses which have had their common ownership
    // made public by common use as inputs or as the resulting change
    // in past transactions
    //
    // Result:
    // [
    //   [
    //     [
    //       "address",            (string) The bitcoin address
    //       amount,                 (numeric) The amount in BCH
    //       "account"             (string, optional) DEPRECATED. The account
    //     ]
    //     ,...
    //   ]
    //   ,...
    // ]

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listaddressgroupings",
        method: "listaddressgroupings",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listbanned() {
    // List all banned IPs/Subnets.
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listbanned",
        method: "listbanned",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listlockunspent() {
    // Returns list of temporarily unspendable outputs.
    // See the lockunspent call to lock and unlock transactions for spending.
    //
    // Result:
    // [
    //   {
    //     "txid" : "transactionid",     (string) The transaction id locked
    //     "vout" : n                      (numeric) The vout value
    //   }
    //   ,...

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listlockunspent",
        method: "listlockunspent",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listreceivedbyaccount(minconf, include_empty, include_watchonly) {
    // DEPRECATED. List balances by account.
    //
    // Arguments:
    // 1. minconf           (numeric, optional, default=1) The minimum number of confirmations before payments are included.
    // 2. include_empty     (bool, optional, default=false) Whether to include accounts that haven't received any payments.
    // 3. include_watchonly (bool, optional, default=false) Whether to include watch-only addresses (see 'importaddress').
    //
    // Result:
    // [
    //   {
    //     "involvesWatchonly" : true,   (bool) Only returned if imported addresses were involved in transaction
    //     "account" : "accountname",  (string) The account name of the receiving account
    //     "amount" : x.xxx,             (numeric) The total amount received by addresses with this account
    //     "confirmations" : n,          (numeric) The number of confirmations of the most recent transaction included
    //     "label" : "label"           (string) A comment for the address/transaction, if any
    //   }
    //   ,...
    // ]

    let params = [];
    if(minconf) {
      params.push(minconf);
    } else {
      params.push(1);
    }

    if(include_empty) {
      params.push(include_empty);
    } else {
      params.push(false);
    }

    if(include_watchonly) {
      params.push(include_watchonly);
    } else {
      params.push(false);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listreceivedbyaccount",
        method: "listreceivedbyaccount",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listreceivedbyaddress(minconf, include_empty, include_watchonly) {
    // List balances by receiving address.
    //
    // Arguments:
    // 1. minconf           (numeric, optional, default=1) The minimum number of confirmations before payments are included.
    // 2. include_empty     (bool, optional, default=false) Whether to include addresses that haven't received any payments.
    // 3. include_watchonly (bool, optional, default=false) Whether to include watch-only addresses (see 'importaddress').
    //
    // Result:
    // [
    //   {
    //     "involvesWatchonly" : true,        (bool) Only returned if imported addresses were involved in transaction
    //     "address" : "receivingaddress",  (string) The receiving address
    //     "account" : "accountname",       (string) DEPRECATED. The account of the receiving address. The default account is "".
    //     "amount" : x.xxx,                  (numeric) The total amount in BCH received by the address
    //     "confirmations" : n,               (numeric) The number of confirmations of the most recent transaction included
    //     "label" : "label",               (string) A comment for the address/transaction, if any
    //     "txids": [
    //        n,                                (numeric) The ids of transactions received with the address
    //        ...
    //     ]
    //   }
    //   ,...
    // ]

    let params = [];
    if(minconf) {
      params.push(minconf);
    } else {
      params.push(1);
    }

    if(include_empty) {
      params.push(include_empty);
    } else {
      params.push(false);
    }

    if(include_watchonly) {
      params.push(include_watchonly);
    } else {
      params.push(false);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listreceivedbyaddress",
        method: "listreceivedbyaddress",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listsinceblock(blockhash, target_confirmations, include_watchonly) {
    // Get all transactions in blocks since block [blockhash], or all transactions if omitted
    //
    // Arguments:
    // 1. "blockhash"            (string, optional) The block hash to list transactions since
    // 2. target_confirmations:    (numeric, optional) The confirmations required, must be 1 or more
    // 3. include_watchonly:       (bool, optional, default=false) Include transactions to watch-only addresses (see 'importaddress')
    // Result:
    // {
    //   "transactions": [
    //     "account":"accountname",       (string) DEPRECATED. The account name associated with the transaction. Will be "" for the default account.
    //     "address":"address",    (string) The bitcoin address of the transaction. Not present for move transactions (category = move).
    //     "category":"send|receive",     (string) The transaction category. 'send' has negative amounts, 'receive' has positive amounts.
    //     "amount": x.xxx,          (numeric) The amount in BCH. This is negative for the 'send' category, and for the 'move' category for moves
    //                                           outbound. It is positive for the 'receive' category, and for the 'move' category for inbound funds.
    //     "vout" : n,               (numeric) the vout value
    //     "fee": x.xxx,             (numeric) The amount of the fee in BCH. This is negative and only available for the 'send' category of transactions.
    //     "confirmations": n,       (numeric) The number of confirmations for the transaction. Available for 'send' and 'receive' category of transactions.
    //                                           When it's < 0, it means the transaction conflicted that many blocks ago.
    //     "blockhash": "hashvalue",     (string) The block hash containing the transaction. Available for 'send' and 'receive' category of transactions.
    //     "blockindex": n,          (numeric) The index of the transaction in the block that includes it. Available for 'send' and 'receive' category of transactions.
    //     "blocktime": xxx,         (numeric) The block time in seconds since epoch (1 Jan 1970 GMT).
    //     "txid": "transactionid",  (string) The transaction id. Available for 'send' and 'receive' category of transactions.
    //     "time": xxx,              (numeric) The transaction time in seconds since epoch (Jan 1 1970 GMT).
    //     "timereceived": xxx,      (numeric) The time received in seconds since epoch (Jan 1 1970 GMT). Available for 'send' and 'receive' category of transactions.
    //     "abandoned": xxx,         (bool) 'true' if the transaction has been abandoned (inputs are respendable). Only available for the 'send' category of transactions.
    //     "comment": "...",       (string) If a comment is associated with the transaction.
    //     "label" : "label"       (string) A comment for the address/transaction, if any
    //     "to": "...",            (string) If a comment to is associated with the transaction.
    //   ],
    //   "lastblock": "lastblockhash"     (string) The hash of the last block
    // }
    //

    let params = [];
    if(blockhash) {
      params.push(blockhash);
    }

    if(target_confirmations) {
      params.push(target_confirmations);
    }

    if(include_watchonly) {
      params.push(include_watchonly);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listsinceblock",
        method: "listsinceblock",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listtransactions(account, count, skip, include_watchonly) {
    // Returns up to 'count' most recent transactions skipping the first 'from' transactions for account 'account'.
    //
    // Arguments:
    // 1. "account"    (string, optional) DEPRECATED. The account name. Should be "*".
    // 2. count          (numeric, optional, default=10) The number of transactions to return
    // 3. skip           (numeric, optional, default=0) The number of transactions to skip
    // 4. include_watchonly (bool, optional, default=false) Include transactions to watch-only addresses (see 'importaddress')

    let params = [];
    if(account) {
      params.push(account);
    } else {
      params.push('*');
    }

    if(count) {
      params.push(count);
    } else {
      params.push(10);
    }

    if(skip) {
      params.push(skip);
    } else {
      params.push(0);
    }

    if(include_watchonly) {
      params.push(include_watchonly);
    } else {
      params.push(false);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listtransactions",
        method: "listtransactions",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  listunspent(minconf, maxconf, addresses, include_unsafe) {
    // Returns array of unspent transaction outputs with between minconf and maxconf (inclusive) confirmations.
    // Optionally filter to only include txouts paid to specified addresses.
    //
    // Arguments:
    // 1. minconf          (numeric, optional, default=1) The minimum confirmations to filter
    // 2. maxconf          (numeric, optional, default=9999999) The maximum confirmations to filter
    // 3. "addresses"    (string) A json array of bitcoin addresses to filter
    //     [
    //       "address"   (string) bitcoin address
    //       ,...
    //     ]
    // 4. include_unsafe (bool, optional, default=true) Include outputs that are not safe to spend
    //                   because they come from unconfirmed untrusted transactions or unconfirmed
    //                   replacement transactions (cases where we are less sure that a conflicting
    //                   transaction won't be mined).
    //
    // Result
    // [                   (array of json object)
    //   {
    //     "txid" : "txid",          (string) the transaction id
    //     "vout" : n,               (numeric) the vout value
    //     "address" : "address",    (string) the bitcoin address
    //     "account" : "account",    (string) DEPRECATED. The associated account, or "" for the default account
    //     "scriptPubKey" : "key",   (string) the script key
    //     "amount" : x.xxx,         (numeric) the transaction output amount in BCH
    //     "confirmations" : n,      (numeric) The number of confirmations
    //     "redeemScript" : n        (string) The redeemScript if scriptPubKey is P2SH
    //     "spendable" : xxx,        (bool) Whether we have the private keys to spend this output
    //     "solvable" : xxx          (bool) Whether we know how to spend this output, ignoring the lack of keys
    //   }
    //   ,...
    // ]

    let params = [];
    if(minconf) {
      params.push(minconf);
    } else {
      params.push(1);
    }

    if(maxconf) {
      params.push(maxconf);
    } else {
      params.push(9999999);
    }

    if(addresses) {
      params.push(addresses);
    }

    if(include_unsafe) {
      params.push(include_unsafe);
    } else {
      params.push(true);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"listunspent",
        method: "listunspent",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  lockunspent(unlock, transactions) {
    // Updates list of temporarily unspendable outputs.
    // Temporarily lock (unlock=false) or unlock (unlock=true) specified transaction outputs.
    // If no transaction outputs are specified when unlocking then all current locked transaction outputs are unlocked.
    // A locked transaction output will not be chosen by automatic coin selection, when spending bitcoins.
    // Locks are stored in memory only. Nodes start with zero locked outputs, and the locked output list
    // is always cleared (by virtue of process exit) when a node stops or fails.
    // Also see the listunspent call
    //
    // Arguments:
    // 1. unlock            (boolean, required) Whether to unlock (true) or lock (false) the specified transactions
    // 2. "transactions"  (string, optional) A json array of objects. Each object the txid (string) vout (numeric)
    //      [           (json array of json objects)
    //        {
    //          "txid":"id",    (string) The transaction id
    //          "vout": n         (numeric) The output number
    //        }
    //        ,...
    //      ]
    //
    // Result:
    // true|false    (boolean) Whether the command was successful or not

    let params = [];
    if(unlock) {
      params.push(unlock);
    } else {
      params.push(false);
    }

    if(transactions) {
      params.push(transactions);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"lockunspent",
        method: "lockunspent",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  move(fromaccount, toaccount, amount, dummy, comment) {
    // DEPRECATED. Move a specified amount from one account in your wallet to another.
    //
    // Arguments:
    // 1. "fromaccount"   (string, required) The name of the account to move funds from. May be the default account using "".
    // 2. "toaccount"     (string, required) The name of the account to move funds to. May be the default account using "".
    // 3. amount            (numeric) Quantity of BCH to move between accounts.
    // 4. (dummy)           (numeric, optional) Ignored. Remains for backward compatibility.
    // 5. "comment"       (string, optional) An optional comment, stored in the wallet only.
    //
    // Result:
    // true|false           (boolean) true if successful.

    let params = [];
    if(fromaccount) {
      params.push(fromaccount);
    }

    if(toaccount) {
      params.push(toaccount);
    }

    if(amount) {
      params.push(amount);
    }

    if(dummy) {
      params.push(dummy);
    }

    if(comment) {
      params.push(comment);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"move",
        method: "move",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  ping() {
    // Requests that a ping be sent to all other nodes, to measure ping time.
    // Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
    // Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping.

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"ping",
        method: "ping",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  prioritisetransaction(txid, priority_delta, fee_delta) {
    // Accepts the transaction into mined blocks at a higher (or lower) priority
    //
    // Arguments:
    // 1. "txid"       (string, required) The transaction id.
    // 2. priority_delta (numeric, required) The priority to add or subtract.
    //                   The transaction selection algorithm considers the tx as it would have a higher priority.
    //                   (priority of a transaction is calculated: coinage * value_in_satoshis / txsize)
    // 3. fee_delta      (numeric, required) The fee value (in satoshis) to add (or subtract, if negative).
    //                   The fee is not actually paid, only the algorithm for selecting transactions into a block
    //                   considers the transaction as it would have paid a higher (or lower) fee.
    //
    // Result:
    // true              (boolean) Returns true

    let params = [];
    if(txid) {
      params.push(txid);
    }

    if(priority_delta) {
      params.push(priority_delta);
    }

    if(fee_delta) {
      params.push(fee_delta);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"prioritisetransaction",
        method: "prioritisetransaction",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  removeprunedfunds(txid) {
    // Deletes the specified transaction from the wallet. Meant for use with pruned wallets and as a companion to importprunedfunds. This will effect wallet balances.
    //
    // Arguments:
    // 1. "txid"           (string, required) The hex-encoded id of the transaction you are deleting
    //
    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"removeprunedfunds",
        method: "removeprunedfunds",
        params: [
          txid
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  sendfrom(fromaccount, toaddress, amount, minconf, comment, comment_to ) {
    // DEPRECATED (use sendtoaddress). Sent an amount from an account to a bitcoin address.
    //
    // Arguments:
    // 1. "fromaccount"       (string, required) The name of the account to send funds from. May be the default account using "".
    //                        Specifying an account does not influence coin selection, but it does associate the newly created
    //                        transaction with the account, so the account's balance computation and transaction history can reflect
    //                        the spend.
    // 2. "toaddress"         (string, required) The bitcoin address to send funds to.
    // 3. amount                (numeric or string, required) The amount in BCH (transaction fee is added on top).
    // 4. minconf               (numeric, optional, default=1) Only use funds with at least this many confirmations.
    // 5. "comment"           (string, optional) A comment used to store what the transaction is for.
    //                                      This is not part of the transaction, just kept in your wallet.
    // 6. "comment_to"        (string, optional) An optional comment to store the name of the person or organization
    //                                      to which you're sending the transaction. This is not part of the transaction,
    //                                      it is just kept in your wallet.
    //
    // Result:
    // "txid"                 (string) The transaction id.
    let params = [];
    if(fromaccount) {
      params.push(fromaccount);
    }

    if(toaddress) {
      params.push(toaddress);
    }

    if(amount) {
      params.push(amount);
    }

    if(minconf) {
      params.push(minconf);
    }

    if(comment) {
      params.push(comment);
    }

    if(comment_to) {
      params.push(comment_to);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"sendfrom",
        method: "sendfrom",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  sendmany(fromaccount, amounts, minconf, comment, subtractfeefrom) {
    // Send multiple times. Amounts are double-precision floating point numbers.
    //
    // Arguments:
    // 1. "fromaccount"         (string, required) DEPRECATED. The account to send the funds from. Should be "" for the default account
    // 2. "amounts"             (string, required) A json object with addresses and amounts
    //     {
    //       "address":amount   (numeric or string) The bitcoin address is the key, the numeric amount (can be string) in BCH is the value
    //       ,...
    //     }
    // 3. minconf                 (numeric, optional, default=1) Only use the balance confirmed at least this many times.
    // 4. "comment"             (string, optional) A comment
    // 5. subtractfeefrom         (array, optional) A json array with addresses.
    //                            The fee will be equally deducted from the amount of each selected address.
    //                            Those recipients will receive less bitcoins than you enter in their corresponding amount field.
    //                            If no addresses are specified here, the sender pays the fee.
    //     [
    //       "address"          (string) Subtract fee from this address
    //       ,...
    //     ]
    //
    // Result:
    // "txid"                   (string) The transaction id for the send. Only 1 transaction is created regardless of
    //                                     the number of addresses.
    let params = [];
    if(fromaccount || fromaccount === "") {
      params.push(fromaccount);
    }

    if(amounts) {
      params.push(amounts);
    }

    if(minconf) {
      params.push(minconf);
    }

    if(comment) {
      params.push(comment);
    }

    if(subtractfeefrom) {
      params.push(subtractfeefrom);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"sendmany",
        method: "sendmany",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  sendrawtransaction(hexstring, allowhighfees) {
    // Submits raw transaction (serialized, hex-encoded) to local node and network.
    //
    // Also see createrawtransaction and signrawtransaction calls.
    //
    // Arguments:
    // 1. "hexstring"    (string, required) The hex string of the raw transaction)
    // 2. allowhighfees    (boolean, optional, default=false) Allow high fees
    //
    // Result:
    // "hex"             (string) The transaction hash in hex
    //

    let params = [];
    if(hexstring) {
      params.push(hexstring);
    }

    if(allowhighfees) {
      params.push(allowhighfees);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"sendrawtransaction",
        method: "sendrawtransaction",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  sendtoaddress(address, amount, comment, comment_to, subtractfeefromamount) {
    // Send an amount to a given address.
    //
    // Arguments:
    // 1. "address"            (string, required) The bitcoin address to send to.
    // 2. "amount"             (numeric or string, required) The amount in BCH to send. eg 0.1
    // 3. "comment"            (string, optional) A comment used to store what the transaction is for.
    //                              This is not part of the transaction, just kept in your wallet.
    // 4. "comment_to"         (string, optional) A comment to store the name of the person or organization
    //                              to which you're sending the transaction. This is not part of the
    //                              transaction, just kept in your wallet.
    // 5. subtractfeefromamount  (boolean, optional, default=false) The fee will be deducted from the amount being sent.
    //                              The recipient will receive less bitcoins than you enter in the amount field.
    //
    // Result:
    // "txid"                  (string) The transaction id.
    let params = [];
    if(address) {
      params.push(address);
    }

    if(amount) {
      params.push(amount);
    }

    if(comment) {
      params.push(comment);
    }

    if(comment_to) {
      params.push(comment_to);
    }

    if(subtractfeefromamount) {
      params.push(subtractfeefromamount);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"sendtoaddress",
        method: "sendtoaddress",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  setaccount(address, account) {
    // DEPRECATED. Sets the account associated with the given address.
    //
    // Arguments:
    // 1. "address"         (string, required) The bitcoin address to be associated with an account.
    // 2. "account"         (string, required) The account to assign the address to.
    let params = [];
    if(address) {
      params.push(address);
    }

    if(account) {
      params.push(account);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"setaccount",
        method: "setaccount",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  setban(subnet, command, bantime, absolute) {
    // Attempts add or remove a IP/Subnet from the banned list.
    //
    // Arguments:
    // 1. "subnet"       (string, required) The IP/Subnet (see getpeerinfo for nodes ip) with a optional netmask (default is /32 = single ip)
    // 2. "command"      (string, required) 'add' to add a IP/Subnet to the list, 'remove' to remove a IP/Subnet from the list
    // 3. "bantime"      (numeric, optional) time in seconds how long (or until when if [absolute] is set) the ip is banned (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
    // 4. "absolute"     (boolean, optional) If set, the bantime must be a absolute timestamp in seconds since epoch (Jan 1 1970 GMT)
    let params = [];
    if(subnet) {
      params.push(subnet);
    }

    if(command) {
      params.push(command);
    }

    if(bantime) {
      params.push(bantime);
    }

    if(absolute) {
      params.push(absolute);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"setban",
        method: "setban",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  setnetworkactive(state) {
    // Disable/enable all p2p network activity.
    //
    // Arguments:
    // 1. "state"        (boolean, required) true to enable networking, false to disable

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"setnetworkactive",
        method: "setnetworkactive",
        params: [
          state
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  settxfee(amount) {
    // Set the transaction fee per kB. Overwrites the paytxfee parameter.
    //
    // Arguments:
    // 1. amount         (numeric or string, required) The transaction fee in BCH/kB
    //
    // Result
    // true|false        (boolean) Returns true if successful

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"settxfee",
        method: "settxfee",
        params: [
          amount
        ]
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  signmessage(address, message) {

    // Sign a message with the private key of an address

    // Arguments:
    // 1. "address"         (string, required) The bitcoin address to use for the private key.
    // 2. "message"         (string, required) The message to create a signature of.

    // Result:
    // "signature"          (string) The signature of the message encoded in base 64

    let params = [];
    if(address) {
      params.push(address);
    }

    if(message) {
      params.push(message);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"signmessage",
        method: "signmessage",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  signrawtransaction(hexstring, prevtxs, privkeys, sighashtype) {
  // Sign inputs for raw transaction (serialized, hex-encoded).
  // The second optional argument (may be null) is an array of previous transaction outputs that
  // this transaction depends on but may not yet be in the block chain.
  // The third optional argument (may be null) is an array of base58-encoded private
  // keys that, if given, will be the only keys used to sign the transaction.
  //
  //
  // Arguments:
  // 1. "hexstring"     (string, required) The transaction hex string
  // 2. "prevtxs"       (string, optional) An json array of previous dependent transaction outputs
  //      [               (json array of json objects, or 'null' if none provided)
  //        {
  //          "txid":"id",             (string, required) The transaction id
  //          "vout":n,                  (numeric, required) The output number
  //          "scriptPubKey": "hex",   (string, required) script key
  //          "redeemScript": "hex",   (string, required for P2SH or P2WSH) redeem script
  //          "amount": value            (numeric, required) The amount spent
  //        }
  //        ,...
  //     ]
  // 3. "privkeys"     (string, optional) A json array of base58-encoded private keys for signing
  //     [                  (json array of strings, or 'null' if none provided)
  //       "privatekey"   (string) private key in base58-encoding
  //       ,...
  //     ]
  // 4. "sighashtype"     (string, optional, default=ALL) The signature hash type. Must be one of
  //        "ALL"
  //        "NONE"
  //        "SINGLE"
  //        "ALL|ANYONECANPAY"
  //        "NONE|ANYONECANPAY"
  //        "SINGLE|ANYONECANPAY"
  //        "ALL|FORKID"
  //        "NONE|FORKID"
  //        "SINGLE|FORKID"
  //        "ALL|FORKID|ANYONECANPAY"
  //        "NONE|FORKID|ANYONECANPAY"
  //        "SINGLE|FORKID|ANYONECANPAY"

    let params = [];
    if(hexstring) {
      params.push(hexstring);
    }

    if(prevtxs) {
      params.push(prevtxs);
    }

    if(privkeys) {
      params.push(privkeys);
    }

    if(sighashtype) {
      params.push(sighashtype);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"signrawtransaction",
        method: "signrawtransaction",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  submitblock(hexdata, parameters) {
    // Attempts to submit new block to network.
    // The 'jsonparametersobject' parameter is currently ignored.
    // See https://en.bitcoin.it/wiki/BIP_0022 for full specification.
    //
    // Arguments
    // 1. "hexdata"        (string, required) the hex-encoded block data to submit
    // 2. "parameters"     (string, optional) object of optional parameters
    //     {
    //       "workid" : "id"    (string, optional) if the server provided a workid, it MUST be included with submissions
    //     }
    //
    let params = [];
    if(hexdata) {
      params.push(hexdata);
    }

    if(parameters) {
      params.push(parameters);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"submitblock",
        method: "submitblock",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  walletlock() {
    // removes the wallet encryption key from memory, locking the wallet. After calling this method, you will need to call walletpassphrase again before being able to call any methods which require the wallet to be unlocked.
    //
    // Parameters: none
    //
    // Result—null on success

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"walletlock",
        method: "walletlock",
        params: []
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  walletpassphrase(passphrase, seconds) {
    // stores the wallet decryption key in memory for the indicated number of seconds. Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock time that overrides the old one.

    //Parameter #1—the passphrase

    // Parameter #2—the number of seconds to leave the wallet unlocked

    // Result—null on success
    let params = [];
    if(passphrase) {
      params.push(passphrase);
    }

    if(seconds) {
      params.push(seconds);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"walletpassphrase",
        method: "walletpassphrase",
        params: params
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }

  walletpassphrasechange(passphrase, newPassphrase) {
    //  changes the wallet passphrase from ‘old passphrase’ to ‘new passphrase’.
    // Parameter #1—the current passphrase

    // Parameter #2—the new passphrase

    // Result—null on success
    let params = [];
    if(passphrase) {
      params.push(passphrase);
    }

    if(newPassphrase) {
      params.push(newPassphrase);
    }

    return this.BitboxHTTP({
      method: 'post',
      auth: {
        username: this.config.username,
        password: this.config.password
      },
      data: {
        jsonrpc: "1.0",
        id:"walletpassphrasechange",
        method: "walletpassphrasechange",
        params: params
      }
    })
    .then((response) => {
    })
    .catch(error => {
      return Error(error.response.data.error.message);
    });
  }
}

export default BITBOXCli;
