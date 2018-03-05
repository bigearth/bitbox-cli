#!/usr/bin/env node
require("babel-register");
let program = require('commander');
let chalk = require('chalk');
let mkdirp = require('mkdirp');
let cpFile = require('cp-file');
let figlet = require('figlet');
let clear = require('clear');
let fs = require('fs');
let os = require('os');
let touch = require("touch");
let emoji = require('node-emoji');
let repl = require("repl");
let ini = require('ini');
let BITBOXCli = require('./lib/BITBOXCli').default;
let clone = require('git-clone');

// let request = require('superagent');
// let co = require('co');
// let prompt = require('co-prompt');
// let fs = require('fs');
// let ProgressBar = require('progress');

program
  .version('0.2.0');

program
  .command('new')
  .option('-t, --title <title>', 'Title of new project')
  .option('-e, --environment <environment>', 'environment of running BITBOX instance. Ex: production, staging. Default: development')
  .option('-r, --protocol <protocol>', 'protocol of running BITBOX instance. Default: http')
  .option('-o, --host <host>', 'host of running BITBOX instance. Default: localhost')
  .option('-p, --port <port>', 'port of running BITBOX instance. Default: 8332')
  .option('-u, --username <username>', 'Bitcoin Cash JSON RPC username')
  .option('-a, --password <passwore>', 'Bitcoin Cash JSON RPC password')
  .description(`The 'bitbox new' command creates a new BITBOX application w/ a
  directory structure and bitbox.js configuration file.

  Pass in command line arguments or optionally specify commonly used arguments in a .bitboxrc file in your home directory`)
  .action((options) => {
    clear();
    console.log(
      chalk.blue(
        figlet.textSync('BITBOX', {
          font: '3-D',
          horizontalLayout: 'full'
        })
      )
    );
    fs.readFile(os.homedir() + '/.bitboxrc', 'utf8', (err, contents) => {
      let config;
      if(contents) {
        // if ~/.bitboxrc exists read values from it
        config = ini.parse(contents);
      }

      let environment;
      // set environment
      if(options && options.environment) {
        // first check incoming flags
        environment = options.environment;
      } else if(config && config.new && config.new.environment) {
        // next check ~/.bitboxrc
        environment = config.new.environment;
      } else {
        // finally hardcode to development
        environment = 'development';
      }

      let protocol;
      // set protocol
      if(options && options.protocol) {
        // first check incoming flags
        protocol = options.protocol;
      } else if(config && config.new && config.new.protocol) {
        // next check ~/.bitboxrc
        protocol = config.new.protocol;
      } else {
        // finally hardcode to http
        protocol = 'http';
      }

      let host;
      if(options && options.host) {
        // first check incoming flags
        host = options.host;
      } else if(config && config.new && config.new.host) {
        // next check ~/.bitboxrc
        host = config.new.host;
      } else {
        // finally hardcode to localhost
        host = 'localhost';
      }

      let port;
      if(options && options.port) {
        // first check incoming flags
        port = options.port;
      } else if(config && config.new && config.new.port) {
        // next check ~/.bitboxrc
        port = config.new.port;
      } else {
        // finally hardcode to 8332
        port = 8332;
      }

      let username;
      if(options && options.username) {
        // first check incoming flags
        username = options.username;
      } else if(config && config.new && config.new.username) {
        // next check ~/.bitboxrc
        username = config.new.username;
      } else {
        // finally hardcode to empty string
        username = '';
      }

      let password;
      if(options && options.password) {
        // first check incoming flags
        password = options.password;
      } else if(config && config.new && config.new.password) {
        // next check ~/.bitboxrc
        password = config.new.password;
      } else {
        // finally hardcode to empty string
        password = '';
      }

      // check flags for title
      let title = options.title;
      if(!title) {
        // hardcode to BITBOX
        console.log(chalk.bold.red("You didn't provide a title! Using BITBOX instead. #SorryNotSorry"));
        title = 'BITBOX';
      }

      console.log(chalk.green(`Creating ${title}/ directory`));
      console.log(chalk.green(`Creating src/ directory: ./${title}/src`));
      mkdirp(`./${title}/tests`, (err) => {});

      console.log(chalk.green(`Creating test/ directory: ./${title}/tests`));
      mkdirp(`./${title}/src`, (err) => {});

      console.log(chalk.green(`Creating bitbox.js configuration file`));

      mkdirp(`./${title}`, (err) => {});
      touch(`./${title}/bitbox.js`);
      fs.writeFileSync( `./${title}/bitbox.js`, `exports.config = {
  networks: {
    ${environment}: {
      protocol: "${protocol}",
      host: "${host}",
      port: "${port}",
      username: "${username}",
      password: "${password}"
    }
  }
};
`);
    console.log(chalk.blue('All done.'), emoji.get(':white_check_mark:'));
    console.log(chalk.blue('Go get em! Remember--with great power comes great responsibility.'), emoji.get(':rocket:'));
    });
  }
);

program
  .command('console')
  .option('-e, --environment <environment>', 'environment of running BITBOX instance. Ex: production, staging. Default: development')
  .description('Run a console with Bitcoin Cash RPC commands available')
  .action((options) => {
    let config = require(process.cwd() + '/bitbox.js').config;
    var replServer = repl.start({
      prompt: `${emoji.get(':zap:')} ${" BITBOX"} ${emoji.get(':zap:')} `,
    });
    fs.readFile(os.homedir() + '/.bitboxrc', 'utf8', (err, contents) => {
      let conf;
      if(contents) {
        // if ~/.bitboxrc exists read values from it
        conf = ini.parse(contents);
      }

      let environment;
      // set environment
      if(options && options.environment) {
        // first check incoming flags
        environment = options.environment;
      } else if(conf && conf.new && conf.new.environment) {
        // next check ~/.bitboxrc
        environment = conf.new.environment;
      } else {
        // finally hardcode to development
        environment = 'development';
      }

      replServer.context.BITBOX = new BITBOXCli(config.networks[environment]);
    });
  }
);

program
  .command('scaffold')
  .option('-f, --framework <framework>', 'The framework to use. Options include "react", "angular" and "node". Default: "react"')
  .option('-r, --repo <repo>', 'The github repository to use. Ex: https://github.com/bigearth/bitbox-scaffold-react.git')
  .description('Scaffold out basic apps in major frameworks w/ BITBOX bindings')
  .action((options) => {
    let framework;
    if(options && options.framework) {
      framework = options.framework.toLowerCase();
    } else {
      framework = 'react';
    }

    let repo;
    let targetPath = './';
    let conf = {};
    if(framework === 'node') {
      repo = 'https://github.com/bigearth/bitbox-scaffold-node.git';
    } else if(framework === 'angular') {
      repo = 'https://github.com/bigearth/bitbox-scaffold-angular.git';
    } else {
      repo = 'https://github.com/bigearth/bitbox-scaffold-react.git';
    }

    if(options && options.repo) {
      framework = 'custom repo';
      repo = options.repo.toLowerCase();
    }

    console.log(chalk.blue(`Scaffolding ${framework} app in current directory`));
    clone(repo, targetPath, [conf], () => {
      console.log(chalk.green('All done.'), emoji.get(':white_check_mark:'));
      console.log(chalk.blue('Now confirm you have your locally running BITBOX and run `npm install && npm start`'), emoji.get(':rocket:'));
    })
  }
);

program
  .parse(process.argv);
