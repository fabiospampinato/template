/* HELPER */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function helper(exp, options) {
    var regex = /\${(\S+)}/g, compiled = exp.replace(regex, function (match, pull) { return options.hash[pull]; });
    return eval(compiled);
}
/* EXPORT */
exports.default = helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2V2YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsWUFBWTs7O0FBRVosZ0JBQWtCLEdBQUcsRUFBRSxPQUFPO0lBRTVCLElBQU0sS0FBSyxHQUFHLFlBQVksRUFDcEIsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUcsS0FBSyxFQUFFLFVBQUUsS0FBSyxFQUFFLElBQUksSUFBTSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQWxCLENBQWtCLENBQUUsQ0FBQztJQUU5RSxNQUFNLENBQUMsSUFBSSxDQUFHLFFBQVEsQ0FBRSxDQUFDO0FBRTNCLENBQUM7QUFFRCxZQUFZO0FBRVosa0JBQWUsTUFBTSxDQUFDIn0=