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
var _ = require("lodash");
var inquirer_helpers_1 = require("inquirer-helpers");
var series = require("p-series");
/* PROMPT */
function prompt(files, metalsmith, next) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata, variablesOrder, variablesNames, variablesValues, variables;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadata = metalsmith.metadata(), variablesOrder = metadata.schema.variablesOrder || [], variablesNames = variablesOrder.concat(_.sortBy(_.difference(Object.keys(metadata.schema.variables), variablesOrder), [function (x) { return x.toLowerCase(); }]));
                    return [4 /*yield*/, series(variablesNames.map(function (name) { return function () { return inquirer_helpers_1.default.input(name + ":", _.get(metadata.schema.variables[name], 'default')); }; }))];
                case 1:
                    variablesValues = _a.sent(), variables = _.zipObject(variablesNames, variablesValues);
                    metadata.renderVariables = variables;
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
;
/* EXPORT */
exports.default = prompt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL3Byb21wdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVaLDBCQUE0QjtBQUM1QixxREFBbUM7QUFDbkMsaUNBQW1DO0FBRW5DLFlBQVk7QUFFWixnQkFBd0IsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJOzs7Ozs7K0JBRTVCLFVBQVUsQ0FBQyxRQUFRLEVBQUcsbUJBQ2hCLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLEVBQUUsbUJBQ3BDLGNBQWMsQ0FBQyxNQUFNLENBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUMsVUFBVSxDQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUUsRUFBRSxjQUFjLENBQUUsRUFBRSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRyxFQUFoQixDQUFnQixDQUFDLENBQUUsQ0FBRTtvQkFDekkscUJBQU0sTUFBTSxDQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUcsVUFBQSxJQUFJLElBQUksT0FBQSxjQUFNLE9BQUEsMEJBQUcsQ0FBQyxLQUFLLENBQU0sSUFBSSxNQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLENBQUUsQ0FBRSxFQUE5RSxDQUE4RSxFQUFwRixDQUFvRixDQUFFLENBQUUsRUFBQTs7c0NBQXBJLFNBQW9JLGNBQzFJLENBQUMsQ0FBQyxTQUFTLENBQUcsY0FBYyxFQUFFLGVBQWUsQ0FBRTtvQkFFakUsUUFBUSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7b0JBRXJDLElBQUksRUFBRyxDQUFDOzs7OztDQUVUO0FBQUEsQ0FBQztBQUVGLFlBQVk7QUFFWixrQkFBZSxNQUFNLENBQUMifQ==