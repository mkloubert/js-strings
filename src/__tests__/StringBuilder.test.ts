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

import { StringBuilder } from "../classes";
import { asString } from "../functions";

interface Value {
  value: any;
}

const values: Value[] = [{
  value: "Foo",
}, {
  value: 5979,
}, {
  value: true,
}, {
  value: false,
}, {
  value: null,
}, {
  value: undefined,
}];

describe("StringBuilder class", () => {
  it.each(values)("should work with append() method", async ({ value }) => {
    const expected = asString(value);

    const str = new StringBuilder()
      .append(value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with appendFormat() method", async ({ value }) => {
    const prefix = "Foo: ";
    const expected = prefix +
      (value !== undefined ? asString(value) : "{0}");

    const str = new StringBuilder()
      .appendFormat(prefix + "{0}", value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with appendFormatArray() method", async ({ value }) => {
    const prefix = "Foo: ";
    const expected = prefix +
      (value !== undefined ? asString(value) : "{0}");

    const str = new StringBuilder()
      .appendFormatArray(prefix + "{0}", [value])
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with appendFormatArray() method", async ({ value }) => {
    const initialValue = "Foo: ";
    const separator = " + ";
    const expected = initialValue + asString(value);

    const str = new StringBuilder(initialValue)
      .appendJoin(separator, value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with appendJoin() method", async ({ value }) => {
    const initialValue = "Foo: ";
    const separator = " + ";
    const expected = initialValue + asString(value);

    const str = new StringBuilder(initialValue)
      .appendJoin(separator, value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with appendJoinArray() method", async ({ value }) => {
    const initialValue = "Foo: ";
    const separator = " + ";
    const expected = initialValue + asString(value);

    const str = new StringBuilder(initialValue)
      .appendJoinArray(separator, [value])
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with appendLine() method", async ({ value }) => {
    const expected = asString(value) + StringBuilder.newLine;

    const str = new StringBuilder()
      .appendLine(value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with clear() method", async ({ value: initialValue }) => {
    const expected = "";

    const str = new StringBuilder(initialValue)
      .clear()
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with clone() method", async ({ value }) => {
    const str1 = new StringBuilder(value);
    const str2 = str1.clone();

    expect(str1 === str2).toBe(false);
    expect(str1.equals(str2)).toBe(true);
    expect(str2.equals(str1)).toBe(true);
  });

  it.each(values)("should work with equals() method", async ({ value }) => {
    const isEqual = new StringBuilder(value)
      .equals(value);

    expect(isEqual).toBe(true);
  });

  it.each(values)("should work with insert() method", async ({ value }) => {
    const initialValue = "0123456789";

    const expected = "0123" + asString(value) + "456789";

    const str = new StringBuilder(initialValue)
      .insert(4, value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with isEmpty property", async ({ value }) => {
    const expected = asString(value).length === 0;
    const { isEmpty } = new StringBuilder(value);

    expect(isEmpty).toBe(expected);
  });

  it.each(values)("should work with length property", async ({ value }) => {
    const expected = asString(value).length;
    const { length } = new StringBuilder(value);

    expect(length).toBe(expected);
  });

  it.each(values)("should work with prepend() method", async ({ value }) => {
    const initialValue = "foo";
    const expected = asString(value) + initialValue;

    const str = new StringBuilder(initialValue)
      .prepend(value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with prependFormat() method", async ({ value }) => {
    const initialValue = "foo";
    const prefix = "Bar: ";
    const expected = prefix +
      (value !== undefined ? asString(value) : "{0}") +
      initialValue;

    const str = new StringBuilder(initialValue)
      .prependFormat(prefix + "{0}", value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with prependFormatArray() method", async ({ value }) => {
    const initialValue = "foo";
    const prefix = "Bar: ";
    const expected = prefix +
      (value !== undefined ? asString(value) : "{0}") +
      initialValue;

    const str = new StringBuilder(initialValue)
      .prependFormatArray(prefix + "{0}", [value])
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with prependJoin() method", async ({ value }) => {
    const initialValue = "Foo: ";
    const separator = " + ";
    const expected = asString(value) + initialValue;

    const str = new StringBuilder(initialValue)
      .prependJoin(separator, value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with prependJoinArray() method", async ({ value }) => {
    const initialValue = "Foo: ";
    const separator = " + ";
    const expected = asString(value) + initialValue;

    const str = new StringBuilder(initialValue)
      .prependJoinArray(separator, [value])
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with prependLine() method", async ({ value }) => {
    const initialValue = "Foo";
    const expected = asString(value) + StringBuilder.newLine + initialValue;

    const str = new StringBuilder(initialValue)
      .prependLine(value)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it("should work with remove() method", async () => {
    const initialValue = "0123456789";
    const expected = "012789";

    const str = new StringBuilder(initialValue)
      .remove(3, 4)
      .toString();

    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it("should work with replace() method", async () => {
    const checks = [{
      initialValue: "Foo BAZZ bar",
      expected: "Foo+++ baz +++bar",
      searchFor: " BAZZ ",
      replaceWith: "+++ baz +++"
    }, {
      initialValue: "Foo+++ baz +++bar",
      expected: "NewFoo+++ baz +++bar",
      searchFor: /(foo)/i,
      replaceWith: "NewFoo"
    }];

    for (const { initialValue, expected, searchFor, replaceWith } of checks) {
      const str = new StringBuilder(initialValue)
        .replace(searchFor, replaceWith)
        .toString();

      expect(str.length).toBe(expected.length);
      expect(str).toBe(expected);
    }
  });

  it.each(values)("should work with toJSON() method", async ({ value: initialValue }) => {
    const expected = asString(initialValue);

    const str = new StringBuilder(initialValue)
      .toJSON();

    expect(typeof str).toBe("string");
    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });

  it.each(values)("should work with toString() method", async ({ value: initialValue }) => {
    const expected = asString(initialValue);

    const str = new StringBuilder(initialValue)
      .toString();

    expect(typeof str).toBe("string");
    expect(str.length).toBe(expected.length);
    expect(str).toBe(expected);
  });
});