#!/usr/bin/env node
let program = require('commander');
let chalk = require('chalk');
let mkdirp = require('mkdirp');
let cpFile = require('cp-file');
let figlet = require('figlet');
let clear = require('clear');
let fs = require('fs');
let touch = require("touch");
let emoji = require('node-emoji');
let repl = require("repl");
let BITBOXCli = require('./lib/bitboxcli.js');

// let request = require('superagent');
// let co = require('co');
// let prompt = require('co-prompt');
// let fs = require('fs');
// let ProgressBar = require('progress');

program
  .version('0.0.1');

program
  .command('init')
  .description('Initialize new and empty BITBOX project')
  .option('-t, --title <title>', 'Title of new project')
  .action((options) => {
    clear();
    console.log(
      chalk.blue(
        figlet.textSync('BITBOX', { horizontalLayout: 'full' })
      )
    );
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
    fs.writeFileSync( `./${title}/bitbox.js`, `module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8332
    }
  }
};`);
    console.log(chalk.blue('All done.'), emoji.get(':white_check_mark:'));
    console.log(chalk.blue('Go get em! Remember--with great power comes great responsibility.'), emoji.get(':rocket:'));

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
    var replServer = repl.start({
      prompt: `${emoji.get(':zap:')} ${" BITBOX"} ${emoji.get(':zap:')} `,
    });
    replServer.context.BITBOX = BITBOXCli;
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
//     mkdirp('./bitbox/src', (err) => {});
//     // console.log(chalk.bold.cyan('projectname: ') + program.init);
//     // console.log(chalk.bold.red('projectname: ') + program.init);
//   })

program
  .parse(process.argv);

// console.error(errorMessage);
// process.exit(1);
