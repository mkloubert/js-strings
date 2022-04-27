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

import { asString, format, formatArray } from "../functions";
import type { List } from "../types";

/**
 * A string builder class.
 * 
 * @example
 * ```
 * import { StringBuilder } from "@marcelkloubert/strings"
 * 
 * const str = new StringBuilder("Foo") // "Foo" && str.isEmpty === false
 *   .append("bar") // "Foobar"
 *   .prepend("buzz") // "buzzFoobar"
 *   .clear() // str.length === 0
 * 
 * str.appendFormat("{0}, {1:upper,trim}", " Marcel  ", "Kloubert") // "Kloubert, MARCEL"
 * str.length = 0 // "" && str.isEmpty === true
 * ```
 */
export class StringBuilder {
  /**
   * The current value.
   */
  protected value: string;

  /**
   * Initializes a new instance of that class.
   * 
   * @param {any} [initialValue] The optional, initial value.
   */
  public constructor(initialValue: any = "") {
    this.value = asString(initialValue);
  }

  /**
   * Appends the string representation of a value to the current value.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .append("foo") // "foo"
   *   .append("Bar") // "fooBar"
   * ```
   * 
   * @param {any} value The value to append.
   *
   * @returns {this}
   */
  public append(value: any): this {
    this.value = `${this.value}${asString(value)}`;
    return this;
  }

  /**
   * Appends a formatted string.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .appendFormat("foo: {0}", 5979) // "foo: 5979"
   *   .appendFormat(" {0:lower} {1:upper,trim}", "BAR", " Buzz   ") // "foo: 5979 bar BUZZ"
   * ```
   * 
   * @param {string} formatStr The format string.
   * @param {any[]} [args] One or more argument for the format string.
   *
   * @returns {this}
   */
  public appendFormat(formatStr: string, ...args: any[]): this {
    return this.append(format(formatStr, ...args));
  }

  /**
   * Appends a formatted string.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .appendFormatArray("foo: {0}", [5979]) // "foo: 5979"
   *   .appendFormatArray(" {0:lower} {1:upper,trim}", ["BAR", " Buzz   "]) // "foo: 5979 bar BUZZ"
   * ```
   * 
   * @param {string} formatStr The format string.
   * @param {List<any>} argList One or more argument for the format string.
   *
   * @returns {this}
   */
  public appendFormatArray(formatStr: string, argList: List<any>): this {
    return this.append(formatArray(formatStr, argList));
  }

  /**
   * Joins a list of values to one string and appends it.
   * 
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder("foo")
   *   .appendJoin(" + ", "Bar", "Baz") // "fooBar + Baz"
   * ```
   *
   * @param {string} separator The separator.
   * @param {any[]} [args] One or more argument for the format string.
   *
   * @returns {this}
   */
  public appendJoin(separator: string, ...args: any[]): this {
    if (typeof separator !== 'string') {
      throw new TypeError('separator must be of type string');
    }

    return this.append(args.map(a => asString(a)).join(separator));
  }

  /**
   * Joins a list of values to one string and appends it.
   * 
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder("foo")
   *   .appendJoinArray(" + ", ["Bar", "Baz"]) // "fooBar + Baz"
   * ```
   *
   * @param {string} separator The separator.
   * @param {List<any>} argList One or more argument for the format string.
   *
   * @returns {this}
   */
  public appendJoinArray(separator: string, argList: List<any>): this {
    return this.appendJoin(separator, ...argList);
  }

  /**
   * Appends the string representation of a value to the current value
   * and adds a new line.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .appendLine("foo") // "foo\n"
   *   .appendLine("Bar") // "foo\nBar\n"
   * ```
   * 
   * @param {any} value The value to append.
   *
   * @returns {this}
   */
  public appendLine(value: any): this {
    this.value = `${this.value}${asString(value)}${this.getNewLine()}`;
    return this;
  }

  /**
   * Clears the underlying value.
   * 
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .append("foo") // "foo"
   *   .clear() // ""
   * ```
   * 
   * @returns 
   */
  public clear(): this {
    this.value = "";
    return this;
  }

  /**
   * Clones that instance.
   * 
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * const str1 = new StringBuilder()
   * const str2 = str1.clone()
   *
   * str1 === str2 // (false)
   * str1.equals(str2) // (true)
   * ```
   *
   * @returns {StringBuilder} The cloned instance.
   */
  public clone(): StringBuilder {
    return new StringBuilder(this.value);
  }

  /**
   * Handles another value as string and checks if it is equal qith this instance.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * const str = new StringBuilder()
   *
   * str.equals("") // (true)
   * str.equals(null) // (true)
   * str.equals(undefined) // (true)
   * 
   * str.append("123")
   * str.equals(123) // (true)
   * ```
   * 
   * @param {any} other The other value.
   * 
   * @returns {boolean} Both values are equal.
   */
  public equals(other: any): boolean {
    return this.value === asString(other);
  }

  /**
   * Returns the value for a new line.
   *
   * @returns {string} The new line value.
   */
  protected getNewLine(): string {
    return StringBuilder.newLine;
  }

  /**
   * Insert a value to this string.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder("0123456789")
   *   .remove(3, 4) // "012789"
   * ```
   * 
   * @param {number} start The zero based start index.
   * @param {any} value The value to insert.
   *
   * @returns {this}
   */
  public insert(start: number, value: any): this {
    if (typeof start !== 'number') {
      throw new TypeError('start must be of type number');
    }
    if (start < 0) {
      throw new RangeError('start must be greater or equal 0');
    }

    this.value =
      this.value.substring(0, start) +
      asString(value) +
      this.value.substring(start);

    return this;
  }

  /**
   * Gets if the value is empty or not.
   * 
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * const str = new StringBuilder() // str.isEmpty === true
   *
   * str.append("Foo") // str.isEmpty === true
   * 
   * str.length = 0 // str.isEmpty === true
   * ```
   */
  public get isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Gets or sets the length.
   * 
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * const str = new StringBuilder() // str.length === 0
   *
   * str.append("Foo") // str.length === 3
   * 
   * str.length = 1 // "Fo"
   * str.length = 0 // ""
   * ```
   */
  public get length(): number {
    return this.value.length;
  }
  public set length(newLength: number) {
    if (typeof newLength !== 'number') {
      throw new TypeError('newLength must be of type number');
    }
    if (newLength < 0) {
      throw new RangeError('newLength must be greater or equal 0');
    }

    this.value = this.value.substring(0, newLength);
  }

  /**
   * The default value for a new line.
   */
  public static newLine = "\n";

  /**
   * Prepends the string representation of a value to the current value.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .prepend("Foo") // "Foo"
   *   .prepend("bar") // "barFoo"
   * ```
   * 
   * @param {any} value The value to append.
   *
   * @returns {this}
   */
  public prepend(value: any): this {
    this.value = `${asString(value)}${this.value}`;
    return this;
  }

  /**
   * Appends a formatted string.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .prependFormat("foo: {0}", 5979) // "foo: 5979"
   *   .prependFormat("{0:lower} {1:upper,trim} ", "BAR", " Buzz   ") // "bar BUZZ foo: 5979"
   * ```
   * 
   * @param {string} formatStr The format string.
   * @param {any[]} [args] One or more argument for the format string.
   *
   * @returns {this}
   */
  public prependFormat(formatStr: string, ...args: any[]): this {
    return this.prepend(format(formatStr, ...args));
  }

  /**
   * Prepends a formatted string.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .prependFormatArray("foo: {0}", [5979]) // "foo: 5979"
   *   .prependFormatArray("{0:lower} {1:upper,trim} ", ["BAR", " Buzz   "]) // "bar BUZZ foo: 5979"
   * ```
   * 
   * @param {string} formatStr The format string.
   * @param {List<any>} argList One or more argument for the format string.
   *
   * @returns {this}
   */
  public prependFormatArray(formatStr: string, argList: List<any>): this {
    return this.prepend(formatArray(formatStr, argList));
  }

  /**
   * Joins a list of values to one string and prepends it.
   * 
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder("foo")
   *   .prependJoin(" + ", "Bar", "Baz") // "Bar + Bazfoo"
   * ```
   *
   * @param {string} separator The separator.
   * @param {any[]} [args] One or more argument for the format string.
   *
   * @returns {this}
   */
  public prependJoin(separator: string, ...args: any[]): this {
    if (typeof separator !== 'string') {
      throw new TypeError('separator must be of type string');
    }

    return this.prepend(args.map(a => asString(a)).join(separator));
  }

  /**
   * Joins a list of values to one string and prepends it.
   * 
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder("foo")
   *   .prependJoinArray(" + ", ["Bar", "Baz"]) // "Bar + Bazfoo"
   * ```
   *
   * @param {string} separator The separator.
   * @param {List<any>} argList One or more argument for the format string.
   *
   * @returns {this}
   */
  public prependJoinArray(separator: string, argList: List<any>): this {
    return this.prependJoin(separator, ...argList);
  }

  /**
   * Prepends the string representation of a value to the current value
   * and adds a new line.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder()
   *   .append("Bar") // "Bar"
   *   .prependLine("foo") // "foo\nBar"
   * ```
   * 
   * @param {any} value The value to append.
   *
   * @returns {this}
   */
  public prependLine(value: any): this {
    this.value = `${asString(value)}${this.getNewLine()}${this.value}`;
    return this;
  }

  /**
   * Removes a part from the current string.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder("0123456789")
   *   .remove(3, 4) // "012789"
   * ```
   * 
   * @param {number} start The zero based start index.
   * @param {number} length The length.
   *
   * @returns {this}
   */
  public remove(start: number, length: number): this {
    if (typeof start !== 'number') {
      throw new TypeError('start must be of type number');
    }
    if (start < 0) {
      throw new RangeError('start must be greater or equal 0');
    }

    if (typeof length !== 'number') {
      throw new TypeError('length must be of type number');
    }
    if (length < 0) {
      throw new RangeError('length must be greater or equal 0');
    }

    this.value =
      this.value.substring(0, start) +
      this.value.substring(start + length);

    return this;
  }

  /**
   * Replaces a substring with a new one.
   *
   * @example
   * ```
   * import { StringBuilder } from "@marcelkloubert/strings"
   * 
   * new StringBuilder("Foo BAZZ bar")
   *   .replace(" BAZZ ", "+++ baz +++") // "Foo+++ baz +++bar"
   *   .replace(/(foo)/i, "NewFoo") // "NewFoo+++ baz +++bar"
   * ```
   * 
   * @param {string|RegExp} searchFor The value or refular expression to search for.
   * @param {string} replaceWith The new value.
   *
   * @returns {this}
   */
  public replace(searchFor: string | RegExp, replaceWith: any): this {
    if (typeof searchFor !== 'string' && !(searchFor instanceof RegExp)) {
      throw new TypeError('searchFor must be of type string or RegExp');
    }

    if (typeof replaceWith !== 'string') {
      throw new TypeError('replaceWith must be of type string');
    }

    if (searchFor instanceof RegExp) {
      this.value = this.value
        .replace(searchFor, replaceWith);
    } else {
      this.value = this.value
        .split(asString(searchFor))
        .join(replaceWith);
    }

    return this;
  }

  /**
   * @inheritdoc
   */
  public toJSON(): any {
    return this.value;
  }

  /**
   * @inheritdoc
   */
  public toString(): string {
    return this.value;
  }
}
