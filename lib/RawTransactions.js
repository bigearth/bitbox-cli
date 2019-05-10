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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var RawTransactions = /** @class */ (function () {
    function RawTransactions(restURL) {
        this.restURL = restURL;
    }
    RawTransactions.prototype.decodeRawTransaction = function (hex) {
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof hex === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "rawtransactions/decodeRawTransaction/" + hex)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data
                            // Array of hexes
                        ];
                    case 2:
                        if (!Array.isArray(hex)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "rawtransactions/decodeRawTransaction",
                            data: {
                                hexes: hex
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input must be a string or array of strings.");
                    case 5:
                        error_1 = _a.sent();
                        if (error_1.response && error_1.response.data)
                            throw error_1.response.data;
                        else
                            throw error_1;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RawTransactions.prototype.decodeScript = function (script) {
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof script === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "rawtransactions/decodeScript/" + script)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        if (!Array.isArray(script)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "rawtransactions/decodeScript",
                            data: {
                                hexes: script
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input must be a string or array of strings.");
                    case 5:
                        error_2 = _a.sent();
                        if (error_2.response && error_2.response.data)
                            throw error_2.response.data;
                        else
                            throw error_2;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RawTransactions.prototype.getRawTransaction = function (txid, verbose) {
        if (verbose === void 0) { verbose = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof txid === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "rawtransactions/getRawTransaction/" + txid + "?verbose=" + verbose)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        if (!Array.isArray(txid)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "rawtransactions/getRawTransaction",
                            data: {
                                txids: txid,
                                verbose: verbose
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input must be a string or array of strings.");
                    case 5:
                        error_3 = _a.sent();
                        if (error_3.response && error_3.response.data)
                            throw error_3.response.data;
                        else
                            throw error_3;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RawTransactions.prototype.sendRawTransaction = function (hex, allowhighfees) {
        if (allowhighfees === void 0) { allowhighfees = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof hex === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "rawtransactions/sendRawTransaction/" + hex)];
                    case 1:
                        response = _a.sent();
                        if (response.data === "66: insufficient priority") {
                            console.warn("WARN: Insufficient Priority! This is likely due to a fee that is too low, or insufficient funds.\n            Please ensure that there is BCH in the given wallet. If you are running on the testnet, get some\n            BCH from the testnet faucet at https://developer.bitcoin.com/faucets/bch");
                        }
                        return [2 /*return*/, response.data
                            // Array input
                        ];
                    case 2:
                        if (!Array.isArray(hex)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "rawtransactions/sendRawTransaction",
                            data: {
                                hexes: hex
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input hex must be a string or array of strings.");
                    case 5:
                        error_4 = _a.sent();
                        if (error_4.response && error_4.response.data)
                            throw error_4.response.data;
                        else
                            throw error_4;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return RawTransactions;
}());
exports.RawTransactions = RawTransactions;
//# sourceMappingURL=RawTransactions.js.map