export { isOver }

function isOver(n: number, max: number): boolean {
    if (n >= max) return true
    if (n < 0) return true

    return false
}