# Terminal UI
## _This is a UI library that can be used on a terminal._

It includes several components and CSS options.

- SelectBox
- MessageBox
- Confirm
- Prompt

## Installation

Dillinger requires [Deno](https://deno.land/)  to run.
```js
import { Confirm, SelectBox, Prompt, colors } from "https://raw.githubusercontent.com/s18141099/terminal-ui/main/src/mods.ts"
```

### SelectBox
```js
const selectBox = new SelectBox({
    explanation: `What is your favorite fruit${colors.green("?")}`,
    items: ["apple", "banana", "cherry"]
})

console.log(await selectBox.run())
```
```sh
What is your favorite fruit?
 > apple
   banana
   cherry
```

### Confirm
```js
const confirm = new Confirm({
    explanation: `Is it really okay${colors.green("?")}`
})

console.log(await confirm.run())
```
```sh
Is it really okay?
 > OK    Cancel
```

### Prompt
```js
const prompt = new Prompt({
    explanation: `What is your name${colors.green("?")}`
})

console.log(await prompt.run())
```
```sh
What is your name?
 > 
```

## License
MIT
