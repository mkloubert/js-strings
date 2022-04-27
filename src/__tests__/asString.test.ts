/*******************************************************************************
  The MIT License (MIT)

  Copyright (c) 2022-present Marcel Joachim Kloubert

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*******************************************************************************/

import { asString } from "..";

interface Value {
  value: any;
  expected: string | ((resultValue: any) => boolean);
}

const values: Value[] = [{
  value: null,
  expected: ""
}, {
  value: undefined,
  expected: ""
}, {
  value: false,
  expected: "false"
}, {
  value: true,
  expected: "true"
}, {
  value: 666,
  expected: "666"
}, {
  value: Symbol("Foo"),
  expected: "Symbol(Foo)"
}, {
  value: {
    toString: () => "!!!fOO!!!"
  },
  expected: "!!!fOO!!!"
}, {
  value: new Error("Foo error"),
  expected: (value: string) => {
    return value.startsWith(`ERROR [Error]: Foo error`);
  },
}];

describe("asString() function", () => {
  it.each(values)("should make a string from a value", (item) => {
    const { value, expected } = item;

    const result = asString(value);

    expect(typeof result).toBe("string");

    if (typeof expected === "function") {
      expect(expected(result)).toBe(true);
    } else {
      expect(result).toBe(expected);
    }
  });
});
