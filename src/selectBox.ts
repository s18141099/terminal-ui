// deno-lint-ignore-file no-explicit-any
import { ConfigSelectBox } from "./types.ts"
import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts"
import { colors } from "./css.ts"
import { isOver } from "./check.ts"

export class SelectBox {
    index: number
    items: any[]
    explanation: string
    renderRange: number
    keyLocked: boolean
    constructor({ index, items, explanation }: ConfigSelectBox) {
        this.index = index || 0
        this.items = items || []
        this.explanation = explanation || ""
        this.renderRange = 2
        this.keyLocked = false
    }
    run = () => {
        this.render(this.items, this.index)
        return this.watchKeyPress()
    }
    private render = async (items: Record<any, any>[], selectedIndex: number): Promise<void> => {
        await this.init()

        const isStart = selectedIndex > 0

        const min = isStart
            ? selectedIndex - 1
            : 0
        const max = isStart
            ? selectedIndex + this.renderRange
            : selectedIndex + this.renderRange + 1
        const sliced = items.slice(min, max)

        sliced.forEach((option, i) => {
            let str = ""
            Object.values(option).forEach(v => str += `${v} `)

            if (isStart) {
                if (i === 1) return console.log(colors.cyan(` > ${str}\r`))
            } else {
                if (i === selectedIndex) return console.log(colors.cyan(` > ${str}\r`))
            }

            console.log(`   ${str}`)
        })
    }
    private watchKeyPress = async (): Promise<any | undefined> => {
        for await (const keypress of readKeypress()) {
            if (this.keyLocked) continue
            this.keyLocked = true

            if (keypress.ctrlKey && keypress.key === 'c') Deno.exit(0)

            if (keypress.key === "return") {
                this.keyLocked = false
                return this.items[this.index]
            }

            if (keypress.key === "up") {
                if (isOver(this.index - 1, this.items.length)) {
                    this.keyLocked = false
                    continue
                }
                this.render(this.items, --this.index)
            }

            if (keypress.key === "down") {
                if (isOver(this.index + 1, this.items.length)) {
                    this.keyLocked = false
                    continue
                }
                this.render(this.items, ++this.index)
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