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
var inquirer_helpers_1 = require("inquirer-helpers");
var del = require("del");
var handlebars = require("handlebars");
var finder = require("fs-finder");
var fs = require("fs");
var isDirectory = require("is-directory");
var isUrl = require("is-url");
var loadJSON = require("load-json-file");
var multimatch = require("multimatch");
var path = require("path");
var config_1 = require("./config");
var Helpers = require("./helpers");
var Middlewares = require("./middlewares");
/* UTILS */
var Utils = {
    loadJSON: function (path, fallback) {
        if (fallback === void 0) { fallback = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, loadJSON(path)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, fallback];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    delete: function (path) {
        return del(path, { force: true });
    },
    exists: function (path) {
        try {
            fs.accessSync(path);
            return true;
        }
        catch (e) {
            return false;
        }
    },
    repository: {
        getEndpoint: function (repository) {
            if (isUrl(repository)) {
                /* GIT ENDPOINT */
                if (repository.match(/\.git$/))
                    return repository;
                /* GITHUB REPOSITORY */
                var repo = repository.match(/.+github\.com\/([^\s\/.]+)\/([^\s\/#]+)(?:$|\/|#)/);
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
            return _.sortBy(finder.in(config_1.default.directory).findDirectories(), [function (p) { return p.toLowerCase(); }]);
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
        guessName: function (endpoint) {
            var lastPart = _.last(endpoint.split('/'));
            if (!lastPart)
                return;
            return lastPart.trim()
                .replace(/^template-/, '')
                .replace(/\.git$/, '');
        },
        isFileSkipped: function (filepath, globs) {
            return globs && !multimatch(filepath, globs, { dot: true }).length;
        }
    },
    prompt: {
        command: function () {
            var commands = ['create', 'list', 'install', 'uninstall', 'update'];
            return inquirer_helpers_1.default.list('What command to you want to execute?', commands);
        },
        template: function () {
            var templates = Utils.templates.getNames();
            return inquirer_helpers_1.default.list('What template to you want to use?', templates);
        }
    },
    handlebars: {
        useHelpers: function () {
            handlebars.registerHelper({
                eval: Helpers.eval,
                _: Helpers.lodash
            });
        },
        getSchema: function (template) {
            var body = _.isString(template) ? handlebars.parse(template).body : template, schema = {}, schemaTypes = {
                BlockStatement: 'confirm',
                MustacheStatement: 'input'
            };
            body.forEach(function (obj) {
                var type = obj.type, params = obj.params, path = obj.path, program = obj.program, schemaType = schemaTypes[type], objSchema = { type: schemaType };
                if (!schemaType)
                    return;
                if (params.length) {
                    params.forEach(function (param) {
                        var type = param.type, parts = param.parts;
                        if (type !== 'PathExpression')
                            return;
                        schema[parts.join('.')] = objSchema;
                    });
                }
                else if (path) {
                    schema[path.parts.join('.')] = objSchema;
                }
                if (obj.hash) {
                    obj.hash.pairs.forEach(function (pair) {
                        var original = pair.value.original;
                        if (!_.isString(original) || !original.match(/[^\s;.]+/))
                            return;
                        schema[original] = objSchema;
                    });
                }
                if (program) {
                    _.extend(schema, Utils.handlebars.getSchema(program.body));
                }
            });
            return schema;
        }
    },
    metalsmith: {
        useMiddlewares: function (metalsmith) {
            metalsmith.use(Middlewares.schema)
                .use(Middlewares.prompt)
                .use(Middlewares.render);
        }
    }
};
/* EXPORT */
exports.default = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsbUNBQXFDO0FBQ3JDLHFEQUFtQztBQUNuQyx5QkFBMkI7QUFDM0IsdUNBQXlDO0FBQ3pDLGtDQUFvQztBQUNwQyx1QkFBeUI7QUFDekIsMENBQTRDO0FBQzVDLDhCQUFnQztBQUNoQyx5Q0FBMkM7QUFDM0MsdUNBQXlDO0FBQ3pDLDJCQUE2QjtBQUM3QixtQ0FBOEI7QUFDOUIsbUNBQXFDO0FBQ3JDLDJDQUE2QztBQUU3QyxXQUFXO0FBRVgsSUFBTSxLQUFLLEdBQUc7SUFFTixRQUFRLFlBQUcsSUFBSSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7Ozs7Ozs7d0JBSXpCLHFCQUFNLFFBQVEsQ0FBRyxJQUFJLENBQUUsRUFBQTs0QkFBOUIsc0JBQU8sU0FBdUIsRUFBQzs7O3dCQUkvQixzQkFBTyxRQUFRLEVBQUM7Ozs7O0tBSW5CO0lBRUQsTUFBTSxZQUFHLElBQUk7UUFFWCxNQUFNLENBQUMsR0FBRyxDQUFHLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBRSxDQUFDO0lBRXZDLENBQUM7SUFFRCxNQUFNLFlBQUcsSUFBSTtRQUVYLElBQUksQ0FBQztZQUNILEVBQUUsQ0FBQyxVQUFVLENBQUcsSUFBSSxDQUFFLENBQUM7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBRSxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7SUFFSCxDQUFDO0lBRUQsVUFBVSxFQUFFO1FBRVYsV0FBVyxZQUFHLFVBQWtCO1lBRTlCLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBRyxVQUFVLENBQUcs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