[![npm](https://img.shields.io/npm/v/@marcelkloubert/strings.svg)](https://www.npmjs.com/package/@marcelkloubert/strings)
[![last build](https://img.shields.io/github/workflow/status/mkloubert/js-strings/Publish)](https://github.com/mkloubert/js-strings/actions?query=workflow%3APublish)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/mkloubert/js-strings/pulls)

# @marcelkloubert/strings

> String helpers, for [Node.js 14+](https://nodejs.org/en/blog/release/v14.0.0/) and the browser.

## Install

Execute the following command from your project folder, where your `package.json` file is stored:

```bash
npm i @marcelkloubert/strings
```

## Usage

### asString(value: any): string

```typescript
import { asString } from "@marcelkloubert/strings"

const myObject = {
  toString: () => "!!!myObject!!!",
};

asString(12)  // "12"
asString("")  // ""
asString(null)  // ""
asString(undefined)  // ""
asString(myObject)  // "!!!myObject!!!"
```

### format(formatStr: string. ...args: any[]): string

```typescript
import { format } from "@marcelkloubert/strings"

format("{1}, {0}", "Marcel", "Kloubert")  // "Kloubert, Marcel"
format("{1:lower,trim}, {0:upper}", "Marcel", "  kloubert  ")  // "kloubert, MARCEL"
format("{1}, {0} Joachim", null, undefined)  // "{1},  Joachim"
```

### formatArray(formatStr: string, args: List): string

```typescript
import { formatArray } from "@marcelkloubert/strings"

function* asGenerator(...args: any[]) {
  for (const a of args) {
    yield a;
  }
}

formatArray("{1}, {0}", ["Marcel", "Kloubert"])  // "Kloubert, Marcel"
formatArray("{1:lower,trim}, {0:upper}", asGenerator("Marcel", "  kloubert  "))  // "kloubert, MARCEL"
formatArray("{1}, {0} Joachim", [null, undefined])  // "{1},  Joachim"
```

### StringBuilder

```typescript
import { StringBuilder } from "@marcelkloubert/strings"

const str = new StringBuilder("Bar") // "Bar"
  .append("Foo") // "FooBar"
  .prependFormat("{1}, {0:upper,trim} ", "  Marcel  ", "Klbert") // "Klbert, MARCEL FooBar"
  .replace("MARCEL", "Tanja") // "Klbert, Tanja FooBar"
  .insert(2, "ou") // "Kloubert, Tanja FooBar"
  .clear() // ""

str.isEmpty // (true)
str.equals("") // (true)
str.equals(null) // (true)
str.equals(undefined) // (true)
```

## Documentation

The API documentation can be found [here](https://mkloubert.github.io/js-strings/).


## License

MIT © [Marcel Joachim Kloubert](https://github.com/mkloubert)

## Support and contribute

<span class="badge-paypal"><a href="https://paypal.me/MarcelKloubert" title="Donate to this project using PayPal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>
<span class="badge-patreon"><a href="https://patreon.com/mkloubert" title="Donate to this project using Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Patreon donate button" /></a></span>
<span class="badge-buymeacoffee"><a href="https://buymeacoffee.com/mkloubert" title="Donate to this project using Buy Me A Coffee"><img src="https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg" alt="Buy Me A Coffee donate button" /></a></span>

[Contribution guidelines](./CONTRIBUTE.md)
