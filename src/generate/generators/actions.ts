// -----------------------------------------------------------------------------
// <auto-generated>
//  this code was generated from a template.
//
//  manual changes to this file may cause unexpected behavior in your app.
//  manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
// -----------------------------------------------------------------------------
import { IActionsFile } from './IActionsFile'
import { actionGenerator } from './action';

export interface IGen {
    append: (text: string) => void;
    eol: () => void;
    forceEol: () => void;
}

class Gen {
    public indent: string = ''
    private lines: string[] = [];
    private eolPrinted: boolean = false;

    public append(text: string): void {
        if(this.eolPrinted) { this.lines.push(indent); }
        this.lines.push(text);
        this.eolPrinted = true;
    }

    public eol(): void {
        if(this.eolPrinted) {
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

function generate(file: IActionsFile): string {
    const gen = new Gen();
    generateContent(gen, file);
    return gen.toString();
}

function generateContent(gen: IGen, file: IActionsFile): string[] {
    const indent = gen.indent;
    for(let imp of file.imports) {
        gen.append('import { ');
        gen.append((imp.types).toString());
        gen.append(' } from '');
        gen.append((imp.path).toString());
        gen.append('';');
        gen.eol();
    }
    gen.forceEol();
}

export const generator{
    generate,
    generateContent
};
