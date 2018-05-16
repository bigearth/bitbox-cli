#!/usr/bin/env node
require("babel-register");
let path = require('path');
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
let BITBOXCli = require('./lib/bitboxcli').default;
let clone = require('git-clone');
let corsproxy = require('corsproxy');
let cmd = require('node-cmd');

// let request = require('superagent');
// let co = require('co');
// let prompt = require('co-prompt');
// let fs = require('fs');
// let ProgressBar = require('progress');

program
  .version('0.7.27');

program
  .command('new <name>')
  .option('-s, --scaffold <scaffold>', 'The framework to use. Options include react, angular, vuejs, nextjs and node.')
  .option('-r, --scaffold-repo <repo>', 'The github repository to use. Ex: https://github.com/bigearth/bitbox-scaffold-react.git')
  .option('-e, --environment <environment>', 'environment of running BITBOX instance. Ex: production, staging. (Default: development)')
  .option('-r, --protocol <protocol>', 'protocol of running BITBOX instance. (Default: http)')
  .option('-o, --host <host>', 'host of running BITBOX instance. (Default: localhost)')
  .option('-p, --port <port>', 'port of running BITBOX instance. (Default: 8332)')
  .option('-u, --username <username>', 'Bitcoin Cash JSON RPC username')
  .option('-a, --password <password>', 'Bitcoin Cash JSON RPC password')
  .option('-c, --corsproxy', 'Enable proxy POST requests to bitbox proxy (default: disabled)')
  .description(`create a new BITBOX application`)
  .action((name, options) => {
    if(fs.existsSync(`./${name}`)) {
      console.log(chalk.red(`Project ${name} already exists`));
      process.exit(1);
    }

    fs.readFile(os.homedir() + '/.bitboxrc', 'utf8', (err, contents) => {
      let config;
      if(contents) {
        config = ini.parse(contents);
      }

      let environment = fetchOption('environment=development', config, options);
      let protocol    = fetchOption('protocol=http', config, options);
      let host        = fetchOption('host=localhost', config, options);
      let port        = fetchOption('port=8332', config, options);
      let username    = fetchOption('username=', config, options);
      let password    = fetchOption('password=', config, options);
      let corsproxy   = fetchOption('corsproxy=false', config, options);

      if(options && options.scaffold) {
        let scaffold = options.scaffold.toLowerCase();
        let repo;
        let conf = {};
        if(scaffold === 'node') {
          repo = 'https://github.com/bigearth/bitbox-scaffold-node.git';
        } else if(scaffold === 'angular') {
          repo = 'https://github.com/bigearth/bitbox-scaffold-angular.git';
        } else if(scaffold === 'next') {
          repo = 'https://github.com/bigearth/bitbox-scaffold-next.git';
        } else if(scaffold === 'react') {
          repo = 'https://github.com/bigearth/bitbox-scaffold-react.git';
        } else if(scaffold === 'vue') {
          repo = 'https://github.com/bigearth/bitbox-scaffold-vue.git';
        } else {
          console.log(chalk.red(`Scaffold ${scaffold} not supported`));
          process.exit(1)
        }

        if(options && options.repo) {
          scaffold = 'custom repo';
          repo = options.repo.toLowerCase();
        }

        clear();
        console.log(
          chalk.blue(
            figlet.textSync('BITBOX', {
              font: '3-D',
              horizontalLayout: 'full'
            })
          )
        );

        console.log(chalk.blue(`Scaffolding ${scaffold} app in ${name}`));
        clone(repo, `./${name}`, [conf], () => {
          fs.appendFileSync( `./${name}/.gitignore`, '.console_history');
          console.log(chalk.green('All done.'), emoji.get(':white_check_mark:'));
          console.log(chalk.blue('Now `cd` in to your new project and run `npm install && npm start`'), emoji.get(':rocket:'));
        });
        return;
      }

      console.log(chalk.green(`Creating ${name}/ directory`));
      console.log(chalk.green(`Creating src/ directory: ./${name}/src`));
      mkdirp(`./${name}/src`, (err) => {});

      console.log(chalk.green(`Creating tests/ directory: ./${name}/tests`));
      mkdirp(`./${name}/tests`, (err) => {});

      console.log(chalk.green(`Creating bitbox.js configuration file: ./${name}/bitbox.js`));

      mkdirp(`./${name}`, (err) => {});
      touch(`./${name}/bitbox.js`);
      fs.writeFileSync( `./${name}/bitbox.js`, `exports.config = {
  networks: {
    ${environment}: {
      protocol: "${protocol}",
      host: "${host}",
      port: "${port}",
      username: "${username}",
      password: "${password}",
      corsproxy: ${corsproxy}
    }
  }
};
`);
      fs.appendFileSync( `./${name}/.gitignore`, '.console_history');
      console.log(chalk.blue('All done.'), emoji.get(':white_check_mark:'));
      console.log(chalk.blue('Go get em! Remember--with great power comes great responsibility.'), emoji.get(':rocket:'));
    });
  }
);

program
  .command('console')
  .option('-e, --environment <environment>', 'environment of running BITBOX instance. Ex: production, staging. (Default: development)')
  .description('Run a console with Bitcoin Cash RPC commands available')
  .action((options) => {
    let config;
    try {
      config = require(process.cwd() + '/bitbox.js').config;
    } catch(err) {
      console.log(chalk.red('Console command must be run inside a bitbox project'));
      process.exit(1);
    }
    let replServer = repl.start('> ');
    let historyFile = path.join(process.cwd(), '.console_history');
    require('repl.history')(replServer, historyFile);

    fs.readFile(os.homedir() + '/.bitboxrc', 'utf8', (err, contents) => {
      if(contents) {
        config = ini.parse(contents);
      }

      let environment = fetchOption('environment=development', config, options);

      replServer.context.BITBOX = new BITBOXCli(config.networks[environment]);
    });
  }
);

program
  .command('paper')
  .option('-e, --encoding <encoding>', 'The encoding to use. Options include "cashaddr" and "legacy". (Default: "cashaddr")')
  .option('-l, --language <language>', 'language of mnemonic. Options: chinese_simplified, chinese_traditional, english, french, italian, japanese, korean, spanish. (Default: english)')
  .description('Create a paper wallet for easy and safe back up')
  .action((options) => {
    if(!options.encoding || (options.encoding !== 'cashaddr' && options.encoding !== 'legacy')) {
      options.encoding = 'cashaddr';
    }

    if(!options.language || (options.language !== 'chinese_simplified' && options.language !== 'chinese_traditional' && options.language !== 'english' && options.language !== 'french' && options.language !== 'italian' && options.language !== 'japanese' && options.language !== 'korean' && options.language !== 'spanish')) {
      options.language = 'english';
    }

    console.log(chalk.blue(`Creating ${options.language} ${options.encoding} paper wallet`));
    let bitbox = new BITBOXCli();
    let mnemonic = bitbox.Mnemonic.generate(256, bitbox.Mnemonic.wordLists()[options.language]);
    let keypair = bitbox.Mnemonic.toKeypairs(mnemonic, 1)[0];
    let privateKeyWIF = keypair.privateKeyWIF;
    let address = keypair.address;
    if(options.encoding === 'legacy') {
      address = bitbox.Address.toLegacyAddress(address);
    }
    touch(`./paper-wallet.html`);
    let QRCode = require('qrcode')

    QRCode.toDataURL(privateKeyWIF, (err, privateKeyWIFQR) => {
      QRCode.toDataURL(address, (err, addressQR) => {
        fs.writeFileSync( `./paper-wallet.html`, `
          <div>
            <h2>Private Key WIF</h2>
            <p>${privateKeyWIF}</p>
            <p><img src='${privateKeyWIFQR}' /></p>
          </div>
          <div>
            <h2>Public address</h2>
            <p>${address}</p>
            <p><img src='${addressQR}' /></p>
          </div>
          <div>
            <p>Mnemonic: ${mnemonic}</p>
            <p>HD Path: m/44'/145'/0'/0/0</p>
            <p>Encoding:  ${options.encoding}</p>
            <p>Language:  ${options.language}</p>
          </div>
        `);
      })
    })
  }
);

program
  .command('proxy')
  .description('localhost proxy for POSTing to full BCH node')
  .action((options) => {
    console.log(chalk.green(`CORS Proxy running at: http://localhost:1337`));
    cmd.run('npm install -g corsproxy');
    cmd.get(
    'corsproxy',
    function(err, data, stderr){
      // console.log('')
    }
    );
  }
);

function fetchOption(kv, config, options) {
  let parts = kv.split('=');
  let key = parts[0];
  let defaultVal = parts[1];
  if(options && options[key]) {
    return options[key];
  } else if(config && config.new && config.new[key]) {
    return config.new[key];
  } else {
    return defaultVal;
  }
}

program
  .parse(process.argv);

// print help if no command given
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
