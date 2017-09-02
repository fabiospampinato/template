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
var fs = require("fs");
var metalsmith = require("metalsmith");
var path = require("path");
var pify = require("pify");
var config_1 = require("./config");
var utils_1 = require("./utils");
/* TEMPLATE */
var Template = {
    wizard: function () {
        return __awaiter(this, void 0, void 0, function () {
            var command, _a, template, project, repository, template, all, templates, template, all, templates, template;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, utils_1.default.prompt.command()];
                    case 1:
                        command = _b.sent();
                        _a = command;
                        switch (_a) {
                            case 'create': return [3 /*break*/, 2];
                            case 'list': return [3 /*break*/, 5];
                            case 'install': return [3 /*break*/, 6];
                            case 'uninstall': return [3 /*break*/, 9];
                            case 'update': return [3 /*break*/, 12];
                        }
                        return [3 /*break*/, 15];
                    case 2: return [4 /*yield*/, utils_1.default.prompt.template()];
                    case 3:
                        template = _b.sent();
                        return [4 /*yield*/, utils_1.default.prompt.input('Project name:', false)];
                    case 4:
                        project = _b.sent();
                        return [2 /*return*/, Template.create(template, project)];
                    case 5:
                        {
                            return [2 /*return*/, Template.list()];
                        }
                        _b.label = 6;
                    case 6: return [4 /*yield*/, utils_1.default.prompt.input('Repository to install:')];
                    case 7:
                        repository = _b.sent();
                        return [4 /*yield*/, utils_1.default.prompt.input('Template name:', false)];
                    case 8:
                        template = _b.sent();
                        return [2 /*return*/, Template.install(repository, template)];
                    case 9: return [4 /*yield*/, utils_1.default.prompt.confirm('Do you want to uninstall all templates?')];
                    case 10:
                        all = _b.sent();
                        if (all)
                            return [2 /*return*/, Template.uninstall(false)];
                        templates = utils_1.default.templates.getNames();
                        if (!templates.length)
                            return [2 /*return*/, console.error('No templates installed')];
                        return [4 /*yield*/, utils_1.default.prompt.template()];
                    case 11:
                        template = _b.sent();
                        return [2 /*return*/, Template.uninstall(template)];
                    case 12: return [4 /*yield*/, utils_1.default.prompt.confirm('Do you want to update all templates?')];
                    case 13:
                        all = _b.sent();
                        if (all)
                            return [2 /*return*/, Template.update()];
                        templates = utils_1.default.templates.getNames();
                        if (!templates.length)
                            return [2 /*return*/, console.error('No templates installed')];
                        return [4 /*yield*/, utils_1.default.prompt.template()];
                    case 14:
                        template = _b.sent();
                        return [2 /*return*/, Template.update(template)];
                    case 15: return [2 /*return*/];
                }
            });
        });
    },
    create: function (template, project) {
        return __awaiter(this, void 0, void 0, function () {
            var templatePath, source, destination, okay, ms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        project = project || "my-" + template;
                        templatePath = utils_1.default.template.getPath(template, true), source = templatePath && path.join(templatePath, 'template'), destination = path.join(process.cwd(), project);
                        if (!source)
                            return [2 /*return*/, console.error("\"" + template + "\" is not a valid template")];
                        if (!fs.existsSync(destination)) return [3 /*break*/, 3];
                        return [4 /*yield*/, utils_1.default.prompt.confirm("There's already a file or folder named \"" + project + "\", do you want to overwrite it?")];
                    case 1:
                        okay = _a.sent();
                        if (!okay)
                            return [2 /*return*/];
                        return [4 /*yield*/, utils_1.default.delete(destination)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!config_1.default.autoUpdate) return [3 /*break*/, 5];
                        return [4 /*yield*/, Template.update(template)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        ms = metalsmith(__dirname);
                        utils_1.default.handlebars.useHelpers();
                        utils_1.default.metalsmith.useMiddlewares(ms);
                        ms.clean(true)
                            .frontmatter(false)
                            .source(source)
                            .destination(destination)
                            .build(function (err) {
                            if (err)
                                throw err;
                        });
                        return [2 /*return*/];
                }
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
                            names.forEach(function (name) { return console.log(name); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    install: function (repository, template) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, destination, okay, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = utils_1.default.repository.getEndpoint(repository);
                        if (!endpoint) return [3 /*break*/, 7];
                        template = template || utils_1.default.template.guessName(endpoint);
                        if (!template)
                            return [2 /*return*/, console.error('You must provide a template name')];
                        destination = utils_1.default.template.getPath(template);
                        if (!fs.existsSync(destination)) return [3 /*break*/, 3];
                        return [4 /*yield*/, utils_1.default.prompt.confirm("There's already a templated named \"" + template + "\", do you want to overwrite it?")];
                    case 1:
                        okay = _a.sent();
                        if (!okay)
                            return [2 /*return*/];
                        return [4 /*yield*/, utils_1.default.delete(destination)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, pify(child_process_1.exec)("git clone " + endpoint + " " + destination)];
                    case 4:
                        _a.sent();
                        console.log("Template \"" + repository + "\" installed as \"" + template + "\"");
                        console.log("Run \"template create " + template + " " + chalk.blue('<project>') + "\" to get started");
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.error("Failed to install template \"" + template + "\"");
                        console.error(e_1.message);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        console.log("\"" + repository + "\" is not a repository");
                        _a.label = 8;
                    case 8: return [2 /*return*/];
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
                        if (!!template) return [3 /*break*/, 4];
                        if (!(template !== false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, utils_1.default.prompt.confirm('Are you sure you want to uninstall all templates?')];
                    case 1:
                        okay = _a.sent();
                        if (!okay)
                            return [2 /*return*/];
                        _a.label = 2;
                    case 2: return [4 /*yield*/, utils_1.default.templates.getNames()];
                    case 3:
                        names = _a.sent();
                        if (!names.length)
                            return [2 /*return*/, console.error('No templates installed')];
                        names.forEach(function (name) { return Template.uninstall(name); });
                        return [3 /*break*/, 6];
                    case 4:
                        folderPath = utils_1.default.template.getPath(template, true);
                        if (!folderPath)
                            return [2 /*return*/, console.error("\"" + template + "\" is not installed")];
                        return [4 /*yield*/, utils_1.default.delete(folderPath)];
                    case 5:
                        _a.sent();
                        console.log("\"" + template + "\" deleted");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    update: function (template) {
        return __awaiter(this, void 0, void 0, function () {
            var names, folderPath, result, e_2;
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
                        return [3 /*break*/, 6];
                    case 2:
                        folderPath = utils_1.default.template.getPath(template, true);
                        if (!folderPath)
                            return [2 /*return*/, console.error("\"" + template + "\" is not installed")];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, pify(child_process_1.exec)('git pull', { cwd: folderPath })];
                    case 4:
                        result = _a.sent();
                        if (result.match(/already up-to-date/i)) {
                            console.log("No updates available for \"" + template + "\"");
                        }
                        else {
                            console.log("\"" + template + "\" has been updated");
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.error("Failed to update template \"" + template + "\"");
                        console.error(e_2.message);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
};
/* EXPORT */
exports.default = Template;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiw2QkFBK0I7QUFDL0IsK0NBQW1DO0FBQ25DLHVCQUF5QjtBQUN6Qix1Q0FBeUM7QUFDekMsMkJBQTZCO0FBQzdCLDJCQUE2QjtBQUM3QixtQ0FBOEI7QUFDOUIsaUNBQTRCO0FBRTVCLGNBQWM7QUFFZCxJQUFNLFFBQVEsR0FBRztJQUVULE1BQU07OzJFQXlCQSxTQUFTLGlCQVNULFNBQVM7Ozs0QkFoQ0gscUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUcsRUFBQTs7a0NBQTdCLFNBQTZCO3dCQUVwQyxLQUFBLE9BQU8sQ0FBQTs7aUNBRVQsUUFBUSxFQUFSLE1BQU0sa0JBQUU7aUNBTVIsTUFBTSxFQUFOLE1BQU0sa0JBQUE7aUNBSU4sU0FBUyxFQUFULE1BQU0sa0JBQUc7aUNBTVQsV0FBVyxFQUFYLE1BQU0sa0JBQUs7aUNBU1gsUUFBUSxFQUFSLE1BQU0sbUJBQUU7Ozs0QkF4Qk0scUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUcsRUFBQTs7bUNBQTlCLFNBQThCO3dCQUMvQixxQkFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRyxlQUFlLEVBQUUsS0FBSyxDQUFFLEVBQUE7O2tDQUFuRCxTQUFtRDt3QkFDbkUsc0JBQU8sUUFBUSxDQUFDLE1BQU0sQ0FBRyxRQUFRLEVBQUUsT0FBTyxDQUFFLEVBQUM7O3dCQUdsQyxDQUFDOzRCQUNaLE1BQU0sZ0JBQUMsUUFBUSxDQUFDLElBQUksRUFBRyxFQUFDO3dCQUMxQixDQUFDOzs0QkFHb0IscUJBQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUcsd0JBQXdCLENBQUUsRUFBQTs7cUNBQXJELFNBQXFEO3dCQUN2RCxxQkFBTSxlQUFL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