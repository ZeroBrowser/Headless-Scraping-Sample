"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.Helper = void 0;
var puppeteer = require("puppeteer-core");
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(puppeteer);
                        _a = this;
                        return [4 /*yield*/, puppeteer.connect({
                                browserWSEndpoint: 'wss://proxy.0browser.com?token=5299f72f-f05b-4589-ad5d-1e9b3de55b9d&timeout=160000',
                            })];
                    case 1:
                        _a.browser = _b.sent();
                        console.info("helper is initialized : " + this.browser.isConnected());
                        return [2 /*return*/, this.browser];
                }
            });
        });
    };
    Helper.prototype.goto = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.browser.newPage()];
                    case 1:
                        _a.page = _b.sent();
                        this.page.on('console', function (msg) { return console.log('PAGE LOG:', msg.text()); });
                        return [4 /*yield*/, this.page.setViewport({ width: 1280, height: 1000 })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.page.goto(url)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, this.page];
                }
            });
        });
    };
    Helper.prototype.pressEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.page.keyboard.press(String.fromCharCode(13)),
                            this.page.waitForNavigation({ waitUntil: 'networkidle0' })
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Helper.prototype.clickAjax = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.page.click(selector),
                            this.page.waitForNavigation({ waitUntil: 'networkidle0' })
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.page];
                }
            });
        });
    };
    Helper.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.browser.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=puppeteerHelper.js.map