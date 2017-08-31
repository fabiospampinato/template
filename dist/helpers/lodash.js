/* IMPORT */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/* HELPER */
function helper(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return _[fn].apply(_, args);
}
/* EXPORT */
exports.default = helper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9kYXNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvbG9kYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLFlBQVk7OztBQUVaLDBCQUE0QjtBQUU1QixZQUFZO0FBRVosZ0JBQWtCLEVBQUU7SUFBRSxjQUFPO1NBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztRQUFQLDZCQUFPOztJQUUzQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFMLENBQUMsRUFBUyxJQUFJLEVBQUc7QUFFMUIsQ0FBQztBQUVELFlBQVk7QUFFWixrQkFBZSxNQUFNLENBQUMifQ==