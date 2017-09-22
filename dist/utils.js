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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFWiwwQkFBNEI7QUFDNUIsbUNBQXFDO0FBQ3JDLHFEQUFtQztBQUNuQyx5QkFBMkI7QUFDM0IsdUNBQXlDO0FBQ3pDLGtDQUFvQztBQUNwQyx1QkFBeUI7QUFDekIsMENBQTRDO0FBQzVDLDhCQUFnQztBQUNoQyx5Q0FBMkM7QUFDM0MsMkJBQTZCO0FBQzdCLG1DQUE4QjtBQUM5QixtQ0FBcUM7QUFDckMsMkNBQTZDO0FBRTdDLFdBQVc7QUFFWCxJQUFNLEtBQUssR0FBRztJQUVOLFFBQVEsWUFBRyxJQUFJLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTs7Ozs7Ozt3QkFJekIscUJBQU0sUUFBUSxDQUFHLElBQUksQ0FBRSxFQUFBOzRCQUE5QixzQkFBTyxTQUF1QixFQUFDOzs7d0JBSS9CLHNCQUFPLFFBQVEsRUFBQzs7Ozs7S0FJbkI7SUFFRCxNQUFNLFlBQUcsSUFBSTtRQUVYLE1BQU0sQ0FBQyxHQUFHLENBQUcsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFFLENBQUM7SUFFdkMsQ0FBQztJQUVELE1BQU0sWUFBRyxJQUFJO1FBRVgsSUFBSSxDQUFDO1lBQ0gsRUFBRSxDQUFDLFVBQVUsQ0FBRyxJQUFJLENBQUUsQ0FBQztZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFFLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDYixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUVILENBQUM7SUFFRCxVQUFVLEVBQUU7UUFFVixXQUFXLFlBQUcsVUFBa0I7WUFFOUIsRUFBRSxDQUFDLENBQUUsS0FBSyxDQUFHLFVBQVUsQ0FBRyxDQUFDLENBQUMsQ0FB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