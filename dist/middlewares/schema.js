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
var isBinary = require("isbinaryfile");
var path = require("path");
var config_1 = require("../config");
var utils_1 = require("../utils");
/* SCHEMA */
function schema(files, metalsmith, next) {
    return __awaiter(this, void 0, void 0, function () {
        var source, templatePath, template, templateSchema, filter, filesVariables, filesSchema, computerConfig, computerSchema, metadata, schema;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    source = metalsmith.source(), templatePath = path.dirname(source), template = path.basename(templatePath);
                    return [4 /*yield*/, utils_1.default.loadJSON(path.join(templatePath, config_1.default.templateConfigName))];
                case 1:
                    templateSchema = _a.sent(), filter = templateSchema.filter;
                    filesVariables = {}, filesSchema = { variables: filesVariables };
                    _.forOwn(files, function (file, filepath) {
                        if (utils_1.default.template.isFileSkipped(filepath, filter))
                            return;
                        var contents = file.contents;
                        if (isBinary.sync(contents, contents.length))
                            return;
                        var fileSchema = utils_1.default.handlebars.getSchema(contents.toString());
                        _.extend(filesVariables, fileSchema);
                    });
                    return [4 /*yield*/, utils_1.default.loadJSON(path.join(config_1.default.directory, config_1.default.templateConfigName))];
                case 2:
                    computerConfig = _a.sent(), computerSchema = _.get(computerConfig, "templates." + template);
                    metadata = metalsmith.metadata(), schema = _.merge(filesSchema, templateSchema, computerSchema);
                    metadata.schema = schema;
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
;
/* EXPORT */
exports.default = schema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZGRsZXdhcmVzL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVaLDBCQUE0QjtBQUM1Qix1Q0FBeUM7QUFDekMsMkJBQTZCO0FBQzdCLG9DQUErQjtBQUMvQixrQ0FBNkI7QUFFN0IsWUFBWTtBQUVaLGdCQUF3QixLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUk7O1lBSXZDLE1BQU0sRUFDTixZQUFZLEVBQ1osUUFBUSwwQkFTUixjQUFjLEVBQ2QsV0FBVyxrQ0F1QlgsUUFBUSxFQUNSLE1BQU07Ozs7NkJBcENHLFVBQVUsQ0FBQyxNQUFNLEVBQUcsaUJBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBRyxNQUFNLENBQUUsYUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBRyxZQUFZLENBQUU7b0JBSXhCLHFCQUFNLGVBQUssQ0FBQyxRQUFRLENBQUcsSUFBSSxDQUFDLElBQUksQ0FBRyxZQUFZLEVBQUUsZ0JBQU0sQ0FBQyxrQkFBa0IsQ0FBRSxDQUFFLEVBQUE7O3FDQUE5RSxTQUE4RSxXQUNwRixjQUFjO3FDQUlSLEVBQUUsZ0JBQ0wsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFO29CQUVqRCxDQUFDLENBQUMsTUFBTSxDQUFHLEtBQUssRUFBRSxVQUFFLElBQUksRUFBRSxRQUFRO3dCQUVoQyxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBRyxRQUFRLEVBQUUsTUFBTSxDQUFHLENBQUM7NEJBQUMsTUFBTSxDQUFDO3dCQUV6RCxJQUFBLHdCQUFRLENBQVM7d0JBRXhCLEVBQUUsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUcsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUcsQ0FBQzs0QkFBQyxNQUFNLENBQUM7d0JBRTFELElBQU0sVUFBVSxHQUFHLGVBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUcsQ0FBRSxDQUFDO3dCQUV2RSxDQUFDLENBQUMsTUFBTSxDQUFHLGNBQWMsRUFBRSxVQUFVLENBQUUsQ0FBQztvQkFFMUMsQ0FBQyxDQUFDLENBQUM7b0JBSW9CLHFCQUFNLGVBQUssQ0FBQyxRQUFRLENBQUcsSUFBSSxDQUFDLElBQUksQ0FBRyxnQkFBTSxDQUFDLFNBQVMsRUFBRSxnQkFBTSxDQUFDLGtCQUFrQixDQUFFLENBQUUsRUFBQTs7cUNBQWxGLFNBQWtGLG1CQUNsRixDQUFDLENBQUMsR0FBRyxDQUFHLGNBQWMsRUFBRSxlQUFhLFFBQVUsQ0FBRTsrQkFJdkQsVUFBVSxDQUFDLFFBQVEsRUFBRyxXQUN4QixDQUFDLENBQUMsS0FBSyxDQUFHLFdBQVcsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFFO29CQUV0RSxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFFekIsSUFBSSxFQUFHLENBQUM7Ozs7O0NBRVQ7QUFBQSxDQUFDO0FBRUYsWUFBWTtBQUVaLGtCQUFlLE1BQU0sQ0FBQyJ9