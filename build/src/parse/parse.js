"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const _1 = require(".");
const tools_1 = require("../tools");
const collectRedux_1 = require("./collectRedux");
const constants_1 = require("../constants");
function parseFiles(options, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fse.readdir(path);
        const promises = files.map(file => collectFile(options, path, file));
        const models = yield Promise.all(promises);
        return _1.mergeModels(models.filter(model => model));
    });
}
exports.parseFiles = parseFiles;
function read(path, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return fse.readFile(tools_1.combinePath(path, file), 'utf8');
    });
}
function collectFile(options, path, file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield tools_1.isDirectory(tools_1.combinePath(path, file))) {
            return yield parseFiles(options, tools_1.combinePath(path, file));
        }
        if (file.endsWith(constants_1.constants.stateExt)) {
            const content = yield read(path, file);
            const imp = yield _1.createFileImport(path, file);
            const states = collectRedux_1.collectState(options, imp, file, content);
            return { reductions: [], states };
        }
        if (file.endsWith(constants_1.constants.reductionExt)) {
            const content = yield read(path, file);
            const imp = yield _1.createFileImport(path, file);
            const reductions = collectRedux_1.collectReduction(options, imp, file, content);
            return { reductions, states: [] };
        }
        return null;
    });
}
//# sourceMappingURL=parse.js.map