export const keys: <T>(obj: T) => Array<keyof T> = Object.keys as any

export function isBoolean(val): val is boolean {
  return typeof val === "boolean"
}

export function isElement(val): val is Element {
  return val && typeof val.nodeType === "number"
}

export function isString(val): val is string {
  return typeof val === "string"
}

export function isNumber(val): val is number {
  return typeof val === "number";
}

export function isObject(val) {
  return typeof val === "object" ? val !== null : isFunction(val);
}

// tslint:disable-next-line:ban-types
export function isFunction(val): val is Function {
  return typeof val === "function";
}

export function isArrayLike(obj): obj is ArrayLike<any> {
  return isObject( obj )
    && typeof obj.length === "number"
    && typeof obj.nodeType !== "number"
}
