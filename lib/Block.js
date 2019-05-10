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
var Block = /** @class */ (function () {
    function Block(restURL) {
        this.restURL = restURL;
    }
    Block.prototype.detailsByHeight = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof id === "number")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "block/detailsByHeight/" + id)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data
                            // Array of blocks.
                        ];
                    case 2:
                        if (!Array.isArray(id)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "block/detailsByHeight",
                            data: {
                                heights: id
                            }
                        };
                        return [4 /*yield*/, axios_1.default(options)];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input must be a number or array of numbers.");
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
    Block.prototype.detailsByHash = function (hash) {
        return __awaiter(this, void 0, void 0, function () {
            var response, options, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof hash === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "block/detailsByHash/" + hash)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data
                            // Array of hashes.
                        ];
                    case 2:
                        if (!Array.isArray(hash)) return [3 /*break*/, 4];
                        options = {
                            method: "POST",
                            url: this.restURL + "block/detailsByHash",
                            data: {
                                hashes: hash
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
    return Block;
}());
exports.Block = Block;
//# sourceMappingURL=Block.js.map