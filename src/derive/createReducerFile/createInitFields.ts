import { Tree, TreeNode } from '../tree';
import { Field } from '../../parse/model';
import { InitField } from '../model';
import { needReducerFile } from '..';

export function createInitFields(node: TreeNode, tree: Tree): InitField[] {
  const children: InitField[] = node.children.map(child => ({
    field: child.fieldName,
    isNull: !needReducerFile(child.childStateId, tree)
  }));
  const fields: InitField[] = node.state.fields
    .filter(field => !isChild(field, node))
    .map(field => ({ field: field.name, isNull: true }));
  return [...children, ...fields];
}

function isChild(field: Field, node: TreeNode): boolean {
  return node.children.some(child => child.fieldName === field.name);
}
