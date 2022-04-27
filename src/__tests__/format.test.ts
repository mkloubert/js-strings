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

import { format } from "..";

const strings = [{
  formatStr: "{1}, {0}",
  args: ["Marcel", "Kloubert"],
  expected: "Kloubert, Marcel"
}, {
  formatStr: "{1}, {0}",
  args: [undefined, "Kloubert"],
  expected: "Kloubert, {0}"
}, {
  formatStr: "{1}, {0}",
  args: ["Marcel", null],
  expected: ", Marcel"
}, {
  formatStr: "{1:upper,trim}, {0:lower}",
  args: ["Marcel", " Kloubert  "],
  expected: "KLOUBERT, marcel"
}];

describe("format() function", () => {
  it.each(strings)("should make a string from a format string with arguments", (str) => {
    const { formatStr, args, expected } = str;

    const result = format(formatStr, ...args);

    expect(typeof result).toBe("string");

    expect(result).toBe(expected);
  });
});
