import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts"
import { colors, options } from "../css.ts"

export class Prompt {
    explanation: string
    placeholder: string
    private output: string
    constructor({ explanation, placeholder }: { explanation?: string, placeholder?: string }) {
        this.explanation = explanation || ""
        this.placeholder = placeholder || ""
        this.output = ""
    }
    run = () => {
        this.render(this.output)
        return this.watchKeyPress()
    }
    private async render(str: string) {
        await this.init()
        console.log(`   ${colors.cyan(options.light(">"))}  ${colors.cyan(str)}`)
    }
    private watchKeyPress = async (): Promise<string | undefined> => {
        for await (const keypress of readKeypress()) {
            if (!keypress.key) continue

            if (keypress.ctrlKey && keypress.key === 'c') Deno.exit(0)

            if (keypress.key === "return") {
                return this.output
            }

            if (keypress.key === "backspace") {
                this.output = this.output.slice(0, this.output.length - 1)
                this.render(this.output)
            }

            if (keypress.key.search(/\w{2,}/g) < 0) {
                this.output += keypress.key
                this.render(this.output)
            }
        }
    }
    private init = () => {
        return new Promise(relove => {
            console.clear()
            console.log(`${options.bold(this.explanation)}`)
            return relove(true)
        })
    }
}