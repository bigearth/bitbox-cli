"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// imports
var chai = require("chai");
var BITBOX_1 = require("../../lib/BITBOX");
var RawTransactions_1 = require("../../lib/RawTransactions");
var BITBOX_2 = require("../../lib/BITBOX");
var util = require("util");
// consts
var bitbox = new BITBOX_1.BITBOX();
var assert = chai.assert;
// Used for debugging
util.inspect.defaultOptions = { depth: 1 };
describe("#RawTransactions", function () {
    describe("#RawTransactionsConstructor", function () {
        it("should create instance of RawTransactions", function () {
            var rawtransactions = new RawTransactions_1.RawTransactions();
            assert.equal(rawtransactions instanceof RawTransactions_1.RawTransactions, true);
        });
        it("should have a restURL property", function () {
            var rawtransactions = new RawTransactions_1.RawTransactions();
            assert.equal(rawtransactions.restURL, BITBOX_2.resturl);
        });
    });
    describe("#decodeRawTransaction", function () {
        it("should decode tx for a single hex", function () { return __awaiter(_this, void 0, void 0, function () {
            var hex, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hex = "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000";
                        return [4 /*yield*/, bitbox.RawTransactions.decodeRawTransaction(hex)
                            //console.log(`result ${JSON.stringify(result, null, 2)}`)
                        ];
                    case 1:
                        result = _a.sent();
                        //console.log(`result ${JSON.stringify(result, null, 2)}`)
                        assert.hasAnyKeys(result, [
                            "txid",
                            "hash",
                            "size",
                            "version",
                            "locktime",
                            "vin",
                            "vout"
                        ]);
                        assert.isArray(result.vin);
                        assert.isArray(result.vout);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should decode an array of tx hexes", function () { return __awaiter(_this, void 0, void 0, function () {
            var hexes, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hexes = [
                            "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000",
                            "0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000"
                        ];
                        return [4 /*yield*/, bitbox.RawTransactions.decodeRawTransaction(hexes)
                            //console.log(`result ${JSON.stringify(result, null, 2)}`)
                        ];
                    case 1:
                        result = _a.sent();
                        //console.log(`result ${JSON.stringify(result, null, 2)}`)
                        assert.isArray(result);
                        assert.hasAnyKeys(result[0], [
                            "txid",
                            "hash",
                            "size",
                            "version",
                            "locktime",
                            "vin",
                            "vout"
                        ]);
                        assert.isArray(result[0].vin);
                        assert.isArray(result[0].vout);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error for improper single input", function () { return __awaiter(_this, void 0, void 0, function () {
            var addr, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        addr = 12345;
                        return [4 /*yield*/, bitbox.RawTransactions.decodeRawTransaction(addr)];
                    case 1:
                        _a.sent();
                        assert.equal(true, false, "Unexpected result!");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        //console.log(`err: `, err)
                        assert.include(err_1.message, "Input must be a string or array of strings.");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it("should throw error on array size rate limit", function () { return __awaiter(_this, void 0, void 0, function () {
            var data, i, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = [];
                        for (i = 0; i < 25; i++) {
                            data.push("0200000001b9b598d7d6d72fc486b2b3a3c03c79b5bade6ec9a77ced850515ab5e64edcc21010000006b483045022100a7b1b08956abb8d6f322aa709d8583c8ea492ba0585f1a6f4f9983520af74a5a0220411aee4a9a54effab617b0508c504c31681b15f9b187179b4874257badd4139041210360cfc66fdacb650bc4c83b4e351805181ee696b7d5ab4667c57b2786f51c413dffffffff0210270000000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac786e9800000000001976a914eb4b180def88e3f5625b2d8ae2c098ff7d85f66488ac00000000");
                        }
                        return [4 /*yield*/, bitbox.RawTransactions.decodeRawTransaction(data)];
                    case 1:
                        result = _a.sent();
                        console.log("result: " + util.inspect(result));
                        assert.equal(true, false, "Unexpected result!");
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        assert.hasAnyKeys(err_2, ["error"]);
                        assert.include(err_2.error, "Array too large");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("#getRawTransaction", function () {
        it("should decode a single txid, with concise output", function () { return __awaiter(_this, void 0, void 0, function () {
            var txid, verbose, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txid = "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1";
                        verbose = false;
                        return [4 /*yield*/, bitbox.RawTransactions.getRawTransaction(txid, verbose)
                            //console.log(`result: ${JSON.stringify(result, null, 2)}`)
                        ];
                    case 1:
                        result = _a.sent();
                        //console.log(`result: ${JSON.stringify(result, null, 2)}`)
                        assert.isString(result);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should decode a single txid, with verbose output", function () { return __awaiter(_this, void 0, void 0, function () {
            var txid, verbose, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txid = "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1";
                        verbose = true;
                        return [4 /*yield*/, bitbox.RawTransactions.getRawTransaction(txid, verbose)
                            //console.log(`result: ${JSON.stringify(result, null, 2)}`)
                        ];
                    case 1:
                        result = _a.sent();
                        //console.log(`result: ${JSON.stringify(result, null, 2)}`)
                        assert.hasAnyKeys(result, [
                            "hex",
                            "txid",
                            "hash",
                            "size",
                            "version",
                            "locktime",
                            "vin",
                            "vout",
                            "blockhash",
                            "confirmations",
                            "time",
                            "blocktime"
                        ]);
                        assert.isArray(result.vin);
                        assert.isArray(result.vout);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should decode an array of txids, with a concise output", function () { return __awaiter(_this, void 0, void 0, function () {
            var txid, verbose, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txid = [
                            "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1",
                            "b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f"
                        ];
                        verbose = false;
                        return [4 /*yield*/, bitbox.RawTransactions.getRawTransaction(txid, verbose)
                            //console.log(`result: ${JSON.stringify(result, null, 2)}`)
                        ];
                    case 1:
                        result = _a.sent();
                        //console.log(`result: ${JSON.stringify(result, null, 2)}`)
                        assert.isArray(result);
                        assert.isString(result[0]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should decode an array of txids, with a verbose output", function () { return __awaiter(_this, void 0, void 0, function () {
            var txid, verbose, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        txid = [
                            "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1",
                            "b25d24fbb42d84812ed2cb55797f10fdec41afc7906ab563d1ec8c8676a2037f"
                        ];
                        verbose = true;
                        return [4 /*yield*/, bitbox.RawTransactions.getRawTransaction(txid, verbose)
                            //console.log(`result: ${JSON.stringify(result, null, 2)}`)
                        ];
                    case 1:
                        result = _a.sent();
                        //console.log(`result: ${JSON.stringify(result, null, 2)}`)
                        assert.isArray(result);
                        assert.hasAnyKeys(result[0], [
                            "hex",
                            "txid",
                            "hash",
                            "size",
                            "version",
                            "locktime",
                            "vin",
                            "vout",
                            "blockhash",
                            "confirmations",
                            "time",
                            "blocktime"
                        ]);
                        assert.isArray(result[0].vin);
                        assert.isArray(result[0].vout);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should throw error on array size rate limit", function () { return __awaiter(_this, void 0, void 0, function () {
            var dataMock, data, i, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dataMock = "23213453b4642a73b4fc30d3112d72549ca153a8707255b14373b59e43558de1";
                        data = [];
                        for (i = 0; i < 25; i++)
                            data.push(dataMock);
                        return [4 /*yield*/, bitbox.RawTransactions.getRawTransaction(data)];
                    case 1:
                        result = _a.sent();
                        console.log("result: " + util.inspect(result));
                        assert.equal(true, false, "Unexpected result!");
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        assert.hasAnyKeys(err_3, ["error"]);
                        assert.include(err_3.error, "Array too large");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("#decodeScript", function () {
        it("should decode script for a single hex", function () { return __awaiter(_this, void 0, void 0, function () {
            var hex, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hex = "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16";
                        return [4 /*yield*/, bitbox.RawTransactions.decodeScript(hex)
                            //console.log(`result ${JSON.stringify(result, null, 2)}`)
                        ];
                    case 1:
                        result = _a.sent();
                        //console.log(`result ${JSON.stringify(result, null, 2)}`)
                        assert.hasAllKeys(result, ["asm", "type", "p2sh"]);
                        return [2 /*return*/];
                }
            });
        }); });
        // CT 2/20/19 - Waiting for this PR to be merged complete the test:
        // https://github.com/Bitcoin-com/rest.bitcoin.com/pull/312
        /*
        it("should decode an array of tx hexes", async () => {
          const hexes = [
            "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16",
            "4830450221009a51e00ec3524a7389592bc27bea4af5104a59510f5f0cfafa64bbd5c164ca2e02206c2a8bbb47eabdeed52f17d7df668d521600286406930426e3a9415fe10ed592012102e6e1423f7abde8b70bca3e78a7d030e5efabd3eb35c19302542b5fe7879c1a16"
          ]
    
          const result = await bitbox.RawTransactions.decodeScript(hexes)
          console.log(`result ${JSON.stringify(result, null, 2)}`)
        })
    */
        /*
        it(`should throw an error for improper single input`, async () => {
          try {
            const addr = 12345
    
            await bitbox.RawTransactions.decodeRawTransaction(addr)
            assert.equal(true, false, "Unexpected result!")
          } catch (err) {
            //console.log(`err: `, err)
            assert.include(
              err.message,
              `Input must be a string or array of strings.`
            )
          }
        })
    */
    });
    /*
      Testing sentRawTransaction isn't really possible with an integration test,
      as the endpoint really needs an e2e test to be properly tested. The tests
      below expect error messages returned from the server, but at least test
      that the server is responding on those endpoints, and responds consistently.
    */
    describe("sendRawTransaction", function () {
        it("should send a single transaction hex", function () { return __awaiter(_this, void 0, void 0, function () {
            var hex, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hex = "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000";
                        return [4 /*yield*/, bitbox.RawTransactions.sendRawTransaction(hex)
                            //console.log(`result ${JSON.stringify(result, null, 2)}`)
                        ];
                    case 1:
                        _a.sent();
                        //console.log(`result ${JSON.stringify(result, null, 2)}`)
                        assert.equal(true, false, "Unexpected result!");
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        //console.log(`err: ${util.inspect(err)}`)
                        assert.hasAllKeys(err_4, ["error"]);
                        assert.include(err_4.error, "Missing inputs");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it("should send an array of tx hexes", function () { return __awaiter(_this, void 0, void 0, function () {
            var hexes, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        hexes = [
                            "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000",
                            "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000"
                        ];
                        return [4 /*yield*/, bitbox.RawTransactions.sendRawTransaction(hexes)];
                    case 1:
                        result = _a.sent();
                        console.log("result " + JSON.stringify(result, null, 2));
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        // console.log(`err: ${util.inspect(err)}`)
                        assert.hasAllKeys(err_5, ["error"]);
                        assert.include(err_5.error, "Missing inputs");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it("should throw an error for improper single input", function () { return __awaiter(_this, void 0, void 0, function () {
            var addr, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        addr = 12345;
                        return [4 /*yield*/, bitbox.RawTransactions.sendRawTransaction(addr)];
                    case 1:
                        _a.sent();
                        assert.equal(true, false, "Unexpected result!");
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        //console.log(`err: `, err)
                        assert.include(err_6.message, "Input hex must be a string or array of strings");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it("should throw error on array size rate limit", function () { return __awaiter(_this, void 0, void 0, function () {
            var dataMock, data, i, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dataMock = "01000000013ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a000000006a4730440220540986d1c58d6e76f8f05501c520c38ce55393d0ed7ed3c3a82c69af04221232022058ea43ed6c05fec0eccce749a63332ed4525460105346f11108b9c26df93cd72012103083dfc5a0254613941ddc91af39ff90cd711cdcde03a87b144b883b524660c39ffffffff01807c814a000000001976a914d7e7c4e0b70eaa67ceff9d2823d1bbb9f6df9a5188ac00000000";
                        data = [];
                        for (i = 0; i < 25; i++)
                            data.push(dataMock);
                        return [4 /*yield*/, bitbox.RawTransactions.sendRawTransaction(data)];
                    case 1:
                        result = _a.sent();
                        console.log("result: " + util.inspect(result));
                        assert.equal(true, false, "Unexpected result!");
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        assert.hasAnyKeys(err_7, ["error"]);
                        assert.include(err_7.error, "Array too large");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=RawTransactions.js.map