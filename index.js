#!/usr/bin/env node
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
let BITBOXCli = require('./lib/bitboxcli.js');

// let request = require('superagent');
// let co = require('co');
// let prompt = require('co-prompt');
// let fs = require('fs');
// let ProgressBar = require('progress');

program
  .version('0.0.10');

program
  .command('new')
  .option('-t, --title <title>', 'Title of new project')
  .option('-r, --protocol <protocol>', 'protocol of running BITBOX instance. Default: http')
  .option('-o, --host <host>', 'host of running BITBOX instance. Default: localhost')
  .option('-p, --port <port>', 'port of running BITBOX instance. Default: 8332')
  .description(`The 'bitbox new' command creates a new BITBOX application w/ a
  directory structure and bitbox.js configuration file.

  Pass in command line arguments or optionally specify commonly used arguments in a .bitboxrc file in your home directory`)
  .action((options) => {
    clear();
    console.log(
      chalk.blue(
        figlet.textSync('BITBOX', { horizontalLayout: 'full' })
      )
    );
    fs.readFile(os.homedir() + '/.bitboxrc', 'utf8', (err, contents) => {
      let config;
      if(contents) {
        config = ini.parse(contents);
      }

      let protocol;
      let host;
      let port;
      if(options.protocol) {
        protocol = options.protocol;
      } else if(config.new && config.new.protocol) {
        protocol = config.new.protocol;
      } else {
        protocol = 'http';
      }

      if(options.host) {
        host = options.host;
      } else if(config.new && config.new.host) {
        host = config.new.host;
      } else {
        host = 'localhost';
      }

      if(options.port) {
        port = options.port;
      } else if(config.new && config.new.port) {
        port = config.new.port;
      } else {
        port = 8332;
      }

      let title = options.title;
      if(!title) {
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
    development: {
      protocol: "${protocol}",
      host: "${host}",
      port: ${port}
    }
  }
};
`);
    console.log(chalk.blue('All done.'), emoji.get(':white_check_mark:'));
    console.log(chalk.blue('Go get em! Remember--with great power comes great responsibility.'), emoji.get(':rocket:'));
    });

    // console.log(chalk.green(`Creatiing test/ directory: ./${title}/tests`));
    // cpFile('./src/bitbox.js', './bitbox.js').then(() => {
    //     console.log('File copied');
    // });
  }
);

program
  .command('console')
  .description('Run a console with Bitcoin Cash RPC commands available')
  .action((options) => {
    let config = require(process.cwd() + '/bitbox.js').config;
    var replServer = repl.start({
      prompt: `${emoji.get(':zap:')} ${" BITBOX"} ${emoji.get(':zap:')} `,
    });
    replServer.context.BITBOX = new BITBOXCli(config);
  }
);
  // .option('-t, --title <title>', 'Title of new project')

// program
//   // .arguments('<command>')
//   // .command('init')
//   .command('tbox')
//   .option('-f, --fu <fu>', 'Initialize new and empty BITBOX project')
//   // .version('0.0.1', '-v, --version')
//   .action((command) => {
//     // console.log(command);
//     mkdirp('./bitbox/tests', (err) => {});
//     mkdirpjk('./bitbox/src', (err) => {});
//     // console.log(chalk.bold.cyan('projectname: ') + program.init);
//     // console.log(chalk.bold.red('projectname: ') + program.init);
//   })

program
  .parse(process.argv);

// console.error(errorMessage);
// process.exit(1);
