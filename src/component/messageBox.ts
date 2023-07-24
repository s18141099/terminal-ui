import { options } from "../css.ts"

export class MessageBox {
    explanation: string
    message: string
    constructor({ explanation, message }: { explanation?: string, message: string }) {
        this.explanation = explanation || ""
        this.message = message
    }
    run = () => {
        if (this.explanation) console.log(`${options.bold(this.explanation)}`)
        console.log(`   ${this.message}`)
    }
}