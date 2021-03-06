// -----------------------------------------------------------------------------
// <auto-generated>
//  this code was generated from a template.
//
//  manual changes to this file may cause unexpected behavior in your app.
//  manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
// -----------------------------------------------------------------------------
import { DispatcherAction } from '../../../derive/model';

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

function generate(action: DispatcherAction): string {
    const gen = new Gen();
    generateContent(gen, action);
    return gen.toString();
}

function generateContent(gen: any, action: DispatcherAction): void {
    const indent = gen.indent;
    gen.append((action.name).toString());
    gen.append('(');
    gen.append((action.fullParameters).toString());
    gen.append('): void {');
    gen.eol();
    gen.append('  this.service.dispatch(new actions.');
    gen.append((action.actionName).toString());
    gen.append('(');
    gen.append((action.parameters).toString());
    gen.append('));');
    gen.eol();
    gen.append('}');
    gen.eol();
}

export const dispatcherActionGenerator = {
    generate,
    generateContent
};
