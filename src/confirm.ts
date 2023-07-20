import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts"
import { colors } from "./css.ts"

export class Confirm {
    flag: boolean
    explanation: string
    constructor(explanation?: string) {
        this.flag = true
        this.explanation = explanation || ""
    }
    run = () => {
        this.render(this.flag)
        return this.watchKeyPress()
    }
    private render = async (flag: boolean): Promise<void> => {
        await this.init()

        if (flag) return console.log(` ${colors.cyan(">OK")}   Cancel`)
        console.log(`  OK  ${colors.cyan(">Cancel")}`)
    }
    private watchKeyPress = async (): Promise<boolean | undefined> => {
        for await (const keypress of readKeypress()) {

            if (keypress.ctrlKey && keypress.key === 'c') Deno.exit(0)

            if (keypress.key === "return") return this.flag

            if (keypress.key === "right") {
                this.flag = false
                this.render(this.flag)
            }

            if (keypress.key === "left") {
                this.flag = true
                this.render(this.flag)
            }
        }
    }
    private init = () => {
        return new Promise(relove => {
            console.clear()
            console.log(this.explanation)
            return relove(true)
        })
    }
}