// deno-lint-ignore-file no-explicit-any
import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts"
import { colors, options } from "../css.ts"
import { isOver } from "../check.ts"

type Config = {
    index?: number
    items?: any[]
    explanation?: string
}

export class SelectBox {
    private index: number
    items: any[]
    explanation: string
    private keyLocked: boolean
    constructor({ index, items, explanation }: Config) {
        this.index = index || 0
        this.items = items || []
        this.explanation = explanation || ""
        this.keyLocked = false
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

            if (i === selectedIndex) return console.log(colors.cyan(` > ${str}`))
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
            console.log(`${options.bold(this.explanation)}`)
            return relove(true)
        })
    }
}