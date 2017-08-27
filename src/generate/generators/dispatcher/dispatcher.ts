// -----------------------------------------------------------------------------
// <auto-generated>
//  this code was generated from a template.
//
//  manual changes to this file may cause unexpected behavior in your app.
//  manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
// -----------------------------------------------------------------------------
import { DispatcherFile } from '../../../derive/model';
import { importsGenerator, disclaimer, isLast } from '..';
import { dispatcherActionGenerator } from '.';

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

function generate(file: DispatcherFile): string {
    const gen = new Gen();
    generateContent(gen, file);
    return gen.toString();
}

function generateContent(gen: any, file: DispatcherFile): void {
    const indent = gen.indent;
    gen.indent = indent + '';
    disclaimer.generateContent(gen);
    gen.indent = indent;
    gen.eol();
    gen.indent = indent + '';
    importsGenerator.generateContent(gen, file.imports);
    gen.indent = indent;
    gen.eol();
    gen.eol();
    gen.append('export interface IAction { type: string; }');
    gen.eol();
    gen.append('export interface IReduxService {');
    gen.eol();
    gen.append('  dispatch: (action: IAction) => void;');
    gen.eol();
    if (file.canSubscribe) {
        gen.append('  getState: () => ');
        gen.append((file.rootStateName).toString());
        gen.append(';');
        gen.eol();
        gen.append('  subscribe: (subscription: (state: ');
        gen.append((file.rootStateName).toString());
        gen.append(') => void) => void;');
        gen.eol();
    }
    gen.append('}');
    gen.eol();
    if (file.canSubscribe) {
        gen.append('export function selector(state: ');
        gen.append((file.rootStateName).toString());
        gen.append('): ');
        gen.append((file.stateName).toString());
        gen.append(' {');
        gen.eol();
        gen.append('  return state');
        gen.append((file.traceToRoot).toString());
        gen.append(';');
        gen.eol();
        gen.append('}');
        gen.eol();
    }
    gen.eol();
    gen.append('export class ');
    gen.append((file.stateName).toString());
    gen.append('DispatcherImpl {');
    gen.eol();
    gen.append('  constructor(private service: IReduxService) {');
    gen.eol();
    gen.append('  }');
    gen.eol();
    gen.forceEol();
    if (file.canSubscribe) {
        gen.append('  getState(): ');
        gen.append((file.stateName).toString());
        gen.append(' {');
        gen.eol();
        gen.append('    return selector(this.service.getState());');
        gen.eol();
        gen.append('  }');
        gen.eol();
        gen.forceEol();
        gen.append('  subscribe(subscription: (state: ');
        gen.append((file.stateName).toString());
        gen.append(') => void): void {');
        gen.eol();
        gen.append('    this.service.subscribe(state => subscription(selector(state)));');
        gen.eol();
        gen.append('  }');
        gen.eol();
        gen.forceEol();
    }
    for (let action of file.actions) {
        gen.indent = indent + '  ';
        dispatcherActionGenerator.generateContent(gen, action, file);
        gen.indent = indent;
        gen.eol();
    }
    gen.append('}');
}

export const dispatcherGenerator = {
    generate,
    generateContent
};
