// -----------------------------------------------------------------------------
// <auto-generated>
//  this code was generated from a template.
//
//  manual changes to this file may cause unexpected behavior in your app.
//  manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
// -----------------------------------------------------------------------------
import { RootStateFile } from '../../../derive/model';
import { importsGenerator, disclaimer, isLast } from '..';

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

function generate(file: RootStateFile): string {
    const gen = new Gen();
    generateContent(gen, file);
    return gen.toString();
}

function generateContent(gen: any, file: RootStateFile): void {
    const indent = gen.indent;
    gen.indent = indent + '';
    disclaimer.generateContent(gen);
    gen.indent = indent;
    gen.eol();
    gen.indent = indent + '';
    importsGenerator.generateContent(gen, file.imports);
    gen.indent = indent;
    gen.eol();
    gen.append('export interface ');
    gen.append((file.state.name).toString());
    gen.append(' {');
    gen.eol();
    for (let field of file.state.fields) {
        gen.append('  ');
        gen.append((field.name).toString());
        gen.append(': ');
        gen.append((field.typename).toString());
        gen.append(';');
        gen.eol();
    }
    gen.append('}');
    gen.eol();
}

export const rootStateGenerator = {
    generate,
    generateContent
};
