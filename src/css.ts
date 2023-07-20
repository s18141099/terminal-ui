const reset = "\x1b[0m"

export const colors = {
    black: function (str: string) {
        return `\x1b[30m${str}${reset}`
    },
    red: function (str: string) {
        return `\x1b[31m${str}${reset}`
    },
    green: function (str: string) {
        return `\x1b[32m${str}${reset}`
    },
    yellow: function (str: string) {
        return `\x1b[33m${str}${reset}`
    },
    blue: function (str: string) {
        return `\x1b[34m${str}${reset}`
    },
    magenta: function (str: string) {
        return `\x1b[35m${str}${reset}`
    },
    cyan: function (str: string) {
        return `\x1b[36m${str}${reset}`
    },
    white: function (str: string) {
        return `\x1b[37m${str}${reset}`
    },
    default: "\x1b[39m",
}

export const bgColors = {
    black: function (str: string) {
        return `\x1b[40m${str}${reset}`
    },
    red: function (str: string) {
        return `\x1b[41m${str}${reset}`
    },
    green: function (str: string) {
        return `\x1b[42m${str}${reset}`
    },
    yellow: function (str: string) {
        return `\x1b[43m${str}${reset}`
    },
    blue: function (str: string) {
        return `\x1b[44m${str}${reset}`
    },
    magenta: function (str: string) {
        return `\x1b[45m${str}${reset}`
    },
    cyan: function (str: string) {
        return `\x1b[46m${str}${reset}`
    },
    white: function (str: string) {
        return `\x1b[47m${str}${reset}`
    },
}

export const options = {
    bold: function (str: string) {
        return `\x1b[1m${str}${reset}`
    },
    light: function (str: string) {
        return `\x1b[2m${str}${reset}`
    },
    italic: function (str: string) {
        return `\x1b[3m${str}${reset}`
    },
    underline: function (str: string) {
        return `\x1b[4m${str}${reset}`
    },
    blink: function (str: string) {
        return `\x1b[5m${str}${reset}`
    },
    highBlink: function (str: string) {
        return `\x1b[6m${str}${reset}`
    },
    reverse: function (str: string) {
        return `\x1b[7m${str}${reset}`
    },
    strikeout: function (str: string) {
        return `\x1b[0m${str}${reset}`
    }
}