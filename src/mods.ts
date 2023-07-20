import { ConfigSelectBox } from "./types.ts"
import { Confirm } from "./confirm.ts"
import { SelectBox } from "./selectBox.ts"

export default class Terminal {
    confirm = (explanation?: string) => new Confirm(explanation)
    selectBox = ({ index, items, explanation }: ConfigSelectBox) => new SelectBox({ index, items, explanation })
}