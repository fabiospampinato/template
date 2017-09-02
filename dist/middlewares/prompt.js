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
var inquirer = require("inquirer");
/* PROMPT */
function prompt(files, metalsmith, next) {
    return __awaiter(this, void 0, void 0, function () {
        function validate(x) {
            return !(_.isUndefined(x) || (_.isString(x) && !x.trim()));
        }
        function makeQuestion(prompt) {
            var obj = metadata.schema.variables[prompt];
            return _.extend({
                name: prompt,
                message: prompt + ":",
                validate: _.isUndefined(obj.default) ? validate : function () { return true; }
            }, obj);
        }
        var metadata, promptsOrder, prompts, questions, variables;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    metadata = metalsmith.metadata(), promptsOrder = metadata.schema.variablesOrder || [], prompts = promptsOrder.concat(_.sortBy(_.difference(Object.keys(metadata.schema.variables), promptsOrder), [function (x) { return x.toLowerCase(); }])), questions = prompts.map(makeQuestion);
                    return [4 /*yield*/, inquirer.prompt(questions)];
                case 1:
                    variables = _a.sent();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL3Byb21wdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVaLDBCQUE0QjtBQUM1QixtQ0FBcUM7QUFFckMsWUFBWTtBQUVaLGdCQUF3QixLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUk7O1FBRTdDLGtCQUFvQixDQUFDO1lBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBRyxDQUFDLENBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQyxRQUFRLENBQUcsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFHLENBQUUsQ0FBRSxDQUFDO1FBQ3hFLENBQUM7UUFFRCxzQkFBd0IsTUFBTTtZQUM1QixJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBRztnQkFDaEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFLLE1BQU0sTUFBRztnQkFDckIsUUFBUSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBRSxHQUFHLFFBQVEsR0FBRyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7YUFDaEUsRUFBRSxHQUFHLENBQUUsQ0FBQztRQUNYLENBQUM7Ozs7OytCQUVnQixVQUFVLENBQUMsUUFBUSxFQUFHLGlCQUNsQixRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxFQUFFLFlBQ3pDLFlBQVksQ0FBQyxNQUFNLENBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUMsVUFBVSxDQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUUsRUFBRSxZQUFZLENBQUUsRUFBRSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRyxFQUFoQixDQUFnQixDQUFDLENBQUUsQ0FBRSxjQUNwSSxPQUFPLENBQUMsR0FBRyxDQUFHLFlBQVksQ0FBRTtvQkFDNUIscUJBQU0sUUFBUSxDQUFDLE1BQU0sQ0FBRyxTQUFTLENBQUUsRUFBQTs7Z0NBQW5DLFNBQW1DO29CQUVyRCxRQUFRLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztvQkFFckMsSUFBSSxFQUFHLENBQUM7Ozs7O0NBRVQ7QUFBQSxDQUFDO0FBRUYsWUFBWTtBQUVaLGtCQUFlLE1BQU0sQ0FBQyJ9