// deno-lint-ignore-file no-explicit-any
import { ConfigSelectBox } from "./types.ts"
import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts"
import { colors } from "./css.ts"
import { isOver } from "./check.ts"

export class SelectBox {
    items: any[]
    index: number
    explanation: string
    constructor({ index, items, explanation }: ConfigSelectBox) {
        this.index = index || 0
        this.items = items || []
        this.explanation = explanation || ""
    }
    run = () => {
        this.render(this.items, this.index)
        return this.watchKeyPress()
    }
    private render = async (items: Record<any, any>[], selectedIndex: number): Promise<void> => {
        await this.init()

        items.forEach((option, i) => {
            let str = ""

            Object.values(option).forEach(v => str += `${v} `)

            if (i === selectedIndex) return console.log(colors.cyan(` > ${str}\r`))
            console.log(`   ${str}`)
        })
    }
    private watchKeyPress = async (): Promise<any | undefined> => {
        for await (const keypress of readKeypress()) {

            if (keypress.ctrlKey && keypress.key === 'c') Deno.exit(0)

            if (keypress.key === "return") {
                return this.items[this.index]
            }

            if (keypress.key === "up") {
                if (isOver(this.index - 1, this.items.length)) continue
                this.render(this.items, --this.index)
            }

            if (keypress.key === "down") {
                if (isOver(this.index + 1, this.items.length)) continue
                this.render(this.items, ++this.index)
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