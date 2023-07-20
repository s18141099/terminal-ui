// deno-lint-ignore-file no-explicit-any
import { Confirm } from "./confirm.ts"
import { SelectBox } from "./selectBox.ts"

export default class Terminal {
    confirm = (explanation?: string) => new Confirm(explanation)
    selectBox = ({ index, items, explanation }: {
        index?: number | undefined
        items?: any[] | undefined
        explanation?: string | undefined
    }) => new SelectBox({ index, items, explanation })
}