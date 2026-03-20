import type { Diagnostic } from "@codemirror/lint";

let tsPromise: Promise<typeof import("typescript")> | null = null;

function getTS() {
  if (!tsPromise) {
    tsPromise = import("typescript");
  }
  return tsPromise;
}

export async function transpileTypeScript(
  code: string
): Promise<{ code: string; error: string | null }> {
  try {
    const ts = await getTS();
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        strict: false,
        esModuleInterop: true,
        skipLibCheck: true,
      },
    });
    return { code: result.outputText, error: null };
  } catch (err) {
    return {
      code: "",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// Minimal ambient type declarations for browser globals.
// This avoids loading the full lib.dom.d.ts (~3MB) while giving students
// useful type checking for the APIs they'll actually use.
const LIB_DEFS = `
interface Console {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  clear(): void;
  table(data: any, columns?: string[]): void;
  time(label?: string): void;
  timeEnd(label?: string): void;
  group(...label: any[]): void;
  groupEnd(): void;
  count(label?: string): void;
  dir(obj: any): void;
  assert(condition?: boolean, ...args: any[]): void;
}
declare var console: Console;

// Timers
declare function setTimeout(callback: (...args: any[]) => void, ms?: number, ...args: any[]): number;
declare function setInterval(callback: (...args: any[]) => void, ms?: number, ...args: any[]): number;
declare function clearTimeout(id?: number): void;
declare function clearInterval(id?: number): void;
declare function queueMicrotask(callback: () => void): void;

// JSON
interface JSON {
  parse(text: string, reviver?: (key: string, value: any) => any): any;
  stringify(value: any, replacer?: any, space?: string | number): string;
}
declare var JSON: JSON;

// Math
interface Math {
  readonly PI: number;
  readonly E: number;
  abs(x: number): number;
  ceil(x: number): number;
  floor(x: number): number;
  round(x: number): number;
  max(...values: number[]): number;
  min(...values: number[]): number;
  pow(base: number, exponent: number): number;
  sqrt(x: number): number;
  random(): number;
  sign(x: number): number;
  trunc(x: number): number;
  log(x: number): number;
}
declare var Math: Math;

// Fetch API
interface Headers {
  append(name: string, value: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  delete(name: string): void;
  forEach(callback: (value: string, name: string) => void): void;
}
declare var Headers: { new(init?: Record<string, string> | string[][]): Headers };

interface Body {
  json(): Promise<any>;
  text(): Promise<string>;
  blob(): Promise<any>;
  arrayBuffer(): Promise<ArrayBuffer>;
}

interface Response extends Body {
  readonly ok: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly headers: Headers;
  readonly url: string;
  clone(): Response;
}

interface RequestInit {
  method?: string;
  headers?: Record<string, string> | Headers;
  body?: string | FormData | Blob | ArrayBuffer;
  mode?: string;
  credentials?: string;
  cache?: string;
  redirect?: string;
  signal?: AbortSignal;
}

declare function fetch(input: string | Request, init?: RequestInit): Promise<Response>;

interface Request extends Body {
  readonly method: string;
  readonly url: string;
  readonly headers: Headers;
  clone(): Request;
}

// AbortController
interface AbortSignal {
  readonly aborted: boolean;
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
}
interface AbortController {
  readonly signal: AbortSignal;
  abort(): void;
}
declare var AbortController: { new(): AbortController };

// Promise
interface PromiseConstructor {
  new<T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
  resolve<T>(value: T | PromiseLike<T>): Promise<T>;
  reject<T = never>(reason?: any): Promise<T>;
  all<T>(values: (T | PromiseLike<T>)[]): Promise<T[]>;
  race<T>(values: (T | PromiseLike<T>)[]): Promise<T>;
  allSettled<T>(values: (T | PromiseLike<T>)[]): Promise<{ status: "fulfilled" | "rejected"; value?: T; reason?: any }[]>;
  any<T>(values: (T | PromiseLike<T>)[]): Promise<T>;
}
declare var Promise: PromiseConstructor;
interface Promise<T> {
  then<R1 = T, R2 = never>(onfulfilled?: (value: T) => R1 | PromiseLike<R1>, onrejected?: (reason: any) => R2 | PromiseLike<R2>): Promise<R1 | R2>;
  catch<R = never>(onrejected?: (reason: any) => R | PromiseLike<R>): Promise<T | R>;
  finally(onfinally?: () => void): Promise<T>;
}

// DOM basics
interface EventTarget {
  addEventListener(type: string, listener: (event: any) => void, options?: boolean | { capture?: boolean; once?: boolean; passive?: boolean }): void;
  removeEventListener(type: string, listener: (event: any) => void): void;
  dispatchEvent(event: any): boolean;
}

interface Node extends EventTarget {
  readonly parentNode: Node | null;
  readonly childNodes: NodeList;
  readonly firstChild: Node | null;
  readonly lastChild: Node | null;
  readonly nextSibling: Node | null;
  readonly previousSibling: Node | null;
  readonly textContent: string | null;
  appendChild(child: Node): Node;
  removeChild(child: Node): Node;
  cloneNode(deep?: boolean): Node;
}

interface NodeList {
  readonly length: number;
  item(index: number): Node | null;
  forEach(callback: (node: Node, index: number) => void): void;
  [index: number]: Node;
}

interface Element extends Node {
  readonly tagName: string;
  readonly id: string;
  readonly className: string;
  readonly classList: DOMTokenList;
  readonly children: HTMLCollection;
  readonly innerHTML: string;
  readonly outerHTML: string;
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  removeAttribute(name: string): void;
  hasAttribute(name: string): boolean;
  querySelector(selectors: string): Element | null;
  querySelectorAll(selectors: string): NodeList;
  closest(selectors: string): Element | null;
  matches(selectors: string): boolean;
}

interface HTMLElement extends Element {
  readonly style: CSSStyleDeclaration;
  readonly dataset: Record<string, string | undefined>;
  innerText: string;
  hidden: boolean;
  click(): void;
  focus(): void;
  blur(): void;
}

interface HTMLCollection {
  readonly length: number;
  item(index: number): Element | null;
  [index: number]: Element;
}

interface DOMTokenList {
  readonly length: number;
  add(...tokens: string[]): void;
  remove(...tokens: string[]): void;
  toggle(token: string, force?: boolean): boolean;
  contains(token: string): boolean;
  replace(oldToken: string, newToken: string): boolean;
}

interface CSSStyleDeclaration {
  [property: string]: string;
}

interface Document extends Node {
  getElementById(id: string): HTMLElement | null;
  getElementsByClassName(className: string): HTMLCollection;
  getElementsByTagName(tagName: string): HTMLCollection;
  querySelector(selectors: string): Element | null;
  querySelectorAll(selectors: string): NodeList;
  createElement(tagName: string): HTMLElement;
  createTextNode(data: string): Node;
  readonly body: HTMLElement;
  readonly head: HTMLElement;
  readonly documentElement: HTMLElement;
  title: string;
}
declare var document: Document;

interface Window extends EventTarget {
  readonly document: Document;
  readonly location: Location;
  readonly navigator: Navigator;
  readonly innerWidth: number;
  readonly innerHeight: number;
  alert(message?: string): void;
  confirm(message?: string): boolean;
  prompt(message?: string, defaultValue?: string): string | null;
}
declare var window: Window;

interface Location {
  readonly href: string;
  readonly hostname: string;
  readonly pathname: string;
  readonly search: string;
  readonly hash: string;
  readonly origin: string;
  reload(): void;
  assign(url: string): void;
}

interface Navigator {
  readonly userAgent: string;
  readonly language: string;
  readonly platform: string;
  readonly onLine: boolean;
}

// Globals
declare function alert(message?: string): void;
declare function confirm(message?: string): boolean;
declare function prompt(message?: string, defaultValue?: string): string | null;
declare function parseInt(string: string, radix?: number): number;
declare function parseFloat(string: string): number;
declare function isNaN(value: any): boolean;
declare function isFinite(value: any): boolean;
declare function encodeURIComponent(component: string): string;
declare function decodeURIComponent(component: string): string;
declare function encodeURI(uri: string): string;
declare function decodeURI(uri: string): string;
declare function atob(data: string): string;
declare function btoa(data: string): string;
declare function structuredClone<T>(value: T): T;

// Error types
interface Error {
  name: string;
  message: string;
  stack?: string;
}
interface ErrorConstructor {
  new(message?: string): Error;
  (message?: string): Error;
}
declare var Error: ErrorConstructor;
declare var TypeError: ErrorConstructor;
declare var RangeError: ErrorConstructor;
declare var SyntaxError: ErrorConstructor;
declare var ReferenceError: ErrorConstructor;

// Date
interface Date {
  getTime(): number;
  getFullYear(): number;
  getMonth(): number;
  getDate(): number;
  getDay(): number;
  getHours(): number;
  getMinutes(): number;
  getSeconds(): number;
  getMilliseconds(): number;
  toISOString(): string;
  toLocaleDateString(locale?: string, options?: any): string;
  toLocaleTimeString(locale?: string, options?: any): string;
  toLocaleString(locale?: string, options?: any): string;
  toString(): string;
}
interface DateConstructor {
  new(): Date;
  new(value: number | string): Date;
  new(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;
  now(): number;
  parse(dateString: string): number;
}
declare var Date: DateConstructor;

// Map & Set
interface Map<K, V> {
  readonly size: number;
  get(key: K): V | undefined;
  set(key: K, value: V): this;
  has(key: K): boolean;
  delete(key: K): boolean;
  clear(): void;
  forEach(callback: (value: V, key: K, map: Map<K, V>) => void): void;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  entries(): IterableIterator<[K, V]>;
}
interface MapConstructor {
  new<K, V>(entries?: [K, V][]): Map<K, V>;
}
declare var Map: MapConstructor;

interface Set<T> {
  readonly size: number;
  add(value: T): this;
  has(value: T): boolean;
  delete(value: T): boolean;
  clear(): void;
  forEach(callback: (value: T, value2: T, set: Set<T>) => void): void;
  keys(): IterableIterator<T>;
  values(): IterableIterator<T>;
  entries(): IterableIterator<[T, T]>;
}
interface SetConstructor {
  new<T>(values?: T[]): Set<T>;
}
declare var Set: SetConstructor;

// Symbol & Iterator
declare var Symbol: {
  readonly iterator: unique symbol;
  (description?: string): symbol;
};

interface IterableIterator<T> {
  next(): { value: T; done: boolean };
  [Symbol.iterator](): IterableIterator<T>;
}

// Array
interface Array<T> {
  readonly length: number;
  push(...items: T[]): number;
  pop(): T | undefined;
  shift(): T | undefined;
  unshift(...items: T[]): number;
  splice(start: number, deleteCount?: number, ...items: T[]): T[];
  slice(start?: number, end?: number): T[];
  concat(...items: (T | T[])[]): T[];
  join(separator?: string): string;
  reverse(): T[];
  sort(compareFn?: (a: T, b: T) => number): T[];
  indexOf(searchElement: T, fromIndex?: number): number;
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  includes(searchElement: T, fromIndex?: number): boolean;
  find(predicate: (value: T, index: number, obj: T[]) => boolean): T | undefined;
  findIndex(predicate: (value: T, index: number, obj: T[]) => boolean): number;
  filter(predicate: (value: T, index: number, array: T[]) => boolean): T[];
  map<U>(callbackfn: (value: T, index: number, array: T[]) => U): U[];
  reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
  forEach(callbackfn: (value: T, index: number, array: T[]) => void): void;
  some(predicate: (value: T, index: number, array: T[]) => boolean): boolean;
  every(predicate: (value: T, index: number, array: T[]) => boolean): boolean;
  flat<D extends number = 1>(depth?: D): T[];
  flatMap<U>(callback: (value: T, index: number, array: T[]) => U | U[]): U[];
  fill(value: T, start?: number, end?: number): T[];
  at(index: number): T | undefined;
  [index: number]: T;
  [Symbol.iterator](): IterableIterator<T>;
}
interface ArrayConstructor {
  isArray(arg: any): arg is any[];
  from<T>(arrayLike: Iterable<T> | ArrayLike<T>): T[];
  of<T>(...items: T[]): T[];
}
declare var Array: ArrayConstructor;

// String
interface String {
  readonly length: number;
  charAt(pos: number): string;
  charCodeAt(index: number): number;
  concat(...strings: string[]): string;
  includes(searchString: string, position?: number): boolean;
  endsWith(searchString: string, endPosition?: number): boolean;
  startsWith(searchString: string, position?: number): boolean;
  indexOf(searchString: string, position?: number): number;
  lastIndexOf(searchString: string, position?: number): number;
  match(regexp: RegExp | string): RegExpMatchArray | null;
  replace(searchValue: string | RegExp, replaceValue: string | ((match: string, ...args: any[]) => string)): string;
  replaceAll(searchValue: string | RegExp, replaceValue: string): string;
  search(regexp: RegExp | string): number;
  slice(start?: number, end?: number): string;
  split(separator: string | RegExp, limit?: number): string[];
  substring(start: number, end?: number): string;
  toLowerCase(): string;
  toUpperCase(): string;
  trim(): string;
  trimStart(): string;
  trimEnd(): string;
  padStart(maxLength: number, fillString?: string): string;
  padEnd(maxLength: number, fillString?: string): string;
  repeat(count: number): string;
  at(index: number): string | undefined;
  [index: number]: string;
}

// Number
interface Number {
  toFixed(fractionDigits?: number): string;
  toPrecision(precision?: number): string;
  toString(radix?: number): string;
}
interface NumberConstructor {
  isInteger(value: any): boolean;
  isFinite(value: any): boolean;
  isNaN(value: any): boolean;
  parseInt(string: string, radix?: number): number;
  parseFloat(string: string): number;
  readonly MAX_SAFE_INTEGER: number;
  readonly MIN_SAFE_INTEGER: number;
}
declare var Number: NumberConstructor;

// Boolean
interface Boolean {
  valueOf(): boolean;
}

// Object
interface Object {
  constructor: Function;
  toString(): string;
  valueOf(): Object;
  hasOwnProperty(v: string): boolean;
}
interface ObjectConstructor {
  keys(o: any): string[];
  values(o: any): any[];
  entries(o: any): [string, any][];
  assign<T>(target: T, ...sources: any[]): T;
  freeze<T>(o: T): Readonly<T>;
  fromEntries(entries: Iterable<[string, any]>): Record<string, any>;
  create(o: object | null, properties?: any): any;
  defineProperty(o: any, p: string, attributes: any): any;
  getPrototypeOf(o: any): any;
  is(value1: any, value2: any): boolean;
}
declare var Object: ObjectConstructor;

// RegExp
interface RegExp {
  exec(string: string): RegExpExecArray | null;
  test(string: string): boolean;
  readonly source: string;
  readonly flags: string;
  readonly global: boolean;
  readonly ignoreCase: boolean;
  readonly multiline: boolean;
  lastIndex: number;
}
interface RegExpMatchArray extends Array<string> {
  index?: number;
  input?: string;
  groups?: Record<string, string>;
}
interface RegExpExecArray extends Array<string> {
  index: number;
  input: string;
  groups?: Record<string, string>;
}

// Function
interface Function {
  apply(this: Function, thisArg: any, argArray?: any): any;
  call(this: Function, thisArg: any, ...argArray: any[]): any;
  bind(this: Function, thisArg: any, ...argArray: any[]): any;
  readonly name: string;
  readonly length: number;
}

// FormData
interface FormData {
  append(name: string, value: string | Blob): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string | Blob): void;
}
declare var FormData: { new(): FormData };

// Blob
interface Blob {
  readonly size: number;
  readonly type: string;
  text(): Promise<string>;
  arrayBuffer(): Promise<ArrayBuffer>;
  slice(start?: number, end?: number, contentType?: string): Blob;
}

// ArrayBuffer
interface ArrayBuffer {
  readonly byteLength: number;
  slice(begin: number, end?: number): ArrayBuffer;
}

// URL
interface URL {
  readonly href: string;
  readonly origin: string;
  readonly protocol: string;
  readonly hostname: string;
  readonly port: string;
  readonly pathname: string;
  readonly search: string;
  readonly hash: string;
  readonly searchParams: URLSearchParams;
  toString(): string;
}
declare var URL: { new(url: string, base?: string): URL };

interface URLSearchParams {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  toString(): string;
  forEach(callback: (value: string, name: string) => void): void;
}
declare var URLSearchParams: { new(init?: string | Record<string, string>): URLSearchParams };

// Utility types
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Record<K extends keyof any, T> = { [P in K]: T };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type Exclude<T, U> = T extends U ? never : T;
type Extract<T, U> = T extends U ? T : never;
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type TemplateStringsArray = readonly string[];

interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}
interface Iterator<T> {
  next(): { value: T; done: boolean };
}
interface PromiseLike<T> {
  then<R1 = T, R2 = never>(onfulfilled?: (value: T) => R1 | PromiseLike<R1>, onrejected?: (reason: any) => R2 | PromiseLike<R2>): PromiseLike<R1 | R2>;
}

// typeof
declare function typeof(x: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

// null / undefined
declare var undefined: undefined;
declare var NaN: number;
declare var Infinity: number;
`;

const LIB_FILENAME = "lib.d.ts";

export async function checkTypeScript(code: string): Promise<Diagnostic[]> {
  const ts = await getTS();
  const fileName = "playground.ts";

  const sourceFile = ts.createSourceFile(
    fileName,
    code,
    ts.ScriptTarget.ES2020,
    true
  );

  const libFile = ts.createSourceFile(
    LIB_FILENAME,
    LIB_DEFS,
    ts.ScriptTarget.ES2020,
    true
  );

  const files: Record<string, import("typescript").SourceFile> = {
    [fileName]: sourceFile,
    [LIB_FILENAME]: libFile,
  };

  const compilerHost: import("typescript").CompilerHost = {
    getSourceFile: (name) => files[name],
    getDefaultLibFileName: () => LIB_FILENAME,
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name in files,
    readFile: (name) => (name in files ? files[name].text : ""),
  };

  const program = ts.createProgram(
    [fileName],
    {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      strict: true,
      noEmit: true,
      skipLibCheck: true,
    },
    compilerHost
  );

  const diagnostics = ts.getPreEmitDiagnostics(program);
  const result: Diagnostic[] = [];

  for (const d of diagnostics) {
    if (d.file?.fileName === fileName && d.start !== undefined && d.length !== undefined) {
      let severity: "error" | "warning" | "info" = "error";
      if (d.category === ts.DiagnosticCategory.Warning) severity = "warning";
      if (d.category === ts.DiagnosticCategory.Suggestion) severity = "info";

      result.push({
        from: d.start,
        to: d.start + d.length,
        message: ts.flattenDiagnosticMessageText(d.messageText, "\n"),
        severity,
      });
    }
  }

  return result;
}
