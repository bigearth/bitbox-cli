# `bitbox-cli`

## Command line tool for https://www.bitbox.earth

### Usage

```
Usage: bitbox [options] [command]


Options:

  -V, --version  output the version number
  -h, --help     output usage information


Commands:

  init [options]  Initialize new and empty BITBOX project
  console         Run a console with Bitcoin Cash RPC commands available
```

### `init`

Stubs out a directory structure w/ a bitbox.js file that has localhost:8332 settings to connect to your local running BITBOX.

```
Usage: init [options]

Initialize new and empty BITBOX project


Options:

  -t, --title <title>  Title of new project
  -h, --help           output usage information
```

### `console`

custom REPL w/ the entire BCH RPC on a BitcoinCash object

```
Usage: console [options]

Run a console with Bitcoin Cash RPC commands available


Options:

  -h, --help  output usage information
```
