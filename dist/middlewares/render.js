/* IMPORT */
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var consolidate = require("consolidate");
var isBinary = require("isbinaryfile");
var pify = require("pify");
/* RENDER */
function render(files, metalsmith, next) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata, render, paths, _i, paths_1, path, contents, template, rendered;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadata = metalsmith.metadata(), render = pify(consolidate.handlebars.render), paths = Object.keys(files);
                    _i = 0, paths_1 = paths;
                    _a.label = 1;
                case 1:
                    if (!(_i < paths_1.length)) return [3 /*break*/, 4];
                    path = paths_1[_i];
                    contents = files[path].contents;
                    if (isBinary.sync(contents, contents.length))
                        return [3 /*break*/, 3];
                    template = contents.toString();
                    return [4 /*yield*/, render(template, metadata.renderVariables)];
                case 2:
                    rendered = _a.sent();
                    files[path].contents = new Buffer(rendered);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
/* EXPORT */
exports.default = render;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVaLHlDQUEyQztBQUMzQyx1Q0FBeUM7QUFDekMsMkJBQTZCO0FBRTdCLFlBQVk7QUFFWixnQkFBd0IsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJOztZQUV2QyxRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssZUFFRCxJQUFJLEVBRUwsUUFBUTs7OzsrQkFOQSxVQUFVLENBQUMsUUFBUSxFQUFHLFdBQ3hCLElBQUksQ0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBRSxVQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFHLEtBQUssQ0FBRTs7Ozt5QkFFakIsQ0FBQSxtQkFBSyxDQUFBOzsrQkFFRixLQUFLLENBQUMsSUFBSSxDQUFDO29CQUU5QixFQUFFLENBQUMsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFHLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFHLENBQUM7d0JBQUMsTUFBTSxrQkFBRzsrQkFFM0MsUUFBUSxDQUFDLFFBQVEsRUFBRztvQkFDcEIscUJBQU0sTUFBTSxDQUFHLFFBQVEsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFFLEVBQUE7OytCQUFuRCxTQUFtRDtvQkFFcEUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBRyxRQUFRLENBQUUsQ0FBQzs7O29CQVQvQixJQUFLLENBQUE7OztvQkFhdkIsSUFBSSxFQUFHLENBQUM7Ozs7O0NBRVQ7QUFFRCxZQUFZO0FBRVosa0JBQWUsTUFBTSxDQUFDIn0=