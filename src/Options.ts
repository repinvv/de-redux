export enum Quotes {
  single = 'single',
  double = 'double'
}
export interface Options {
  path: string;
  tsconfig?: any;
  generateRootIn?: string;
  rootStateName?: string;
}
