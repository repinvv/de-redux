import { State, Reduction, Field, Type } from '../../parse/model';
import { Tree } from '../tree';
import { Import } from '../model';
import * as _ from 'lodash';
import { createRelativePath, createRelativePathToFile, needActionsFile } from '..';
import { createReductionImports, createTypeImports, createActionsImport, createActionFileName } from '..';
import { trimFilename } from '../../tools';
import { ActionsFile, ChildReducer } from '../model';

export function createImports(path: string, reductions: Reduction[], state: State): Import[] {
  const fieldImports = createReductionImports(path, reductions);
  const reductionImports = createTypeImports(path, reductions);
  return [...fieldImports, ...reductionImports, ...createTypeImports(path, [state])];
}

export function createImportsWithAction(path: string, reductions: Reduction[], state: State): Import[] {
  const actionsImport = createActionsImport(path, createActionFileName(state));
  return [actionsImport, ...createImports(path, reductions, state)];
}

function createReductionImport(path: string, reduction: Reduction): Import {
  return {
    importLine: `{ ${reduction.name} }`,
    path: createRelativePath(reduction.path, path)
  };
}

export function createChildReducerImports(path: string, children: ChildReducer[]): Import[] {
  return children.map(child => ({
    importLine:
    `{ ${child.stateName}Reducer, ${child.stateName}Reduceable, ${child.stateName}Init }`,
    path: createRelativePathToFile(child.path, path)
  }));
}
