# `bitbox-cli`

## Command line tool for https://www.bitbox.earth

`bitbox-cli` is a Utility for creating great [Bitcoin Cash](https://www.bitcoincash.org) applications. If can be used from the command line or from within client/server apps.

More documentation available at:

* [General docs](https://www.bitbox.earth/docs)
* [BITBOX API](https://www.bitbox.earth/bitboxcli)
* [BITBLOG](https://bigearth.github.io/bitblog/)

## Command line Usage

```
Usage: bitbox [options] [command]


Options:

  -V, --version  output the version number
  -h, --help     output usage information


Commands:

  new [options]  The 'bitbox new' command creates a new BITBOX application w/ a
    directory structure and bitbox.js configuration file.

    Pass in command line arguments or optionally specify commonly used arguments in a .bitboxrc file in your home directory

  console        Run a console with Bitcoin Cash RPC commands available
  scaffold [options]  Scaffold out basic apps in major frameworks w/ BITBOX bindings
```

### `new`

Stubs out a directory structure w/ a bitbox.js file that has localhost:8332 settings to connect to your local running BITBOX.

```
Usage: new [options]

The 'bitbox new' command creates a new BITBOX application w/ a
directory structure and bitbox.js configuration file.

Pass in command line arguments or optionally specify commonly used arguments in a .bitboxrc file in your home directory


Options:

  -t, --title <title>        Title of new project
  -e, --environment <environment> environment of running BITBOX instance. Ex: production, staging. Default: development
  -r, --protocol <protocol>  protocol of running BITBOX instance. Default: http
  -o, --host <host>          host of running BITBOX instance. Default: localhost
  -p, --port <port>          port of running BITBOX instance. Default: 8332
  -u, --username <username>  Bitcoin Cash JSON RPC username
  -a, --password <passwore>  Bitcoin Cash JSON RPC password
  -h, --help                 output usage information
```

#### `.bitboxrc`

You can store common settings in a `~/.bitboxrc` in the `ini` format:

```
; bitbox config comment

[new]
protocol = http
host = localhost
port = 8332
username: h4x04
password: l337
```

### `console`

custom REPL w/ the entire BCH RPC on a `BITBOX` object. [Full list](https://www.bitbox.earth/bitboxcli) of available methods.

```
Usage: console [options]

Run a console with Bitcoin Cash RPC commands available


Options:

  -e, --environment <environment> environment of running BITBOX instance. Ex: production, staging. Default: development
  -h, --help  output usage information
```

### `scaffold`

Quickly scaffold basic applications in major frameworks so you can focus on your app.

```
Usage: scaffold [options]

Scaffold out basic apps in major frameworks w/ BITBOX bindings


Options:

  -f, --framework <framework>  The framework to use. Options include "react", "angular" and "node". Default: "react"
  -r, --repo <repo>            The github repository to use. Ex: https://github.com/bigearth/bitbox-scaffold-react.git
  -h, --help                   output usage information
```

## From within your app

```js
let BITBOXCli = require('bitbox-cli/lib/bitboxcli').default;
let BITBOX = new BITBOXCli();

BITBOX.BitcoinCash.toSatoshi(9)
// 900000000
BITBOX.BitcoinCash.toBitcoinCash(900000000)
// 9
BITBOX.BitcoinCash.isLegacyAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false
BITBOX.BitcoinCash.isMainnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true
BITBOX.BitcoinCash.isTestnetAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
//false
BITBOX.BitcoinCash.isP2PKHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// true
BITBOX.BitcoinCash.isP2SHAddress('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// false
BITBOX.BitcoinCash.detectAddressFormat('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// cashaddr
BITBOX.BitcoinCash.detectAddressNetwork('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s')
// mainnet
BITBOX.BitcoinCash.detectAddressType('bitcoincash:qqfx3wcg8ts09mt5l3zey06wenapyfqq2qrcyj5x0s');
// p2pkh

let data = 'EARTH';
BITBOX.Crypto.createHash(data, 'sha256')
// bcfee25a8baf6808fce5ff4e63cf21c8d114853ca7eacdcc3c210d73c58dab66
BITBOX.Crypto.createSHA256Hash(data)
// bcfee25a8baf6808fce5ff4e63cf21c8d114853ca7eacdcc3c210d73c58dab66
BITBOX.Crypto.createRIPEMD160Hash(data)
// ca700bba3bd37304b9bd923652245f598ece8afe
BITBOX.Crypto.randomBytes(32)
// 6e1453357f6f99d19d2a6554f35eab65b6c27f6572e31d7f2faa696cac57759b
```

[Full list](https://www.bitbox.earth/bitboxcli) of available methods.

## Credits

`bitbox-cli` leverages several really great libraries. Please show these people support.

* https://nodejs.org/api/crypto.htm
* https://github.com/bitcoinjs/bitcoinjs-lib
* https://github.com/bitcoinjs/bip39
* https://github.com/bitcoincashjs/bchaddrjs
* https://github.com/dawsbot/satoshi-bitcoin
