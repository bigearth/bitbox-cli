"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var Socket = /** @class */ (function () {
    function Socket(config) {
        if (config === void 0) { config = {}; }
        if (typeof config === "string") {
            // TODO remove this check in v2.0
            this.socket = io("" + config);
        }
        else {
            if (config.restURL) {
                this.socket = io("" + config.restURL);
            }
            else {
                var restURL = "https://rest.bitcoin.com";
                this.socket = io("" + restURL);
            }
            if (config.callback)
                config.callback();
        }
    }
    Socket.prototype.listen = function (endpoint, cb) {
        this.socket.emit(endpoint);
        if (endpoint === "blocks")
            this.socket.on("blocks", function (msg) { return cb(msg); });
        else if (endpoint === "transactions")
            this.socket.on("transactions", function (msg) { return cb(msg); });
    };
    return Socket;
}());
exports.Socket = Socket;
