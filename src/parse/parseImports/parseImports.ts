import { Import, calculatePath } from '.';
import { execRegex } from '../../tools';
import * as _ from 'lodash';

const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;
export function parseImports(tsConfig: any, content: string, path: string): Import[] {
  const matches = execRegex(regex, content);
  const typeGroups = matches.map(match => parseMatch(tsConfig, match[1], match[2], path));
  return _.flatten(typeGroups);
}

function parseMatch(tsConfig: any, types: string, importline: string, path: string): Import[] {
  const importPath = calculatePath(tsConfig, path, importline);
  return types.split(',').map(type => createImport(type, importPath)).filter(x => x);
}

function createImport(type: string, importPath: string): Import {
  const parts = type.split(' ').filter(s => s.length);
  if (parts.length === 3 && parts[1] === 'as') {
    return {
      typeName: parts[0],
      aliasName: parts[2],
      importPath
    };
  } else if (parts.length > 0) {
    return {
      typeName: parts[0],
      aliasName: parts[0],
      importPath
    };
  }
}