import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts"
import { colors } from "./css.ts"

export class Confirm {
    explanation: string
    isOk: boolean
    keyLocked: boolean
    constructor({ explanation }: { explanation?: string }) {
        this.explanation = explanation || ""
        this.isOk = true
        this.keyLocked = false
    }
    run = () => {
        this.render(this.isOk)
        return this.watchKeyPress()
    }
    private render = async (isOk: boolean): Promise<void> => {
        await this.init()

        if (isOk) return console.log(` ${colors.cyan("> OK")}    Cancel`)
        console.log(`   OK  ${colors.cyan("> Cancel")}`)
    }
    private watchKeyPress = async (): Promise<boolean | undefined> => {
        for await (const keypress of readKeypress()) {
            if (this.keyLocked) continue
            this.keyLocked = true

            if (keypress.ctrlKey && keypress.key === 'c') Deno.exit(0)

            if (keypress.key === "return") {
                this.keyLocked = false
                return this.isOk
            }

            if (keypress.key === "right") {
                this.isOk = false
                await this.render(this.isOk)
            }

            if (keypress.key === "left") {
                this.isOk = true
                await this.render(this.isOk)
            }

            this.keyLocked = false
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