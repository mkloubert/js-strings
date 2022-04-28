/**
  The MIT License (MIT)

  Copyright (c) 2022-present Marcel Joachim Kloubert (https://marcel.coffee)

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
**/

import { List, } from "../types";

/**
 * A string formatter.
 *
 * @param {any} value The input value.
 *
 * @returns {any} The output value.
 */
export type StringFormatter = (value: any) => any;

/**
 * A repository of string formatters.
 */
export type StringFormatters = Record<string, StringFormatter>;

/**
 * List of string formatters.
 */
export const stringFormatters: StringFormatters = {
  "lower": (value) => asString(value).toLowerCase(),
  "ltrim": (value) => asString(value).trimStart(),
  "rtrim": (value) => asString(value).trimEnd(),
  "trim": (value) => asString(value).trim(),
  "upper": (value) => asString(value).toUpperCase(),
};

/**
 * Converts a value to its string representation.
 *
 * @example
 * ```
 * import { asString } from "@marcelkloubert/strings"
 *
 * const myObject = {
 *   toString: () => "!!!myObject!!!",
 * };
 *
 * asString(12)  // "12"
 * asString("")  // ""
 * asString(null)  // ""
 * asString(undefined)  // ""
 * asString(myObject)  // "!!!myObject!!!"
 * ```
 *
 * @param {unknown} value The input value.
 *
 * @returns {string} The value as string.
 */
export function asString(value: any): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "undefined" || value === null) {
    return "";
  }

  if (value instanceof Error) {
    return `ERROR [${value.name}]: ${value.message}

${value.stack ?? ""}`.trim();
  }

  if (typeof value["toString"] === "function") {
    return String(value.toString());
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

/**
 * Formats a string.
 *
 * @example
 * ```
 * import { format } from "@marcelkloubert/strings"
 *
 * format("{1}, {0}", "Marcel", "Kloubert")  // "Kloubert, Marcel"
 * format("{1:upper}, {0:lower,trim}", "Marcel", "  Kloubert  ")  // "kloubert, MARCEL"
 * ```
 *
 * @param {string} formatStr The format string.
 * @param {any[]} [args] One or more argument.
 *
 * @returns {string} The formatted string.
 */
export function format(formatStr: string, ...args: any[]): string {
  return formatArray(formatStr, args);
}

/**
 * Formats a string.
 *
 * @example
 * ```
 * import { formatArray } from "@marcelkloubert/strings"
 *
 * formatArray("{1}, {0}", ["Marcel", "Kloubert"])  // "Kloubert, Marcel"
 * formatArray("{1:upper}, {0:lower,trim}", ["Marcel", "  Kloubert  "])  // "kloubert, MARCEL"
 * ```
 *
 * @param {string} formatStr The format string.
 * @param {List<any>} [argList] One or more argument.
 *
 * @returns {string} The formatted string.
 */
export function formatArray(formatStr: string, argList: List<any>): string {
  if (typeof formatStr !== "string") {
    throw new TypeError("formatStr must be of type string");
  }

  let args: any[];
  if (Array.isArray(argList)) {
    args = argList;
  } else {
    args = [...argList,];
  }

  return formatStr.replace(/{(\d+)(:)?([^}]*)}/gm,
    (match: string, index: string | number, separator: string, formatterName: string) => {
      index = parseInt(index as string);

      let result = args[index];

      if (separator === ":") {
        const formatterNames = formatterName.split(",")
          .map((fn) => fn.trim())
          .filter((fn) => fn !== "");

        for (const name of formatterNames) {
          result = stringFormatters[name](result);
        }
      }

      if (typeof result !== "undefined") {
        return asString(result);
      } else {
        return match;
      }
    });
}
