"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_map_1 = require("hash-map");
const _1 = require(".");
function createTree(options, states) {
    const statesById = hash_map_1.toStringMap(states, state => state.id);
    const tree = _1.mapTree(states.map(state => _1.createNode(state, statesById)));
    return _1.populateParentIds(tree);
}
exports.createTree = createTree;
//# sourceMappingURL=createTree.js.map