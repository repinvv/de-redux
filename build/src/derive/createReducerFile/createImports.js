"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const __2 = require("..");
function createImports(path, reductions, state) {
    const fieldImports = __2.createReductionImports(path, reductions);
    const reductionImports = __2.createTypeImports(path, reductions);
    return [...fieldImports, ...reductionImports, ...__2.createTypeImports(path, [state])];
}
exports.createImports = createImports;
function createImportsWithAction(path, reductions, state) {
    const actionsImport = __2.createActionsImport(path, __2.createActionFileName(state));
    return [actionsImport, ...createImports(path, reductions, state)];
}
exports.createImportsWithAction = createImportsWithAction;
function createReductionImport(path, reduction) {
    return {
        importLine: `{ ${reduction.name} }`,
        path: __1.createRelativePath(reduction.path, path)
    };
}
function createChildReducerImports(path, children) {
    return children.map(child => ({
        importLine: `{ ${child.stateName}Reducer, ${child.stateName}Reduceable, ${child.stateName}Init }`,
        path: __1.createRelativePathToFile(child.path, path)
    }));
}
exports.createChildReducerImports = createChildReducerImports;
//# sourceMappingURL=createImports.js.map