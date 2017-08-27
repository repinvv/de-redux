// -----------------------------------------------------------------------------
// <auto-generated>
//  this code was generated from a template.
//
//  manual changes to this file may cause unexpected behavior in your app.
//  manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
// -----------------------------------------------------------------------------
import { ReducerFile } from '../../derive/model';
import { importsGenerator, disclaimer, isLast } from '.';
import { reducerActionGenerator, childReducerGenerator } from '.';
import { stringMap } from 'hash-map';

class Gen {
    public indent: string = '';
    private lines: string[] = [];
    private eolPrinted: boolean = true;

    public append(text: string): void {
        if (this.eolPrinted) { this.lines.push(this.indent); }
        this.lines.push(text);
        this.eolPrinted = false;
    }

    public eol(): void {
        if (this.eolPrinted) {
            return;
        }
        this.eolPrinted = true;
        this.lines.push('\n');
    }

    public forceEol(): void {
        this.eolPrinted = true;
        this.lines.push('\n');
    }

    public toString(): string {
        return this.lines.join('');
    }
}

function generate(file: ReducerFile): string {
    const gen = new Gen();
    generateContent(gen, file);
    return gen.toString();
}

function generateContent(gen: any, file: ReducerFile): void {
    const indent = gen.indent;
    gen.indent = indent + '';
    disclaimer.generateContent(gen);
    gen.indent = indent;
    gen.eol();
    gen.indent = indent + '';
    importsGenerator.generateContent(gen, file.imports);
    gen.indent = indent;
    gen.eol();
    gen.append('export type IAction =  { type: string };');
    gen.eol();
    gen.forceEol();
    gen.append('type actor = (prev: ');
    gen.append((file.stateName).toString());
    gen.append(', action: IAction) => ');
    gen.append((file.stateName).toString());
    gen.append(';');
    gen.eol();
    gen.append('const map = stringMap<actor>();');
    gen.eol();
    for (let child of file.childReducers) {
        gen.forceEol();
        gen.indent = indent + '';
        childReducerGenerator.generateContent(gen, child, file);
        gen.indent = indent;
        gen.eol();
    }
    for (let action of file.actions) {
        gen.forceEol();
        gen.indent = indent + '';
        reducerActionGenerator.generateContent(gen, action, file);
        gen.indent = indent;
        gen.eol();
    }
    gen.forceEol();
    gen.append('export function reducer(prev: ');
    gen.append((file.stateName).toString());
    gen.append(', action: IAction): ');
    gen.append((file.stateName).toString());
    gen.append(' {');
    gen.eol();
    gen.append('  const specificReducer = map[action.type];');
    gen.eol();
    gen.append('  return (specificReducer && specificReducer(prev, action)) || prev;');
    gen.eol();
    gen.append('}');
    gen.eol();
    gen.forceEol();
    gen.append('export const allActions = actions.allActions;');
    gen.eol();
}

export const reducerGenerator = {
    generate,
    generateContent
};
