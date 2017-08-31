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
var absolute = require("absolute");
var handlebars = require("handlebars");
var finder = require("fs-finder");
var inquirer = require("inquirer");
var isDirectory = require("is-directory");
var isUrl = require("is-url");
var path = require("path");
var config_1 = require("./config");
var Helpers = require("./helpers");
var Middlewares = require("./middlewares");
/* UTILS */
var Utils = {
    useHelpers: function () {
        handlebars.registerHelper('eval', Helpers.eval);
        handlebars.registerHelper('_', Helpers.lodash);
    },
    useMiddlewares: function (metalsmith) {
        metalsmith.use(Middlewares.prompt);
        metalsmith.use(Middlewares.render);
    },
    repository: {
        getEndpoint: function (repository) {
            if (isUrl(repository)) {
                /* GIT ENDPOINT */
                if (repository.match(/\.git$/))
                    return repository;
                /* GITHUB REPOSITORY */
                var repo = repository.match(/.+github\.com\/([^\s\/.]+)\/([^\s\/]+)(?:$|\/)/);
                if (repo)
                    return "https://github.com/" + repo[1] + "/" + repo[2] + ".git";
            }
            else {
                /* GITHUB SHORTHAND */
                var shorthand = repository.match(/^([^\s\/.]+)\/([^\s\/]+)$/);
                if (shorthand)
                    return "https://github.com/" + shorthand[1] + "/" + shorthand[2] + ".git";
                /* PATH */
                if (absolute(repository)) {
                    if (isDirectory.sync(repository))
                        return repository;
                }
                else {
                    var fullPath = path.join(process.cwd(), repository);
                    if (isDirectory.sync(fullPath))
                        return fullPath;
                }
            }
            return;
        }
    },
    templates: {
        getPaths: function () {
            return finder.in(config_1.default.directory).findDirectories();
        },
        getNames: function () {
            var paths = Utils.templates.getPaths();
            return paths.map(function (p) { return path.basename(p); });
        }
    },
    template: {
        getPath: function (name, checkExistence) {
            if (checkExistence === void 0) { checkExistence = false; }
            var templatePath = path.join(config_1.default.directory, name);
            return checkExistence ? isDirectory.sync(templatePath) && templatePath : templatePath;
        },
        guessName: function (repository) {
            var lastPart = _.last(repository.split('/'));
            if (!lastPart)
                return;
            return lastPart.trim()
                .replace(/^template-/, '')
                .replace(/\.git$/, '');
        }
    },
    prompt: {
        confirmation: function (message, fallback) {
            if (fallback === void 0) { fallback = false; }
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, inquirer.prompt({
                                type: 'confirm',
                                name: 'result',
                                message: message,
                                default: fallback
                            })];
                        case 1:
                            result = (_a.sent()).result;
                            return [2 /*return*/, !!result];
                    }
                });
            });
        }
    }
};
/* EXPORT */
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsbUNBQXFDO0FBQ3JDLHVDQUF5QztBQUN6QyxrQ0FBb0M7QUFDcEMsbUNBQXFDO0FBQ3JDLDBDQUE0QztBQUM1Qyw4QkFBZ0M7QUFDaEMsMkJBQTZCO0FBQzdCLG1DQUE4QjtBQUM5QixtQ0FBcUM7QUFDckMsMkNBQTZDO0FBRTdDLFdBQVc7QUFFWCxJQUFNLEtBQUssR0FBRztJQUVaLFVBQVU7UUFFUixVQUFVLENBQUMsY0FBYyxDQUFHLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDbkQsVUFBVSxDQUFDLGNBQWMsQ0FBRyxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBRSxDQUFDO0lBRXBELENBQUM7SUFFRCxjQUFjLFlBQUcsVUFBVTtRQUV6QixVQUFVLENBQUMsR0FBRyxDQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUN0QyxVQUFVLENBQUMsR0FBRyxDQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUUsQ0FBQztJQUV4QyxDQUFDO0lBRUQsVUFBVSxFQUFFO1FBRVYsV0FBVyxZQUFHLFVBQWtCO1lBRTlCLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBRyxVQUFVLENBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRTNCLGtCQUFrQjtnQkFFbEIsRUFBRSxDQUFDLENBQUUsVUFBVSxDQUFDLEtBQUssQ0FBRyxRQUFRLENBQUcsQ0FBQztvQkFBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUV2RCx1QkFBdUI7Z0JBRXZCLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUcsZ0RBQWdELENBQUUsQ0FBQztnQkFFbkYsRUFBRSxDQUFDLENBQUUsSUFBSyxDQUFDO29CQUFDLE1BQU0sQ0FBQyx3QkFBc0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBTSxDQUFDO1lBRXBFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixzQkFBc0I7Z0JBRXRCLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUcsMkJBQTJCLENBQUUsQ0FBQztnQkFFbkUsRUFBRSxDQUFDLENBQUUsU0FBVSxDQUFDO29CQUFDLE1BQU0sQ0FBQyx3QkFBc0IsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBTSxDQUFDO2dCQUVqRixVQUFVO2dCQUVWLEVBQUUsQ0FBQyxDQUFFLFFBQVEsQ0FBRyxVQUFVLENBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRTlCLEVBQUUsQ0FBQyxDQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUcsVUFBVSxDQUFHLENBQUM7d0JBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztnQkFFM0QsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFFTixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUcsRUFBRSxVQUFVLENBQUUsQ0FBQztvQkFFMUQsRUFBRSxDQUFDLENBQUUsV0FBVyxDQUFDLElBQUksQ0FBRyxRQUFRLENBQUcsQ0FBQzt3QkFBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUV2RCxDQUFDO1lBRUgsQ0FBQztZQUVELE1BQU0sQ0FBQztRQUVULENBQUM7S0FFRjtJQUVELFNBQVMsRUFBRTtRQUVULFFBQVE7WUFFTixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBRyxnQkFBTSxDQUFDLFNBQVMsQ0FBRSxDQUFDLGVBQWUsRUFBRyxDQUFDO1FBRTNELENBQUM7UUFFRCxRQUFRO1lBRU4sSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUcsQ0FBQztZQUUxQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLENBQUcsQ0FBQyxDQUFFLEVBQW5CLENBQW1CLENBQUUsQ0FBQztRQUVoRCxDQUFDO0tBRUY7SUFFRCxRQUFRLEVBQUU7UUFFUixPQUFPLFlBQUcsSUFBSSxFQUFFLGNBQXNCO1lBQXRCLCtCQUFBLEVBQUEsc0JBQXNCO1lBRXBDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUcsZ0JBQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFFLENBQUM7WUFFMUQsTUFBTSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFHLFlBQVksQ0FBRSxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUM7UUFFM0YsQ0FBQztRQUVELFNBQVMsWUFBRyxVQUFrQjtZQUU1QixJQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUcsR0FBRyxDQUFFLENBQUUsQ0FBQztZQUVyRCxFQUFFLENBQUMsQ0FBRSxDQUFDLFFBQVMsQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFFeEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUc7aUJBQ1AsT0FBTyxDQUFHLFlBQVksRUFBRSxFQUFFLENBQUU7aUJBQzVCLE9BQU8sQ0FBRyxRQUFRLEVBQUUsRUFBRSxDQUFFLENBQUM7UUFFM0MsQ0FBQztLQUVGO0lBRUQsTUFBTSxFQUFFO1FBRUEsWUFBWSxZQUFHLE9BQWUsRUFBRSxRQUFnQjtZQUFoQix5QkFBQSxFQUFBLGdCQUFnQjs7Ozs7Z0NBRW5DLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUU7Z0NBQ3RDLElBQUksRUFBRSxTQUFTO2dDQUNmLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sU0FBQTtnQ0FDUCxPQUFPLEVBQUUsUUFBUTs2QkFDbEIsQ0FBQyxFQUFBOztxQ0FMZSxDQUFBLFNBS2YsQ0FBQTs0QkFFRixzQkFBTyxDQUFDLENBQUMsTUFBTSxFQUFDOzs7O1NBRWpCO0tBRUY7Q0FFRixDQUFDO0FBRUYsWUFBWTtBQUVaLGtCQUFlLEtBQUssQ0FBQyJ9