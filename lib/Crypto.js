"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var randomBytes = require("randombytes");
var Bitcoin = require("bitcoincashjs-lib");
var Crypto = /** @class */ (function () {
    function Crypto() {
    }
    Crypto.sha256 = function (buffer) {
        return Bitcoin.crypto.sha256(buffer);
    };
    Crypto.ripemd160 = function (buffer) {
        return Bitcoin.crypto.ripemd160(buffer);
    };
    Crypto.hash256 = function (buffer) {
        return Bitcoin.crypto.hash256(buffer);
    };
    Crypto.hash160 = function (buffer) {
        return Bitcoin.crypto.hash160(buffer);
    };
    Crypto.randomBytes = function (size) {
        if (size === void 0) { size = 16; }
        return randomBytes(size);
    };
    return Crypto;
}());
exports.Crypto = Crypto;
//# sourceMappingURL=Crypto.js.map