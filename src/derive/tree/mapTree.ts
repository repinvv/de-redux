import { Tree, TreeNode, NodeChild } from '.';
import { map } from 'maptools';
import { State, Field } from '../../parse/model';

export function mapTree(nodes: TreeNode[], rootState?: State): Tree {
  return {
    nodes,
    nodesById: map(nodes, node => node.state.id),
    rootState
  };
}
