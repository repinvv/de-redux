"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const __1 = require("..");
const stringMap = {
    importLine: '{ stringMap }',
    path: 'hash-map'
};
function createImports(path, actions, reductions, state) {
    const actionsImport = {
        importLine: '* as actions',
        path: __1.createRelativePathToFile(actions, path)
    };
    const fieldImports = __1.createFieldImports(path, _.flatten(reductions.map(red => red.parameters)));
    return [actionsImport, stringMap, ...fieldImports];
}
exports.createImports = createImports;
function createChildReducerImports(path, children) {
    return children.map(child => ({
        importLine: `{ reducer as ${child.fieldName}Reducer, allActions as ${child.fieldName}Actions }`,
        path: __1.createRelativePathToFile(child.path, path)
    }));
}
exports.createChildReducerImports = createChildReducerImports;
//# sourceMappingURL=createImports.js.map