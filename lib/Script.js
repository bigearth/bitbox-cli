"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bitcoin = require("bitcoincashjs-lib");
var opcodes = require("bitcoincash-ops");
var Script = /** @class */ (function () {
    function Script() {
        this.opcodes = opcodes;
        this.nullData = Bitcoin.script.nullData;
        this.multisig = {
            input: {
                encode: function (signatures) {
                    var sigs = [];
                    signatures.forEach(function (sig) {
                        sigs.push(sig);
                    });
                    return Bitcoin.script.multisig.input.encode(sigs);
                },
                decode: Bitcoin.script.multisig.input.decode,
                check: Bitcoin.script.multisig.input.check
            },
            output: {
                encode: function (m, pubKeys) {
                    var pks = [];
                    pubKeys.forEach(function (pubKey) {
                        pks.push(pubKey);
                    });
                    return Bitcoin.script.multisig.output.encode(m, pks);
                },
                decode: Bitcoin.script.multisig.output.decode,
                check: Bitcoin.script.multisig.output.check
            }
        };
        this.pubKey = Bitcoin.script.pubKey;
        this.pubKeyHash = Bitcoin.script.pubKeyHash;
        this.scriptHash = Bitcoin.script.scriptHash;
    }
    Script.prototype.classifyInput = function (script) {
        return Bitcoin.script.classifyInput(script);
    };
    Script.prototype.classifyOutput = function (script) {
        return Bitcoin.script.classifyOutput(script);
    };
    Script.prototype.decode = function (scriptBuffer) {
        return Bitcoin.script.decompile(scriptBuffer);
    };
    Script.prototype.encode = function (scriptChunks) {
        var arr = [];
        scriptChunks.forEach(function (chunk) {
            arr.push(chunk);
        });
        return Bitcoin.script.compile(arr);
    };
    Script.prototype.toASM = function (buffer) {
        return Bitcoin.script.toASM(buffer);
    };
    Script.prototype.fromASM = function (asm) {
        return Bitcoin.script.fromASM(asm);
    };
    return Script;
}());
exports.Script = Script;
//# sourceMappingURL=Script.js.map