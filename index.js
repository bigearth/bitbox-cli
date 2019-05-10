#!/usr/bin/env node
"use strict";
require("babel-register");
var path = require("path");
var program = require("commander");
var chalk = require("chalk");
var mkdirp = require("mkdirp");
var figlet = require("figlet");
var clear = require("clear");
var fs = require("fs");
var touch = require("touch");
var emoji = require("node-emoji");
var repl = require("repl");
var BITBOX = require("./lib/BITBOX").BITBOX;
var clone = require("git-clone");
program.version("7.0.12 ", "-v, --version");
program
    .command("new <name>")
    .option("-s, --scaffold <scaffold>", "The framework to use. Options include react, angular, vuejs, nextjs, node and websockets.")
    .option("-r, --restURL <restURL>", "The rest URL to use. default: https://trest.bitcoin.com/v2/")
    .option("-e, --environment <environment>", "environment of running BITBOX instance. Ex: production, staging. (Default: development)")
    .description("create a new BITBOX application")
    .action(function (name, options) {
    if (fs.existsSync("./" + name)) {
        console.log(chalk.red("Project " + name + " already exists"));
        process.exit(1);
    }
    var config;
    var environment = fetchOption("environment=development", config, options);
    var restURL = fetchOption("restURL=https://trest.bitcoin.com/v2/", config, options);
    if (options && options.scaffold) {
        var scaffold = options.scaffold.toLowerCase();
        var repo = void 0;
        var conf = {};
        if (scaffold === "node") {
            repo = "https://github.com/Bitcoin-com/bitbox-scaffold-node.git";
        }
        else if (scaffold === "angular") {
            repo = "https://github.com/Bitcoin-com/bitbox-scaffold-angular.git";
        }
        else if (scaffold === "next") {
            repo = "https://github.com/Bitcoin-com/bitbox-scaffold-next.git";
        }
        else if (scaffold === "react") {
            repo = "https://github.com/Bitcoin-com/bitbox-scaffold-react.git";
        }
        else if (scaffold === "vue") {
            repo = "https://github.com/Bitcoin-com/bitbox-scaffold-vue.git";
        }
        else if (scaffold === "websockets") {
            repo = "https://github.com/Bitcoin-com/bitbox-scaffold-websockets.git";
        }
        else {
            console.log(chalk.red("Scaffold " + scaffold + " not supported"));
            process.exit(1);
        }
        if (options && options.repo) {
            scaffold = "custom repo";
            repo = options.repo.toLowerCase();
        }
        clear();
        console.log(chalk.blue(figlet.textSync("BITBOX", {
            font: "3-D",
            horizontalLayout: "full"
        })));
        console.log(chalk.blue("Scaffolding " + scaffold + " app in " + name));
        clone(repo, "./" + name, [conf], function (res) {
            if (res === "Error: 'git clone' failed with status 128") {
                console.log(chalk.red("Must create new app in to an empty directory"));
            }
            else {
                console.log(chalk.green("All done."), emoji.get(":white_check_mark:"));
                console.log(chalk.blue("Now `cd` in to your new project and run `npm install && npm start`"), emoji.get(":rocket:"));
            }
        });
        return;
    }
    console.log(chalk.green("Creating " + name + "/ directory"));
    console.log(chalk.green("Creating src/ directory: ./" + name + "/src"));
    mkdirp("./" + name + "/src", function (err) { });
    console.log(chalk.green("Creating tests/ directory: ./" + name + "/tests"));
    mkdirp("./" + name + "/tests", function (err) { });
    console.log(chalk.green("Creating bitbox.js configuration file: ./" + name + "/bitbox.js"));
    mkdirp("./" + name, function (err) { });
    touch("./" + name + "/bitbox.js");
    fs.writeFileSync("./" + name + "/bitbox.js", "exports.config = {\n  environments: {\n    " + environment + ": {\n      restURL: \"" + restURL + "\"\n    }\n  }\n};\n");
    fs.appendFileSync("./" + name + "/.gitignore", ".console_history");
    console.log(chalk.blue("All done."), emoji.get(":white_check_mark:"));
    console.log(chalk.blue("Go get em! Remember--with great power comes great responsibility."), emoji.get(":rocket:"));
});
program
    .command("console")
    .option("-e, --environment <environment>", "environment of running BITBOX instance. Ex: production, staging. (Default: development)")
    .description("Run a console with Bitcoin Cash RPC commands available")
    .action(function (options) {
    var config;
    try {
        config = require(process.cwd() + "/bitbox.js").config;
    }
    catch (err) {
        console.log(chalk.red("Console command must be run inside a bitbox project"));
        process.exit(1);
    }
    var replServer = repl.start("> ");
    var historyFile = path.join(process.cwd(), ".console_history");
    require("repl.history")(replServer, historyFile);
    var environment = fetchOption("environment=development", config, options);
    replServer.context.BITBOX = new BITBOX(config.environments[environment]);
});
function fetchOption(kv, config, options) {
    var parts = kv.split("=");
    var key = parts[0];
    var defaultVal = parts[1];
    if (options && options[key])
        return options[key];
    else if (config && config.new && config.new[key])
        return config.new[key];
    return defaultVal;
}
program.parse(process.argv);
// print help if no command given
// if (!process.argv.slice(2).length) program.outputHelp()
module.exports = BITBOX;
//# sourceMappingURL=index.js.map