// -----------------------------------------------------------------------------
// <auto-generated>
//  this code was generated from a template.
//
//  manual changes to this file may cause unexpected behavior in your app.
//  manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
// -----------------------------------------------------------------------------

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

function generate(): string {
    const gen = new Gen();
    generateContent(gen);
    return gen.toString();
}

function generateContent(gen: any): void {
    const indent = gen.indent;
    gen.append('/* tslint:disable */');
    gen.eol();
    gen.append('// -----------------------------------------------------------------------------');
    gen.eol();
    gen.append('// <auto-generated>');
    gen.eol();
    gen.append('//  this code was generated from a template.');
    gen.eol();
    gen.append('//');
    gen.eol();
    gen.append('//  manual changes to this file may cause unexpected behavior in your app.');
    gen.eol();
    gen.append('//  manual changes to this file will be overwritten if the code is regenerated.');
    gen.eol();
    gen.append('// </auto-generated>');
    gen.eol();
    gen.append('// -----------------------------------------------------------------------------');
    gen.eol();
}

export const disclaimer = {
    generate,
    generateContent
};
