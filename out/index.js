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
var puppeteerHelper_1 = require("./puppeteerHelper");
var fs = require("fs");
var Startup = /** @class */ (function () {
    function Startup() {
    }
    Startup.prototype.main = function () {
        return __awaiter(this, void 0, void 0, function () {
            var helper, page, results, index, toiletPapers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        helper = new puppeteerHelper_1.Helper();
                        return [4 /*yield*/, helper.init()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, helper.goto('https://google.com')];
                    case 2:
                        page = _a.sent();
                        return [4 /*yield*/, page.type('#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input', 'Toilet paper')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helper.pressEnter()];
                    case 4:
                        _a.sent();
                        //go to shopping tab
                        return [4 /*yield*/, helper.clickAjax("#hdtb-msb-vis > div:nth-child(2) > a")];
                    case 5:
                        //go to shopping tab
                        _a.sent();
                        results = new Array();
                        index = 2;
                        _a.label = 6;
                    case 6:
                        if (!(index < 6)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.scrape(helper, page, index)];
                    case 7:
                        toiletPapers = _a.sent();
                        results = results.concat(toiletPapers);
                        _a.label = 8;
                    case 8:
                        index++;
                        return [3 /*break*/, 6];
                    case 9:
                        console.log('all: ' + results.length);
                        //we are done
                        return [4 /*yield*/, helper.close()];
                    case 10:
                        //we are done
                        _a.sent();
                        //lets save it to disk
                        fs.writeFile("titles.json", JSON.stringify(results), function (err) {
                            if (err)
                                throw err;
                            console.log("Saved!");
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Startup.prototype.scrape = function (helper, page, pageNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var titles, selector, element;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(pageNumber == 2)) return [3 /*break*/, 5];
                        //select new items (from filters)
                        return [4 /*yield*/, helper.clickAjax("#leftnavc > div > div > div:nth-child(7) > div.RhVG3d > div > div > div.EQ4p8c.CyAbL.HNgvTe")];
                    case 1:
                        //select new items (from filters)
                        _a.sent();
                        return [4 /*yield*/, helper.clickAjax("#leftnavc > div > div > div:nth-child(8) > div.RhVG3d > div > div > div")];
                    case 2:
                        //select Free Shipping (from filters)
                        page = _a.sent();
                        //Open the Sort By filter by clicking on it
                        return [4 /*yield*/, page.click("#taw > div:nth-child(1) > div > div > div > div.vylwkd > g-dropdown-menu")];
                    case 3:
                        //Open the Sort By filter by clicking on it
                        _a.sent();
                        //select Review Score        
                        return [4 /*yield*/, helper.clickAjax("#lb > div > g-menu > g-menu-item:nth-child(2)")];
                    case 4:
                        //select Review Score        
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, page.screenshot({ path: "capture" + pageNumber + ".png", fullPage: true })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () {
                                var elements = Array.from(document.querySelectorAll('div.sh-dlr__list-result'));
                                var results = [];
                                console.log("length " + elements.length);
                                for (var i = 0; i < elements.length; i++) {
                                    var currentNode = elements[i];
                                    var title = currentNode.querySelector('.mASaeb');
                                    console.log(title.textContent);
                                    results[i] = title.textContent;
                                }
                                return results;
                            })];
                    case 7:
                        titles = _a.sent();
                        selector = "a[aria-label=\"Page " + pageNumber + "\"]";
                        return [4 /*yield*/, page.$(selector)];
                    case 8:
                        element = _a.sent();
                        console.log("element: " + element);
                        console.log("selector: " + selector);
                        return [4 /*yield*/, helper.clickAjax(selector)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, page.screenshot({ path: "capture" + pageNumber + "-after.png", fullPage: true })];
                    case 10:
                        _a.sent();
                        console.log("a length: " + titles.length);
                        return [2 /*return*/, titles];
                }
            });
        });
    };
    return Startup;
}());
new Startup().main();
//# sourceMappingURL=index.js.map