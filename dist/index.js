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
var inquirer_helpers_1 = require("inquirer-helpers");
var chalk = require("chalk");
var child_process_1 = require("child_process");
var fs = require("fs");
var isUrl = require("is-url");
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
                        return [4 /*yield*/, inquirer_helpers_1.default.input('Project name:', false)];
                    case 4:
                        project = _b.sent();
                        return [2 /*return*/, Template.create(template, project)];
                    case 5:
                        {
                            return [2 /*return*/, Template.list()];
                        }
                        _b.label = 6;
                    case 6: return [4 /*yield*/, inquirer_helpers_1.default.input('Repository to install:')];
                    case 7:
                        repository = _b.sent();
                        return [4 /*yield*/, inquirer_helpers_1.default.input('Template name:', false)];
                    case 8:
                        template = _b.sent();
                        return [2 /*return*/, Template.install(repository, template)];
                    case 9: return [4 /*yield*/, inquirer_helpers_1.default.noYes('Do you want to uninstall all templates?')];
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
                    case 12: return [4 /*yield*/, inquirer_helpers_1.default.noYes('Do you want to update all templates?')];
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
                        return [4 /*yield*/, inquirer_helpers_1.default.noYes("There's already a file or folder named \"" + project + "\", do you want to overwrite it?")];
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
                        console.log("Created \"" + destination + "\"");
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
                        if (!endpoint) return [3 /*break*/, 10];
                        template = template || utils_1.default.template.guessName(endpoint);
                        if (!template)
                            return [2 /*return*/, console.error('You must provide a template name')];
                        destination = utils_1.default.template.getPath(template);
                        if (!fs.existsSync(destination)) return [3 /*break*/, 3];
                        return [4 /*yield*/, inquirer_helpers_1.default.noYes("There's already a templated named \"" + template + "\", do you want to overwrite it?")];
                    case 1:
                        okay = _a.sent();
                        if (!okay)
                            return [2 /*return*/];
                        return [4 /*yield*/, utils_1.default.delete(destination)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 8, , 9]);
                        if (!isUrl(endpoint)) return [3 /*break*/, 5];
                        return [4 /*yield*/, pify(child_process_1.exec)("git clone " + endpoint + " " + destination)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, pify(child_process_1.exec)("rsync -av --exclude=*/.git " + endpoint + "/ " + destination)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        console.log("Template \"" + repository + "\" installed as \"" + template + "\"");
                        console.log("Run \"template create " + template + " " + chalk.blue('<project>') + "\" to get started");
                        return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        console.error("Failed to install template \"" + template + "\"");
                        console.error(e_1.message);
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        console.log("\"" + repository + "\" is not a repository");
                        _a.label = 11;
                    case 11: return [2 /*return*/];
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
                        return [4 /*yield*/, inquirer_helpers_1.default.noYes('Are you sure you want to uninstall all templates?')];
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
            var names, folderPath, isRepository, result, e_2;
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
                        return [3 /*break*/, 8];
                    case 2:
                        folderPath = utils_1.default.template.getPath(template, true);
                        if (!folderPath)
                            return [2 /*return*/, console.error("\"" + template + "\" is not installed")];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        isRepository = utils_1.default.exists(path.join(folderPath, '.git'));
                        if (!isRepository) return [3 /*break*/, 5];
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
                        console.error("\"" + template + "\" is not a repository, it can't be updated");
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_2 = _a.sent();
                        console.error("Failed to update template \"" + template + "\"");
                        console.error(e_2.message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    }
};
/* EXPORT */
exports.default = Template;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWixxREFBbUM7QUFDbkMsNkJBQStCO0FBQy9CLCtDQUFtQztBQUNuQyx1QkFBeUI7QUFDekIsOEJBQWdDO0FBQ2hDLHVDQUF5QztBQUN6QywyQkFBNkI7QUFDN0IsMkJBQTZCO0FBQzdCLG1DQUE4QjtBQUM5QixpQ0FBNEI7QUFFNUIsY0FBYztBQUVkLElBQU0sUUFBUSxHQUFHO0lBRVQsTUFBTTs7MkVBeUJBLFNBQVMsaUJBU1QsU0FBUzs7OzRCQWhDSCxxQkFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRyxFQUFBOztrQ0FBN0IsU0FBNkI7d0JBRXBDLEtBQUEsT0FBTyxDQUFBOztpQ0FFVCxRQUFRLEVBQVIsTUFBTSxrQkFBRTtpQ0FNUixNQUFNLEVBQU4sTUFBTSxrQkFBQTtpQ0FJTixTQUFTLEVBQVQsTUFBTSxrQkFBRztpQ0FNVCxXQUFXLEVBQVgsTUFBTSxrQkFBSztpQ0FTWCxRQUFRLEVBQVIsTUFBTSxtQkFBRTs7OzRCQXhCTSxxQkFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRyxFQUFBOzttQ0FBOUIsU0FBOEI7d0JBQy9CLHFCQUFNLDBCQUFHLENBQUMsS0FBSyxDQUFHLGVBQWUsRUFBRSxLQUFLLENBQUUsRUFBQTs7a0NBQTFDLFNBQTBDO3dCQUMxRCxzQkFBTyxRQUFRLENBQUMsTUFBTSxDQUFHLFFBQVEsRUFBRSxPQUFPLENBQUUsRUFBQzs7d0JBR2xDLENBQUM7NEJBQ1osTUFBTSxnQkFBQyxRQUFRLENBQUMsSUFBSSxFQUFHLEVBQUM7d0JBQzFCLENBQUM7OzRCQUdvQixxQkFBTSwwQkFBRyxDQUFDLEtBQUssQ0FBRyx3QkFBd0IsQ0FBRSxFQUFBOztxQ0FBNUMsU0FBNEM7d0JBQzlDLHFC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