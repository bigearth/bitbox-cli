#!/usr/bin/env node
/// <reference path="./lib/interfaces/vendors.d.ts"/>

require("babel-register")
import * as path from "path"
import * as program from "commander"
import chalk from "chalk";
import * as fs from "fs";
import * as repl from "repl";
import * as mkdirp from "mkdirp";
import * as figlet from "figlet";
let clear = require("clear")
import * as touch from "touch";
import * as emoji from "node-emoji";
let clone  = require("git-clone")

import { BITBOX } from "./lib/BITBOX"
// this.Address = new Address(this.restURL)
// this.BitcoinCash = new BitcoinCash(this.Address)
// this.Block = new Block(this.restURL)
// this.Blockchain = new Blockchain(this.restURL)
// this.Control = new Control(this.restURL)
// this.Crypto = Crypto
// this.ECPair = ECPair
// this.ECPair.setAddress(this.Address)
// this.Generating = new Generating(this.restURL)
// this.HDNode = new HDNode(this.Address)
// this.Mining = new Mining(this.restURL)
// this.Mnemonic = new Mnemonic(this.Address)
// this.Price = new Price()
// this.RawTransactions = new RawTransactions(this.restURL)
// this.Script = new Script()
// this.Transaction = new Transaction(this.restURL)
// this.TransactionBuilder = TransactionBuilder
// this.TransactionBuilder.setAddress(this.Address)
// this.Util = new Util(this.restURL)
// this.Socket = Socket
// this.Wallet = Wallet
// this.Schnorr = new Schnorr()

interface ConsoleOptions {
  environment: string
}

interface NewOptions extends ConsoleOptions {
  scaffold: string
  restURL: string
}

program.version("7.0.19 ", "-v, --version")

program
  .command("new <name>")
  .option(
    "-s, --scaffold <scaffold>",
    "The framework to use. Options include react, angular, vuejs, nextjs, node and websockets. (Default: react)"
  )
  .option(
    "-r, --restURL <restURL>",
    "The rest URL to use. (Default: https://trest.bitcoin.com/v2/)"
  )
  .option(
    "-e, --environment <environment>",
    "environment of running BITBOX instance. Ex: production, staging. (Default: development)"
  )
  .description(`create a new BITBOX application`)
  .action((name: string, options: NewOptions): void => {
    // confirm project doesn't already exist
    if (fs.existsSync(`./${name}`)) {
      console.log(chalk.red(`Project ${name} already exists`))
      process.exit(1)
    }

    // pass in empty config object as it's not needed for new command
    const config: {} = {}

    // get environment option. default to development if no options.environment
    const environment = fetchOption("environment=development", config, options)

    // get restURL option. default to TREST if no options.restURL
    const restURL = fetchOption(
      "restURL=https://trest.bitcoin.com/v2/",
      config,
      options
    )

    // scaffold flow
    if (options && options.scaffold) {
      let scaffold: string = options.scaffold.toLowerCase()
      let repo: string = ''
      if (scaffold === "node") {
        repo = "https://github.com/Bitcoin-com/bitbox-scaffold-node.git"
      } else if (scaffold === "angular") {
        repo = "https://github.com/Bitcoin-com/bitbox-scaffold-angular.git"
      } else if (scaffold === "next") {
        repo = "https://github.com/Bitcoin-com/bitbox-scaffold-next.git"
      } else if (scaffold === "react") {
        repo = "https://github.com/Bitcoin-com/bitbox-scaffold-react.git"
      } else if (scaffold === "vue") {
        repo = "https://github.com/Bitcoin-com/bitbox-scaffold-vue.git"
      } else if (scaffold === "websockets") {
        repo = "https://github.com/Bitcoin-com/bitbox-scaffold-websockets.git"
      } else {
        console.log(chalk.red(`Scaffold ${scaffold} not supported`))
        process.exit(1)
      }

      // TODO: Bring this back when we allow --repo flag to clone random repos
      // if (options && options.repo) {
      //   scaffold = "custom repo"
      //   repo = options.repo.toLowerCase()
      // }

      clear()
      console.log(
        chalk.blue(
          figlet.textSync("BITBOX", {
            font: "3-D",
            horizontalLayout: "full"
          })
        )
      )

      // pass in empty conf object
      const conf: {} = {}
      console.log(chalk.blue(`Scaffolding ${scaffold} app in ${name}`))
      clone(repo, `./${name}`, [conf], (res: string): any => {
        if (res === "Error: 'git clone' failed with status 128") {
          console.log(chalk.red("Must create new app in to an empty directory"))
        } else {
          console.log(chalk.green("All done."), emoji.get(":white_check_mark:"))
          console.log(
            chalk.blue(
              "Now `cd` in to your new project and run `npm install && npm start`"
            ),
            emoji.get(":rocket:")
          )
        }
      })
      return
    }

    console.log(chalk.green(`Creating ${name}/ directory`))
    console.log(chalk.green(`Creating src/ directory: ./${name}/src`))
    mkdirp(`./${name}/src`, (err: any) => {})

    console.log(chalk.green(`Creating tests/ directory: ./${name}/tests`))
    mkdirp(`./${name}/tests`, (err: any) => {})

    console.log(
      chalk.green(`Creating bitbox.js configuration file: ./${name}/bitbox.js`)
    )

    mkdirp(`./${name}`, (err: any) => {})
    touch(`./${name}/bitbox.js`)
    fs.writeFileSync(
      `./${name}/bitbox.js`,
      `exports.config = {
  environments: {
    ${environment}: {
      restURL: "${restURL}"
    }
  }
};
`
    )
    fs.appendFileSync(`./${name}/.gitignore`, ".console_history")
    console.log(chalk.blue("All done."), emoji.get(":white_check_mark:"))
    console.log(
      chalk.blue(
        "Go get em! Remember--with great power comes great responsibility."
      ),
      emoji.get(":rocket:")
    )
  })

program
  .command("console")
  .option(
    "-e, --environment <environment>",
    "environment of running BITBOX instance. Ex: production, staging. (Default: development)"
  )
  .description("Run a console with Bitcoin Cash RPC commands available")
  .action((options: ConsoleOptions): void => {
    let config: {
      environments: {

      }
    } = {
      environments: {}
    }

    try {
      config = require(`${process.cwd()}/bitbox.js`).config
    } catch (err) {
      console.log(
        chalk.red("Console command must be run inside a bitbox project")
      )
      process.exit(1)
    }
    const replServer = repl.start("> ")
    const historyFile = path.join(process.cwd(), ".console_history")
    require("repl.history")(replServer, historyFile)

    const environment = fetchOption("environment=development", config, options)

    replServer.context.bitbox = new BITBOX(config.environments[environment])
  })

function fetchOption(kv: string, config: any, options: ConsoleOptions | NewOptions): string {
  const parts: string[] = kv.split("=")
  const key: string = parts[0]
  const defaultVal: string = parts[1]
  if (options && options[key]) return options[key]
  else if (config && config.new && config.new[key]) return config.new[key]

  return defaultVal
}

program.parse(process.argv)

// print help if no command given
if (!process.argv.slice(2).length) program.outputHelp()

module.exports = {
  BITBOX: BITBOX
}
