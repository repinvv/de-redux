import { ReducerFile, ChildReducer, ActionsFile } from '../model';
import { State, Reduction } from '../../parse/model';
import { Tree, NodeChild } from '../tree';
import { createReducerFileName, isInit } from '..';
import { constants } from '../../constants';
import { createImports, createImportsWithAction, createChildReducerImports } from '.';
import { createReducerAction, createExportedActions, createInitFields } from '.';
import { trimFilename } from '../../tools';
import { needReducerFile, needActionsFile } from '..';


export function createReducerFile(state: State, tree: Tree): ReducerFile {
  const reducerFile = createReducerFileName(state);
  const node = tree.nodesById.get(state.id);
  if (!needReducerFile(state.id, tree)) {
    return createUnlink(reducerFile);
  }

  const needActions = needActionsFile(state.id, tree);
  const reductions = tree.reductionMap.get(state.id) || [];
  const path = trimFilename(reducerFile);
  const childReducers = node.children
    .filter(child => needReducerFile(child.childStateId, tree))
    .map(child => createChildReducer(child, tree));
  const imports = needActions
    ? createImportsWithAction(path, reductions, state)
    : createImports(path, reductions, state);
  const childImports = createChildReducerImports(path, childReducers);
  const exportedActions = createExportedActions(childReducers);
  if (needActions) {
    exportedActions.push('actions.' + state.name + 'Actions');
  }
  const needInit = !reductions.some(red => isInit(red));
  const initFields = needInit ? createInitFields(node, tree) : [];
  return {
    reducerFile,
    unlink: false,
    stateName: state.name,
    imports: [...imports, ...childImports],
    actions: reductions.filter(r => !isInit(r)).map(r => createReducerAction(r)),
    childReducers,
    exportedActions,
    initFields
  };
}

function createUnlink(file: string): ReducerFile {
  return {
    reducerFile: file,
    unlink: true,
    stateName: null,
    imports: null,
    actions: null,
    childReducers: null,
    exportedActions: null,
    initFields: null
  };
}

function createChildReducer(child: NodeChild, tree: Tree): ChildReducer {
  const childState = tree.nodesById.get(child.childStateId).state;
  return {
    fieldName: child.fieldName,
    stateName: childState.name,
    path: createReducerFileName(childState)
  };
}
