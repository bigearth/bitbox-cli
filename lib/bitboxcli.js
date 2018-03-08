'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _BitcoinCash = require('./BitcoinCash');

var _BitcoinCash2 = _interopRequireDefault(_BitcoinCash);

var _Crypto = require('./Crypto');

var _Crypto2 = _interopRequireDefault(_Crypto);

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _Blockchain = require('./Blockchain');

var _Blockchain2 = _interopRequireDefault(_Blockchain);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

var _Generating = require('./Generating');

var _Generating2 = _interopRequireDefault(_Generating);

var _Mining = require('./Mining');

var _Mining2 = _interopRequireDefault(_Mining);

var _Network = require('./Network');

var _Network2 = _interopRequireDefault(_Network);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BITBOXCli = function () {
  function BITBOXCli(config) {
    _classCallCheck(this, BITBOXCli);

    if (!config) {
      config = {
        username: '',
        password: '',
        protocol: '',
        host: '',
        port: ''
      };
    }

    this.config = config;
    this.BitboxHTTP = _axios2.default.create({
      baseURL: config.protocol + '://' + config.host + ':' + config.port + '/'
    });
    this.BitcoinCash = _BitcoinCash2.default;
    this.Crypto = _Crypto2.default;
    this.Util = new _Util2.default(config, this.BitboxHTTP);
    this.Blockchain = new _Blockchain2.default(config, this.BitboxHTTP);
    this.Control = new _Control2.default(config, this.BitboxHTTP);
    this.Generating = new _Generating2.default(config, this.BitboxHTTP);
    this.Mining = new _Mining2.default(config, this.BitboxHTTP);
    this.Network = new _Network2.default(config, this.BitboxHTTP);
  }

  _createClass(BITBOXCli, [{
    key: 'addmultisigaddress',
    value: function addmultisigaddress(nrequired, keys, account) {
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

      var params = void 0;
      if (!account) {
        params = [nrequired, keys];
      } else {
        params = [nrequired, keys, account];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "addmultisigaddress",
          method: "addmultisigaddress",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'backupwallet',
    value: function backupwallet(destination) {
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
          id: "backupWallet",
          method: "backupWallet",
          params: [destination]
        }
      }).then(function (response) {
        var fs = require('fs');

        fs.appendFile(destination, response.data, function (error) {
          if (error) {
            return Error(error.response.data.error.message);
          } else {
            return response.data.result;
          }
        });
      }).catch(function (error) {
        return Error(error.response.data.error.message);
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
      var params = void 0;
      if (!locktime) {
        params = [inputs, outputs];
      } else {
        params = [inputs, outputs, locktime];
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "createrawtransaction",
          method: "createrawtransaction",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'decoderawtransaction',
    value: function decoderawtransaction(rawHex) {
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
          id: "decoderawtransaction",
          method: "decoderawtransaction",
          params: [rawHex]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'decodescript',
    value: function decodescript(redeemScript) {
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
          id: "decodescript",
          method: "decodescript",
          params: [redeemScript]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'dumpprivkey',
    value: function dumpprivkey(address) {
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
          id: "dumpprivkey",
          method: "dumpprivkey",
          params: [address]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'dumpwallet',
    value: function dumpwallet(filename) {
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
          id: "dumpwallet",
          method: "dumpwallet",
          params: [filename]
        }
      }).then(function (response) {
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
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'encryptwallet',
    value: function encryptwallet(passphrase) {
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
          id: "encryptwallet",
          method: "encryptwallet",
          params: [passphrase]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'estimatesmartfee',
    value: function estimatesmartfee(nblocks) {
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
          id: "estimatesmartfee",
          method: "estimatesmartfee",
          params: [nblocks]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'estimatesmartpriority',
    value: function estimatesmartpriority(nblocks) {
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
          id: "estimatesmartpriority",
          method: "estimatesmartpriority",
          params: [nblocks]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'fundrawtransaction',
    value: function fundrawtransaction(hexstring, options) {
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

      var params = void 0;
      if (!options) {
        params = [hexstring];
      } else {
        params = [hexstring, options];
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "fundrawtransaction",
          method: "fundrawtransaction",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'generatetoaddress',
    value: function generatetoaddress(blocks, address, maxtries) {

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
      var params = void 0;
      if (!maxtries) {
        params = [blocks, address];
      } else {
        params = [blocks, address, maxtries];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "generatetoaddress",
          method: "generatetoaddress",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getaccountaddress',
    value: function getaccountaddress(account) {
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
          id: "getaccountaddress",
          method: "getaccountaddress",
          params: [account]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getaccount',
    value: function getaccount(address) {
      // DEPRECATED. Returns the account associated with the given address.
      //
      // Arguments:
      // 1. "address"         (string, required) The bitcoin address for account lookup.
      //
      // Result:
      // "accountname"        (string) the account address
      var params = [];
      if (address) {
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
          id: "getaccount",
          method: "getaccount",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getaddressesbyaccount',
    value: function getaddressesbyaccount(account) {
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

      var params = void 0;
      if (!account) {
        params = [""];
      } else {
        params = [account];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getaddressesbyaccount",
          method: "getaddressesbyaccount",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getbalance',
    value: function getbalance(account, minconf, include_watchonly) {
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
      var params = [];
      if (account) {
        params.push(account);
      } else {
        params.push("*");
      }

      if (minconf) {
        params.push(minconf);
      } else {
        params.push(0);
      }

      if (include_watchonly) {
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
          id: "getbalance",
          method: "getbalance",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getnewaddress',
    value: function getnewaddress(account) {
      // Returns a new Bitcoin address for receiving payments.
      // If 'account' is specified (DEPRECATED), it is added to the address book
      // so payments received with the address will be credited to 'account'.
      //
      // Arguments:
      // 1. "account"        (string, optional) DEPRECATED. The account name for the address to be linked to. If not provided, the default account "" is used. It can also be set to the empty string "" to represent the default account. The account does not need to exist, it will be created if there is no account by the given name.
      //
      // Result:
      // "address"    (string) The new bitcoin address

      var params = [];
      if (account) {
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
          id: "getnewaddress",
          method: "getnewaddress",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getrawchangeaddress',
    value: function getrawchangeaddress() {
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
          id: "getrawchangeaddress",
          method: "getrawchangeaddress",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getrawtransaction',
    value: function getrawtransaction(txid, verbose) {
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

      var params = void 0;
      if (!verbose) {
        params = [txid];
      } else {
        params = [txid, verbose];
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getrawtransaction",
          method: "getrawtransaction",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getreceivedbyaccount',
    value: function getreceivedbyaccount(account, minconf) {
      // DEPRECATED. Returns the total amount received by addresses with <account> in transactions with at least [minconf] confirmations.
      //
      // Arguments:
      // 1. "account"      (string, required) The selected account, may be the default account using "".
      // 2. minconf          (numeric, optional, default=1) Only include transactions confirmed at least this many times.
      //
      // Result:
      // amount              (numeric) The total amount in BCH received for this account.

      if (!account) {
        account = "";
      }

      var params = void 0;
      if (!minconf) {
        params = [account];
      } else {
        params = [account, minconf];
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getreceivedbyaccount",
          method: "getreceivedbyaccount",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getreceivedbyaddress',
    value: function getreceivedbyaddress(address, minconf) {
      // Returns the total amount received by the given address in transactions with at least minconf confirmations.
      //
      // Arguments:
      // 1. "address"         (string, required) The bitcoin address for transactions.
      // 2. minconf             (numeric, optional, default=1) Only include transactions confirmed at least this many times.
      //
      // Result:
      // amount   (numeric) The total amount in BCH received at this address.
      //

      var params = void 0;
      if (!minconf) {
        params = [address];
      } else {
        params = [address, minconf];
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getreceivedbyaddress",
          method: "getreceivedbyaddress",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'gettransaction',
    value: function gettransaction(txid, include_watchonly) {
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
      var params = void 0;
      if (!include_watchonly) {
        params = [txid];
      } else {
        params = [txid, include_watchonly];
      }
      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "gettransaction",
          method: "gettransaction",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getunconfirmedbalance',
    value: function getunconfirmedbalance() {
      // Returns the server's total unconfirmed balance

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "getunconfirmedbalance",
          method: "getunconfirmedbalance",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'getwalletinfo',
    value: function getwalletinfo() {
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
          id: "getwalletinfo",
          method: "getwalletinfo",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'importaddress',
    value: function importaddress(script, label, rescan, p2sh) {
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

      if (!script) {
        script = "";
      }

      var params = [script];

      if (label) {
        params.push(label);
      } else {
        params.push("");
      }

      if (rescan) {
        params.push(rescan);
      } else {
        params.push(true);
      }

      if (p2sh) {
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
          id: "importaddress",
          method: "importaddress",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'importmulti',
    value: function importmulti(requests, options) {
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
      if (!requests) {
        requests = [{}];
      }

      var params = void 0;
      if (!options) {
        params = [requests];
      } else {
        params = [requests, options];
      }

      return this.BitboxHTTP({
        method: 'post',
        auth: {
          username: this.config.username,
          password: this.config.password
        },
        data: {
          jsonrpc: "1.0",
          id: "importmulti",
          method: "importmulti",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'importprivkey',
    value: function importprivkey(bitcoinprivkey, label, rescan) {
      // Adds a private key (as returned by dumpprivkey) to your wallet.
      //
      // Arguments:
      // 1. "bitcoinprivkey"   (string, required) The private key (see dumpprivkey)
      // 2. "label"            (string, optional, default="") An optional label
      // 3. rescan               (boolean, optional, default=true) Rescan the wallet for transactions
      //
      // Note: This call can take minutes to complete if rescan is true.

      var params = [];

      if (bitcoinprivkey) {
        params.push(bitcoinprivkey);
      }

      if (label) {
        params.push(label);
      }

      if (rescan) {
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
          id: "importprivkey",
          method: "importprivkey",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'importprunedfunds',
    value: function importprunedfunds(rawtransaction, txoutproof) {
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
          id: "importprunedfunds",
          method: "importprunedfunds",
          params: [rawtransaction, txoutproof]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'importwallet',
    value: function importwallet(filename) {
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
          id: "importwallet",
          method: "importwallet",
          params: [filename]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'keypoolrefill',
    value: function keypoolrefill(newsize) {

      // Fills the keypool.
      //
      // Arguments
      // 1. newsize     (numeric, optional, default=100) The new keypool size
      var params = [];
      if (newsize) {
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
          id: "keypoolrefill",
          method: "keypoolrefill",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'listaccounts',
    value: function listaccounts(minconf, include_watchonly) {
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

      if (minconf) {
        params.push(minconf);
      } else {
        params.push(1);
      }

      if (include_watchonly) {
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
          id: "listaccounts",
          method: "listaccounts",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'listaddressgroupings',
    value: function listaddressgroupings() {
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
          id: "listaddressgroupings",
          method: "listaddressgroupings",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'listlockunspent',
    value: function listlockunspent() {
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
          id: "listlockunspent",
          method: "listlockunspent",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'listreceivedbyaccount',
    value: function listreceivedbyaccount(minconf, include_empty, include_watchonly) {
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

      var params = [];
      if (minconf) {
        params.push(minconf);
      } else {
        params.push(1);
      }

      if (include_empty) {
        params.push(include_empty);
      } else {
        params.push(false);
      }

      if (include_watchonly) {
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
          id: "listreceivedbyaccount",
          method: "listreceivedbyaccount",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'listreceivedbyaddress',
    value: function listreceivedbyaddress(minconf, include_empty, include_watchonly) {
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

      var params = [];
      if (minconf) {
        params.push(minconf);
      } else {
        params.push(1);
      }

      if (include_empty) {
        params.push(include_empty);
      } else {
        params.push(false);
      }

      if (include_watchonly) {
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
          id: "listreceivedbyaddress",
          method: "listreceivedbyaddress",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'listsinceblock',
    value: function listsinceblock(blockhash, target_confirmations, include_watchonly) {
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

      var params = [];
      if (blockhash) {
        params.push(blockhash);
      }

      if (target_confirmations) {
        params.push(target_confirmations);
      }

      if (include_watchonly) {
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
          id: "listsinceblock",
          method: "listsinceblock",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'listtransactions',
    value: function listtransactions(account, count, skip, include_watchonly) {
      // Returns up to 'count' most recent transactions skipping the first 'from' transactions for account 'account'.
      //
      // Arguments:
      // 1. "account"    (string, optional) DEPRECATED. The account name. Should be "*".
      // 2. count          (numeric, optional, default=10) The number of transactions to return
      // 3. skip           (numeric, optional, default=0) The number of transactions to skip
      // 4. include_watchonly (bool, optional, default=false) Include transactions to watch-only addresses (see 'importaddress')

      var params = [];
      if (account) {
        params.push(account);
      } else {
        params.push('*');
      }

      if (count) {
        params.push(count);
      } else {
        params.push(10);
      }

      if (skip) {
        params.push(skip);
      } else {
        params.push(0);
      }

      if (include_watchonly) {
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
          id: "listtransactions",
          method: "listtransactions",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'listunspent',
    value: function listunspent(minconf, maxconf, addresses, include_unsafe) {
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

      var params = [];
      if (minconf) {
        params.push(minconf);
      } else {
        params.push(1);
      }

      if (maxconf) {
        params.push(maxconf);
      } else {
        params.push(9999999);
      }

      if (addresses) {
        params.push(addresses);
      }

      if (include_unsafe) {
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
          id: "listunspent",
          method: "listunspent",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'lockunspent',
    value: function lockunspent(unlock, transactions) {
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

      var params = [];
      if (unlock) {
        params.push(unlock);
      } else {
        params.push(false);
      }

      if (transactions) {
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
          id: "lockunspent",
          method: "lockunspent",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'move',
    value: function move(fromaccount, toaccount, amount, dummy, comment) {
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

      var params = [];
      if (fromaccount) {
        params.push(fromaccount);
      }

      if (toaccount) {
        params.push(toaccount);
      }

      if (amount) {
        params.push(amount);
      }

      if (dummy) {
        params.push(dummy);
      }

      if (comment) {
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
          id: "move",
          method: "move",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'removeprunedfunds',
    value: function removeprunedfunds(txid) {
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
          id: "removeprunedfunds",
          method: "removeprunedfunds",
          params: [txid]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'sendfrom',
    value: function sendfrom(fromaccount, toaddress, amount, minconf, comment, comment_to) {
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
      var params = [];
      if (fromaccount) {
        params.push(fromaccount);
      }

      if (toaddress) {
        params.push(toaddress);
      }

      if (amount) {
        params.push(amount);
      }

      if (minconf) {
        params.push(minconf);
      }

      if (comment) {
        params.push(comment);
      }

      if (comment_to) {
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
          id: "sendfrom",
          method: "sendfrom",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'sendmany',
    value: function sendmany(fromaccount, amounts, minconf, comment, subtractfeefrom) {
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
      var params = [];
      if (fromaccount || fromaccount === "") {
        params.push(fromaccount);
      }

      if (amounts) {
        params.push(amounts);
      }

      if (minconf) {
        params.push(minconf);
      }

      if (comment) {
        params.push(comment);
      }

      if (subtractfeefrom) {
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
          id: "sendmany",
          method: "sendmany",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'sendrawtransaction',
    value: function sendrawtransaction(hexstring, allowhighfees) {
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

      var params = [];
      if (hexstring) {
        params.push(hexstring);
      }

      if (allowhighfees) {
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
          id: "sendrawtransaction",
          method: "sendrawtransaction",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'sendtoaddress',
    value: function sendtoaddress(address, amount, comment, comment_to, subtractfeefromamount) {
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
      var params = [];
      if (address) {
        params.push(address);
      }

      if (amount) {
        params.push(amount);
      }

      if (comment) {
        params.push(comment);
      }

      if (comment_to) {
        params.push(comment_to);
      }

      if (subtractfeefromamount) {
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
          id: "sendtoaddress",
          method: "sendtoaddress",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'setaccount',
    value: function setaccount(address, account) {
      // DEPRECATED. Sets the account associated with the given address.
      //
      // Arguments:
      // 1. "address"         (string, required) The bitcoin address to be associated with an account.
      // 2. "account"         (string, required) The account to assign the address to.
      var params = [];
      if (address) {
        params.push(address);
      }

      if (account) {
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
          id: "setaccount",
          method: "setaccount",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'settxfee',
    value: function settxfee(amount) {
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
          id: "settxfee",
          method: "settxfee",
          params: [amount]
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'signmessage',
    value: function signmessage(address, message) {

      // Sign a message with the private key of an address

      // Arguments:
      // 1. "address"         (string, required) The bitcoin address to use for the private key.
      // 2. "message"         (string, required) The message to create a signature of.

      // Result:
      // "signature"          (string) The signature of the message encoded in base 64

      var params = [];
      if (address) {
        params.push(address);
      }

      if (message) {
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
          id: "signmessage",
          method: "signmessage",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'signrawtransaction',
    value: function signrawtransaction(hexstring, prevtxs, privkeys, sighashtype) {
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

      var params = [];
      if (hexstring) {
        params.push(hexstring);
      }

      if (prevtxs) {
        params.push(prevtxs);
      }

      if (privkeys) {
        params.push(privkeys);
      }

      if (sighashtype) {
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
          id: "signrawtransaction",
          method: "signrawtransaction",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'walletlock',
    value: function walletlock() {
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
          id: "walletlock",
          method: "walletlock",
          params: []
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'walletpassphrase',
    value: function walletpassphrase(passphrase, seconds) {
      // stores the wallet decryption key in memory for the indicated number of seconds. Issuing the walletpassphrase command while the wallet is already unlocked will set a new unlock time that overrides the old one.

      //Parameter #1—the passphrase

      // Parameter #2—the number of seconds to leave the wallet unlocked

      // Result—null on success
      var params = [];
      if (passphrase) {
        params.push(passphrase);
      }

      if (seconds) {
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
          id: "walletpassphrase",
          method: "walletpassphrase",
          params: params
        }
      }).then(function (response) {
        return response.data.result;
      }).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }, {
    key: 'walletpassphrasechange',
    value: function walletpassphrasechange(passphrase, newPassphrase) {
      //  changes the wallet passphrase from ‘old passphrase’ to ‘new passphrase’.
      // Parameter #1—the current passphrase

      // Parameter #2—the new passphrase

      // Result—null on success
      var params = [];
      if (passphrase) {
        params.push(passphrase);
      }

      if (newPassphrase) {
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
          id: "walletpassphrasechange",
          method: "walletpassphrasechange",
          params: params
        }
      }).then(function (response) {}).catch(function (error) {
        return Error(error.response.data.error.message);
      });
    }
  }]);

  return BITBOXCli;
}();

exports.default = BITBOXCli;