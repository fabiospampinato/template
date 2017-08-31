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
var chalk = require("chalk");
var child_process_1 = require("child_process");
var del = require("del");
var fs = require("fs");
var metalsmith = require("metalsmith");
var path = require("path");
var pify = require("pify");
var utils_1 = require("./utils");
/* TEMPLATE */
var Template = {
    create: function (template, project) {
        return __awaiter(this, void 0, void 0, function () {
            var ms, templatePath, source, destination;
            return __generator(this, function (_a) {
                ms = metalsmith(__dirname);
                project = project || "my-" + template;
                templatePath = utils_1.default.template.getPath(template, true), source = templatePath && path.join(templatePath, 'template'), destination = path.join(process.cwd(), project);
                if (!source)
                    return [2 /*return*/, console.error(template + " is not a valid template")];
                utils_1.default.useHelpers();
                utils_1.default.useMiddlewares(ms);
                ms.clean(true)
                    .source(source)
                    .destination(destination)
                    .build(function (err) {
                    if (err)
                        throw err;
                });
                return [2 /*return*/];
            });
        });
    },
    list: function () {
        return __awaiter(this, void 0, void 0, function () {
            var names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.default.templates.getNames()];
                    case 1:
                        names = _a.sent();
                        if (!names.length) {
                            console.log('No templates installed');
                        }
                        else {
                            names.forEach(function (name) {
                                console.log("template " + chalk.magenta('<command>') + " " + name);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    install: function (repository, template) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, destination, okay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = utils_1.default.repository.getEndpoint(repository);
                        if (!endpoint) return [3 /*break*/, 5];
                        template = template || utils_1.default.template.guessName(repository);
                        if (!template)
                            return [2 /*return*/, console.error('You must provide a template name')];
                        destination = utils_1.default.template.getPath(template);
                        if (!fs.existsSync(destination)) return [3 /*break*/, 3];
                        return [4 /*yield*/, utils_1.default.prompt.confirmation('This template is already installed, do you want to overwrite it?')];
                    case 1:
                        okay = _a.sent();
                        if (!okay)
                            return [2 /*return*/];
                        return [4 /*yield*/, del(destination)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, pify(child_process_1.exec)("git clone " + endpoint + " " + destination)];
                    case 4:
                        _a.sent();
                        console.log("Template \"" + repository + "\" installed as \"" + template + "\"");
                        console.log("Run `template create " + template + " " + chalk.blue('<project>') + "` to get started");
                        return [3 /*break*/, 6];
                    case 5:
                        console.log(repository + " is not a repository");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    uninstall: function (template) {
        return __awaiter(this, void 0, void 0, function () {
            var okay, names, folderPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!template) return [3 /*break*/, 3];
                        return [4 /*yield*/, utils_1.default.prompt.confirmation('Are you sure you want to uninstall all templates?')];
                    case 1:
                        okay = _a.sent();
                        if (!okay)
                            return [2 /*return*/];
                        return [4 /*yield*/, utils_1.default.templates.getNames()];
                    case 2:
                        names = _a.sent();
                        if (!names.length)
                            return [2 /*return*/, console.error('No templates installed')];
                        names.forEach(function (name) { return Template.uninstall(name); });
                        return [3 /*break*/, 5];
                    case 3:
                        folderPath = utils_1.default.template.getPath(template, true);
                        if (!folderPath)
                            return [2 /*return*/, console.error(template + " is not installed")];
                        return [4 /*yield*/, del(folderPath)];
                    case 4:
                        _a.sent();
                        console.log(template + " deleted");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    update: function (template) {
        return __awaiter(this, void 0, void 0, function () {
            var names, folderPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!template) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.default.templates.getNames()];
                    case 1:
                        names = _a.sent();
                        if (!names.length)
                            return [2 /*return*/, console.error('No templates installed')];
                        names.forEach(function (name) { return Template.update(name); });
                        return [3 /*break*/, 4];
                    case 2:
                        folderPath = utils_1.default.template.getPath(template, true);
                        if (!folderPath)
                            return [2 /*return*/, console.error(template + " is not installed")];
                        return [4 /*yield*/, pify(child_process_1.exec)('git pull', { cwd: folderPath })];
                    case 3:
                        _a.sent();
                        console.log(template + " has been updated");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
/* EXPORT */
exports.default = Template;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiw2QkFBK0I7QUFDL0IsK0NBQW1DO0FBQ25DLHlCQUEyQjtBQUMzQix1QkFBeUI7QUFDekIsdUNBQXlDO0FBQ3pDLDJCQUE2QjtBQUM3QiwyQkFBNkI7QUFDN0IsaUNBQTRCO0FBRTVCLGNBQWM7QUFFZCxJQUFNLFFBQVEsR0FBRztJQUVULE1BQU0sWUFBRyxRQUFnQixFQUFFLE9BQWdCOztnQkFFekMsRUFBRSxFQUlGLFlBQVksRUFDWixNQUFNLEVBQ04sV0FBVzs7cUJBTk4sVUFBVSxDQUFHLFNBQVMsQ0FBRTtnQkFFbkMsT0FBTyxHQUFHLE9BQU8sSUFBSSxRQUFNLFFBQVUsQ0FBQzsrQkFFakIsZUFBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUcsUUFBUSxFQUFFLElBQUksQ0FBRSxXQUMvQyxZQUFZLElBQUksSUFBSSxDQUFDLElBQUksQ0FBRyxZQUFZLEVBQUUsVUFBVSxDQUFFLGdCQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUcsRUFBRSxPQUFPLENBQUU7Z0JBRXpELEVBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTyxDQUFDO29CQUFDLE1BQU0sZ0JBQUMsT0FBTyxDQUFDLEtBQUssQ0FBTSxRQUFRLDZCQUEwQixDQUFFLEVBQUM7Z0JBRTlFLGVBQUssQ0FBQyxVQUFVLEVBQUcsQ0FBQztnQkFDcEIsZUFBSyxDQUFDLGNBQWMsQ0FBRyxFQUFFLENBQUUsQ0FBQztnQkFFNUIsRUFBRSxDQUFDLEtBQUssQ0FBRyxJQUFJLENBQUU7cUJBQ2QsTUFBTSxDQUFHLE1BQU0sQ0FBRTtxQkFDakIsV0FBVyxDQUFHLFdBQVcsQ0FBRTtxQkFDM0IsS0FBSyxDQUFHLFVBQUEsR0FBRztvQkFDVixFQUFFLENB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