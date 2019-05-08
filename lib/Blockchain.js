"use strict";
/*
  TODO
  - Add blockhash functionality back into getTxOutProof
*/
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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Blockchain = /** @class */ (function () {
    function Blockchain(restURL) {
        this.restURL = restURL;
    }
    Blockchain.prototype.getBestBlockHash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getBestBlockHash")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.response && error_1.response.data)
                            throw error_1.response.data;
                        else
                            throw error_1;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getBlock = function (blockhash, verbose) {
        if (verbose === void 0) { verbose = true; }
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getBlock/" + blockhash + "?verbose=" + verbose)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2.response && error_2.response.data)
                            throw error_2.response.data;
                        else
                            throw error_2;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getBlockchainInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getBlockchainInfo")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_3 = _a.sent();
                        if (error_3.response && error_3.response.data)
                            throw error_3.response.data;
                        else
                            throw error_3;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getBlockCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getBlockCount")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_4 = _a.sent();
                        if (error_4.response && error_4.response.data)
                            throw error_4.response.data;
                        else
                            throw error_4;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getBlockHash = function (height) {
        if (height === void 0) { height = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof height !== "string")
                            height = JSON.stringify(height);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getBlockHash/" + height)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_5 = _a.sent();
                        if (error_5.response && error_5.response.data)
                            throw error_5.response.data;
                        else
                            throw error_5;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getBlockHeader = function (hash, verbose) {
        if (verbose === void 0) { verbose = true; }
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof hash === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getBlockHeader/" + hash + "?verbose=" + verbose)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data
                            // Handle array of hashes.
                        ];
                    case 2:
                        if (!Array.isArray(hash)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "blockchain/getBlockHeader",
                            data: {
                                hashes: hash,
                                verbose: verbose
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input hash must be a string or array of strings.");
                    case 5:
                        error_6 = _a.sent();
                        if (error_6.response && error_6.response.data)
                            throw error_6.response.data;
                        else
                            throw error_6;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getChainTips = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getChainTips")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_7 = _a.sent();
                        if (error_7.response && error_7.response.data)
                            throw error_7.response.data;
                        else
                            throw error_7;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getDifficulty = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getDifficulty")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_8 = _a.sent();
                        if (error_8.response && error_8.response.data)
                            throw error_8.response.data;
                        else
                            throw error_8;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getMempoolAncestors = function (txid, verbose) {
        if (verbose === void 0) { verbose = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof txid !== "string")
                            txid = JSON.stringify(txid);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getMempoolAncestors/" + txid + "?verbose=" + verbose)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_9 = _a.sent();
                        if (error_9.response && error_9.response.data)
                            throw error_9.response.data;
                        else
                            throw error_9;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getMempoolDescendants = function (txid, verbose) {
        if (verbose === void 0) { verbose = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof txid !== "string")
                            txid = JSON.stringify(txid);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getMempoolDescendants/" + txid + "?verbose=" + verbose)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_10 = _a.sent();
                        if (error_10.response && error_10.response.data)
                            throw error_10.response.data;
                        else
                            throw error_10;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getMempoolEntry = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof txid === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getMempoolEntry/" + txid)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        if (!Array.isArray(txid)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "blockchain/getMempoolEntry",
                            data: {
                                txids: txid
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input must be a string or array of strings.");
                    case 5:
                        error_11 = _a.sent();
                        if (error_11.response && error_11.response.data)
                            throw error_11.response.data;
                        else
                            throw error_11;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getMempoolInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getMempoolInfo")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_12 = _a.sent();
                        if (error_12.response && error_12.response.data)
                            throw error_12.response.data;
                        else
                            throw error_12;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getRawMempool = function (verbose) {
        if (verbose === void 0) { verbose = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getRawMempool?vebose=" + verbose)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_13 = _a.sent();
                        if (error_13.response && error_13.response.data)
                            throw error_13.response.data;
                        else
                            throw error_13;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getTxOut = function (txid, n, include_mempool) {
        if (include_mempool === void 0) { include_mempool = true; }
        return __awaiter(this, void 0, void 0, function () {
            var response, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/getTxOut/" + txid + "/n?include_mempool=" + include_mempool)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_14 = _a.sent();
                        if (error_14.response && error_14.response.data)
                            throw error_14.response.data;
                        else
                            throw error_14;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.getTxOutProof = function (txids) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response, options, response, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof txids === "string")) return [3 /*break*/, 2];
                        path = this.restURL + "blockchain/getTxOutProof/" + txids;
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data
                            // Array of txids.
                        ];
                    case 2:
                        if (!Array.isArray(txids)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "blockchain/getTxOutProof",
                            data: {
                                txids: txids
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input must be a string or array of strings.");
                    case 5:
                        error_15 = _a.sent();
                        if (error_15.response && error_15.response.data)
                            throw error_15.response.data;
                        else
                            throw error_15;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.preciousBlock = function (blockhash) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/preciousBlock/" + blockhash)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_16 = _a.sent();
                        if (error_16.response && error_16.response.data)
                            throw error_16.response.data;
                        else
                            throw error_16;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.pruneBlockchain = function (height) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post(this.restURL + "blockchain/pruneBlockchain/" + height)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_17 = _a.sent();
                        if (error_17.response && error_17.response.data)
                            throw error_17.response.data;
                        else
                            throw error_17;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.verifyChain = function (checklevel, nblocks) {
        if (checklevel === void 0) { checklevel = 3; }
        if (nblocks === void 0) { nblocks = 6; }
        return __awaiter(this, void 0, void 0, function () {
            var response, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/verifyChain?checklevel=" + checklevel + "&nblocks=" + nblocks)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_18 = _a.sent();
                        if (error_18.response && error_18.response.data)
                            throw error_18.response.data;
                        else
                            throw error_18;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Blockchain.prototype.verifyTxOutProof = function (proof) {
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof proof === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "blockchain/verifyTxOutProof/" + proof)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data
                            // Array of hashes.
                        ];
                    case 2:
                        if (!Array.isArray(proof)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "blockchain/verifyTxOutProof",
                            data: {
                                proofs: proof
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input must be a string or array of strings.");
                    case 5:
                        error_19 = _a.sent();
                        if (error_19.response && error_19.response.data)
                            throw error_19.response.data;
                        else
                            throw error_19;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
